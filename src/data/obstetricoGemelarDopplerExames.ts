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
  IMPRESSAO_GESTACAO_NORMAL_LAUDOUS,
  TEXTO_BIOMETRIA_LAUDOUS,
  TEXTO_CORDAO_LAUDOUS,
  TEXTO_LIQUIDO_LAUDOUS,
  TEXTO_PLACENTA_LAUDOUS,
  TEXTO_VITALIDADE_LAUDOUS,
} from "@/lib/obstetricoLaudousFrases";

export const TECNICA_OBSTETRICO_GEMELAR_DOPPLER =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via abdominal.";

function blocoFeto(letra: "A" | "B"): string {
  return `FETO ${letra}:
Feto vivo, em situação ____, apresentação ____, dorso à ____.
${TEXTO_VITALIDADE_LAUDOUS}
${TEXTO_CORDAO_LAUDOUS}

${TEXTO_BIOMETRIA_LAUDOUS}

${TEXTO_MORFOLOGIA_OBST_BASICA}`;
}

function secoesObstetricoGemelarDoppler(): Secao[] {
  return [
    {
      id: "introducao",
      titulo: "GESTACÃO GEMELAR",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Gemelar na cavidade uterina (LaudoUS)",
          texto: "Gestação gemelar, na cavidade uterina.",
        },
      ],
    },
    {
      id: "corionicidade",
      titulo: "CORIONICIDADE",
      tipo: "unico",
      padrao: "dic",
      opcoes: [
        {
          id: "dic",
          label: "Dicoriônica / diamniótica",
          texto: "Gestação gemelar dicoriônica / diamniótica.",
        },
        {
          id: "monoc-di",
          label: "Monocoriônica / diamniótica",
          texto: "Gestação gemelar monocoriônica / diamniótica.",
        },
        {
          id: "livre",
          label: "Descrever",
          texto: "Gestação gemelar ____.",
        },
      ],
    },
    {
      id: "feto-a",
      titulo: "FETO A",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Feto A — biometria / morfologia (LaudoUS)",
          texto: blocoFeto("A"),
        },
        {
          id: "alterado",
          label: "Feto A com alteração",
          texto: `${blocoFeto("A")}\nAlteração no feto A: ____.`,
          impressao: "Alteração no feto A: ____.",
        },
      ],
    },
    {
      id: "feto-b",
      titulo: "FETO B",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Feto B — biometria / morfologia (LaudoUS)",
          texto: blocoFeto("B"),
        },
        {
          id: "alterado",
          label: "Feto B com alteração",
          texto: `${blocoFeto("B")}\nAlteração no feto B: ____.`,
          impressao: "Alteração no feto B: ____.",
        },
      ],
    },
    {
      id: "placenta",
      titulo: "PLACENTA",
      tipo: "unico",
      padrao: "duas",
      opcoes: [
        {
          id: "duas",
          label: "Placentas separadas",
          texto: `Placenta (Feto A):\n${TEXTO_PLACENTA_LAUDOUS}\n\nPlacenta (Feto B):\n${TEXTO_PLACENTA_LAUDOUS}`,
        },
        {
          id: "unica",
          label: "Massa placentária única",
          texto:
            "Nota-se massa placentária única, com inserção ____, grau ____ de Grannum, de aspecto homogêneo.",
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
          texto: `Líquido amniótico (Feto A): ${TEXTO_LIQUIDO_LAUDOUS}\nLíquido amniótico (Feto B): ${TEXTO_LIQUIDO_LAUDOUS}`,
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "Líquido amniótico: Feto A ____; Feto B ____.",
          impressao: "Volume de líquido amniótico alterado.",
        },
      ],
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
            "DOPPLER OBSTÉTRICO\n- Artérias uterinas:\nAusência de incisura protodiastólica.\nDireita — I.P.: ____ ; Esquerda — I.P.: ____ ; I.P. médio: ____",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto:
            "- Artérias uterinas:\nPresença de incisura protodiastólica.\nDireita — I.P.: ____ ; Esquerda — I.P.: ____ ; I.P. médio: ____",
          impressao: "Doppler das artérias uterinas alterado.",
        },
      ],
    },
    {
      id: "arteria-umbilical-feto-a",
      titulo: "ARTÉRIAS UMBILICAIS (FETO A)",
      tipo: "unico",
      padrao: "normal",
      opcoes: opcoesPadraoEspectralUmbilical("- Artérias umbilicais (Feto A):"),
    },
    {
      id: "arteria-umbilical-feto-b",
      titulo: "ARTÉRIAS UMBILICAIS (FETO B)",
      tipo: "unico",
      padrao: "normal",
      opcoes: opcoesPadraoEspectralUmbilical("- Artérias umbilicais (Feto B):"),
    },
    {
      id: "arteria-cerebral-feto-a",
      titulo: "ARTÉRIA CEREBRAL MÉDIA (FETO A)",
      tipo: "unico",
      padrao: "normal",
      opcoes: opcoesPadraoEspectralAcm("- Artéria cerebral média (Feto A):"),
    },
    {
      id: "arteria-cerebral-feto-b",
      titulo: "ARTÉRIA CEREBRAL MÉDIA (FETO B)",
      tipo: "unico",
      padrao: "normal",
      opcoes: opcoesPadraoEspectralAcm("- Artéria cerebral média (Feto B):"),
    },
    {
      id: "conclusao",
      titulo: "IMPRESSÃO DIAGNÓSTICA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Gemelar + Doppler (LaudoUS)",
          texto: "",
          impressao:
            "Gestação gemelar dicoriônica / diamniótica.\nIdade gestacional estimada em ____ semanas e ____ dias pela biometria (Feto A) e ____ semanas e ____ dias (Feto B).\nAvaliação Dopplervelocimétrica sem anormalidades demonstráveis.",
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
          impressao:
            "Gestação gemelar ____.\n____.",
        },
      ],
    },
    secaoAchadosAdicionaisObst("Achados adicionais: ____."),
  ];
}

export function exameObstetricoGemelarDoppler(): Exame {
  return {
    id: "obstetrico-gemelar-doppler",
    nome: "Gemelar 2º/3º T com Doppler",
    tituloDocumento: "ULTRASSONOGRAFIA OBSTÉTRICA COM DOPPLER EM GESTAÇÃO GEMELAR",
    tecnica: TECNICA_OBSTETRICO_GEMELAR_DOPPLER,
    secoes: comCurvaReferenciaObst(secoesObstetricoGemelarDoppler()),
    impressaoPadrao:
      "Gestação gemelar dicoriônica / diamniótica.\nIdade gestacional estimada em ____ semanas e ____ dias pela biometria (Feto A) e ____ semanas e ____ dias (Feto B).\nAvaliação Dopplervelocimétrica sem anormalidades demonstráveis.",
  };
}
