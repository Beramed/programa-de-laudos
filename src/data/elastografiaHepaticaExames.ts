import type { Exame, Secao } from "@/data/exames";

/** Modelo Laudário — Elastografia Hepática (item separado). */
export const TECNICA_ELASTOGRAFIA_HEPATICA =
  "Estudo de elastografia hepática realizado pela técnica de elastografia bidimensional de onda de cisalhamento (2D-SWE), no equipamento ____.";

const TABELA_REGRA_4 = `Valores de rigidez hepática na Doença Hepática Crônica Avançada Compensada (DHCAc):
< 5,0 kPa — Alta probabilidade de exame normal.
> 5,0 a < 9,0 kPa — Na ausência de outros sinais clínicos, descarta DHCAc.
9,0 a 13,0 kPa — Sugestivo de DHCAc. Outros testes são necessários para confirmação.
> 13,0 kPa — Compatível com DHCAc.
> 17,0 kPa — Sugestivo de hipertensão portal clinicamente significativa.`;

function secoesElastografiaHepatica(): Secao[] {
  return [
    {
      id: "tecnica-protocolo",
      titulo: "TÉCNICA E PROTOCOLO",
      tipo: "unico",
      padrao: "2d-swe",
      opcoes: [
        {
          id: "2d-swe",
          label: "2D-SWE (Laudário)",
          texto:
            "Estudo de elastografia hepática realizado pela técnica de elastografia bidimensional de onda de cisalhamento (2D-SWE), no equipamento ____.",
        },
        {
          id: "pswe",
          label: "pSWE / ARFI pontual",
          texto:
            "Estudo de elastografia hepática realizado pela técnica de elastografia pontual de onda de cisalhamento (pSWE / ARFI pontual), no equipamento ____.",
        },
      ],
    },
    {
      id: "condicoes",
      titulo: "CONDIÇÕES TÉCNICAS",
      tipo: "unico",
      padrao: "adequada",
      opcoes: [
        {
          id: "adequada",
          label: "Janela adequada",
          texto:
            "Janela acústica adequada, avaliação completa.\nProtocolo completo, decúbito dorsal, braço direito estendido, apneia neutra.",
        },
        {
          id: "limitada",
          label: "Janela parcialmente limitada",
          texto:
            "Janela acústica parcialmente limitada, avaliação subótima.\nProtocolo adaptado: ____.",
          impressao: "Avaliação elastográfica com limitação técnica.",
        },
        {
          id: "nao-realizavel",
          label: "Não realizável",
          texto: "Exame tecnicamente não realizável: ____.",
          impressao: "Elastografia hepática tecnicamente não realizável.",
        },
      ],
    },
    {
      id: "medicoes",
      titulo: "MEDIÇÕES E QUALIDADE",
      tipo: "unico",
      padrao: "2d-swe-5",
      opcoes: [
        {
          id: "2d-swe-5",
          label: "5 medições 2D-SWE (padrão)",
          texto:
            "Foram obtidas 5 medições (padrão recomendado para 2D-SWE).\nValor mediano da rigidez hepática: ____ kPa (____ m/s).\nIQR/M: ____ %.\nLocalização: parênquima hepático direito, espaço intercostal, ≥ 20 mm abaixo da cápsula.\nCritérios de qualidade do fabricante: ____ (dentro dos limites / limítrofes / não documentados).",
        },
        {
          id: "pswe-10",
          label: "10 medições pSWE (padrão)",
          texto:
            "Foram obtidas 10 medições (padrão recomendado para pSWE).\nValor mediano da rigidez hepática: ____ kPa (____ m/s).\nIQR/M: ____ %.\nLocalização: parênquima hepático direito, espaço intercostal, ≥ 20 mm abaixo da cápsula.\nCritérios de qualidade do fabricante: ____ (dentro dos limites / limítrofes / não documentados).",
        },
        {
          id: "livre",
          label: "Descrever",
          texto:
            "Número de medições: ____.\nValor mediano da rigidez hepática: ____ kPa (____ m/s).\nIQR/M: ____ %.\nLocalização: ____.",
        },
      ],
    },
    {
      id: "interpretacao",
      titulo: "INTERPRETAÇÃO (REGRA DOS 4 — SRU 2020)",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "< 5 kPa — alta probabilidade de normal",
          texto: `${TABELA_REGRA_4}\n\nInterpretação: mediana < 5,0 kPa — alta probabilidade de exame normal.`,
          impressao:
            "Rigidez hepática com alta probabilidade de exame normal (< 5,0 kPa).",
        },
        {
          id: "5-9",
          label: "> 5 a < 9 kPa — descarta DHCAc (sem sinais)",
          texto: `${TABELA_REGRA_4}\n\nInterpretação: mediana > 5,0 e < 9,0 kPa — na ausência de outros sinais clínicos, descarta DHCAc.`,
          impressao:
            "Rigidez hepática > 5,0 e < 9,0 kPa; na ausência de outros sinais clínicos, descarta DHCAc.",
        },
        {
          id: "9-13",
          label: "9 a 13 kPa — sugestivo de DHCAc",
          texto: `${TABELA_REGRA_4}\n\nInterpretação: mediana 9,0 a 13,0 kPa — sugestivo de DHCAc. Outros testes são necessários para confirmação.`,
          impressao:
            "Rigidez hepática sugestiva de DHCAc (9,0 a 13,0 kPa).",
        },
        {
          id: "maior-13",
          label: "> 13 kPa — compatível com DHCAc",
          texto: `${TABELA_REGRA_4}\n\nInterpretação: mediana > 13,0 kPa — compatível com DHCAc.`,
          impressao: "Rigidez hepática compatível com DHCAc (> 13,0 kPa).",
        },
        {
          id: "maior-17",
          label: "> 17 kPa — sugestivo de HPCS",
          texto: `${TABELA_REGRA_4}\n\nInterpretação: mediana > 17,0 kPa — sugestivo de hipertensão portal clinicamente significativa.`,
          impressao:
            "Rigidez hepática sugestiva de hipertensão portal clinicamente significativa (> 17,0 kPa).",
        },
      ],
    },
    {
      id: "etiologia",
      titulo: "CONTEXTO ETIOLÓGICO",
      tipo: "unico",
      padrao: "nenhum",
      opcoes: [
        { id: "nenhum", label: "Não citar", texto: "" },
        {
          id: "masld",
          label: "MASLD/MASH",
          texto: "Contexto etiológico: MASLD/MASH.",
        },
        {
          id: "viral-b",
          label: "Hepatite B",
          texto: "Contexto etiológico: hepatite viral B.",
        },
        {
          id: "viral-c",
          label: "Hepatite C",
          texto: "Contexto etiológico: hepatite viral C.",
        },
        {
          id: "alcoolica",
          label: "Hepatopatia alcoólica",
          texto: "Contexto etiológico: hepatopatia alcoólica.",
        },
        {
          id: "outra",
          label: "Outra / não determinada",
          texto: "Contexto etiológico: ____.",
        },
      ],
    },
    {
      id: "fatores-confusao",
      titulo: "FATORES DE CONFUSÃO",
      tipo: "unico",
      padrao: "padrao",
      opcoes: [
        {
          id: "padrao",
          label: "Considerações técnicas padrão (Laudário)",
          texto:
            "Considerações técnicas: Os resultados podem ser influenciados por fatores confundidores, incluindo inflamação hepática, elevação significativa de aminotransferases, congestão hepática, colestase, estado pós-prandial e exercício físico recente.\nEste exame deve ser interpretado em conjunto com dados clínicos, laboratoriais e outros achados de imagem.",
        },
        {
          id: "com-fatores",
          label: "Citar fatores específicos",
          texto:
            "Fatores de confusão / limitações: ____.\nEste exame deve ser interpretado em conjunto com dados clínicos, laboratoriais e outros achados de imagem.",
        },
      ],
    },
    {
      id: "esplenica",
      titulo: "ELASTOGRAFIA ESPLÊNICA",
      tipo: "unico",
      padrao: "nao",
      opcoes: [
        { id: "nao", label: "Não realizada", texto: "" },
        {
          id: "sim",
          label: "Realizada",
          texto:
            "Elastografia esplênica complementar:\nNúmero de medições: ____.\nMediana: ____ kPa (____ m/s).\nIQR/M: ____ %.\nInterpretação (Baveno VII-SSM): ____.",
        },
      ],
    },
    {
      id: "gordurosa",
      titulo: "QUANTIFICAÇÃO GORDUROSA",
      tipo: "unico",
      padrao: "nao",
      opcoes: [
        { id: "nao", label: "Não incluir", texto: "" },
        {
          id: "sim",
          label: "Incluir",
          texto:
            "Quantificação gordurosa hepática:\nTecnologia: ____.\nValor quantificado: ____ %.\nÍndice de qualidade: ____.\nClassificação: ____.",
        },
      ],
    },
    {
      id: "conclusao",
      titulo: "OPINIÃO DO RELATÓRIO",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Alta probabilidade de normal",
          texto: "",
          impressao:
            "Elastografia hepática com mediana de ____ kPa, com alta probabilidade de exame normal.\nDemais estruturas sem evidentes anormalidades apreciáveis ao método.",
        },
        {
          id: "alterado",
          label: "Com alteração / DHCAc / HPCS",
          texto: "",
          impressao:
            "Elastografia hepática com mediana de ____ kPa: ____.\nCorrelacionar com dados clínicos e laboratoriais.",
        },
      ],
    },
  ];
}

export function exameElastografiaHepatica(): Exame {
  return {
    id: "elastografia-hepatica",
    nome: "Elastografia hepática",
    tituloDocumento: "ELASTOGRAFIA HEPÁTICA",
    tecnica: TECNICA_ELASTOGRAFIA_HEPATICA,
    secoes: secoesElastografiaHepatica(),
    impressaoPadrao:
      "Elastografia hepática com mediana de ____ kPa, com alta probabilidade de exame normal.\nDemais estruturas sem evidentes anormalidades apreciáveis ao método.",
  };
}
