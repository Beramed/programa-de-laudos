import type { Exame, Opcao, Secao } from "@/data/exames";
import { mergePatologiasMsk } from "@/data/patologiasMskPdf";

export type LadoMsk = "direito" | "esquerdo";

export function stripFrasesDoppler(texto: string): string {
  const limpo = texto
    .split(/\n/)
    .map((linha) => {
      const frases = linha
        .split(/(?<=\.)\s+/)
        .filter((f) => f.trim() && !/\bdoppler\b/i.test(f));
      return frases.join(" ").trim();
    })
    .filter(Boolean)
    .join("\n");
  return limpo.replace(/\n{3,}/g, "\n\n").trim();
}

function opcaoSemDopplerSePreciso(op: Opcao, comDoppler: boolean): Opcao {
  if (comDoppler) return op;
  return {
    ...op,
    texto: stripFrasesDoppler(op.texto),
    impressao: op.impressao
      ? stripFrasesDoppler(op.impressao)
      : op.impressao,
  };
}

function mapOps(ops: Opcao[], comDoppler: boolean): Opcao[] {
  return ops.map((op) => opcaoSemDopplerSePreciso(op, comDoppler));
}

function tituloComDoppler(base: string, comDoppler: boolean): string {
  const limpo = base.replace(/\s*COM DOPPLER COLORIDO/gi, "").trim();
  return comDoppler ? `${limpo} COM DOPPLER COLORIDO` : limpo;
}

function hiperemia(comDoppler: boolean, frase?: string): string {
  if (!comDoppler) return "";
  return (
    frase ??
    " Ao Doppler colorido observa-se hiperemia, compatível com processo inflamatório ativo."
  );
}

/* ——— OMBRO ——— */

export function impressaoOmbroNormal(
  comDoppler: boolean,
  lado: LadoMsk,
): string {
  const ladoTxt = lado === "esquerdo" ? "esquerdo" : "direito";
  const base = `Exame ultrassonográfico do ombro ${ladoTxt} dentro dos limites da normalidade anatômica, sem evidências de lesões tendíneas do manguito rotador.`;
  if (!comDoppler) return base;
  return `${base} Ausência de atividade inflamatória ao Doppler.`;
}

function textoNormalOmbroRegiao(
  regiao:
    | "supraespinal"
    | "infraespinal"
    | "subescapular"
    | "clb"
    | "bursa"
    | "ac"
    | "doppler",
  lado: LadoMsk,
  comDoppler: boolean,
): string {
  if (lado === "esquerdo") {
    const map = {
      supraespinal:
        "Arquitetura fibrilar preservada, sem evidências de soluções de continuidade, áreas hipoecogênicas ou alterações degenerativas.",
      infraespinal:
        "Padrão ecotextural linear regular, sem sinais de lesões intrassubstanciais.",
      subescapular:
        "Morfologia e espessura normais, com inserção intacta no tubérculo menor.",
      clb: "Sem evidências de tenossinovite, luxação ou subluxação no canal bicipital.",
      bursa: "Colapsada, sem coleções líquidas anecóicas.",
      ac: "Sem alterações morfológicas degenerativas evidentes.",
      doppler: "Sem aumento do sinal vascular local.",
    } as const;
    return map[regiao];
  }
  const map = {
    supraespinal:
      "Apresenta espessura, contornos e ecotextura fibrilar homogênea, sem áreas focais de afilamento ou descontinuidade fibrilar. Superfície cortical do tubérculo maior regular.",
    infraespinal:
      "Integração fibrilar preservada, com ecogenicidade normal e ausência de imagens cavitárias ou tendinopatias.",
    subescapular:
      "Feixes tendíneos múltiplos bem delineados, sem sinais de rotura parcial ou total em suas facetas de inserção.",
    clb: "Posicionado corretamente no sulco intertubercular, exibindo calibre habitual e ecotextura preservada.",
    bursa: "Sem distensão líquida significativa ou espessamento sinovial.",
    ac: "Espaço articular preservado, sem osteófitos marginais inferiores expressivos ou instabilidade dinâmica.",
    doppler:
      "Padrão vascular basal fisiológico, sem sinais de hiperfluxo patológico.",
  } as const;
  return map[regiao];
}

export function secoesOmbro(
  comDoppler = false,
  lado: LadoMsk = "direito",
): Secao[] {
  const h = hiperemia(comDoppler);

  const secaoTendao = (
    id: string,
    titulo: string,
    regiao: "supraespinal" | "infraespinal" | "subescapular",
    labelCurto: string,
  ): Secao => ({
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: mapOps(
      [
        {
          id: "normal",
          label: "Normal",
          texto: textoNormalOmbroRegiao(regiao, lado, comDoppler),
        },
        {
          id: "tendinopatia",
          label: `Tendinopatia do ${labelCurto}`,
          texto: `Espessamento, perda do padrão fibrilar e áreas hipoecogênicas, aspectos sugestivos de tendinopatia do ${labelCurto}.${h}`,
          impressao: `Imagem sugestiva de tendinopatia do ${labelCurto}.`,
        },
        {
          id: "rotura-parcial",
          label: "Rotura parcial",
          texto:
            "Descontinuidade fibrilar parcial ____ (intratendínea / articular / bursal), medindo ____ cm, sem retração significativa.",
          impressao: `Imagem sugestiva de rotura parcial do ${labelCurto}.`,
        },
        {
          id: "rotura-total",
          label: "Rotura total",
          texto:
            "Solução de continuidade transfixante com retração tendínea de ____ cm, aspectos sugestivos de rotura total.",
          impressao: `Imagem sugestiva de rotura total do ${labelCurto}.`,
        },
      ],
      comDoppler,
    ),
  });

  const secoes: Secao[] = [
    secaoTendao(
      "supraespinal",
      "Tendão do Músculo Supraespinal",
      "supraespinal",
      "tendão do supraespinal",
    ),
    secaoTendao(
      "infraespinal",
      "Tendão do Músculo Infraespinal",
      "infraespinal",
      "tendão do infraespinal",
    ),
    secaoTendao(
      "subescapular",
      "Tendão do Músculo Subescapular",
      "subescapular",
      "tendão do subescapular",
    ),
    {
      id: "clb",
      titulo: "Tendão da Cabeça Longa do Músculo Bíceps Braquial",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalOmbroRegiao("clb", lado, comDoppler),
          },
          {
            id: "tendinopatia-clb",
            label: "Tendinopatia da CLB",
            texto: `Tendão da cabeça longa do bíceps com espessamento, hipoecogenicidade e perda do padrão fibrilar, aspectos sugestivos de tendinopatia.${h}`,
            impressao:
              "Imagem sugestiva de tendinopatia do tendão da cabeça longa do bíceps.",
          },
          {
            id: "tenossinovite-clb",
            label: "Tenossinovite da CLB",
            texto: `Bainha da cabeça longa do bíceps com líquido peritendíneo e/ou espessamento, aspectos sugestivos de tenossinovite.${h}`,
            impressao:
              "Imagem sugestiva de tenossinovite da cabeça longa do bíceps.",
          },
          {
            id: "instabilidade-clb",
            label: "Subluxação / luxação da CLB",
            texto:
              "Tendão da cabeça longa do bíceps com subluxação/luxação fora do sulco intertubercular.",
            impressao:
              "Imagem sugestiva de instabilidade (subluxação/luxação) da cabeça longa do bíceps.",
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "bursa",
      titulo: "Bursa Subacromial-Subdeltoidea",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalOmbroRegiao("bursa", lado, comDoppler),
          },
          {
            id: "bursite",
            label: "Bursite subacromial-subdeltoidea",
            texto: `Bursa subacromial-subdeltoidea distendida por líquido e/ou com espessamento sinovial, aspectos sugestivos de bursite.${h}`,
            impressao:
              "Imagem sugestiva de bursite subacromial-subdeltoidea.",
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "acromioclavicular",
      titulo: "Articulação Acromioclavicular",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalOmbroRegiao("ac", lado, comDoppler),
          },
          {
            id: "artrose-ac",
            label: "Alterações degenerativas AC",
            texto:
              "Articulação acromioclavicular com irregularidade cortical e/ou osteófitos marginais, aspectos sugestivos de alterações degenerativas.",
            impressao:
              "Imagem sugestiva de alterações degenerativas da articulação acromioclavicular.",
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "achados-adicionais-ombro",
      titulo: "Achados Adicionais",
      tipo: "multiplo",
      padrao: "sem-achados",
      opcoes: mapOps(
        mergePatologiasMsk(
          [
            {
              id: "sem-achados",
              label: "Sem achados adicionais",
              texto:
                "Sem outros achados adicionais relevantes no campo do exame.",
            },
            {
              id: "capsulite-adesiva",
              label: "Capsulite adesiva (ombro congelado)",
              texto:
                "Espessamento do intervalo rotador e/ou da cápsula articular (achados indiretos), podendo corresponder a capsulite adesiva. Correlacionar clinicamente.",
              impressao:
                "Achados indiretos sugestivos de capsulite adesiva. Correlacionar clinicamente.",
            },
          ],
          "ombro",
        ),
        comDoppler,
      ),
    },
  ];

  if (comDoppler) {
    secoes.splice(secoes.length - 1, 0, {
      id: "doppler-ombro",
      titulo: "Estudo Doppler Colorido",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto: textoNormalOmbroRegiao("doppler", lado, true),
        },
        {
          id: "hiperemia",
          label: "Hiperfluxo / hiperemia",
          texto:
            "Aumento do sinal vascular local ao Doppler colorido, aspectos sugestivos de processo inflamatório ativo.",
          impressao:
            "Sinais sugestivos de hiperemia ao Doppler colorido no ombro.",
        },
      ],
    });
  }

  return secoes;
}

export function ajustarExameOmbro(
  exame: Exame,
  comDoppler: boolean,
  lado: LadoMsk | null = null,
): Exame {
  if (exame.id !== "ombro") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: comDoppler
      ? "Exame ultrassonográfico realizado com transdutor linear de alta frequência (8–18 MHz), complementado por estudo Doppler colorido e manobras dinâmicas."
      : "Exame ultrassonográfico realizado com transdutor linear de alta frequência (8–18 MHz) e manobras dinâmicas.",
    tituloDocumento: tituloComDoppler(
      exame.tituloDocumento || "ULTRASSONOGRAFIA DO OMBRO",
      comDoppler,
    ),
    secoes: secoesOmbro(comDoppler, ladoEfetivo),
    impressaoPadrao: impressaoOmbroNormal(comDoppler, ladoEfetivo),
  };
}

/* ——— COTOVELO (textos bilaterais atualizados) ——— */

export function impressaoCotoveloNormal(
  comDoppler: boolean,
  lado: LadoMsk,
): string {
  const ladoTxt = lado === "esquerdo" ? "esquerdo" : "direito";
  return `Exame ultrassonográfico do cotovelo ${ladoTxt} dentro dos limites da normalidade anatômica.`;
}

function textoNormalCotovelo(
  secao: "bicipital" | "lateral" | "medial" | "posterior",
  lado: LadoMsk,
  comDoppler: boolean,
): string {
  if (lado === "esquerdo") {
    const map = {
      bicipital:
        "Complexo Bicipital Distal: Preservado, sem sinais de tendinopatia ou coleções adjacentes.",
      lateral:
        "Compartimento Lateral (Extensores): Estruturas tendíneas do epicôndilo lateral sem alterações degenerativas.",
      medial:
        "Compartimento Medial (Flexores): Origem dos músculos flexores-pronadores íntegra, sem espessamentos anômalos.",
      posterior:
        "Compartimento Posterior: Tendão tricipital e bursa olecraniana sem anormalidades. Nervo ulnar normoposicionado e sem sinais de neurite.",
    } as const;
    const doppler =
      secao === "posterior" && comDoppler
        ? "\nEstudo Doppler Colorido: Ausência de fluxo vascular patológico."
        : "";
    return `${map[secao]}${doppler}`;
  }
  const map = {
    bicipital:
      "Complexo Bicipital Distal: Tendão do bíceps braquial íntegro, com ecotextura fibrilar homogênea até sua inserção na tuberosidade radial. Fossa antecubital livre.",
    lateral:
      "Compartimento Lateral (Extensores): Tendão comum dos extensores com espessura e ecogenicidade preservadas, sem entesófitos ou sinais de tendinopatia.",
    medial:
      "Compartimento Medial (Flexores): Tendão comum dos flexores e ligamento colateral ulnar sem alterações morfológicas.",
    posterior:
      "Compartimento Posterior: Tendão do tríceps braquial inserido normalmente no olécrano. Nervo ulnar com calibre e ecotextura normais no túnel cubital, estável à flexão.",
  } as const;
  const doppler =
    secao === "posterior" && comDoppler
      ? "\nEstudo Doppler Colorido: Padrão vascular fisiológico, sem hiperemia."
      : "";
  return `${map[secao]}${doppler}`;
}

export function secoesCotovelo(
  comDoppler = false,
  lado: LadoMsk = "direito",
): Secao[] {
  const h = hiperemia(comDoppler);
  return [
    {
      id: "complexo-bicipital",
      titulo: "COMPLEXO BICIPITAL DISTAL",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalCotovelo("bicipital", lado, comDoppler),
          },
          {
            id: "ruptura-biceps",
            label: "Ruptura do bíceps distal",
            texto:
              "Tendão do bíceps braquial distal com desinserção ____ (parcial/total) na tuberosidade radial, gap de ____ cm, aspectos sugestivos de ruptura do bíceps distal.",
            impressao:
              "Imagem sugestiva de ruptura do bíceps braquial distal.",
          },
          {
            id: "tendinopatia-biceps",
            label: "Tendinopatia do bíceps distal",
            texto: `Tendão do bíceps braquial distal com espessamento e alteração da ecotextura fibrilar.${h}`,
            impressao:
              "Imagem sugestiva de tendinopatia do bíceps braquial distal.",
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "compartimento-lateral",
      titulo: "COMPARTIMENTO LATERAL (EXTENSORES)",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalCotovelo("lateral", lado, comDoppler),
          },
          {
            id: "epicondilite-lateral",
            label: "Epicondilite lateral (tennis elbow)",
            texto: `Tendão comum dos extensores (ECRB) na origem do epicôndilo lateral com espessamento, hipoecogenicidade e perda do padrão fibrilar, aspectos sugestivos de epicondilite lateral.${h}`,
            impressao: "Imagem sugestiva de epicondilite lateral.",
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "compartimento-medial",
      titulo: "COMPARTIMENTO MEDIAL (FLEXORES)",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalCotovelo("medial", lado, comDoppler),
          },
          {
            id: "epicondilite-medial",
            label: "Epicondilite medial (golfer's elbow)",
            texto: `Origem comum dos flexores-pronadores no epicôndilo medial com espessamento e hipoecogenicidade, aspectos sugestivos de epicondilite medial.${h}`,
            impressao: "Imagem sugestiva de epicondilite medial.",
          },
          {
            id: "lesao-lcu",
            label: "Lesão do LCU",
            texto:
              "Ligamento colateral ulnar (feixe anterior) com ____ (estiramento / ruptura parcial / ruptura total), medindo ____ cm.",
            impressao:
              "Imagem sugestiva de lesão do ligamento colateral ulnar.",
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "compartimento-posterior",
      titulo: "COMPARTIMENTO POSTERIOR",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalCotovelo("posterior", lado, comDoppler),
          },
          {
            id: "bursite-olecraniana",
            label: "Bursite olecraniana",
            texto: `Bursa olecraniana distendida por líquido, medindo ____ cm, aspectos sugestivos de bursite olecraniana.${h}`,
            impressao: "Imagem sugestiva de bursite olecraniana.",
          },
          {
            id: "neuropatia-ulnar",
            label: "Neuropatia / subluxação do nervo ulnar",
            texto:
              "Nervo ulnar no túnel cubital com ____ (aumento de calibre / neurite / subluxação ou luxação dinâmica à flexão). Área transversal ____ mm².",
            impressao:
              "Imagem sugestiva de neuropatia/instabilidade do nervo ulnar.",
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "catalogo-cotovelo",
      titulo: "Outras patologias (catálogo)",
      tipo: "multiplo",
      opcoes: mapOps(mergePatologiasMsk([], "cotovelo"), comDoppler),
    },
  ];
}

export function ajustarExameCotovelo(
  exame: Exame,
  comDoppler: boolean,
  lado: LadoMsk | null = null,
): Exame {
  if (exame.id !== "cotovelo") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: comDoppler
      ? "Exame ultrassonográfico bilateral de alta resolução com estudo Doppler colorido e manobras dinâmicas."
      : "Exame ultrassonográfico de alta resolução com manobras dinâmicas.",
    tituloDocumento: tituloComDoppler(
      exame.tituloDocumento || "ULTRASSONOGRAFIA DO COTOVELO",
      comDoppler,
    ),
    secoes: secoesCotovelo(comDoppler, ladoEfetivo),
    impressaoPadrao: impressaoCotoveloNormal(comDoppler, ladoEfetivo),
  };
}

/* ——— PUNHO ——— */

export function impressaoPunhoNormal(
  comDoppler: boolean,
  lado: LadoMsk,
): string {
  const ladoTxt = lado === "esquerdo" ? "esquerdo" : "direito";
  const base = `Exame ultrassonográfico do punho ${ladoTxt} dentro dos limites da normalidade anatômica, sem sinais de tenossinovite ou síndrome do túnel do carpo.`;
  if (!comDoppler) return base;
  return `${base} Ausência de atividade inflamatória ao Doppler.`;
}

function textoNormalPunhoRegiao(
  regiao:
    | "extensores"
    | "flexores"
    | "tunel"
    | "guyon"
    | "articulacoes"
    | "doppler",
  lado: LadoMsk,
): string {
  if (lado === "esquerdo") {
    const map = {
      extensores:
        "Todos os tendões extensores exibem padrão fibrilar linear homogêneo, sem sinais de descontinuidades, tenossinovite estenosante (como em De Quervain) ou coleções líquidas nas bainhas.",
      flexores:
        "Tendões flexores dos dedos sem alterações morfológicas relevantes no campo do exame.",
      tunel:
        "Nervo mediano com dimensões transversas preservadas e arquitetura fascicular distinta. Flexores dos dedos sem alterações.",
      guyon: "Nervo e artéria ulnares sem compressões extrínsecas.",
      articulacoes:
        "Espaços articulares radiocárpico e médio-cárpico conservados, sem sinovite.",
      doppler: "Padrão vascular basal normal.",
    } as const;
    return map[regiao];
  }
  const map = {
    extensores:
      "Tendões extensores com curso, espessura e ecotextura preservados no interior dos respectivos túneis osteofibrosos. Ausência de tenossinovite ou líquido peritendíneo expressivo.",
    flexores:
      "Íntegros e sem alterações morfológicas.",
    tunel:
      "Nervo mediano com área transversal e ecogenicidade normais, sem abaulamento do retináculo dos flexores. Tendões flexores superficiais e profundos dos dedos com padrão fibrilar preservado e sem sinovite significativa.",
    guyon: "Feixe vasculo-nervoso ulnar sem anormalidades aparentes.",
    articulacoes:
      "Superfícies corticais dos ossos do carpo regulares, sem derrame articular radiocárpico ou intercárpico relevante.",
    doppler: "Ausência de hiperemia patológica.",
  } as const;
  return map[regiao];
}

export function secoesPunho(
  comDoppler = false,
  lado: LadoMsk = "direito",
): Secao[] {
  const h = hiperemia(comDoppler);
  const tenossinoviteComp = (
    id: string,
    nro: string,
    tendões: string,
  ): Opcao => ({
    id,
    label: `Tenossinovite ${nro}º compartimento`,
    texto: `${nro}º compartimento extensor (${tendões}) com líquido peritendíneo e/ou espessamento da bainha tendínea, aspectos sugestivos de tenossinovite.${h}`,
    impressao: `Imagem sugestiva de tenossinovite do ${nro}º compartimento extensor.`,
  });

  const secoes: Secao[] = [
    {
      id: "compartimentos-extensores",
      titulo: "Compartimentos Extensores (I ao VI)",
      tipo: "multiplo",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalPunhoRegiao("extensores", lado),
          },
          {
            id: "de-quervain",
            label: "Tenossinovite de De Quervain (1º compartimento)",
            texto: `1º compartimento extensor (abdutor longo e extensor curto do polegar) com espessamento inflamatório da bainha e/ou dos tendões, aspectos sugestivos de tenossinovite de De Quervain.${h}`,
            impressao:
              "Imagem sugestiva de tenossinovite de De Quervain (1º compartimento).",
          },
          tenossinoviteComp(
            "tenossinovite-2",
            "2",
            "extensores radiais longo e curto do carpo — ECRL e ECRB",
          ),
          tenossinoviteComp(
            "tenossinovite-3",
            "3",
            "extensor longo do polegar — EPL",
          ),
          tenossinoviteComp(
            "tenossinovite-4",
            "4",
            "extensor comum dos dedos e extensor próprio do indicador — EDC e EIP",
          ),
          tenossinoviteComp(
            "tenossinovite-5",
            "5",
            "extensor próprio do mínimo — EDM",
          ),
          tenossinoviteComp(
            "tenossinovite-6",
            "6",
            "extensor ulnar do carpo — ECU",
          ),
        ],
        comDoppler,
      ),
    },
    {
      id: "flexores-punho",
      titulo:
        lado === "esquerdo"
          ? "Tendões Flexores"
          : "Tendão do Músculo Flexor Radial do Carpo e Flexor Ulnar do Carpo",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalPunhoRegiao("flexores", lado),
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "tunel-do-carpo",
      titulo: "Túnel do Carpo",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalPunhoRegiao("tunel", lado),
          },
          {
            id: "neuropatia-mediano",
            label: "Neuropatia do mediano (túnel do carpo)",
            texto:
              "Nervo mediano com aumento da área transversal de {{MEDIDA}} (normal < 12 mm²), com aplainamento e hipoecogenicidade, associado a abaulamento do retináculo dos flexores, aspectos sugestivos de neuropatia do nervo mediano / síndrome do túnel do carpo.",
            impressao:
              "Imagem sugestiva de neuropatia do nervo mediano (síndrome do túnel do carpo). Área transversal aumentada (normal < 12 mm²).",
          },
          {
            id: "tenossinovite-tunel-do-carpo",
            label: "Tenossinovite no túnel do carpo",
            texto: `Tendões flexores digitais superficiais e profundos aumentados de calibre na topografia do túnel do carpo, com halos anecóicos de edema sinovial difuso.${h}`,
            impressao:
              "Imagem sugestiva de tenossinovite nos tendões do túnel do carpo.",
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "canal-de-guyon",
      titulo: "Canal de Guyon",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: textoNormalPunhoRegiao("guyon", lado),
          },
        ],
        comDoppler,
      ),
    },
    {
      id: "articulacoes-punho",
      titulo: "Articulações do Carpo",
      tipo: "multiplo",
      padrao: "normal",
      opcoes: mapOps(
        mergePatologiasMsk(
          [
            {
              id: "normal",
              label: "Normal",
              texto: textoNormalPunhoRegiao("articulacoes", lado),
            },
            {
              id: "ganglio",
              label: "Cisto sinovial (gânglio)",
              texto:
                "Imagem cística bem delimitada, anecóide, no dorso/face volar do punho, medindo ____ cm, aspectos sugestivos de cisto sinovial (gânglio).",
              impressao: "Imagem sugestiva de cisto sinovial (gânglio).",
            },
          ],
          "punho",
        ).filter((o) => {
          // tenossinovites dos túneis/compartimentos e neuropatia já estão nas seções próprias
          const blob = `${o.id} ${o.label}`;
          if (
            /tenossinovite|neuropatia.?mediano|de.?quervain|t[uú]nel/i.test(
              blob,
            )
          ) {
            return false;
          }
          return true;
        }),
        comDoppler,
      ),
    },
  ];

  if (comDoppler) {
    secoes.push({
      id: "doppler-punho",
      titulo: "Estudo Doppler Colorido",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto: textoNormalPunhoRegiao("doppler", lado),
        },
        {
          id: "hiperemia",
          label: "Hiperfluxo / hiperemia",
          texto:
            "Aumento do sinal vascular local ao Doppler colorido, aspectos sugestivos de processo inflamatório ativo.",
          impressao:
            "Sinais sugestivos de hiperemia ao Doppler colorido no punho.",
        },
      ],
    });
  }

  return secoes;
}

export function ajustarExamePunho(
  exame: Exame,
  comDoppler: boolean,
  lado: LadoMsk | null = null,
): Exame {
  if (exame.id !== "punho") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: comDoppler
      ? "Exame ultrassonográfico com transdutor linear de alta frequência, estudo Doppler colorido e manobras dinâmicas."
      : "Exame ultrassonográfico com transdutor linear de alta frequência e manobras dinâmicas.",
    tituloDocumento: tituloComDoppler(
      exame.tituloDocumento || "ULTRASSONOGRAFIA DO PUNHO",
      comDoppler,
    ),
    secoes: secoesPunho(comDoppler, ladoEfetivo),
    impressaoPadrao: impressaoPunhoNormal(comDoppler, ladoEfetivo),
  };
}

/* ——— MÃO ——— */

export const QUIRODACTILOS = [
  { id: "dedo-1", nro: "1º", nome: "polegar" },
  { id: "dedo-2", nro: "2º", nome: "indicador" },
  { id: "dedo-3", nro: "3º", nome: "médio" },
  { id: "dedo-4", nro: "4º", nome: "anular" },
  { id: "dedo-5", nro: "5º", nome: "mínimo" },
] as const;

export type MaoDedoAchado = "gatilho" | "fluxo";

export function chaveMaoDedoAchado(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::mao-dedo`;
}

export function opcaoEhQuirodactilo(opcao: Opcao): boolean {
  return /^dedo-[1-5]$/.test(opcao.id);
}

export function textoAchadoQuirodactilo(
  nro: string,
  nome: string,
  achado: MaoDedoAchado | "",
  comDoppler: boolean,
): string {
  const rotulo = `${nro} quirodáctilo (${nome})`;
  if (achado === "fluxo" && comDoppler) {
    return `${rotulo}: aumento do fluxo vascular ao Doppler colorido nas polias tendíneas (A1), aspectos sugestivos de processo inflamatório local.`;
  }
  if (achado === "gatilho" || achado === "fluxo") {
    return `${rotulo}: tendão flexor com espessamento e/ou espessamento da polia A1, podendo associar ressalto dinâmico, aspectos sugestivos de tenossinovite estenosante (dedo em gatilho).`;
  }
  return `${rotulo}: selecionar o tipo de achado (dedo em gatilho${comDoppler ? " ou aumento de fluxo ao Doppler" : ""}).`;
}

export function impressaoAchadoQuirodactilo(
  nro: string,
  nome: string,
  achado: MaoDedoAchado | "",
): string {
  const rotulo = `${nro} quirodáctilo (${nome})`;
  if (achado === "fluxo") {
    return `Aumento de fluxo ao Doppler colorido nas polias do ${rotulo}.`;
  }
  if (achado === "gatilho") {
    return `Imagem sugestiva de tenossinovite estenosante (dedo em gatilho) no ${rotulo}.`;
  }
  return "";
}

export function aplicarMaoDedoAchado(
  texto: string,
  nro: string,
  nome: string,
  achadoRaw: string,
  comDoppler: boolean,
): string {
  const achado =
    achadoRaw === "fluxo" || achadoRaw === "gatilho" ? achadoRaw : "";
  return texto
    .split("{{MAO_DEDO_ACHADO}}")
    .join(textoAchadoQuirodactilo(nro, nome, achado, comDoppler));
}

export function impressaoMaoNormal(
  comDoppler: boolean,
  lado: LadoMsk,
): string {
  const ladoTxt = lado === "esquerdo" ? "esquerda" : "direita";
  const base = `Exame ultrassonográfico da mão ${ladoTxt} dentro dos limites da normalidade anatômica.`;
  if (!comDoppler) return base;
  return `${base} Ausência de atividade inflamatória ao Doppler.`;
}

export function secoesMao(comDoppler = false): Secao[] {
  const baseNormal = `Tendões flexores e extensores dos dedos com curso, espessura e ecotextura preservados. Polias e placas plantares/volares sem alterações significativas.
Articulações metacarpofalângicas e interfalângicas sem derrame ou sinovite evidente.`;

  const dedos: Opcao[] = QUIRODACTILOS.map((d) => ({
    id: d.id,
    label: `${d.nro} quirodáctilo (${d.nome})`,
    texto: `{{MAO_DEDO_ACHADO}}`,
    impressao: `Achado no ${d.nro} quirodáctilo (${d.nome}).`,
  }));

  return [
    {
      id: "quirodactilos",
      titulo: "QUIRODÁCTILOS",
      tipo: "multiplo",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normais (nenhum selecionado)",
            texto: comDoppler
              ? `Quirodáctilos (1º ao 5º): tendões flexores e polias A1 sem alterações significativas. Sem aumento de fluxo ao Doppler colorido nas polias.\n${baseNormal}`
              : `Quirodáctilos (1º ao 5º): tendões flexores e polias A1 sem alterações significativas.\n${baseNormal}`,
          },
          ...dedos,
        ],
        comDoppler,
      ),
    },
    {
      id: "achados-mao",
      titulo: "ACHADOS ADICIONAIS",
      tipo: "multiplo",
      padrao: "sem-achados",
      opcoes: mapOps(
        mergePatologiasMsk(
          [
            {
              id: "sem-achados",
              label: "Sem achados adicionais",
              texto: "Sem outros achados adicionais relevantes na mão.",
            },
            {
              id: "dedo-em-martelo",
              label: "Dedo em martelo (mallet finger)",
              texto:
                "Tendão extensor na base da falange distal do dedo ____ com ____ (descontinuidade / avulsão óssea), aspectos sugestivos de dedo em martelo.",
              impressao: "Imagem sugestiva de dedo em martelo (mallet finger).",
            },
            {
              id: "ganglio-mao",
              label: "Cisto sinovial (gânglio)",
              texto:
                "Imagem cística bem delimitada na mão/dedo, medindo ____ cm, aspectos sugestivos de cisto sinovial (gânglio).",
              impressao: "Imagem sugestiva de cisto sinovial (gânglio).",
            },
          ],
          "mao",
        ),
        comDoppler,
      ),
    },
  ];
}

export function ajustarExameMao(
  exame: Exame,
  comDoppler: boolean,
  lado: LadoMsk | null = null,
): Exame {
  if (exame.id !== "mao") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: comDoppler
      ? "Exame ultrassonográfico com transdutor linear de alta frequência, estudo Doppler colorido e manobras dinâmicas."
      : "Exame ultrassonográfico com transdutor linear de alta frequência e manobras dinâmicas.",
    tituloDocumento: tituloComDoppler(
      exame.tituloDocumento || "ULTRASSONOGRAFIA DA MÃO",
      comDoppler,
    ),
    secoes: secoesMao(comDoppler),
    impressaoPadrao: impressaoMaoNormal(comDoppler, ladoEfetivo),
  };
}

/* ——— QUADRIL ——— */

export function impressaoQuadrilNormal(
  comDoppler: boolean,
  lado: LadoMsk,
): string {
  const ladoTxt = lado === "esquerdo" ? "esquerdo" : "direito";
  return `Exame ultrassonográfico do quadril ${ladoTxt} dentro dos limites da normalidade anatômica, sem derrame articular ou tendinopatias trocantéricas.`;
}

function textoNormalQuadril(lado: LadoMsk, comDoppler: boolean): string {
  if (lado === "esquerdo") {
    const base = `Região Anterior (Articulação Coxofemoral e Recesso Anterior): Cápsula articular com espessura preservada, sem evidências de líquido intra-articular livre patológico.
Tendão do Músculo Iliopsoas: Padrão fibrilar homogêneo, sem alterações inflamatórias.
Região Lateral (Complexo Trocantérico): Inserções tendíneas dos glúteos médio e mínimo preservadas. Bursa trocantérica colapsada, sem sinais de bursite.`;
    return comDoppler
      ? `${base}\nEstudo Doppler Colorido: Sem aumento do fluxo vascular local.`
      : base;
  }
  const base = `Região Anterior (Articulação Coxofemoral e Recesso Anterior): Superfície cortical da cabeça e colo do fêmur contínua e regular. Ausência de derrame articular no recesso anterior (distensão capsular inferior a 7 mm).
Tendão do Músculo Iliopsoas: Espessura e ecotextura normais, sem bursite iliopsoas adjacente.
Região Lateral (Complexo Trocantérico): Tendões dos músculos glúteo médio e glúteo mínimo com inserção no trocânter maior íntegra, sem áreas focais de rotura ou tendinopatia. Bursa trocantérica sem distensão líquida.`;
  return comDoppler
    ? `${base}\nEstudo Doppler Colorido: Ausência de hiperemia sinovial ou peritrocantérica.`
    : base;
}

export function secoesQuadril(
  comDoppler = false,
  lado: LadoMsk = "direito",
): Secao[] {
  const h = hiperemia(comDoppler);
  return [
    {
      id: "achados-quadril",
      titulo: "ACHADOS",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        mergePatologiasMsk(
          [
            {
              id: "normal",
              label: "Normal",
              texto: textoNormalQuadril(lado, comDoppler),
            },
            {
              id: "bursite-trocaterica",
              label: "Bursite trocantérica",
              texto: `Bursa trocantérica distendida por líquido, medindo ____ cm, aspectos sugestivos de bursite trocantérica.${h}`,
              impressao: "Imagem sugestiva de bursite trocantérica.",
            },
            {
              id: "tendinopatia-gluteos",
              label: "Tendinopatia dos glúteos (médio/mínimo)",
              texto: `Tendão do glúteo ____ (médio/mínimo) com espessamento, hipoecogenicidade e/ou micro-rupturas na inserção no trocânter maior.${h}`,
              impressao: "Imagem sugestiva de tendinopatia dos glúteos.",
            },
            {
              id: "derrame-coxofemoral",
              label: "Derrame articular / sinovite coxofemoral",
              texto: `Recesso anterior da coxofemoral com distensão capsular ____ mm e líquido intra-articular, aspectos sugestivos de derrame/sinovite.${h}`,
              impressao:
                "Imagem sugestiva de derrame articular/sinovite da coxofemoral.",
            },
            {
              id: "tendinopatia-iliopsoas",
              label: "Tendinopatia / bursite do iliopsoas",
              texto: `Tendão do iliopsoas com alteração da ecotextura e/ou bursite adjacente.${h}`,
              impressao:
                "Imagem sugestiva de tendinopatia/bursite do iliopsoas.",
            },
          ],
          "quadril",
        ),
        comDoppler,
      ),
    },
  ];
}

export function ajustarExameQuadril(
  exame: Exame,
  comDoppler: boolean,
  lado: LadoMsk | null = null,
): Exame {
  if (exame.id !== "quadril") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: comDoppler
      ? "Exame ultrassonográfico com transdutores linear e convexo, associado a estudo Doppler colorido."
      : "Exame ultrassonográfico com transdutores linear e convexo.",
    tituloDocumento: tituloComDoppler(
      exame.tituloDocumento || "ULTRASSONOGRAFIA DO QUADRIL",
      comDoppler,
    ),
    secoes: secoesQuadril(comDoppler, ladoEfetivo),
    impressaoPadrao: impressaoQuadrilNormal(comDoppler, ladoEfetivo),
  };
}

/* ——— TORNOZELO ——— */

export function impressaoTornozeloNormal(
  comDoppler: boolean,
  lado: LadoMsk,
): string {
  const ladoTxt = lado === "esquerdo" ? "esquerdo" : "direito";
  return `Exame ultrassonográfico do tornozelo ${ladoTxt} dentro dos limites da normalidade anatômica, sem lesões tendíneas, ligamentares ou derrame articular.`;
}

function textoNormalTornozelo(lado: LadoMsk, comDoppler: boolean): string {
  if (lado === "esquerdo") {
    const base = `Compartimento Anterior: Tendões extensores íntegros e sem sinais de tenossinovite. Recesso articular anterior limpo.
Compartimento Medial: Tendões tibiais e flexores sem alterações morfológicas. Ligamento deltoide preservado.
Compartimento Lateral: Ligamentos colaterais laterais e tendões fibulares sem rupturas ou instabilidades dinâmicas.
Compartimento Posterior: Tendão do Calcâneo (Aquiles) com arquitetura fibrilar linear preservada e inserção distal íntegra. Bursa retrocalcaneana colapsada.`;
    return comDoppler
      ? `${base}\nEstudo Doppler Colorido: Sem atividade inflamatória vascular ao Doppler.`
      : base;
  }
  const base = `Compartimento Anterior: Tendões extensores (tibial anterior, extensor longo dos dedos e hálux) com ecotextura fibrilar homogênea e bainhas livres. Ausência de derrame articular tibiotársico significativo.
Compartimento Medial: Tendão tibial posterior, flexor longo dos dedos e flexor longo do hálux com contornos regulares e integridade mantida. Complexo ligamentar deltoide íntegro.
Compartimento Lateral: Complexo ligamentar colateral lateral (ligamentos talofibular anterior, talofibular posterior e calcaneofibular) contínuo e sem lesões fibrilares. Tendões dos músculos fibulares longo e curto com posicionamento anatômico normal nos retináculos.
Compartimento Posterior: Tendão do Calcâneo (Aquiles) com espessura e padrão fibrilar normais em toda a sua extensão, sem entesófitos ou sinais de tendinopatia. Bursa retrocalcaneana sem distensão líquida.`;
  return comDoppler
    ? `${base}\nEstudo Doppler Colorido: Padrão vascular fisiológico, sem hiperfluxo.`
    : base;
}

export function secoesTornozelo(
  comDoppler = false,
  lado: LadoMsk = "direito",
): Secao[] {
  const h = hiperemia(comDoppler);
  return [
    {
      id: "achados-tornozelo",
      titulo: "ACHADOS",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        mergePatologiasMsk(
          [
            {
              id: "normal",
              label: "Normal",
              texto: textoNormalTornozelo(lado, comDoppler),
            },
            {
              id: "tendinopatia-aquiles",
              label: "Tendinopatia / ruptura do Aquiles",
              texto: `Tendão do calcâneo (Aquiles) com ____ (espessamento/hipoecogenicidade / ruptura parcial / ruptura total), medindo ____ cm${comDoppler ? "; pode associar hiperemia ao Doppler" : ""}. Bursa retrocalcaneana ____ (sem / com) distensão.`,
              impressao:
                "Imagem sugestiva de tendinopatia/ruptura do tendão do calcâneo (Aquiles).",
            },
            {
              id: "lesao-ligamentar-lateral",
              label: "Lesão ligamentar lateral",
              texto:
                "Complexo colateral lateral com ____ (estiramento / ruptura parcial / ruptura total) do ligamento ____ (talofibular anterior / calcaneofibular / talofibular posterior).",
              impressao:
                "Imagem sugestiva de lesão do complexo ligamentar lateral do tornozelo.",
            },
            {
              id: "lesao-deltoide",
              label: "Lesão do ligamento deltoide",
              texto:
                "Ligamento deltoide com ____ (estiramento / ruptura parcial / ruptura total), medindo ____ cm.",
              impressao: "Imagem sugestiva de lesão do ligamento deltoide.",
            },
            {
              id: "tenossinovite-tibial-fibulares",
              label: "Tenossinovite tibial posterior / fibulares",
              texto: `Tendão ____ (tibial posterior / fibulares) com líquido na bainha e/ou espessamento inflamatório.${h}`,
              impressao:
                "Imagem sugestiva de tenossinovite dos tendões tibial posterior/fibulares.",
            },
          ],
          "tornozelo",
        ),
        comDoppler,
      ),
    },
  ];
}

export function ajustarExameTornozelo(
  exame: Exame,
  comDoppler: boolean,
  lado: LadoMsk | null = null,
): Exame {
  if (exame.id !== "tornozelo") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: comDoppler
      ? "Exame ultrassonográfico de alta resolução com estudo Doppler colorido e manobras dinâmicas."
      : "Exame ultrassonográfico de alta resolução com manobras dinâmicas.",
    tituloDocumento: tituloComDoppler(
      exame.tituloDocumento || "ULTRASSONOGRAFIA DO TORNOZELO",
      comDoppler,
    ),
    secoes: secoesTornozelo(comDoppler, ladoEfetivo),
    impressaoPadrao: impressaoTornozeloNormal(comDoppler, ladoEfetivo),
  };
}

/* ——— PÉ ——— */

export function impressaoPeNormal(
  comDoppler: boolean,
  lado: LadoMsk,
): string {
  const ladoTxt = lado === "esquerdo" ? "esquerdo" : "direito";
  return `Exame ultrassonográfico do pé ${ladoTxt} dentro dos limites da normalidade anatômica, sem sinais de fascite plantar ou alterações inflamatórias focais.`;
}

function textoNormalPe(lado: LadoMsk, comDoppler: boolean): string {
  if (lado === "esquerdo") {
    const base = `Fáscia Plantar: Aponeurose plantar com espessura preservada e contornos regulares na tuberosidade do calcâneo, sem sinais de fascite plantar aguda ou crônica.
Antepé e Articulações Metatarsofalângicas: Estruturas ligamentares e tendíneas conservadas. Sem evidências de coleções, erosões ósseas marginais ou neuroma de Morton.`;
    return comDoppler
      ? `${base}\nEstudo Doppler Colorido: Padrão vascular basal normal.`
      : base;
  }
  const base = `Fáscia Plantar: Espessura da aponeurose plantar medida na inserção calcaneana dentro dos limites da normalidade (espessura habitual e ecogenicidade homogênea), sem áreas focais de rotura ou entesofitose espessada.
Antepé e Articulações Metatarsofalângicas: Placas plantares e tendões flexores/extensores dos dedos íntegros. Ausência de sinovite intermetatarsal ou imagens sugestivas de neuroma de Morton nos espaços interdigitais avaliados.`;
  return comDoppler
    ? `${base}\nEstudo Doppler Colorido: Ausência de hiperemia patológica plantar ou interdigital.`
    : base;
}

export function secoesPe(
  comDoppler = false,
  lado: LadoMsk = "direito",
): Secao[] {
  const h = hiperemia(comDoppler);
  return [
    {
      id: "achados-pe",
      titulo: "ACHADOS",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        mergePatologiasMsk(
          [
            {
              id: "normal",
              label: "Normal",
              texto: textoNormalPe(lado, comDoppler),
            },
            {
              id: "fascite-plantar",
              label: "Fascite plantar",
              texto: `Aponeurose plantar na inserção calcaneana com espessamento (____ mm) e hipoecogenicidade${comDoppler ? ", podendo associar hiperemia ao Doppler" : ""}, aspectos sugestivos de fascite plantar. ____ (com / sem) esporão de tração.`,
              impressao: "Imagem sugestiva de fascite plantar.",
            },
            {
              id: "neuroma-morton",
              label: "Neuroma de Morton",
              texto:
                "Espessamento perineural no ____º espaço interdigital (mais comum 3º–4º), medindo ____ cm, aspectos sugestivos de neuroma de Morton.",
              impressao: "Imagem sugestiva de neuroma de Morton.",
            },
            {
              id: "bursite-intermetatarsal",
              label: "Bursite intermetatarsal / metatarsalgia",
              texto: `Bursa intermetatarsal no ____º espaço distendida por líquido, medindo ____ cm, aspectos sugestivos de bursite intermetatarsal / metatarsalgia.${h}`,
              impressao:
                "Imagem sugestiva de bursite intermetatarsal / metatarsalgia.",
            },
          ],
          "pe",
        ),
        comDoppler,
      ),
    },
  ];
}

export function ajustarExamePe(
  exame: Exame,
  comDoppler: boolean,
  lado: LadoMsk | null = null,
): Exame {
  if (exame.id !== "pe") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  return {
    ...exame,
    tecnica: comDoppler
      ? "Exame ultrassonográfico de alta resolução com estudo Doppler colorido."
      : "Exame ultrassonográfico de alta resolução.",
    tituloDocumento: tituloComDoppler(
      exame.tituloDocumento || "ULTRASSONOGRAFIA DO PÉ",
      comDoppler,
    ),
    secoes: secoesPe(comDoppler, ladoEfetivo),
    impressaoPadrao: impressaoPeNormal(comDoppler, ladoEfetivo),
  };
}

/* ——— MÚSCULO ——— */

export function impressaoMusculoNormal(comDoppler: boolean): string {
  const base =
    "Estudo ultrassonográfico do segmento muscular analisado {{MUSCULO}} dentro dos limites da normalidade anatômica, sem evidências de lesões miotendíneas agudas ou crônicas.";
  if (!comDoppler) return base;
  return `${base} Padrão vascular dentro dos limites da normalidade ao Doppler.`;
}

export function secoesMusculo(comDoppler = false): Secao[] {
  const h = hiperemia(comDoppler);
  const base = `O grupo muscular avaliado ({{MUSCULO}}) apresenta arquitetura fascicular preservada, com planos intermusculares bem definidos e ecotextura habitual.
Ausência de áreas focais de descontinuidade fibrilar, coleções líquidas hematomatosas intra ou intermiofasciais, ou imagens compatíveis com roturas musculares parciais ou totais.
Tecido subcutâneo adjacente sem alterações inflamatórias ou corpos estranhos radiotransparentes evidentes.`;
  return [
    {
      id: "achados-musculo",
      titulo: "ACHADOS",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps(
        [
          {
            id: "normal",
            label: "Normal",
            texto: comDoppler
              ? `${base}\nEstudo Doppler Colorido: Padrão vascular dentro dos limites da normalidade, sem áreas de hiperemia reativa ou neovascularização patológica no leito muscular examinado.`
              : base,
          },
          {
            id: "estiramento-muscular",
            label: "Estiramento muscular",
            texto: `Grupo muscular {{MUSCULO}} com alteração da ecotextura fibrilar (hipoecogenicidade focal/difusa) sem descontinuidade franca das fibras, aspectos sugestivos de estiramento muscular.${h}`,
            impressao:
              "Imagem sugestiva de estiramento muscular em {{MUSCULO}}.",
          },
          {
            id: "liquido-fascia",
            label: "Líquido entre fáscia muscular",
            texto:
              "Presença de líquido anecóide/hipoecogênico entre os planos fasciais / intermusculares adjacentes a {{MUSCULO}}, sem evidência de descontinuidade fibrilar franca no campo examinado.",
            impressao:
              "Imagem sugestiva de líquido entre fáscia muscular em {{MUSCULO}}.",
          },
          {
            id: "rotura-parcial",
            label: "Rotura muscular parcial",
            texto:
              "Grupo muscular {{MUSCULO}} com descontinuidade fibrilar parcial, podendo associar coleção hematomatosa local.",
            impressao:
              "Imagem sugestiva de rotura muscular parcial em {{MUSCULO}}.",
          },
          {
            id: "rotura-total",
            label: "Rotura muscular total",
            texto:
              "Grupo muscular {{MUSCULO}} com descontinuidade fibrilar total e retração dos cotos, aspectos sugestivos de rotura muscular total.",
            impressao:
              "Imagem sugestiva de rotura muscular total em {{MUSCULO}}.",
          },
          {
            id: "hematoma",
            label: "Hematoma muscular",
            texto:
              "Coleção líquida/hematomatosa intra/intermiofascial em {{MUSCULO}}.",
            impressao: "Imagem sugestiva de hematoma muscular em {{MUSCULO}}.",
          },
        ],
        comDoppler,
      ),
    },
  ];
}

export function ajustarExameMusculo(
  exame: Exame,
  comDoppler: boolean,
): Exame {
  if (exame.id !== "musculo") return exame;
  return {
    ...exame,
    tecnica: comDoppler
      ? "Exame ultrassonográfico direcionado de partes moles e tecido muscular com transdutor linear/convexo de alta frequência e estudo Doppler colorido."
      : "Exame ultrassonográfico direcionado de partes moles e tecido muscular com transdutor linear/convexo de alta frequência.",
    tituloDocumento: tituloComDoppler(
      exame.tituloDocumento || "ULTRASSONOGRAFIA MUSCULAR",
      comDoppler,
    ),
    secoes: secoesMusculo(comDoppler),
    impressaoPadrao: impressaoMusculoNormal(comDoppler),
  };
}

export function aplicarMusculoNoTexto(
  texto: string,
  musculoRaw: string,
): string {
  const m = musculoRaw.trim() || "[Indicar o músculo / região anatômica]";
  return texto.split("{{MUSCULO}}").join(m);
}

/** Chaves de volume Doppler dos exames MSK unificados */
export const MSK_DOPPLER_KEYS: Record<string, string> = {
  ombro: "ombro-doppler",
  cotovelo: "cotovelo-doppler",
  punho: "punho-doppler",
  mao: "mao-doppler",
  joelho: "joelho-doppler",
  quadril: "quadril-doppler",
  tornozelo: "tornozelo-doppler",
  pe: "pe-doppler",
  musculo: "musculo-doppler",
};
