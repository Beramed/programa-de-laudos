import type { Exame, Secao } from "@/data/exames";
import {
  comCurvaReferenciaObst,
  secaoAchadosAdicionaisObst,
} from "@/lib/obstetricoDadosComuns";
import {
  IMPRESSAO_1T_BIOMETRIA_LAUDOUS,
  IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
  TEXTO_CCN_1T_LAUDOUS,
  TEXTO_UTERO_1T_LAUDOUS,
  TEXTO_VITALIDADE_AUSENTE_LAUDOUS,
  TEXTO_VITALIDADE_LAUDOUS,
  TEXTO_VV_LAUDOUS,
} from "@/lib/obstetricoLaudousFrases";

/** Técnica — obstétrico 1º trimestre / rotina (LaudoUS 1r). */
export const TECNICA_OBSTETRICO_TV_PRECOCE =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via pélvica.";

/** @deprecated use CHAVES_OBST_DADOS — mantido para compatibilidade */
export const CHAVES_OBST_TV = {
  dum: "obst-tv-dum",
  igSemanas: "obst-tv-ig-dum-semanas",
  igDias: "obst-tv-ig-dum-dias",
  equipamento: "obst-tv-equipamento",
} as const;

function secoesObstetricoTvPrecoce(): Secao[] {
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
        {
          id: "sem-embriao",
          label: "Embrião não identificado",
          texto:
            "Embrião não identificado ao presente exame.\nSaco gestacional com contornos regulares e paredes normoecogênicas.",
          impressao: "Embrião não identificado ao presente exame.",
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
      id: "vesicula",
      titulo: "VESÍCULA VITELINA",
      tipo: "unico",
      padrao: "habitual",
      opcoes: [
        {
          id: "habitual",
          label: "Preservada (LaudoUS)",
          texto: TEXTO_VV_LAUDOUS,
        },
        {
          id: "nao-citar",
          label: "Não citar",
          texto: "",
        },
        {
          id: "hidropica",
          label: "Hidrópica",
          texto: "Vesícula vitelínica hidrópica.",
          impressao: "Vesícula vitelínica hidrópica.",
        },
        {
          id: "alterada",
          label: "Alterada",
          texto:
            "Vesícula vitelina ____ (aumentada / colapsada / mineralizada / de contornos irregulares), medindo ____ mm.",
          impressao: "Vesícula vitelina com aspecto alterado.",
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
          label: "IG / DPP pela biometria",
          texto: "",
          impressao: IMPRESSAO_1T_BIOMETRIA_LAUDOUS,
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

export function exameObstetricoTvPrecoce(): Exame {
  return {
    id: "obstetrico-tv-precoce",
    nome: "1º Tri - Rotina",
    tituloDocumento: "ULTRASSONOGRAFIA OBSTÉTRICA (1º TRIMESTRE)",
    tecnica: TECNICA_OBSTETRICO_TV_PRECOCE,
    secoes: comCurvaReferenciaObst(secoesObstetricoTvPrecoce()),
    impressaoPadrao: IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
  };
}
