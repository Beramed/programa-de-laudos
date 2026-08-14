import type { Exame, Opcao, Secao } from "@/data/exames";

export const TECNICA_MAMOGRAFIA =
  "Método: Mamografia digital de campo integral (FFDM), realizada com aquisição de imagens nas incidências craniocaudal (CC) e mediolateral oblíqua (MLO) de ambas as mamas. Foram obtidas, quando necessário, incidências complementares localizadas e/ou com compressão seletiva.";

const TEXTO_MAMA_NORMAL = `Arquitetura: Preservada, sem distorções arquiteturais evidentes.

Nódulos / Massas: Ausência de lesões nodulares sólidas ou císticas de características suspeitas.

Calcificações: Ausência de microcalcificações pleomórficas, lineares ou com distribuição suspeita. Observam-se, se presentes, calcificações de padrão benigno (ex.: vasculares, cutâneas ou estroma-benignas do tipo descamativo/esférico).

Pele e Complexo Areolopapilar: Espessamento cutâneo ausente. Retração mamilar ausente.`;

/** Patologias mamográficas (BI-RADS / ACR) com lacunas para medidas quando necessário. */
export const patologiasMamografia: Opcao[] = [
  {
    id: "nodulo-circunscrito",
    label: "Nódulo de margens circunscritas",
    texto: `Nódulo de forma ____ (redonda / oval / lobulada), margens circunscritas, densidade ____ (igual / baixa / alta) em relação ao tecido fibroglandular adjacente, localizado em ____ (quadrante / região), medindo ____ mm. Achado sugestivo de lesão de aspecto benigno (cisto, fibroadenoma ou lipoma), a correlacionar com ultrassonografia quando indicado.`,
    impressao: `Nódulo de margens circunscritas em ____, medindo ____ mm (BI-RADS ____).`,
  },
  {
    id: "nodulo-obscurecido",
    label: "Nódulo de margens obscurecidas / microlobuladas",
    texto: `Nódulo de forma ____ (oval / irregular / lobulada), margens ____ (obscurecidas / ocultas / microlobuladas), densidade ____, localizado em ____, medindo ____ mm. Achado indeterminado — recomenda-se complementação com incidências adicionais e/ou ultrassonografia.`,
    impressao: `Nódulo de margens ____ em ____, medindo ____ mm (BI-RADS ____).`,
  },
  {
    id: "nodulo-spiculado",
    label: "Nódulo espiculado",
    texto: `Nódulo de forma irregular, margens espiculadas (linhas radiadas a partir da margem), densidade alta em relação ao parênquima adjacente, localizado em ____, medindo ____ mm. Achado altamente sugestivo de malignidade (considerar carcinoma ductal invasivo).`,
    impressao: `Nódulo espiculado em ____, medindo ____ mm — altamente sugestivo de malignidade (BI-RADS ____).`,
  },
  {
    id: "nodulo-baixa-densidade",
    label: "Nódulo de baixa densidade / radiolucente",
    texto: `Imagem nodular de baixa densidade / radiolucente, forma ____, margens ____, localizada em ____, medindo ____ mm, padrão compatível com lesão predominantemente benigna (conteúdo gorduroso / lipoadenoma / cisto com conteúdo lipídico).`,
    impressao: `Nódulo de baixa densidade em ____, medindo ____ mm (BI-RADS ____).`,
  },
  {
    id: "calcificacoes-cutaneas",
    label: "Calcificações cutâneas (benignas)",
    texto: `Calcificações cutâneas, pequenas, com centro radiolucente, localizadas em ____ (sulco inframamário / aréola / pele), de padrão típico de benignidade.`,
    impressao: `Calcificações cutâneas de padrão benigno.`,
  },
  {
    id: "calcificacoes-vasculares",
    label: "Calcificações vasculares (benignas)",
    texto: `Calcificações vasculares sob a forma de linhas paralelas acompanhando trajetos vasculares em ____, de padrão benigno.`,
    impressao: `Calcificações vasculares de padrão benigno.`,
  },
  {
    id: "calcificacoes-pipoca",
    label: "Calcificações grossas / em “pipoca”",
    texto: `Calcificações grossas / em “pipoca”, típicas de fibroadenoma involuído, localizadas em ____, medindo o agrupamento cerca de ____ mm.`,
    impressao: `Calcificações grossas / em “pipoca” compatíveis com fibroadenoma involuído.`,
  },
  {
    id: "calcificacoes-secretorias",
    label: "Calcificações em bastonete (secretórias)",
    texto: `Calcificações secretórias em bastonete, grandes e espessas, ____ (unilaterais / bilaterais), alinhadas em direção ao mamilo, compatíveis com ectasia ductal.`,
    impressao: `Calcificações secretórias de padrão benigno (ectasia ductal).`,
  },
  {
    id: "calcificacoes-esfericas",
    label: "Calcificações esféricas / punteadas benignas",
    texto: `Calcificações esféricas / punteadas estromais ou cutâneas, redondas, menores que 0,5 mm, com contornos nítidos, em ____, de padrão benigno.`,
    impressao: `Calcificações esféricas / punteadas de padrão benigno.`,
  },
  {
    id: "microcalcificacoes-pleomorficas",
    label: "Microcalcificações pleomórficas (suspeitas)",
    texto: `Microcalcificações pleomórficas (heterogêneas, formas e tamanhos variados), com distribuição ____ (agrupada / segmentar / linear / difusa), localizadas em ____, ocupando área de aproximadamente ____ mm. Achado suspeito — considerar BI-RADS 4 ou 5 conforme morfologia e distribuição.`,
    impressao: `Microcalcificações pleomórficas em ____ (distribuição ____) — suspeitas (BI-RADS ____).`,
  },
  {
    id: "microcalcificacoes-lineares",
    label: "Microcalcificações linear-finas / ramificadas",
    texto: `Microcalcificações linear-finas e/ou linear ramificadas, sugerindo molde de ductos, com distribuição ____ (segmentar / linear / agrupada), localizadas em ____, extensão aproximada de ____ mm. Padrão altamente sugestivo de carcinoma ductal in situ (CDIS).`,
    impressao: `Microcalcificações linear-finas/ramificadas em ____ — altamente sugestivas de CDIS (BI-RADS ____).`,
  },
  {
    id: "microcalc-agrupadas",
    label: "Microcalcificações agrupadas (cluster)",
    texto: `Agrupamento (cluster) de microcalcificações em área menor que 1–2 cm, morfologia ____ (amorfa / pleomórfica / grosseiramente heterogênea), localizado em ____, medindo cerca de ____ mm. Achado a correlacionar com BI-RADS e eventual biópsia.`,
    impressao: `Agrupamento de microcalcificações em ____, medindo ____ mm (BI-RADS ____).`,
  },
  {
    id: "distorcao-arquitetural",
    label: "Distorção arquitetural",
    texto: `Distorção arquitetural do parênquima, com aspecto de retração em direção a um ponto central, sem massa evidente definida, localizada em ____, ocupando área de aproximadamente ____ mm. Diagnóstico diferencial inclui carcinoma (lobular/tubular/ductal invasivo) e causas benignas (cicatriz cirúrgica, mastite esclerosante, cicatriz radial). História cirúrgica: ____.`,
    impressao: `Distorção arquitetural em ____ (BI-RADS ____).`,
  },
  {
    id: "assimetria-focal",
    label: "Assimetria focal",
    texto: `Assimetria focal de densidade, visível preferencialmente em ____ (uma incidência / duas incidências), sem contornos bem definidos, localizada em ____, medindo cerca de ____ mm. Recomenda-se complementação com incidências adicionais e ultrassonografia quando indicado.`,
    impressao: `Assimetria focal em ____ (BI-RADS ____).`,
  },
  {
    id: "assimetria-global",
    label: "Assimetria global",
    texto: `Assimetria global de densidade envolvendo mais de um quadrante da mama ____, frequentemente relacionada à variação anatômica ou tecido glandular assimétrico. Comparação com exames prévios: ____.`,
    impressao: `Assimetria global à ____.`,
  },
  {
    id: "assimetria-desenvolvimento",
    label: "Assimetria em desenvolvimento",
    texto: `Assimetria em desenvolvimento: área de densidade que ____ (cresceu / tornou-se mais densa) em comparação com exame(s) anterior(es) de ____, localizada em ____, medindo cerca de ____ mm. Achado crítico — investigação com incidências adicionais e ultrassonografia.`,
    impressao: `Assimetria em desenvolvimento em ____ (BI-RADS ____).`,
  },
  {
    id: "espessamento-cutaneo",
    label: "Espessamento cutâneo",
    texto: `Espessamento cutâneo ____ (difuso / localizado) em ____, com espessura estimada de ____ mm. Diagnóstico diferencial: mastite, processo inflamatório, carcinoma inflamatório, insuficiência cardíaca ou linfedema.`,
    impressao: `Espessamento cutâneo ____ em ____.`,
  },
  {
    id: "retracao-cutanea-mamilar",
    label: "Retração cutânea / mamilar",
    texto: `____ (Retração cutânea / Inversão mamilar / Ambos) em ____, sugestiva de tração por planos profundos. Correlacionar com possível neoplasia infiltrativa subjacente ou processo cicatricial. Achado associado: ____.`,
    impressao: `Retração ____ em ____ (BI-RADS ____).`,
  },
  {
    id: "linfonodomegalia-axilares",
    label: "Linfonodomegalia axilar suspeita",
    texto: `Linfonodo(s) axilar(es) ____ (direito / esquerdo / bilaterais) com morfologia suspeita: ____ (aumento volumétrico / perda do hilo lipomatoso / formato arredondado / córtex espessado), medindo ____ mm no maior eixo. Diagnóstico diferencial: metástase de carcinoma mamário, linfoma ou processo infeccioso/inflamatório regional.`,
    impressao: `Linfonodomegalia axilar ____ com características suspeitas (____ mm).`,
  },
  {
    id: "linfonodo-benigno",
    label: "Linfonodo axilar / intramamário benigno",
    texto: `Linfonodo ____ (axilares / intramamário) em ____, oval, com hilo lipomatoso preservado, medindo ____ mm, de características radiologicamente benignas.`,
    impressao: `Linfonodo de aspecto benigno em ____.`,
  },
];

function secaoMamaMg(id: string, titulo: string): Secao {
  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: [
      {
        id: "normal",
        label: "Achados negativos (padrão)",
        texto: TEXTO_MAMA_NORMAL,
      },
      {
        id: "alterado",
        label: "Achados descritos (texto livre)",
        texto: `Arquitetura: ____.

Nódulos / Massas: ____.

Calcificações: ____.

Pele e Complexo Areolopapilar: ____.`,
        impressao: `Achados mamográficos à ${id.includes("esquerda") ? "esquerda" : "direita"}: ____.`,
      },
    ],
  };
}

function secoesMamografia(): Secao[] {
  return [
    {
      id: "tecnica-qualidade",
      titulo: "TÉCNICA E QUALIDADE DO EXAME",
      tipo: "unico",
      padrao: "satisfatorio",
      opcoes: [
        {
          id: "satisfatorio",
          label: "Tecnicamente satisfatório (INCA/ACR)",
          texto: `Critérios de Qualidade (INCA/ACR): Exame tecnicamente satisfatório, com adequado posicionamento, inclusão de planos cutâneos e musculares pectorais, compressão efetiva e sem artefatos de movimentação que comprometam a análise diagnóstica.`,
        },
        {
          id: "limitado",
          label: "Tecnicamente limitado",
          texto: `Critérios de Qualidade (INCA/ACR): Exame tecnicamente limitado por ____ (posicionamento incompleto / compressão insuficiente / artefato de movimentação / inclusão parcial do peitoral / outro). Limitação: ____.`,
          impressao: `Exame tecnicamente limitado: ____.`,
        },
      ],
    },
    {
      id: "densidade",
      titulo: "COMPOSIÇÃO E DENSIDADE MAMÁRIA (BI-RADS 5ª ed.)",
      tipo: "unico",
      padrao: "tipo-b",
      opcoes: [
        {
          id: "tipo-a",
          label: "Tipo A — Predominantemente adiposas",
          texto:
            "Categoria de Densidade (BI-RADS — 5ª Edição): Tipo A — As mamas são predominantemente adiposas.",
        },
        {
          id: "tipo-b",
          label: "Tipo B — Áreas esparsas de fibroglandularidade",
          texto:
            "Categoria de Densidade (BI-RADS — 5ª Edição): Tipo B — Há áreas esparsas de fibroglandularidade.",
        },
        {
          id: "tipo-c",
          label: "Tipo C — Heterogeneamente densas",
          texto:
            "Categoria de Densidade (BI-RADS — 5ª Edição): Tipo C — As mamas são heterogeneamente densas, o que pode mascarar a detecção de pequenas massas (sensibilidade diagnóstica moderadamente reduzida).",
        },
        {
          id: "tipo-d",
          label: "Tipo D — Extremamente densas",
          texto:
            "Categoria de Densidade (BI-RADS — 5ª Edição): Tipo D — As mamas são extremamente densas, o que reduz significativamente a sensibilidade da mamografia.",
        },
      ],
    },
    secaoMamaMg("mama-direita", "ACHADOS DESCRITIVOS — MAMA DIREITA"),
    {
      id: "patologias-md",
      titulo: "PATOLOGIAS ADICIONAIS — MAMA DIREITA",
      tipo: "multiplo",
      opcoes: patologiasMamografia.map((p) => ({
        ...p,
        texto: `Mama direita: ${p.texto}`,
        impressao: p.impressao
          ? `Mama direita — ${p.impressao}`
          : p.impressao,
      })),
    },
    secaoMamaMg("mama-esquerda", "ACHADOS DESCRITIVOS — MAMA ESQUERDA"),
    {
      id: "patologias-me",
      titulo: "PATOLOGIAS ADICIONAIS — MAMA ESQUERDA",
      tipo: "multiplo",
      opcoes: patologiasMamografia.map((p) => ({
        ...p,
        id: `${p.id}-me`,
        texto: `Mama esquerda: ${p.texto}`,
        impressao: p.impressao
          ? `Mama esquerda — ${p.impressao}`
          : p.impressao,
      })),
    },
    {
      id: "linfonodos",
      titulo: "ACHADOS ADJACENTES — LINFONODOS",
      tipo: "unico",
      padrao: "benignos",
      opcoes: [
        {
          id: "benignos",
          label: "Linfonodos de aspecto benigno",
          texto:
            "Linfonodos Axilares: Linfonodos intramamários e axilares bilaterais com características radiologicamente benignas (mantendo hilo lipomatoso preservado, sem aumento volumétrico anormal ou esfericidade patológica).",
        },
        {
          id: "nao-caracterizados",
          label: "Não caracterizados / fora do campo",
          texto:
            "Linfonodos Axilares: Linfonodos axilares não adequadamente caracterizados no campo do exame / fora do campo de aquisição.",
        },
        {
          id: "suspeitos",
          label: "Linfonodo(s) suspeito(s)",
          texto:
            "Linfonodos Axilares: Linfonodo(s) ____ (direito / esquerdo / bilaterais) com morfologia suspeita (____), medindo ____ mm.",
          impressao: "Linfonodomegalia axilar com características suspeitas.",
        },
      ],
    },
    {
      id: "birads-mg",
      titulo: "IMPRESSÃO DIAGNÓSTICA E CATEGORIZAÇÃO (BI-RADS)",
      tipo: "unico",
      padrao: "birads-1",
      opcoes: [
        {
          id: "birads-0",
          label: "BI-RADS 0 — Incompleto",
          texto:
            "Mamas Direita e Esquerda:\nCategoria BI-RADS 0: Avaliação incompleta — necessários exames adicionais e/ou comparação com exames prévios.",
          impressao: "BI-RADS 0 (avaliação incompleta).",
        },
        {
          id: "birads-1",
          label: "BI-RADS 1 — Negativo",
          texto:
            "Mamas Direita e Esquerda:\nCategoria BI-RADS 1: Achados Negativos (Exame Normal).",
          impressao: "BI-RADS 1 — Achados negativos.",
        },
        {
          id: "birads-2",
          label: "BI-RADS 2 — Benigno",
          texto:
            "Mamas Direita e Esquerda:\nCategoria BI-RADS 2: Achados benignos.",
          impressao: "BI-RADS 2 — Achados benignos.",
        },
        {
          id: "birads-3",
          label: "BI-RADS 3 — Provavelmente benigno",
          texto:
            "____:\nCategoria BI-RADS 3: Achado provavelmente benigno. Conduta: seguimento curto conforme protocolo.",
          impressao: "BI-RADS 3 — Provavelmente benigno.",
        },
        {
          id: "birads-4",
          label: "BI-RADS 4 — Suspeito",
          texto:
            "____:\nCategoria BI-RADS 4____ (A / B / C): Achado suspeito. Recomenda-se correlação clínica e biópsia quando indicado.",
          impressao: "BI-RADS 4 — Achado suspeito.",
        },
        {
          id: "birads-5",
          label: "BI-RADS 5 — Altamente sugestivo de malignidade",
          texto:
            "____:\nCategoria BI-RADS 5: Achado altamente sugestivo de malignidade. Conduta: biópsia e condução oncológica.",
          impressao: "BI-RADS 5 — Altamente sugestivo de malignidade.",
        },
        {
          id: "birads-6",
          label: "BI-RADS 6 — Malignidade comprovada",
          texto:
            "____:\nCategoria BI-RADS 6: Malignidade conhecida comprovada por biópsia.",
          impressao: "BI-RADS 6 — Malignidade comprovada.",
        },
        {
          id: "birads-lateralizado",
          label: "BI-RADS diferente por mama",
          texto:
            "Mama direita: BI-RADS ____.\nMama esquerda: BI-RADS ____.",
          impressao: "BI-RADS mama direita ____; mama esquerda ____.",
        },
      ],
    },
    {
      id: "conclusao",
      titulo: "CONCLUSÃO / CONDUTA SUGERIDA",
      tipo: "unico",
      padrao: "rastreamento",
      opcoes: [
        {
          id: "rastreamento",
          label: "Normal — manter rastreamento",
          texto: `Exame radiologicamente normal, sem evidência de lesões mamográficas suspeitas de malignidade no momento atual.

Recomenda-se a manutenção do rastreamento periódico anual ou conforme a orientação do médico assistente, correlacionando com o exame clínico e complementando com ultrassonografia mamária bilateral, caso indicado pela densidade mamária ou perfil de risco individual.`,
        },
        {
          id: "seguimento",
          label: "Seguimento / complementação",
          texto: `Conduta sugerida: ____ (seguimento mamográfico em ____ meses / ultrassonografia mamária bilateral / comparação com exames prévios / ressonância magnética / biópsia).

Observações: ____.`,
          impressao: "Conduta: ____.",
        },
        {
          id: "biopsia",
          label: "Indicação de biópsia",
          texto: `Recomenda-se correlação clínica e biópsia da lesão descrita em ____, conforme categorização BI-RADS.

Observações: ____.`,
          impressao: "Indicação de biópsia em ____.",
        },
      ],
    },
  ];
}

export function exameMamografia(): Exame {
  return {
    id: "mamografia",
    nome: "Mamografia",
    tituloDocumento: "MAMOGRAFIA DIGITAL BILATERAL",
    tecnica: TECNICA_MAMOGRAFIA,
    secoes: secoesMamografia(),
    impressaoPadrao:
      "BI-RADS 1 — Achados negativos.\nExame radiologicamente normal, sem evidência de lesões mamográficas suspeitas de malignidade no momento atual.",
  };
}
