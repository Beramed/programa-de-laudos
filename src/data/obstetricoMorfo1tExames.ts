import type { Exame, Secao } from "@/data/exames";
import {
  comCurvaReferenciaObst,
  secaoAchadosAdicionaisObst,
} from "@/lib/obstetricoDadosComuns";
import {
  IMPRESSAO_1T_BIOMETRIA_LAUDOUS,
  IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
  IMPRESSAO_MORFOLOGIA_OK_LAUDOUS,
  TEXTO_CCN_1T_LAUDOUS,
  TEXTO_MARCADORES_TN_LAUDOUS,
  TEXTO_MORFOLOGIA_1T_LAUDOUS,
  TEXTO_UTERO_1T_LAUDOUS,
  TEXTO_VITALIDADE_AUSENTE_LAUDOUS,
  TEXTO_VITALIDADE_LAUDOUS,
} from "@/lib/obstetricoLaudousFrases";

/** Técnica — morfológico 1º T (LaudoUS 1m / 1tn). */
export const TECNICA_OBSTETRICO_MORFO_1T =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via pélvica.";

function secoesObstetricoMorfo1t(): Secao[] {
  return [
    {
      id: "utero-anexos",
      titulo: "ÚTERO / COLO / ANEXOS",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem anormalidades (LaudoUS)",
          texto: TEXTO_UTERO_1T_LAUDOUS,
        },
        {
          id: "alterado",
          label: "Com alteração",
          texto: `${TEXTO_UTERO_1T_LAUDOUS}\nAchado adicional: ____.`,
          impressao: "Achado uterino / anexial: ____.",
        },
      ],
    },
    {
      id: "biometria",
      titulo: "BIOMETRIA (CCN)",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "CCN (LaudoUS)",
          texto: TEXTO_CCN_1T_LAUDOUS,
        },
      ],
    },
    {
      id: "vitalidade",
      titulo: "ATIVIDADE CARDÍACA / MOVIMENTOS",
      tipo: "unico",
      padrao: "presente",
      opcoes: [
        {
          id: "presente",
          label: "Presentes (LaudoUS)",
          texto: TEXTO_VITALIDADE_LAUDOUS,
        },
        {
          id: "ausente",
          label: "Ausentes",
          texto: TEXTO_VITALIDADE_AUSENTE_LAUDOUS,
          impressao: "Ausência de batimentos cardíacos fetais.",
        },
      ],
    },
    {
      id: "marcadores",
      titulo: "MARCADORES DE CROMOSSOMOPATIAS",
      tipo: "unico",
      padrao: "tn",
      opcoes: [
        {
          id: "tn",
          label: "Translucência nucal (LaudoUS)",
          texto: TEXTO_MARCADORES_TN_LAUDOUS,
        },
        {
          id: "tn-aumentada",
          label: "TN aumentada",
          texto: `Marcadores de cromossomopatias:\n- Translucência nucal aumentada: ____ mm.`,
          impressao: "Translucência nucal aumentada (____ mm).",
        },
        {
          id: "nao-citar",
          label: "Não citar",
          texto: "",
        },
      ],
    },
    {
      id: "morfologia",
      titulo: "MORFOLOGIA FETAL (1º TRIMESTRE)",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem alterações (LaudoUS)",
          texto: TEXTO_MORFOLOGIA_1T_LAUDOUS,
        },
        {
          id: "alterado",
          label: "Com alteração",
          texto: `${TEXTO_MORFOLOGIA_1T_LAUDOUS}\nAchado adicional / alteração: ____.`,
          impressao: "Alteração morfológica: ____.",
        },
      ],
    },
    {
      id: "conclusao",
      titulo: "IMPRESSÃO DIAGNÓSTICA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Morfologia normal (LaudoUS)",
          texto: "",
          impressao: `${IMPRESSAO_1T_BIOMETRIA_LAUDOUS}\n${IMPRESSAO_MORFOLOGIA_OK_LAUDOUS}`,
        },
        {
          id: "gestacao-normal",
          label: "Parâmetros da normalidade",
          texto: "",
          impressao: IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
        },
        {
          id: "alterado",
          label: "Com alteração",
          texto: "",
          impressao: "____.",
        },
      ],
    },
    secaoAchadosAdicionaisObst("Achados adicionais: ____."),
  ];
}

export function exameObstetricoMorfo1t(): Exame {
  return {
    id: "obstetrico-morfo-1t",
    nome: "Morfológico 1º Trimestre",
    tituloDocumento:
      "ULTRASSONOGRAFIA OBSTÉTRICA MORFOLÓGICA (1º TRIMESTRE)",
    tecnica: TECNICA_OBSTETRICO_MORFO_1T,
    secoes: comCurvaReferenciaObst(secoesObstetricoMorfo1t()),
    impressaoPadrao: `${IMPRESSAO_1T_BIOMETRIA_LAUDOUS}\n${IMPRESSAO_MORFOLOGIA_OK_LAUDOUS}`,
  };
}
