import type { Exame, Opcao, Secao } from "@/data/exames";
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

/** Técnica — obstétrico 2º/3º T (LaudoUS). */
export const TECNICA_OBSTETRICO_BASICO =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via abdominal.";

/** @deprecated Preferir TEXTO_BIOMETRIA_LAUDOUS */
export const TEXTO_BIOMETRIA_OBST_BASICA = TEXTO_BIOMETRIA_LAUDOUS;

/** Morfologia nível I resumida (exame básico, não morfológico completo). */
export const TEXTO_MORFOLOGIA_OBST_BASICA = `Morfologia fetal de avaliação básica:
Crânio íntegro, de conformação habitual.
Face sem alterações aparentes. Perfil de aspecto habitual.
Coluna vertebral de aspecto preservado.
Pulmões com ecogenicidade compatível com a fase da gestação.
Coração de morfologia habitual, com as quatro câmaras de aspecto habitual.
Estômago bem caracterizado, em topografia habitual.
Rins e bexiga sem alterações detectáveis.
Ossos longos de aspecto normal. Mãos e pés com anatomia preservada bilateralmente.`;

export function opcoesPadraoEspectralUmbilical(prefixo = ""): Opcao[] {
  const rotulo = prefixo ? `${prefixo}\n` : "";
  const nome = prefixo.replace(/:$/, "") || "Artérias umbilicais";
  return [
    {
      id: "normal",
      label: "Morfologia normal (LaudoUS)",
      texto: `${rotulo}Traçado espectral das artérias umbilicais com morfologia normal.\nÍndice de pulsatilidade (I.P.): ____`,
    },
    {
      id: "diastole-baixa",
      label: "Diástole baixa",
      texto: `${rotulo}Artérias umbilicais com diástole baixa.\nÍndice de pulsatilidade (I.P.): ____`,
      impressao: `${nome} com diástole baixa.`,
    },
    {
      id: "diastole-zero",
      label: "Diástole zero",
      texto: `${rotulo}Artérias umbilicais com diástole zero.\nÍndice de pulsatilidade (I.P.): ____`,
      impressao: `${nome} com diástole zero.`,
    },
    {
      id: "diastole-reversa",
      label: "Diástole reversa",
      texto: `${rotulo}Artérias umbilicais com diástole reversa.\nÍndice de pulsatilidade (I.P.): ____`,
      impressao: `${nome} com diástole reversa.`,
    },
  ];
}

export function opcoesPadraoEspectralAcm(prefixo = ""): Opcao[] {
  const rotulo = prefixo ? `${prefixo}\n` : "";
  const nome = prefixo.replace(/:$/, "") || "Artéria cerebral média";
  return [
    {
      id: "normal",
      label: "Morfologia normal (LaudoUS)",
      texto: `${rotulo}Traçado espectral da ACM com morfologia normal.\nÍndice de pulsatilidade (I.P.): ____\nRelação cerebroplacentária (RCP): ____`,
    },
    {
      id: "diastole-alta",
      label: "I.P. reduzido / redistribuição",
      texto: `${rotulo}Traçado espectral da ACM com I.P. reduzido.\nÍndice de pulsatilidade (I.P.): ____ (percentil ____)\nRelação cerebroplacentária (RCP): ____`,
      impressao: `${nome} com I.P. reduzido (percentil ____) - padrão sugestivo de redistribuição de fluxo cerebral.`,
    },
  ];
}

function secoesObstetricoBasico(): Secao[] {
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
      titulo: "MORFOLOGIA FETAL (BÁSICA)",
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
          texto: `${TEXTO_MORFOLOGIA_OBST_BASICA}\nAchado adicional / alteração: ____.`,
          impressao: "Alteração morfológica fetal: ____.",
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
          label: "Descrever inserção / grau",
          texto: TEXTO_PLACENTA_LIVRE_LAUDOUS,
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
          id: "ila",
          label: "Com ILA / bolsão",
          texto: TEXTO_LIQUIDO_ALTERADO_LAUDOUS,
        },
        {
          id: "alterado",
          label: "Oligo / poli / alterado",
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

export function exameObstetricoBasico(): Exame {
  return {
    id: "obstetrico",
    nome: "2º/3º Tri",
    tituloDocumento: "ULTRASSONOGRAFIA OBSTÉTRICA",
    tecnica: TECNICA_OBSTETRICO_BASICO,
    secoes: comCurvaReferenciaObst(secoesObstetricoBasico()),
    impressaoPadrao: IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
  };
}
