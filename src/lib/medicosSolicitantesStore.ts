import { promises as fs } from "fs";
import path from "path";
import type { MedicoSolicitante } from "@/lib/medicosSolicitantesTypes";

export type { MedicoSolicitante } from "@/lib/medicosSolicitantesTypes";
export { formatarSolicitanteExibicao } from "@/lib/medicosSolicitantesTypes";

const FILE_NAME = "medicos-solicitantes.json";
const TMP_PATH = path.join("/tmp", FILE_NAME);
const DATA_PATH = path.join(process.cwd(), "data", FILE_NAME);

type GlobalStore = {
  __beramedMedicosSolicitantes?: MedicoSolicitante[];
};

function g(): GlobalStore {
  return globalThis as unknown as GlobalStore;
}

function normalizaNome(nome: string): string {
  return nome
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleUpperCase("pt-BR");
}

function normalizaCrm(crm: string | undefined): string | undefined {
  if (!crm) return undefined;
  const digitos = crm.replace(/\D/g, "");
  return digitos || undefined;
}

async function lerArquivo(p: string): Promise<MedicoSolicitante[] | null> {
  try {
    const raw = await fs.readFile(p, "utf8");
    const parsed = JSON.parse(raw) as MedicoSolicitante[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function escreverArquivo(lista: MedicoSolicitante[]): Promise<void> {
  const json = JSON.stringify(lista, null, 2);
  try {
    await fs.mkdir(path.dirname(TMP_PATH), { recursive: true });
    await fs.writeFile(TMP_PATH, json, "utf8");
  } catch {
    /* /tmp pode falhar em alguns ambientes */
  }
  try {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, json, "utf8");
  } catch {
    /* no Vercel o filesystem do projeto é read-only */
  }
}

export async function carregarMedicosSolicitantes(): Promise<
  MedicoSolicitante[]
> {
  if (g().__beramedMedicosSolicitantes) {
    return g().__beramedMedicosSolicitantes!;
  }
  const fromTmp = await lerArquivo(TMP_PATH);
  const fromData = fromTmp ?? (await lerArquivo(DATA_PATH)) ?? [];
  g().__beramedMedicosSolicitantes = fromData;
  return fromData;
}

async function persistir(lista: MedicoSolicitante[]): Promise<MedicoSolicitante[]> {
  const ordenada = lista
    .slice()
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  g().__beramedMedicosSolicitantes = ordenada;
  await escreverArquivo(ordenada);
  return ordenada;
}

export async function listarMedicosSolicitantes(): Promise<
  MedicoSolicitante[]
> {
  return carregarMedicosSolicitantes();
}

export async function upsertMedicoSolicitante(input: {
  nome: string;
  crm?: string;
  uf?: string;
  id?: string;
}): Promise<MedicoSolicitante> {
  const nome = normalizaNome(input.nome);
  if (!nome) throw new Error("Nome obrigatório.");
  const crm = normalizaCrm(input.crm);
  const lista = await carregarMedicosSolicitantes();
  const agora = new Date().toISOString();

  const porId = input.id ? lista.findIndex((m) => m.id === input.id) : -1;
  const porCrm =
    crm != null ? lista.findIndex((m) => m.crm === crm) : -1;
  const porNome = lista.findIndex(
    (m) => normalizaNome(m.nome) === nome && !crm,
  );

  let idx = porId >= 0 ? porId : porCrm >= 0 ? porCrm : porNome;
  let registro: MedicoSolicitante;

  if (idx >= 0) {
    registro = {
      ...lista[idx],
      nome,
      crm: crm ?? lista[idx].crm,
      uf: input.uf?.trim().toUpperCase() || lista[idx].uf || "SP",
      atualizadoEm: agora,
    };
    lista[idx] = registro;
  } else {
    registro = {
      id: `ms-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      nome,
      crm,
      uf: input.uf?.trim().toUpperCase() || "SP",
      atualizadoEm: agora,
    };
    lista.push(registro);
  }

  await persistir(lista);
  return registro;
}

/** Mescla uma lista enviada pelo cliente (gossip / sync entre usuários) */
export async function mesclarMedicosSolicitantes(
  entradas: Array<{ nome: string; crm?: string; uf?: string; id?: string }>,
): Promise<MedicoSolicitante[]> {
  for (const e of entradas) {
    if (!e.nome?.trim()) continue;
    await upsertMedicoSolicitante(e);
  }
  return listarMedicosSolicitantes();
}

export async function excluirMedicoSolicitante(id: string): Promise<boolean> {
  const lista = await carregarMedicosSolicitantes();
  const next = lista.filter((m) => m.id !== id);
  if (next.length === lista.length) return false;
  await persistir(next);
  return true;
}
