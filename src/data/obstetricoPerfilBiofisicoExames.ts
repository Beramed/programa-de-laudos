import type { Exame, Secao } from "@/data/exames";
import {
  comCurvaReferenciaObst,
  secaoAchadosAdicionaisObst,
} from "@/lib/obstetricoDadosComuns";

/** Técnica Laudário — perfil biofísico */
export const TECNICA_PERFIL_BIOFISICO =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via abdominal.";

function secoesPerfilBiofisico(): Secao[] {
  return [
    {
      id: "cardiotocografia",
      titulo: "CARDIOTOCOGRAFIA BASAL",
      tipo: "unico",
      padrao: "nao-avaliada",
      opcoes: [
        {
          id: "nao-avaliada",
          label: "Não avaliada (nota 0) — Laudário",
          texto:
            "Cardiotocografia basal (NOTA 0)\nO exame não foi avaliado.",
        },
        {
          id: "reativo",
          label: "Padrão reativo (nota 2)",
          texto:
            "Cardiotocografia basal (NOTA 2)\nPadrão reativo.",
        },
        {
          id: "nao-reativo",
          label: "Padrão não reativo (nota 0)",
          texto:
            "Cardiotocografia basal (NOTA 0)\nPadrão não reativo.",
          impressao: "Cardiotocografia basal não reativa.",
        },
      ],
    },
    {
      id: "movimentos-respiratorios",
      titulo: "MOVIMENTOS RESPIRATÓRIOS",
      tipo: "unico",
      padrao: "presentes",
      opcoes: [
        {
          id: "presentes",
          label: "Presentes (nota 2) — Laudário",
          texto:
            "Movimentos respiratórios (NOTA 2)\nPresença de pelo menos um episódio de movimentos respiratórios fetais sustentados (>= 30 segundos) durante o período de observação.",
        },
        {
          id: "ausentes",
          label: "Ausentes (nota 0)",
          texto:
            "Movimentos respiratórios (NOTA 0)\nAusência de episódio de movimentos respiratórios fetais sustentados (>= 30 segundos) durante o período de observação.",
          impressao: "Movimentos respiratórios ausentes no perfil biofísico.",
        },
      ],
    },
    {
      id: "tonus",
      titulo: "TÔNUS FETAL",
      tipo: "unico",
      padrao: "presente",
      opcoes: [
        {
          id: "presente",
          label: "Presente (nota 2) — Laudário",
          texto:
            "Tônus fetal (NOTA 2)\nPresença de pelo menos um episódio de extensão com retorno à flexão ou abertura e fechamento da mão durante o período de observação.",
        },
        {
          id: "ausente",
          label: "Ausente (nota 0)",
          texto:
            "Tônus fetal (NOTA 0)\nAusência de episódio de extensão com retorno à flexão ou abertura e fechamento da mão durante o período de observação.",
          impressao: "Tônus fetal ausente no perfil biofísico.",
        },
      ],
    },
    {
      id: "movimentos-fetais",
      titulo: "MOVIMENTOS FETAIS",
      tipo: "unico",
      padrao: "presentes",
      opcoes: [
        {
          id: "presentes",
          label: "Presentes (nota 2) — Laudário",
          texto:
            "Movimentos fetais (NOTA 2)\nPresença de pelo menos três movimentos corporais fetais durante o período de observação.",
        },
        {
          id: "ausentes",
          label: "Ausentes (nota 0)",
          texto:
            "Movimentos fetais (NOTA 0)\nAusência de pelo menos três movimentos corporais fetais durante o período de observação.",
          impressao: "Movimentos fetais ausentes no perfil biofísico.",
        },
      ],
    },
    {
      id: "liquido",
      titulo: "LÍQUIDO AMNIÓTICO",
      tipo: "unico",
      padrao: "bolsao",
      opcoes: [
        {
          id: "bolsao",
          label: "Bolsão ≥ 2 x 2 cm (nota 2) — Laudário",
          texto:
            "Líquido amniótico (NOTA 2)\nPresença de bolsão de líquido amniótico >= 2 x 2 cm.",
        },
        {
          id: "ausente",
          label: "Sem bolsão ≥ 2 x 2 cm (nota 0)",
          texto:
            "Líquido amniótico (NOTA 0)\nAusência de bolsão de líquido amniótico >= 2 x 2 cm.",
          impressao: "Líquido amniótico insuficiente no perfil biofísico.",
        },
        {
          id: "ila",
          label: "Com ILA",
          texto:
            "Líquido amniótico (NOTA ____)\nÍndice de líquido amniótico (ILA): ____ cm.",
        },
      ],
    },
    {
      id: "conclusao",
      titulo: "IMPRESSÃO DIAGNÓSTICA",
      tipo: "unico",
      padrao: "normal-8-8",
      opcoes: [
        {
          id: "normal-8-8",
          label: "8/8 normal (sem CTG)",
          texto: "",
          impressao:
            "Perfil biofísico fetal com pontuação de 8/8, dentro dos parâmetros da normalidade, sem evidências de comprometimento fetal no momento do exame.",
        },
        {
          id: "normal-10-10",
          label: "10/10 normal (com CTG)",
          texto: "",
          impressao:
            "Perfil biofísico fetal com pontuação de 10/10, dentro dos parâmetros da normalidade, sem evidências de comprometimento fetal no momento do exame.",
        },
        {
          id: "alterado",
          label: "Pontuação alterada",
          texto: "",
          impressao:
            "Perfil biofísico fetal com pontuação de ____/____.\n____.",
        },
      ],
    },
    secaoAchadosAdicionaisObst("Achados adicionais: ____."),
  ];
}

export function exameObstetricoPerfilBiofisico(): Exame {
  return {
    id: "obstetrico-perfil-biofisico",
    nome: "Perfil biofísico fetal",
    tituloDocumento: "ULTRASSONOGRAFIA DO PERFIL BIOFÍSICO FETAL",
    tecnica: TECNICA_PERFIL_BIOFISICO,
    secoes: comCurvaReferenciaObst(secoesPerfilBiofisico()),
    impressaoPadrao:
      "Perfil biofísico fetal com pontuação de 8/8, dentro dos parâmetros da normalidade, sem evidências de comprometimento fetal no momento do exame.",
  };
}
