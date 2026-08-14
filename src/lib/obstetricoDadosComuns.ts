import type { Secao } from "@/data/exames";

/** Campos demográficos gestacionais compartilhados (DUM / IG / equipamento). */
export const CHAVES_OBST_DADOS = {
  dum: "obst-dum",
  igSemanas: "obst-ig-dum-semanas",
  igDias: "obst-ig-dum-dias",
  equipamento: "obst-equipamento",
} as const;

/** Compatível com chaves legadas do TV precoce */
const LEGADO_TV = {
  dum: "obst-tv-dum",
  igSemanas: "obst-tv-ig-dum-semanas",
  igDias: "obst-tv-ig-dum-dias",
  equipamento: "obst-tv-equipamento",
} as const;

function lerVolume(
  volumes: Record<string, string> | undefined,
  chave: string,
  legado?: string,
): string {
  const atual = (volumes?.[chave] ?? "").trim();
  if (atual) return atual;
  if (legado) return (volumes?.[legado] ?? "").trim();
  return "";
}

export function textoDadosGestacionaisObst(
  volumes: Record<string, string> | undefined,
): string {
  const dum =
    lerVolume(volumes, CHAVES_OBST_DADOS.dum, LEGADO_TV.dum) || "____";
  const sem =
    lerVolume(volumes, CHAVES_OBST_DADOS.igSemanas, LEGADO_TV.igSemanas) ||
    "____";
  const dias =
    lerVolume(volumes, CHAVES_OBST_DADOS.igDias, LEGADO_TV.igDias) || "____";
  return [
    `Data da última menstruação: ${dum} IG (menstrual): ${sem} semanas e ${dias} dias`,
  ].join("\n");
}

export function aplicarEquipamentoObst(
  tecnica: string,
  volumes: Record<string, string> | undefined,
): string {
  const eq =
    lerVolume(volumes, CHAVES_OBST_DADOS.equipamento, LEGADO_TV.equipamento) ||
    "____";
  return tecnica.replace(/equipamento ____/, `equipamento ${eq}`);
}

export function valorCampoObst(
  volumes: Record<string, string> | undefined,
  campo: keyof typeof CHAVES_OBST_DADOS,
): string {
  return lerVolume(volumes, CHAVES_OBST_DADOS[campo], LEGADO_TV[campo]);
}

export const EXAMES_COM_DADOS_GESTACIONAIS = new Set([
  "obstetrico-tv-precoce",
  "obstetrico-morfo-1t",
  "obstetrico-gemelar-1t",
  "obstetrico",
  "obstetrico-morfo-2t",
  "obstetrico-doppler",
  "obstetrico-gemelar-doppler",
  "obstetrico-perfil-biofisico",
  "eco-fetal",
  "eco-fetal-gemelar",
  "cervicometria",
  "obstetrico-3d4d",
]);

/** Tópico separado de achados adicionais (Obstetrícia). */
export function secaoAchadosAdicionaisObst(
  textoComAchados = "Achados adicionais: ____.",
): Secao {
  return {
    id: "achados-adicionais",
    titulo: "OBSERVAÇÃO",
    tipo: "unico",
    padrao: "sem-achados",
    opcoes: [
      {
        id: "sem-achados",
        label: "Sem observação",
        texto: "",
      },
      {
        id: "com-achados",
        label: "Com observação",
        texto: textoComAchados,
        impressao: textoComAchados,
      },
    ],
  };
}

/** Comparativo biométrico: Hadlock / OMS / FMF — escolha obrigatória nos laudos obstétricos. */
export function secaoCurvaReferenciaObst(): Secao {
  return {
    id: "curva-referencia",
    titulo: "TABELA DE REFERÊNCIA (COMPARATIVO)",
    tipo: "unico",
    padrao: "hadlock-1991",
    opcoes: [
      {
        id: "hadlock-1991",
        label: "Hadlock (1991)",
        texto:
          "Comparativo biométrico e de crescimento fetal segundo a tabela de Hadlock (1991).\nPercentil estimado: ____. Biometria ____ (adequada / abaixo / acima) para a idade gestacional pela curva de Hadlock.",
      },
      {
        id: "oms-who",
        label: "OMS (WHO)",
        texto:
          "Comparativo biométrico e de crescimento fetal segundo a tabela da OMS (WHO).\nPercentil estimado: ____. Biometria ____ (adequada / abaixo / acima) para a idade gestacional pela curva da OMS (WHO).",
      },
      {
        id: "fmf",
        label: "Fetal Medicine Foundation (FMF)",
        texto:
          "Comparativo biométrico e de crescimento fetal segundo a Fetal Medicine Foundation (FMF).\nPercentil estimado: ____. Biometria ____ (adequada / abaixo / acima) para a idade gestacional pela curva da FMF.",
      },
    ],
  };
}

/** Insere a seção de curva de referência antes da conclusão / achados adicionais. */
export function comCurvaReferenciaObst(secoes: Secao[]): Secao[] {
  if (secoes.some((s) => s.id === "curva-referencia")) return secoes;
  const secao = secaoCurvaReferenciaObst();
  const idx = secoes.findIndex((s) =>
    ["conclusao", "achados-adicionais", "riscos-cromossomicos"].includes(s.id),
  );
  if (idx < 0) return [...secoes, secao];
  return [...secoes.slice(0, idx), secao, ...secoes.slice(idx)];
}

export const EXAMES_OBSTETRICOS = new Set([
  "obstetrico-tv-precoce",
  "obstetrico-morfo-1t",
  "obstetrico-gemelar-1t",
  "obstetrico",
  "obstetrico-morfo-2t",
  "obstetrico-doppler",
  "obstetrico-gemelar-doppler",
  "obstetrico-perfil-biofisico",
  "obstetrico-3d4d",
  "cervicometria",
  "eco-fetal",
  "eco-fetal-gemelar",
]);

