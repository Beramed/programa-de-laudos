import type { Exame } from "@/data/exames";
import {
  frasesExamesCorrelacionados,
  observacoesDoExame,
} from "@/data/observacoes";

export type Selecoes = Record<string, string | string[]>;

export type DadosPaciente = {
  nome: string;
  idade: string;
  data: string;
  solicitante: string;
  indicacao: string;
};

export type ExameAnterior = {
  id: string;
  data: string;
  modalidade: string;
};

export type ExtrasLaudo = {
  observacoesIds: string[];
  examesAnteriores: ExameAnterior[];
};

export function selecoesPadrao(exame: Exame): Selecoes {
  const sel: Selecoes = {};
  for (const secao of exame.secoes) {
    if (secao.padrao !== undefined) {
      sel[secao.id] = secao.padrao;
    } else if (secao.tipo === "unico") {
      sel[secao.id] = secao.opcoes[0]?.id ?? "";
    } else {
      sel[secao.id] = [];
    }
  }
  return sel;
}

export function novoExameAnterior(): ExameAnterior {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    data: "",
    modalidade: "",
  };
}

/** Converte marcadores **texto** em HTML <strong> para preview/impressão */
export function laudoParaHtml(texto: string): string {
  const escapado = texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escapado
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export function montarLaudo(
  exame: Exame,
  selecoes: Selecoes,
  paciente: DadosPaciente,
  impressaoCustom?: string,
  assinatura?: string,
  extras?: ExtrasLaudo,
): string {
  const linhas: string[] = [];

  linhas.push(`ULTRASSONOGRAFIA — ${exame.nome.toUpperCase()}`);
  linhas.push("");

  if (paciente.nome.trim()) linhas.push(`Paciente: ${paciente.nome.trim()}`);
  if (paciente.idade.trim()) linhas.push(`Idade: ${paciente.idade.trim()}`);
  if (paciente.data.trim()) linhas.push(`Data: ${paciente.data.trim()}`);
  if (paciente.solicitante.trim())
    linhas.push(`Solicitante: ${paciente.solicitante.trim()}`);
  if (paciente.indicacao.trim())
    linhas.push(`Indicação: ${paciente.indicacao.trim()}`);

  if (
    paciente.nome.trim() ||
    paciente.idade.trim() ||
    paciente.data.trim() ||
    paciente.solicitante.trim() ||
    paciente.indicacao.trim()
  ) {
    linhas.push("");
  }

  linhas.push("**TÉCNICA**");
  linhas.push("");
  linhas.push(exame.tecnica);
  linhas.push("");
  linhas.push("**RELATÓRIO**");
  linhas.push("");

  for (const secao of exame.secoes) {
    const valor = selecoes[secao.id];
    let texto = "";
    if (secao.tipo === "unico") {
      const id = typeof valor === "string" ? valor : "";
      const opcao = secao.opcoes.find((o) => o.id === id);
      texto = opcao?.texto.trim() ?? "";
    } else {
      const ids = Array.isArray(valor) ? valor : [];
      texto = ids
        .map((id) => secao.opcoes.find((o) => o.id === id)?.texto.trim() ?? "")
        .filter(Boolean)
        .join(" ");
    }
    if (!texto) continue;
    linhas.push(`**${secao.titulo}**`);
    linhas.push("");
    linhas.push(texto);
    linhas.push("");
  }

  linhas.push("**IMPRESSÃO DIAGNÓSTICA**");
  linhas.push("");
  linhas.push((impressaoCustom?.trim() || exame.impressaoPadrao).trim());
  linhas.push("");

  const obsCatalogo = observacoesDoExame(exame.id);
  const ids = extras?.observacoesIds ?? [];
  const correlacoes = (extras?.examesAnteriores ?? []).filter(
    (e) => e.modalidade.trim() && e.data.trim(),
  );

  const frasesObs: string[] = [];
  const semAnt = obsCatalogo.find((o) => o.id === "sem-anteriores");
  if (semAnt && ids.includes("sem-anteriores")) {
    frasesObs.push(semAnt.texto);
  }
  const fraseCorr = frasesExamesCorrelacionados(correlacoes);
  if (fraseCorr) {
    frasesObs.push(fraseCorr);
  }
  for (const obs of obsCatalogo) {
    if (obs.id === "sem-anteriores") continue;
    if (!ids.includes(obs.id)) continue;
    frasesObs.push(obs.texto);
  }

  if (frasesObs.length > 0) {
    linhas.push("**OBSERVAÇÕES**");
    linhas.push("");
    for (const obs of frasesObs) {
      linhas.push(`• ${obs}`);
      linhas.push("");
    }
  }

  linhas.push("_______________________________");
  linhas.push("");
  linhas.push(assinatura?.trim() || "Médico(a) responsável");

  return linhas.join("\n").replace(/\n{3,}/g, "\n\n");
}
