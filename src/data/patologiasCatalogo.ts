import type { Opcao } from "@/data/exames";

/** Catálogo de patologias extraído do PDF 01 LAUDOS (Dr. Saulo Miranda Souza). */
export const patologiasCatalogo: Record<string, Opcao[]> = {
  "abdome::aorta": [
    {
      id: "aneurisma-de-aorta-abdominal",
      label: "Aneurisma de aorta abdominal",
      texto: `Aorta abdominal pérvia, com calcificações parietais ateromatosas leves/grosseiras associado a dilatação aneurismática
fusiforme/sacular em seu segmento s upra/infra-renal, medindo * cm (AP x T) e extensão de * cm, com trombos murais
semi-circunferenciais laminares, reduzindo a luz efetiva em cerca de * %, com fluxo turbilhonado ao Doppler Colorido.
O colo do aneurisma mede: * cm.

Diâmetro aórticos:
Artérias ilíacas comuns apresentam-se pérvias, com calibre e contornos normais, medindo até * cm à direita e * cm à esquerda.`,
      impressao: `Imagem sugestiva de dilatação aneurismática de aorta abdominal.`,
    },
  ],
  "abdome::baco": [
    {
      id: "baco-acessorio",
      label: "Baço acessório",
      texto: `medialmente ao baço, medindo * cm, compatível com baço acessório.
Baço acessório adjacente à face inferior esplênica, medindo cm.`,
      impressao: `Imagem sugestiva de baço acessório.`,
    },
    {
      id: "esplenectomia",
      label: "Esplenectomia",
      texto: `Baço não caracterizado (status pós-operatório).
Baço não visibilizado: auto-esplenectomia?`,
      impressao: `Imagem sugestiva de esplenectomia total.`,
    },
    {
      id: "esplenectomia-esplenose",
      label: "Esplenectomia + esplenose",
      texto: `Baço não caracterizado (status pós-operatório).
medindo até * cm.`,
      impressao: `Imagem sugestiva de esplenectomia.`,
    },
    {
      id: "esplenomegalia",
      label: "Esplenomegalia",
      texto: `Baço de morfologia, contornos e ecotextura normais, com dimensões aumentadas, medindo cm em seu maior eixo (normal <
12,0 cm).
Baço de dimensões muito aumentadas, medindo cerca de * cm em seu maior eixo (normal < 12 ,0 cm), ultrapassando a linha
média e estendendo-se para a fossa ilíaca esquerda, comprimindo órgãos adjacentes.`,
      impressao: `Imagem sugestiva de esplenomegalia homogênea leve.`,
    },
    {
      id: "hemangioma-esplenico",
      label: "Hemangioma esplênico",
      texto: `conteúdo hiperecogênico e homogêneo, desprovido de sombra acústica posterior, sem fluxo ao Doppler, medindo cm.`,
      impressao: `Imagem sugestiva de nódulo esplênico sugestivo de hemangioma.`,
    },
  ],
  "abdome::cav-abdominal": [
    {
      id: "liquido-intracavitario",
      label: "Líquido intracavitário",
      texto: `Acentuada quantidade de líquido livre intraperitoneal com aspecto anecóide homogêneo, se estendendo do fundo de saco
posterior e goteiras parietocólicas até espaços hepato e espleno-renais.
Moderada quantidade de lí quido livre intraperitoneal com aspecto anecóide com leves/moderados debris, se estendendo
do fundo de saco posterior e goteiras parietocólicas até espaços hepato e espleno -renais.`,
      impressao: `Imagem sugestiva de ascite acentuada.`,
    },
  ],
  "abdome::figado": [
    {
      id: "abscesso-hepatico",
      label: "Abscesso hepático",
      texto: `(cístico-espesso), com fluxo periférico ao Doppler, ocupando o segmento hepático * (Segmentação de Couinaund), medindo cerca
de cm (L x AP x T) e volume estimado de cm3, distando cm da superfície hepática.`,
      impressao: `Imagem sugestiva de imagem cístico-espessa no fígado. Considerar possibilidade de abscesso hepático.`,
    },
    {
      id: "alongamento-hepatico",
      label: "Alongamento hepático",
      texto: `Fígado de morfologia e contornos normais, apresentando alongamento vertical do lobo hepático direito, medindo cm longitudinal
(habitual < 15,0 cm): Lobo de Riedel: variante anatômica.
Fígado de morfologia e contornos normais apresentando alongamento horizontal do lobo hepático esquerdo, em íntimo contato com
o baço (variante anatômica).
Fígado de morfologia e contornos normais apresentando alongamento vertical do lobo hepático esquerdo, medindo cm longitudinal
(habitual < 10,0 cm) (variante anatômica).`,
      impressao: `Imagem sugestiva de alongamento hepático.`,
    },
    {
      id: "calcificacao-hepatica",
      label: "Calcificação hepática",
      texto: `medindo cerca de cm.`,
      impressao: `Imagem sugestiva de calcificação hepática de aspecto residual.`,
    },
    {
      id: "cisto-hepatico",
      label: "Cisto hepático",
      texto: `de Couinaund), medindo cm.`,
      impressao: `Imagem sugestiva de cisto hepático.`,
    },
    {
      id: "cistos-hepaticos",
      label: "Cistos hepáticos",
      texto: `hepático * (Segmentação de Couinaund).`,
      impressao: `Imagem sugestiva de cistos hepáticos.`,
    },
    {
      id: "esteatose-hepatica",
      label: "Esteatose hepática",
      texto: `Fígado de morfologia, contornos e dimensões normais, apresentando leve aumento difuso da ecogenicidade.
Fígado de morfologia, contornos e dimensões normais, apresentando moderado/acentuado aumento difuso da
ecogenicidade com atenuação do feixe acústico posterior, o que dificulta a identificação de eventuai s alterações
parenquimatosas focais.

Fígado de morfologia, contornos e dimensões normais, apresentando leve aumento difuso de sua ecogenicidade com área
hipoecogênica, mal definida, no segmento hepático IVb/V, medindo cerca de cm, sugerindo área de preservação.
Fígado de morfologia e contornos normais, com dimensões aumentadas, medindo o lobo esquerdo: cm (normal < 10,0 cm) e o
lobo direito: cm (normal < 15,0 cm), apresentando moderado aumento difuso da ecogenicidade.`,
      impressao: `Imagem sugestiva de leve infiltração gordurosa hepática.`,
    },
    {
      id: "hemangioma-hepatico",
      label: "Hemangioma hepático",
      texto: `Com situação, forma, contornos e dimensões normais.
Parênquima hepático com textura uniforme.
Identifica-se imagem nodular hiperecogênica homogênea, de contornos regulares, desprovida de sombra acústica posterior, sem fluxo ao Doppler, localizada em {{LOCAL}}, medindo ____ cm, sugestiva de hemangioma hepático.
Estruturas vasculares intra-hepáticas e tronco da veia porta de características normais.
Hilo hepático de aspecto normal.`,
      impressao: `Imagem sugestiva de nódulo hepático sugestivo de hemangioma.`,
    },
    {
      id: "hepatite-aguda",
      label: "Hepatite aguda",
      texto: `Parênquima hepático apresentando leve aumento da refringência peri-portal difusamente.`,
      impressao: `Imagem sugestiva de alteração parenquimatosa hepática. Considerar possibilidade de hepatite aguda.`,
    },
    {
      id: "hepatomegalia-homogenea",
      label: "Hepatomegalia homogênea",
      texto: `Fígado de morfologia e contornos normais com dimensões aumentadas, medindo o lobo esquerdo: ____ cm longitudinal (normal < 10,0 cm) e o lobo direito: ____ cm longitudinal (normal < 15,0 cm).`,
      impressao: `Imagem sugestiva de hepatomegalia homogênea leve.`,
    },
    {
      id: "hepatopatia-cronica",
      label: "Hepatopatia crônica",
      texto: `Fígado de contornos lobulados, bordas rombas, com lobo direito de dimensões reduzidas e lobo caudado aumentado e
globoso, associado a espe ssamento dos ligamentos hepáticos e ecotextura parenquimatosa difusamente grosseira e
heterogênea. Relação dos diâmetros transversos: lobo caudado/lobo direito = * (normal < 0,65).

Veia porta de trajeto e calibre normais, medindo * cm (normal < 1,3 cm), com fluxo hepatopetal.`,
      impressao: `Imagem sugestiva de hepatopatia crônica.`,
    },
    {
      id: "hepatopatia-cronica-com-hipertensao-portal",
      label: "Hepatopatia crônica com hipertensão …",
      texto: `Fígado de contornos lobulados, bordas rombas, com lobo direito de dimensões reduzidas e lobo caudado aumentado e
globoso, associado a espessamento dos ligame ntos hepáticos e ecotextura parenquimatosa difusamente grosseira e
heterogênea. Relação dos diâmetros transversos: lobo caudado/lobo direito = * (normal < 0,65).

Veia porta de trajeto habitual apresentando calibre aumentado, medindo * cm (normal < 1,3 cm), com fluxo hepatofugal.

Dilatação e tortuosidade de vasos peri-esofágicos, peri-gástricos, peri-hepáticos e peri-esplênicos, medindo até cm.`,
      impressao: `Imagem sugestiva de hepatopatia crônica com hipertensão portal.`,
    },
    {
      id: "hepatopatia-cronica-multiplos-nodulos",
      label: "Hepatopatia crônica/múltiplos nódulos",
      texto: `Fígado apresentand o contornos lobulados, bordas rombas, com lobo caudado de dimensões aumentadas e globoso,
associado a espessamento dos ligamentos hepáticos. Parênquima de ecotextura grosseiramente heterogênea com
múltiplos nódulos sólidos, esparsos, hipoecogênicos, de con tornos parcialmente obscurecidos, medindo até cm no
segmento *.
Lobo esquerdo mede: mm (normal < 10,0 cm) e o lobo direito: cm (normal < 15,0 cm).`,
      impressao: `Imagem sugestiva de hepatopatia parenquimatosa crônica com múltiplos nódulos hepáticos.`,
    },
    {
      id: "hepatopatia-fibrose-peri-portal-esquistossomose",
      label: "Hepatopatia: fibrose peri-portal (es…",
      texto: `Fígado de contornos discretamente lobulados e dimensões reduzidas, associado a espessamento dos ligamentos
hepáticos e parênquima com aumento da refringência peri-portal difusamente.`,
      impressao: `Imagem sugestiva de hepatopatia parenquimatosa com sinais sugestivos de fibrose peri-portal. Considerar possibilidade de esquistossomose.`,
    },
    {
      id: "klatskin",
      label: "Klatskin",
      texto: `Vias biliares intra -hepáticas dilatadas, medindo até * cm à esq uerda e * cm à direita (normal < 0,25 cm) com aparente
amputação ao nível da placa hilar.
Tumor de Klatskin. Conveniente prosseguir investigação diagnóstica.`,
      impressao: `Imagem sugestiva de dilatação das vias biliares intra -hepáticas com sinais de amputação ao nível da placa hilar. Considerar possibilidade de.`,
    },
    {
      id: "massa-hepatica",
      label: "Massa hepática",
      texto: `Fígado de contorno inferior lobulado e dimensões aumentadas às custas de volumosa massa, sólida, de contornos
irregulares, conteúdo heterogêneo, com calcificações de permeio , fluxo central e periférico ao Doppler, ocupando os
segmentos hepáticos (Segmentação de Couinaund), medindo cerca de * cm.
Placa hilar e ramos portais principais poupados.`,
      impressao: `Imagem sugestiva de massa hepática. Conveniente complementar com TC.`,
    },
    {
      id: "nodulos-hepaticos-secundarios",
      label: "Nódulos hepáticos secundários",
      texto: `Parênquima hepático homogêneo, com ecotextura e ecogenic idade normais, exceto por imagens nodulares, sólidas, de
contornos bem definidos e lobulados, conteúdo hipoecogênico, com halo, caracteriazados assim:`,
      impressao: `Imagem sugestiva de segmento , medindo * cm.`,
    },
    {
      id: "trombose-portal",
      label: "Trombose portal",
      texto: `Veia porta de calibre aumentado, medindo cm (normal < 1,3 cm) , apresentando em seu interior material hipoecogênico,
aderido à parede do vaso , no segmento extra -hepático s e estendendo até o segmento portal intra -hepático
direito/esquerdo. Ausência de fluxo vascular ao Doppler.
Veia esplênica pérvia, de calibre aumentado, medindo cm (normal < 0,9 cm).
Artéria hepática pérvia, de paredes finas e lisas, com calibre aumentado, medindo cm ao nível do hilo hepático . Fluxo de direção
aorto-hepático com velocidade aumentada de cm/s (normal: 30-60 cm/s).`,
      impressao: `Imagem sugestiva de trombose portal.`,
    },
  ],
  "abdome::intestino": [
    {
      id: "achado-adicional",
      label: "Achado adicional:",
      texto: `Estudo complementar com sonda convexa de 5 Mhz dirigido para a cavidade pélvica evidenciou:`,
      impressao: `Imagem sugestiva de achado adicional:.`,
    },
    {
      id: "adenite-mesenterica",
      label: "Adenite mesentérica",
      texto: `Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em fossas ilíacas e região peri-umbilical:
hipoecogênicos com centro ecogênico, sem sinais de degeneração cístico-necrótica, medindo até cm.

Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em fossas ilíacas e região peri-umbilical:
medindo até * cm.`,
      impressao: `Imagem sugestiva de evidenciou pelo menos *  linfonodos levemente aumentados, no mesentério da região per iumbilical e fossas ilíacas,.`,
    },
    {
      id: "apendagite-epiploica",
      label: "Apendagite epiplóica",
      texto: `Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em região abdominal, evidenciou:
cm.

com TC.`,
      impressao: `Imagem sugestiva de imagem ovalada, na fossa ilía ca esquerda, na borda antimesentérica, hiperecogênica com halo hipoecogênico, medindo *.`,
    },
    {
      id: "apendice-cecal",
      label: "Apêndice cecal",
      texto: `Estudo ultra ssonográfico complementar com sonda linear de 10MHz, dirigido em fossas ilíacas, não evidenciou aumento da
ecogenicidade da gordura mesentérica e não caracterizou ecograficamente o apêndice cecal. Alças intestinais com peristalse
preservada.`,
      impressao: `Imagem sugestiva de apêndice cecal.`,
    },
    {
      id: "apendicite",
      label: "Apendicite",
      texto: `Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em região pélvica, evidenciou:
compressível, podendo corresponder a apêndice cecal inflamado.
com apendicolito.

Na projeção da fossa ilíaca direita, observa -se imagem tubuliforme fixa, te rminando em fundo cego, localizada
medialmente ao ceco/lateralmente ao ceco, apresentando paredes espessadas e calibre de cm (normal < 0,7 cm) , contendo
material líquido espesso e associada a hiperecogenicidade da gordura mesenterial adjacente e a pequena quantidade de
líquido livre. Nota-se alça de delgado parética e repleta de líquido próxima a imagem supramencionada.`,
      impressao: `Imagem sugestiva de imagem tubular, de fundo cego, medindo * cm de espessura (normal < 0, 7 cm) , sem delaminamento de parede, não.`,
    },
    {
      id: "borramento-da-gordura-mesenterica",
      label: "Borramento da gordura mesentérica",
      texto: `Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em região pélvica, evidenciou:`,
      impressao: `Imagem sugestiva de área de borramento da gordura mesentérica na fossa ilíaca esquerda.`,
    },
    {
      id: "espessamento-de-alca-colonica",
      label: "Espessamento de alça colônica",
      texto: `Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em região abdominal, evidenciou:

inflamatório/infeccioso. Conveniente complementar com TC.`,
      impressao: `Imagem sugestiva de espessamento parietal difuso de alça colônica na fossa ilíaca direita/esquerda, medindo até  cm (normal < 0,6 cm).`,
    },
    {
      id: "estenose-de-piloro",
      label: "Estenose de piloro",
      texto: `piloro com espessura muscular de cm (normal < 0,3 cm), comprimento de cm (normal < 1,7 cm) e volume estimado de cm³ (normal <
1,4 cm³), sem sinais abertura significativa da luz.
ondas peristálticas retrógradas, associada a ausência de abertura normal do piloro, com passagem diminuída de líquido
do estômago para o duodeno, levando a retardo no esvaziamento gástrico.

localizada. Diâmetro pilórico transverso ≥ 13 mm (parâmetro menos fidedigno). Comprimento do canal pilórico ≥ 17 mm (S: 100%;
E:84,85%). Espessura do músculo pilórico da parede externa do músculo pilórico à margem externa da mucosa ≥ 3 mm (S: + 100%;
E: + 100%).
mucosa ecogênica redundante.
durante a peristalse gástrica.
apresentando um canal pilórico alongado e estreitado, formando uma imagem semelhante ao da cérvice uterina).`,
      impressao: `Imagem sugestiva de imagem anelar na região epigástrica. Considerar possibilidade de estenose hipertrófica do piloro.`,
    },
    {
      id: "intussuscepcao",
      label: "Intussuscepção",
      texto: `Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em região abdominal, evidenciou:
cerca de * cm longitudinal, com camada externa de * cm de espessura, sem líquido livre no interior da invaginação.
secundária pelo método ecográfico.`,
      impressao: `Imagem sugestiva de imagem em aspecto de "casca de cebola" , na topografia de flanco direi to e mesogástrio, medindo * cm transversal x.`,
    },
    {
      id: "intussuscepcao-ausente",
      label: "Intussuscepção ausente",
      texto: `Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em região abdominal, não evidenciou imagem
sugestiva de intussuscepção intestinal. Ecogenicidade da gordura mesentérica e peristalse de alças intestinais preservados.`,
      impressao: `Imagem sugestiva de intussuscepção ausente.`,
    },
  ],
  "abdome::pancreas": [
    {
      id: "pancreatite-aguda",
      label: "Pancreatite aguda",
      texto: `Pâncreas de contornos irregulares e parcialmente obscurecidos, com hipoecogenicidade textural e dimensões
aumentadas, medindo a cabeça: * cm (normal < 3,3 cm), corpo: * cm (normal < 2,2 cm) e cauda: * cm (normal < 2,8 cm).
Ducto de Wirsung de calibre preservado.`,
      impressao: `Imagem sugestiva de alteração parenquimatosa pancreática. Considerar possibilidade de pancreatite aguda.`,
    },
    {
      id: "pancreatopatia-cronica",
      label: "Pancreatopatia crônica",
      texto: `Pâncreas de dimensões n ormais, com contornos lobulados e focos irregulares de calcificaç ões, medindo até cm, nas
regiões da cabeça e corpo.
Ducto de Wirsung ectasiado, com calibre de cm de aspecto levemente tortuoso.`,
      impressao: `Imagem sugestiva de pancreatopatia crônica.`,
    },
    {
      id: "pancreas-gorduroso",
      label: "Pâncreas gorduroso",
      texto: `Pâncreas de morfologia, contornos e dimensões normais, com aumento difuso de sua ecogenicidade.`,
      impressao: `Imagem sugestiva de infiltração gordurosa pancreática.`,
    },
    {
      id: "tumor-de-cabeca-de-pancreas",
      label: "Tumor de cabeça de pâncreas",
      texto: `Vias biliares intra-hepáticas de calibres aumentados, medindo * cm à esquerda e * cm à direita (normal < 0,25 cm).
Hepatocolédoco de calibre aumentado, medindo * cm, apresentando a cerca de cm da porta hepatis, afilamento gradual,
em " bico de pássaro ", à medida que se relaciona com uma massa sólida na topografia da cabeça p ancreática, de
contornos regulares e parcialmente obscurecidos, heterogênea, com fluxo periférico ao Doppler, medindo cm.
Cauda pancreática não visibilizada devido à sobreposição gasosa.
Ducto de Wirsung de calibre aumentado, medindo * cm (normal < 0,2 cm).

Vesícula biliar hiperdistendida, medindo cm, com paredes finas e lisas.
Conteúdo vesicular anecóide e não apresentando cálculos.
Sinal de Murphy ultrassonográfico negativo.`,
      impressao: `Imagem sugestiva de massa sólida na topografia da cabeça pancreática com dilatação de vias biliar es intra e extra-hepáticas.`,
    },
  ],
  "abdome::retroperitonio": [
    {
      id: "linfonodomegalia",
      label: "Linfonodomegalia",
      texto: `Linfonodomegalias * de contornos bem definidos, hiperecogênicas, com perda da relação córtico -hilar, algumas
confluentes, sem sinais de degeneração cístico-necrótica, medindo até * cm na cadeia *.
Linfonodomegalias * de contornos bem definidos, hiperecogênicas, com perda da relação córtico -hilar, algumas
confluentes e com áreas císticas, sugerindo degeneração cístico-necrótica, caracterizadas assim:
Retroperitoniais:

Intraperitoniais:
Regiões inguinais:`,
      impressao: `Imagem sugestiva de linfonodomegalias. Considerar possibilidade de doença linfoproliferativa.`,
    },
  ],
  "abdome::vesicula": [
    {
      id: "barro-biliar",
      label: "Barro biliar",
      texto: `Vesícula biliar normodistendida, com paredes finas e lisas, apresentando conteúdo hip oecogênico com nível líquido -
líquido, correspondendo a barro biliar.
Sinal de Murphy ultrassonográfico negativo.`,
      impressao: `Imagem sugestiva de barro biliar.`,
    },
    {
      id: "colecistectomia",
      label: "Colecistectomia",
      texto: `Hepatocolédoco de calibre normal, medindo cm ao nível da porta hepatis.
Vesícula biliar não caracterizada (status pós-operatório).`,
      impressao: `Imagem sugestiva de colecistectomia.`,
    },
    {
      id: "colecistite-litiasica",
      label: "Colecistite litiásica",
      texto: `Vesícula biliar hiperdistendida, medindo * cm (normal < 10 ,0 x 4 ,0 cm), com paredes espessad as e delaminadas, medindo cm
(normal < 0,4 cm), apresentando conteúdo hipoecogênico com nível líquido -líquido, correspondendo a barro biliar, associado a
múltiplos/alguns cálculos providos de sombra acústica posterior, o maior medindo * cm.
Sinal de Murphy ultrassonográfico positivo.`,
      impressao: `Imagem sugestiva de colecistite litiásica.`,
    },
    {
      id: "colecistite-litiasica-boderline",
      label: "Colecistite litiásica boderline",
      texto: `Vesícula biliar discretamente distendida, medindo * cm, com paredes de espessura limítr ofe, medindo 0,4 cm,
apresentando conteúdo anecóide com múltiplas /algumas imagens nodulares, hiperecogênicas, provida s de sombra
acústica posterior, a maior medindo * cm, correspondendo a cálculos.
Sinal de Murphy ultrassonográfico positivo.`,
      impressao: `Imagem sugestiva de colelitíase. Necessário correlação clínico-laboratorial para avaliar possibilidade de colecistite em estágio inicial.`,
    },
    {
      id: "colelitiase-e-barro-biliar",
      label: "Colelitíase e barro biliar",
      texto: `Vesícula biliar normodistendida, de paredes finas e lisas, apresentando conteúdo hipoecogênico com nível líquido -líquido,
correspondendo a barro biliar, associado a pelo menos uma imagem nodular, hiperecogênica, provida de sombra acústi ca
posterior, medindo * cm, correspondendo a cálculo.
Sinal de Murphy ultrassonográfico negativo.`,
      impressao: `Imagem sugestiva de colelitíase com barro biliar.`,
    },
    {
      id: "colelitiase-multipla",
      label: "Colelitíase múltipla",
      texto: `Vesícula biliar normodistendida, com paredes finas e lisas, apresentando conteúdo anecóide com múltiplas /algumas
imagens nodulares, hiperecogênicas, providas de sombra acústica posterior, móveis à mudança de decúbito, a maior
medindo * cm, correspondendo a cálculos.
Sinal de Murphy ultrassonográfico negativo.`,
      impressao: `Imagem sugestiva de colelitíase.`,
    },
    {
      id: "colelitiase-uma",
      label: "Colelitíase uma",
      texto: `Vesícula biliar normodistendida, com paredes finas e lisas, apresentando conteúdo anecóide com imagem nodular,
hiperecogênica, provida de sombra acústica poste rior, móvel à mudança de decúbito, medindo * cm, correspondendo a
cálculo.
Sinal de Murphy ultrassonográfico negativo.`,
      impressao: `Imagem sugestiva de colelitíase.`,
    },
    {
      id: "colelitiase-com-vesicula-escleroatrofica",
      label: "Colelitíase com vesícula escleroatró…",
      texto: `Vesícula biliar hipodistendida, de paredes aparentemente finas, com seu interior ocupado por imagem hiperecogênica,
provida de sombra acústica posterior, medindo cerca de * cm, podendo corresponder cálculo/cálculos.
Sinal de Murphy ultrassonográfico negativo.`,
      impressao: `Imagem sugestiva de colelitíase com sinais de vesícula biliar escleroatrófica.`,
    },
    {
      id: "colesterolose",
      label: "Colesterolose",
      texto: `Vesícula biliar normodistendida, com paredes finas apresentando pequenos focos hiperecogênicos de artefatos em "cauda
de cometa", medindo até 0,2 cm, podendo corresponder a colesterolose.
Conteúdo vesicular anecóide e não apresentando cálculos.
Sinal de Murphy ultrassonográfico negativo.`,
      impressao: `Imagem sugestiva de colesterolose vesicular.`,
    },
    {
      id: "colesterolose-adenomiomatose",
      label: "Colesterolose/adenomiomatose",
      texto: `Vesícula biliar normod istendida, com paredes difusamente espessas e irregulares , medindo até cm (normal < 0,4 cm) e áreas
hipoecogênicas evaginadas a partir da mucosa na parede muscular, podendo corresponder a adenomiomatose com seios
de Rokitansky-Aschoff (divertículos intra-murais).
colesterolose.
Conteúdo vesicular anecóide e não apresentando cálculos.
Sinal de Murphy ultrassonográfico negativo.`,
      impressao: `Imagem sugestiva de colesterolose/adenomiomatose vesicular.`,
    },
    {
      id: "polipo-vesicular",
      label: "Pólipo vesicular",
      texto: `Vesícula biliar normodistendida e com paredes finas apresentando na região fúndica imagem nodular, sólida,
hiperecogênica, de aspecto polipóide, com contornos regulares, imóvel à mudança de decúbito, medindo cm.
Conteúdo vesicular anecóide e não apresentando cálculos.`,
      impressao: `Imagem sugestiva de imagem nodular intra-vesicular. Considerar possibilidade de pólipo vesicular.`,
    },
  ],
  "abdome::vias-biliares": [
    {
      id: "coledocolitiase",
      label: "Coledocolitíase",
      texto: `Vias biliares intra-hepáticas levemente dilatadas, medindo * cm à esquerda e * cm à direita (normal < 0,25 cm).
cálculo impactado, promovendo dilatação à montante, com hepatocolédoco medindo * cm de calibre.

Vesícula biliar hiperdistendida, medindo * cm, com paredes finas e lisas, apresentando conteúdo anecóide com múltiplas
pequenas imagens nodulares, hiperecogênicas, com diâmetro médio de * cm, correspondendo a microcálculos.
Sinal de Murphy ultrassonográfico positivo.

Pâncreas de morfologia, contornos, dimensões e ecotextura normais. Ducto de Wirsung de calibre preservado.
Hepatocolédoco visibilizado até aproximadamente cm da porta hepatis , devido a sobreposição gasosa, de calibre
aumentado, medindo * cm.
Pâncreas de morfologia, contornos, dimensões e ecotextura normais. Ducto de Wirsung de calibre preservado.`,
      impressao: `Imagem sugestiva de colelitíase.`,
    },
    {
      id: "derivacao-bilio-digestiva",
      label: "Derivação bílio-digestiva",
      texto: `Vias biliares intra-hepáticas de calibres normais com alguns focos ecogênicos de artefatos em “cauda de cometa” nas vias
biliares principais e secundárias, sugerindo aerobilia.
Hepatocolédoco de calibre aumentado, medindo cm ao nível da porta hepatis, visibilizado até ao nível da junção colédoco-
intestinal, sem sinais de fatores obstrutivos.`,
      impressao: `Imagem sugestiva de derivação bílio-digestiva com aerobilia leve.`,
    },
  ],
  "bolsa::testiculo": [
    {
      id: "cisto-testicular",
      label: "Cisto testicular",
      texto: `imagem cística anecoica, de paredes finas e reforço acústico posterior, medindo ____ cm`,
      impressao: `Imagem sugestiva de cisto testicular à direita/esquerda.`,
    },
    {
      id: "nodulo-testicular",
      label: "Nódulo testicular",
      texto: `imagem nodular sólida, de contornos bem definidos/regulares, conteúdo hipoecogênico/isoecogênico, medindo ____ cm`,
      impressao: `Imagem sugestiva de nódulo testicular à direita/esquerda.`,
    },
    {
      id: "microlitiase",
      label: "Microlitíase",
      texto: `pequenos focos hiperecogênicos, desprovidos de sombra acústica posterior, distribuídos esparsamente (microlitíase)`,
      impressao: `Imagem sugestiva de microlitíase testicular à direita/esquerda.`,
    },
    {
      id: "ectasia-da-rete-testis",
      label: "Ectasia da rete testis",
      texto: `imagens tubulares anecóicas na região do mediastino testicular, sem fluxo ao Doppler, com calibre de até ____ cm (ectasia da rete testis)`,
      impressao: `Imagem sugestiva de ectasia da rete testis à direita/esquerda.`,
    },
    {
      id: "massa-testicular",
      label: "Massa testicular",
      texto: `formação expansiva sólida/mista, de contornos ____, medindo ____ cm`,
      impressao: `Imagem sugestiva de massa testicular à direita/esquerda.`,
    },
    {
      id: "orquite",
      label: "Orquite",
      texto: `ORQUITE_PLACEHOLDER`,
      impressao: `Sinais sugestivos de orquite à direita/esquerda.`,
    },
    {
      id: "torcao-testicular",
      label: "Torção testicular",
      texto: `TORCAO_PLACEHOLDER`,
      impressao: `Imagem sugestiva de torção testicular à direita/esquerda.`,
    },
  ],
  "bolsa::epididimo": [
    {
      id: "cisto-epididimario",
      label: "Cisto epididimário",
      texto: `Identifica-se cisto epididimário, anecoico, bem circunscrito, medindo ____ cm.`,
      impressao: `Imagem sugestiva de cisto epididimário à direita/esquerda.`,
    },
    {
      id: "epididimite",
      label: "Epididimite",
      texto: `EPIDIDIMITE_PLACEHOLDER`,
      impressao: `Sinais sugestivos de epididimite à direita/esquerda.`,
    },
  ],
  "bolsa::bolsa": [
    {
      id: "hidrocele",
      label: "Hidrocele",
      texto: `Presença de líquido livre peri-testicular de aspecto anecóico, compatível com hidrocele.`,
      impressao: `Imagem sugestiva de hidrocele à direita/esquerda.`,
    },
    {
      id: "hematoma-bolsa-escrotal",
      label: "Hematoma",
      texto: `Identifica-se coleção heterogênea adjacente ao testículo, sem fluxo ao Doppler, sugerindo hematoma, medindo ____ cm.`,
      impressao: `Imagem sugestiva de hematoma da bolsa escrotal à direita/esquerda.`,
    },
  ],
  "bolsa::plexo": [
    {
      id: "varicocele",
      label: "Varicocele",
      texto: `Dilatação e tortuosidade dos vasos do plexo pampiniforme, medindo em repouso ____ cm (normal < 0,2–0,3 cm) e acentuando-se com Valsalva, alcançando ____ cm, com refluxo ao Doppler colorido.`,
      impressao: `Imagem sugestiva de varicocele à direita/esquerda.`,
    },
  ],
  "carotidas::achados": [
    {
      id: "criterios-para-diagnostico-de-estenose-de-carotida",
      label: "Critérios para diagnóstico de esteno…",
      texto: `PARÂMETROS PRIMÁRIOS PARÂMETROS ADICIONAIS
Grau de
estenose`,
      impressao: `Imagem sugestiva de critérios para diagnóstico de estenose de carótida.`,
    },
    {
      id: "vps-aci",
      label: "Vps-aci",
      texto: `(cm/s)
Estimativa da
placa %
Razão VPS`,
      impressao: `Imagem sugestiva de vps-aci.`,
    },
    {
      id: "aci-acc",
      label: "Aci/ACC",
      texto: `VDF-ACI
(cm/s)
Normal < 125 Não há placa < 2,0 < 40
Menor 50% < 125 < 50% < 2,0 < 40
50-69% 125-230 ≥ 50 2,0-4,0 40-100
Maior ou =
70% > 230 ≥ 50 > 4,0 > 100
Sub-oclusão Indefinida Visível Variável Variável
Oclusão Indetectável Lúmen
indetectável Não se aplica Não se
aplica
* Estimativa aproximada de estenose através do modo B e Doppler colorido.
Ref: Society of Radiologists in Ultrasound Consensus Conference - 2003.`,
      impressao: `Imagem sugestiva de aci/acc.`,
    },
    {
      id: "espessamento-medio-intimal",
      label: "Espessamento médio-intimal",
      texto: `A artéria carótida comum apresenta diâmetro normal. Presença de espessamento médio -intimal. Ao Doppler observa -se curva
espectral de amplitude normal, sem turbulência e aceleração.

Referência:
Valores de espessura médio-intimal das artérias carótidas comuns por sexo e idade do(a) paciente estudado(a) segundo o Multi-Ethnic Study of Atherosclerosis Risk
in Communities Study (Robin L. McClelland, PhD, 2007):
Valores de referência (provavelmente sem elevação de risco):`,
      impressao: `Imagem sugestiva de espessamento médio-intimal da artéria carótida comum.`,
    },
    {
      id: "placa-aterosclerotica-nao-complicada",
      label: "Placa aterosclerótica não complicada",
      texto: `Bulbo carotídeo apresentando placa aterosclerótica de aspecto calcificado, com superfície regular.`,
      impressao: `Imagem sugestiva de placa aterosclerótica não complicada.`,
    },
    {
      id: "placa-aterosclerotica-complicada",
      label: "Placa aterosclerótica complicada",
      texto: `Bulbo carotídeo apresentando placa aterosclerótica heterogênea, com predomínio hipoecóico, superfície irregular, calcificações
focais e área anecóica central.`,
      impressao: `Imagem sugestiva de placa aterosclerótica complicada.`,
    },
    {
      id: "estenose-50-acc",
      label: "Estenose < 50% ACC",
      texto: `Artéria carótida comum apresenta diâmetro reduzido por placa aterosclerótica excêntrica, homogênea, com s uperfície regular. A
avaliação do grau de estenose através de medida de diâmetro em varredura transversa mostra redução de cerca de 30 a 40%. Ao
Doppler observa-se curva espectral de amplitude normal, sem turbulência e aceleração.`,
      impressao: `Imagem sugestiva de estenose inferior a 50% da artéria carótida comum.`,
    },
    {
      id: "estenose-da-arteria-carotida-interna",
      label: "Estenose da artéria carótida interna",
      texto: `A artéria carótida interna apresenta diâmetro reduzido por placa aterosclerótica concêntrica, heterogênea, com predomínio
hipoecóico, superfície irregular, calcificações focais e área anecóic a central. Ao Doppler observa -se curva de amplitude aumentada
e alargamento espectral.`,
      impressao: `Imagem sugestiva de estenose inferior a 50% da artéria carótida interna.`,
    },
    {
      id: "estenose-da-arteria-carotida-externa",
      label: "Estenose da artéria carótida externa",
      texto: `A artéria carótida externa apresenta diâmetro reduzido por placa aterosclerótica heterogênea. Ao Doppler observa -se curva de
amplitude aumentada e alargamento espectral.`,
      impressao: `Imagem sugestiva de estenose inferior a 50% da artéria carótida externa.`,
    },
    {
      id: "sub-oclusao-da-arteria-carotida-interna",
      label: "Sub-oclusão da artéria carótida inte…",
      texto: `A artéria carótida interna apresenta diâmetro acentuadamente reduzido por placa aterosclerótica concêntrica, heterogênea, com
predomínio hipoecóico, superfície i rregular, calcificações focais e área anecóica central. Ao Doppler observa -se curva de amplitude
reduzida e alargamento espectral.`,
      impressao: `Imagem sugestiva de achados compatíveis com sub-oclusão da artéria carótida interna.`,
    },
    {
      id: "oclusao-da-arteria-carotida-interna",
      label: "Oclusão da artéria carótida interna",
      texto: `A artéria carótida co mum apresenta aspecto morfológico normal. Ao Doppler observa -se curva espectral de amplitude reduzida,
com componente reverso e ausência de componente telediastólico (padrão de resistência elevada).
A artéria carótida interna apresenta preenchimento lumina l por placa aterosclerótica heterogênea, com componente hipoecóico
compatível com trombo. Não foi detectado sinal Doppler neste vaso.`,
      impressao: `Imagem sugestiva de achados compatíveis com oclusão da artéria carótida interna.`,
    },
    {
      id: "acotovelamento-kinking-da-arteria-carotida-interna",
      label: "Acotovelamento (“kinking”) da artéri…",
      texto: `A a rtéria carótida interna apresenta diâmetro normal. Não se observam placas ateroscleróticas significativas em seu segmento
proximal. Presença de acotovelamento em ângulo reto localizado em seu segmento médio.`,
      impressao: `Imagem sugestiva de acotovelamento da artéria carótida interna.`,
    },
  ],
  "cervical::linfonodos": [
    {
      id: "linfonodomegalias-cervicais",
      label: "Linfonodomegalias cervicais",
      texto: `Múltiplas adenomegalias, de contornos bem definidos, hiperecogênicas, com perda da diferenciação córtico -hilar, algumas
de aspecto confluente e com áreas císticas de permeio, sugerindo degeneração cístico -necrótica, caracterizadas assim:
À direita:
Múltiplos linfo nodos aumentados, de morfologia preservada, hipoecogênicos, com mediastino ecogênico, sem sinais de
degeneração cístico-necrótica, nas cadeias:
À direita:
À esquerda:`,
      impressao: `Imagem sugestiva de cervical anterior (VI/III), medindo até  cm.`,
    },
  ],
  "cotovelo::achados": [
    {
      id: "epicondilite-lateral",
      label: "Epicondilite lateral (tennis elbow)",
      texto: `Tendão comum dos extensores (origem do ECRB) com espessura aumentada, hipoecogenicidade e perda do padrão fibrilar na origem no epicôndilo lateral, aspectos sugestivos de epicondilite lateral.`,
      impressao: `Imagem sugestiva de epicondilite lateral (tendinopatia do tendão comum dos extensores).`,
    },
    {
      id: "lesao-lucl",
      label: "Lesão do complexo LUCL",
      texto: `Complexo ligamentar colateral lateral (LUCL) com irregularidade/descontinuidade fibrilar, avaliado com manobra de estresse em varo.`,
      impressao: `Imagem sugestiva de lesão do complexo ligamentar colateral lateral (LUCL).`,
    },
    {
      id: "epicondilite-medial",
      label: "Epicondilite medial (golfer's elbow)",
      texto: `Origem comum dos flexores-pronadores no epicôndilo medial com espessamento e hipoecogenicidade, aspectos sugestivos de epicondilite medial.`,
      impressao: `Imagem sugestiva de epicondilite medial.`,
    },
    {
      id: "lesao-lcu",
      label: "Lesão do ligamento colateral ulnar (LCU)",
      texto: `Ligamento colateral ulnar (feixe anterior) com irregularidade/descontinuidade fibrilar. Avaliado com manobra de estresse em valgo.`,
      impressao: `Imagem sugestiva de lesão do ligamento colateral ulnar (LCU).`,
    },
    {
      id: "tendinopatia-biceps",
      label: "Tendinopatia do bíceps distal",
      texto: `Tendão do bíceps braquial distal com espessamento e alteração da ecotextura fibrilar antes da inserção.`,
      impressao: `Imagem sugestiva de tendinopatia do bíceps braquial distal.`,
    },
    {
      id: "ruptura-biceps",
      label: "Ruptura do bíceps distal",
      texto: `Tendão do bíceps braquial distal com descontinuidade fibrilar parcial/total e retração do coto proximal às manobras dinâmicas.`,
      impressao: `Imagem sugestiva de ruptura do tendão do bíceps braquial distal.`,
    },
    {
      id: "bursite-bicipitorradial",
      label: "Bursite bicipitorradial",
      texto: `Bursa bicipitorradial distendida por líquido entre o tendão do bíceps e a tuberosidade do rádio, medindo ____ cm.`,
      impressao: `Imagem sugestiva de bursite bicipitorradial.`,
    },
    {
      id: "bursite-olecraniana",
      label: "Bursite olecraniana",
      texto: `Bursa olecraniana distendida por líquido anecóide/heterogêneo, medindo ____ cm (L × AP × T), aspectos sugestivos de bursite olecraniana.`,
      impressao: `Imagem sugestiva de bursite olecraniana.`,
    },
    {
      id: "tendinopatia-triceps",
      label: "Tendinopatia / ruptura do tríceps",
      texto: `Tendão do tríceps braquial na inserção olecraniana com espessamento/hipoecogenicidade e/ou descontinuidade fibrilar.`,
      impressao: `Imagem sugestiva de tendinopatia/ruptura do tríceps braquial.`,
    },
    {
      id: "neuropatia-ulnar",
      label: "Neuropatia do nervo ulnar (túnel cubital)",
      texto: `Nervo ulnar no túnel cubital com aumento do calibre (área transversal ____ mm²), aspectos sugestivos de neuropatia compressiva.`,
      impressao: `Imagem sugestiva de neuropatia do nervo ulnar no túnel cubital.`,
    },
    {
      id: "luxacao-nervo-ulnar",
      label: "Subluxação / luxação do nervo ulnar",
      texto: `À manobra de flexão do cotovelo observa-se subluxação/luxação do nervo ulnar sobre o epicôndilo medial.`,
      impressao: `Imagem sugestiva de subluxação/luxação do nervo ulnar à manobra de flexão.`,
    },
    {
      id: "sindrome-pronador",
      label: "Síndrome do pronador / interósseo anterior",
      texto: `Achados na região anterior proximal compatíveis com compressão do nervo mediano/interósseo anterior (síndrome do pronador). Correlacionar clinicamente.`,
      impressao: `Achados sugestivos de síndrome do pronador redondo / interósseo anterior.`,
    },
    {
      id: "derrame-sinovite",
      label: "Derrame articular / sinovite",
      texto: `Derrame articular leve/moderado/acentuado nos recessos do cotovelo, com ou sem espessamento sinovial.`,
      impressao: `Imagem sugestiva de derrame articular/sinovite no cotovelo.`,
    },
    {
      id: "calcificacoes-corpos-livres",
      label: "Calcificações / corpos livres",
      texto: `Calcificações intratendíneas e/ou corpos livres intra-articulares, medindo até ____ cm.`,
      impressao: `Imagem sugestiva de calcificações e/ou corpos livres no cotovelo.`,
    },
  ],
  "joelho::achados": [
    {
      id: "bursite",
      label: "Bursite",
      texto: `Bursa supra-patelar/pré-patelar/infra-patelar/pré-tibial/da Pata de Ganso apresentando-se distendida por líquido com
aspecto anecóide e homogêneo, medindo cerca de cm (L x AP x T), com volume estimado de cm³.`,
      impressao: `Imagem sugestiva de bursite supra-patelar/pré-patelar/infra-patelar/pré-tibial/da Pata de Ganso.`,
    },
    {
      id: "cisto-de-baker",
      label: "Cisto de baker",
      texto: `com colo de comunicação articular entre o tendão do semi -membranoso e o músculo gastrocnêmio medial, medindo cm
(L x AP x T).`,
      impressao: `Imagem sugestiva de cisto de Baker.`,
    },
    {
      id: "derrame-articular",
      label: "Derrame articular",
      texto: `Derrame articular leve/moderado/acentuado na topografia supra-patelar com aspecto anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de derrame articular leve/moderado/acentuado.`,
    },
    {
      id: "derrame-articular-com-proliferacao-sinovial",
      label: "Derrame articular com proliferação s…",
      texto: `Derrame articular leve/moderado/acentuado na topografia supra-patelar com aspecto anecóide e moderados debris associado a proliferação sinovial.
reumatológica.`,
      impressao: `Imagem sugestiva de derrame articular leve/moderado/acentuado com proliferação sinovial. Considerar possibilidade de doença.`,
    },
    {
      id: "osteoartrose",
      label: "Osteoartrose",
      texto: `Cartilagem articular difusamente espessada, com borramento dos contornos e irregularidad e da superfície óssea
adjacente: fêmur-tibial, fêmur-fibular e patelar.`,
      impressao: `Imagem sugestiva de osteoartrose no joelho.`,
    },
    {
      id: "osteoartrose-com-derrame-articular",
      label: "Osteoartrose com derrame articular",
      texto: `Derrame articular supra-patelar leve/moderado com aspecto anecóide e homogêneo.
Cartilagem articular difusamente espessada, com borramento dos contornos e irregular idade da superfície óssea
adjacente fêmur-tibial e fêmur-fibular.`,
      impressao: `Imagem sugestiva de osteoartrose com derrame articular leve/moderado.`,
    },
    {
      id: "osteocondroma",
      label: "Osteocondroma",
      texto: `apresentando cortical aparentemente contínua com a do osso subjacente . Observa -se ainda capa hipoecogênica
envolvendo a estrutura com espessura de cm (normal em adultos: 1 - 3 mm), sugerindo envoltório cartilaginoso.
e/ou TC.`,
      impressao: `Imagem sugestiva de projeção óssea na metáfise tibial. Considerar possibilidade de osteocondroma. À critério clínico, correlacionar com RX.`,
    },
    {
      id: "tendinite-quadriceps",
      label: "Tendinite quadríceps",
      texto: `Tendão do músculo quadríceps de espessura levemente aumentada com hipoecogenicidade textural em sua inserção
distal no osso patelar.`,
      impressao: `Imagem sugestiva de tendinopatia quadriciptal.`,
    },
    {
      id: "tendinite-patelar",
      label: "Tendinite patelar",
      texto: `Tendão patelar aumentado de calibre em sua inserção distal, medindo até cm de espessura, com hipoecogenicidade
textural local.`,
      impressao: `Imagem sugestiva de tendinopatia patelar.`,
    },
    {
      id: "tendinite-biceps-femoral",
      label: "Tendinite bíceps femoral",
      texto: `Tendão do bíceps femoral aumentado de calibre em sua inserção distal na epífise fibular, com hipoecogenicidade textural
local.`,
      impressao: `Imagem sugestiva de tendinopatia do bíceps femoral.`,
    },
    {
      id: "tendinite-pata-de-ganso",
      label: "Tendinite pata de ganso",
      texto: `Tendões componentes da "pata de ganso" (sartório, grácil e semitendinoso) aumentados de calibre em sua inserção distal
na tíbia, com hipoecogenicidade textural local.`,
      impressao: `Imagem sugestiva de tendinopatia da pata de ganso.`,
    },
    {
      id: "tendinose-quadriceps",
      label: "Tendinose quadríceps",
      texto: `Tendão do músculo quadríceps aumentado de calibre em sua inserção dist al no osso patelar , com heterogeneidade
textural e focos ecogênicos de fibrose/calcificação e anecóicos de necrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose quadriciptal.`,
    },
    {
      id: "tendinose-patelar",
      label: "Tendinose patelar",
      texto: `Tendão patelar aumentado de calibre em sua inserção distal, com hipoecogenicidade textural e focos ecogênicos de
fibrose/calcificação e anecóicos de necrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose patelar.`,
    },
    {
      id: "tendinose-biceps-femoral",
      label: "Tendinose bíceps femoral",
      texto: `Tendão do bíceps femoral aumentado de calibre em sua inserção distal na epífise fibular, com hipoeco genicidade textural
e focos ecogênicos de fibrose/calcificação e anecóicos de necrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose do bíceps femoral.`,
    },
    {
      id: "tendinose-pata-de-ganso",
      label: "Tendinose pata de ganso",
      texto: `Tendões componentes da "pata de ga nso" (sartório, grácil e semitendinoso) aumentados de calibre em sua inserção distal
na tibia, com hipoecogenicidade textural e focos ecogênicos de fibrose/calcificação e anecóicos de nec rose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose da “pata de ganso”.`,
    },
    {
      id: "osteocondrose-osgood-schlatter",
      label: "Osteocondrose: osgood-schlatter",
      texto: `Tendão patelar de espessura aumentada com hipoecogenicidade textural no seu terço distal onde observa -se
fragmentação da apófise na tuberosidade anterior da tíbia, medindo até cm longitudinal.
Coxim gorduroso infra-patelar (gordura de Hoffa) levemente edemaciada.
Pequena quantidade de líquido na bursa infra-patelar com aspecto anecóide e homogêneo.
patelar. Considerar possibilidade de Osgood-Schlatter.
adjacente.`,
      impressao: `Imagem sugestiva de fragmentação da apófise na tuberosidade anterior da tíbia com processo inflamatório agudo distal do tendão.`,
    },
    {
      id: "osteocondrose-sinding-larsen-joharsson",
      label: "Osteocondrose: sinding-larsen-johars…",
      texto: `Fragmentação da superfície anterior do osso patelar , medindo até cm longitudinal, associado a aumento da espessura
com hipoecogenicidade textural local do tendão patelar.
Coxim gorduroso infra-patelar (gordura de Hoffa) levemente edemaciada.
possibilidade de Sinding-Larsen-Joharsson.
Irregularidade da superfície anterior do osso patelar sem sinais de tendinopatia adjacente.
Joharsson.`,
      impressao: `Imagem sugestiva de irregularidade da superfície anterior da patela com processo inflamatório agudo proximal do tendão patelar. Considerar.`,
    },
    {
      id: "pellegrini-stieda",
      label: "Pellegrini-stieda",
      texto: `Ligamento colateral medial de espessura aumentada com hipoecogenicidade textural difusa e foco de calcificação regular
medindo cm. Nota -se ainda área de descontinuidade parcial insercional de suas fibras proximais, medindo cm
longitudinal e cm transversal.`,
      impressao: `Imagem sugestiva de doença ligamentar do colateral medial com área de ruptura parcial (Síndrome de Pellegrini-Stieda).`,
    },
    {
      id: "ruptura-parcial-tendinea",
      label: "Ruptura parcial tendínea",
      texto: `Tendão * apresentando descontinuidade parcial na topografia do corpo/inserção , medindo cm longitudinal x cm
transversal com preenchimento da área rota por efusão líquida hemorrágica.`,
      impressao: `Imagem sugestiva de ruptura parcial/total do tendão quadríceps.`,
    },
    {
      id: "ruptura-total-tendinea",
      label: "Ruptura total tendínea",
      texto: `Tendão * apresentando descontinuidade total na topografia do corpo/inserção , com distância entre os fragmentos de cm e
preenchimento da área rota por efusão líquida hemorrágica.`,
      impressao: `Imagem sugestiva de ruptura total do tendão *.`,
    },
    {
      id: "ruptura-parcial-quadriceps",
      label: "Ruptura parcial quadríceps",
      texto: `Tendão do músculo quadríceps com seus componentes (reto anterior, vastos medial, lateral e intermédio) apresentando
descontinuidade parcial na topografia do corpo/inserção , medindo cm lon gitudinal x cm transversal com preenchimento
da área rota por efusão líquida hemorrágica.`,
      impressao: `Imagem sugestiva de ruptura parcial/total do tendão quadríceps.`,
    },
    {
      id: "ruptura-total-quadriceps",
      label: "Ruptura total quadríceps",
      texto: `Tendão do músculo quadríceps com seus componentes (reto anterior, vastos medial, la teral e intermédio) apresentando
descontinuidade total na topografia do corpo/inserção , com distância entre os fragmentos de cm e preenchimento da área
rota por efusão líquida hemorrágica.`,
      impressao: `Imagem sugestiva de ruptura total do tendão quadríceps.`,
    },
    {
      id: "ruptura-de-menisco",
      label: "Ruptura de menisco",
      texto: `hipoecogenicidade textural e área de descontinuidade na base/ápice.
hipoecogenicidade textural e protrusão meniscal promovendo abaulamento do ligamento colateral medial/lateral .`,
      impressao: `Sinais sugestivos de ruptura meniscal.`,
    },
  ],
  "axilas::achados": [
    {
      id: "linfadenite-reacional",
      label: "Linfadenite reacional",
      texto: `Identificam-se linfonodos aumentados de aspecto reacional, com morfologia ovalada, espessamento cortical homogêneo e hilo gorduroso central preservado, o maior medindo ____ cm.`,
      impressao: `Imagem sugestiva de linfadenite reacional axilar à direita/esquerda.`,
    },
    {
      id: "linfonodopatia-pos-vacinal",
      label: "Linfonodopatia pós-vacinal",
      texto: `Identificam-se linfonodos aumentados e hipercorticais, sugestivos de linfonodopatia pós-vacinal, o maior medindo ____ cm.`,
      impressao: `Imagem sugestiva de linfonodopatia axilar pós-vacinal à direita/esquerda.`,
    },
    {
      id: "abscesso-axilar",
      label: "Abscesso axilar",
      texto: `Identifica-se coleção líquida loculada, com paredes espessadas e hiperemia periférica ao Doppler, compatível com abscesso axilar, medindo ____ cm.`,
      impressao: `Imagem sugestiva de abscesso axilar à direita/esquerda.`,
    },
    {
      id: "linfadenite-tuberculosa",
      label: "Linfadenite tuberculosa",
      texto: `Linfonodos aumentados, com áreas hipoecoicas/císticas internas sugestivas de necrose caseosa, podendo coalescer, aspectos compatíveis com linfadenite tuberculosa (escrófula), o maior medindo ____ cm.`,
      impressao: `Imagem sugestiva de linfadenite tuberculosa axilar à direita/esquerda.`,
    },
    {
      id: "hidradenite-supurativa",
      label: "Hidradenite supurativa",
      texto: `Identificam-se múltiplos trajetos fistulosos, coleções profundas e/ou cicatrizes na topografia axilar, associados a linfonodos reacionais, aspectos sugestivos de hidradenite supurativa.`,
      impressao: `Imagem sugestiva de hidradenite supurativa axilar à direita/esquerda.`,
    },
    {
      id: "metastase-linfonodal",
      label: "Metástase linfonodal",
      texto: `Linfonodo(s) arredondado(s), com espessamento cortical difuso/excêntrico, perda ou substituição do hilo gorduroso e vascularização periférica/caótica ao Doppler, sugestivo(s) de metástase, o maior medindo ____ cm.`,
      impressao: `Imagem sugestiva de linfonodo(s) axilar(es) com características suspeitas para metástase à direita/esquerda.`,
    },
    {
      id: "linfoma",
      label: "Linfoma / pacote linfonodal",
      texto: `Linfonodos marcadamente aumentados, arredondados e hipoecoicos, podendo formar aglomerações (pacotes linfonodais), o maior medindo ____ cm. Correlacionar com hipótese de linfoma.`,
      impressao: `Imagem sugestiva de linfonodomegalia(s) axilar(es) exuberante(s) à direita/esquerda. Correlacionar com hipótese de linfoma.`,
    },
    {
      id: "suspeitos",
      label: "Linfonodos suspeitos",
      texto: `Linfonodo(s) axilar(es) com morfologia suspeita (arredondado, cortical espessada e/ou hilo apagado), medindo ____ cm. Correlacionar clinicamente.`,
      impressao: `Imagem sugestiva de linfonodo(s) axilar(es) suspeito(s) à direita/esquerda.`,
    },
    {
      id: "cisto-epidermoide",
      label: "Cisto epidermoide / inclusão",
      texto: `Identifica-se lesão cística bem circunscrita no subcutâneo, compatível com cisto epidermoide/de inclusão, medindo ____ cm.`,
      impressao: `Imagem sugestiva de cisto epidermoide/de inclusão na axila à direita/esquerda.`,
    },
    {
      id: "lipoma",
      label: "Lipoma",
      texto: `Identifica-se nódulo bem delimitado, com ecotextura semelhante à gordura subcutânea, compatível com lipoma, medindo ____ cm.`,
      impressao: `Imagem sugestiva de lipoma axilar à direita/esquerda.`,
    },
    {
      id: "hidradenoma-anexial",
      label: "Hidradenoma / tumor anexial",
      texto: `Identifica-se nódulo sólido na derme/subcutâneo, sugestivo de hidradenoma/tumor anexial, medindo ____ cm.`,
      impressao: `Imagem sugestiva de nódulo anexial (hidradenoma/tumor anexial) na axila à direita/esquerda.`,
    },
    {
      id: "trombose-veia-axilar",
      label: "Trombose veia axilar/subclávia",
      texto: `Veia axilar/subclávia sem compressibilidade, com material ecogênico luminal e ausência de fluxo ao Doppler, aspectos sugestivos de trombose.`,
      impressao: `Imagem sugestiva de trombose da veia axilar/subclávia à direita/esquerda.`,
    },
  ],
  "mama::achados": [
    {
      id: "abscesso",
      label: "Abscesso",
      texto: `espesso, às horas, medindo cerca de cm (vol: cm³), distando cm do mamilo e c m da pele.
processo inflamatório/infeccioso.`,
      impressao: `Imagem sugestiva de imagem cístico-espessa na mama *. Considerar possibilidade de abscesso mamário.`,
    },
    {
      id: "abscessos",
      label: "Abscessos",
      texto: `contornos irregulares, distribuídos assim:
sugerindo processo inflamatório/infeccioso.`,
      impressao: `Imagem sugestiva de imagens cístico-espessas na mama *. Considerar possibilidade de abscessos mamários.`,
    },
    {
      id: "cisto",
      label: "Cisto",
      texto: `Imagem cística circunscrita, de paredes finas e regulares, conteúdo anecóide homogêneo, com reforço acústico posterior,
às horas, medindo cm, distando cm do mamilo e cm da pele.`,
      impressao: `Imagem sugestiva de cisto mamário à.`,
    },
    {
      id: "cistos",
      label: "Cistos",
      texto: `Imagens císticas circunscritas, esparsas pela mama, de paredes finas e regulares, conteúdo anecóide homogêneo,
algumas com reforço acústico posterior, medindo até cm, às horas, distando cm do mamilo e cm da pele;
Imagens císticas circunscritas, de paredes finas e reg ulares, conteúdo anecóide homogêneo, algumas com reforço
acústico posterior, caracterizadas assim:`,
      impressao: `Imagem sugestiva de cistos mamários à.`,
    },
    {
      id: "cisto-espesso-nodulo",
      label: "Cisto espesso? nódulo?",
      texto: `nódulo?), homogêneo, com eixo maior paralelo à pele, sem fluxo ao Doppler, às horas, medindo cm, distando cm do
mamilo e mm da pele.`,
      impressao: `Imagem sugestiva de imagem nodular na mama *: Cisto espesso? Nódulo?.`,
    },
    {
      id: "ectasia-proeminencia-ductal",
      label: "Ectasia/proeminência ductal",
      texto: `Proeminência ductal retroareolar, com calibre de até 0,3 cm, de conteúdo anecóide e homogêneo.
Ectasia ductal retroareolar, com calibre de até * cm (normal < 0,3 cm), de conteúdo anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de ectasia/Proeminência ductal retroareolar bilateral.`,
    },
    {
      id: "ginocomastia",
      label: "Ginocomastia",
      texto: `Área hiperecogênica na região retroareolar, medindo cerca de cm, correspondendo a parênquima mamário.`,
      impressao: `Imagem sugestiva de ginecomastia direita/esquerda/bilateral.`,
    },
    {
      id: "implantes-mamarios",
      label: "Implantes mamários",
      texto: `Sinais de manipulação cirúrgica com implante mamário de aspecto íntegro.`,
      impressao: `Imagem sugestiva de implantes mamários de aspecto íntegros.`,
    },
    {
      id: "lipomastia",
      label: "Lipomastia",
      texto: `Componente adiposo exuberante ocupando o plano do subcutâneo retroa reolar.`,
      impressao: `Imagem sugestiva de lipomastia direita/esquerda/bilateral.`,
    },
    {
      id: "nodulo-bi-3",
      label: "Nódulo BI-3",
      texto: `Imagem sólida, ovalada, hipoecogênica, discretamente heterogênea, com eixo maior paralelo à pele, sem fluxo ao Doppler,
às horas, medindo cm, distando cm do mamilo e cm da pele.`,
      impressao: `Imagem sugestiva de nódulo mamário à  , sugestivo de fibroadenoma.`,
    },
    {
      id: "nodulo-bi-4",
      label: "Nódulo BI-4",
      texto: `Na alteração palpável evidenciou-se:
Imagem sólida, arredondada, de contornos circunscritos e reg ulares, conteúdo hipoecogênico , com eixo maior paralelo à
pele, fluxo periférico ao Doppler, às horas, medindo cm, distando cm do mamilo e cm da pele.`,
      impressao: `Imagem sugestiva de nódulo mamário à.`,
    },
    {
      id: "nodulos-bi-3",
      label: "Nódulos BI-3",
      texto: `Imagens sólidas ov aladas, algumas lobuladas, conteúdo hipoecogên ico, discretamente heterogêneo , com eixo maior
paralelo à pele, fluxo ausente ao Doppler, medindo até cm, às horas, distando cm do mamilo e cm da pele.

Imagens sólidas ovaladas, algumas lobuladas, conteúdo hipoecogên ico, discretamente heterogêneo , com eixo maior
paralelo à pele, fluxo ausente ao Doppler, caracterizadas assim:`,
      impressao: `Imagem sugestiva de nódulos mamários à , sugestivos de fibroadenomas.`,
    },
    {
      id: "nodulo-invasivo-bi-5",
      label: "Nódulo invasivo BI-5",
      texto: `Imagem nodular, sólida, hipoecogênica, provida de sombra acústica posterior, de contornos irregulares e parcialmente
obscurecidos, eixo maior perpend icular à pele, fluxo periférico e central ao Doppler, às horas, medindo cerca de cm
(radial x AP x anti-radial), distando cm do mamilo e cm da pele.

Linfonodomegalia axilar arredondada com perda da relação córtico-hilar, medindo cm.`,
      impressao: `Imagem sugestiva de linfonodomegalia axilar à .`,
    },
    {
      id: "massa-com-lesoes-satelites-multifocais",
      label: "Massa com lesões satélites multifocais",
      texto: `Massa sólida, hipoecogênica, provida de sombra acústica posterior, d e contornos irregulares e parcialmente
obscurecidos, eixo maior perpendicular à pele, fluxo periférico e central ao Doppler, às horas, medindo cerca de cm
(radial x AP x anti-radial), distando cm do mamilo e cm da pele.

menos de 5,0 cm, circunscritas e regulares, fluxo periférico ao Doppler, medindo em média cm, sugerindo lesões satélites.`,
      impressao: `Imagem sugestiva de massa mamária à  com nódulos satélites adjacentes: lesão multifocal?.`,
    },
  ],
  "mmii-arterial::achados": [
    {
      id: "estenose-50-afs",
      label: "Estenose > 50% AFS",
      texto: `ARTÉRIA FEMORAL SUPERFICIAL: pérvia.
sistólico dentro da normalidade (VPS: cm/s).
(VPS: cm/s), sugerindo estenose superior a 50%.

ARTÉRIA POPLÍTEA: pérvia. Curva monofásica com velocidade de pico sistólico reduzida (VPS: cm/s).
ARTÉRIA TIBIAL ANTERIOR: pérvia. Curva monofásica com velocidade de pico sistólico reduzida (VPS: cm/s).
ARTÉRIA TIBIAL POSTERIOR: pérvia. Curva monofásica com velocidade de pico sistólico reduzida (VPS: cm/s).
ARTÉRIA FIBULAR: pérvia. Curva monofásica com velocidade de pico sistólico reduzida (VPS: cm/s).
coxa.`,
      impressao: `Imagem sugestiva de porção proximal da coxa: A análise espectral revelou curva trifásica normocinética, de alta resistência com velocidade de pico.`,
    },
    {
      id: "encarceramento-popliteo",
      label: "Encarceramento poplíteo",
      texto: `Perda do padrão trifásico de fluxo nas artérias poplítea e tibial posterior durante a manobra de fle xão plantar do pé. Tal
achado, embora inespecífico, pode estar associado à síndrome do encarceramento poplíteo.`,
      impressao: `Imagem sugestiva de encarceramento poplíteo.`,
    },
  ],
  "mmii-venoso::achados": [
    {
      id: "refluxo-valvar-profundo",
      label: "Refluxo valvar profundo",
      texto: `Pérvias, incompetentes com refluxo valvar, de paredes finas e lisas. Compressibilidade preserv ada.`,
      impressao: `Imagem sugestiva de refluxo valvar profundo de veias ***.`,
    },
    {
      id: "refluxo-valvar-safena",
      label: "Refluxo valvar - safena",
      texto: `V. SAFENA MAGNA: Pérvia, incompetente com refluxo valvar nos segmentos ***.

for varicose vein surgery base on color Doppler ultrasound):
Normal (28,11%); Tipo I (0,71%): Peri-juncional; Tipo 2 (5,65%): Proximal; Tipo III (9,81%): Refluxo distal; Tipo IV (33,54%): Segmentar; Tipo Va (4,45%):
Multissegmentar com JSF competente; Tipo Vb (14,62%): Multissegmentar com JSF incompetente; Tipo VI (3,11%): Refluxo difuso.

NORMAL TIPO I TIPO II TIPO III TIPO IV TIPO Va TIPO Vb TIPO VI`,
      impressao: `Imagem sugestiva de incompetência de safena magna do tipo.`,
    },
    {
      id: "safenectomia",
      label: "Safenectomia",
      texto: `V. SAFENA MAGNA: Não caracterizada e toda sua extensão (status pós-operatório).
V. SAFENA MAGNA: Não caracterizada nos 2/3 proximais da coxa (status pós -operatório). Demais porções : Pérvia, de
paredes finas e lisas e com compressibilidade preservada.`,
      impressao: `Imagem sugestiva de safenectomia total (safena interna).`,
    },
    {
      id: "trombose-venosa-profunda-aguda",
      label: "Trombose venosa profunda aguda",
      texto: `De calibres aumentados com material hipoecóide no interior, não compressível, sem fluxo detectável ao Doppler.`,
      impressao: `Imagem sugestiva de trombose venosa profunda aguda de veias ***.`,
    },
    {
      id: "trombose-venosa-profunda-subaguda-cronica-nao-recanalizada",
      label: "Trombose venosa profunda subaguda/cr…",
      texto: `De calibres levemente aumentados com material hiperecogënico no interior, aderido à parede do vaso, não compressíveis ,
com pobres sinais de recanalização.`,
      impressao: `Imagem sugestiva de trombose venosa profunda de aspecto subagudo/crônico não recanalizadas de veias ***.`,
    },
    {
      id: "trombose-venosa-cronica-parcialmente-recanalizada",
      label: "Trombose venosa crônica parcialmente…",
      texto: `De calibres levemente reduzidos com material hiperecogënico e traves no interior, parcialmente compressíveis, de paredes
espessas e com sinais de recanalização parcial.`,
      impressao: `Imagem sugestiva de trombose venosa profunda crônica parcialmente recanalizada de veias ***.`,
    },
    {
      id: "tromboflebite",
      label: "Tromboflebite",
      texto: `V. SAFENA MAGNA /PARVA: De calibre aumentado com material hipoecóide no interior, não compressível , sem fluxo
detectável ao Doppler, se estendendo do ***.`,
      impressao: `Imagem sugestiva de tromboflebite de veia safena interna/externa na coxa/perna.`,
    },
    {
      id: "varicosidades",
      label: "Varicosidades",
      texto: `VARICOSIDADES: Presentes em coxa e perna.
VARICOSIDADES: Veias reticulares presentes em coxa e perna.`,
      impressao: `Imagem sugestiva de varicosidades em coxa e perna.`,
    },
    {
      id: "veia-s-perfurante-s-mediais",
      label: "Veia(s) perfurante(s) mediais",
      texto: `V.V. PERFURANTES: A pesquisa foi positiva na face medial da perna a + cm da fáscia plantar.
V.V. PERFURANTES: A pesquisa foi positiva na face medial da perna a + cm e + cm da fáscia plantar.`,
      impressao: `Imagem sugestiva de veia perfurante incompetente na perna.`,
    },
    {
      id: "veia-perfurante-posterior",
      label: "Veia perfurante posterior",
      texto: `V.V. PERFURANTES: A pesquisa foi positiva na face posterior da perna a + cm do calcâneo.`,
      impressao: `Imagem sugestiva de veia perfurante incompetente na perna.`,
    },
  ],
  "musculo::achados": [
    {
      id: "ruptura-gastrocnemio",
      label: "Ruptura gastrocnêmio",
      texto: `estendendo cm longitudinal x cm transversal, com preenchimento da área rota por efusão líquida hemorrágica e volume
estimado em mL.

Demais regiões dos músculos gastrocnêmio medial, gastrocnêmio lateral e sóleo apresentam espessura, contornos e
ecogenicidade preservadas, com padrão fibrilar característico.`,
      impressao: `Imagem sugestiva de ruptura parcial na transição miotendínea do gastrocnêmio medial.`,
    },
    {
      id: "ruptura-adutores",
      label: "Ruptura adutores",
      texto: `suas inserções, medi ndo aproximadamente cm (L x AP), ocupando cerca de % de área transversal do vasto desta
musculatura, com preenchimento por efusão líquida hemorrágica.`,
      impressao: `Sinais sugestivos de ruptura parcial dos músculos adutores da coxa direita.`,
    },
    {
      id: "ruptura-do-peitoral-maior",
      label: "Ruptura do peitoral maior",
      texto: `Músculo peitoral maior apresentando descontinuidade parcial de suas fibras mais inferiores, na topografia axilar direita, a
aproximadamente cm de sua inserção no úmero, com distância entre os fragmentos de aproximadamente cm em repouso
e preenchimento da área rota por efusão líquida hemorrágica com volume estimado de mL.
Área transversa preservada do músculo peitoral maior de aproximadamente % (fibras mais superiores).`,
      impressao: `Imagem sugestiva de ruptura do peitoral maior.`,
    },
    {
      id: "ruptura-quadriceps",
      label: "Ruptura quadriceps",
      texto: `Feixe muscular correspondente ao reto anterior do músculo quadríce ps apresentando descontinuidade parcial de cerca de
% da área total do feixe, na topografia do terço médio da coxa com preenchimento da área rota por efusão líquida
hemorrágica e inflamatória local.
Demais musculatura adjacente sem alterações ecográficas.`,
      impressao: `Imagem sugestiva de ruptura parcial do feixe reto anterior do músculo quadríceps.`,
    },
    {
      id: "ruptura-biceps-femoral",
      label: "Ruptura bíceps femoral",
      texto: `Na topografia do terço proximal do músculo bíceps femoral nota -se pequena área de descontinuidade parcial de cerca de
% da área total transversa do feixe, se estendendo cm longitudinal x cm de espessura, com preenchimento da área rota por
efusão líquida hemorrágica e volume estimado em mL.`,
      impressao: `Imagem sugestiva de pequena ruptura parcial músculo bíceps femoral.`,
    },
  ],
  "obstetrico::achados": [
    {
      id: "hematoma-retroplacentario",
      label: "Hematoma retroplacentário",
      texto: `placenta, ocupando cerca de 15% da sua superfície de inserção, medindo cm, se insinuando através do orifício interno do
colo uterino, podendo corresponder a hematoma.`,
      impressao: `Imagem sugestiva de hematoma retroplacentário/periplacentário.`,
    },
    {
      id: "morfologico",
      label: "Morfológico",
      texto: `http://www.perinatology.com/calculators/exbiometry.htm

Translucência nucal de espessura medindo cm (percentil 90 para a idade gestacional = cm).
Medida do átrio do ventrículo lateral: cm (normal para idade entre 14-38 semanas: 7 a 8,2 mm) (Ventriculomegalia leve: 11 a 15 mm / grave > 15mm).
Osso nasal de comprimento medindo mm (normal: > 2,5 – 5,0 mm) (percentil 5 para a idade gestacional = mm).
Cisterna magna com diâmetro ântero-posterior normal, medindo mm (normal para idade entre 15-36 semanas: 2 a 8 mm, Máx: 10 mm) (percentil
5 para a idade gestacional = mm).
Rim direito/esquerdo com pelve renal levemente ectasiada, apresentando diâmetro ântero-posterior de mm, no percentil para a idade
gestacional (Percentil 50 da idade gestacional = mm).`,
      impressao: `Imagem sugestiva de leve ectasia pielocalicinal à direita/esquerda.`,
    },
    {
      id: "placenta-baixa",
      label: "Placenta baixa",
      texto: `Placenta de inserção corporal anterior estendendo -se até o segmento ístmico do útero, não ocupando o o rifício interno do colo,
distando cm deste (normal > 7,0 cm). Espessura placentária normal e grau de maturidade.
Placenta de inserção corporal anterior estendendo -se até o segmento inferior do útero, ocupando parcialmente o orifício
interno do colo. Espessura placentária normal e grau de maturidade.
Colo uterino medindo no eixo longitudinal cm (normal > 3,0-3,5 cm).`,
      impressao: `Imagem sugestiva de placenta baixa.`,
    },
    {
      id: "oligoamnio",
      label: "Oligoâmnio",
      texto: `Líquido amniótico em quantidade reduzida com ILA = cm (percentil 5 para a idade gestacional = cm).`,
      impressao: `Imagem sugestiva de oligoâmnio discreto.`,
    },
    {
      id: "polidramnio",
      label: "Polidrâmnio",
      texto: `Líquido amniótico em quantidade aumentada com ILA = cm (percentil 95 para a idade gestacional = cm).
(< 5,0 cm: Oligoâmnio; 5,0-8,0 cm: LA reduzido; 8,0-22,0 cm: LA normal; > 22,0 cm: LA aumentado; > 25,0 cm: Polidrâmnio)`,
      impressao: `Imagem sugestiva de polidrâmnio.`,
    },
    {
      id: "obito-fetal",
      label: "Óbito fetal",
      texto: `Pólo cefálico de contornos irregulares, sugerindo superposição de ossos do crânio ( Sinal de Spalding) com gases na
circulação fetal (Sinal de Robert ), associado a hiperflexão da coluna vertebral ( Sinal de Hartley ) e sinal do halo craniano
(Sinal de Devel).
Movimentos fetais e batimentos cardíacos ausentes.
Líquido amniótico em quantidade reduzida (ILA = cm).`,
      impressao: `Imagem sugestiva de gestação com feto único;.`,
    },
    {
      id: "peso",
      label: "Peso",
      texto: `Peso estimado: gramas ( + gramas ) pelo Hadlock 1 (DBP + CC).
gramas ( + gramas ) pelo Hadlock 4 (CC + CA).
gramas ( + gramas ) pelo Hadlock 6 (CA + CF).
gramas ( + gramas ) pelo Hadlock 11 (DBP + CC + CA + CF).
gramas ( + gramas ) pelo Hadlock 7 (DBP + CC + CA).
gramas ( + gramas ) pelo Hadlock 8 (DBP + CC + CF).
gramas ( + gramas ) pelo Hadlock 9 (DBP + CA + CF).
gramas ( + gramas ) pelo Hadlock 3 (DBP + CF).
gramas ( + gramas ) pelo Hadlock 2 (DBP + CA).
gramas ( + gramas ) pelo Hadlock 5 (CC + CF).
gramas ( + gramas ) pelo Hadlock 10 (CC + CA + CF).`,
      impressao: `Imagem sugestiva de peso.`,
    },
  ],
  "oftalmicas::achados": [
    {
      id: "normal",
      label: "Normal",
      texto: `A artéria oftálmica foi explorada por via transorbitária. Ao Doppler observa -se fluxo de direção anterógrada, com curva espectral de
amplitude normal.`,
      impressao: `Imagem sugestiva de normal.`,
    },
    {
      id: "oclusao-da-arteria-carotida-interna",
      label: "Oclusão da artéria carótida interna",
      texto: `A artéria oftálmica foi explorada por via transorbitária. Ao Doppler observa -se fluxo de direção retrógrada, com curva espectral de
amplitude normal.

Conclusões
Ateromatose carotídea com espessamento médio intimal difuso e placas mol es na artéria carótida comum - e bulbo carotídeo - -
sem repercussão hemodinâmica.
“Stent” na artéria carótida interna direita pérvio.

Radiologists in Ultrasound (Radiology 2003: 229: 340-346).`,
      impressao: `Imagem sugestiva de oclusão da artéria carótida interna.`,
    },
    {
      id: "conclusoes",
      label: "Conclusões",
      texto: `medindo respectivamente / (extensão x espessura).

significativos.`,
      impressao: `Imagem sugestiva de ateromatose carotídea com espessamento médio intimal difuso e placas moles, sem repercussão  hemodinâmica na / ,.`,
    },
    {
      id: "stent",
      label: "Stent",
      texto: `Presença de “Stent” na artéria carótida interna direita, desde o bulbo, que se apresenta pérvio e com velocidade de fluxo
sistólico de até - - - cm/s.
representar estenose nesta topografia.`,
      impressao: `Imagem sugestiva de stent.`,
    },
    {
      id: "roubo-de-subclavia",
      label: "Roubo de subclávia",
      texto: `Inversão no sentido de fluxo protodiastólico na artéria vertebral / , mais evidente durante esforço no membro superior
esquerdo, compatível com “roubo da subclávia”.
A artéria vertebral foi explorada em seu segmento interapofisário e apresenta diâmetro normal. Ao Doppler observa-se
fluxo de direção caudal, com curva de amplitude normal, sem turbulência e aceleração.Foi realizada insuflação do
esfigmomanômtero na artéria braquial acima da pressão sistólica sendo verificada interrupção do fluxo descendente da
artéria vertebral.`,
      impressao: `Imagem sugestiva de roubo de subclávia.`,
    },
    {
      id: "acotovelamento",
      label: "Acotovelamento",
      texto: `Acotovelamento /, sem repercussão hemodinâmica ( VPS: / cm/s - VDF: / cm/s),`,
      impressao: `Imagem sugestiva de acotovelamento.`,
    },
    {
      id: "tortuosidade",
      label: "Tortuosidade",
      texto: `Artérias carótidas com trajeto tortuoso e calibres conservados no segmento cervical.

C ARTIFICIAL - A avaliação com Doppler mostra fluxo com padrão monofásico “portalizado” em todos os segmentos arteriais
avaliados, secundário ao dispositivo de suporte hemodinânico, apresentando velocidades entre - - - cm/s e - - - cm/s à esquerda e
entre - - - cm/s e - - - cm/s à direita.
CONC: Alterações hemodinâmicas sec undárias ao dispositivo de suporte hemodinâmico acarretando fluxo arterial
monofásico e dificultando a análise de eventuais estenoses focais`,
      impressao: `Imagem sugestiva de tortuosidade.`,
    },
    {
      id: "vertebral-nao-caracterizada",
      label: "Vertebral não caracterizada",
      texto: `Fluxo vertebral direito/esquerdo não caracterizado.

A arteriografia deve ser analisada de acordo com NASCET, que compara a porção do lúmen restante com o lúmen distal normal
Indicações em que a relação do PSV é melhor que o valor absoluto:
Indicações para Follow-up:
>50% (sem indicação de endarterectomia)  6-12 meses
<50% ( Pc de alto risco com placa visível)  1-2 anos
Normal + Fatores de risco  3-5 anos`,
      impressao: `Imagem sugestiva de grande estenose contra-lateral;.`,
    },
  ],
  "ombro::achados": [
    {
      id: "bursite",
      label: "Bursite",
      texto: `Bursa subacromiodeltoidea levemente distendida por líquido com aspecto anecóide e homogêneo , medindo cm de
espessura.`,
      impressao: `Imagem sugestiva de sinais bursite subacromiodeltoidea.`,
    },
    {
      id: "capsulite-adesiva",
      label: "Capsulite adesiva",
      texto: `Sinais sugestivos de capsulite adesiva do supra-espinhal.`,
      impressao: `Sinais sugestivos de capsulite adesiva do supra-espinhal.`,
    },
    {
      id: "cisto-labral",
      label: "Cisto labral",
      texto: `labrum glenóide, medindo cm (T x AP x L).`,
      impressao: `Imagem sugestiva de imagem cística no recesso posterior. Considerar possibilidade de cisto labral.`,
    },
    {
      id: "hill-sachs",
      label: "Hill-sachs",
      texto: `longitudinal x cm de profundidade.
(Fratura compressiva causada pelo impacto das trabéculas da cabeça umeral durante a luxação anter ior da articulação gleno -umeral: alteração osteocondral da
região póstero-lateral da cabeça do úmero)`,
      impressao: `Imagem sugestiva de sinais deformidade umeral posterior. Considerar possibilidade de lesão de Hill-Sachs.`,
    },
    {
      id: "instabilidade-gleno-umeral",
      label: "Instabilidade gleno-umeral",
      texto: `Conveniente complementar com RM.`,
      impressao: `Imagem sugestiva de aumento da mobilidade da cabeça umeral na cavidade glenóide. Considerar possibilidade de instabilidade gleno -umeral.`,
    },
    {
      id: "luxacao-subluxacao-biciptal",
      label: "Luxação/subluxação biciptal",
      texto: `Profundidade do sulco: mm (normal > 4,3 mm).
Largura do sulco: mm (normal < 14 mm).
Ângulo entre o assoalho e a parede medial do sulco bicipital: (normal: ± 56º).`,
      impressao: `Sinais sugestivos de subluxação/luxação bicipital.`,
    },
    {
      id: "osteoartrose-ombro",
      label: "Osteoartrose ombro",
      texto: `Cartilagem acrômio -clavicular difusamente espessada, com borramento dos contornos e irregularidade da superfície
óssea adjacente. Irregularidade da superfície articular umeral.
Osteófito na margem lateral do acrômio, adjacente ao tendão do supra-espinhal, medindo cm.
Cartilagem acrômio-clavicular com borramento dos contornos e irregularidade da superfície óssea adjacente.`,
      impressao: `Imagem sugestiva de osteoartrose acrômio-clavicular e glenoumeral.`,
    },
    {
      id: "tendinite-biciptal",
      label: "Tendinite biciptal",
      texto: `Tendão da cabeça longa do bíceps aumentado de calibre na porção justa -articular, medindo mm de espessura (normal: 3,3-4,7
mm) com hipoecogenicidade/heterogeneidade textural local.`,
      impressao: `Imagem sugestiva de tendinopatia bicipital.`,
    },
    {
      id: "tendinose-bicipital",
      label: "Tendinose bicipital",
      texto: `Tendão da cabeça longa do bíceps levemente aumentado de calibre em topografia justa -articular, com heterogeneidade
textural e micro-focos ecogênicos de fibrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose bicipital.`,
    },
    {
      id: "tendinite-supra",
      label: "Tendinite supra",
      texto: `Tendão do supra -espinhal apresentando aumento do calibre, com hipoecogenicidade textural difusa na projeção da zona
crítica.`,
      impressao: `Imagem sugestiva de tendinopatia do supra-espinhal.`,
    },
    {
      id: "tendinose-supra",
      label: "Tendinose supra",
      texto: `Tendão do supra -espinhal apresentando leve aumento do calibre, com hipoecogenicidade textural e micro -focos
ecogênicos de fibrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose do supra-espinhal.`,
    },
    {
      id: "ruptura-parcial-supra-nao-transfixante",
      label: "Ruptura parcial supra (não transfixa…",
      texto: `Tendão do supra -espinhal apresentando descontinuidade parcial na projeção da zona crítica medindo cm longitudinal x
cm transversal, preservando suas fibras mais posteriores.
Tendão do supra-espinhal apresentando redução focal de cm de espessura , na projeção da zona crítica , comprometendo
cm transversal, preservando suas fibras mais posteriores.`,
      impressao: `Imagem sugestiva de ruptura não transfixante do supra-espinhal.`,
    },
    {
      id: "ruptura-parcial-subescapular-nao-transfixante",
      label: "Ruptura parcial subescapular (não tr…",
      texto: `Tendão do subescapular apresentando descontinuidade parcial, intrassubstancial, medindo cm longitudinal x cm
transversal.`,
      impressao: `Imagem sugestiva de ruptura intrassubstancial do subescapular.`,
    },
    {
      id: "ruptura-transfixante-aguda-subaguda-do-supra",
      label: "Ruptura transfixante aguda/subaguda …",
      texto: `Tendão do supra -espinhal apresenta ndo descontinuidade transfixante na projeção da zona crítica medindo cm
longitudinal x cm transversal, preservando suas fibras mais posteriores.
Tendão do supra -espinhal apresenta ndo descontinuidade transfixant e na projeção da zona crítica medindo cm
longitudinal x cm transversal, preservando suas fibras mais posteriores.
com a bursa subacromiodeltoidea, que se encontra distendida.`,
      impressao: `Imagem sugestiva de ruptura transfixante do supra-espinhal.`,
    },
    {
      id: "ruptura-transfixante-cronica-do-supra",
      label: "Ruptura transfixante crônica do supra",
      texto: `Tendão do supra -espinhal apresenta ndo descontinuidade transfix ante na projeção da zona crítica medindo cm
longitudinal x cm transversal, com cabeça umeral irregular e de aspecto “careca”, preservando suas fibras mais
posteriores.
Tendão do supra-espinhal apresentando descontinuidade total na projeção da zona crítica medindo cm longitudinal x cm
transversal, com cabeça umeral irregular e de aspecto “careca”, se estendendo às fibras do infra -espinhal que apresenta
redução focal de sua espessura.`,
      impressao: `Imagem sugestiva de ruptura transfixante crônica do supra-espinhal.`,
    },
    {
      id: "derrame-articular",
      label: "Derrame articular",
      texto: `Derrame articular leve na goteira bicipital de aspecto anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de derrame articular leve gleno-umeral.`,
    },
    {
      id: "derrame-articular-com-distensao-da-bursa",
      label: "Derrame articular com distensão da b…",
      texto: `Derrame articular na goteira bicipital de aspecto anecóide e homogêneo , comunicando com a bursa subacromiodeltoidea,
que se encontra levemente distendida.`,
      impressao: `Imagem sugestiva de derrame articular com distensão da bursa subacromiodeltoide.`,
    },
    {
      id: "ruptura-parcial-infra-sub-redondo-menor",
      label: "Ruptura parcial infra, sub/redondo m…",
      texto: `Tendão do apresentando redução focal da espessura/descontinuidade parcial, medindo cm longitudinal x cm transversal,
preservando suas fibras mais .`,
      impressao: `Imagem sugestiva de ruptura parcial do.`,
    },
    {
      id: "ruptura-total-infra-sub-redondo-menor",
      label: "Ruptura total infra, sub/redondo menor",
      texto: `Tendão * do apresentando descontinuidade total, medindo cm longitudinal e cm transversal.`,
      impressao: `Imagem sugestiva de rotura total do.`,
    },
    {
      id: "atrofia-muscular",
      label: "Atrofia muscular",
      texto: `Músculo * apresentando aumento da ecogenicidade em aproximadamente % de sua área transversal por lipossubstituição,
compatível com atrofia de desuso.`,
      impressao: `Imagem sugestiva de sinais atrofia muscular do * acentuada/moderada/discreta.`,
    },
    {
      id: "tendinopatia-calcarea",
      label: "Tendinopatia calcárea",
      texto: `Tendão do * de calibre normal, apresentando foco cálcico hiperecogênico, regular, medindo até cm.`,
      impressao: `Imagem sugestiva de sinais tendinopatia calcárea do.`,
    },
  ],
  "partes-moles::achados": [
    {
      id: "cisto-sebaceo",
      label: "Cisto sebáceo",
      texto: `(sugerindo cístico -espesso), levemente heterogênea, sem fluxo ao Doppler, medindo cm (L x AP x T), distando cm da
superfície da pele.`,
      impressao: `Imagem sugestiva de imagem cístico-espessa em partes superficiais. Considerar possibilidade de cisto sebáceo.`,
    },
    {
      id: "colecao-flegmonosa",
      label: "Coleção flegmonosa",
      texto: `do subcutâneo, medindo até cm (vol = cm³), sugerindo coleções hemorrágicas, não passível de punção.`,
      impressao: `Imagem sugestiva de imagem cístico-espessa em partes superficiais. Considerar possibilidade de cisto sebáceo.`,
    },
    {
      id: "colecao-pos-op",
      label: "Coleção pós-op",
      texto: `Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em região abdominal, evidenciou:
Coleção c ística, unilocular, na região peri -incisional pélvica, nos planos do subcutâneo, de contornos irregulares,
conteúdo anecóide com leves debris e traves de permeio, medindo x cm (L x AP), se estendendo cm transversalmente,
distando cm da pele, com volume estimado de cm³.`,
      impressao: `Imagem sugestiva de coleção cística em partes superficiais passível de punção/drenagem.`,
    },
    {
      id: "colecao-hematoma-pos-trauma",
      label: "Coleção hematoma pós-trauma",
      texto: `contornos lobulados, conteúdo com moderados debris e traves de permeio , adjacente ao tendão/vaso *, medindo cm (L x
AP x T), distando cm da pele, com volume estimado de cm³.
Superfície cortical óssea adjacente sem sinais ecográficos de descontinuidade.`,
      impressao: `Imagem sugestiva de hematoma na *, passível de punção/drenagem.`,
    },
    {
      id: "edema",
      label: "Edema",
      texto: `Pele e tecido celular subcutâneo peri -incisional de espessura aumentada com áreas permeativas anecóides de aspecto
flegmonoso, sem evidência de coleções significativas.

Pele e tecido celular subcutâneo na região *** de espessura aumentada , com aumento difuso da ecogenicidade, sem
evidência de coleções locais, podendo estar relacionado a processo inflamatório local`,
      impressao: `Imagem sugestiva de edema de subcutâneo peri-incisional.`,
    },
    {
      id: "fibrose-cicatricial",
      label: "Fibrose cicatricial",
      texto: `Estudo ultrassonográfico complementar com sonda linear de 10MHz, dirigido em região *, evidenciou:
Área sólida, nos p lanos do subcutâneo/musculares, hipoecogênica, mal definida e irregular, provida de sombra acústica
posterior, medindo cerca de cm (L x AP x T), com volume estimado de cm³ e distando cm da pele.`,
      impressao: `Imagem sugestiva de área sólida irregular em partes superficiais. Considerar possibilidade de fibrose cicatricial.`,
    },
    {
      id: "lipoma",
      label: "Lipoma",
      texto: `isoecogênica ao tecido gorduroso, medindo cm (L x AP x T), distando cm da pele.`,
      impressao: `Imagem sugestiva de nódulo em partes superficiais. Considerar possibilidade de lipoma.`,
    },
  ],
  "parede-abdominal::achados": [
    {
      id: "hernia-de-parede-redutivel",
      label: "Hérnia de parede redutível",
      texto: `Falha na integridade da aponeurose muscular de ____ cm, na região epigástrica/umbilical/incisional, observando herniação de conteúdo omental e intestinal, com fluxo vascular presente ao Doppler, acentuando-se à manobra de Valsalva.`,
      impressao: `Imagem sugestiva de hérnia de parede abdominal, sem sinais de encarceramento.`,
    },
    {
      id: "hernia-de-parede-encarcerada",
      label: "Hérnia de parede encarcerada",
      texto: `Falha na integridade da aponeurose muscular de ____ cm, na região epigástrica/umbilical/incisional, com herniação de conteúdo omental e intestinal, medindo ____ cm, associado a pouca mobilidade ao repouso e à manobra de Valsalva. Fluxo vascular presente ao Doppler no conteúdo herniário.`,
      impressao: `Imagem sugestiva de hérnia de parede abdominal com sinais de encarceramento.`,
    },
  ],
  "regiao-inguinal::achados": [
    {
      id: "hernia-inguinal",
      label: "Hérnia inguinal (direta/indireta)",
      texto: `Canal Inguinal: Evidencia-se herniação de conteúdo omental/intestinal (gordura pré-peritoneal ou alças intestinais) através do canal inguinal direito/esquerdo, medindo ____ cm, observada à manobra de Valsalva. Sem sinais claros de encarceramento ou estrangulamento ao presente estudo.
Orifício Miopectíneo de Fruchaud: Identifica-se protusão/saco herniário durante as manobras de esforço (Valsalva).`,
      impressao: `Imagem sugestiva de hérnia inguinal (direta/indireta) à direita/esquerda, sem sinais claros de encarceramento.`,
    },
    {
      id: "hernia-inguino-escrotal",
      label: "Hérnia inguino-escrotal",
      texto: `Canal Inguinal: Herniação de conteúdo omental e intestinal através do canal inguinal direito/esquerdo até a bolsa escrotal, com pouca mobilidade às manobras de compressão e Valsalva.
Conteúdo herniário intra-escrotal medindo cerca de ____ cm.`,
      impressao: `Imagem sugestiva de hérnia ínguino-escrotal à direita/esquerda.`,
    },
    {
      id: "hernia-femoral",
      label: "Hérnia femoral",
      texto: `Orifício Miopectíneo de Fruchaud: Evidencia-se herniação abaixo do ligamento inguinal (topografia femoral) à direita/esquerda, medindo ____ cm, observada à manobra de Valsalva. Conteúdo compatível com gordura pré-peritoneal / alças intestinais.`,
      impressao: `Imagem sugestiva de hérnia femoral à direita/esquerda.`,
    },
    {
      id: "linfonodos-reacionais",
      label: "Linfonodos reacionais",
      texto: `Linfonodos: Identificam-se linfonodos de aspecto reacional na região inguinal direita/esquerda, com hilo gorduroso preservado, morfologia ovalada e dimensões aumentadas (o maior medindo ____ cm).`,
      impressao: `Imagem sugestiva de linfonodos reacionais na região inguinal à direita/esquerda.`,
    },
    {
      id: "linfonodomegalias",
      label: "Linfonodomegalias",
      texto: `Linfonodos: Identificam-se linfonodomegalias na região inguinal direita/esquerda, o maior medindo ____ cm, com alteração da arquitetura / hilo gorduroso ____ (preservado/apagado) e vascularização ____ ao Doppler.`,
      impressao: `Imagem sugestiva de linfonodomegalia(s) na região inguinal à direita/esquerda.`,
    },
    {
      id: "lesao-distensao-musculotendinea",
      label: "Lesão / distensão musculotendínea",
      texto: `Canal Inguinal: Alteração da ecotextura muscular/tendínea na topografia do adutor longo / estruturas musculotendíneas da região inguinal direita/esquerda, sugestiva de lesão/distensão, medindo ____ cm.`,
      impressao: `Imagem sugestiva de lesão/distensão musculotendínea na região inguinal à direita/esquerda.`,
    },
    {
      id: "lipoma",
      label: "Lipoma",
      texto: `Canal Inguinal: Identifica-se nódulo de partes moles, bem delimitado, isoecogênico/hiperecogênico ao tecido adiposo, compatível com lipoma, medindo ____ cm, na região inguinal direita/esquerda.`,
      impressao: `Imagem sugestiva de lipoma na região inguinal à direita/esquerda.`,
    },
    {
      id: "cisto-abscesso",
      label: "Cisto / abscesso",
      texto: `Canal Inguinal: Identifica-se coleção líquida / cisto / abscesso na região inguinal direita/esquerda, medindo ____ cm, com paredes ____ e conteúdo ____.`,
      impressao: `Imagem sugestiva de coleção/cisto/abscesso na região inguinal à direita/esquerda.`,
    },
    {
      id: "varicosidades",
      label: "Varicosidades",
      texto: `Estruturas Vasculares: Evidenciam-se dilatações varicosas das veias safenas/colaterais na região inguinal direita/esquerda, com fluxo ao Doppler colorido.`,
      impressao: `Imagem sugestiva de varicosidades na região inguinal à direita/esquerda.`,
    },
    {
      id: "aneurisma-pseudoaneurisma",
      label: "Aneurisma / pseudoaneurisma",
      texto: `Estruturas Vasculares: Identifica-se dilatação aneurismática / pseudoaneurisma de vaso femoral à direita/esquerda, medindo ____ cm, com fluxo turbilhonado ao Doppler colorido.`,
      impressao: `Imagem sugestiva de aneurisma/pseudoaneurisma femoral à direita/esquerda.`,
    },
    {
      id: "seroma-hematoma",
      label: "Seroma / hematoma (pós-op)",
      texto: `Canal Inguinal: Identifica-se coleção líquida compatível com seroma/hematoma na topografia cirúrgica da região inguinal direita/esquerda, medindo ____ cm.`,
      impressao: `Imagem sugestiva de seroma/hematoma pós-operatório na região inguinal à direita/esquerda.`,
    },
    {
      id: "recidiva-herniaria",
      label: "Recidiva herniária",
      texto: `Canal Inguinal: Em paciente com antecedentes de herniorrafia, evidencia-se recidiva herniária à direita/esquerda, com saco/conteúdo herniário medindo ____ cm, observado à manobra de Valsalva.`,
      impressao: `Imagem sugestiva de recidiva herniária à direita/esquerda.`,
    },
  ],
  "prostata::prostata": [
    {
      id: "prostata-heterogenea",
      label: "Próstata heterogênea",
      texto: `Com configuração cônica característica, apresentando superfície regular e cápsula íntegra, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.
Volume da próstata: ____ cm³.
Peso aproximado: ____ gramas.
Parênquima prostático com ecotextura heterogênea apresentando focos de calcificação na zona central.`,
      impressao: `Imagem sugestiva de próstata heterogênea.`,
    },
    {
      id: "hpb",
      label: "HPB (hiperplasia prostática benigna)",
      texto: `Com configuração cônica característica, apresentando aumento volumétrico difuso (principalmente às custas da zona de transição), superfície bocelada/regular e cápsula aparentemente íntegra, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.
Volume da próstata: ____ cm³.
Peso aproximado: ____ gramas.
Tecido prostático com textura heterogênea, podendo apresentar nódulos hiperplásicos focais ou mistos.
Nota-se abaulamento do assoalho vesical (impressão prostática).`,
      impressao: `Imagem sugestiva de hiperplasia prostática benigna (HPB), com aumento do volume glandular e impressão sobre o assoalho vesical.`,
    },
    {
      id: "adenocarcinoma-prostata",
      label: "Adenocarcinoma de próstata",
      texto: `Com configuração cônica característica, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.
Volume da próstata: ____ cm³.
Peso aproximado: ____ gramas.
Identifica-se nódulo hipoecoico mal delimitado, preferencialmente na zona periférica, medindo ____ cm, podendo associar-se a assimetria de contornos e/ou sinais de invasão capsular / das vesículas seminais.
Estudo com Doppler colorido: hipervascularização na topografia da lesão.`,
      impressao: `Imagem sugestiva de nódulo prostático suspeito (considerar adenocarcinoma). Correlação clínica e biópsia conforme indicação.`,
    },
    {
      id: "prostatite-aguda",
      label: "Prostatite aguda",
      texto: `Com configuração cônica característica, apresentando aumento de volume, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.
Volume da próstata: ____ cm³.
Peso aproximado: ____ gramas.
Parênquima com áreas heterogêneas e mal delimitadas, por vezes com focos hipoecoicos ou coleções líquidas (abscessos prostáticos), medindo ____ cm.
Estudo com Doppler colorido: hiperemia difusa exuberante.`,
      impressao: `Imagem sugestiva de prostatite aguda.`,
    },
    {
      id: "prostatite-cronica",
      label: "Prostatite crônica",
      texto: `Com configuração cônica característica, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.
Volume da próstata: ____ cm³.
Peso aproximado: ____ gramas.
Parênquima apresentando assimetria glandular, focos de fibrose e pequenas calcificações periuretrais ou intraparenquimatosas.`,
      impressao: `Imagem sugestiva de prostatite crônica.`,
    },
    {
      id: "cistos-prostaticos",
      label: "Cisto(s) prostático(s)",
      texto: `Com configuração cônica característica, apresentando superfície regular e cápsula íntegra, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.
Volume da próstata: ____ cm³.
Peso aproximado: ____ gramas.
Identifica-se imagem(ns) anecoica(s), bem circunscrita(s), com reforço acústico posterior, localizada(s) na linha média / parênquima glandular, medindo ____ cm, compatível(is) com cisto(s) prostático(s).`,
      impressao: `Imagem sugestiva de cisto(s) prostático(s).`,
    },
  ],
  "prostata::ves-seminais": [
    {
      id: "vesiculite",
      label: "Vesiculite",
      texto: `Vesículas seminais aumentadas de volume, com paredes espessadas e conteúdo heterogêneo, aspectos sugestivos de vesiculite.`,
      impressao: `Imagem sugestiva de vesiculite.`,
    },
    {
      id: "obstrucao-ductos-ejaculatorios",
      label: "Obstrução dos ductos ejaculatórios",
      texto: `Vesículas seminais com sinais sugestivos de obstrução dos ductos ejaculatórios (dilatação / conteúdo retido).`,
      impressao: `Imagem sugestiva de obstrução dos ductos ejaculatórios.`,
    },
    {
      id: "invasao-tumoral-vesiculas",
      label: "Invasão tumoral",
      texto: `Vesículas seminais com alteração da morfologia/ecotextura sugerindo invasão tumoral por neoplasia prostática.`,
      impressao: `Imagem sugestiva de invasão das vesículas seminais.`,
    },
  ],
  "punho-mao::achados": [
    {
      id: "lesao-do-complexo-capsulo-ligamentar",
      label: "Lesão do complexo cápsulo-ligamentar",
      texto: `Complexo cápsulo -ligamentar da articulação trapézio -1º metacarpo apresentando leve borramento dos contornos e
discreta irregularidade da superfície óssea adjacente. Apresenta -se distendida por derrame articular leve de aspecto
anecóide e homogêneo.
ligamentar.
óssea adjacente.`,
      impressao: `Imagem sugestiva de sinais lesão do complexo cápsulo-ligamentar com derrame articular leve trapézio-1º metacarpo e discreta irregularidade.`,
    },
    {
      id: "neuropatia-mediano",
      label: "Neuropatia mediano",
      texto: `Nervo mediano de dimensões aumentadas, com área de mm² (normal < 12 mm²).`,
      impressao: `Imagem sugestiva de aumento do calibre do nervo mediano. Considerar possibilidade de neuropatia.`,
    },
    {
      id: "osteoartrite-com-derrame-articular",
      label: "Osteoartrite com derrame articular",
      texto: `Cartilagem articular entre o *** difusamente esp essada, com borramento dos contornos e irregularidade da superfície
óssea adjacente, associado a derrame articular leve com aspecto anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de osteoartrite com derrame articular leve ***.`,
    },
    {
      id: "tenossinovite-tunel-do-carpo",
      label: "Tenossinovite túnel do carpo",
      texto: `Tendões flexore s digitais superficiais e profundos aumentados de calibre na topografia do túnel do carpo, com halos
anecóicos de edema sinovial difuso.`,
      impressao: `Imagem sugestiva de tenossinovite nos tendões do túnel do carpo.`,
    },
    {
      id: "tenossinovite-1-tunel",
      label: "TENOSSINOVITE 1º TÚNEL",
      texto: `Tendões abdutor longo e extensor curto do polegar aumentados de calibre adjacente a borda radial, com halo anecóico de
edema sinovial comprometendo cerca de cm longitudinal.`,
      impressao: `Imagem sugestiva de tenossinovite do 1º túnel (De Quervain).`,
    },
    {
      id: "tenossinovite-2-tunel",
      label: "TENOSSINOVITE 2º TÚNEL",
      texto: `Tendões extensores longo e curto do carpo aumentados de calibre na topografia da intersecção com a musculatura do 1º
túnel dorsal, com halo anecóico de edema sinovial comprometendo cerca de cm longitudinal.`,
      impressao: `Imagem sugestiva de tenossinovite do 2º túnel.`,
    },
    {
      id: "tenossinovite-3-tunel",
      label: "TENOSSINOVITE 3º TÚNEL",
      texto: `Tendão extensor longo do pol egar aumentado de calibre adjacente ao tubérculo de Lister, com halo anecóico de edema
sinovial comprometendo cerca de mm longitudinal.`,
      impressao: `Imagem sugestiva de tenossinovite do 3º túnel.`,
    },
    {
      id: "tenossinovite-4-tunel",
      label: "TENOSSINOVITE 4º TÚNEL",
      texto: `Tendões extensores comuns dos dedos e próprio do indicad or aumentados de calibres adjacentes ao rádio, com halo
anecóico de edema sinovial difuso, comprometendo cerca de cm longitudinal.`,
      impressao: `Imagem sugestiva de tenossinovite do 4º túnel.`,
    },
    {
      id: "tenossinovite-6-tunel",
      label: "TENOSSINOVITE 6º TÚNEL",
      texto: `Tendão extensor ulnar do carpo aumentado de calibre adjacente ao processo estilóide da ulna, com halo anecóico de
edema sinovial comprometendo cerca de cm longitudinal.`,
      impressao: `Imagem sugestiva de tenossinovite do 6º túnel.`,
    },
    {
      id: "cisto-artrossinovial",
      label: "Cisto artrossinovial",
      texto: `Formação cística lobulada de conteúd o líquido, anecóide homogêneo , entre o 2º e o 4º túnel dorsal, adjacente ao
semilunar, com colo de comunicação articular, medindo cm (L x AP x T).
Formação cística lobulada de conteúdo líquido , anecóide homogêneo, entre o tendão flexor radial do carpo e o 1º túnel
dorsal, com colo de comunicação articular, medindo cm (L x AP x T).`,
      impressao: `Imagem sugestiva de cisto artrossinovial no punho.`,
    },
    {
      id: "dedo-em-gatilho",
      label: "Dedo em gatilho",
      texto: `Tendão flexor do 4º dedo levemente espessado com hipoecogenicidade textural ao nível da primeira polia anular na cabeça
metacarpal associado a travamento à extensão do respectivo quirodáctilo.
Tendão flexor do 4º dedo apresentando leve espessamento da primeira polia anular ao nível na cabeça metacarpal , sem
sinais de travamento à extensão do respectivo quirodáctilo ao exame dinâmico.`,
      impressao: `Imagem sugestiva de tenossinovite estenosante do 4º flexor (dedo em gatilho).`,
    },
  ],
  "quadril::achados": [
    {
      id: "bursite-trocanterica",
      label: "Bursite trocantérica",
      texto: `Bursa trocantérica distendida por líquido com aspecto anecóide e homogêneo, medindo cm de espessura.`,
      impressao: `Imagem sugestiva de bursite trocantérica.`,
    },
    {
      id: "derrame-articular",
      label: "Derrame articular",
      texto: `Presença de coleção líquida , com aspecto anecóide, homogêneo, no interior da articulação do quadril , visibilizada no
recesso anterior da cápsula. A distância colo-cápsula mede cm.`,
      impressao: `Imagem sugestiva de sinais ecográficos compatíveis com sinovite no quadril.`,
    },
    {
      id: "displasia-coxo-femoral-us",
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
      id: "osteoartrose",
      label: "Osteoartrose",
      texto: `Cartilagem articular fêmoro-acetabular difusamente espessada, com borramento dos contornos e irregularidad e da
superfície óssea adjacente.
Irregularidade da superfície óssea trocantérica e da espinha ilíaca ântero-superior.`,
      impressao: `Imagem sugestiva de osteoartrose coxo-femoral.`,
    },
  ],
  "renal::bexiga": [
    {
      id: "espessamento-vesical-bexiga-de-esforco",
      label: "Espessamento vesical: bexiga de esfo…",
      texto: `Bexiga urinária normodistendida, com conteúdo anecóide e parede irregular com espessura difusamente aum entada,
medindo até cm (normal < 0,5 cm). Observa-se ainda imagens compatíveis com pseudo -divertículos vesicais, medindo até cm
na parede ântero-superior.`,
      impressao: `Imagem sugestiva de espessamento parietal vesical difuso com pseudo-divertículos. Considerar possibilidade de bexiga de esforço.`,
    },
    {
      id: "espessamento-vesical-cistite",
      label: "Espessamento vesical: cistite",
      texto: `Bexiga urinária normodistendida, com conteúdo anecóide e parede de espessura difusamente aumentada, medindo até
cm (normal < 0,5 cm).`,
      impressao: `Imagem sugestiva de espessamento parietal vesical difuso. Considerar possibilidade de cistite.`,
    },
    {
      id: "hematoma-vesical",
      label: "Hematoma vesical",
      texto: `Bexiga urinária normodistendida, com conteúdo anecóide e parede de espessura normal.
medindo cm (volume estimado: cm3)`,
      impressao: `Imagem sugestiva de imagem irregular no interior vesical sugerindo hematoma.`,
    },
    {
      id: "massa-polipo-vesical",
      label: "Massa/pólipo vesical",
      texto: `à mudança de decúbito, medindo cm (L x AP x T), com volume de cm3.
regulares e fluxo presente ao Doppler, imóvel à mudança de decúbito, medindo cm.`,
      impressao: `Imagem sugestiva de massa sólida vesical.`,
    },
    {
      id: "refluxo-vesico-ureteral",
      label: "Refluxo vésico-ureteral",
      texto: `Moderada dilatação dos sistemas pielocaliciais e de toda a extensão dos ureteres, medindo até cm de calibre à direita e
cm à esquerda sem evidência de fatores obstrutivos/compressivos.
Junções uretero-vesicais patentes durante toda a realização do exame.`,
      impressao: `Imagem sugestiva de uretero-hidronefrose moderada bilateral. Considerar possibilidade de refluxo vésico -ureteral.`,
    },
    {
      id: "residuo-vesical-aumentado",
      label: "Resíduo vesical aumentado",
      texto: `Volume vesical pré-miccional: mL.
Volume vesical pós-miccional pequeno/moderado/acentuado: mL.

Recomendação: 0-30mL: Desprezível; 30-80mL: Pequeno; 80-150mL: Moderado; 150-300mL; Acentuado; >300mL: Muito acentuado.`,
      impressao: `Imagem sugestiva de resíduo vesical pequeno/moderado/acentuado.`,
    },
    {
      id: "sonda-vesical",
      label: "Sonda vesical",
      texto: `Balão de sonda vesical normoposicionado.`,
      impressao: `Imagem sugestiva de sonda vesical.`,
    },
  ],
  "renal::rins": [
    {
      id: "agenesia-renal",
      label: "Agenesia renal",
      texto: `Rim direito/esquerdo não visibilizado em lojas renais e pelve.`,
      impressao: `Imagem sugestiva de rim direito/esquerdo não visibilizado: agenesia renal?.`,
    },
    {
      id: "angiomiolipoma",
      label: "Angiomiolipoma",
      texto: `conteúdo hiperecogênico, homogêneo, sem alterar a arquitetura vascular e pielocalicial, ausência de fluxo ao Doppler,
medindo cm.`,
      impressao: `Imagem sugestiva de nódulo renal sugestivo de angiomiolipoma.`,
    },
    {
      id: "colecao-peri-enxerto-renal",
      label: "Coleção peri-enxerto renal",
      texto: `com volume estimado em cm³, distando cm da pele, passível de punção/drenagem.`,
      impressao: `Imagem sugestiva de coleção peri-enxerto renal.`,
    },
    {
      id: "cisto",
      label: "Cisto",
      texto: `Imagem cística, de paredes finas e regulares, conteúdo anecóide, homogêneo, no terço * à direita/esquerda, cortical,
medindo cm.
Cisto renal, cortical, no terço * à direita/esquerda, medindo cm.`,
      impressao: `Imagem sugestiva de cisto renal simples à direita/esquerda.`,
    },
    {
      id: "cistos",
      label: "Cistos",
      texto: `Imagens císticas, de paredes finas e regulares, conteúdo anecóide, homogêneo, predominantemente corticais, medindo
até cm no terço superior/médio/inferior à direita/esquerda.
Imagens císticas, de paredes finas e regulares, conteúdo anecóide homogêneo, caracterizadas assim:`,
      impressao: `Imagem sugestiva de cistos renais simples à direita/esquerda.`,
    },
    {
      id: "cistos-policisticos",
      label: "Cistos (policísticos)",
      texto: `Múltiplas imagens císticas, distribuídas por todo o parênquima renal à direita/esquerda, predominantemente corticais, de
paredes finas e regulares, conteúdo anecóide homogêneo, medindo até cm no terço superior/médio/inferior.`,
      impressao: `Imagem sugestiva de múltiplos cistos renais bilaterais. Considerar possibilidade de doença policística do adulto.`,
    },
    {
      id: "calculo-boderline",
      label: "Cálculo “boderline”",
      texto: `Pequena imagem nodular, hiperecogênica, desprovida de sombra acústica posterior, no grupo calicinal médio à
direita/esquerda, medindo cm.`,
      impressao: `Imagem sugestiva de pequena imagem hiperecogênica no rim direito/esquerdo: cálculo?.`,
    },
    {
      id: "calculo",
      label: "Cálculo",
      texto: `Imagem nodular, hiperecogênica, provida de sombra acústica posterior, no grupo calicinal médio à direita/esquerda,
medindo cm.`,
      impressao: `Imagem sugestiva de nefrolitíase, não obstrutiva, à direita/esquerda.`,
    },
    {
      id: "calculos",
      label: "Cálculos",
      texto: `Algumas imagens nodulares, hiperecogênicas, providas de sombra acústica posterior, medindo até cm no grupo calicinal
médio à direita/esquerda.
Imagens nodulares, hiperecogênicas, providas de sombra acústica posterior, nos grupos calicinais:`,
      impressao: `Imagem sugestiva de nefrolitíase, não obstrutiva, à direita/esquerda/bilateral.`,
    },
    {
      id: "calculo-ureteral-jup",
      label: "Cálculo ureteral JUP",
      texto: `cerca de cm da junção uretero -piélica (JUP), medindo cm, correspondendo cálculo impactado, promovendo
leve/moderada dilatação do sistema coletor à montante.`,
      impressao: `Imagem sugestiva de ureterolitíase promovendo uretero-hidronefrose leve/moderada à direita/esquerda.`,
    },
    {
      id: "calculo-ureteral-juv",
      label: "Cálculo ureteral JUV",
      texto: `direita/esquerda, correspondendo a cálculo impactado, promovendo discreta/moderada dilatação do sistema coletor à
montante.
Discreta dilatação do sistema pielocalicial e dos 2/3 proximais do ureter direito/esquerdo, de calibre alcançando cm.
Ureter distal não visibilizado devido à sobreposição gasosa.
Mínimo aumento da pelve renal com grupos calicinais de aspecto preservado.
vesical (JUV) direita: cálculo impactado? À critério clínico, complementar com TC.`,
      impressao: `Imagem sugestiva de ureterolitíase promovendo uretero-hidronefrose discreta/moderada à direita/esquerda.`,
    },
    {
      id: "duplicidade-pielocalicial",
      label: "Duplicidade pielocalicial",
      texto: `Sistema pielocalicial compacto à direita/esquerda , apresentado grupo calicinal superior separado dos grupos médio/inferior,
sugerindo duplicidade pielocalicial (variante anatômica).`,
      impressao: `Imagem sugestiva de duplicidade pielocalicial.`,
    },
    {
      id: "duplo-j",
      label: "Duplo j",
      texto: `Extremidade do cateter de duplo J no sistema pielocalicial.
Extremidade do cateter de duplo J no interior vesical.`,
      impressao: `Imagem sugestiva de cateter de duplo J normoposicionado à direita/esquerda.`,
    },
    {
      id: "estenose-de-jup",
      label: "Estenose de JUP",
      texto: `Moderada dilatação do sistema pielocalicial à direita/esquerda. Não visibilizado sinais de dilatação ureteral.`,
      impressao: `Imagem sugestiva de hidronefrose moderada à direita/esquerda. Considerar possibilidade de esteno se de JUP.`,
    },
    {
      id: "rim-pelvico",
      label: "Rim pélvico",
      texto: `Rim direito /esquerdo em topografia ectópica, na foss a ilíaca direita /esquerda, de morfologia, contornos e ecotextura
normais, com dimensões levemente reduzidas.
Dimensões renais: cm. Espessura de parênquima: cm.
Sistema pielocalicial compacto sem evidência de cálculos.`,
      impressao: `Imagem sugestiva de rim direito/esquerdo pélvico.`,
    },
    {
      id: "rins-em-ferradura",
      label: "Rins em ferradura",
      texto: `Rins de contornos e ecotextura normais com pelves renais dirigidas anteriormente, apresentando -se fundidos a partir de
seus pólos inferiores na topografia mediana, peri-umbilical, sugerindo "rins em ferradura".
Rim direito mede: cm. Espessura do parênquima: cm.
Rim esquerdo mede: cm. Espessura do parênquima: cm.
Região renal na topografia mediana mede aproximadamente: mm (T x AP).
Sistema pielocalicial compacto. Não visibilizado imagens compatíveis com cálculos no sistema pielocalicial.`,
      impressao: `Imagem sugestiva de sinais compatíveis com “Rins em ferradura”.`,
    },
    {
      id: "massa-pelvica-com-uretero-hidronefrose",
      label: "Massa pélvica com uretero-hidronefrose",
      texto: `Massa sólida na escavação pélvica, superiormente à bexiga, de contornos lobulados, heterogênea, com focos de
calcificação e fluxo periférico ao Doppler, medindo cm (vol = cm³).
Esta exerce compressão extrínseca nos ureteres distais promovendo discreta/moderada dilatação dos sistemas coletores
à montante.
Ureteres de calibres aumentados, medindo até cm à direita e cm à esquerda, apresentando afilamento gradual, em
aspecto de "bico de pássaro", à medida que se relaciona com uma massa sólida na escavação pélvica, superiormente à
bexiga, de contornos lobulados, heterogênea, com focos de calcificação e fluxo periférico ao Doppler, medindo cm (vol =
cm³).`,
      impressao: `Imagem sugestiva de massa pélvica promovendo uretero-hidronefrose discreta/moderada bilateral;.`,
    },
    {
      id: "nefrectomia-total-parcial",
      label: "Nefrectomia total/parcial",
      texto: `Rim direito/esquerdo não caracterizado (status pós-operatório).
Rim direito/esquerdo em topografia e ecotextura habitual com dimensões reduzidas (status pós-operatório).
Sistema pielocalicial compacto. Ausência de imagens compatíveis com cálculos no sistema pielocalicial.`,
      impressao: `Imagem sugestiva de nefrectomia total à direita/esquerda.`,
    },
    {
      id: "nefrocalcinose",
      label: "Nefrocalcinose",
      texto: `Sinais de nefrocalcinose medular.`,
      impressao: `Imagem sugestiva de nefrocalcinose medular.`,
    },
    {
      id: "nefropatia-aguda",
      label: "Nefropatia aguda",
      texto: `Perda da relação corticomedular com parênquima apresentando hiperrefringê ncia difusa e redução da ecogenicidade das
pirâmides.
Relação corticomedular preservada com parênquima apresentando hiperrefringência difusa e redução da ecogenicidade
das pirâmides.`,
      impressao: `Imagem sugestiva de nefropatia parenquimatosa aguda.`,
    },
    {
      id: "nefropatia-cronica",
      label: "Nefropatia crônica",
      texto: `Rins de morfologia e topografia habituais, com dimensões reduzidas, contornos lobulados e perda da relação
corticomedular.
Rim direito mede: cm. Rim esquerdo mede: cm.`,
      impressao: `Imagem sugestiva de nefropatia parenquimatosa crônica bilateral.`,
    },
    {
      id: "enxerto-renal",
      label: "Enxerto renal",
      texto: `Enxerto renal:
Localizado na fossa ilíaca direita/esquerda de morfologia, contornos e topografia habituais.
Dimensões: cm (vol : cm³). Espessura de parênquima: mm.
Parênquima com relação corticomedular preservada.
Sistema pielocalicinal compacto. Ausência de imagens compatíveis com cálculos.
Fluxo vascular presente ao Doppler Colorido.
Ausência de sinais de coleções peri-enxerto.`,
      impressao: `Imagem sugestiva de enxerto renal na fossa ilíaca direita/esquerda.`,
    },
    {
      id: "pielonefrite",
      label: "Pielonefrite",
      texto: `Dimensões: mm. Espessura de parênquima aumentada: mm.
Relação corticomedular preservada com parênquima apresentando leve hiperrefringência difusa e redução da
ecogenicidade das pirâmides.
Sistema pielocalicial compacto.
Relação corticomedular preservada com parênquima apresentando área hiperecogênica irregular, mal definida, no terço
superior, medindo cerca de cm.`,
      impressao: `Imagem sugestiva de nefropatia parenquimatosa aguda à direita/esquerda. Considerar possibilidade de pielonefrite.`,
    },
    {
      id: "tumor-de-wilms-ou-neuroblatoma",
      label: "Tumor de wilms ou neuroblatoma",
      texto: `Volumosa massa sólida, de limites imprecisos com o terço superior renal à direita, com aparente plano de clivagem com o
fígado, rechaçando -o superiormente e não ultrapassando a linha mediana. Apresenta contornos lobulados e aspecto
heterogêneo, predominantemente hipoecogênico (componente sólido > 95 % da massa) , com áreas císticas anecóides, sugerindo
degeneração cístico -necrótica, sem calcificações evidentes e fluxo central e periférico ao Doppler, medindo mm (vol =
cm³).
com TC.`,
      impressao: `Imagem sugestiva de massa sólida intracavitária. Considerar possibilidades de Tumor de Wilms ou Neuroblastoma. Conveniente complementar.`,
    },
    {
      id: "urinoma",
      label: "Urinoma",
      texto: `Gerota, medindo cm de espessura, sugerindo urinoma. Observa-se ainda borramento dos planos gordurosos peri-renal.`,
      impressao: `Imagem sugestiva de urinoma.`,
    },
    {
      id: "valvula-de-uretra-posterior",
      label: "Válvula de uretra posterior",
      texto: `Moderada dilatação dos sistemas pielocaliciais e de toda a extensão dos ureteres, medindo até cm de calibre à direita e
cm à esquerda.`,
      impressao: `Imagem sugestiva de uretero-hidronefrose moderada bilateral. Considerar possibilidade de válvula de uretra posterior.`,
    },
  ],
  "salivares::achados": [
    {
      id: "sialolitiase",
      label: "Sialolitíase",
      texto: `Identifica-se cálculo salivar (sialolitíase) como imagem hiperecogênica com sombra acústica posterior, medindo ____ cm, localizado no ducto de Wharton (submandibular) / ducto de Stensen (parótida) / parênquima glandular à direita/esquerda. Pode haver dilatação ductal a montante. Correlacionar clinicamente.`,
      impressao: `Imagem sugestiva de sialolitíase (calculose salivar).`,
    },
    {
      id: "ectasia-ductal",
      label: "Ectasia ductal",
      texto: `Dilatação dos ductos salivares (ectasia ductal), com calibre de até ____ mm, podendo relacionar-se a obstrução crônica, estenose ou rolha de muco. Correlacionar clinicamente.`,
      impressao: `Sinais sugestivos de ectasia ductal salivar.`,
    },
    {
      id: "sialadenite-aguda",
      label: "Sialadenite aguda",
      texto: `Glândula de volume aumentado, hipoecoica, com arquitetura heterogênea e hipervascularização ao Doppler colorido, compatível com sialadenite aguda (bacteriana/viral). Dimensões aproximadas: ____ cm.`,
      impressao: `Sinais sugestivos de sialadenite aguda.`,
    },
    {
      id: "parotidite",
      label: "Parotidite",
      texto: `Glândula parótida de dimensões aumentadas, com ecotextura difusamente heterogênea e fluxo vascular aumentado ao Doppler, podendo associar linfonodos reativos intraparoítideos, medindo até ____ cm. Compatível com parotidite/sialadenite aguda.`,
      impressao: `Imagem sugestiva de parotidite.`,
    },
    {
      id: "sialadenite-cronica",
      label: "Sialadenite crônica",
      texto: `Glândula de volume reduzido/normal, com ecoestrutura heterogênea, áreas fibróticas e pequenos microcistos parenquimatosos, compatível com sialadenite crônica. Dimensões aproximadas: ____ cm.`,
      impressao: `Sinais sugestivos de sialadenite crônica.`,
    },
    {
      id: "abscesso-salivar",
      label: "Abscesso salivar",
      texto: `Coleção líquida mal delimitada/loculada no parênquima glandular, com reforço acústico posterior e hiperemia periférica ao Doppler, medindo ____ cm, compatível com abscesso salivar. Correlacionar clinicamente quanto à necessidade de drenagem.`,
      impressao: `Imagem sugestiva de abscesso salivar.`,
    },
    {
      id: "adenoma-pleomorfico",
      label: "Adenoma pleomórfico",
      texto: `Nódulo ovalado/lobulado, bem circunscrito, hipoecoico, com reforço acústico posterior, medindo ____ cm, com vascularização variável ao Doppler, compatível com adenoma pleomórfico. Correlacionar clinicamente e, se indicado, com PAAF.`,
      impressao: `Imagem sugestiva de adenoma pleomórfico.`,
    },
    {
      id: "tumor-warthin",
      label: "Tumor de Warthin",
      texto: `Nódulo bem definido, podendo conter áreas císticas internas, medindo ____ cm, localizado à direita/esquerda, padrão compatível com tumor de Warthin (pode ser bilateral/multifocal). Correlacionar clinicamente e, se indicado, com PAAF.`,
      impressao: `Imagem sugestiva de tumor de Warthin.`,
    },
    {
      id: "carcinoma-mucoepidermoide",
      label: "Carcinoma mucoepidermoide",
      texto: `Lesão nodular com características de suspeição (margens irregulares / infiltração de planos vizinhos / ausência de halo ecogênico), medindo ____ cm. Considerar carcinoma mucoepidermoide no diagnóstico diferencial. A PAAF/histologia permanece necessária para confirmação.`,
      impressao: `Imagem sugestiva de neoplasia maligna salivar (considerar carcinoma mucoepidermoide). Correlacionar com PAAF/histologia.`,
    },
    {
      id: "carcinoma-adenoide-cistico",
      label: "Carcinoma adenoide cístico",
      texto: `Lesão nodular com características de suspeição, medindo ____ cm, podendo associar-se a infiltração de planos adjacentes. Considerar carcinoma adenoide cístico (propensão à invasão perineural) no diagnóstico diferencial. Correlacionar com PAAF/histologia.`,
      impressao: `Imagem sugestiva de neoplasia maligna salivar (considerar carcinoma adenoide cístico). Correlacionar com PAAF/histologia.`,
    },
    {
      id: "neoplasia-maligna-outras",
      label: "Neoplasia maligna (outras)",
      texto: `Lesão nodular com características ultrassonográficas de suspeição (margens irregulares, infiltração de planos vizinhos e/ou linfonodomegalia cervical suspeita), medindo ____ cm. Considerar carcinoma de células acinares / adenocarcinoma / outra neoplasia maligna no diagnóstico diferencial. Correlacionar com PAAF/histologia.`,
      impressao: `Imagem sugestiva de neoplasia maligna das glândulas salivares. Correlacionar com PAAF/histologia.`,
    },
    {
      id: "sjogren",
      label: "Síndrome de Sjögren",
      texto: `Parênquima difusamente heterogêneo, pontilhado por múltiplos e pequenos focos hipoecoicos (infiltrados linfocíticos) circundados por traves ecogênicas fibróticas, padrão compatível com acometimento glandular na síndrome de Sjögren. Correlacionar clinicamente e laboratorialmente.`,
      impressao: `Sinais ultrassonográficos compatíveis com acometimento das glândulas salivares na síndrome de Sjögren.`,
    },
  ],
  "tireoide::tireoide": [
    {
      id: "cisto-tireoide",
      label: "Cisto tireóide",
      texto: `Imagem cística, de paredes finas e regulares, conteúdo anecóide homogêneo, no terço superior/médio/inferior do lobo, medindo ____ mm, distando ____ mm da pele ({{TIRADS}}).`,
      impressao: `Imagem sugestiva de cisto tireoidiano à direita/esquerda.`,
    },
    {
      id: "cistos-tireoide",
      label: "Cistos tireóide",
      texto: `Imagens císticas, de paredes finas e regulares, conteúdo anecóide homogêneo, caracterizadas assim ({{TIRADS}}):`,
      impressao: `Imagem sugestiva de cistos tireoidianos.`,
    },
    {
      id: "nodulo-tireoide",
      label: "Nódulo tireóide",
      texto: `Imagem nodular, sólida, de contornos regulares e bem definidos, conteúdo hipoecogênico, homogêneo, sem halo, sem calcificações evidentes, no terço superior/médio/inferior do lobo, medindo ____ cm, distando ____ cm da pele ({{TIRADS}}).`,
      impressao: `Imagem sugestiva de nódulo tireoidiano.`,
    },
    {
      id: "nodulos-tireoide",
      label: "Nódulos tireóide",
      texto: `Imagens nodulares, sólidas, de contornos regulares, conteúdo hipoecogênico/heterogêneo, sem halo ou calcificações evidentes, caracterizadas assim ({{TIRADS}}):`,
      impressao: `Imagem sugestiva de nódulos tireoidianos.`,
    },
    {
      id: "calcificacao-tireoide",
      label: "Calcificação",
      texto: `Foco(s) de calcificação no parênquima, medindo ____ mm, no terço superior/médio/inferior do lobo.`,
      impressao: `Imagem sugestiva de calcificação(ões) tireoidiana(s).`,
    },
    {
      id: "tireoide-heterogenea",
      label: "Tireóide heterogênea",
      texto: `Parênquima tireoidiano com ecotextura difusamente heterogênea.
Não há evidências de lesões parenquimatosas de caráter focal ou difuso, bem como calcificações patológicas.

ATI > 40 cm/s; VPD > 15 cm/s . IV – Inferno tireoidiano (Graves: Aumento da vascularização; VPS ATI: 50 a 150 cm/s; IR = 0,79 / IP = 1,36 ////// Hashimoto:
Aumento da vascularização; VPS ATI: normal). ATI: Artéria tireoidiana inferior.`,
      impressao: `Imagem sugestiva de tireóide de dimensões aumentadas e difusamente heterogênea. Considerar possibilidade de tireoidopatia de Graves.`,
    },
    {
      id: "tireoidectomia-total",
      label: "Tireoidectomia total",
      texto: `Glândula tireóide não caracterizada (status pós-operatório).`,
      impressao: `Imagem sugestiva de tireoidectomia total.`,
    },
    {
      id: "tireoidectomia-parcial",
      label: "Tireoidectomia parcial",
      texto: `Lobo direito/esquerdo e istmo tireoidiano: Não caracterizados (status pós-operatório).`,
      impressao: `Imagem sugestiva de tireoidectomia parcial à direita/esquerda.`,
    },
  ],
  "torax::achados": [
    {
      id: "derrame-pleural",
      label: "Derrame pleural",
      texto: `Moderada quantidade de líquido na cavidade pleural à direita/esquerda com aspecto anecóide, sem debris ou septações.`,
      impressao: `Imagem sugestiva de derrame pleural moderado à direita/esquerda.`,
    },
    {
      id: "derrame-pleural-com-atelectasia",
      label: "Derrame pleural com atelectasia",
      texto: `Moderada quantidade de líquido na cavidade pleural à direita/esquerda com aspecto anecóide, sem debris ou septações,
associado a atelectasia de segmentos basais do lobo inferior.`,
      impressao: `Imagem sugestiva de derrame pleural moderado à direita/esquerda com atelectasia.`,
    },
  ],
  "tornozelo-pe::achados": [
    {
      id: "cisto-s-artrossinovial-is",
      label: "Cisto(s) artrossinovial(is)",
      texto: `Formação cística lobulada, de conteúdo líquido, anecóide homogêneo, com colo de comunicação articular , entre a
articulação talo-navicular, medindo cm (L x AP x T).
Formações císticas lobuladas, de conteúdo líquido, anecóide homogêneo, com colo de comunicação articular, entre a s
articulações:
Imagem no plano coronal do
quadril avaliado em posição
neutra adequada para o
método de Graf. Neste plano
de corte a parede lateral do
ilíaco deve estar reta. Veja na
figura a seguir as estruturas
anatômicas que devem estar
representadas.
Indicação das estruturas
anatômicas que devem estar
presentes: 1= osso ilíaco; 2=
cartilagem trir adiada; 3= osso
ísquio; 4= epífise femoral
proximal; 5= metáfise femoral
proximal; 6= trocânter maior do
fêmur; setas = fibrocartilagem
do lábio (labrum) acetabular. No
quadril normal o promontório
acetabular (transição entre a
parede lateral do ilíaco e o teto
acetabular) deve formar um
ângulo agudo. Nos quadris
imaturos e nos quadris
displásicos o promontório
costuma ter contornos
arredondados.
A linha de base de Graf
corresponde a tangente a
parede lateral do osso ilíaco. A
parede lateral do ilíaco deve
necessariamente se apresentar
com morfologia reta, o que
indica que o plano de corte
escolhido está adequado para
realizar as mensurações.
O ângulo alfa de Graf reflete a
inclinação do teto acetabular.
Além da linha de base
precisamos de uma segunda
linha para definir este ângulo,
a linha do teto acetabular. A
linha do teto acetabular é
traçada tangencia`,
      impressao: `Imagem sugestiva de cisto artrossinovial.`,
    },
    {
      id: "osteoartrose-tarso",
      label: "Osteoartrose tarso",
      texto: `Borramento dos contornos e irregularidade das superfícies articulares nos ossos do tarso.`,
      impressao: `Imagem sugestiva de osteoartrose no pé.`,
    },
    {
      id: "entesopatia",
      label: "Entesopatia",
      texto: `Entesopatia calcificada de tendão calcâneo, medindo até cm.`,
      impressao: `Imagem sugestiva de entesófito de calcâneo.`,
    },
    {
      id: "tendinite-calcaneo",
      label: "Tendinite calcâneo",
      texto: `Tendão de Aquiles aumentado de calibre do calcâneo, medindo cm de espessura, associado a hipoecogenicidade textural
justa-insercional.
Tendão de Aquiles aumentado de calibre , medindo cm de espessura na zona crítica , a cm de sua inserção no calcâneo,
com hipoecogenicidade textural local, comprometendo cm longitudinal.`,
      impressao: `Imagem sugestiva de tendinopatia do calcâneo justa-insercional.`,
    },
    {
      id: "tendinose-calcaneo",
      label: "Tendinose calcâneo",
      texto: `Tendão de Aquiles aumentado de calibre em sua ins erção/no corpo, com hipoecogenicidade textural e microfocos
ecogênicos de fibrose intra-tendínea.`,
      impressao: `Imagem sugestiva de tendinose do calcâneo.`,
    },
    {
      id: "ruptura-total-do-tendao-calcaneo",
      label: "Ruptura total do tendão calcâneo",
      texto: `Tendão de Aquiles apresentando descontinuidade total a aproximadamente cm de sua inserçã o no calcâneo, na projeção
da zona crítica, com distância entre os fragmentos de cerca de cm em repouso e cm na posição em “equino” e
preenchimento da área rota por efusão líquida hemorrágica.`,
      impressao: `Imagem sugestiva de ruptura total do tendão calcâneo.`,
    },
    {
      id: "ruptura-parcial-do-tendao-calcaneo",
      label: "Ruptura parcial do tendão calcâneo",
      texto: `Tendão de Aquiles apresentando descontinuidade parcial das fibras mais profundas/superficias/laterais/mediais a
aproximadamente cm de sua inserção no calcâneo, na projeção da zona crítica, medindo cm longitudinal x cm
transversal e preenchimento da área rota por efusão líquida hemorrágica.`,
      impressao: `Imagem sugestiva de ruptura parcial do tendão calcâneo.`,
    },
    {
      id: "tenossinovite-tibial-posterior",
      label: "Tenossinovite tibial posterior",
      texto: `Tendão do tibial posterior aumentado de calibre em sua porção maleolar e infra maleolar, com hipoecogenicidade textur al
e líquido em sua sinóvia, comprometendo cerca de cm longitudinal.`,
      impressao: `Imagem sugestiva de tenossinovite do tibial posterior.`,
    },
    {
      id: "tendinose-tibial-posterior",
      label: "Tendinose tibial posterior",
      texto: `Tendão tibial posterior aumentado de calibre na porção maleolar e infra -maleolar, com heterogeneidade textural e
desorganização da arquitetura por micro -focos ecogênicos de fibrose/calcificação e anecóicos de necrose intra -tendínea
de permeio por roturas degenerativas locais.`,
      impressao: `Imagem sugestiva de tendinose do tibial posterior.`,
    },
    {
      id: "tenossinovite-dos-fibulares",
      label: "Tenossinovite dos fibulares",
      texto: `Tendões fibulares aumentados de calibre na porção maleolar, com halo a necóico de edema sinovial local, comprometendo
cerca de cm longitudinal.`,
      impressao: `Imagem sugestiva de tenossinovite dos fibulares.`,
    },
    {
      id: "fascite-plantar",
      label: "Fascite plantar",
      texto: `Fáscia plantar com espessura aumentada em sua inserção no calcâneo, medi ndo cm de calibre, com hipoecogenicidade
textural local.
Fáscia plantar com espessura aumentada em suas fibras mais mediais, a cerca de cm da inserção no calcâneo, medindo
cm de calibre, comprometendo cm longitudinal, associado a hipoecogenicidade textural local.`,
      impressao: `Imagem sugestiva de fascite plantar.`,
    },
    {
      id: "fascite-cronica-plantar",
      label: "Fascite crônica plantar",
      texto: `Fáscia plantar aumentada de calibre em sua inserção no calcâneo, com hipoecogenicidade textural e focos de
fibrose/calcificação de permeio. Irregularidade da superfície óssea adjacente.`,
      impressao: `Imagem sugestiva de fascite crônica plantar.`,
    },
    {
      id: "talalgia-de-impacto",
      label: "Talalgia de impacto",
      texto: `Coxim plantar (fat pad) com alteração textural da superfície óssea adjacente. Espessura do coxim de {{MEDIDA}} (normal <1,5 cm).`,
      impressao: `Imagem sugestiva de talalgia do impacto.`,
    },
    {
      id: "neuroma-de-morton",
      label: "Neuroma de morton",
      texto: `Formação hipoecogênica, comprimindo-se à manobra de Mulder, medindo {{MEDIDA}}.`,
      impressao: `Imagem sugestiva de imagem nodular entre o 3º e 4º metatarso. Considerar possibilidade de neuroma de Morton.`,
    },
    {
      id: "derrame-articular",
      label: "Derrame articular",
      texto: `Derrame articular leve/moderado tíbio-talar de aspecto anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de derrame articular tíbio-talar leve/moderado.`,
    },
    {
      id: "lesao-ligamentar",
      label: "Lesão ligamentar",
      texto: `Ligamento apresentando descontinuidad e total com estravazamento de lí quido articular na área dissecando o fragmento
roto.
Ligamentos: talo-fibular anterior/calcâneo-fibular/tíbio-fibular/deltóide.`,
      impressao: `Imagem sugestiva de ruptura do ligamento *.`,
    },
    {
      id: "fibromatose-plantar-doenca-de-ledderhose",
      label: "Fibromatose plantar (doença de ledde…",
      texto: `Fáscia plantar apresentando a cerca de {{MEDIDA}} da inserção no calcâneo, área de espessamento nodular alongada com
hipoecogenicidade textural local, medindo ____ cm no eixo da fáscia por ____ cm de espessura.`,
      impressao: `Imagem sugestiva de espessamento nodular da fáscia plantar. Considerar possibilidade de fibromatose plantar (Doença de Ledderhose).`,
    },
  ],
  "tv::achados": [
    {
      id: "abortamento-em-curso",
      label: "Abortamento em curso",
      texto: `Saco gestacional na cavidade uterina, deslocado, em topografia ístmica , de contornos irregulares, medindo cm (diâmetro
médio cm).
saco gestacional, ocupando cerca de 40% do mesmo, sugerindo hematoma retrocoriônico.

Imagem ecogênica no interior do saco gestacional, medindo cm no maior eixo, sugerindo eco embrionário.
Movimentos embrionários e batimentos cardíacos ausentes.
Vesícula vitelina não caracterizada.`,
      impressao: `Imagem sugestiva de abortamento em curso.`,
    },
    {
      id: "dipa",
      label: "DIPA",
      texto: `Pequena quantidade de líquido livre no fundo de saco posterior e regiões anexiais com aspecto anecóide e homogêneo.`,
      impressao: `Imagem sugestiva de pequena quantidade de líquido livre na escavação pélvica. Considerar possibilidade de doença inflamatória pélvica.`,
    },
    {
      id: "ectopica-massa",
      label: "Ectópica: massa",
      texto: `moderados debris de permeio, sem fluxo ao Doppler, medindo cm (vol = cm³).
Moderada quantidade de líquido livre de aspecto anecóide, com moderados debris e traves de permeio, se estendendo do
fundo de saco posterior até espaços hepato e espleno-renais.`,
      impressao: `Imagem sugestiva de moderada quantidade de líquido intraperitoneal, sugerindo sangue/coágulos.`,
    },
    {
      id: "ectopica-rota-ou-cisto-hemorragico-massa",
      label: "Ectópica rota ou cisto hemorrágico: …",
      texto: `pelo método ecográfico, contornos irregulares com septos espessos e moderados debris de permeio, sem fluxo ao
Doppler, medindo cm (vol = cm³).
Moderada quantidade de líquido livre de aspecto anecóide, com moderados debris e septações finas de permeio, se
estendendo do fundo de saco posterior até espaços hepato e espleno-renais.
roto.`,
      impressao: `Imagem sugestiva de moderada quantidade de líquido intraperitoneal, sugerindo sangue/coágulos.`,
    },
    {
      id: "ectopica-anel-tubario",
      label: "Ectópica: anel tubário",
      texto: `regulares, medindo cm, com paredes espessas hipoecogênicas e fluxo ao Doppler ocupando cerca de 1/3 da
circunferência. Apresenta no inte rior imagem compatível com saco gestacional ectópico, de contornos regulares e
medindo cm (diâmetro médio cm), com vesícula vitelina presente, medindo cm. Embrião não caracterizado.`,
      impressao: `Imagem sugestiva de gestação ectópica tubária à direita/esquerda.`,
    },
    {
      id: "ectopica-bcf",
      label: "Ectópica: BCF +",
      texto: `com paredes espessas hipoecogênicas e fluxo ao Doppler ocupando cerca de 1/3 da circunferência. Apresenta no interior
imagem compatível com saco gestacional ectópico de contornos regulares e medindo cm (diâmetro médi o cm), com
vesícula vitelina presente, medindo cm e embrião único de comprimento cabeça -nádega (CCN) medindo cm. Movimentos
embrionários e batimentos cardíacos presentes (BCF = bpm).`,
      impressao: `Imagem sugestiva de gestação ectópica tubária à direita/esquerda com embrião único e vivo.`,
    },
    {
      id: "hematoma-retrocorionico",
      label: "Hematoma retrocoriônico",
      texto: `Saco gestacional tópico, de contornos discretamante irregulares e medindo cm (diâmetro médio cm).
saco gestacional, ocupando cerca de 40% do mesmo, sugerindo hematoma.
saco gestacional, ocupando cerca de 40% do mesmo, se insinuando pelo orifício interno do colo uterino.`,
      impressao: `Imagem sugestiva de hematoma retrocoriônico.`,
    },
    {
      id: "caracteristicas-pontuacao-1-ponto-2-pontos-3-pontos",
      label: "Características/pontuação 1 ponto 2 …",
      texto: `Período da vida Fase secretora Fase proliferativa Infância/menopausa
Morfologia tumoral Cisto simples Cisto denso/septo fino e liso Septo grosseiro/cisto papilífero/tumor
misto, complexo ou sólido
Power Doppler ou Colorido Vasos não evidentes Vasos somente na cápsula Vasos no interior
Doppler espectral Diástole zero Diástole positiva com incisura Diástole positiva sem incisura
Índice de impedância Altos (RI > 0,75 / PI > 1,5) Médios (RI 0,75 a 0,50 / PI 1,5 a 1,0) Baixos (RI < 0,5 / PI < 1,5)
Falsos positivos: Cisto luteínico hemorrágico, massas inflamatórias, hidrossalpinge pseudofolicular, ectópica anômala, rim pélvico, cisto de retenção/mesotelial.`,
      impressao: `Imagem sugestiva de características/pontuação 1 ponto 2 pontos 3 pontos.`,
    },
    {
      id: "mola-hidatiforme",
      label: "Mola hidatiforme",
      texto: `Cavidade uterina preenchida por material heterogêneo, predominantemente ecogênico com diminutas áreas císticas de
permeio, de aspecto vesicular, sem sinais de componentes ósseos, medindo cm de espessura e volume estimado de cm³.
Planos de clivagem aparentemente bem definidos entre a cavidade endometrial e a parede anterior do miométrio.
Parede posterior do miométrio de difícil avaliação ecográfica devido a atenuação dos feixes sonoros posteriores.

ÓBITO EMBRIONÁRIO (IG > 7 sem)
Saco gestacional tópico, de contornos irregulares e medindo cm (diâmetro médio cm), associado a reação decidual
heterogênea adjacente.
Vesícula vitelínica não visibilizada.
Embrião único com comprimento cabeça-nádega (CCN) medindo cm.
Movimentos embrionários e batimentos cardíacos ausentes.

Líquido amniótico em quantidade aumentada.

ÓBITO EMBRIONÁRIO BODERLINE (BCF não detectado)
Vesícula vitelínica não visibilizada.
Embrião único com comprimento cabeça-nádega (CCN) medindo cm.
Movimentos embrionários e batimentos cardíacos não detectados.

ÓBITO EMBRIONÁRIO: GESTAÇÃO INVIÁVEL (embrião em degeneração)
Saco gestacional tópico, de contornos r egulares e medindo cm ( diâmetro médio cm: compatível com idade gestacional de
semana e dias).
Líquido amniótico em quantidade aumentada para a idade gestacional do possível CCN.
Vesícula vitelínica não caracterizada.
Imagem ecogênica no interior do saco gestacional, medindo cm no maior eixo, sugerindo eco embrionário .
Movimentos embrionários e batimentos cardía`,
      impressao: `Imagem sugestiva de material heterogêneo na cavidade uterina. Considerar possibilida de de doença trofoblástica gestacional.`,
    },
    {
      id: "restos-ovulares",
      label: "Restos ovulares",
      texto: `Cavidade uterina ocupada por material heterogêneo, predominan temente hiperecogênico, sem fluxo ao Doppler, medindo
até cm de espessura, podendo corresponder à sangue, coágulos e/ou restos ovulares.
Cavidade uterina preenchida por material heterogêneo, sem fluxo ao estudo Doppler, medindo até cm de espessura.
ovulares/coágulos.

(Recomendação: Mínima/normal: < 0,5 cm; Pequena: 0,5-1,0 cm; Moderada: 1,0-2,0 cm; Acentuada: > 2,0 cm).`,
      impressao: `Imagem sugestiva de material heterogêneo em moderada quantidade na cavidade uterina. Considerar possibilidade de restos.`,
    },
  ],
  "tv::ovarios": [
    {
      id: "cisto-ovariano",
      label: "Cisto ovariano",
      texto: `Ovário direito/esquerdo em topografia, morfologia, contornos e ecotextura normais, apresentando em seu interior imagem
cística, de paredes finas e regulares, conteúdo anecóide homogêneo, medindo cm.
Medidas ovarianas: cm (volume: cm³).`,
      impressao: `Imagem sugestiva de cisto ovariano à direita/esquerda.`,
    },
    {
      id: "cistos-ovarianos",
      label: "Cistos ovarianos",
      texto: `Ovário direito/esquerdo em topografia, morfologia, contornos e ecotext ura normais, apresentando em seu interior imagens
cística, de paredes finas e regulares, conteúdo anecóide homogêneo, medindo até cm.
Medidas ovarianas: cm (volume: cm³).`,
      impressao: `Imagem sugestiva de cistos ovarianos à direita/esquerda.`,
    },
    {
      id: "cisto-funcional-ovariano",
      label: "Cisto funcional ovariano",
      texto: `Ovário direito/esquerdo em topografia, morfologia, contornos e ecotextura normais, apresentando em seu interior imagem cística
anecóide, de paredes finas e lisas, medindo cm, sugerindo cisto funcional folicular.
Medidas ovarianas: cm (volume: cm³).`,
      impressao: `Imagem sugestiva de cisto funcional ovariano.`,
    },
    {
      id: "cistos-funcionais-ovarianos",
      label: "Cistos funcionais ovarianos",
      texto: `Ovário direito/esquerdo em topografia, morfologia, contornos e ecotextura normais, apresentando algumas imagens císticas
anecóides, de paredes finas e lisas, medindo até cm, sugerindo cistos funcionais.`,
      impressao: `Imagem sugestiva de cistos funcionais ovarianos.`,
    },
    {
      id: "cisto-hemorragico-ovariano",
      label: "Cisto hemorrágico ovariano",
      texto: `Ovário direito/ esquerdo em topografia habitual, com ecotextura heterogênea, à custa de imagem cística, com paredes
espessas, conteúdo com moderados debris e traves de permeio, sem fluxo ao Doppler, medindo cm (vol = cm³), sugerindo
cisto hemorrágico.
Medidas ovarianas: cm (volume: cm³).

CISTO(s) NABOTH
Cisto de Naboth de aspecto habitual no colo uterino, medindo cm.
Cistos de Naboth de aspecto habitual no colo uterino, medindo até cm.`,
      impressao: `Imagem sugestiva de cisto ovariano hemorrágico à direita/esquerda.`,
    },
    {
      id: "corpo-luteo",
      label: "Corpo lúteo",
      texto: `Ovário direito/esquerdo em topografia, morfologia, contornos e ecotextura normais, apresentando em seu interior imagem
cística, de paredes espessas e regulares, conteúdo anecóide homogêneo, medindo cm, sugerindo corpo lúteo.

DIU
Cavidade uterina virtual, apresentando em seu interior dispositivo intra -uterino (DIU) distando cm do cavidade fúndica
(normal < 0,5 cm) e cm da serosa fúndica (normal < 2,0 cm).`,
      impressao: `Imagem sugestiva de dIU normoposicionado.`,
    },
    {
      id: "ectopica-anel-tubario-ou-cisto-ovariano",
      label: "Ectópica: anel tubário ou cisto ovar…",
      texto: `distinção pelo método ecográfico, de contorn os bem definidos e regulares, com paredes espessas, hipoecogênicas e fluxo
ao Doppler ocupando cerca de 1/3 da circunferência, medindo cm (vol: cm³). Área cística central mede cm (diâmetro
médio cm). Ausência de sinais de vesícula vitelina ou embrião.`,
      impressao: `Imagem sugestiva de imagem cística anexial à direita/esquerda. Considerar possibilidade de gestação ectópica ou cisto ovariano/corpo lúteo.`,
    },
    {
      id: "massa-ovariana",
      label: "Massa ovariana",
      texto: `predominantemente hiperecogênico, sem calcificações evidentes, medindo cerca de cm (volume estim ado: cm³).
Ao Doppler evidenciou-se vasos periféricos e centrais, com diástole positiva e sem incisura. IR= e IP= ..`,
      impressao: `Imagem sugestiva de massa pélvica. Considerar possibilidade de neoplasia ovariana dentre as hipóteses diagnósticas.`,
    },
    {
      id: "micropolicitico",
      label: "Micropolicítico",
      texto: `Ovário direito/esquerdo em topografia e contornos normais, de aspecto globoso com múltiplas pequenas imagens císticas,
anecóides, predominantemente periféricas, com diâmetro médio de 0,5 cm.
Medidas ovarianas: cm (volume: cm³).`,
      impressao: `Imagem sugestiva de ovários de aspecto micropolicístico.`,
    },
    {
      id: "varizes-pelvicas",
      label: "Varizes pélvicas",
      texto: `Varizes pélvicas bilaterais.`,
      impressao: `Imagem sugestiva de varizes pélvicas bilaterais.`,
    },
  ],
  "tv::utero": [
    {
      id: "endometrio-espessamento-pos-menopausa",
      label: "Endometrio: espessamento pós-menopausa",
      texto: `Endométrio hiperecogênico, homogêneo, medindo cm de espessura.
Endométrio heterogêneo, predominantemente hiperecogênico, medindo cm de espessura.

0,7-1,5 cm; Fase secretora (lútea) precoce: 0,8-1,7 cm; Secretora tardia: 0,7-1,4 cm; Pós-menopausa (sem TRH) < 0,5 cm; Pós-menopausa (com TRH): 0,6-1,0 cm.`,
      impressao: `Imagem sugestiva de espessamento endometrial.`,
    },
    {
      id: "endometrio-fases",
      label: "Endometrio: fases",
      texto: `Endométrio homogêneo, centrado e medindo cm de espessura (compatível com fase pós-menopausa).
Endométrio trilaminar, homogêneo, centrado e medindo cm de espessura (compatível com fase proliferativa).
Cavidade uterina apresentando fina lâmina líquida, anecóide de cm de espessura com e ndométrio trilaminar, homogêneo, centrado
e medindo cm de espessura (compatível com fase peri-ovulatória).
Endométrio hiperecogênico, homogêneo, centrado e medindo cm de espessura (compatível com fase secretora).
Endométrio levemente heterogêneo, predominantemente hiperecogênico e medindo cm de espessura (compatível com fase menstrual).

Fase secretora (lútea) precoce: 8-17 mm; Secretora tardia: 7-14 mm; Pós-menopausa (sem TRH) < 5 mm; Pós-menopausa (com TRH): 6-10 mm.`,
      impressao: `Imagem sugestiva de endometrio: fases.`,
    },
    {
      id: "endometriose-adenomiose",
      label: "Endometriose/adenomiose",
      texto: `Miométrio com ecotextura difusamente heterogênea apresentando parede anterior ( cm) de espessura maior que a
posterior ( cm).
medindo até cm.`,
      impressao: `Imagem sugestiva de miométrio difusamente heterogêneo. Considerar possibilidade de adenomiose.`,
    },
    {
      id: "histerectomia",
      label: "Histerectomia",
      texto: `Útero não caracterizado (status pós-operatório).
Útero caracterizado somente em sua porção do colo com forma, contornos e ecotextura habituais (status pós-operatório).
Medidas do colo: cm (L x AP x T). Volume: cm³.`,
      impressao: `Imagem sugestiva de histerectomia total.`,
    },
    {
      id: "malformacoes-mullerianas",
      label: "Malformações müllerianas",
      texto: `de espessura.
Útero em anteversoflexão apresentando duas regiões cornuais, medindo à direita cm (L x AP x T) e à esquerda cm (L x AP
x T). Volume uterino de cm³.
Cavidades uterinas virtuais.
Endométrio homogêneo, centrado e medindo cm de espessura à direita e cm à esquerda.
Colo uterino aparentemente único, medindo cm longitudinal.
Útero em anteversoflexão apresentando duas regiões cornuais, medindo à direita cm (L x AP x T) e à esquerda cm (L x AP
x T). Volume uterino de cm³.
Cavidades uterinas virtuais.
Endométrio homogêneo, centrado e medindo cm de espessura à direita e cm à esquerda.
Colo uterino duplo, medindo cm longitudinal à direita e cm à esquerda.`,
      impressao: `Imagem sugestiva de aparente septo na região fúndica da cavidade uterina. Considerar possibilidade de útero subseptado.`,
    },
    {
      id: "mioma",
      label: "Mioma",
      texto: `Miométrio com ecotextura homogênea, exceto por imagem nodular, sólida, de contornos bem definidos e regulares,
conteúdo hipoecogênico/heterogêneo, na parede anterior/intramural, medindo cm.`,
      impressao: `Imagem sugestiva de nódulo uterino sugestivo de mioma.`,
    },
    {
      id: "miomas",
      label: "Miomas",
      texto: `Miométrio com ecotextura homogênea/heterogênea apresentando imagens nodulares, sólidas,
hipoecogênicas/heterogêneas, de contornos regulares, nas paredes:`,
      impressao: `Imagem sugestiva de anterior/intramural, medindo  cm.`,
    },
    {
      id: "polipo-endometrial",
      label: "Pólipo endometrial",
      texto: `Cavidade uterina apresentando imagem nodular hiperecogênica, de aspecto polipóide, em continuidade c om a camada
basal do endométrio na região fúndica, medindo cm.
Cavidade uterina apresentando imagem nodular, sólida, hiperecogênica, na região fúndica, medindo cm.
Endométrio trilaminar, centrado e medindo cm de espessura (compatível com a fase proliferativa).`,
      impressao: `Imagem sugestiva de pólipo endometrial.`,
    },
    {
      id: "pseudo-cavidade-uterina-da-cicatriz-cesariana",
      label: "Pseudo-cavidade uterina da cicatriz …",
      texto: `comunicação com a cavidade endometrial, medindo mm.`,
      impressao: `Imagem sugestiva de pseudo-cavidade uterina da cicatriz cesariana.`,
    },
  ],
  "vertebrais::achados": [
    {
      id: "estenose-proximal-exame-direto-da-lesao",
      label: "Estenose proximal (exame direto da l…",
      texto: `A artéria vertebral foi explorada em sua origem, sendo evidenciada placa aterosclerótica nesta topografia. Ao Doppler observa -se
curva espectral de amplitude aumentada e alargamento espectral.
O segmento interapofisário apresenta diâmetro normal. Ao Doppler observa-se fluxo de direção cefálica, com curva de amplitude
normal, sem turbulência e aceleração.
intracraniano.`,
      impressao: `Imagem sugestiva de estenose superior a 50% da artéria vertebral.`,
    },
    {
      id: "estenose-proximal-sem-exame-direto-da-lesao",
      label: "Estenose proximal (sem exame direto …",
      texto: `A artéria vertebral foi explorada em seu segmento interapofisário e apresenta diâmetro normal. Ao Doppler observa -se fluxo de
direção cefálica, com curva de amplitude acentuadamente reduzida, sem turbulência e aceleração.`,
      impressao: `Imagem sugestiva de estenose proximal (sem exame direto da lesão).`,
    },
    {
      id: "oclusao",
      label: "Oclusão",
      texto: `A artéria vertebral foi explorada em sua origem, sendo evidenciada placa aterosclerótica nesta topografia. Não se observa sinal
Doppler neste vaso.`,
      impressao: `Imagem sugestiva de achados compatíveis com oclusão da artéria vertebral.`,
    },
    {
      id: "oclusao-proximal-com-enchimento-por-colaterais",
      label: "Oclusão proximal com enchimento por …",
      texto: `A artéria ve rtebral foi explorada em sua origem, sendo evidenciada placa aterosclerótica nesta topografia. Não se observa sinal
Doppler neste vaso.
O segmento interapofisário apresenta diâmetro normal. Ao Doppler observa -se enchimento deste vaso por circulação colater al,
determinando fluxo de direção cefálica, com curva de amplitude reduzida, sem turbulência e aceleração.`,
      impressao: `Imagem sugestiva de oclusão proximal com enchimento por colaterais.`,
    },
    {
      id: "hipoplasia",
      label: "Hipoplasia",
      texto: `A artéria vertebral foi explorada em seu segmento interapofisário e apresenta diâmetro difusamente reduzido ( mm). Ao Doppler
observa-se fluxo de direção cefálica, com curva de amplitude acentuadamente reduzida, sem componente diastólico (padrão de
resistência aumentada).`,
      impressao: `Imagem sugestiva de achados compatíveis com hipoplasia da artéria vertebral.`,
    },
    {
      id: "fenomeno-do-roubo-subclavio",
      label: "Fenômeno do roubo subclávio",
      texto: `A artéria vertebral foi explor ada em seu segmento interapofisário e apresenta diâmetro normal. Ao Doppler observa-se fluxo de
direção caudal, com curva de amplitude normal, sem turbulência e aceleração.
Foi realizada insuflação do esfigmomanômtero na artéria braquial acima da pressão s istólica sendo verificada interrupção do fluxo
descendente da artéria vertebral.`,
      impressao: `Imagem sugestiva de alterações no fluxo vertebral esquerdo compatíveis com “roubo da subclávia”.`,
    },
    {
      id: "oclusao-ou-estenose-grave-distal",
      label: "Oclusão ou estenose grave distal",
      texto: `A artéria vertebral foi explorada em seu segmento interapofisá rio e apresenta diâmetro normal. Ao Doppler observa -se fluxo de
direção cefálica, com curva de amplitude reduzida, com componente reverso e ausência de componente diastólico (padrão de
resistência elevada).`,
      impressao: `Imagem sugestiva de oclusão ou estenose grave distal.`,
    },
  ],
  "dermatologico::epiderme": [
    {
      id: "cisto-epidermoide",
      label: "Cisto epidermoide",
      texto: `Identifica-se lesão bem circunscrita, hipoecogênica ou de ecotextura mista, em topografia epidérmica/superficial, medindo ____ cm, frequentemente com continuidade com a epiderme, compatível com cisto epidermoide.`,
      impressao: `Imagem sugestiva de cisto epidermoide (epiderme/superficial).`,
    },
    {
      id: "celulite",
      label: "Celulite",
      texto: `Edema e borramento dos planos superficiais/epidérmicos, com aumento da ecogenicidade, sem coleção líquida bem definida drenável, compatível com celulite no campo do exame.`,
      impressao: `Sinais sugestivos de celulite (planos superficiais).`,
    },
    {
      id: "abscesso",
      label: "Abscesso",
      texto: `Coleção líquida bem definida, de conteúdo anecóico/hipoecogênico, eventualmente com debris, medindo ____ cm, em topografia superficial, compatível com abscesso. Avaliar necessidade de drenagem clinicamente.`,
      impressao: `Imagem sugestiva de abscesso superficial.`,
    },
    {
      id: "foliculite",
      label: "Foliculite",
      texto: `Foco inflamatório superficial centrado em folículo piloso, com hipoecogenicidade peri-folicular e eventual pequena coleção, compatível com foliculite.`,
      impressao: `Sinais sugestivos de foliculite.`,
    },
    {
      id: "hidradenite-supurativa",
      label: "Hidradenite supurativa",
      texto: `Sinais inflamatórios superficiais com trajetos/coleções iniciais, compatíveis com hidradenite supurativa no campo do exame. Correlacionar clinicamente.`,
      impressao: `Sinais sugestivos de hidradenite supurativa (superficial).`,
    },
    {
      id: "carcinoma-basocelular",
      label: "Carcinoma basocelular (CBC)",
      texto: `Lesão superficial com características ecográficas compatíveis com carcinoma basocelular, medindo ____ cm. Avaliada a profundidade de invasão. A biópsia permanece o padrão-ouro histopatológico.`,
      impressao: `Imagem sugestiva de carcinoma basocelular. Correlacionar com histopatologia.`,
    },
    {
      id: "carcinoma-celulas-escamosas",
      label: "Carcinoma de células escamosas (CCE)",
      texto: `Lesão superficial com características ecográficas compatíveis com carcinoma de células escamosas, medindo ____ cm. Avaliada a profundidade de invasão. Correlacionar com histopatologia.`,
      impressao: `Imagem sugestiva de carcinoma de células escamosas. Correlacionar com histopatologia.`,
    },
    {
      id: "melanoma-cutaneo",
      label: "Melanoma cutâneo",
      texto: `Lesão cutânea superficial com espessura estimada de ____ mm (correlação com índice de Breslow). A histologia permanece definitiva.`,
      impressao: `Imagem sugestiva de melanoma cutâneo (espessura estimada). Correlacionar com histopatologia.`,
    },
    {
      id: "corpo-estranho",
      label: "Corpo estranho",
      texto: `Imagem ecogênica compatível com corpo estranho superficial, medindo ____ cm, com eventual halo inflamatório. Correlacionar com história clínica.`,
      impressao: `Imagem sugestiva de corpo estranho superficial.`,
    },
    {
      id: "cicatriz-hipertrofica",
      label: "Cicatriz hipertrófica",
      texto: `Área cicatricial superficial com espessura aumentada, medindo ____ cm de espessura, compatível com cicatriz hipertrófica.`,
      impressao: `Imagem sugestiva de cicatriz hipertrófica.`,
    },
    {
      id: "queloide",
      label: "Queloide",
      texto: `Formação cicatricial superficial espessada, medindo ____ cm de espessura, compatível com queloide.`,
      impressao: `Imagem sugestiva de queloide.`,
    },
    {
      id: "nevo-melanocitico",
      label: "Nevo melanocítico",
      texto: `Formação epidérmica/superficial compatível com nevo melanocítico, medindo ____ cm. Correlacionar clinicamente e, se indicado, com dermatoscopia/histologia.`,
      impressao: `Imagem sugestiva de nevo melanocítico.`,
    },
  ],
  "dermatologico::derme": [
    {
      id: "cisto-epidermoide",
      label: "Cisto epidermoide",
      texto: `Lesão bem circunscrita, hipoecogênica ou mista, na derme, medindo ____ cm, frequentemente com continuidade com a epiderme, compatível com cisto epidermoide.`,
      impressao: `Imagem sugestiva de cisto epidermoide (derme).`,
    },
    {
      id: "hemangioma-malformacao-vascular",
      label: "Hemangioma / malformação vascular",
      texto: `Lesão dérmica de aspecto vascularizado ao Doppler colorido, medindo ____ cm, podendo conter flebólitos nos casos de malformação venosa. Correlacionar clinicamente.`,
      impressao: `Imagem sugestiva de hemangioma / malformação vascular (derme).`,
    },
    {
      id: "celulite",
      label: "Celulite",
      texto: `Edema difuso da derme, com aumento da ecogenicidade e borramento dos planos, sem coleção líquida bem definida drenável, compatível com celulite.`,
      impressao: `Sinais sugestivos de celulite (derme).`,
    },
    {
      id: "abscesso",
      label: "Abscesso",
      texto: `Coleção líquida bem definida na derme, de conteúdo anecóico/hipoecogênico, eventualmente com debris, medindo ____ cm, compatível com abscesso.`,
      impressao: `Imagem sugestiva de abscesso dérmico.`,
    },
    {
      id: "foliculite",
      label: "Foliculite",
      texto: `Alterações inflamatórias dérmicas centradas em folículo(s) piloso(s), com hipoecogenicidade peri-folicular e eventual pequena coleção, compatíveis com foliculite.`,
      impressao: `Sinais sugestivos de foliculite (derme).`,
    },
    {
      id: "hidradenite-supurativa",
      label: "Hidradenite supurativa",
      texto: `Trajetos fistulosos e/ou coleções na derme, com sinais de acometimento inflamatório, compatíveis com hidradenite supurativa.`,
      impressao: `Sinais sugestivos de hidradenite supurativa (derme).`,
    },
    {
      id: "carcinoma-basocelular",
      label: "Carcinoma basocelular (CBC)",
      texto: `Lesão dérmica compatível com carcinoma basocelular, medindo ____ cm. Avaliada a profundidade de invasão na derme. A biópsia permanece o padrão-ouro.`,
      impressao: `Imagem sugestiva de carcinoma basocelular (derme). Correlacionar com histopatologia.`,
    },
    {
      id: "carcinoma-celulas-escamosas",
      label: "Carcinoma de células escamosas (CCE)",
      texto: `Lesão dérmica compatível com carcinoma de células escamosas, medindo ____ cm. Avaliada a profundidade de invasão. Correlacionar com histopatologia.`,
      impressao: `Imagem sugestiva de carcinoma de células escamosas (derme). Correlacionar com histopatologia.`,
    },
    {
      id: "melanoma-cutaneo",
      label: "Melanoma cutâneo",
      texto: `Lesão dérmica com espessura estimada de ____ mm (correlação com índice de Breslow). A histologia permanece definitiva.`,
      impressao: `Imagem sugestiva de melanoma cutâneo (derme). Correlacionar com histopatologia.`,
    },
    {
      id: "corpo-estranho",
      label: "Corpo estranho",
      texto: `Imagem ecogênica compatível com corpo estranho na derme, medindo ____ cm, com eventual halo inflamatório. Correlacionar com história clínica.`,
      impressao: `Imagem sugestiva de corpo estranho dérmico.`,
    },
    {
      id: "cicatriz-hipertrofica",
      label: "Cicatriz hipertrófica",
      texto: `Área cicatricial dérmica com espessura aumentada, medindo ____ cm de espessura, compatível com cicatriz hipertrófica.`,
      impressao: `Imagem sugestiva de cicatriz hipertrófica (derme).`,
    },
    {
      id: "queloide",
      label: "Queloide",
      texto: `Formação cicatricial dérmica espessada, medindo ____ cm de espessura, compatível com queloide.`,
      impressao: `Imagem sugestiva de queloide (derme).`,
    },
  ],
  "dermatologico::hipoderme": [
    {
      id: "cisto-epidermoide",
      label: "Cisto epidermoide",
      texto: `Lesão bem circunscrita, hipoecogênica ou mista, no tecido subcutâneo, medindo ____ cm, compatível com cisto epidermoide de extensão subcutânea.`,
      impressao: `Imagem sugestiva de cisto epidermoide subcutâneo.`,
    },
    {
      id: "lipoma",
      label: "Lipoma",
      texto: `Nódulo hiperecogênico/isoecogênico, bem delimitado, no subcutâneo, medindo ____ cm, com estriações paralelas ecogênicas características, compatível com lipoma.`,
      impressao: `Imagem sugestiva de lipoma subcutâneo.`,
    },
    {
      id: "hemangioma-malformacao-vascular",
      label: "Hemangioma / malformação vascular",
      texto: `Lesão no subcutâneo, vascularizada ao Doppler colorido, medindo ____ cm, podendo conter flebólitos nos casos de malformação venosa. Correlacionar clinicamente.`,
      impressao: `Imagem sugestiva de hemangioma / malformação vascular (subcutâneo).`,
    },
    {
      id: "celulite",
      label: "Celulite",
      texto: `Edema e aumento da ecogenicidade do tecido subcutâneo, com borramento dos planos, sem coleção líquida bem definida drenável, compatível com celulite.`,
      impressao: `Sinais sugestivos de celulite (subcutâneo).`,
    },
    {
      id: "abscesso",
      label: "Abscesso",
      texto: `Coleção líquida bem definida no subcutâneo, de conteúdo anecóico/hipoecogênico, eventualmente com debris, medindo ____ cm, compatível com abscesso.`,
      impressao: `Imagem sugestiva de abscesso subcutâneo.`,
    },
    {
      id: "foliculite",
      label: "Foliculite",
      texto: `Extensão inflamatória ao subcutâneo a partir de foco folicular, com hipoecogenicidade e eventual pequena coleção, compatível com foliculite/extensão inflamatória.`,
      impressao: `Sinais sugestivos de foliculite com extensão subcutânea.`,
    },
    {
      id: "hidradenite-supurativa",
      label: "Hidradenite supurativa",
      texto: `Trajetos fistulosos e/ou coleções profundas no subcutâneo, com sinais de acometimento inflamatório, compatíveis com hidradenite supurativa.`,
      impressao: `Sinais sugestivos de hidradenite supurativa (subcutâneo).`,
    },
    {
      id: "paniculite",
      label: "Paniculite",
      texto: `Alteração da ecogenicidade da gordura subcutânea, frequentemente associada a espessamento dos septos fibrosos, compatível com paniculite.`,
      impressao: `Sinais sugestivos de paniculite.`,
    },
    {
      id: "carcinoma-basocelular",
      label: "Carcinoma basocelular (CBC)",
      texto: `Sinais de extensão subcutânea de lesão compatível com carcinoma basocelular, medindo ____ cm. Avaliada a profundidade de invasão. Correlacionar com histopatologia.`,
      impressao: `Imagem sugestiva de carcinoma basocelular com extensão subcutânea. Correlacionar com histopatologia.`,
    },
    {
      id: "carcinoma-celulas-escamosas",
      label: "Carcinoma de células escamosas (CCE)",
      texto: `Sinais de extensão subcutânea de lesão compatível com carcinoma de células escamosas, medindo ____ cm. Correlacionar com histopatologia.`,
      impressao: `Imagem sugestiva de carcinoma de células escamosas com extensão subcutânea. Correlacionar com histopatologia.`,
    },
    {
      id: "melanoma-cutaneo",
      label: "Melanoma cutâneo",
      texto: `Lesão com extensão ao subcutâneo e espessura estimada de ____ mm (correlação com índice de Breslow). Avaliar linfonodos regionais quando indicado. A histologia permanece definitiva.`,
      impressao: `Imagem sugestiva de melanoma cutâneo com extensão subcutânea. Correlacionar com histopatologia.`,
    },
    {
      id: "corpo-estranho",
      label: "Corpo estranho",
      texto: `Imagem ecogênica compatível com corpo estranho no subcutâneo, medindo ____ cm, com eventual halo inflamatório. Correlacionar com história clínica.`,
      impressao: `Imagem sugestiva de corpo estranho subcutâneo.`,
    },
    {
      id: "cicatriz-hipertrofica",
      label: "Cicatriz hipertrófica",
      texto: `Área cicatricial com espessamento envolvendo o subcutâneo, medindo ____ cm de espessura, compatível com cicatriz hipertrófica.`,
      impressao: `Imagem sugestiva de cicatriz hipertrófica (subcutâneo).`,
    },
    {
      id: "queloide",
      label: "Queloide",
      texto: `Formação cicatricial espessada com extensão subcutânea, medindo ____ cm de espessura, compatível com queloide.`,
      impressao: `Imagem sugestiva de queloide (subcutâneo).`,
    },
  ],
  "dermatologico::anexos": [
    {
      id: "cisto-triquilemal",
      label: "Cisto triquilemal",
      texto: `Lesão cística bem delimitada, de conteúdo predominantemente anecóico/hipoecogênico, medindo ____ cm, em topografia anexial compatível com cisto triquilemal. Correlacionar clinicamente.`,
      impressao: `Imagem sugestiva de cisto triquilemal.`,
    },
    {
      id: "tumor-glomico",
      label: "Tumor glômico (ungueal)",
      texto: `Nódulo hipoecogênico bem delimitado no leito ungueal, hipervascularizado ao Doppler, medindo ____ cm, podendo associar-se a erosão da falange distal, compatível com tumor glômico.`,
      impressao: `Imagem sugestiva de tumor glômico ungueal.`,
    },
    {
      id: "onicomicose",
      label: "Onicomicose",
      texto: `Alterações do leito e/ou da matriz ungueal, com espessamento da placa ungueal e eventuais alterações do fluxo periungueal, compatíveis com onicomicose. Correlacionar clinicamente e com micologia quando indicado.`,
      impressao: `Sinais sugestivos de onicomicose.`,
    },
    {
      id: "psoriase-ungueal",
      label: "Psoríase ungueal",
      texto: `Espessamento da placa ungueal e alterações do leito/matriz ungueal, com eventual alteração do fluxo sanguíneo periungueal, compatíveis com psoríase ungueal. Correlacionar clinicamente.`,
      impressao: `Sinais sugestivos de psoríase ungueal.`,
    },
    {
      id: "foliculite",
      label: "Foliculite",
      texto: `Alterações inflamatórias centradas em anexo/folículo piloso, compatíveis com foliculite no campo do exame.`,
      impressao: `Sinais sugestivos de foliculite (anexos).`,
    },
    {
      id: "hidradenite-supurativa",
      label: "Hidradenite supurativa",
      texto: `Acometimento de anexos cutâneos com trajetos fistulosos e/ou coleções, compatível com hidradenite supurativa.`,
      impressao: `Sinais sugestivos de hidradenite supurativa (anexos).`,
    },
  ],
  "dermatologico::planos-profundos": [
    {
      id: "infiltracao-planos-profundos",
      label: "Infiltração / extensão a planos profundos",
      texto: `Há sinais ecográficos de extensão/infiltração além da hipoderme, acometendo planos profundos (fáscia, músculo e/ou cartilagem), com extensão aproximada de ____ cm. Importante para estadiamento de carcinomas avançados ou infecções profundas. Correlacionar clinicamente e com histopatologia.`,
      impressao: `Sinais sugestivos de extensão a planos profundos.`,
    },
    {
      id: "corpo-estranho-profundo",
      label: "Corpo estranho (planos profundos)",
      texto: `Imagem ecogênica compatível com corpo estranho em planos profundos, medindo ____ cm, com eventual reação inflamatória adjacente. Correlacionar com história clínica.`,
      impressao: `Imagem sugestiva de corpo estranho em planos profundos.`,
    },
    {
      id: "abscesso-profundo",
      label: "Abscesso / infecção profunda",
      texto: `Coleção ou processo inflamatório estendendo-se a planos profundos, medindo ____ cm. Correlacionar clinicamente quanto à necessidade de drenagem/abordagem cirúrgica.`,
      impressao: `Imagem sugestiva de abscesso/infecção com extensão a planos profundos.`,
    },
  ],
  "dermatologico::vascularizacao": [
    {
      id: "hemangioma-malformacao-vascular",
      label: "Hemangioma / malformação vascular",
      texto: `Ao Doppler colorido, lesão com vascularização exuberante, medindo ____ cm, podendo conter flebólitos nos casos de malformação venosa. Correlacionar clinicamente.`,
      impressao: `Imagem sugestiva de hemangioma / malformação vascular ao Doppler.`,
    },
    {
      id: "hipervascularizacao-focal",
      label: "Hipervascularização focal",
      texto: `Ao Doppler colorido, identifica-se hipervascularização focal na topografia da lesão/região examinada. Correlacionar clinicamente.`,
      impressao: `Sinais sugestivos de hipervascularização focal ao Doppler.`,
    },
    {
      id: "neovascularizacao",
      label: "Neovascularização",
      texto: `Ao Doppler colorido, evidenciam-se sinais de neovascularização na topografia da lesão cutânea examinada. Correlacionar com achados morfológicos e histopatologia quando indicado.`,
      impressao: `Sinais sugestivos de neovascularização ao Doppler.`,
    },
    {
      id: "tumor-glomico-doppler",
      label: "Tumor glômico (padrão Doppler)",
      texto: `Nódulo hipoecogênico no leito ungueal, hipervascularizado ao Doppler colorido, medindo ____ cm, padrão compatível com tumor glômico.`,
      impressao: `Imagem sugestiva de tumor glômico (hipervascularização ao Doppler).`,
    },
  ],
};

export function mergeOpcoes(base: Opcao[], extraKey: string): Opcao[] {
  const extra = patologiasCatalogo[extraKey] ?? [];
  const ids = new Set(base.map((o) => o.id));
  const out = [...base];
  for (const o of extra) {
    if (ids.has(o.id)) continue;
    if (o.id === "normal" || o.id === "normais") continue;
    // Hérnias não entram em partes moles
    if (
      extraKey === "partes-moles::achados" &&
      /hernia/i.test(o.id)
    ) {
      continue;
    }
    out.push(o);
    ids.add(o.id);
  }
  return out;
}

