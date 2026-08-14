import type { Exame, Secao } from "@/data/exames";
import {
  opcoesPadraoEspectralAcm,
  opcoesPadraoEspectralUmbilical,
  TEXTO_MORFOLOGIA_OBST_BASICA,
} from "@/data/obstetricoBasicoExames";
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

/** Técnica — obstétrico com Doppler (LaudoUS 23 + Doppler). */
export const TECNICA_OBSTETRICO_DOPPLER =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via abdominal.";

function secoesObstetricoDoppler(): Secao[] {
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
          label: "Descrever",
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
          id: "alterado",
          label: "Alterado",
          texto: TEXTO_LIQUIDO_ALTERADO_LAUDOUS,
          impressao: "Volume de líquido amniótico alterado.",
        },
      ],
    },
    {
      id: "doppler-umbilical",
      titulo: "DOPPLER — ARTÉRIAS UMBILICAIS",
      tipo: "unico",
      padrao: "normal",
      opcoes: opcoesPadraoEspectralUmbilical("DOPPLER OBSTÉTRICO\n- Artérias umbilicais:"),
    },
    {
      id: "doppler-acm",
      titulo: "DOPPLER — ARTÉRIA CEREBRAL MÉDIA",
      tipo: "unico",
      padrao: "normal",
      opcoes: opcoesPadraoEspectralAcm("- Artéria cerebral média (ACM):"),
    },
    {
      id: "doppler-uterinas",
      titulo: "DOPPLER — ARTÉRIAS UTERINAS",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem notch (LaudoUS)",
          texto:
            "- Artérias uterinas:\nAusência de incisura protodiastólica.\nÍndice de pulsatilidade médio: ____",
        },
        {
          id: "alterado",
          label: "Alterado / notching",
          texto:
            "- Artérias uterinas:\nPresença de incisura protodiastólica.\nÍndice de pulsatilidade médio: ____.\nDireita — I.P.: ____ ; Esquerda — I.P.: ____.",
          impressao: "Doppler das artérias uterinas alterado.",
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
          label: "Biometria + Doppler normal (LaudoUS)",
          texto: "",
          impressao: `${IMPRESSAO_BIOMETRIA_LAUDOUS}\nAvaliação Dopplervelocimétrica sem anormalidades demonstráveis.`,
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

export function exameObstetricoDoppler(): Exame {
  return {
    id: "obstetrico-doppler",
    nome: "2º/3º Tri com Doppler",
    tituloDocumento: "ULTRASSONOGRAFIA OBSTÉTRICA COM DOPPLER",
    tecnica: TECNICA_OBSTETRICO_DOPPLER,
    secoes: comCurvaReferenciaObst(secoesObstetricoDoppler()),
    impressaoPadrao: `${IMPRESSAO_BIOMETRIA_LAUDOUS}\nAvaliação Dopplervelocimétrica sem anormalidades demonstráveis.`,
  };
}
