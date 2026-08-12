export type Observacao = {
  id: string;
  texto: string;
};

/**
 * Lista mestra fixa — numeração de exibição 1..N igual para todos os exames.
 * O botão "Padrão" usa OBS_PADRAO_IDS (itens 1, 2, 7, 8 e 9 desta lista).
 */
export const observacoesPadraoLista: Observacao[] = [
  {
    id: "sem-anteriores",
    texto: "Exames anteriores não disponíveis para estudo comparativo.",
  },
  {
    id: "disposicao",
    texto: "Estaremos à disposição para a discussão do presente caso.",
  },
  {
    id: "gases",
    texto: "Exame prejudicado devido grande presença de gases intestinais.",
  },
  {
    id: "jup",
    texto: "JUP – Junção Uretero Piélica.",
  },
  {
    id: "controle",
    texto: "Conviria controle ecográfico periódico, a critério clínico.",
  },
  {
    id: "correlacionar-lab",
    texto: "Correlacionar com dados clínicos e laboratoriais.",
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

/** Itens do botão "Padrão" — correspondem aos números 1, 2, 7, 8 e 9 da lista mestra */
export const OBS_PADRAO_IDS = [
  "sem-anteriores",
  "disposicao",
  "achados-negativos",
  "correlacao-clinica",
  "limite-metodo",
] as const;

/** Observações extras que entram no "Padrão" conforme o exame */
const OBS_PADRAO_EXTRAS_POR_EXAME: Record<string, readonly string[]> = {
  prostata: ["prostata-restrito"],
};

/** IDs marcados pelo botão Padrão / laudo normal (lista mestra + extras do exame) */
export function observacoesPadraoIdsDoExame(exameId: string): string[] {
  const extras = OBS_PADRAO_EXTRAS_POR_EXAME[exameId] ?? [];
  return [...OBS_PADRAO_IDS, ...extras];
}

/** Observações extras por exame (aparecem após a lista mestra) */
const observacoesExtrasPorExame: Record<string, Observacao[]> = {
  prostata: [
    {
      id: "prostata-restrito",
      texto:
        "Exame restrito para avaliação do volume prostático, devendo ser correlacionado com os dados clínicos e exames laboratoriais específicos para pesquisa de neoplasia.",
    },
  ],
  pelvica: [
    {
      id: "pelvica-limite-ovarios",
      texto:
        "Exame não indicado para avaliação de ovários com precisão devido à limitação do método; para melhor avaliação estaria indicado exame ultrassonográfico transvaginal (quando possível) ou ressonância nuclear magnética de pelve.",
    },
  ],
  mamas: [
    {
      id: "mamas-mamografia",
      texto:
        "A critério clínico, tendo-se em conta o aspecto lipossubstituído do tecido mamário (normal para a pós-menopausa), estaria indicado para melhor avaliação estudo radiológico digital bilateral (mamografia digital).",
    },
  ],
  "mamas-masculino": [
    {
      id: "ginecomastia-correlacao",
      texto:
        "Achados compatíveis com ginecomastia. Correlacionar com dados clínicos, uso de medicações e, se necessário, com dosagens hormonais.",
    },
  ],
};

export function observacoesDoExame(exameId: string): Observacao[] {
  const extras = observacoesExtrasPorExame[exameId] ?? [];
  const idsMestra = new Set(observacoesPadraoLista.map((o) => o.id));
  const extrasUnicos = extras.filter((o) => !idsMestra.has(o.id));
  return [...observacoesPadraoLista, ...extrasUnicos];
}

/** @deprecated use observacoesPadraoLista — mantido para compatibilidade */
export const observacoesGerais = observacoesPadraoLista;

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
  return `${modalidade} de ${data}`;
}

export function frasesExamesCorrelacionados(
  itens: Array<{ modalidade: string; data: string }>,
): string | null {
  const partes = itens
    .filter((i) => i.modalidade.trim() && i.data.trim())
    .map((i) => fraseExameCorrelacionado(i.modalidade.trim(), i.data.trim()));
  if (partes.length === 0) return null;
  return `Exame correlacionado com ${partes.join(", ")}.`;
}
