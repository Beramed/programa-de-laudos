import type { Exame, Secao } from "@/data/exames";

function secaoAchadosAdicionais(texto = "Achados adicionais: ____."): Secao {
  return {
    id: "achados-adicionais",
    titulo: "ACHADOS ADICIONAIS",
    tipo: "unico",
    padrao: "sem",
    opcoes: [
      {
        id: "sem",
        label: "Sem achados adicionais",
        texto: "Sem achados adicionais relevantes no campo do exame.",
      },
      {
        id: "com",
        label: "Com achados",
        texto,
        impressao: texto,
      },
    ],
  };
}

/** Histerossonografia — Laudário. */
export function exameHisterossonografia(): Exame {
  return {
    id: "histerossonografia",
    nome: "Histerossonografia com infusão salina",
    tituloDocumento: "HISTEROSSONOGRAFIA COM INFUSÃO SALINA",
    tecnica:
      "Exame realizado por via endovaginal com transdutor de alta frequência, após cateterização do canal endocervical com sonda Foley nº 08 de silicone. Realizada infusão de solução salina, com avaliação da cavidade endometrial sob distensão em modo bidimensional.",
    secoes: [
      {
        id: "canal",
        titulo: "CANAL ENDOCERVICAL",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Pérvio sem intercorrências (Laudário)",
            texto:
              "Canal endocervical pérvio, com cateterização realizada sem intercorrências.",
          },
          {
            id: "alterado",
            label: "Com intercorrência",
            texto: "Canal endocervical / cateterização: ____.",
          },
        ],
      },
      {
        id: "cavidade",
        titulo: "CAVIDADE ENDOMETRIAL",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Sem lesões (Laudário)",
            texto:
              "Cavidade endometrial adequadamente distendida, com contornos regulares, sem defeitos de preenchimento nem lesões intracavitárias.",
          },
          {
            id: "lesao",
            label: "Com lesão / defeito",
            texto:
              "Cavidade endometrial: ____ (defeito de preenchimento / pólipo / mioma submucoso / ____), medindo ____ mm.",
            impressao: "Lesão intracavitária: ____.",
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
            label: "Cavidade preservada (Laudário)",
            texto: "",
            impressao:
              "Cavidade endometrial com morfologia preservada, sem evidência de lesões intracavitárias.",
          },
          {
            id: "alterado",
            label: "Com alteração",
            texto: "",
            impressao: "____.",
          },
        ],
      },
      secaoAchadosAdicionais(),
    ],
    impressaoPadrao:
      "Cavidade endometrial com morfologia preservada, sem evidência de lesões intracavitárias.",
  };
}

/** HyCoSy — Laudário. */
export function exameHycosy(): Exame {
  return {
    id: "hycosy",
    nome: "Histerossonossalpingografia (HyCoSy)",
    tituloDocumento: "HISTEROSSONOSSALPINGOGRAFIA COM CONTRASTE (HYCOSY)",
    tecnica:
      "Exame realizado por via endovaginal com sonda endocavitária, com uso de SonoVue (sulfeto de hexafluoreto) como agente de contraste ecogênico, após cateterização do canal endocervical com sonda Foley nº 08 de silicone. Condições técnicas adequadas, com boa cooperação da paciente durante o procedimento.\nContraste preparado com ____ mL de SonoVue reconstituído em ____ mL de solução fisiológica 0,9%, totalizando ____ mL.\nVolume total infundido com ____ mL e balão insuflado com ____ mL.",
    secoes: [
      {
        id: "canal",
        titulo: "CANAL ENDOCERVICAL",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Pérvio (Laudário)",
            texto:
              "Canal endocervical pérvio, com cateterização realizada sem intercorrências.",
          },
        ],
      },
      {
        id: "cavidade",
        titulo: "CAVIDADE UTERINA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Sem alterações (Laudário)",
            texto:
              "Cavidade endometrial sem alterações identificáveis ao modo B.",
          },
          {
            id: "alterado",
            label: "Alterado",
            texto: "Cavidade endometrial: ____.",
            impressao: "Alteração da cavidade endometrial na HyCoSy.",
          },
        ],
      },
      {
        id: "tuba-direita",
        titulo: "TUBA DIREITA",
        tipo: "unico",
        padrao: "permeavel",
        opcoes: [
          {
            id: "permeavel",
            label: "Permeável + Cotte+ (Laudário)",
            texto:
              "Progressão contínua do contraste pela tuba uterina direita, com fluxo homogêneo desde a região ostial até a extremidade fimbriada, com velocidade rápida e contínua, sem resistência à infusão, com adequada dispersão do contraste na cavidade peritoneal, e distribuição circular do contraste ao redor do ovário direito, com padrão uniforme e simétrico.\nSinal de Cotte: Positivo à direita.",
          },
          {
            id: "obstruida",
            label: "Não permeável",
            texto:
              "Tuba uterina direita sem evidência de permeabilidade adequada ao contraste: ____.\nSinal de Cotte: ____.",
            impressao: "Tuba direita não permeável à HyCoSy.",
          },
        ],
      },
      {
        id: "tuba-esquerda",
        titulo: "TUBA ESQUERDA",
        tipo: "unico",
        padrao: "permeavel",
        opcoes: [
          {
            id: "permeavel",
            label: "Permeável + Cotte+ (Laudário)",
            texto:
              "Progressão contínua do contraste pela tuba uterina esquerda, com fluxo homogêneo desde a região ostial até a extremidade fimbriada, com velocidade rápida e contínua, sem resistência à infusão, com adequada dispersão do contraste na cavidade peritoneal, e distribuição circular do contraste ao redor do ovário esquerdo, com padrão uniforme e simétrico.\nSinal de Cotte: Positivo à esquerda.",
          },
          {
            id: "obstruida",
            label: "Não permeável",
            texto:
              "Tuba uterina esquerda sem evidência de permeabilidade adequada ao contraste: ____.\nSinal de Cotte: ____.",
            impressao: "Tuba esquerda não permeável à HyCoSy.",
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
            label: "Perviedade bilateral (Laudário)",
            texto: "",
            impressao:
              "Perviedade tubária bilateral preservada, com adequada passagem e dispersão peritoneal do contraste.\nCavidade endometrial sem alterações significativas ao método.",
          },
          {
            id: "alterado",
            label: "Com alteração",
            texto: "",
            impressao: "____.",
          },
        ],
      },
      secaoAchadosAdicionais(),
    ],
    impressaoPadrao:
      "Perviedade tubária bilateral preservada, com adequada passagem e dispersão peritoneal do contraste.\nCavidade endometrial sem alterações significativas ao método.",
  };
}

/** Pélvico TV + HyCoSy — combina TV + bloco HyCoSy. */
export function examePelvicoTvHycosy(): Exame {
  return {
    id: "pelvico-tv-hycosy",
    nome: "Pélvico transvaginal + HyCoSy",
    tituloDocumento:
      "ULTRASSONOGRAFIA PÉLVICA TRANSVAGINAL + HISTEROSSONOSSALPINGOGRAFIA (HyCoSy)",
    tecnica:
      "Exame realizado em aparelho dinâmico com transdutor endocavitário por via transvaginal, complementado por HyCoSy com contraste ecogênico.",
    secoes: [
      {
        id: "utero",
        titulo: "ÚTERO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "Útero piriforme, em anteversoflexão, centrado, com contornos regulares, dimensões habituais. Miométrio homogêneo.\nColo uterino e canal endocervical de aspecto habitual.\nEndométrio regular e homogêneo.",
          },
          {
            id: "alterado",
            label: "Alterado",
            texto: "Útero: ____.",
            impressao: "Alteração uterina: ____.",
          },
        ],
      },
      {
        id: "ovarios",
        titulo: "OVÁRIOS",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais (Laudário)",
            texto:
              "Ovário direito tópico, de contornos regulares. O parênquima tem ecotextura habitual.\nOvário esquerdo tópico, de contornos regulares. O parênquima tem ecotextura habitual.",
          },
          {
            id: "alterado",
            label: "Alterados",
            texto: "Ovários: ____.",
            impressao: "Alteração ovariana: ____.",
          },
        ],
      },
      {
        id: "hycosy",
        titulo: "HyCoSy",
        tipo: "unico",
        padrao: "permeavel",
        opcoes: [
          {
            id: "permeavel",
            label: "Perviedade bilateral",
            texto:
              "HyCoSy: perviedade tubária bilateral preservada, com adequada passagem e dispersão peritoneal do contraste.",
          },
          {
            id: "alterado",
            label: "Com alteração tubária",
            texto: "HyCoSy: ____.",
            impressao: "Alteração na HyCoSy: ____.",
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
            label: "Normal + tubas permeáveis",
            texto: "",
            impressao:
              "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.\nPerviedade tubária bilateral preservada à HyCoSy.",
          },
          {
            id: "alterado",
            label: "Com alteração",
            texto: "",
            impressao: "____.",
          },
        ],
      },
      secaoAchadosAdicionais(),
    ],
    impressaoPadrao:
      "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.\nPerviedade tubária bilateral preservada à HyCoSy.",
  };
}

/** Pélvico TV com Doppler — Laudário. */
export function examePelvicoTvDoppler(): Exame {
  return {
    id: "pelvico-tv-doppler",
    nome: "Pélvico transvaginal com Doppler",
    tituloDocumento: "ULTRASSONOGRAFIA PÉLVICA TRANSVAGINAL COM DOPPLER",
    tecnica:
      "Exame realizado em aparelho dinâmico com transdutor endocavitário por via transvaginal.",
    secoes: [
      {
        id: "utero",
        titulo: "ÚTERO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "Útero piriforme, em anteversoflexão, centrado, com contornos regulares, dimensões habituais. Miométrio homogêneo.\nColo uterino e canal endocervical de aspecto habitual.\nEndométrio regular e homogêneo.",
          },
          {
            id: "alterado",
            label: "Alterado",
            texto: "Útero: ____.",
            impressao: "Alteração uterina: ____.",
          },
        ],
      },
      {
        id: "ovario-direito",
        titulo: "OVÁRIO DIREITO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "Ovário direito tópico, de contornos regulares. O parênquima tem ecotextura habitual.",
          },
          {
            id: "alterado",
            label: "Alterado",
            texto: "Ovário direito: ____.",
            impressao: "Alteração do ovário direito.",
          },
        ],
      },
      {
        id: "ovario-esquerdo",
        titulo: "OVÁRIO ESQUERDO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "Ovário esquerdo tópico, de contornos regulares. O parênquima tem ecotextura habitual.",
          },
          {
            id: "alterado",
            label: "Alterado",
            texto: "Ovário esquerdo: ____.",
            impressao: "Alteração do ovário esquerdo.",
          },
        ],
      },
      {
        id: "doppler",
        titulo: "DOPPLER",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Habitual (Laudário)",
            texto:
              "O estudo dopplervelocimétrico colorido da pelve encontra-se habitual para o período avaliado, sem alterações dignas de nota.",
          },
          {
            id: "alterado",
            label: "Alterado",
            texto: "Doppler pélvico: ____.",
            impressao: "Alteração ao Doppler pélvico.",
          },
        ],
      },
      {
        id: "liquido",
        titulo: "LÍQUIDO LIVRE",
        tipo: "unico",
        padrao: "ausente",
        opcoes: [
          {
            id: "ausente",
            label: "Ausente (Laudário)",
            texto: "Ausência de líquido livre na cavidade pélvica.",
          },
          {
            id: "presente",
            label: "Presente",
            texto: "Líquido livre na cavidade pélvica: ____.",
            impressao: "Líquido livre pélvico.",
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
      secaoAchadosAdicionais(),
    ],
    impressaoPadrao:
      "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.",
  };
}

/** Pesquisa de endometriose — Laudário. */
export function exameEndometriose(): Exame {
  return {
    id: "endometriose",
    nome: "Pesquisa de endometriose (TV)",
    tituloDocumento:
      "ULTRASSONOGRAFIA PÉLVICA TRANSVAGINAL PARA PESQUISA DE ENDOMETRIOSE",
    tecnica:
      "Exame realizado em aparelho dinâmico com transdutor endocavitário por via transvaginal.",
    secoes: [
      {
        id: "preparo",
        titulo: "QUALIDADE DO PREPARO",
        tipo: "unico",
        padrao: "adequado",
        opcoes: [
          {
            id: "adequado",
            label: "Adequado (Laudário)",
            texto:
              "QUALIDADE DO PREPARO:\nAdequado, permitindo avaliação satisfatória das estruturas pélvicas conforme protocolo.",
          },
          {
            id: "limitado",
            label: "Limitado",
            texto: "QUALIDADE DO PREPARO:\n____.",
          },
        ],
      },
      {
        id: "abdominal",
        titulo: "AVALIAÇÃO ABDOMINAL",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "Avaliação Abdominal Complementar:\nRins tópicos, com mobilidade habitual e sistema coletor preservado.\nGoteiras parietocólicas sem alterações ao método.\nParede abdominal sem alterações ao método.",
          },
        ],
      },
      {
        id: "anterior",
        titulo: "COMPARTIMENTO ANTERIOR",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Sem endometriose (Laudário)",
            texto:
              "Compartimento Anterior:\nBexiga urinária com boa repleção, paredes lisas e regulares, conteúdo anecoico. Sem sinais de endometriose.\nInterface entre a bexiga e a parede anterior uterina preservada, sem espessamentos ou imagens nodulares sugestivas de implantes endometrióticos.\nRecesso vésico-uterino livre. Avaliação dinâmica demonstrando o sinal do deslizamento positivo, com a parede posterior da bexiga deslizando livremente sobre a parede anterior do útero e o colo uterino.",
          },
          {
            id: "alterado",
            label: "Com sinais",
            texto: "Compartimento Anterior: ____.",
            impressao: "Sinais de endometriose no compartimento anterior.",
          },
        ],
      },
      {
        id: "central",
        titulo: "COMPARTIMENTO CENTRAL",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "Compartimento Central:\nÚtero piriforme, em anteversoflexão, centrado, com contornos regulares, dimensões habituais.\nMiométrio homogêneo.\nColo uterino e canal endocervical de aspecto habitual.\nEndométrio regular e homogêneo.\nOvário direito tópico, de contornos regulares. O parênquima tem ecotextura habitual.\nOvário esquerdo tópico, de contornos regulares. O parênquima tem ecotextura habitual.",
          },
          {
            id: "alterado",
            label: "Com alteração / endometrioma",
            texto: "Compartimento Central: ____.",
            impressao: "Alteração no compartimento central: ____.",
          },
        ],
      },
      {
        id: "posterior",
        titulo: "COMPARTIMENTO POSTERIOR",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Sem endometriose profunda (Laudário)",
            texto:
              "Compartimento Posterior:\nA inserção dos ligamentos uterossacros no tórus uterinus foi bem identificada, com espessura e ecogenicidade preservadas, sem nodulações, espessamentos focais ou lesões infiltrativas. A linha peritoneal retrocervical encontra-se íntegra.\nNão há sinais de focos de endometriose no septo retovaginal, apresentando-se com espessura e ecogenicidade preservadas.\nParedes vaginais com espessura e ecogenicidade normais. Fórnice vaginal posterior livre e com mobilidade preservada.\nFundo de saco posterior livre, sem evidência de lesões expansivas. A avaliação dinâmica demonstrou sinal do deslizamento positivo, indicando recesso não obliterado.\nSem alterações ecográficas evidentes. Não há espessamentos de alças nas fossas ilíacas.",
          },
          {
            id: "alterado",
            label: "Com sinais de endometriose profunda",
            texto: "Compartimento Posterior: ____.",
            impressao: "Sinais de endometriose profunda: ____.",
          },
        ],
      },
      {
        id: "dinamica",
        titulo: "AVALIAÇÃO DINÂMICA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal (Laudário)",
            texto:
              "Avaliação Dinâmica:\nAvaliação dinâmica pélvica dentro dos parâmetros da normalidade, com mobilidade dos ovários e do colo uterino preservada, ausência de dor provocada e sem processo aderencial identificado.",
          },
          {
            id: "alterado",
            label: "Alterada",
            texto: "Avaliação dinâmica: ____.",
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
            label: "Sem endometriose profunda (Laudário)",
            texto: "",
            impressao:
              "Ausência de evidências ultrassonográficas de endometriose profunda nos compartimentos pélvicos avaliados.",
          },
          {
            id: "alterado",
            label: "Com achados",
            texto: "",
            impressao: "____.",
          },
        ],
      },
      secaoAchadosAdicionais(),
    ],
    impressaoPadrao:
      "Ausência de evidências ultrassonográficas de endometriose profunda nos compartimentos pélvicos avaliados.",
  };
}

/** Monitorização folicular — Laudário. */
export function exameMonitoracaoFolicular(): Exame {
  return {
    id: "monitoracao-folicular",
    nome: "Monitorização folicular (TV)",
    tituloDocumento:
      "ULTRASSONOGRAFIA TRANSVAGINAL - MONITORIZAÇÃO FOLICULAR",
    tecnica:
      "Exame realizado em aparelho dinâmico com transdutor endocavitário por via transvaginal.",
    secoes: [
      {
        id: "ciclo",
        titulo: "MONITORIZAÇÃO FOLICULAR",
        tipo: "unico",
        padrao: "dia",
        opcoes: [
          {
            id: "dia",
            label: "Dia do ciclo / folículos",
            texto:
              "Monitorização folicular — dia ____ do ciclo.\nEndométrio: espessura ____ mm, padrão ____.\nOvário direito — folículo(s): ____ mm.\nOvário esquerdo — folículo(s): ____ mm.",
          },
        ],
      },
      {
        id: "endometrio",
        titulo: "ENDOMÉTRIO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Regular e homogêneo (Laudário)",
            texto: "Endométrio regular e homogêneo.",
          },
          {
            id: "medir",
            label: "Com espessura",
            texto:
              "Endométrio regular e homogêneo, com espessura de ____ mm.",
          },
        ],
      },
      {
        id: "ovario-direito",
        titulo: "OVÁRIO DIREITO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Habitual (Laudário)",
            texto:
              "Ovário direito tópico, de contornos regulares. O parênquima tem ecotextura habitual.",
          },
        ],
      },
      {
        id: "ovario-esquerdo",
        titulo: "OVÁRIO ESQUERDO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Habitual (Laudário)",
            texto:
              "Ovário esquerdo tópico, de contornos regulares. O parênquima tem ecotextura habitual.",
          },
        ],
      },
      {
        id: "liquido",
        titulo: "LÍQUIDO LIVRE",
        tipo: "unico",
        padrao: "ausente",
        opcoes: [
          {
            id: "ausente",
            label: "Ausente (Laudário)",
            texto: "Ausência de líquido livre na cavidade pélvica.",
          },
          {
            id: "presente",
            label: "Presente",
            texto: "Líquido livre na cavidade pélvica: ____.",
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
            id: "controle",
            label: "Controle evolutivo",
            texto: "",
            impressao:
              "Monitorização folicular em dia ____ do ciclo.\nFolículo dominante: ____ mm.\nEndométrio: ____ mm.",
          },
        ],
      },
      secaoAchadosAdicionais(),
    ],
    impressaoPadrao:
      "Estudo ecográfico sem evidentes anormalidades apreciáveis ao método.",
  };
}
