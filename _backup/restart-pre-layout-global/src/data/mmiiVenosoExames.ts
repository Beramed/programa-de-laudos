import type { Exame, Opcao, Secao } from "@/data/exames";
import type { LadoArticulacao } from "@/lib/ladoMsk";

export const TECNICA_MMII_VENOSO = `Aparelho: Ultrassonógrafo de alta resolução equipado com Doppler espectral e mapeamento de fluxo em cores.
Transdutor: Linear multifrequencial (5 a 12 MHz).
Protocolo: Avaliação sistemática dos sistemas venosos profundo e superficial dos membros inferiores, realizada em ortostatismo e decúbito, com testes dinâmicos de compressibilidade parietal com o transdutor, manobras de aumento de fluxo (auguração) e pesquisa de refluxo valvular nas junções safeno-femoral e safeno-poplítea.`;

function ladoFrase(lado: LadoArticulacao): string {
  return lado === "esquerdo" ? "esquerdo" : "direito";
}

function membroFrase(lado: LadoArticulacao): string {
  return `membro inferior ${ladoFrase(lado)}`;
}

export function impressaoMmiiVenosoNormal(lado: LadoArticulacao): string {
  const m = membroFrase(lado);
  return `Sistema Venoso Profundo: Pérvio, compressível e competente no ${m}, sem evidências ecográficas de trombose venosa profunda (aguda ou crônica) nos segmentos explorados.
Sistema Venoso Superficial: Pérvio e competente no ${m}, sem sinais de insuficiência valvular das veias safenas magna e parva ou ectasias varicosas significativas.
Estudo Doppler venoso do ${m} dentro dos padrões de normalidade.`;
}

function textoNormalProfundo(lado: LadoArticulacao): string {
  const m = membroFrase(lado);
  return `Veias Ilíacas Externas, Femorais Comuns, Femorais Superficiais, Femorais Profundas e Poplíteas (${m}):
Apresentam calibres preservados e paredes finas e regulares.
Compressibilidade: Total e perfeita compressibilidade das paredes em toda a extensão explorada, ausentando-se qualquer evidência de material ecogênico intraluminal.
Luz Vascular: Livre de ecos, com excelente patência.
Estudo Espectral e Colorido: Fluxo espontâneo, fásico com a respiração, apresentando resposta imediata e adequada às manobras de compressão distal (auguração).
Competência Valvular: Valvas profundas competentes, sem sinais de refluxo patológico mensurável.

Sistema Profundo Infrapatelar (Veias Tibiais Anteriores, Tibiais Posteriores e Fibulares):
Todas as veias encontram-se pérvias, com calibres normais, totalmente compressíveis e sem sinais de trombose aguda ou crônica.`;
}

function textoNormalSuperficial(lado: LadoArticulacao): string {
  const m = membroFrase(lado);
  return `Veias Safenas Magnas (VSM) — ${m}:
Trajeto anatômico regular, com calibres uniformes e dentro dos limites da normalidade ao longo de coxa e perna.
Totalmente pérvias e sem ectasias significativas.
Competência Valvular: Junção safeno-femoral competente, com fluxo laminar habitual e ausência de refluxos patológicos após manobras provocativas (Valsalva/compressão distal).

Veias Safenas Parvas (VSP):
Junção safeno-poplítea e trajeto pérvios, sem sinais de dilatação ou refluxo valvular.
Ausência de veias tributárias varicosas aparentes ou refluxantes nos territórios avaliados.`;
}

const PATOLOGIAS_PROFUNDAS: Opcao[] = [
  {
    id: "tvp-aguda",
    label: "Trombose venosa profunda aguda",
    texto:
      "Veia(s) ____ com calibre aumentado e material hipoecogênico intraluminal, não compressível(is), sem fluxo detectável ao Doppler — aspectos compatíveis com trombose venosa profunda aguda.",
    impressao: "Imagem sugestiva de trombose venosa profunda aguda.",
  },
  {
    id: "tvp-subaguda-cronica",
    label: "TVP subaguda/crônica não recanalizada",
    texto:
      "Veia(s) ____ com material hiperecogênico aderido à parede, não compressível(is), com pobres sinais de recanalização — aspectos compatíveis com trombose venosa profunda subaguda/crônica não recanalizada.",
    impressao:
      "Imagem sugestiva de trombose venosa profunda subaguda/crônica não recanalizada.",
  },
  {
    id: "tvp-cronica-parcial",
    label: "TVP crônica parcialmente recanalizada",
    texto:
      "Veia(s) ____ com material hiperecogênico e traves no interior, parcialmente compressíveis, paredes espessas e sinais de recanalização parcial — aspectos compatíveis com TVP crônica parcialmente recanalizada.",
    impressao:
      "Imagem sugestiva de trombose venosa profunda crônica parcialmente recanalizada.",
  },
  {
    id: "refluxo-profundo",
    label: "Refluxo valvar profundo",
    texto:
      "Veia(s) profunda(s) ____ pérvia(s), com refluxo valvar patológico mensurável (duração {{MEDIDA}}), paredes finas e compressibilidade preservada.",
    impressao: "Imagem sugestiva de refluxo valvar profundo.",
  },
];

const PATOLOGIAS_SUPERFICIAIS: Opcao[] = [
  {
    id: "refluxo-vsm",
    label: "Refluxo / insuficiência da VSM",
    texto:
      "Veia safena magna com incompetência valvar e refluxo patológico no(s) segmento(s) ____ (duração {{MEDIDA}}). Junção safeno-femoral ____ (competente / incompetente).",
    impressao:
      "Imagem sugestiva de insuficiência valvular da veia safena magna.",
  },
  {
    id: "refluxo-vsp",
    label: "Refluxo / insuficiência da VSP",
    texto:
      "Veia safena parva com incompetência valvar e refluxo patológico (duração {{MEDIDA}}). Junção safeno-poplítea ____ (competente / incompetente).",
    impressao:
      "Imagem sugestiva de insuficiência valvular da veia safena parva.",
  },
  {
    id: "tromboflebite",
    label: "Tromboflebite superficial",
    texto:
      "Veia safena ____ (magna / parva) com calibre aumentado e material hipoecogênico intraluminal, não compressível, sem fluxo detectável ao Doppler, estendendo-se do(a) ____ — aspectos compatíveis com tromboflebite.",
    impressao: "Imagem sugestiva de tromboflebite superficial.",
  },
  {
    id: "varicosidades",
    label: "Varicosidades / tributárias",
    texto:
      "Varicosidades / veias tributárias dilatadas presentes em ____ (coxa / perna), com ____ (refluxo / sem refluxo significativo).",
    impressao: "Imagem sugestiva de varicosidades nos territórios avaliados.",
  },
  {
    id: "perfurantes",
    label: "Veia(s) perfurante(s) incompetente(s)",
    texto:
      "Pesquisa positiva de veia(s) perfurante(s) incompetente(s) na face ____ (medial / posterior) da perna, a {{MEDIDA}} da fáscia plantar/calcâneo.",
    impressao: "Imagem sugestiva de veia perfurante incompetente na perna.",
  },
  {
    id: "safenectomia",
    label: "Safenectomia / status cirúrgico",
    texto:
      "Veia safena magna não caracterizada em ____ (toda a extensão / 2/3 proximais da coxa) — status pós-operatório (safenectomia). Demais porções ____ (pérvias / não avaliáveis).",
    impressao: "Imagem sugestiva de status pós-safenectomia.",
  },
];

export function secoesMmiiVenoso(
  lado: LadoArticulacao = "direito",
): Secao[] {
  return [
    {
      id: "sistema-profundo",
      titulo: "A. Sistema Venoso Profundo",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto: textoNormalProfundo(lado),
        },
        ...PATOLOGIAS_PROFUNDAS,
      ],
    },
    {
      id: "sistema-superficial",
      titulo: "B. Sistema Venoso Superficial",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto: textoNormalSuperficial(lado),
        },
        ...PATOLOGIAS_SUPERFICIAIS,
      ],
    },
  ];
}

export function ajustarExameMmiiVenoso(
  exame: Exame,
  lado: LadoArticulacao | null = null,
): Exame {
  if (exame.id !== "mmii-venoso") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: TECNICA_MMII_VENOSO,
    secoes: secoesMmiiVenoso(ladoEfetivo),
    impressaoPadrao: impressaoMmiiVenosoNormal(ladoEfetivo),
  };
}
