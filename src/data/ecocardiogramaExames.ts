import type { Exame, Secao } from "@/data/exames";

/** Técnica — Ecocardiograma completo (modelo Medware). */
export const TECNICA_ECOCARDIOGRAMA =
  "Estudo ecocardiográfico bidimensional com Doppler pulsado, contínuo, tecidual e mapeamento de fluxo em cores.";

function secoesEcocardiograma(): Secao[] {
  return [
    {
      id: "janela",
      titulo: "JANELA / RITMO",
      tipo: "unico",
      padrao: "adequada",
      opcoes: [
        {
          id: "adequada",
          label: "Janela adequada / ritmo regular",
          texto:
            "Janela acústica adequada.\nAquisição realizada em ritmo cardíaco regular.",
        },
        {
          id: "limitada",
          label: "Janela limitada",
          texto:
            "Janela acústica ____ (parcialmente limitada / limitada).\nAquisição realizada em ritmo cardíaco ____.",
        },
      ],
    },
    {
      id: "valva-aortica",
      titulo: "VALVA AÓRTICA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "VALVA AÓRTICA:\nValva aórtica trivalvular, com cúspides delgadas e mobilidade preservada.\nSem estenose ou regurgitação significativa ao Doppler e ao mapeamento de fluxo em cores.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto:
            "VALVA AÓRTICA:\n____.\nRegurgitação: ____.\nEstenose: ____.",
          impressao: "Alteração da valva aórtica: ____.",
        },
      ],
    },
    {
      id: "valva-mitral",
      titulo: "VALVA MITRAL",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "VALVA MITRAL:\nValva mitral com aspecto e movimentação normais das cúspides.\nSem estenose ou regurgitação significativa ao Doppler e ao mapeamento de fluxo em cores.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto:
            "VALVA MITRAL:\n____.\nRegurgitação: ____.\nEstenose: ____.",
          impressao: "Alteração da valva mitral: ____.",
        },
      ],
    },
    {
      id: "valva-tricuspide",
      titulo: "VALVA TRICÚSPIDE",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "VALVA TRICÚSPIDE:\nValva tricúspide com aspecto e movimentação normais das cúspides.\nRegurgitação tricúspide fisiológica ou ausente.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "VALVA TRICÚSPIDE:\n____.\nRegurgitação: ____.",
          impressao: "Alteração da valva tricúspide: ____.",
        },
      ],
    },
    {
      id: "valva-pulmonar",
      titulo: "VALVA E ARTÉRIA PULMONAR",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "VALVA E ARTÉRIA PULMONAR:\nValva pulmonar com cúspides delgadas e mobilidade normal.\nSem estenose ou regurgitação significativa.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "VALVA E ARTÉRIA PULMONAR:\n____.",
          impressao: "Alteração da valva/artéria pulmonar: ____.",
        },
      ],
    },
    {
      id: "pericardio",
      titulo: "PERICÁRDIO",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem derrame",
          texto:
            "PERICÁRDIO:\nPericárdio de aspecto ecográfico normal, sem derrame.",
        },
        {
          id: "derrame",
          label: "Com derrame",
          texto:
            "PERICÁRDIO:\nDerrame pericárdico ____ (mínimo / discreto / moderado / volumoso), ____ (sem / com) sinais de repercussão hemodinâmica.",
          impressao: "Derrame pericárdico ____.",
        },
      ],
    },
    {
      id: "septo-interatrial",
      titulo: "SEPTO INTERATRIAL",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem CIA / FOP",
          texto:
            "SEPTO INTERATRIAL:\nNão se observam sinais de comunicação interatrial ou de forame oval patente ao modo bidimensional e ao Doppler colorido.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "SEPTO INTERATRIAL:\n____.",
          impressao: "Alteração do septo interatrial: ____.",
        },
      ],
    },
    {
      id: "massas-cava",
      titulo: "MASSAS INTRACAVITÁRIAS",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem massas",
          texto:
            "MASSAS INTRACAVITÁRIAS:\nNão foram identificados trombos, vegetações ou massas intracavitárias.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "MASSAS INTRACAVITÁRIAS:\n____.",
          impressao: "____.",
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
          label: "Exame normal",
          texto: "",
          impressao:
            "Ventrículo esquerdo de dimensões e função sistólica normais.\nFunção segmentar preservada.\nDemais estruturas sem evidentes anormalidades apreciáveis ao método.",
        },
        {
          id: "alterado",
          label: "Com alteração",
          texto: "",
          impressao: "____.",
        },
      ],
    },
  ];
}

export function exameEcocardiograma(): Exame {
  return {
    id: "ecocardiograma",
    nome: "Ecocardiograma",
    tituloDocumento: "ECOCARDIOGRAMA COM DOPPLER COLORIDO",
    tecnica: TECNICA_ECOCARDIOGRAMA,
    secoes: secoesEcocardiograma(),
    impressaoPadrao:
      "Ventrículo esquerdo de dimensões e função sistólica normais.\nFunção segmentar preservada.\nDemais estruturas sem evidentes anormalidades apreciáveis ao método.",
  };
}
