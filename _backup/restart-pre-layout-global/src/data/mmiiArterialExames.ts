import type { Exame, Opcao, Secao } from "@/data/exames";
import type { LadoArticulacao } from "@/lib/ladoMsk";

export const TECNICA_MMII_ARTERIAL = `Método: Exame realizado com varredura bidimensional (Modo-B), complementado por análise espectral por Doppler Pulsado e mapeamento de fluxo em cores (Color Doppler).
Equipamento: Aparelho de ultrassonografia de alta resolução com transdutores lineares (7–12 MHz) para segmentos superficiais e convexos (3–5 MHz) para segmentos ilíacos e profundos.
Protocolo de Varredura: Estudo hemodinâmico sequencial, abrangendo as artérias ilíacas comuns/externas, femorais comuns, femorais superficiais, femorais profundas, poplíteas e artérias da perna (tibiais anterior/posterior e fibular).`;

function membroFrase(lado: LadoArticulacao): string {
  return `membro inferior ${lado === "esquerdo" ? "esquerdo" : "direito"}`;
}

export function impressaoMmiiArterialNormal(lado: LadoArticulacao): string {
  const m = membroFrase(lado);
  return `Estudo ultrassonográfico com Doppler arterial do ${m} sem alterações significativas.
Artérias pérvias, com morfologia e padrões hemodinâmicos normais (trifásicos).
Ausência de evidências ecográficas de doença arterial obstrutiva periférica (DAOP), placas ateromatosas ou dilatações aneurismáticas.`;
}

function textoNormalArterial(lado: LadoArticulacao): {
  iliaco: string;
  femoro: string;
  infra: string;
  hemo: string;
} {
  const m = membroFrase(lado);
  return {
    iliaco: `Segmento Ilíaco-Femoral (${m}): Artérias ilíaca comum, externa e femoral comum pérvias, com trajeto habitual. Paredes finas, lisas e regulares, sem evidências de placas ateromatosas ou estenoses hemodinamicamente significativas.`,
    femoro: `Segmento Femoropoplíteo (${m}): Artérias femoral superficial e poplítea pérvias, com calibres preservados em toda a sua extensão. Ausência de imagens de oclusão ou dilatações aneurismáticas.`,
    infra: `Segmento Infrapoplíteo (${m}): Artérias tibial anterior, tibial posterior e fibular pérvias, com fluxo anterógrado preservado até os segmentos distais (tornozelo).`,
    hemo: `Hemodinâmica (${m}): Padrão espectral trifásico de alta resistência em todos os segmentos avaliados. Velocidades de pico sistólico (VPS) dentro dos parâmetros de normalidade, sem aliasing ou turbulências focais.`,
  };
}

const PATOLOGIAS_ARTERIAIS: Opcao[] = [
  {
    id: "placa-ateromatosa",
    label: "Placa ateromatosa",
    texto:
      "Placa ateromatosa ____ (calcificada / mole / mista) em ____, ____ (estenósante / não estenósante), medindo {{MEDIDA}}.",
    impressao: "Imagem sugestiva de placa ateromatosa arterial.",
  },
  {
    id: "estenose-hemodinamica",
    label: "Estenose hemodinâmica",
    texto:
      "Estenose hemodinamicamente significativa em ____: VPS {{MEDIDA}} com aliasing colorido e, distalmente, espectro amortecido (tardus-parvus).",
    impressao: "Imagem sugestiva de estenose arterial hemodinamicamente significativa.",
  },
  {
    id: "oclusao-arterial",
    label: "Oclusão arterial",
    texto:
      "Oclusão arterial em ____: ausência de fluxo ao Doppler cor e espectral, com preenchimento da luz por material ecogênico (trombo).",
    impressao: "Imagem sugestiva de oclusão arterial.",
  },
  {
    id: "aneurisma",
    label: "Aneurisma verdadeiro",
    texto:
      "Dilatação aneurismática verdadeira em ____, diâmetro {{MEDIDA}} (critério: >50% do esperado; poplíteo >1,0 cm ou femoral >1,5 cm).",
    impressao: "Imagem sugestiva de aneurisma arterial verdadeiro.",
  },
  {
    id: "pseudoaneurisma",
    label: "Pseudoaneurisma",
    texto:
      "Coleção perivascular pulsátil comunicante com a artéria ____, medindo {{MEDIDA}}, com sinal de “vai-e-vem” ao Doppler pulsado — aspectos compatíveis com pseudoaneurisma.",
    impressao: "Imagem sugestiva de pseudoaneurisma.",
  },
  {
    id: "encarceramento-popliteo",
    label: "Encarceramento da artéria poplítea",
    texto:
      "Sinais compatíveis com síndrome do encarceramento da artéria poplítea: compressão por feixes musculares durante manobras de flexão plantar, com interrupção ou redução drástica do fluxo.",
    impressao:
      "Imagem sugestiva de síndrome do encarceramento da artéria poplítea.",
  },
  {
    id: "buerger",
    label: "Tromboangeíte obliterante (Buerger)",
    texto:
      "Oclusões segmentares em artérias distais (tibiais/fibulares) com preservação relativa dos vasos proximais — aspectos compatíveis com tromboangeíte obliterante (Buerger). Correlacionar com tabagismo.",
    impressao:
      "Achados sugestivos de tromboangeíte obliterante (doença de Buerger).",
  },
  {
    id: "arterite-halo",
    label: "Arterite (sinal do halo)",
    texto:
      "Espessamento concêntrico e difuso da parede arterial em ____ (sinal do “halo”) — aspectos compatíveis com arterite. Correlacionar clinicamente.",
    impressao: "Imagem sugestiva de arterite (espessamento parietal concêntrico).",
  },
  {
    id: "disseccao",
    label: "Dissecção arterial",
    texto:
      "Presença de flap intimal móvel em ____ dividindo o lúmen em verdadeiro e falso — aspectos compatíveis com dissecção arterial.",
    impressao: "Imagem sugestiva de dissecção arterial.",
  },
  {
    id: "fav",
    label: "Fístula arteriovenosa (FAV)",
    texto:
      "Comunicação anormal entre artéria e veia em ____, com fluxo de baixa resistência e alta velocidade na artéria nutridora e na veia drenante — aspectos compatíveis com FAV.",
    impressao: "Imagem sugestiva de fístula arteriovenosa.",
  },
  {
    id: "embolia-aguda",
    label: "Embolia aguda",
    texto:
      "Interrupção súbita do fluxo arterial em ____ sem evidências de doença aterosclerótica crônica prévia no segmento, com êmbolo hipoecóico visível — aspectos compatíveis com embolia aguda.",
    impressao: "Imagem sugestiva de embolia arterial aguda.",
  },
];

export function secoesMmiiArterial(
  lado: LadoArticulacao = "direito",
): Secao[] {
  const n = textoNormalArterial(lado);
  return [
    {
      id: "segmento-iliaco-femoral",
      titulo: "A. Segmento Ilíaco-Femoral",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.iliaco },
        ...PATOLOGIAS_ARTERIAIS.filter((p) =>
          /placa|estenose|oclusao|aneurisma|pseudo|disseccao|fav|embolia|arterite/.test(
            p.id,
          ),
        ),
      ],
    },
    {
      id: "segmento-femoropopliteo",
      titulo: "B. Segmento Femoropoplíteo",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.femoro },
        ...PATOLOGIAS_ARTERIAIS,
      ],
    },
    {
      id: "segmento-infrapopliteo",
      titulo: "C. Segmento Infrapoplíteo",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.infra },
        ...PATOLOGIAS_ARTERIAIS.filter((p) =>
          /placa|estenose|oclusao|buerger|embolia/.test(p.id),
        ),
      ],
    },
    {
      id: "hemodinamica",
      titulo: "D. Hemodinâmica",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        { id: "normal", label: "Normal", texto: n.hemo },
        {
          id: "espectro-alterado",
          label: "Espectro alterado / monofásico",
          texto:
            "Padrão espectral ____ (bifásico / monofásico / tardus-parvus) em ____, VPS {{MEDIDA}}.",
          impressao: "Sinais sugestivos de alteração do padrão espectral arterial.",
        },
      ],
    },
  ];
}

export function ajustarExameMmiiArterial(
  exame: Exame,
  lado: LadoArticulacao | null = null,
): Exame {
  if (exame.id !== "mmii-arterial") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: TECNICA_MMII_ARTERIAL,
    secoes: secoesMmiiArterial(ladoEfetivo),
    impressaoPadrao: impressaoMmiiArterialNormal(ladoEfetivo),
  };
}
