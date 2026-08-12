import type { Opcao } from "@/data/exames";

/** Patologias MSK do PDF 01 LAUDOS para mesclar nos laudos prontos. */
export const patologiasMskPdf: Record<string, Opcao[]> = {
  "ombro": [
    {
      id: "pdf-bursite",
      label: "Bursite",
      texto: `Bursa subacromiodeltoidea levemente distendida por líquido com aspecto anecóide e homogêneo , medindo cm de
espessura.`,
      impressao: `Imagem sugestiva de sinais bursite subacromiodeltoidea.`,
    },
    {
      id: "pdf-capsulite-adesiva",
      label: "Capsulite adesiva",
      texto: `Sinais sugestivos de capsulite adesiva do supra-espinhal.`,
      impressao: `Sinais sugestivos de capsulite adesiva do supra-espinhal.`,
    },
    {
      id: "pdf-cisto-labral",
      label: "Cisto labral",
      texto: `labrum glenóide, medindo cm (T x AP x L).`,
      impressao: `Imagem sugestiva de imagem cística no recesso posterior. Considerar possibilidade de cisto labral.`,
    },
    {
      id: "pdf-hill-sachs",
      label: "Hill-sachs",
      texto: `longitudinal x cm de profundidade.
(Fratura compressiva causada pelo impacto das trabéculas da cabeça umeral durante a luxação anter ior da articulação gleno -umeral: alteração osteocondral da
região póstero-lateral da cabeça do úmero)`,
      impressao: `Imagem sugestiva de sinais deformidade umeral posterior. Considerar possibilidade de lesão de Hill-Sachs. .`,
    },
    {
      id: "pdf-instabilidade-gleno-umeral",
      label: "Instabilidade gleno-umeral",
      texto: `Conveniente complementar com RM.`,
      impressao: `Imagem sugestiva de aumento da mobilidade da cabeça umeral na cavidade glenóide. Considerar possibilidade de instabilidade gleno -umeral. .`,
    },
    {
      id: "pdf-luxacao-subluxacao-biciptal",
      label: "Luxação/subluxação biciptal",
      texto: `Profundidade do sulco: mm (normal > 4,3 mm).
Largura do sulco: mm (normal < 14 mm).
Ângulo entre o assoalho e a parede medial do sulco bicipital: (normal: ± 56º).`,
      impressao: `Sinais sugestivos de subluxação/luxação bicipital.`,
    },
    {
      id: "pdf-osteoartrose-ombro",
      label: "Osteoartrose ombro",
      texto: `Cartilagem acrômio -clavicular difusamente espessada, com borramento dos contornos e irregularidade da superfície
óssea adjacente. Irregularidade da superfície articular umeral.
Osteófito na margem lateral do acrômio, adjacente ao tendão do supra-espinhal, medindo cm.
Cartilagem acrômio-clavicular com borramento dos contornos e irregularidade da superfície óssea adjacente.`,
      impressao: `Imagem sugestiva de osteoartrose acrômio-clavicular e glenoumeral. .`,
    },
    {
      id: "pdf-tendinite-biciptal",
      label: "Tendinite biciptal",
      texto: `Tendão da cabeça longa do bíceps aumentado de calibre na porção justa -articular, medindo mm de espessura (normal: 3,3-4,7
mm) com hipoecogenicidade/heterogeneidade textural local.`,
      impressao: `Imagem sugestiva de tendinopatia bicipital.`,
    },
    {
      id: "pdf-tendinose-bicipital",
      label: "Tendinose bicipital",
      texto: `Tendão da cabeça longa do bíceps levemente aumentado de calibre em topografia justa -articular, com heterogeneidade
textural e micro-focos ecogênicos de fibrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose bicipital.`,
    },
    {
      id: "pdf-tendinite-supra",
      label: "Tendinite supra",
      texto: `Tendão do supra -espinhal apresentando aumento do calibre, com hipoecogenicidade textural difusa na projeção da zona
crítica.`,
      impressao: `Imagem sugestiva de tendinopatia do supra-espinhal.`,
    },
    {
      id: "pdf-tendinose-supra",
      label: "Tendinose supra",
      texto: `Tendão do supra -espinhal apresentando leve aumento do calibre, com hipoecogenicidade textural e micro -focos
ecogênicos de fibrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose do supra-espinhal.`,
    },
    {
      id: "pdf-ruptura-parcial-supra-nao-transfixante",
      label: "Ruptura parcial supra (não transfixante)",
      texto: `Tendão do supra -espinhal apresentando descontinuidade parcial na projeção da zona crítica medindo cm longitudinal x
cm transversal, preservando suas fibras mais posteriores.
Tendão do supra-espinhal apresentando redução focal de cm de espessura , na projeção da zona crítica , comprometendo
cm transversal, preservando suas fibras mais posteriores.`,
      impressao: `Imagem sugestiva de ruptura não transfixante do supra-espinhal. .`,
    },
    {
      id: "pdf-ruptura-parcial-subescapular-nao-transfixante",
      label: "Ruptura parcial subescapular (não transf…",
      texto: `Tendão do subescapular apresentando descontinuidade parcial, intrassubstancial, medindo cm longitudinal x cm
transversal.`,
      impressao: `Imagem sugestiva de ruptura intrassubstancial do subescapular.`,
    },
    {
      id: "pdf-ruptura-transfixante-aguda-subaguda-do-supra",
      label: "Ruptura transfixante aguda/subaguda do s…",
      texto: `Tendão do supra -espinhal apresenta ndo descontinuidade transfixante na projeção da zona crítica medindo cm
longitudinal x cm transversal, preservando suas fibras mais posteriores.
Tendão do supra -espinhal apresenta ndo descontinuidade transfixant e na projeção da zona crítica medindo cm
longitudinal x cm transversal, preservando suas fibras mais posteriores.
com a bursa subacromiodeltoidea, que se encontra distendida.`,
      impressao: `Imagem sugestiva de ruptura transfixante do supra-espinhal. .`,
    },
    {
      id: "pdf-ruptura-transfixante-cronica-do-supra",
      label: "Ruptura transfixante crônica do supra",
      texto: `Tendão do supra -espinhal apresenta ndo descontinuidade transfix ante na projeção da zona crítica medindo cm
longitudinal x cm transversal, com cabeça umeral irregular e de aspecto “careca”, preservando suas fibras mais
posteriores.
Tendão do supra-espinhal apresentando descontinuidade total na projeção da zona crítica medindo cm longitudinal x cm
transversal, com cabeça umeral irregular e de aspecto “careca”, se estendendo às fibras do infra -espinhal que apresenta
redução focal de sua espessura.`,
      impressao: `Imagem sugestiva de ruptura transfixante crônica do supra-espinhal. .`,
    },
    {
      id: "pdf-derrame-articular",
      label: "Derrame articular",
      texto: `Derrame articular leve na goteira bicipital de aspecto anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de derrame articular leve gleno-umeral.`,
    },
    {
      id: "pdf-derrame-articular-com-distensao-da-bursa",
      label: "Derrame articular com distensão da bursa",
      texto: `Derrame articular na goteira bicipital de aspecto anecóide e homogêneo , comunicando com a bursa subacromiodeltoidea,
que se encontra levemente distendida.`,
      impressao: `Imagem sugestiva de derrame articular com distensão da bursa subacromiodeltoide.`,
    },
    {
      id: "pdf-ruptura-parcial-infra-sub-redondo-menor",
      label: "Ruptura parcial infra, sub/redondo menor",
      texto: `Tendão do apresentando redução focal da espessura/descontinuidade parcial, medindo cm longitudinal x cm transversal,
preservando suas fibras mais .`,
      impressao: `Imagem sugestiva de ruptura parcial do .`,
    },
    {
      id: "pdf-ruptura-total-infra-sub-redondo-menor",
      label: "Ruptura total infra, sub/redondo menor",
      texto: `Tendão * do apresentando descontinuidade total, medindo cm longitudinal e cm transversal.`,
      impressao: `Imagem sugestiva de rotura total do .`,
    },
    {
      id: "pdf-atrofia-muscular",
      label: "Atrofia muscular",
      texto: `Músculo * apresentando aumento da ecogenicidade em aproximadamente % de sua área transversal por lipossubstituição,
compatível com atrofia de desuso.`,
      impressao: `Imagem sugestiva de sinais atrofia muscular do * acentuada/moderada/discreta.`,
    },
    {
      id: "pdf-tendinopatia-calcarea",
      label: "Tendinopatia calcárea",
      texto: `Tendão do * de calibre normal, apresentando foco cálcico hiperecogênico, regular, medindo até cm.`,
      impressao: `Imagem sugestiva de sinais tendinopatia calcárea do .`,
    },
  ],
  "cotovelo": [
    {
      id: "pdf-bursite-olecraniana",
      label: "Bursite olecraniana",
      texto: `Bursa olecraniana apresentando-se distendida por líquido com aspecto anecóide e homog êneo, medindo cerca de cm (L x
AP x T), com volume estimado em cm³.
Bursa olecraniana apresentando -se distendida p or líquido com aspecto anecóide e debris em suspensão associado a
espessamento das paredes (pannus) de até cm com aumento do fluxo vascular ao Doppler. A bursa mede cerca de cm (L
x AP x T), com volume estimado em cm³.`,
      impressao: `Imagem sugestiva de bursite olecraniana. .`,
    },
    {
      id: "pdf-derrame-articular",
      label: "Derrame articular",
      texto: `Derrame articular leve/moderado/acentuado observado na face anterior em corte mediano , com aspecto anecóide e
homogêneo.
Derrame articular leve/moderado/acentuado observado no recesso posterior, com aspecto anecóide e homogêneo .`,
      impressao: `Imagem sugestiva de derrame articular leve/moderado/acentuado. .`,
    },
    {
      id: "pdf-derrame-doenca-reumatologica",
      label: "Derrame doença reumatológica",
      texto: `Derrame articular leve/moderado/acentuado observado no recesso posterior de aspecto anecóide e leves debris em
suspensão associado a proliferação sinovial com fluxo vascular aumentado ao Doppler.
reumatológica.`,
      impressao: `Imagem sugestiva de derrame articular leve/moderado/acentuado com pr oliferação sinovial. Considerar possibilidade de doença .`,
    },
    {
      id: "pdf-estiramento-ligamento-colateral",
      label: "Estiramento ligamento colateral",
      texto: `Banda anterior do ligamento colateral medial apresentando hipoecogenicidade textural difusa.`,
      impressao: `Imagem sugestiva de estiramento da banda anterior do ligamento colateral medial.`,
    },
    {
      id: "pdf-irregularidade-umeral",
      label: "Irregularidade umeral",
      texto: `Superfícies ósseas epicondileanas de contornos irregulares.`,
      impressao: `Imagem sugestiva de irregularidade óssea epicondileana.`,
    },
    {
      id: "pdf-nervo-ulnar-compressao-triciptal",
      label: "Nervo ulnar: compressão triciptal",
      texto: `Nervo ulnar observado na fossa cubital apresentando calibre preservado com área transversal de mm².
À manobra de contração do músculo tríceps braquial observou-se aparente compressão extrínseca deste sobre o nervo
ulnar na topografia da fossa cubital.
À manobra de flexão do cotovelo não observou-se luxação do nervo ulnar.`,
      impressao: `Imagem sugestiva de aparente compressão extrínseca do músculo tríceps sobre o nervo ulnar.  .`,
    },
    {
      id: "pdf-nervo-ulnar-granuloma",
      label: "Nervo ulnar: granuloma",
      texto: `medindo cm (T x AP) com área transvresal de mm².
À manobra de flexão do cotovelo não observou-se luxação do nervo ulnar.`,
      impressao: `Imagem sugestiva de imagem nodular na topografia do nervo ulnar. Considerar possibilidade de Granuloma.`,
    },
    {
      id: "pdf-nervo-ulnar-luxacao",
      label: "Nervo ulnar: luxação",
      texto: `Nervo ulnar observado na fossa cubital apresentando calibre preservado com área transversal de mm².
À manobra de flexão do cotovelo observou-se luxação do nervo ulnar em direção ao epicôndilo medial.`,
      impressao: `Imagem sugestiva de luxação do nervo ulnar à manobra de flexão do cotovelo.`,
    },
    {
      id: "pdf-nervo-ulnar-neurofibroma",
      label: "Nervo ulnar: neurofibroma",
      texto: `hipoecogênico, medindo cm (T x AP) com área transvresal de mm².
À manobra de flexão do cotovelo não observou-se luxação do nervo ulnar.`,
      impressao: `Imagem sugestiva de imagem fusiforme na topografia do nervo ulnar. Considerar possibilidade de Neurofibroma.`,
    },
    {
      id: "pdf-nervo-ulnar-neuropatia",
      label: "Nervo ulnar: neuropatia",
      texto: `Nervo ulnar observado na fossa cubital apresentando aumento do calibre com área transversal de mm².
À manobra de flexão do cotovelo não observou-se luxação do nervo ulnar.`,
      impressao: `Imagem sugestiva de aumento do calibre do nervo ulnar. Considerar possibilidade de neuropatia.`,
    },
    {
      id: "pdf-nervo-ulnar-schwanoma",
      label: "Nervo ulnar: schwanoma",
      texto: `medindo cm (T x AP) com área transvresal de mm².
À manobra de flexão do cotovelo não observou-se luxação do nervo ulnar.`,
      impressao: `Imagem sugestiva de imagem nodular na topografia do nervo ulnar. Considerar possibilidade de Schwanoma.`,
    },
    {
      id: "pdf-ruptura-parcial-epicondilo-lateral",
      label: "Ruptura parcial: epicôndilo lateral",
      texto: `Tendão comum dos extensores e sua inserção no epicôndilo lateral apresentando descontinuidade parcial em suas fibras
mais profundas, medindo cm longitudinal x cm transversal, preservando suas fibras mais superficiais. Irregularidade da
superfície epicondiliana adjacente.`,
      impressao: `Imagem sugestiva de ruptura parcial epicondilopatia lateral.`,
    },
    {
      id: "pdf-tendinite-epicondilo-lateral",
      label: "Tendinite: epicôndilo lateral",
      texto: `Tendão comum dos extensores e sua inserção no epicôndilo lateral apresentam espessura levemente au mentada com
hipoecogenicidade textural difusa.

Tendão comum dos extensores e sua inserção no epicôndilo lateral apresentam área de hipoecogenicidade textural justa-
insercional de suas fibras mais profundas/superficiais.`,
      impressao: `Imagem sugestiva de epicondilopatia lateral. .`,
    },
    {
      id: "pdf-tendinite-epicondilo-medial",
      label: "Tendinite: epicôndilo medial",
      texto: `Tendão comum dos flexores e sua inserção no epicôndilo medial apresentam espessura leve mente aumentada com
hipoecogenicidade textural difusa.

Tendão comum dos flexores e sua inserção no epicôndilo medial apresentam área de hipoecogenicidade textural justa-
insercional de suas fibras mais profundas/superficiais.`,
      impressao: `Imagem sugestiva de epicondilopatia medial. .`,
    },
    {
      id: "pdf-tedinite-triciptal",
      label: "Tedinite triciptal",
      texto: `Tendão do tríceps braquial apresentando aumento de calibre em sua inserção distal, com hipoecogenicidade textural local.`,
      impressao: `Imagem sugestiva de tendinopatia triciptal. .`,
    },
    {
      id: "pdf-tedinite-biciptal",
      label: "Tedinite biciptal",
      texto: `Tendão do bíceps braquial apresentando aumento de calibre em sua inserção distal, com hipoecogenicidade textural local.`,
      impressao: `Imagem sugestiva de tendinopatia biciptal distal. .`,
    },
    {
      id: "pdf-tendinose-epicondilo-lateral",
      label: "Tendinose: epicôndilo lateral",
      texto: `Tendão comum dos extensores e sua inserção no epicôndilo lateral apresentam espessura levemente aumentada com
heterogeneidade textural difusa e focos ecogênicos de fibrose intra-tendínea.
Irregularidade óssea da superfície epicondiliana adjacente.`,
      impressao: `Imagem sugestiva de tendinose epicondiliana lateral. .`,
    },
    {
      id: "pdf-tendinose-epicondilo-medial",
      label: "Tendinose: epicôndilo medial",
      texto: `Tendão comum dos flexores e sua inserção no epicôndilo medial apresentam espessura leve mente aumentada com
heterogeneidade textural difusa e focos ecogênicos de fibrose intra-tendínea.
Irregularidade óssea da superfície epicondiliana adjacente.`,
      impressao: `Imagem sugestiva de tendinose epicondiliana medial. .`,
    },
    {
      id: "pdf-tedinose-triciptal",
      label: "Tedinose triciptal",
      texto: `Tendão do tríceps braquial apresentando leve aumento de calibre em sua inserção distal, com heterogeneidade textural
justa-insercional com focos ecogênicos de fibrose intra-tendínea.
Irregularidade óssea da superfície olecraniana adjacente.`,
      impressao: `Imagem sugestiva de tendinose triciptal. .`,
    },
    {
      id: "pdf-tedinose-biciptal",
      label: "Tedinose biciptal",
      texto: `Tendão do bíceps braquial apresentando aumento de calibre em sua inserção distal, com heterogeneidade textural e focos
ecogênicos de fibrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose biciptal. .`,
    },
  ],
  "quadril": [
    {
      id: "pdf-bursite-trocanterica",
      label: "Bursite trocantérica",
      texto: `Bursa trocantérica distendida por líquido com aspecto anecóide e homogêneo, medindo cm de espessura.`,
      impressao: `Imagem sugestiva de bursite trocantérica.`,
    },
    {
      id: "pdf-derrame-articular",
      label: "Derrame articular",
      texto: `Presença de coleção líquida , com aspecto anecóide, homogêneo, no interior da articulação do quadril , visibilizada no
recesso anterior da cápsula. A distância colo-cápsula mede cm.`,
      impressao: `Imagem sugestiva de sinais ecográficos compatíveis com sinovite no quadril .`,
    },
    {
      id: "pdf-displasia-coxo-femoral-us",
      label: "Displasia coxo-femoral us",
      texto: `A técnica de Graf realizada pelo ultrassom é baseada no plano coronal do quadril avaliado em posição neutra, que corre sponde no caso do RN a uma discreta
flexão. Graf utilizou três retas para medir dois ângulos: alfa e beta. A linha de base corresponde a tangente a parede lateral do osso ilíaco que deve necessariamente
se apresentar com morfologia reta, o que indica inclu sive que o plano de corte escolhido está adequado. O ângulo alfa traduz quantitativamente a displasia da
porção óssea do teto do acetábulo e reflete a inclinação do teto acetabular. Quanto menor o ângulo alfa, mais rasa é a cavida de acetabular e portanto, a displasia é
mais acentuada. O angulo alfa normal deve ser maior ou igual a 60 graus. O ângulo beta traduz a posição da fibrocartilagem do lábio acetabular em relação a linha
de base. Assim quanto maior for o ângulo beta mais horizontalizado está o lábio , ou seja, o lábio está mais deslocado superiormente pela epífise femoral. Em
crianças normais o ângulo beta deve ser menor ou igual a 55 graus.

Referência: http://mskribeirao.com/curiosidades/detalhe/displasia-de-quadril-recem-nascido-rn/
(Site de radiologia do sistema musculoesquelético desenvolvido por profissionais de Ribeirão Preto – SP. Publicação: 18.12.2012).`,
      impressao: `Imagem sugestiva de displasia coxo-femoral us.`,
    },
    {
      id: "pdf-osteoartrose",
      label: "Osteoartrose",
      texto: `Cartilagem articular fêmoro-acetabular difusamente espessada, com borramento dos contornos e irregularidad e da
superfície óssea adjacente.
Irregularidade da superfície óssea trocantérica e da espinha ilíaca ântero-superior.`,
      impressao: `Imagem sugestiva de osteoartrose coxo-femoral.`,
    },
  ],
  "punho": [
    {
      id: "pdf-lesao-do-complexo-capsulo-ligamentar",
      label: "Lesão do complexo cápsulo-ligamentar",
      texto: `Complexo cápsulo -ligamentar da articulação trapézio -1º metacarpo apresentando leve borramento dos contornos e
discreta irregularidade da superfície óssea adjacente. Apresenta -se distendida por derrame articular leve de aspecto
anecóide e homogêneo.
ligamentar.
óssea adjacente.`,
      impressao: `Imagem sugestiva de sinais lesão do complexo cápsulo-ligamentar com derrame articular leve trapézio-1º metacarpo e discreta irregularidade .`,
    },
    {
      id: "pdf-osteoartrite-com-derrame-articular",
      label: "Osteoartrite com derrame articular",
      texto: `Cartilagem articular entre o *** difusamente esp essada, com borramento dos contornos e irregularidade da superfície
óssea adjacente, associado a derrame articular leve com aspecto anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de osteoartrite com derrame articular leve ***.`,
    },
    {
      id: "pdf-cisto-artrossinovial",
      label: "Cisto artrossinovial",
      texto: `Formação cística lobulada de conteúd o líquido, anecóide homogêneo , entre o 2º e o 4º túnel dorsal, adjacente ao
semilunar, com colo de comunicação articular, medindo cm (L x AP x T).
Formação cística lobulada de conteúdo líquido , anecóide homogêneo, entre o tendão flexor radial do carpo e o 1º túnel
dorsal, com colo de comunicação articular, medindo cm (L x AP x T).`,
      impressao: `Imagem sugestiva de cisto artrossinovial no punho. .`,
    },
  ],
  "mao": [
    {
      id: "pdf-lesao-do-complexo-capsulo-ligamentar",
      label: "Lesão do complexo cápsulo-ligamentar",
      texto: `Complexo cápsulo -ligamentar da articulação trapézio -1º metacarpo apresentando leve borramento dos contornos e
discreta irregularidade da superfície óssea adjacente. Apresenta -se distendida por derrame articular leve de aspecto
anecóide e homogêneo.
ligamentar.
óssea adjacente.`,
      impressao: `Imagem sugestiva de sinais lesão do complexo cápsulo-ligamentar com derrame articular leve trapézio-1º metacarpo e discreta irregularidade .`,
    },
    {
      id: "pdf-osteoartrite-com-derrame-articular",
      label: "Osteoartrite com derrame articular",
      texto: `Cartilagem articular entre o *** difusamente esp essada, com borramento dos contornos e irregularidade da superfície
óssea adjacente, associado a derrame articular leve com aspecto anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de osteoartrite com derrame articular leve ***.`,
    },
    {
      id: "pdf-dedo-em-gatilho",
      label: "Dedo em gatilho",
      texto: `Tendão flexor do 4º dedo levemente espessado com hipoecogenicidade textural ao nível da primeira polia anular na cabeça
metacarpal associado a travamento à extensão do respectivo quirodáctilo.
Tendão flexor do 4º dedo apresentando leve espessamento da primeira polia anular ao nível na cabeça metacarpal , sem
sinais de travamento à extensão do respectivo quirodáctilo ao exame dinâmico.`,
      impressao: `Imagem sugestiva de tenossinovite estenosante do 4º flexor (dedo em gatilho). .`,
    },
  ],
  "tornozelo": [
    {
      id: "pdf-cisto-s-artrossinovial-is",
      label: "Cisto(s) artrossinovial(is)",
      texto: `Formação cística lobulada, de conteúdo líquido, anecóide homogêneo, com colo de comunicação articular , entre a
articulação talo-navicular, medindo cm (L x AP x T).
Formações císticas lobuladas, de conteúdo líquido, anecóide homogêneo, com colo de comunicação articular, entre a s
articulações:`,
      impressao: `Imagem sugestiva de cisto artrossinovial. .`,
    },
    {
      id: "pdf-entesopatia",
      label: "Entesopatia",
      texto: `Entesopatia calcificada de tendão calcâneo, medindo até cm.`,
      impressao: `Imagem sugestiva de entesófito de calcâneo.`,
    },
    {
      id: "pdf-tendinite-calcaneo",
      label: "Tendinite calcâneo",
      texto: `Tendão de Aquiles aumentado de calibre do calcâneo, medindo cm de espessura, associado a hipoecogenicidade textural
justa-insercional.
Tendão de Aquiles aumentado de calibre , medindo cm de espessura na zona crítica , a cm de sua inserção no calcâneo,
com hipoecogenicidade textural local, comprometendo cm longitudinal.`,
      impressao: `Imagem sugestiva de tendinopatia do calcâneo justa-insercional. .`,
    },
    {
      id: "pdf-tendinose-calcaneo",
      label: "Tendinose calcâneo",
      texto: `Tendão de Aquiles aumentado de calibre em sua ins erção/no corpo, com hipoecogenicidade textural e microfocos
ecogênicos de fibrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose do calcâneo.`,
    },
    {
      id: "pdf-ruptura-total-do-tendao-calcaneo",
      label: "Ruptura total do tendão calcâneo",
      texto: `Tendão de Aquiles apresentando descontinuidade total a aproximadamente cm de sua inserçã o no calcâneo, na projeção
da zona crítica, com distância entre os fragmentos de cerca de cm em repouso e cm na posição em “equino” e
preenchimento da área rota por efusão líquida hemorrágica.`,
      impressao: `Imagem sugestiva de ruptura total do tendão calcâneo.`,
    },
    {
      id: "pdf-ruptura-parcial-do-tendao-calcaneo",
      label: "Ruptura parcial do tendão calcâneo",
      texto: `Tendão de Aquiles apresentando descontinuidade parcial das fibras mais profundas/superficias/laterais/mediais a
aproximadamente cm de sua inserção no calcâneo, na projeção da zona crítica, medindo cm longitudinal x cm
transversal e preenchimento da área rota por efusão líquida hemorrágica.`,
      impressao: `Imagem sugestiva de ruptura parcial do tendão calcâneo.`,
    },
    {
      id: "pdf-tenossinovite-tibial-posterior",
      label: "Tenossinovite tibial posterior",
      texto: `Tendão do tibial posterior aumentado de calibre em sua porção maleolar e infra maleolar, com hipoecogenicidade textur al
e líquido em sua sinóvia, comprometendo cerca de cm longitudinal.`,
      impressao: `Imagem sugestiva de tenossinovite do tibial posterior.`,
    },
    {
      id: "pdf-tendinose-tibial-posterior",
      label: "Tendinose tibial posterior",
      texto: `Tendão tibial posterior aumentado de calibre na porção maleolar e infra -maleolar, com heterogeneidade textural e
desorganização da arquitetura por micro -focos ecogênicos de fibrose/calcificação e anecóicos de necrose intra -tendínea
de permeio por roturas degenerativas locais.`,
      impressao: `Imagem sugestiva de tendinose do tibial posterior.`,
    },
    {
      id: "pdf-tenossinovite-dos-fibulares",
      label: "Tenossinovite dos fibulares",
      texto: `Tendões fibulares aumentados de calibre na porção maleolar, com halo a necóico de edema sinovial local, comprometendo
cerca de cm longitudinal.`,
      impressao: `Imagem sugestiva de tenossinovite dos fibulares.`,
    },
    {
      id: "pdf-derrame-articular",
      label: "Derrame articular",
      texto: `Derrame articular leve/moderado tíbio-talar de aspecto anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de derrame articular tíbio-talar leve/moderado.`,
    },
    {
      id: "pdf-lesao-ligamentar",
      label: "Lesão ligamentar",
      texto: `Ligamento apresentando descontinuidad e total com estravazamento de lí quido articular na área dissecando o fragmento
roto.
Ligamentos: talo-fibular anterior/calcâneo-fibular/tíbio-fibular/deltóide.`,
      impressao: `Imagem sugestiva de ruptura do ligamento *. .`,
    },
  ],
  "pe": [
    {
      id: "pdf-cisto-s-artrossinovial-is",
      label: "Cisto(s) artrossinovial(is)",
      texto: `Formação cística lobulada, de conteúdo líquido, anecóide homogêneo, com colo de comunicação articular , entre a
articulação talo-navicular, medindo cm (L x AP x T).
Formações císticas lobuladas, de conteúdo líquido, anecóide homogêneo, com colo de comunicação articular, entre a s
articulações:`,
      impressao: `Imagem sugestiva de cisto artrossinovial. .`,
    },
    {
      id: "pdf-osteoartrose-tarso",
      label: "Osteoartrose tarso",
      texto: `Borramento dos contornos e irregularidade das superfícies articulares nos ossos do tarso.`,
      impressao: `Imagem sugestiva de osteoartrose no pé.`,
    },
    {
      id: "pdf-fascite-plantar",
      label: "Fascite plantar",
      texto: `Fáscia plantar com espessura aumentada em sua inserção no calcâneo, medi ndo cm de calibre, com hipoecogenicidade
textural local.
Fáscia plantar com espessura aumentada em suas fibras mais mediais, a cerca de cm da inserção no calcâneo, medindo
cm de calibre, comprometendo cm longitudinal, associado a hipoecogenicidade textural local.`,
      impressao: `Imagem sugestiva de fascite plantar. .`,
    },
    {
      id: "pdf-fascite-cronica-plantar",
      label: "Fascite crônica plantar",
      texto: `Fáscia plantar aumentada de calibre em sua inserção no calcâneo, com hipoecogenicidade textural e focos de
fibrose/calcificação de permeio. Irregularidade da superfície óssea adjacente.`,
      impressao: `Imagem sugestiva de fascite crônica plantar.`,
    },
    {
      id: "pdf-talalgia-de-impacto",
      label: "Talalgia de impacto",
      texto: `Coxim plantar (fat pad) com alteração textural da superfície óssea adjacente. Espessura do coxim de {{MEDIDA}} (normal <1,5 cm).`,
      impressao: `Imagem sugestiva de talalgia do impacto.`,
    },
    {
      id: "pdf-neuroma-de-morton",
      label: "Neuroma de morton",
      texto: `Formação hipoecogênica, comprimindo-se à manobra de Mulder, medindo {{MEDIDA}}.`,
      impressao: `Imagem sugestiva de imagem nodular entre o 3º e 4º metatarso. Considerar possibilidade de neuroma de Morton.`,
    },
    {
      id: "pdf-fibromatose-plantar-doenca-de-ledderhose",
      label: "Fibromatose plantar (doença de ledderhose)",
      texto: `Fáscia plantar apresentando a cerca de {{MEDIDA}} da inserção no calcâneo, área de espessamento nodular alongada com
hipoecogenicidade textural local, medindo ____ cm no eixo da fáscia por ____ cm de espessura.`,
      impressao: `Imagem sugestiva de espessamento nodular da fáscia plantar. Considerar possibilidade de fibromatose plantar (Doença de Ledderhose). .`,
    },
  ],
};

export function mergePatologiasMsk(base: Opcao[], exameId: string): Opcao[] {
  const extra = patologiasMskPdf[exameId] ?? [];
  const ids = new Set(base.map((o) => o.id));
  const out = [...base];
  for (const o of extra) {
    if (ids.has(o.id)) continue;
    out.push(o);
    ids.add(o.id);
  }
  return out;
}

