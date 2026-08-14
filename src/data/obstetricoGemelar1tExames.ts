import type { Exame, Secao } from "@/data/exames";
import {
  comCurvaReferenciaObst,
  secaoAchadosAdicionaisObst,
} from "@/lib/obstetricoDadosComuns";
import {
  IMPRESSAO_1T_BIOMETRIA_LAUDOUS,
  TEXTO_MARCADORES_TN_LAUDOUS,
  TEXTO_MORFOLOGIA_1T_LAUDOUS,
  TEXTO_UTERO_1T_LAUDOUS,
  TEXTO_VITALIDADE_LAUDOUS,
} from "@/lib/obstetricoLaudousFrases";

/** Técnica — obstétrico 1º T gemelar (LaudoUS 1mg). */
export const TECNICA_OBSTETRICO_GEMELAR_1T =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via pélvica.";

function blocoFeto(letra: "A" | "B"): string {
  return `FETO ${letra}:
Feto com comprimento cabeça-nádega (CCN) de ____ mm.
${TEXTO_VITALIDADE_LAUDOUS}

${TEXTO_MARCADORES_TN_LAUDOUS}

${TEXTO_MORFOLOGIA_1T_LAUDOUS}`;
}

function secoesObstetricoGemelar1t(): Secao[] {
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
          texto: `${TEXTO_UTERO_1T_LAUDOUS}\nGestação gemelar, na cavidade uterina.`,
        },
        {
          id: "alterado",
          label: "Com alteração",
          texto: `${TEXTO_UTERO_1T_LAUDOUS}\nGestação gemelar, na cavidade uterina.\nAchado adicional: ____.`,
          impressao: "Achado uterino / anexial: ____.",
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
          label: "Dicoriônica / diamniótica (LaudoUS)",
          texto: "Gestação gemelar dicoriônica / diamniótica.",
        },
        {
          id: "monoc-di",
          label: "Monocoriônica / diamniótica",
          texto: "Gestação gemelar monocoriônica / diamniótica.",
        },
        {
          id: "monoc-mono",
          label: "Monocoriônica / monoamniótica",
          texto: "Gestação gemelar monocoriônica / monoamniótica.",
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
      padrao: "presente",
      opcoes: [
        {
          id: "presente",
          label: "CCN + vitalidade + TN (LaudoUS)",
          texto: blocoFeto("A"),
        },
        {
          id: "sem-bcf",
          label: "Sem atividade cardíaca",
          texto: blocoFeto("A").replace(
            "Batimentos cardíacos fetais presentes, ____ bpm.",
            "Ausência de batimentos cardíacos fetais.",
          ),
          impressao: "Feto A sem atividade cardíaca.",
        },
      ],
    },
    {
      id: "feto-b",
      titulo: "FETO B",
      tipo: "unico",
      padrao: "presente",
      opcoes: [
        {
          id: "presente",
          label: "CCN + vitalidade + TN (LaudoUS)",
          texto: blocoFeto("B"),
        },
        {
          id: "sem-bcf",
          label: "Sem atividade cardíaca",
          texto: blocoFeto("B").replace(
            "Batimentos cardíacos fetais presentes, ____ bpm.",
            "Ausência de batimentos cardíacos fetais.",
          ),
          impressao: "Feto B sem atividade cardíaca.",
        },
      ],
    },
    {
      id: "conclusao",
      titulo: "IMPRESSÃO DIAGNÓSTICA",
      tipo: "unico",
      padrao: "dic",
      opcoes: [
        {
          id: "dic",
          label: "Gemelar dicoriônica (LaudoUS)",
          texto: "",
          impressao: `Gestação gemelar dicoriônica / diamniótica.\n${IMPRESSAO_1T_BIOMETRIA_LAUDOUS}`,
        },
        {
          id: "livre",
          label: "Descrever",
          texto: "",
          impressao: "Gestação gemelar ____.",
        },
      ],
    },
    secaoAchadosAdicionaisObst("Achados adicionais: ____."),
  ];
}

export function exameObstetricoGemelar1t(): Exame {
  return {
    id: "obstetrico-gemelar-1t",
    nome: "Morfológico 1º Tri - Gemelar",
    tituloDocumento:
      "ULTRASSONOGRAFIA OBSTÉTRICA MORFOLÓGICA GEMELAR (1º TRIMESTRE)",
    tecnica: TECNICA_OBSTETRICO_GEMELAR_1T,
    secoes: comCurvaReferenciaObst(secoesObstetricoGemelar1t()),
    impressaoPadrao: `Gestação gemelar dicoriônica / diamniótica.\n${IMPRESSAO_1T_BIOMETRIA_LAUDOUS}`,
  };
}
