export type Observacao = {
  id: string;
  texto: string;
};

/** Observações comuns a todos os exames de US */
export const observacoesGerais: Observacao[] = [
  {
    id: "sem-anteriores",
    texto:
      "Exames anteriores não disponíveis para estudo comparativo.",
  },
  {
    id: "disposicao",
    texto:
      "Estaremos à disposição para a discussão do presente caso.",
  },
  {
    id: "achados-negativos",
    texto:
      "Achados negativos na ultrassonografia não excluem a necessidade de prosseguir a investigação na presença de dados clínicos positivos.",
  },
  {
    id: "correlacao-clinica",
    texto:
      "Os achados descritos devem ser correlacionados com a história clínica, exame físico e demais exames complementares.",
  },
  {
    id: "limite-metodo",
    texto:
      "A ultrassonografia apresenta limitações inerentes ao método; eventuais alterações não visualizadas não afastam a necessidade de complementação diagnóstica quando clinicamente indicado.",
  },
  {
    id: "nao-substitui",
    texto:
      "Este laudo não substitui a avaliação clínica completa nem dispensa outros métodos de imagem quando houver indicação.",
  },
];

/** Observações específicas por tipo de exame */
export const observacoesPorExame: Record<string, Observacao[]> = {
  "abdome-total": [
    {
      id: "gases",
      texto:
        "Exame prejudicado devido grande presença de gases intestinais.",
    },
    {
      id: "jup",
      texto: "JUP – Junção Uretero Piélica.",
    },
    {
      id: "preparo",
      texto:
        "A qualidade do estudo depende do preparo intestinal e da cooperação do paciente; segmentos mal visualizados devem ser reavaliados se houver indicação clínica.",
    },
    {
      id: "apendicite",
      texto:
        "A não visualização do apêndice cecal não exclui apendicite; correlacionar clinicamente e considerar outros métodos se a suspeita persistir.",
    },
  ],
  "abdome-superior": [
    {
      id: "gases",
      texto:
        "Exame prejudicado devido grande presença de gases intestinais.",
    },
    {
      id: "preparo",
      texto:
        "A qualidade do estudo depende do preparo e da janela acústica; estruturas parcialmente visualizadas merecem correlação clínica.",
    },
    {
      id: "pancreas-limite",
      texto:
        "A avaliação pancreática pode ser limitada por interposição gasosa; ausência de alteração no segmento visualizado não exclui patologia.",
    },
  ],
  tireoide: [
    {
      id: "tirads-limite",
      texto:
        "A classificação de nódulos e a conduta dependem de critérios completos (incluindo medidas) e correlação clínica/laboratorial; este exame não substitui a avaliação endocrinológica.",
    },
    {
      id: "linfonodo",
      texto:
        "A ausência de linfonodos com morfologia suspeita neste exame não exclui acometimento linfonodal; correlacionar clinicamente.",
    },
  ],
  pelvica: [
    {
      id: "bexiga-replecao",
      texto:
        "A avaliação pélvica por via abdominal depende de repleção vesical adequada; estruturas não caracterizadas podem exigir complementação por via endovaginal, se indicado.",
    },
    {
      id: "ciclo",
      texto:
        "Achados uterinos e ovarianos devem ser interpretados conforme a fase do ciclo menstrual / status hormonal e o contexto clínico.",
    },
  ],
  mamas: [
    {
      id: "birads-limite",
      texto:
        "A classificação BI-RADS e a conduta devem considerar o conjunto clínico-radiológico; este exame não substitui mamografia ou biópsia quando indicadas.",
    },
    {
      id: "densidade",
      texto:
        "Mamas densas ou heterogêneas podem reduzir a sensibilidade da ultrassonografia; correlacionar com mamografia e clínica.",
    },
    {
      id: "us-nao-substitui-mx",
      texto:
        "A ultrassonografia mamária não substitui a mamografia no rastreamento, salvo indicação clínica específica.",
    },
  ],
  "aparelho-urinario": [
    {
      id: "gases",
      texto:
        "Exame prejudicado devido grande presença de gases intestinais.",
    },
    {
      id: "jup",
      texto: "JUP – Junção Uretero Piélica.",
    },
    {
      id: "calculo-limite",
      texto:
        "A ausência de cálculo visualizado não exclui litíase ureteral, especialmente em trajetos mal acessíveis ao método; correlacionar clinicamente e com outros exames se necessário.",
    },
  ],
  "obstetrico-1t": [
    {
      id: "idade-gestacional",
      texto:
        "A idade gestacional estimada por ultrassonografia deve ser correlacionada com a data da última menstruação e com exames prévios, quando disponíveis.",
    },
    {
      id: "vitalidade",
      texto:
        "A avaliação da vitalidade embrionária neste exame reflete o momento da realização; alterações clínicas posteriores merecem reavaliação.",
    },
    {
      id: "ectopica",
      texto:
        "A identificação de gestação tópica não exclui, por si só, a necessidade de investigação adicional na presença de sinais clínicos de gravidez ectópica.",
    },
  ],
};

export function observacoesDoExame(exameId: string): Observacao[] {
  const especificas = observacoesPorExame[exameId] ?? [];
  const ids = new Set(especificas.map((o) => o.id));
  const gerais = observacoesGerais.filter((o) => !ids.has(o.id));
  const todas = [...especificas, ...gerais];
  // "Exames anteriores não disponíveis..." sempre no topo das observações
  const semAnt = todas.find((o) => o.id === "sem-anteriores");
  const resto = todas.filter((o) => o.id !== "sem-anteriores");
  return semAnt ? [semAnt, ...resto] : resto;
}

export const modalidadesCorrelacao = [
  "ultrassonografia",
  "mamografia",
  "tomografia computadorizada",
  "ressonância magnética",
] as const;

export type ModalidadeCorrelacao = (typeof modalidadesCorrelacao)[number];

export function fraseExameCorrelacionado(
  modalidade: string,
  data: string,
): string {
  return `Exame correlacionado com ${modalidade} de ${data}.`;
}
