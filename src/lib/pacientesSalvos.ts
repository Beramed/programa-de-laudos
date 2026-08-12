import type { LadoArticulacao } from "@/lib/ladoMsk";
import type {
  DadosPaciente,
  DimensoesMap,
  ExameAnterior,
  LesoesMap,
  Medidas,
  Selecoes,
  Volumes,
} from "@/lib/montarLaudo";

const PREFIX = "beramed_laudos_salvos_";

export type BlocoSalvo = {
  key: string;
  exameId: string;
  lado?: LadoArticulacao | null;
  selecoes: Selecoes;
  impressao: string;
  impressaoManual: boolean;
  observacoesIds: string[];
  examesAnteriores: ExameAnterior[];
  medidas: Medidas;
  lesoes: LesoesMap;
  volumes: Volumes;
  dimensoes: DimensoesMap;
  tabelasIds: string[];
};

export type PacienteSalvo = {
  id: string;
  criadoEm: string;
  atualizadoEm: string;
  paciente: DadosPaciente;
  blocos: BlocoSalvo[];
  categoriaAtiva: string;
  /** Resumo para a lista (exames) */
  resumoExames: string;
  /** Laudo travado após “Salvar e assinar” */
  assinado?: boolean;
  assinadoEm?: string;
  /** Como o laudo foi assinado */
  modoAssinatura?: "imagem" | "certificado";
};

function storageKey(crm: string): string {
  const limpo = crm.replace(/\W/g, "") || "semcrm";
  return `${PREFIX}${limpo}`;
}

function lerLista(crm: string): PacienteSalvo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey(crm));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PacienteSalvo[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function gravarLista(crm: string, lista: PacienteSalvo[]) {
  localStorage.setItem(storageKey(crm), JSON.stringify(lista));
}

export function listarPacientesSalvos(crm: string): PacienteSalvo[] {
  return lerLista(crm).sort((a, b) =>
    b.atualizadoEm.localeCompare(a.atualizadoEm),
  );
}

export function obterPacienteSalvo(
  crm: string,
  id: string,
): PacienteSalvo | undefined {
  return lerLista(crm).find((p) => p.id === id);
}

export function salvarPacienteLaudo(
  crm: string,
  dados: {
    paciente: DadosPaciente;
    blocos: BlocoSalvo[];
    categoriaAtiva: string;
    resumoExames: string;
    idExistente?: string;
    assinado?: boolean;
  },
): PacienteSalvo {
  const agora = new Date().toISOString();
  const lista = lerLista(crm);
  const id = dados.idExistente ?? `laudo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const existente = lista.findIndex((p) => p.id === id);
  const anterior = existente >= 0 ? lista[existente] : null;
  const assinado = Boolean(dados.assinado);

  const registro: PacienteSalvo = {
    id,
    criadoEm: anterior?.criadoEm ?? agora,
    atualizadoEm: agora,
    paciente: { ...dados.paciente },
    blocos: dados.blocos.map((b) => ({ ...b })),
    categoriaAtiva: dados.categoriaAtiva,
    resumoExames: dados.resumoExames,
    assinado,
    assinadoEm: assinado
      ? anterior?.assinado
        ? anterior.assinadoEm ?? agora
        : agora
      : undefined,
  };

  if (existente >= 0) lista[existente] = registro;
  else lista.unshift(registro);

  gravarLista(crm, lista);
  return registro;
}

export function excluirPacienteSalvo(crm: string, id: string): void {
  gravarLista(
    crm,
    lerLista(crm).filter((p) => p.id !== id),
  );
}

export function formatarDataIsoCurta(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
