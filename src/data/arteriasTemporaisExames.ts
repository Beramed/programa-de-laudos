import type { Exame, Secao } from "@/data/exames";

/** Modelo Laudário — Doppler de Artérias Temporais (`temporais.json`). */
export const TECNICA_ARTERIAS_TEMPORAIS =
  "Realizado exame de Doppler duplex das artérias temporais bilateralmente, com protocolo padrão, incluindo avaliação transversa e longitudinal, compressão segmentar e uso de modo de cor Doppler e modo de potência, conforme recomendações atuais. Utilizado transdutor linear de alta frequência.";

function secoesArteriasTemporais(): Secao[] {
  return [
    {
      id: "arterias-temporais",
      titulo: "ARTÉRIAS TEMPORAIS",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem sinais de arterite (Laudário)",
          texto:
            "As artérias temporais bilateralmente apresentam parede arterial de espessura normal, sem sinais de halo (espessamento mural homogêneo de espessura regular), compatível com a ausência de inflamação ativa.\nNão há sinais de alteração dos fluxos, incluindo ausência de turbulência ou habilidade de compressão compatível com artérias normais.\nAs bifurcações e segmentos analisados estão livres de irregularidades, estenoses ou aneurismas.\nNão foram detectados sinais de infiltrado perivascular, sinais de compressão ou alterações adicionais na avaliação qualiquantitativa.",
        },
        {
          id: "alterado",
          label: "Sugestivo de arterite",
          texto:
            "Artérias temporais: ____.\nHalo / espessamento mural: ____.\nFluxo / compressão: ____.",
          impressao:
            "Achados ultrassonográficos sugestivos de arterite de células gigantes: ____.",
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
          label: "Ausência de sinais (Laudário)",
          texto: "",
          impressao:
            "Ausência de sinais ultrassonográficos de arterite de células gigantes.\nDemais estruturas sem evidentes anormalidades apreciáveis ao método.",
        },
        {
          id: "alterado",
          label: "Com achados",
          texto: "",
          impressao: "____.",
        },
      ],
    },
  ];
}

export function exameArteriasTemporais(): Exame {
  return {
    id: "arterias-temporais",
    nome: "Doppler de artérias temporais",
    tituloDocumento: "DOPPLER DE ARTÉRIAS TEMPORAIS",
    tecnica: TECNICA_ARTERIAS_TEMPORAIS,
    secoes: secoesArteriasTemporais(),
    impressaoPadrao:
      "Ausência de sinais ultrassonográficos de arterite de células gigantes.\nDemais estruturas sem evidentes anormalidades apreciáveis ao método.",
  };
}
