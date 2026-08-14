import type { Exame, Secao } from "@/data/exames";
import { TEXTO_MORFOLOGIA_OBST_BASICA } from "@/data/obstetricoBasicoExames";
import {
  comCurvaReferenciaObst,
  secaoAchadosAdicionaisObst,
} from "@/lib/obstetricoDadosComuns";
import {
  IMPRESSAO_BIOMETRIA_LAUDOUS,
  IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
  TEXTO_BIOMETRIA_LAUDOUS,
  TEXTO_CORDAO_LAUDOUS,
  TEXTO_FETO_SITUACAO_LAUDOUS,
  TEXTO_FETO_SITUACAO_LIVRE_LAUDOUS,
  TEXTO_LIQUIDO_ALTERADO_LAUDOUS,
  TEXTO_LIQUIDO_LAUDOUS,
  TEXTO_PLACENTA_LAUDOUS,
  TEXTO_PLACENTA_LIVRE_LAUDOUS,
  TEXTO_VITALIDADE_AUSENTE_LAUDOUS,
  TEXTO_VITALIDADE_LAUDOUS,
} from "@/lib/obstetricoLaudousFrases";

/** Modelo LaudoUS — Obstétrico 3D/4D (base 2º/3º + bloco 3D/4D). */
export const TECNICA_OBSTETRICO_3D4D =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via abdominal.";

function secoesObstetrico3d4d(): Secao[] {
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
          label: "Preencher",
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
      titulo: "MORFOLOGIA (BÁSICA)",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem alterações aparentes",
          texto: TEXTO_MORFOLOGIA_OBST_BASICA,
        },
        {
          id: "alterado",
          label: "Com alteração",
          texto: `${TEXTO_MORFOLOGIA_OBST_BASICA}\nAchado: ____.`,
          impressao: "Alteração morfológica: ____.",
        },
      ],
    },
    {
      id: "3d4d",
      titulo: "AVALIAÇÃO 3D/4D",
      tipo: "unico",
      padrao: "realizada",
      opcoes: [
        {
          id: "realizada",
          label: "Realizada — face / superfície",
          texto:
            "Avaliação tridimensional / em tempo real (3D/4D):\nSuperfície facial e segmentos corporais avaliados em reconstrução multiplanar / superfície.\nAchados: ____ (sem alterações aparentes / ____).",
        },
        {
          id: "limitada",
          label: "Limitada",
          texto: "Avaliação 3D/4D tecnicamente limitada: ____.",
          impressao: "Avaliação 3D/4D com limitação técnica.",
        },
      ],
    },
    {
      id: "sexo",
      titulo: "GENITÁLIA / SEXO FETAL",
      tipo: "unico",
      padrao: "nao-citar",
      opcoes: [
        { id: "nao-citar", label: "Não citar", texto: "" },
        {
          id: "masculino",
          label: "Masculino",
          texto:
            "Genitália externa de aspecto anatômico preservado, compatível com sexo masculino.",
        },
        {
          id: "feminino",
          label: "Feminino",
          texto:
            "Genitália externa de aspecto anatômico preservado, compatível com sexo feminino.",
        },
        {
          id: "indeterminado",
          label: "Indeterminado",
          texto: "Genitália externa de aspecto anatômico preservado.",
        },
      ],
    },
    {
      id: "placenta",
      titulo: "PLACENTA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Corporal posterior grau 0 (LaudoUS)",
          texto: TEXTO_PLACENTA_LAUDOUS,
        },
        {
          id: "livre",
          label: "Descrever",
          texto: TEXTO_PLACENTA_LIVRE_LAUDOUS,
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
      id: "liquido",
      titulo: "LÍQUIDO AMNIÓTICO",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Volume normal (LaudoUS)",
          texto: TEXTO_LIQUIDO_LAUDOUS,
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: TEXTO_LIQUIDO_ALTERADO_LAUDOUS,
          impressao: "Volume de líquido amniótico alterado.",
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
          label: "Parâmetros da normalidade (LaudoUS)",
          texto: "",
          impressao: IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
        },
        {
          id: "biometria",
          label: "Com IG / peso / DPP",
          texto: "",
          impressao: IMPRESSAO_BIOMETRIA_LAUDOUS,
        },
        {
          id: "alterado",
          label: "Com observação",
          texto: "",
          impressao: `${IMPRESSAO_BIOMETRIA_LAUDOUS}\n____.`,
        },
      ],
    },
    secaoAchadosAdicionaisObst("Achados adicionais: ____."),
  ];
}

export function exameObstetrico3d4d(): Exame {
  return {
    id: "obstetrico-3d4d",
    nome: "Obstétrico 3D/4D",
    tituloDocumento: "ULTRASSONOGRAFIA OBSTÉTRICA 3D/4D",
    tecnica: TECNICA_OBSTETRICO_3D4D,
    secoes: comCurvaReferenciaObst(secoesObstetrico3d4d()),
    impressaoPadrao: IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
  };
}
