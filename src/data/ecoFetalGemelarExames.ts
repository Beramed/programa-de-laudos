import type { Exame, Secao } from "@/data/exames";
import {
  comCurvaReferenciaObst,
  secaoAchadosAdicionaisObst,
} from "@/lib/obstetricoDadosComuns";

/** Modelo Laudário — Ecocardiografia Fetal Gemelar. */
export const TECNICA_ECO_FETAL_GEMELAR =
  "Exame realizado em aparelho dinâmico com transdutor convexo por via pélvica.";

const BLOCO_ECO_FETAL_NORMAL = `Estática Fetal:
Feto, em situação longitudinal, apresentação cefálica, com dorso à esquerda.

Plano Transversal do Abdômen:
Bolha gástrica e aorta descendente à esquerda.
Veia cava inferior à direita.
Situs solitus. Coração com ponta voltada para a esquerda.

Plano Quatro Câmaras:
Ritmo: 1:1, eucárdico.
Eixo cardíaco dentro dos limites da normalidade.
Área cardíaca dentro dos limites da normalidade na posição de quatro câmaras.
Há predomínio das cavidades direitas na posição de quatro câmaras, achado esperado para a circulação fetal.
Septo interatrial com forame oval normofuncionante.
Septo interventricular íntegro, dentro dos limites de resolução do método.
Valva tricúspide com aspecto morfológico normal, sem disfunção ao mapeamento de fluxo em cores.
Valva mitral com aspecto morfológico normal, sem disfunção ao mapeamento de fluxo em cores.
Ausência de derrame pericárdico.

Saída do Ventrículo Esquerdo / Aorta:
Aorta emergindo do ventrículo esquerdo, com emergência e alinhamento adequados.
Continuidade mitro-aórtica preservada.
Valva aórtica normal, sem disfunção ao mapeamento de fluxo em cores.

Saída do Ventrículo Direito / Pulmonar:
Tronco pulmonar emergindo do ventrículo direito, com dimensão normal.
Artérias pulmonares confluentes e simétricas.
Valva pulmonar normal, sem disfunção ao mapeamento de fluxo em cores.

Cortes 3 Vasos e 3VT:
Relação de calibres preservada (AP > Ao > VCS).
O arco aórtico e o arco ductal confluem em formato de "V", à esquerda da traqueia, que se apresenta em posição normal.
Fluxo anterógrado no arco aórtico e no arco ductal, convergindo para a aorta descendente.

Eixo Longo do Arco Aórtico:
Arco aórtico à esquerda, em formato de "gancho", com origem habitual dos três vasos supra-aórticos (tronco braquiocefálico, artéria carótida comum esquerda e artéria subclávia esquerda), sem anormalidades identificadas.

Eixo Longo do Arco Ductal:
Canal arterial com morfologia normal, sem sinal de restrição ao fluxo.
Continuidade do ventrículo direito com o ducto arterioso, conectando-se à aorta descendente.`;

function secoesEcoFetalGemelar(): Secao[] {
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
          label: "Outra",
          texto: "INDICAÇÃO:\n____.",
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
          label: "Dicoriônica (Laudário)",
          texto: "GESTAÇÃO GEMELAR — DICORIÔNICA",
        },
        {
          id: "monoc",
          label: "Monocoriônica",
          texto: "GESTAÇÃO GEMELAR — MONOCORIÔNICA",
        },
        {
          id: "livre",
          label: "Descrever",
          texto: "GESTAÇÃO GEMELAR — ____",
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
          label: "Eco fetal A normal (Laudário)",
          texto: `====== FETO A ======\n\n${BLOCO_ECO_FETAL_NORMAL}`,
        },
        {
          id: "alterado",
          label: "Feto A com alteração",
          texto: `====== FETO A ======\n\n${BLOCO_ECO_FETAL_NORMAL}\n\nAlteração no feto A: ____.`,
          impressao: "Alteração cardiovascular no feto A: ____.",
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
          label: "Eco fetal B normal (Laudário)",
          texto: `====== FETO B ======\n\n${BLOCO_ECO_FETAL_NORMAL}`,
        },
        {
          id: "alterado",
          label: "Feto B com alteração",
          texto: `====== FETO B ======\n\n${BLOCO_ECO_FETAL_NORMAL}\n\nAlteração no feto B: ____.`,
          impressao: "Alteração cardiovascular no feto B: ____.",
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
            "Estudo ecográfico morfofuncional do coração fetal (gemelar) sem alterações estruturais maiores aparentes, com ritmo e função habituais em ambos os fetos.\n\nObs.: A ecocardiografia fetal tem por objetivo identificar malformações e analisar a função e o ritmo cardíaco fetal. As principais dificuldades diagnósticas inerentes ao método são: comunicação interatrial, comunicação interventricular e coarctação da aorta, em razão das peculiaridades da circulação fetal.",
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

export function exameEcoFetalGemelar(): Exame {
  return {
    id: "eco-fetal-gemelar",
    nome: "Ecocardiografia fetal gemelar",
    tituloDocumento: "ECODOPPLERCARDIOGRAMA FETAL EM GESTAÇÃO GEMELAR",
    tecnica: TECNICA_ECO_FETAL_GEMELAR,
    secoes: comCurvaReferenciaObst(secoesEcoFetalGemelar()),
    impressaoPadrao:
      "Estudo ecográfico morfofuncional do coração fetal (gemelar) sem alterações estruturais maiores aparentes, com ritmo e função habituais em ambos os fetos.\n\nObs.: A ecocardiografia fetal tem por objetivo identificar malformações e analisar a função e o ritmo cardíaco fetal. As principais dificuldades diagnósticas inerentes ao método são: comunicação interatrial, comunicação interventricular e coarctação da aorta, em razão das peculiaridades da circulação fetal.",
  };
}
