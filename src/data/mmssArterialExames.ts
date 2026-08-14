import type { Exame, Opcao, Secao } from "@/data/exames";
import type { LadoArticulacao } from "@/lib/ladoMsk";

export const TECNICA_MMSS_ARTERIAL = `Exame realizado com transdutor linear de alta frequência (9–14 MHz) em aparelho de ultrassonografia com Doppler colorimetria e análise espectral por onda pulsada. Foram avaliados os segmentos arteriais do membro superior, desde a artéria subclávia em sua origem até os arcos palmares, incluindo as artérias axilar, braquial, ulnar e radial, complementadas com testes dinâmicos quando pertinentes.`;

function membroFrase(lado: LadoArticulacao): string {
  return `membro superior ${lado === "esquerdo" ? "esquerdo" : "direito"}`;
}

export function impressaoMmssArterialNormal(lado: LadoArticulacao): string {
  const m = membroFrase(lado);
  return `Estudo Doppler arterial do ${m} dentro dos limites da normalidade.
Ausência de sinais ultrassonográficos de estenoses significativas, oclusões, aneurismas ou malformações arteriovenosas nos territórios explorados.
Padrão espectral arterial trifásico preservado em toda a árvore vascular avaliada.`;
}

function textoNormalArterial(lado: LadoArticulacao): {
  subclavia: string;
  axilar: string;
  braquial: string;
  antebraco: string;
  palmar: string;
} {
  const m = membroFrase(lado);
  const L = lado === "esquerdo" ? "Esquerdo" : "Direito";
  return {
    subclavia: `Artérias Subclávias (porções infra e supraclaviculares) e Tronco Braquiocefálico — ${m}:
${L}: Artéria subclávia pérvia, com calibre preservado, paredes finas e regulares. Padrão espectral trifásico de alta resistência habitual. Fluxo sistodiastólico anterógrado normal. Ausência de sinais de estenoses ou oclusões significativas${
      lado === "esquerdo"
        ? ". Ausência de inversão de fluxo na fase sistólica precoce (ausência de sinal de roubo de subclávia)"
        : ""
    }.`,
    axilar: `Artéria Axilar — ${m}:
${L}: Calibre conservado. Fluxo trifásico preservado. Ausência de evidências de lesões obstrutivas ou aneurismáticas.`,
    braquial: `Artéria Braquial — ${m}:
${L}: Artéria braquial pérvia ao longo de todo o seu trajeto, apresentando paredes regulares e fluxo trifásico de alta resistência. Velocidades de pico sistólico dentro dos limites da normalidade.`,
    antebraco: `Artérias Radiais e Ulnares (Antebraço) — ${m}:
${L}:
Artéria Radial: Calibre preservado, fluxo trifásico normal, sem evidências de trombose ou estenose.
Artéria Ulnar: Calibre preservado, fluxo trifásico normal.`,
    palmar: `Arcos Palmares Superficiais e Profundos — ${m}:
Presença de sinais dopplerfluxométricos pérvios e contínuos, com preenchimento adequado dos arcos palmares e artérias digitais comuns.`,
  };
}

/** Patologias arteriais MMSS — selecionáveis por segmento */
const PATOLOGIAS: Opcao[] = [
  {
    id: "daop-estenose",
    label: "DAOP — estenose / placa ateromatosa",
    texto:
      "Doença aterosclerótica obstrutiva periférica (DAOP): presença de placa(s) de ateroma ____ (calcificada / fibro-lipídica / mista) em ____ (origem da subclávia / braquial / ____), gerando estenose luminal. Perda do padrão trifásico (espectro ____ bifásico de baixa resistência / monofásico), aumento turbilhonar da VPS no foco da estenose (VPS {{MEDIDA}}) e padrão tardus-parvus distalmente.",
    impressao:
      "Imagem sugestiva de doença aterosclerótica obstrutiva com estenose arterial no membro superior.",
  },
  {
    id: "daop-oclusao",
    label: "DAOP — oclusão arterial",
    texto:
      "Doença aterosclerótica obstrutiva periférica (DAOP): oclusão luminal em ____ por placa ateromatosa / trombo sobre placa. Ausência de sinal de cor e espectro no segmento acometido, com preenchimento luminal por material ecogênico.",
    impressao:
      "Imagem sugestiva de oclusão arterial aterosclerótica no membro superior.",
  },
  {
    id: "tos-arterial",
    label: "Síndrome do desfiladeiro torácico (TOS arterial)",
    texto:
      "Sinais compatíveis com síndrome do desfiladeiro torácico arterial (Thoracic Outlet Syndrome): compressão extrínseca da artéria subclávia durante manobras posicionais dos braços (____ Adson / Eden / Wright / hiperabdução), com queda acentuada ou abolição do fluxo arterial distal e amortecimento da onda espectral. Correlacionar com eventual costela cervical ou banda fibrosa.",
    impressao:
      "Achados sugestivos de síndrome do desfiladeiro torácico arterial (TOS).",
  },
  {
    id: "fenomeno-raynaud",
    label: "Fenômeno de Raynaud",
    texto:
      "Achados compatíveis com fenômeno de Raynaud (____ primário / secundário): resistência vascular persistentemente elevada e diminuição crítica ou ausência de fluxo detectável nos arcos palmares e artérias digitais ____ (após estímulo térmico / teste de provocação com água fria). Correlacionar clinicamente (doenças do colágeno / esclerodermia quando pertinente).",
    impressao: "Achados sugestivos de fenômeno de Raynaud.",
  },
  {
    id: "embolia-distal",
    label: "Tromboembolismo arterial / embolia distal",
    texto:
      "Oclusão aguda por êmbolo em ____: interrupção abrupta do fluxo, ausência de sinal de cor e espectro no segmento acometido, com preenchimento luminal por material ecogênico (trombo). Considerar origem ____ (cardíaca / aneurismática proximal / ____).",
    impressao:
      "Imagem sugestiva de tromboembolismo arterial / embolia distal no membro superior.",
  },
  {
    id: "aneurisma",
    label: "Aneurisma verdadeiro",
    texto:
      "Dilatação aneurismática verdadeira (envolvimento de todas as camadas da parede) em ____, diâmetro {{MEDIDA}}, com fluxo turbilhonar no interior.",
    impressao:
      "Imagem sugestiva de aneurisma arterial verdadeiro no membro superior.",
  },
  {
    id: "pseudoaneurisma",
    label: "Pseudoaneurisma",
    texto:
      "Imagem sacular comunicando-se com o lúmen arterial em ____ (provável iatrogenia / punção), medindo {{MEDIDA}}, com sinal clássico de “yin-yang” ao Color Doppler e fluxo turbilhonar em “vai e vem” (to-and-fro) no colo — aspectos compatíveis com pseudoaneurisma (falso aneurisma).",
    impressao: "Imagem sugestiva de pseudoaneurisma no membro superior.",
  },
  {
    id: "arterite-takayasu",
    label: "Arterite (Takayasu / parede em anel)",
    texto:
      "Espessamento difuso, concêntrico e homogêneo da íntima-média arterial em ____ (sinal da “parede em anel” / “macarrão”), associado a estenose(s) longa(s) e hiperemia da parede ao Doppler de energia — aspectos compatíveis com arterite (ex.: Arterite de Takayasu). Correlacionar clinicamente.",
    impressao:
      "Achados sugestivos de arterite (espessamento parietal concêntrico) no membro superior.",
  },
  {
    id: "roubo-subclavia",
    label: "Sinal de roubo de subclávia",
    texto:
      "Inversão de fluxo na artéria vertebral / alteração espectral compatível com sinal de roubo de subclávia, associada a estenose/oclusão da artéria subclávia proximal. Correlacionar clinicamente.",
    impressao: "Sinais sugestivos de roubo de subclávia.",
  },
  {
    id: "fav",
    label: "Fístula arteriovenosa (FAV) / acesso vascular",
    texto:
      "Comunicação anormal entre artéria e veia em ____ (acesso para hemodiálise / FAV), com fluxo de baixa resistência e alta velocidade na artéria nutridora e na veia drenante. Medidas: {{MEDIDA}}.",
    impressao:
      "Imagem sugestiva de fístula arteriovenosa / acesso vascular no membro superior.",
  },
];

function porIds(...ids: string[]): Opcao[] {
  const set = new Set(ids);
  return PATOLOGIAS.filter((p) => set.has(p.id));
}

export function secoesMmssArterial(
  lado: LadoArticulacao = "direito",
): Secao[] {
  const n = textoNormalArterial(lado);
  return [
    {
      id: "subclavias-tbc",
      titulo: "1. Artérias Subclávias e Tronco Braquiocefálico",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.subclavia },
        ...porIds(
          "daop-estenose",
          "daop-oclusao",
          "tos-arterial",
          "embolia-distal",
          "aneurisma",
          "pseudoaneurisma",
          "arterite-takayasu",
          "roubo-subclavia",
          "fav",
        ),
      ],
    },
    {
      id: "axilares",
      titulo: "2. Artérias Axilares",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.axilar },
        ...porIds(
          "daop-estenose",
          "daop-oclusao",
          "embolia-distal",
          "aneurisma",
          "pseudoaneurisma",
          "arterite-takayasu",
          "fav",
        ),
      ],
    },
    {
      id: "braquiais",
      titulo: "3. Artérias Braquiais",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.braquial },
        ...porIds(
          "daop-estenose",
          "daop-oclusao",
          "embolia-distal",
          "aneurisma",
          "pseudoaneurisma",
          "arterite-takayasu",
          "fav",
        ),
      ],
    },
    {
      id: "radiais-ulnares",
      titulo: "4. Artérias Radiais e Ulnares",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.antebraco },
        ...porIds(
          "daop-estenose",
          "daop-oclusao",
          "embolia-distal",
          "aneurisma",
          "pseudoaneurisma",
          "fenomeno-raynaud",
          "fav",
        ),
      ],
    },
    {
      id: "arcos-palmares",
      titulo: "5. Arcos Palmares",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.palmar },
        ...porIds("embolia-distal", "fenomeno-raynaud", "daop-oclusao", "fav"),
      ],
    },
  ];
}

export function ajustarExameMmssArterial(
  exame: Exame,
  lado: LadoArticulacao | null = null,
): Exame {
  if (exame.id !== "mmss-arterial") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: TECNICA_MMSS_ARTERIAL,
    secoes: secoesMmssArterial(ladoEfetivo),
    impressaoPadrao: impressaoMmssArterialNormal(ladoEfetivo),
  };
}
