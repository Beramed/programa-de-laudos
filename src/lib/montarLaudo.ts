import type { Exame } from "@/data/exames";
import {
  frasesExamesCorrelacionados,
  observacoesDoExame,
} from "@/data/observacoes";
import {
  DISCLAIMER_IMPRESSAO,
  tituloMedico,
  type SessaoMedico,
} from "@/lib/auth";

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

export type RodapeLaudo = {
  medico: SessaoMedico;
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

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function montarRodapeHtml(medico: SessaoMedico): string {
  const nome = escaparHtml(tituloMedico(medico));
  const crm = escaparHtml(`CRM ${medico.crm}`);
  const local = escaparHtml((medico.localAtivo || "").trim().toUpperCase());
  const disclaimer = escaparHtml(`“${DISCLAIMER_IMPRESSAO}”`);
  const img = medico.assinaturaJpg
    ? `<img class="laudo-assinatura-img" src="${medico.assinaturaJpg}" alt="Assinatura" />`
    : `<div class="laudo-assinatura-espaco"></div>`;

  return `
<div class="laudo-rodape-v2">
  <div class="laudo-rodape-cols">
    <div class="laudo-rodape-esq">
      ${img}
      <div class="laudo-linha-assinatura"></div>
      <div class="laudo-nome">${nome}</div>
      <div class="laudo-crm">${crm}</div>
    </div>
    <div class="laudo-rodape-dir">
      ${local ? `<div class="laudo-local">${local}</div>` : "&nbsp;"}
    </div>
  </div>
  <p class="laudo-disclaimer">${disclaimer}</p>
</div>`.trim();
}

function montarRodapeTexto(medico: SessaoMedico): string {
  const linhas = [
    tituloMedico(medico),
    `CRM ${medico.crm}`,
  ];
  if (medico.localAtivo.trim()) {
    linhas.push(medico.localAtivo.trim().toUpperCase());
  }
  linhas.push("");
  linhas.push(`“${DISCLAIMER_IMPRESSAO}”`);
  return linhas.join("\n");
}

/** Converte marcadores **texto** e monta rodapé no estilo foto 2 */
export function laudoParaHtml(texto: string, medico?: SessaoMedico): string {
  const limpo = texto.replace(/@@RODAPE@@[\s\S]*$/m, "@@RODAPE@@");
  const escapado = limpo
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const comNegrito = escapado.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const partes = comNegrito.split("@@RODAPE@@");
  const corpo = partes[0].replace(/\n+$/, "").replace(/\n/g, "<br/>");

  if (!medico) {
    const rodape = (partes[1] || "")
      .replace(/^\n+/, "")
      .replace(/\n/g, "<br/>");
    return `${corpo}<div class="laudo-rodape">${rodape}</div>`;
  }

  return `${corpo}${montarRodapeHtml(medico)}`;
}

export function laudoTextoLimpo(texto: string, medico?: SessaoMedico): string {
  const base = texto
    .replace(/@@RODAPE@@[\s\S]*$/m, "")
    .replace(/\*\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();
  if (!medico) return base;
  return `${base}\n\n_______________________________\n\n${montarRodapeTexto(medico)}`;
}

export function montarLaudo(
  exame: Exame,
  selecoes: Selecoes,
  paciente: DadosPaciente,
  impressaoCustom?: string,
  _assinatura?: string,
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
  linhas.push("@@RODAPE@@");

  return linhas.join("\n").replace(/\n{3,}/g, "\n\n");
}
