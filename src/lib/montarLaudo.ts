import type { Exame } from "@/data/exames";

export type Selecoes = Record<string, string | string[]>;

export type DadosPaciente = {
  nome: string;
  idade: string;
  data: string;
  solicitante: string;
  indicacao: string;
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

export function montarLaudo(
  exame: Exame,
  selecoes: Selecoes,
  paciente: DadosPaciente,
  impressaoCustom?: string,
  assinatura?: string,
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

  linhas.push("TÉCNICA:");
  linhas.push(exame.tecnica);
  linhas.push("");
  linhas.push("RELATÓRIO:");

  for (const secao of exame.secoes) {
    const valor = selecoes[secao.id];
    if (secao.tipo === "unico") {
      const id = typeof valor === "string" ? valor : "";
      const opcao = secao.opcoes.find((o) => o.id === id);
      if (opcao?.texto.trim()) {
        linhas.push(opcao.texto.trim());
      }
    } else {
      const ids = Array.isArray(valor) ? valor : [];
      for (const id of ids) {
        const opcao = secao.opcoes.find((o) => o.id === id);
        if (opcao?.texto.trim()) {
          linhas.push(opcao.texto.trim());
        }
      }
    }
  }

  linhas.push("");
  linhas.push("IMPRESSÃO:");
  linhas.push(
    (impressaoCustom?.trim() || exame.impressaoPadrao).trim(),
  );
  linhas.push("");
  linhas.push("_______________________________");
  linhas.push(assinatura?.trim() || "Médico(a) responsável");

  return linhas.join("\n");
}
