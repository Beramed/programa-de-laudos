import type { Exame, Opcao, Secao } from "@/data/exames";
import type { LadoArticulacao } from "@/lib/ladoMsk";

export const TECNICA_MMSS_VENOSO = `Exame realizado com transdutor linear de alta frequência (9–14 MHz) em aparelho de ultrassonografia com Doppler colorimetria, estudo espectral e manobras de compressibilidade mecânica. Foram avaliados os sistemas venosos profundo e superficial do membro superior, incluindo as veias jugular interna, subclávia, axilar, braquiais, basílica, cefálica e veias profundas do antebraço.`;

function membroFrase(lado: LadoArticulacao): string {
  return `membro superior ${lado === "esquerdo" ? "esquerdo" : "direito"}`;
}

export function impressaoMmssVenosoNormal(lado: LadoArticulacao): string {
  const m = membroFrase(lado);
  return `Sistema venoso profundo e superficial do ${m} pérvio e sem sinais de trombose (aguda ou crônica).
Veias com paredes finas, totalmente compressíveis e com padrão de fluxo normal (espontâneo, fásico e com resposta preservada às manobras dinâmicas).
Ausência de sinais de compressão extrínseca ou falhas de enchimento luminal nos segmentos avaliados.`;
}

function textoNormalVenoso(lado: LadoArticulacao): {
  proximal: string;
  jugular: string;
  profundo: string;
  superficial: string;
} {
  const m = membroFrase(lado);
  const L = lado === "esquerdo" ? "Esquerdo" : "Direito";
  return {
    proximal: `Sistema Venoso Profundo Proximal (Subclávias e Axilares) — ${m}:
${L}:
Veia Subclávia: Calibre normal, totalmente compressível à manobra do transdutor. Preenchimento completo pelo mapeamento a cores (Color Doppler). Fluxo fásico com a respiração e com os batimentos cardíacos, apresentando adequada resposta às manobras de compressão distal. Ausência de material ecogênico em seu lúmen.
Veia Axilar: Pérvia, totalmente compressível, sem sinais de trombose aguda ou crônica.`,
    jugular: `Veia Jugular Interna — ${m}:
${L}: Calibre preservado, com excelente compressibilidade e ausência de trombos endocavitários. Fluxo modulado pelo ciclo cardíaco e respiratório.`,
    profundo: `Sistema Venoso Profundo do Braço e Antebraço (Braquiais, Radiais e Ulnares) — ${m}:
${L}: Veias braquiais pérvias, com paredes finas, totalmente compressíveis e sem sinais de obstrução luminal. Veias profundas do antebraço (radiais e ulnares) pérvias e compressíveis.`,
    superficial: `Sistema Venoso Superficial (Veias Cefálica e Basílica) — ${m}:
${L}:
Veia Cefálica: Calibre preservado em todo o seu trajeto braquial e antebraquial, pérvia e compressível.
Veia Basílica: Pérvia, sem sinais de tromboflebite superficial.`,
  };
}

const PATOLOGIAS_PROFUNDAS: Opcao[] = [
  {
    id: "tvp-aguda",
    label: "TVP aguda",
    texto:
      "Trombose venosa profunda aguda em ____ (subclávia / axilar / braquial / jugular / ____): ausência de compressibilidade mecânica da veia (sinal cardeal), lúmen preenchido por material ecogênico hipoecoico, ausência de fluxo ao Color Doppler e perda da fasicidade respiratória.",
    impressao:
      "Imagem sugestiva de trombose venosa profunda aguda no membro superior.",
  },
  {
    id: "tvp-cronica",
    label: "TVP crônica / sequelas",
    texto:
      "Sinais de trombose venosa profunda crônica / sequelas em ____: lúmen com material ecogênico hiperecoico / retraído, paredes espessadas, ____ (recanalização parcial / refluxo), sem critérios de trombose aguda. Compressibilidade ____ (parcialmente preservada / ausente).",
    impressao:
      "Imagem sugestiva de sequelas de trombose venosa profunda no membro superior.",
  },
  {
    id: "paget-schroetter",
    label: "Síndrome de Paget-Schröetter (TVP de esforço)",
    texto:
      "Sinais compatíveis com síndrome de Paget-Schröetter (trombose de esforço): trombo agudo/subagudo no território subclávio-axilar, com veia não compressível e material ecogênico endoluminal, frequentemente associado a hipertrofia muscular local / microtraumas repetitivos na junção costo-clavicular. Correlacionar clinicamente (atletas / esforço repetitivo).",
    impressao:
      "Achados sugestivos de síndrome de Paget-Schröetter (TVP de esforço da veia subclávia/axilar).",
  },
  {
    id: "complicacao-cvc",
    label: "Complicação de CVC / marcapasso",
    texto:
      "Complicação relacionada a cateter venoso central / marcapasso em ____ (jugular interna / subclávia): falhas de enchimento luminal adjacentes ao cabo do eletrodo ou cateter, associadas a ____ (trombo mural / oclusão parcial / oclusão completa / perda de fasicidade / compressibilidade parcial). Correlacionar com dispositivo in situ.",
    impressao:
      "Achados sugestivos de complicação venosa relacionada a CVC / marcapasso.",
  },
  {
    id: "svcs",
    label: "Síndrome da veia cava superior (SVCS)",
    texto:
      "Sinais compatíveis com síndrome da veia cava superior (SVCS): fluxo contínuo e amortecido nas veias subclávias e/ou jugulares, com perda total da modulação respiratória e cardíaca, ____ (inversão de fluxo / recrutamento de colaterais superficiais compensatórias). Correlacionar com obstrução extrínseca ou trombótica da veia cava superior.",
    impressao:
      "Achados sugestivos de síndrome da veia cava superior (SVCS).",
  },
  {
    id: "estenose-pos-cateter",
    label: "Estenose / sequela pós-cateter",
    texto:
      "Redução de calibre / estenose venosa em ____, possivelmente relacionada a passagem prévia de cateter venoso central. Fluxo ____ (acelerado / turbulento). Medida {{MEDIDA}}.",
    impressao:
      "Achados sugestivos de estenose venosa / sequela pós-cateter no membro superior.",
  },
];

const PATOLOGIAS_SUPERFICIAIS: Opcao[] = [
  {
    id: "tromboflebite",
    label: "Tromboflebite superficial",
    texto:
      "Tromboflebite superficial em ____ (cefálica / basílica / tributária): veia superficial espessada, ____ (dolorosa / indolor) à compressão, preenchida por trombo ecogênico não compressível, com hiperemia adjacente da gordura subcutânea ao mapeamento colorido. Considerar punção venosa periférica prévia ou infusão de medicação irritante.",
    impressao:
      "Imagem sugestiva de tromboflebite superficial no membro superior.",
  },
  {
    id: "varicosidades",
    label: "Varicosidades / dilatação",
    texto:
      "Dilatação / varicosidades de veias superficiais em ____, medindo {{MEDIDA}}.",
    impressao:
      "Imagem sugestiva de dilatação de veias superficiais no membro superior.",
  },
];

function porIds(lista: Opcao[], ...ids: string[]): Opcao[] {
  const set = new Set(ids);
  return lista.filter((p) => set.has(p.id));
}

export function secoesMmssVenoso(
  lado: LadoArticulacao = "direito",
): Secao[] {
  const n = textoNormalVenoso(lado);
  return [
    {
      id: "profundo-proximal",
      titulo: "1. Sistema Venoso Profundo Proximal",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.proximal },
        ...porIds(
          PATOLOGIAS_PROFUNDAS,
          "tvp-aguda",
          "tvp-cronica",
          "paget-schroetter",
          "complicacao-cvc",
          "svcs",
          "estenose-pos-cateter",
        ),
      ],
    },
    {
      id: "jugulares",
      titulo: "2. Veias Jugulares Internas",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.jugular },
        ...porIds(
          PATOLOGIAS_PROFUNDAS,
          "tvp-aguda",
          "tvp-cronica",
          "complicacao-cvc",
          "svcs",
        ),
      ],
    },
    {
      id: "profundo-braco",
      titulo: "3. Sistema Venoso Profundo do Braço e Antebraço",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.profundo },
        ...porIds(
          PATOLOGIAS_PROFUNDAS,
          "tvp-aguda",
          "tvp-cronica",
          "complicacao-cvc",
          "estenose-pos-cateter",
        ),
      ],
    },
    {
      id: "superficial",
      titulo: "4. Sistema Venoso Superficial",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.superficial },
        ...PATOLOGIAS_SUPERFICIAIS,
      ],
    },
  ];
}

export function ajustarExameMmssVenoso(
  exame: Exame,
  lado: LadoArticulacao | null = null,
): Exame {
  if (exame.id !== "mmss-venoso") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: TECNICA_MMSS_VENOSO,
    secoes: secoesMmssVenoso(ladoEfetivo),
    impressaoPadrao: impressaoMmssVenosoNormal(ladoEfetivo),
  };
}
