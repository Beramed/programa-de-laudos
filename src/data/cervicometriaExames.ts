import type { Exame, Secao } from "@/data/exames";
import {
  comCurvaReferenciaObst,
  secaoAchadosAdicionaisObst,
} from "@/lib/obstetricoDadosComuns";
import { IMPRESSAO_GESTACAO_NORMAL_LAUDOUS } from "@/lib/obstetricoLaudousFrases";

/** Cervicometria alinhada às frases de colo do LaudoUS. */
export const TECNICA_CERVICOMETRIA =
  "Exame realizado em aparelho dinâmico com transdutor endocavitário por via transvaginal.";

function secoesCervicometria(): Secao[] {
  return [
    {
      id: "cervicometria",
      titulo: "CERVICOMETRIA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal (LaudoUS)",
          texto:
            "Colo uterino e canal endocervical sem anormalidades demonstráveis.\nComprimento cervical: ____ mm (VR: > 25 mm).\nOrifício interno do colo fechado, sem afunilamento.\nAusência de sludge em líquido amniótico.",
        },
        {
          id: "encurtado",
          label: "Colo encurtado / afunilamento",
          texto:
            "Comprimento cervical: ____ mm (VR: > 25 mm).\nOrifício interno do colo: ____ (fechado / aberto).\nAfunilamento do colo uterino: ____ (ausente / presente, ____ mm).\nSludge em líquido amniótico: ____ (ausente / presente).",
          impressao: "Comprimento cervical de ____ mm.",
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
          label: "Margem distante do OCI (LaudoUS)",
          texto:
            "Placenta com inserção ____, grau ____ de Grannum, de aspecto homogêneo.\nMargem placentária distante do orifício interno do colo uterino (> 20 mm).",
        },
        {
          id: "livre",
          label: "Descrever",
          texto:
            "Placenta com inserção ____.\nMargem placentária ____ do orifício interno do colo uterino.",
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
          label: "Colo e placenta habituais (LaudoUS)",
          texto: "",
          impressao: `${IMPRESSAO_GESTACAO_NORMAL_LAUDOUS}\nColo uterino sem afunilamento, com orifício interno fechado.`,
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

export function exameCervicometria(): Exame {
  return {
    id: "cervicometria",
    nome: "Cervicometria",
    tituloDocumento: "CERVICOMETRIA",
    tecnica: TECNICA_CERVICOMETRIA,
    secoes: comCurvaReferenciaObst(secoesCervicometria()),
    impressaoPadrao: `${IMPRESSAO_GESTACAO_NORMAL_LAUDOUS}\nColo uterino sem afunilamento, com orifício interno fechado.`,
  };
}
