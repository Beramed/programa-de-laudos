import type { Exame, Secao } from "@/data/exames";
import {
  comCurvaReferenciaObst,
  secaoAchadosAdicionaisObst,
} from "@/lib/obstetricoDadosComuns";
import {
  IMPRESSAO_BIOMETRIA_LAUDOUS,
  IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
  IMPRESSAO_MORFOLOGIA_OK_LAUDOUS,
  TEXTO_BIOMETRIA_LAUDOUS,
  TEXTO_CORDAO_LAUDOUS,
  TEXTO_FETO_SITUACAO_LAUDOUS,
  TEXTO_FETO_SITUACAO_LIVRE_LAUDOUS,
  TEXTO_LIQUIDO_ALTERADO_LAUDOUS,
  TEXTO_LIQUIDO_LAUDOUS,
  TEXTO_MORFOLOGIA_2T_LAUDOUS,
  TEXTO_PLACENTA_LAUDOUS,
  TEXTO_PLACENTA_LIVRE_LAUDOUS,
  TEXTO_VITALIDADE_AUSENTE_LAUDOUS,
  TEXTO_VITALIDADE_LAUDOUS,
} from "@/lib/obstetricoLaudousFrases";

/** Técnica — morfológico 2º/3º T (LaudoUS 23m). */
export const TECNICA_OBSTETRICO_MORFO_2T =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via abdominal.";

function secoesObstetricoMorfo2t(): Secao[] {
  return [
    {
      id: "situacao-fetal",
      titulo: "FETO — SITUAÇÃO / APRESENTAÇÃO / DORSO",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Longitudinal / cefálica / dorso E (LaudoUS)",
          texto: TEXTO_FETO_SITUACAO_LAUDOUS,
        },
        {
          id: "livre",
          label: "Preencher livremente",
          texto: TEXTO_FETO_SITUACAO_LIVRE_LAUDOUS,
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
      id: "cordao",
      titulo: "CORDÃO UMBILICAL",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Três vasos (LaudoUS)",
          texto: TEXTO_CORDAO_LAUDOUS,
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "Cordão umbilical: ____.",
          impressao: "Alteração do cordão umbilical.",
        },
      ],
    },
    {
      id: "biometria",
      titulo: "BIOMETRIA FETAL",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Biometria (LaudoUS)",
          texto: TEXTO_BIOMETRIA_LAUDOUS,
        },
      ],
    },
    {
      id: "morfologia",
      titulo: "MORFOLOGIA FETAL",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem alterações (LaudoUS)",
          texto: TEXTO_MORFOLOGIA_2T_LAUDOUS,
        },
        {
          id: "alterado",
          label: "Com alteração",
          texto: `${TEXTO_MORFOLOGIA_2T_LAUDOUS}\nAchado adicional / alteração: ____.`,
          impressao: "Alteração morfológica fetal: ____.",
        },
      ],
    },
    {
      id: "placenta-liquido",
      titulo: "PLACENTA E LÍQUIDO AMNIÓTICO",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Habitual (LaudoUS)",
          texto: `${TEXTO_PLACENTA_LAUDOUS}\n${TEXTO_LIQUIDO_LAUDOUS}`,
        },
        {
          id: "livre",
          label: "Descrever",
          texto: `${TEXTO_PLACENTA_LIVRE_LAUDOUS}\n${TEXTO_LIQUIDO_ALTERADO_LAUDOUS}`,
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
          impressao: `${IMPRESSAO_BIOMETRIA_LAUDOUS}\n${IMPRESSAO_MORFOLOGIA_OK_LAUDOUS}`,
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
          impressao: `${IMPRESSAO_BIOMETRIA_LAUDOUS}\n____.`,
        },
      ],
    },
    secaoAchadosAdicionaisObst("Achados adicionais: ____."),
  ];
}

export function exameObstetricoMorfo2t(): Exame {
  return {
    id: "obstetrico-morfo-2t",
    nome: "Morfológico 2º/3º Tri",
    tituloDocumento: "ULTRASSONOGRAFIA OBSTÉTRICA MORFOLÓGICA",
    tecnica: TECNICA_OBSTETRICO_MORFO_2T,
    secoes: comCurvaReferenciaObst(secoesObstetricoMorfo2t()),
    impressaoPadrao: `${IMPRESSAO_BIOMETRIA_LAUDOUS}\n${IMPRESSAO_MORFOLOGIA_OK_LAUDOUS}`,
  };
}
