export type Opcao = {
  id: string;
  label: string;
  texto: string;
};

export type Secao = {
  id: string;
  titulo: string;
  tipo: "unico" | "multiplo";
  opcoes: Opcao[];
  padrao?: string | string[];
};

export type Exame = {
  id: string;
  nome: string;
  tecnica: string;
  secoes: Secao[];
  impressaoPadrao: string;
};

export const exames: Exame[] = [
  {
    id: "abdome-total",
    nome: "Abdome Total",
    tecnica:
      "Exame realizado com transdutor convexo multifrequencial na modalidade bidimensional, após preparo adequado.",
    secoes: [
      {
        id: "figado",
        titulo: "Fígado",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Fígado de dimensões normais, contornos regulares e ecotextura homogênea. Ausência de lesões focais.",
          },
          {
            id: "esteatose-leve",
            label: "Esteatose leve",
            texto:
              "Fígado de dimensões normais, contornos regulares, com aumento difuso e discreto da ecogenicidade parenquimatosa, sugestivo de esteatose hepática leve. Ausência de lesões focais.",
          },
          {
            id: "esteatose-moderada",
            label: "Esteatose moderada",
            texto:
              "Fígado de dimensões normais a discretamente aumentadas, contornos regulares, com aumento difuso e moderado da ecogenicidade parenquimatosa, atenuando parcialmente a visualização do diafragma e dos vasos hepáticos, sugestivo de esteatose hepática moderada. Ausência de lesões focais.",
          },
          {
            id: "esteatose-acentuada",
            label: "Esteatose acentuada",
            texto:
              "Fígado aumentado de volume, contornos regulares, com acentuado aumento difuso da ecogenicidade parenquimatosa, dificultando a visualização do diafragma e dos vasos hepáticos, sugestivo de esteatose hepática acentuada. Ausência de lesões focais identificáveis.",
          },
          {
            id: "cisto",
            label: "Cisto simples",
            texto:
              "Fígado de dimensões normais, contornos regulares e ecotextura homogênea. Identifica-se imagem cística anecoica, de paredes finas e reforço acústico posterior, sem septos ou vegetações, compatível com cisto hepático simples.",
          },
          {
            id: "hepatomegalia",
            label: "Hepatomegalia sem esteatose",
            texto:
              "Fígado aumentado de volume, contornos regulares e ecotextura homogênea. Ausência de lesões focais.",
          },
        ],
      },
      {
        id: "vias-biliares",
        titulo: "Vias biliares",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto: "Vias biliares intra e extra-hepáticas de calibre normal.",
          },
          {
            id: "dilatadas",
            label: "Dilatadas",
            texto:
              "Vias biliares intra e/ou extra-hepáticas dilatadas. Dilatação do ducto colédoco.",
          },
        ],
      },
      {
        id: "vesicula",
        titulo: "Vesícula biliar",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Vesícula biliar de paredes finas, sem cálculos ou lama biliar em seu interior.",
          },
          {
            id: "calculo",
            label: "Colelitíase",
            texto:
              "Vesícula biliar de paredes finas, contendo cálculo(s) com sombra acústica posterior.",
          },
          {
            id: "lama",
            label: "Lama biliar",
            texto:
              "Vesícula biliar de paredes finas, contendo lama biliar em seu interior.",
          },
          {
            id: "colecistite",
            label: "Sinais de colecistite",
            texto:
              "Vesícula biliar de paredes espessadas e edema mural, contendo cálculo(s), com sinal de Murphy ultrassonográfico positivo, aspectos sugestivos de colecistite aguda.",
          },
          {
            id: "polipo",
            label: "Pólipo",
            texto:
              "Vesícula biliar de paredes finas, evidenciando imagem parietal fixa, sem sombra acústica, compatível com pólipo.",
          },
        ],
      },
      {
        id: "pancreas",
        titulo: "Pâncreas",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Pâncreas de dimensões, contornos e ecotextura dentro da normalidade. Wirsung não dilatado.",
          },
          {
            id: "parcial",
            label: "Visualização parcial",
            texto:
              "Pâncreas parcialmente visualizado devido a interposição gasosa. Segmentos observados sem alterações significativas.",
          },
          {
            id: "nao-visto",
            label: "Não visualizado",
            texto:
              "Pâncreas não adequadamente caracterizado devido a interposição gasosa intestinal.",
          },
        ],
      },
      {
        id: "baco",
        titulo: "Baço",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Baço de dimensões normais, contornos regulares e ecotextura homogênea.",
          },
          {
            id: "esplenomegalia",
            label: "Esplenomegalia",
            texto:
              "Baço aumentado de volume, contornos regulares e ecotextura homogênea. Ausência de lesões focais.",
          },
        ],
      },
      {
        id: "rins",
        titulo: "Rins",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto:
              "Rins tópicos, de dimensões normais, com boa diferenciação corticomedular. Sistemas pielocalicinais sem dilatação. Ausência de cálculos ou lesões focais.",
          },
          {
            id: "cistos",
            label: "Cistos renais",
            texto:
              "Rins tópicos, de dimensões normais, com boa diferenciação corticomedular. Sistemas pielocalicinais sem dilatação. Identificam-se cisto(s) renal(is) simples (Bosniak I).",
          },
          {
            id: "litíase",
            label: "Litíase renal",
            texto:
              "Rins tópicos, de dimensões normais, com boa diferenciação corticomedular. Evidencia-se cálculo(s) renal(is) com sombra acústica posterior. Sistemas pielocalicinais sem dilatação significativa.",
          },
          {
            id: "hidronefrose",
            label: "Hidronefrose",
            texto:
              "Rins tópicos. Observa-se dilatação do sistema pielocalicinal, compatível com hidronefrose. Avaliar causa obstrutiva.",
          },
        ],
      },
      {
        id: "aorta-vci",
        titulo: "Aorta / VCI",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto:
              "Aorta abdominal e veia cava inferior de calibre e trajeto preservados no segmento avaliado.",
          },
          {
            id: "aneurisma",
            label: "Aneurisma de aorta",
            texto:
              "Aorta abdominal com dilatação aneurismática no segmento avaliado. Demais segmentos e VCI sem alterações significativas.",
          },
        ],
      },
      {
        id: "liquido",
        titulo: "Líquido livre",
        tipo: "unico",
        padrao: "ausente",
        opcoes: [
          {
            id: "ausente",
            label: "Ausente",
            texto: "Ausência de líquido livre na cavidade abdominal.",
          },
          {
            id: "presente",
            label: "Presente",
            texto: "Presença de líquido livre na cavidade abdominal.",
          },
        ],
      },
      {
        id: "bexiga",
        titulo: "Bexiga",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Bexiga de paredes finas e conteúdo anecóico homogêneo, sem imagens calculosas ou lesões vegetantes.",
          },
          {
            id: "paredes-espessadas",
            label: "Paredes espessadas",
            texto:
              "Bexiga com paredes espessadas, conteúdo anecóico. Sem imagens calculosas evidentes.",
          },
          {
            id: "nao-repleta",
            label: "Não repleta",
            texto:
              "Bexiga com repleção insuficiente para adequada avaliação.",
          },
        ],
      },
    ],
    impressaoPadrao: "Estudo ultrassonográfico dentro dos limites da normalidade.",
  },
  {
    id: "abdome-superior",
    nome: "Abdome Superior",
    tecnica:
      "Exame realizado com transdutor convexo multifrequencial na modalidade bidimensional, após preparo adequado.",
    secoes: [
      {
        id: "figado",
        titulo: "Fígado",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Fígado de dimensões normais, contornos regulares e ecotextura homogênea. Ausência de lesões focais.",
          },
          {
            id: "esteatose-leve",
            label: "Esteatose leve",
            texto:
              "Fígado de dimensões normais, contornos regulares, com aumento difuso e discreto da ecogenicidade parenquimatosa, sugestivo de esteatose hepática leve. Ausência de lesões focais.",
          },
          {
            id: "esteatose-moderada",
            label: "Esteatose moderada",
            texto:
              "Fígado de dimensões normais a discretamente aumentadas, contornos regulares, com aumento difuso e moderado da ecogenicidade parenquimatosa, sugestivo de esteatose hepática moderada. Ausência de lesões focais.",
          },
          {
            id: "cisto",
            label: "Cisto simples",
            texto:
              "Fígado de dimensões normais, contornos regulares e ecotextura homogênea. Identifica-se cisto hepático simples.",
          },
        ],
      },
      {
        id: "vias-biliares",
        titulo: "Vias biliares",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto: "Vias biliares intra e extra-hepáticas de calibre normal.",
          },
          {
            id: "dilatadas",
            label: "Dilatadas",
            texto: "Vias biliares dilatadas.",
          },
        ],
      },
      {
        id: "vesicula",
        titulo: "Vesícula biliar",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Vesícula biliar de paredes finas, sem cálculos ou lama biliar.",
          },
          {
            id: "calculo",
            label: "Colelitíase",
            texto:
              "Vesícula biliar de paredes finas, contendo cálculo(s) com sombra acústica posterior.",
          },
          {
            id: "lama",
            label: "Lama biliar",
            texto: "Vesícula biliar contendo lama biliar.",
          },
        ],
      },
      {
        id: "pancreas",
        titulo: "Pâncreas",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Pâncreas de dimensões, contornos e ecotextura dentro da normalidade.",
          },
          {
            id: "parcial",
            label: "Visualização parcial",
            texto: "Pâncreas parcialmente visualizado por interposição gasosa.",
          },
        ],
      },
      {
        id: "baco",
        titulo: "Baço",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Baço de dimensões normais, contornos regulares e ecotextura homogênea.",
          },
          {
            id: "esplenomegalia",
            label: "Esplenomegalia",
            texto: "Baço aumentado de volume, ecotextura homogênea.",
          },
        ],
      },
      {
        id: "rins",
        titulo: "Rins (polos superiores)",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto:
              "Polos superiores dos rins sem alterações significativas no campo do exame.",
          },
          {
            id: "cistos",
            label: "Cistos",
            texto: "Cisto(s) renal(is) simples visualizado(s) no campo do exame.",
          },
        ],
      },
    ],
    impressaoPadrao: "Estudo ultrassonográfico dentro dos limites da normalidade.",
  },
  {
    id: "tireoide",
    nome: "Tireoide",
    tecnica:
      "Realizado estudo com transdutor linear multifrequencial na modalidade bidimensional.",
    secoes: [
      {
        id: "glandula",
        titulo: "Glândula",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Tireoide tópica, móvel à deglutição, com dimensões normais, contornos regulares, ecotextura homogênea e ecogenicidade usual.",
          },
          {
            id: "aumentada-homogenea",
            label: "Aumentada homogênea",
            texto:
              "Tireoide tópica, móvel à deglutição, aumentada de volume, contornos regulares, ecotextura homogênea e ecogenicidade usual.",
          },
          {
            id: "tireoidite",
            label: "Padrão de tireoidite",
            texto:
              "Tireoide tópica, de dimensões normais a aumentadas, contornos regulares, com ecotextura heterogênea e redução difusa da ecogenicidade, aspecto sugestivo de tireoidite.",
          },
          {
            id: "bocio",
            label: "Bócio multinodular",
            texto:
              "Tireoide tópica, aumentada de volume, contornos lobulados, ecotextura heterogênea, com múltiplos nódulos de diferentes ecogenicidades.",
          },
        ],
      },
      {
        id: "nodulos",
        titulo: "Nódulos",
        tipo: "unico",
        padrao: "ausentes",
        opcoes: [
          {
            id: "ausentes",
            label: "Ausentes",
            texto: "Ausência de nodulações sólidas ou císticas.",
          },
          {
            id: "nodulo-benigno",
            label: "Nódulo de aspecto benigno",
            texto:
              "Identifica-se nódulo de contornos regulares, iso/hiperecogênico, sem microcalcificações, de aspecto ultrassonográfico sugestivo de benignidade (TI-RADS 2/3). Correlacionar clinicamente e com medidas.",
          },
          {
            id: "nodulo-suspeitos",
            label: "Nódulo suspeito",
            texto:
              "Identifica-se nódulo com características suspeitas (hipoecogenicidade acentuada e/ou contornos irregulares e/ou microcalcificações e/ou mais alto que largo). Sugere-se classificação TI-RADS e conduta conforme tamanho e critérios clínicos.",
          },
          {
            id: "cisto-coloide",
            label: "Cisto / coloide",
            texto:
              "Identifica-se imagem cística / nódulo predominantemente cístico com artefato em cauda de cometa, compatível com coloide (TI-RADS 1/2).",
          },
        ],
      },
      {
        id: "linfonodos",
        titulo: "Linfonodos cervicais",
        tipo: "unico",
        padrao: "normais",
        opcoes: [
          {
            id: "normais",
            label: "Sem adenomegalias",
            texto:
              "Não se evidenciam linfonodos cervicais com critérios morfológicos de suspeição.",
          },
          {
            id: "reativos",
            label: "Reativos",
            texto:
              "Linfonodos cervicais de aspecto reativo (forma ovalada, hilo preservado).",
          },
          {
            id: "suspeitos",
            label: "Suspeitos",
            texto:
              "Linfonodo(s) cervical(is) com morfologia suspeita (arredondado, perda do hilo e/ou microcalcificações). Correlacionar clinicamente.",
          },
        ],
      },
      {
        id: "volume",
        titulo: "Nota de volume",
        tipo: "unico",
        padrao: "nota",
        opcoes: [
          {
            id: "nota",
            label: "Incluir nota de volume",
            texto:
              "O volume normal da glândula tireoide é de aproximadamente 3 a 15 cm³ (variável conforme sexo e biotipo).",
          },
          {
            id: "omitir",
            label: "Omitir",
            texto: "",
          },
        ],
      },
    ],
    impressaoPadrao: "Estudo ultrassonográfico da tireoide dentro dos limites da normalidade.",
  },
  {
    id: "pelvica",
    nome: "Pélvica (via abdominal)",
    tecnica:
      "Exame realizado com transdutor convexo multifrequencial por via abdominal, com bexiga repleta.",
    secoes: [
      {
        id: "utero",
        titulo: "Útero",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Útero em anteversoflexão, de dimensões normais, contornos regulares e miométrio homogêneo. Endométrio de espessura e ecogenicidade compatíveis com a fase do ciclo.",
          },
          {
            id: "mioma",
            label: "Mioma(s)",
            texto:
              "Útero aumentado de volume / de dimensões alteradas, evidenciando nódulo(s) miometrial(is) compatível(is) com leiomioma(s).",
          },
          {
            id: "adenomiose",
            label: "Sugestivo de adenomiose",
            texto:
              "Útero de dimensões aumentadas, miométrio heterogêneo, com aspectos ultrassonográficos sugestivos de adenomiose. Correlacionar clinicamente.",
          },
          {
            id: "endometrio-espesso",
            label: "Endométrio espessado",
            texto:
              "Útero de dimensões normais, contornos regulares. Endométrio espessado para a fase do ciclo / status hormonal. Correlacionar clinicamente.",
          },
        ],
      },
      {
        id: "ovarios",
        titulo: "Ovários",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto:
              "Ovários tópicos, de dimensões e ecotextura dentro da normalidade, sem cistos ou massas anexiais.",
          },
          {
            id: "cisto-funcional",
            label: "Cisto funcional",
            texto:
              "Ovários tópicos. Identifica-se cisto ovariano de aspecto funcional / simples. Controle ultrassonográfico sugerido conforme conduta clínica.",
          },
          {
            id: "multifolicular",
            label: "Multifolicular / SOP",
            texto:
              "Ovários com múltiplos pequenos folículos periféricos, aspecto multifolicular. Correlacionar com critérios clínicos de SOP, se pertinente.",
          },
          {
            id: "nao-vistos",
            label: "Não visualizados",
            texto:
              "Ovários não adequadamente caracterizados neste exame (interposição intestinal / biotipo / esvaziamento vesical insuficiente).",
          },
        ],
      },
      {
        id: "anexos",
        titulo: "Fundos de saco / líquido",
        tipo: "unico",
        padrao: "ausente",
        opcoes: [
          {
            id: "ausente",
            label: "Sem líquido significativo",
            texto: "Ausência de líquido livre significativo em fundo de saco.",
          },
          {
            id: "discreto",
            label: "Líquido discreto",
            texto:
              "Pequena quantidade de líquido livre em fundo de saco, inespecífica.",
          },
          {
            id: "moderado",
            label: "Líquido moderado/acentuado",
            texto:
              "Presença de líquido livre em quantidade moderada/acentuada em fundo de saco. Correlacionar clinicamente.",
          },
        ],
      },
    ],
    impressaoPadrao: "Estudo ultrassonográfico pélvico dentro dos limites da normalidade.",
  },
  {
    id: "mamas",
    nome: "Mamas",
    tecnica:
      "Exame realizado com transdutor linear multifrequencial, avaliando ambas as mamas e regiões axilares.",
    secoes: [
      {
        id: "padrao",
        titulo: "Padrão parenquimatoso",
        tipo: "unico",
        padrao: "fibroglandular",
        opcoes: [
          {
            id: "fibroglandular",
            label: "Fibroglandular",
            texto:
              "Mamas de padrão fibroglandular, simétricas, sem nódulos ou áreas suspeitas no estudo atual.",
          },
          {
            id: "lipossubstituido",
            label: "Lipossubstituído",
            texto:
              "Mamas de padrão predominantemente lipossubstituído, sem nódulos ou áreas suspeitas no estudo atual.",
          },
          {
            id: "denso",
            label: "Denso / heterogêneo",
            texto:
              "Mamas de padrão densamente fibroglandular / heterogêneo, o que pode limitar a sensibilidade do método.",
          },
        ],
      },
      {
        id: "achados",
        titulo: "Achados",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Sem lesões",
            texto: "Não se identificam nódulos sólidos ou císticos suspeitos.",
          },
          {
            id: "cisto",
            label: "Cisto(s) simples",
            texto:
              "Identifica-se cisto(s) mamário(s) simples, de paredes finas e conteúdo anecóico (BI-RADS 2).",
          },
          {
            id: "fibroadenoma",
            label: "Nódulo sugestivo de fibroadenoma",
            texto:
              "Identifica-se nódulo ovalado, circunscrito, hipoecoico, de orientação paralela à pele, aspecto sugestivo de fibroadenoma (BI-RADS 3). Controle conforme protocolo.",
          },
          {
            id: "suspeitos",
            label: "Achado suspeito",
            texto:
              "Identifica-se lesão com características suspeitas. Classificação BI-RADS a ser definida conforme critérios completos; recomenda-se correlação clínica e eventual complementação.",
          },
        ],
      },
      {
        id: "axilas",
        titulo: "Axilas",
        tipo: "unico",
        padrao: "normais",
        opcoes: [
          {
            id: "normais",
            label: "Sem adenomegalias",
            texto: "Regiões axilares sem linfonodos com morfologia suspeita.",
          },
          {
            id: "reativos",
            label: "Linfonodos reativos",
            texto: "Linfonodos axilares de aspecto reativo.",
          },
          {
            id: "suspeitos",
            label: "Linfonodos suspeitos",
            texto:
              "Linfonodo(s) axilar(es) com morfologia suspeita. Correlacionar clinicamente.",
          },
        ],
      },
      {
        id: "birads",
        titulo: "BI-RADS",
        tipo: "unico",
        padrao: "1",
        opcoes: [
          {
            id: "1",
            label: "BI-RADS 1",
            texto: "Classificação: BI-RADS 1 (negativo).",
          },
          {
            id: "2",
            label: "BI-RADS 2",
            texto: "Classificação: BI-RADS 2 (achado benigno).",
          },
          {
            id: "3",
            label: "BI-RADS 3",
            texto:
              "Classificação: BI-RADS 3 (provavelmente benigno). Controle ultrassonográfico em intervalo curto recomendado.",
          },
          {
            id: "4",
            label: "BI-RADS 4",
            texto:
              "Classificação: BI-RADS 4 (suspeita). Recomenda-se correlação e eventual biópsia conforme protocolo.",
          },
          {
            id: "5",
            label: "BI-RADS 5",
            texto:
              "Classificação: BI-RADS 5 (altamente sugestivo de malignidade). Conduta conforme protocolo institucional.",
          },
        ],
      },
    ],
    impressaoPadrao: "Estudo ultrassonográfico mamário dentro dos limites da normalidade (BI-RADS 1).",
  },
  {
    id: "aparelho-urinario",
    nome: "Aparelho Urinário",
    tecnica:
      "Exame realizado com transdutor convexo multifrequencial na modalidade bidimensional.",
    secoes: [
      {
        id: "rins",
        titulo: "Rins",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto:
              "Rins tópicos, de dimensões normais, com boa diferenciação corticomedular. Sistemas pielocalicinais sem dilatação. Ausência de cálculos ou lesões focais.",
          },
          {
            id: "cistos",
            label: "Cistos",
            texto:
              "Rins tópicos, de dimensões normais. Identificam-se cisto(s) renal(is) simples (Bosniak I). Sistemas pielocalicinais sem dilatação.",
          },
          {
            id: "litíase",
            label: "Litíase",
            texto:
              "Rins tópicos. Evidencia-se cálculo(s) com sombra acústica posterior. Sistemas pielocalicinais sem dilatação significativa.",
          },
          {
            id: "hidronefrose",
            label: "Hidronefrose",
            texto:
              "Observa-se dilatação do sistema pielocalicinal, compatível com hidronefrose. Avaliar causa obstrutiva distal.",
          },
          {
            id: "nefropatia",
            label: "Nefropatia crônica",
            texto:
              "Rins de dimensões reduzidas, com redução da diferenciação corticomedular, aspectos sugestivos de nefropatia crônica.",
          },
        ],
      },
      {
        id: "ureteres",
        titulo: "Ureteres",
        tipo: "unico",
        padrao: "nao-dilatados",
        opcoes: [
          {
            id: "nao-dilatados",
            label: "Não dilatados",
            texto: "Ureteres não dilatados no segmento visualizado.",
          },
          {
            id: "dilatacao",
            label: "Dilatação ureteral",
            texto:
              "Dilatação ureteral identificada no segmento avaliado. Correlacionar com litíase / obstrução.",
          },
        ],
      },
      {
        id: "bexiga",
        titulo: "Bexiga",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Bexiga de paredes finas e conteúdo anecóico homogêneo, sem imagens calculosas ou lesões vegetantes.",
          },
          {
            id: "calculo",
            label: "Cálculo vesical",
            texto:
              "Bexiga contendo imagem calculosa móvel com sombra acústica posterior.",
          },
          {
            id: "paredes",
            label: "Paredes espessadas",
            texto: "Bexiga com paredes espessadas. Conteúdo anecóico.",
          },
          {
            id: "diverticulo",
            label: "Divertículo",
            texto: "Bexiga evidenciando divertículo(s).",
          },
        ],
      },
      {
        id: "prostata",
        titulo: "Próstata (se aplicável)",
        tipo: "unico",
        padrao: "omitir",
        opcoes: [
          {
            id: "omitir",
            label: "Omitir",
            texto: "",
          },
          {
            id: "normal",
            label: "Normal",
            texto:
              "Próstata de dimensões normais, contornos regulares e ecotextura homogênea à avaliação por via abdominal.",
          },
          {
            id: "aumentada",
            label: "Aumentada (HBP)",
            texto:
              "Próstata aumentada de volume, contornos regulares, aspecto compatível com hiperplasia prostática à avaliação por via abdominal. Volume a correlacionar clinicamente.",
          },
        ],
      },
    ],
    impressaoPadrao: "Estudo ultrassonográfico do aparelho urinário dentro dos limites da normalidade.",
  },
  {
    id: "obstetrico-1t",
    nome: "Obstétrico 1º Trimestre",
    tecnica:
      "Exame realizado com transdutor convexo / endocavitário multifrequencial na modalidade bidimensional.",
    secoes: [
      {
        id: "saco",
        titulo: "Saco gestacional",
        tipo: "unico",
        padrao: "topico",
        opcoes: [
          {
            id: "topico",
            label: "Tópico",
            texto:
              "Saco gestacional tópico, em topografia intracavitária, com vesícula vitelínica presente.",
          },
          {
            id: "sem-vv",
            label: "Sem vesícula vitelínica",
            texto:
              "Saco gestacional tópico. Vesícula vitelínica não caracterizada neste exame.",
          },
          {
            id: "vazio",
            label: "Saco anembriônico?",
            texto:
              "Saco gestacional tópico sem embrião identificável. Correlacionar com β-hCG e idade gestacional; considerar controle evolutivo.",
          },
        ],
      },
      {
        id: "embriao",
        titulo: "Embrião / BCF",
        tipo: "unico",
        padrao: "presente",
        opcoes: [
          {
            id: "presente",
            label: "Embrião com BCF",
            texto:
              "Embrião único, com batimentos cardíacos presentes. Comprimento cabeça-nádega (CCN) compatível com a idade gestacional estimada.",
          },
          {
            id: "sem-bcf",
            label: "Sem BCF",
            texto:
              "Embrião visualizado sem batimentos cardíacos detectáveis neste exame. Correlacionar clinicamente e com exames prévios.",
          },
          {
            id: "nao-visto",
            label: "Embrião não visto",
            texto: "Embrião não caracterizado neste momento.",
          },
        ],
      },
      {
        id: "anexos-obs",
        titulo: "Anexos / ovários",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto:
              "Ovários tópicos, sem massas anexiais. Pode-se observar corpo lúteo.",
          },
          {
            id: "corpo-luteo",
            label: "Corpo lúteo evidente",
            texto: "Corpo lúteo identificado em ovário. Sem outras massas anexiais.",
          },
        ],
      },
      {
        id: "liquido-obs",
        titulo: "Líquido livre",
        tipo: "unico",
        padrao: "ausente",
        opcoes: [
          {
            id: "ausente",
            label: "Ausente",
            texto: "Ausência de líquido livre significativo em fundo de saco.",
          },
          {
            id: "presente",
            label: "Presente",
            texto:
              "Presença de líquido livre em fundo de saco. Correlacionar clinicamente.",
          },
        ],
      },
    ],
    impressaoPadrao:
      "Gestação tópica, única, com embrião vivo. Idade gestacional a confirmar conforme CCN e DUM.",
  },
];

export function getExame(id: string): Exame | undefined {
  return exames.find((e) => e.id === id);
}
