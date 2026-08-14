import type { Exame, Secao } from "@/data/exames";
import {
  comCurvaReferenciaObst,
  secaoAchadosAdicionaisObst,
} from "@/lib/obstetricoDadosComuns";

/** Modelo Laudário — Ecocardiografia Fetal. */
export const TECNICA_ECO_FETAL =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via pélvica.";

function secoesEcoFetal(): Secao[] {
  return [
    {
      id: "indicacao",
      titulo: "INDICAÇÃO",
      tipo: "unico",
      padrao: "rotina",
      opcoes: [
        {
          id: "rotina",
          label: "Rastreamento de rotina (Laudário)",
          texto: "INDICAÇÃO:\nRastreamento de rotina / sem indicação específica.",
        },
        {
          id: "outra",
          label: "Outra indicação",
          texto: "INDICAÇÃO:\n____.",
        },
      ],
    },
    {
      id: "estatica-fetal",
      titulo: "ESTÁTICA FETAL",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Longitudinal / cefálica / dorso E (Laudário)",
          texto:
            "Estática Fetal:\nFeto único, em situação longitudinal, apresentação cefálica, com dorso à esquerda.",
        },
        {
          id: "livre",
          label: "Preencher",
          texto:
            "Estática Fetal:\nFeto único, em situação ____, apresentação ____, com dorso à ____.",
        },
      ],
    },
    {
      id: "situs",
      titulo: "SITUS E POSIÇÃO",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Situs solitus (Laudário)",
          texto:
            "Plano Transversal do Abdômen:\nBolha gástrica e aorta descendente à esquerda.\nVeia cava inferior à direita.\nSitus solitus. Coração com ponta voltada para a esquerda.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "Plano Transversal do Abdômen / situs: ____.",
          impressao: "Alteração de situs / posição cardíaca: ____.",
        },
      ],
    },
    {
      id: "quatro-camaras",
      titulo: "PLANO QUATRO CÂMARAS",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal (Laudário)",
          texto:
            "Plano Quatro Câmaras:\nRitmo: 1:1, eucárdico.\nEixo cardíaco dentro dos limites da normalidade.\nÁrea cardíaca dentro dos limites da normalidade na posição de quatro câmaras.\nHá predomínio das cavidades direitas na posição de quatro câmaras, achado esperado para a circulação fetal.\nSepto interatrial com forame oval normofuncionante.\nSepto interventricular íntegro, dentro dos limites de resolução do método.\nValva tricúspide com aspecto morfológico normal, sem disfunção ao mapeamento de fluxo em cores.\nValva mitral com aspecto morfológico normal, sem disfunção ao mapeamento de fluxo em cores.\nAusência de derrame pericárdico.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "Plano Quatro Câmaras: ____.",
          impressao: "Alteração no plano de quatro câmaras: ____.",
        },
      ],
    },
    {
      id: "saida-ve",
      titulo: "SAÍDA DO VE / AORTA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal (Laudário)",
          texto:
            "Saída do Ventrículo Esquerdo / Aorta:\nAorta emergindo do ventrículo esquerdo, com emergência e alinhamento adequados.\nContinuidade mitro-aórtica preservada.\nValva aórtica normal, sem disfunção ao mapeamento de fluxo em cores.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "Saída do Ventrículo Esquerdo / Aorta: ____.",
          impressao: "Alteração da via de saída do VE / aorta: ____.",
        },
      ],
    },
    {
      id: "saida-vd",
      titulo: "SAÍDA DO VD / PULMONAR",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal (Laudário)",
          texto:
            "Saída do Ventrículo Direito / Pulmonar:\nTronco pulmonar emergindo do ventrículo direito, com dimensão normal.\nArtérias pulmonares confluentes e simétricas.\nValva pulmonar normal, sem disfunção ao mapeamento de fluxo em cores.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "Saída do Ventrículo Direito / Pulmonar: ____.",
          impressao: "Alteração da via de saída do VD / pulmonar: ____.",
        },
      ],
    },
    {
      id: "tres-vasos",
      titulo: "CORTES 3 VASOS E 3VT",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal (Laudário)",
          texto:
            "Cortes 3 Vasos e 3VT:\nRelação de calibres preservada (AP > Ao > VCS).\nO arco aórtico e o arco ductal confluem em formato de \"V\", à esquerda da traqueia, que se apresenta em posição normal.\nFluxo anterógrado no arco aórtico e no arco ductal, convergindo para a aorta descendente.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "Cortes 3 Vasos e 3VT: ____.",
          impressao: "Alteração nos cortes de 3 vasos / 3VT: ____.",
        },
      ],
    },
    {
      id: "arcos",
      titulo: "ARCO AÓRTICO E DUCTAL",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal (Laudário)",
          texto:
            "Eixo Longo do Arco Aórtico:\nArco aórtico à esquerda, em formato de \"gancho\", com origem habitual dos três vasos supra-aórticos (tronco braquiocefálico, artéria carótida comum esquerda e artéria subclávia esquerda), sem anormalidades identificadas.\n\nEixo Longo do Arco Ductal:\nCanal arterial com morfologia normal, sem sinal de restrição ao fluxo.\nContinuidade do ventrículo direito com o ducto arterioso, conectando-se à aorta descendente.",
        },
        {
          id: "alterado",
          label: "Alterado",
          texto: "Arco aórtico / arco ductal: ____.",
          impressao: "Alteração dos arcos aórtico/ductal: ____.",
        },
      ],
    },
    {
      id: "conclusao",
      titulo: "OPINIÃO DO RELATÓRIO",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem alterações maiores (Laudário)",
          texto: "",
          impressao:
            "Estudo ecográfico morfofuncional do coração fetal sem alterações estruturais maiores aparentes, com ritmo e função habituais.\n\nObs.: A ecocardiografia fetal tem por objetivo identificar malformações e analisar a função e o ritmo cardíaco fetal. As principais dificuldades diagnósticas inerentes ao método são: comunicação interatrial, comunicação interventricular e coarctação da aorta, em razão das peculiaridades da circulação fetal.",
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

export function exameEcoFetal(): Exame {
  return {
    id: "eco-fetal",
    nome: "Ecocardiografia fetal",
    tituloDocumento: "ECODOPPLERCARDIOGRAMA FETAL",
    tecnica: TECNICA_ECO_FETAL,
    secoes: comCurvaReferenciaObst(secoesEcoFetal()),
    impressaoPadrao:
      "Estudo ecográfico morfofuncional do coração fetal sem alterações estruturais maiores aparentes, com ritmo e função habituais.\n\nObs.: A ecocardiografia fetal tem por objetivo identificar malformações e analisar a função e o ritmo cardíaco fetal. As principais dificuldades diagnósticas inerentes ao método são: comunicação interatrial, comunicação interventricular e coarctação da aorta, em razão das peculiaridades da circulação fetal.",
  };
}
