import type { Exame, Secao } from "@/data/exames";

/** Modelo Laudário — Transfontanelar. */
export const TECNICA_TRANSFONTANELAR =
  "Exame realizado em aparelho dinâmico com transdutor setorial.";

function secoesTransfontanelar(): Secao[] {
  return [
    {
      id: "parenquima",
      titulo: "PARÊNQUIMA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal (Laudário)",
          texto:
            "Parênquima cerebral com ecogenicidade e ecotextura habituais.\nGiros e sulcos preservados e com ecogenicidade habitual.\nSulco caudotalâmico com aspecto habitual.\nTálamos com ecogenicidade e ecotextura habituais.\nPlexos coróides com tamanho e forma habituais.\nCerebelo com ecogenicidade e ecotextura habituais.\nParênquima periventricular com ecogenicidade e ecotextura habituais.\nFossa posterior com tamanho habitual.\nCorpo caloso presente e íntegro.\nVermis cerebelar presente e com tamanho normal.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "Parênquima / estruturas: ____.",
          impressao: "Alteração encefálica: ____.",
        },
      ],
    },
    {
      id: "linha-media",
      titulo: "LINHA MÉDIA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Preservada (Laudário)",
          texto: "Estruturas de linha média preservadas.",
        },
        {
          id: "alterado",
          label: "Alterada",
          texto: "Linha média: ____.",
          impressao: "Alteração da linha média.",
        },
      ],
    },
    {
      id: "ventriculos",
      titulo: "VENTRÍCULOS E MEDIDAS",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normais (Laudário)",
          texto:
            "Ventrículos laterais com tamanho e conteúdo habituais.\n3º ventrículo sem dilatação.\n4º ventrículo sem dilatação.",
        },
        {
          id: "dilatado",
          label: "Com dilatação",
          texto:
            "Ventrículos laterais: ____.\n3º ventrículo: ____.\n4º ventrículo: ____.\nMedidas: ____.",
          impressao: "Dilatação ventricular: ____.",
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
          label: "Sem anormalidades (Laudário)",
          texto: "",
          impressao:
            "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.",
        },
        {
          id: "alterado",
          label: "Com alteração",
          texto: "",
          impressao: "____.",
        },
      ],
    },
  ];
}

export function exameTransfontanelar(): Exame {
  return {
    id: "transfontanelar",
    nome: "Transfontanelar",
    tituloDocumento: "ULTRASSONOGRAFIA TRANSFONTANELAR",
    tecnica: TECNICA_TRANSFONTANELAR,
    secoes: secoesTransfontanelar(),
    impressaoPadrao:
      "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.",
  };
}

/** Modelo Laudário — Quadril Infantil (Graf). */
export const TECNICA_QUADRIL_INFANTIL =
  "Exame realizado com transdutor linear de alta frequência, conforme técnica de Graf, com avaliação bilateral dos quadris.";

function secoesQuadrilInfantil(): Secao[] {
  return [
    {
      id: "idade",
      titulo: "IDADE (SEMANAS)",
      tipo: "unico",
      padrao: "idade",
      opcoes: [
        {
          id: "idade",
          label: "Informar idade",
          texto:
            "Idade do paciente: ____ semanas (necessária para classificação pelo método de Graf).",
        },
      ],
    },
    {
      id: "quadril-direito",
      titulo: "QUADRIL DIREITO",
      tipo: "unico",
      padrao: "tipo-1",
      opcoes: [
        {
          id: "tipo-1",
          label: "Tipo I (maduro)",
          texto:
            "Quadril direito:\nÂngulo alfa: ____°.\nÂngulo beta: ____°.\nClassificação de Graf: tipo I (quadril maduro).",
        },
        {
          id: "tipo-2",
          label: "Tipo II",
          texto:
            "Quadril direito:\nÂngulo alfa: ____°.\nÂngulo beta: ____°.\nClassificação de Graf: tipo II (____).",
          impressao: "Quadril direito tipo II de Graf.",
        },
        {
          id: "tipo-3-4",
          label: "Tipo III / IV",
          texto:
            "Quadril direito:\nÂngulo alfa: ____°.\nÂngulo beta: ____°.\nClassificação de Graf: tipo ____ (III/IV).",
          impressao: "Quadril direito tipo ____ de Graf.",
        },
      ],
    },
    {
      id: "quadril-esquerdo",
      titulo: "QUADRIL ESQUERDO",
      tipo: "unico",
      padrao: "tipo-1",
      opcoes: [
        {
          id: "tipo-1",
          label: "Tipo I (maduro)",
          texto:
            "Quadril esquerdo:\nÂngulo alfa: ____°.\nÂngulo beta: ____°.\nClassificação de Graf: tipo I (quadril maduro).",
        },
        {
          id: "tipo-2",
          label: "Tipo II",
          texto:
            "Quadril esquerdo:\nÂngulo alfa: ____°.\nÂngulo beta: ____°.\nClassificação de Graf: tipo II (____).",
          impressao: "Quadril esquerdo tipo II de Graf.",
        },
        {
          id: "tipo-3-4",
          label: "Tipo III / IV",
          texto:
            "Quadril esquerdo:\nÂngulo alfa: ____°.\nÂngulo beta: ____°.\nClassificação de Graf: tipo ____ (III/IV).",
          impressao: "Quadril esquerdo tipo ____ de Graf.",
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
          label: "Tipo I bilateral",
          texto: "",
          impressao:
            "Quadris com classificação de Graf tipo I bilateralmente (maduros).\nDemais estruturas sem evidentes anormalidades apreciáveis ao método.",
        },
        {
          id: "alterado",
          label: "Com alteração",
          texto: "",
          impressao: "____.",
        },
      ],
    },
  ];
}

export function exameQuadrilInfantil(): Exame {
  return {
    id: "quadril-infantil",
    nome: "Quadril infantil",
    tituloDocumento: "ULTRASSONOGRAFIA DOS QUADRIS (MÉTODO DE GRAF)",
    tecnica: TECNICA_QUADRIL_INFANTIL,
    secoes: secoesQuadrilInfantil(),
    impressaoPadrao:
      "Quadris com classificação de Graf tipo I bilateralmente (maduros).\nDemais estruturas sem evidentes anormalidades apreciáveis ao método.",
  };
}
