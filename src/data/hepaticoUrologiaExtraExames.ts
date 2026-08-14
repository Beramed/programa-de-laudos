import type { Exame, Secao } from "@/data/exames";

/** Avaliação Multiparamétrica Hepática — Laudário. */
export function exameAvaliacaoMultiparametricaHepatica(): Exame {
  return {
    id: "avaliacao-multiparametrica-hepatica",
    nome: "Avaliação multiparamétrica hepática",
    tituloDocumento:
      "ELASTOGRAFIA HEPÁTICA COM AVALIAÇÃO MULTIPARAMÉTRICA DO FÍGADO",
    tecnica:
      "Exame realizado em aparelho dinâmico com transdutor convexo por via abdominal.",
    secoes: [
      {
        id: "abdome-superior",
        titulo: "ABDOME SUPERIOR (MODO B)",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "ULTRASSONOGRAFIA DE ABDOME SUPERIOR\nFígado com dimensões normais, contornos regulares e bordos delgados. A ecotextura do parênquima hepático encontra-se homogênea.\nVeia porta pérvia, de calibre e trajeto habituais.\nAusência de dilatação das vias biliares intra e extra-hepáticas.\nVesícula biliar normodistendida, com paredes finas e regulares e conteúdo anecoico. Não há imagens sugestivas de cálculos em seu interior.\nPâncreas com dimensões, forma, contornos e ecotextura normais.\nBaço com forma, contornos e dimensões habituais, com ecotextura homogênea.\nAusência de líquido livre.",
          },
          {
            id: "alterado",
            label: "Alterado",
            texto: "Abdome superior / fígado: ____.",
            impressao: "Alteração hepática / abdominal: ____.",
          },
        ],
      },
      {
        id: "doppler",
        titulo: "AVALIAÇÃO HEMODINÂMICA (DOPPLER)",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "AVALIAÇÃO HEMODINÂMICA (DOPPLER)\nVeia porta pérvia ao mapeamento Doppler colorido, apresentando fluxo hepatopetal em direção ao fígado, conforme esperado, com velocidade média e fasicidade respiratória dentro dos limites da normalidade.\nNão foram identificadas colaterais portossistêmicas ao mapeamento Doppler colorido.\nVeia esplênica pérvia ao mapeamento Doppler colorido, com fluxo hepatopetal preservado e calibre dentro dos limites esperados.\nArtéria esplênica pérvia, com padrão de fluxo anterógrado e de baixa resistência ao mapeamento Doppler espectral.\nVeia mesentérica superior pérvia ao mapeamento Doppler colorido, com fluxo hepatopetal preservado e calibre dentro dos limites esperados.\nVeias hepáticas com perviedade e padrão espectral trifásico preservados ao mapeamento Doppler colorido, com ondas S (sistólica anterógrada), D (diastólica anterógrada) e A (pré-sistólica reversa) identificáveis, conforme o padrão fisiológico esperado.",
          },
          {
            id: "alterado",
            label: "Alterado",
            texto: "Doppler hepático: ____.",
            impressao: "Alteração ao Doppler hepático.",
          },
        ],
      },
      {
        id: "gordurosa",
        titulo: "QUANTIFICAÇÃO DE ESTEATOSE",
        tipo: "unico",
        padrao: "incluir",
        opcoes: [
          {
            id: "incluir",
            label: "Incluir (Laudário)",
            texto:
              "AVALIAÇÃO PARA QUANTIFICAÇÃO DE ESTEATOSE HEPÁTICA\nAvaliação para quantificação de gordura hepática realizada com o equipamento ____, utilizando a tecnologia ____.\nForam realizadas ____ medidas válidas no lobo hepático direito, com paciente em decúbito dorsal horizontal, distando cerca de ____ cm da cápsula hepática.\nValor: ____ %.\nClassificação: ____.",
          },
          {
            id: "nao",
            label: "Não incluir",
            texto: "",
          },
        ],
      },
      {
        id: "elastografia",
        titulo: "ELASTOGRAFIA HEPÁTICA",
        tipo: "unico",
        padrao: "2d-swe",
        opcoes: [
          {
            id: "2d-swe",
            label: "2D-SWE (Laudário)",
            texto:
              "ELASTOGRAFIA HEPÁTICA\nEstudo de elastografia hepática realizado pela técnica de elastografia bidimensional de onda de cisalhamento (2D-SWE), no equipamento ____.\nForam obtidas 5 medições (padrão recomendado para 2D-SWE).\nValor mediano: ____ kPa (IQR/M ____ %).\nValores de rigidez hepática na DHCAc:\n< 5,0 kPa — Alta probabilidade de exame normal.\n> 5,0 a < 9,0 kPa — Na ausência de outros sinais clínicos, descarta DHCAc.\n9,0 a 13,0 kPa — Sugestivo de DHCAc.\n> 13,0 kPa — Compatível com DHCAc.\n> 17,0 kPa — Sugestivo de hipertensão portal clinicamente significativa.\nConsiderações técnicas: Os resultados podem ser influenciados por fatores confundidores, incluindo inflamação hepática, elevação significativa de aminotransferases, congestão hepática, colestase, estado pós-prandial e exercício físico recente.\nEste exame deve ser interpretado em conjunto com dados clínicos, laboratoriais e outros achados de imagem.",
          },
          {
            id: "nao",
            label: "Não incluir",
            texto: "",
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
            label: "Normal (Laudário)",
            texto: "",
            impressao:
              "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.\nEstudo com Doppler hepático dentro dos limites da normalidade, com padrão hemodinâmico e perviedade vascular preservados nos vasos avaliados.",
          },
          {
            id: "alterado",
            label: "Com alteração",
            texto: "",
            impressao: "____.",
          },
        ],
      },
    ],
    impressaoPadrao:
      "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.\nEstudo com Doppler hepático dentro dos limites da normalidade, com padrão hemodinâmico e perviedade vascular preservados nos vasos avaliados.",
  };
}

/** Doppler Hepático — Laudário. */
export function exameDopplerHepatico(): Exame {
  return {
    id: "doppler-hepatico",
    nome: "Doppler hepático",
    tituloDocumento: "DOPPLER HEPÁTICO",
    tecnica:
      "Exame realizado com transdutor convexo por via abdominal, com mapeamento Doppler colorido e espectral dos vasos hepáticos.",
    secoes: [
      {
        id: "veia-porta",
        titulo: "VEIA PORTA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Hepatopetal (Laudário)",
            texto:
              "Veia porta pérvia ao mapeamento Doppler colorido, apresentando fluxo hepatopetal em direção ao fígado, conforme esperado, com velocidade média e fasicidade respiratória dentro dos limites da normalidade.\nNão foram identificadas colaterais portossistêmicas ao mapeamento Doppler colorido.",
          },
          {
            id: "alterado",
            label: "Alterado",
            texto: "Veia porta: ____.",
            impressao: "Alteração da veia porta.",
          },
        ],
      },
      {
        id: "tributarias",
        titulo: "TRIBUTÁRIAS DA PORTA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais (Laudário)",
            texto:
              "Veia esplênica pérvia ao mapeamento Doppler colorido, com fluxo hepatopetal preservado e calibre dentro dos limites esperados.\nArtéria esplênica pérvia, com padrão de fluxo anterógrado e de baixa resistência ao mapeamento Doppler espectral.\nVeia mesentérica superior pérvia ao mapeamento Doppler colorido, com fluxo hepatopetal preservado e calibre dentro dos limites esperados.",
          },
          {
            id: "alterado",
            label: "Alteradas",
            texto: "Tributárias da porta: ____.",
          },
        ],
      },
      {
        id: "veias-hepaticas",
        titulo: "VEIAS HEPÁTICAS",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Trifásico (Laudário)",
            texto:
              "Veias hepáticas com perviedade e padrão espectral trifásico preservados ao mapeamento Doppler colorido, com ondas S (sistólica anterógrada), D (diastólica anterógrada) e A (pré-sistólica reversa) identificáveis, conforme o padrão fisiológico esperado.",
          },
          {
            id: "alterado",
            label: "Alteradas",
            texto: "Veias hepáticas: ____.",
            impressao: "Alteração das veias hepáticas.",
          },
        ],
      },
      {
        id: "vci",
        titulo: "VEIA CAVA INFERIOR",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "Veia cava inferior com calibre preservado, colapsabilidade respiratória mantida e fluxo fásico dentro dos limites esperados ao mapeamento Doppler.",
          },
          {
            id: "alterado",
            label: "Alterada",
            texto: "Veia cava inferior: ____.",
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
            label: "Normal (Laudário)",
            texto: "",
            impressao:
              "Estudo com Doppler hepático dentro dos limites da normalidade, com padrão hemodinâmico e perviedade vascular preservados nos vasos avaliados.",
          },
          {
            id: "alterado",
            label: "Com alteração",
            texto: "",
            impressao: "____.",
          },
        ],
      },
    ],
    impressaoPadrao:
      "Estudo com Doppler hepático dentro dos limites da normalidade, com padrão hemodinâmico e perviedade vascular preservados nos vasos avaliados.",
  };
}

/** Próstata Transretal — Laudário. */
export function exameProstataTransretal(): Exame {
  return {
    id: "prostata-transretal",
    nome: "Próstata transretal",
    tituloDocumento: "ULTRASSONOGRAFIA TRANSRETAL DA PRÓSTATA",
    tecnica:
      "Exame realizado em aparelho dinâmico com transdutor endocavitário por via transretal.",
    secoes: [
      {
        id: "dimensoes",
        titulo: "DIMENSÕES / VOLUME",
        tipo: "unico",
        padrao: "medir",
        opcoes: [
          {
            id: "medir",
            label: "Medidas",
            texto:
              "Próstata medindo ____ x ____ x ____ cm, com volume estimado de ____ cm³.",
          },
        ],
      },
      {
        id: "prostata",
        titulo: "PRÓSTATA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "A próstata apresenta contornos lisos e regulares, cápsula cirúrgica íntegra, limites bem definidos com a gordura periprostática, zona periférica com ecotextura homogênea e ecogenicidade preservada e glândula central sem lesões nodulares focais suspeitas ao modo B.",
          },
          {
            id: "alterado",
            label: "Com alteração / nódulo",
            texto: "Próstata: ____.",
            impressao: "Alteração prostática: ____.",
          },
        ],
      },
      {
        id: "vesiculas",
        titulo: "VESÍCULAS SEMINAIS",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais (Laudário)",
            texto:
              "As vesículas seminais apresentam topografia, morfologia, simetria e dimensões normais. A ecotextura interna e a espessura de suas paredes estão preservadas.",
          },
          {
            id: "alterado",
            label: "Alteradas",
            texto: "Vesículas seminais: ____.",
            impressao: "Alteração das vesículas seminais.",
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
            label: "Sem anormalidades (Laudário)",
            texto: "",
            impressao:
              "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.",
          },
          {
            id: "alterado",
            label: "Com alteração",
            texto: "",
            impressao: "____.",
          },
        ],
      },
    ],
    impressaoPadrao:
      "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.",
  };
}
