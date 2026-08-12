import type { Exame, Opcao, Secao } from "@/data/exames";

export const TECNICA_CAROTIDAS = `Aparelho: Ultrassonógrafo de alta resolução equipado com Doppler espectral e mapeamento de fluxo em cores (Color Doppler).
Transdutores: Setorial/Linear multifrequencial (7 a 15 MHz).
Protocolo: Varredura bilateral em modo B, Doppler colorido e espectral dos troncos braquiocefálicos, artérias carótidas comuns (ACC), bifurcações carotídeas, artérias carótidas internas (ACI), artérias carótidas externas (ACE) e artérias vertebrais (segmentos V1 e V2), seguindo os critérios consensuais da Society of Radiologists in Ultrasound (SRU) e da American Society of Echocardiography (ASE).`;

export const IMPRESSAO_CAROTIDAS_NORMAL =
  "Exame ultrassonográfico Doppler das artérias carótidas e vertebrais dentro dos parâmetros da normalidade, sem evidência de estenose hemodinamicamente significativa no campo do exame.";

const opcoesPlacaAteromatose = (alvo: string): Opcao[] => [
  {
    id: "placa-hiperecogenica",
    label: "Placa hiperecogênica (calcificada)",
    texto: `Presença de placa aterosclerótica hiperecogênica (calcificada) em ${alvo}, com alta refletividade acústica e sombra acústica posterior, medindo {{MEDIDA}}. Superfície ____ (regular / irregular / ulcerada).`,
    impressao: `Imagem sugestiva de placa aterosclerótica calcificada em ${alvo}.`,
  },
  {
    id: "placa-mista",
    label: "Placa mista (heterogênea)",
    texto: `Presença de placa aterosclerótica mista/heterogênea em ${alvo}, com áreas de ecogenicidades variadas, medindo {{MEDIDA}}. Superfície ____ (regular / irregular / ulcerada).`,
    impressao: `Imagem sugestiva de placa aterosclerótica mista/heterogênea em ${alvo}.`,
  },
  {
    id: "placa-hipoecogenica",
    label: "Placa hipoecogênica (mole / lipídica)",
    texto: `Presença de placa aterosclerótica hipoecogênica (mole/lipídica) em ${alvo}, de baixa ecogenicidade, medindo {{MEDIDA}}. Superfície ____ (regular / irregular / ulcerada). Relevância: maior associação a vulnerabilidade e risco emboligênico.`,
    impressao: `Imagem sugestiva de placa aterosclerótica hipoecogênica em ${alvo}.`,
  },
];

const opcoesEstenose = (vaso: string): Opcao[] => [
  {
    id: "estenose-leve",
    label: "Estenose leve (<50%)",
    texto: `${vaso}: estreitamento luminal com critérios hemodinâmicos de estenose leve (<50%) — VSP {{MEDIDA}} (referência ACI <125 cm/s), relação ACI/ACC <2,0, sem turbulência significativa.`,
    impressao: `Imagem sugestiva de estenose leve (<50%) em ${vaso}.`,
  },
  {
    id: "estenose-moderada",
    label: "Estenose moderada (50–69%)",
    texto: `${vaso}: critérios hemodinâmicos de estenose moderada (50–69%) — VSP {{MEDIDA}} (referência ACI 125–230 cm/s), relação ACI/ACC entre 2,0 e 4,0, com preenchimento espectral moderado.`,
    impressao: `Imagem sugestiva de estenose moderada (50–69%) em ${vaso}.`,
  },
  {
    id: "estenose-grave",
    label: "Estenose grave (≥70%)",
    texto: `${vaso}: critérios hemodinâmicos de estenose grave (≥70%) — VSP {{MEDIDA}} (referência ACI >230 cm/s), relação ACI/ACC >4,0, alargamento espectral acentuado e VDF elevada (>100 cm/s quando aplicável).`,
    impressao: `Imagem sugestiva de estenose grave (≥70%) em ${vaso}.`,
  },
  {
    id: "oclusao",
    label: "Oclusão completa",
    texto: `${vaso}: ausência absoluta de fluxo intraluminal ao Color Doppler e ao Doppler Power, com preenchimento do lúmen por material ecogênico e colapso parcial/total do vaso — aspectos compatíveis com oclusão completa.`,
    impressao: `Imagem sugestiva de oclusão completa de ${vaso}.`,
  },
];

function secaoAcc(id: string, titulo: string, lado: "direita" | "esquerda"): Secao {
  const normal =
    lado === "direita"
      ? "Calibre preservado, com trajeto retilíneo. Espessura miointimal (EMI/EIM) com valores dentro dos limites da normalidade para a faixa etária (<0,9 mm), sem evidência de placas ateromatosas focais. Complexo íntima-média com diferenciação conservada. Padrão de fluxo laminar habitual de baixa resistência."
      : "Calibre preservado, sem tortuosidades significativas. Espessura íntima-média preservada. Ausência de placas ateromatosas. Espectro Doppler com características hemodinâmicas normais.";

  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: [
      { id: "normal", label: "Normal", texto: normal },
      {
        id: "eim-aumentado",
        label: "Espessamento íntima-média (EIM)",
        texto:
          "Espessamento do complexo íntima-média (EIM/CIMT) na parede posterior da ACC, medindo {{MEDIDA}} (alterado quando >0,9–1,0 mm ou acima do percentil 75 para idade/sexo). Caráter ____ (difuso / segmentar).",
        impressao:
          "Imagem sugestiva de espessamento do complexo íntima-média da artéria carótida comum.",
      },
      ...opcoesPlacaAteromatose(`ACC ${lado}`),
      ...opcoesEstenose(`ACC ${lado}`),
    ],
  };
}

function secaoBifAci(
  id: string,
  titulo: string,
  lado: "direito" | "esquerdo",
): Secao {
  const normal =
    lado === "direito"
      ? `Bulbo/Bifurcação: Sem placas ateromatosas significativas. Espaço luminal preservado.
Artéria Carótida Interna (ACI): Calibre mantido. Fluxo com velocidades sistólicas de pico (VSP) normais e índices de resistência preservados. Ausência de sinais hemodinâmicos de estenose significativa.`
      : `Bulbo/Bifurcação: Sem placas ateromatosas significativas. Espaço luminal preservado.
Artéria Carótida Interna (ACI): Fluxo anterógrado laminar, com velocidades de pico sistólico dentro dos parâmetros de normalidade e ausência de turbulências focais.`;

  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: [
      { id: "normal", label: "Normal", texto: normal },
      ...opcoesPlacaAteromatose(`bulbo/bifurcação ${lado}`),
      ...opcoesEstenose(`ACI ${lado}`),
      {
        id: "disseccao",
        label: "Dissecção carotídea",
        texto: `Achados compatíveis com dissecção da carótida ${lado}: visualização de flap intimal dividindo o vaso em dois lúmenes e/ou hematoma intramural (espessamento concêntrico/excêntrico hipoecogênico). Ao Doppler, fluxos distintos em cada lúmen; falso lúmen com trombose parcial ou fluxo lento.`,
        impressao: `Imagem sugestiva de dissecção carotídea à ${lado === "direito" ? "direita" : "esquerda"}.`,
      },
      {
        id: "kinking",
        label: "Kinking (acotovelamento)",
        texto: `ACI ${lado} com angulação aguda (kinking em "V"/"U"). Ao Doppler, ____ (sem / com) aceleração sistólica focal ou distúrbio hemodinâmico significativo (VSP {{MEDIDA}}).`,
        impressao: `Imagem sugestiva de kinking da artéria carótida interna ${lado}.`,
      },
      {
        id: "coiling",
        label: "Coiling (alça / espiral)",
        texto: `ACI ${lado} com trajeto redundante em alça/espiral (coiling). Ao Doppler, ____ (sem / com) aceleração sistólica focal hemodinamicamente significativa (VSP {{MEDIDA}}).`,
        impressao: `Imagem sugestiva de coiling da artéria carótida interna ${lado}.`,
      },
    ],
  };
}

export function secoesCarotidas(): Secao[] {
  return [
    secaoAcc(
      "acc-direita",
      "A. Artérias Carótidas Comuns (ACC) — Direita",
      "direita",
    ),
    secaoAcc(
      "acc-esquerda",
      "A. Artérias Carótidas Comuns (ACC) — Esquerda",
      "esquerda",
    ),
    secaoBifAci(
      "bif-aci-direita",
      "B. Bifurcações e Artérias Carótidas Internas (ACI) — Lado Direito",
      "direito",
    ),
    secaoBifAci(
      "bif-aci-esquerda",
      "B. Bifurcações e Artérias Carótidas Internas (ACI) — Lado Esquerdo",
      "esquerdo",
    ),
    {
      id: "ace",
      titulo: "C. Artérias Carótidas Externas (ACE)",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal (bilateral)",
          texto:
            "Bilateralmente: artérias pérvias, com fluxo de alta resistência característico e resposta adequada à manobra temporal. Calibres preservados e ausência de lesões obstrutivas críticas.",
        },
        ...opcoesPlacaAteromatose("ACE"),
        ...opcoesEstenose("ACE"),
      ],
    },
    {
      id: "vertebral-direita",
      titulo: "D. Artérias Vertebrais — Direita",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "Artéria pérvia, com diâmetro preservado (compatível com a normalidade), apresentando fluxo anterógrado de padrão normorresistivo em todo o trajeto insonado (segmentos V1 e V2).",
        },
        {
          id: "roubo-subclavio",
          label: "Roubo de subclávio (fluxo invertido)",
          texto:
            "Artéria vertebral direita com inversão do sentido do fluxo (retrógrado ou padrão to-and-fro), aspectos compatíveis com roubo de subclávio. Correlacionar com lesão obstrutiva da artéria subclávia proximal ipsilateral.",
          impressao:
            "Imagem sugestiva de alterações do fluxo vertebral direito compatíveis com roubo de subclávia.",
        },
        {
          id: "hipoplasia",
          label: "Hipoplasia",
          texto:
            "Artéria vertebral direita com diâmetro difusamente reduzido ({{MEDIDA}}), com fluxo cefálico de amplitude reduzida — aspectos compatíveis com hipoplasia.",
          impressao:
            "Imagem sugestiva de hipoplasia da artéria vertebral direita.",
        },
        {
          id: "estenose-oclusao-vertebral",
          label: "Estenose / oclusão vertebral",
          texto:
            "Artéria vertebral direita com ____ (estenose proximal / oclusão / estenose grave distal), VSP {{MEDIDA}}. Correlacionar clinicamente.",
          impressao:
            "Imagem sugestiva de estenose/oclusão da artéria vertebral direita.",
        },
      ],
    },
    {
      id: "vertebral-esquerda",
      titulo: "D. Artérias Vertebrais — Esquerda",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "Artéria pérvia, com calibre simétrico em relação ao antímero oposto, exibindo fluxo anterógrado e padrão laminar habitual. Ausência de sinais de inversão de fluxo (roubo) ou resistência anômala.",
        },
        {
          id: "roubo-subclavio",
          label: "Roubo de subclávio (fluxo invertido)",
          texto:
            "Artéria vertebral esquerda com inversão do sentido do fluxo (retrógrado ou padrão to-and-fro), aspectos compatíveis com roubo de subclávio. Correlacionar com lesão obstrutiva da artéria subclávia proximal ipsilateral.",
          impressao:
            "Imagem sugestiva de alterações do fluxo vertebral esquerdo compatíveis com roubo de subclávia.",
        },
        {
          id: "hipoplasia",
          label: "Hipoplasia",
          texto:
            "Artéria vertebral esquerda com diâmetro difusamente reduzido ({{MEDIDA}}), com fluxo cefálico de amplitude reduzida — aspectos compatíveis com hipoplasia.",
          impressao:
            "Imagem sugestiva de hipoplasia da artéria vertebral esquerda.",
        },
        {
          id: "estenose-oclusao-vertebral",
          label: "Estenose / oclusão vertebral",
          texto:
            "Artéria vertebral esquerda com ____ (estenose proximal / oclusão / estenose grave distal), VSP {{MEDIDA}}. Correlacionar clinicamente.",
          impressao:
            "Imagem sugestiva de estenose/oclusão da artéria vertebral esquerda.",
        },
      ],
    },
  ];
}

export function exameCarotidasBase(): Pick<
  Exame,
  "tecnica" | "tituloDocumento" | "secoes" | "impressaoPadrao" | "nome"
> {
  return {
    nome: "Carótidas e Vertebrais",
    tituloDocumento:
      "ULTRASSONOGRAFIA DOPPLER DE ARTÉRIAS CARÓTIDAS E VERTEBRAIS",
    tecnica: TECNICA_CAROTIDAS,
    secoes: secoesCarotidas(),
    impressaoPadrao: IMPRESSAO_CAROTIDAS_NORMAL,
  };
}
