import type { Exame } from "@/data/exames";
import { categoriaDoExame } from "@/data/categorias";

export type LadoArticulacao = "direito" | "esquerdo";

export const MSK_EXAME_IDS = [
  "ombro",
  "cotovelo",
  "punho",
  "mao",
  "joelho",
  "quadril",
  "tornozelo",
  "pe",
  "musculo",
  // legado
  "punho-mao",
  "tornozelo-pe",
] as const;

export function exameEhMusculoEsqueletico(exameId: string): boolean {
  return (
    categoriaDoExame(exameId) === "musculo-esqueletico" ||
    (MSK_EXAME_IDS as readonly string[]).includes(exameId)
  );
}

/** Doppler MMII (venoso/arterial) com lateridade D/E/ambos */
export function exameEhMmiiComLado(exameId: string): boolean {
  return exameId === "mmii-venoso" || exameId === "mmii-arterial";
}

/** Exames que pedem lateridade (direito / esquerdo / ambos) */
export function exameRequerLado(exameId: string): boolean {
  return exameEhMusculoEsqueletico(exameId) || exameEhMmiiComLado(exameId);
}

export function rotuloLadoCurto(lado: LadoArticulacao): string {
  return lado === "direito" ? "D" : "E";
}

export function rotuloLado(lado: LadoArticulacao): string {
  return lado === "direito" ? "direito" : "esquerdo";
}

export function ladoOposto(lado: LadoArticulacao): LadoArticulacao {
  return lado === "direito" ? "esquerdo" : "direito";
}

function sufixoTitulo(exameId: string, lado: LadoArticulacao): string {
  if (exameId === "musculo") {
    return lado === "direito" ? "À DIREITA" : "À ESQUERDA";
  }
  if (exameEhMmiiComLado(exameId)) {
    return lado === "direito"
      ? "— MEMBRO INFERIOR DIREITO"
      : "— MEMBRO INFERIOR ESQUERDO";
  }
  return lado === "direito" ? "DIREITO" : "ESQUERDO";
}

/** Título oficial do documento com lateridade */
export function tituloDocumentoComLado(
  exame: Exame,
  lado?: LadoArticulacao | null,
): string {
  const base =
    exame.tituloDocumento?.trim() ||
    `ULTRASSONOGRAFIA — ${exame.nome.toUpperCase()}`;
  if (!lado) return base;
  if (/\b(DIREITO|ESQUERDO|À DIREITA|À ESQUERDA|MEMBRO INFERIOR)\b/i.test(base))
    return base;
  return `${base} ${sufixoTitulo(exame.id, lado)}`;
}

export function nomeExameComLado(
  exame: Exame,
  lado?: LadoArticulacao | null,
): string {
  if (!lado) return exame.nome;
  if (exame.id === "musculo") {
    return `${exame.nome} ${lado === "direito" ? "à direita" : "à esquerda"}`;
  }
  if (exameEhMmiiComLado(exame.id)) {
    return `${exame.nome} ${lado === "direito" ? "direito" : "esquerdo"}`;
  }
  return `${exame.nome} ${rotuloLado(lado)}`;
}

/** Ajusta frase de impressão padrão para incluir o lado */
export function impressaoComLado(
  texto: string,
  exame: Exame,
  lado?: LadoArticulacao | null,
): string {
  if (!lado) return texto;
  const nome = exame.nome.toLowerCase();
  const ladoTxt =
    exame.id === "musculo"
      ? lado === "direito"
        ? "à direita"
        : "à esquerda"
      : rotuloLado(lado);
  const re = new RegExp(
    `(ultrassonogr[aá]fico\\s+(?:do|da|de)\\s+)?${nome.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?!\\s+(?:direito|esquerdo|à direita|à esquerda))`,
    "i",
  );
  if (re.test(texto)) {
    return texto.replace(re, (m) => `${m} ${ladoTxt}`);
  }
  if (/dentro dos (parâmetros|padrões) da normalidade/i.test(texto)) {
    return texto.replace(
      /dentro dos (parâmetros|padrões) da normalidade/i,
      `(${nome} ${ladoTxt}) dentro dos $1 da normalidade`,
    );
  }
  return texto;
}

export function exameComLado(
  exame: Exame,
  lado?: LadoArticulacao | null,
): Exame {
  if (!lado) return exame;
  return {
    ...exame,
    nome: nomeExameComLado(exame, lado),
    tituloDocumento: tituloDocumentoComLado(exame, lado),
    impressaoPadrao: impressaoComLado(exame.impressaoPadrao, exame, lado),
  };
}
