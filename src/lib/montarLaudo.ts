import type { Exame, LesaoItem } from "@/data/exames";
import {
  aplicarClassificacaoNoduloTireoide,
  aplicarEstenose,
  aplicarIndiceEsplenico,
  aplicarLocalizacao,
  aplicarMedida,
  aplicarMedidaHepatocoledoco,
  aplicarMultiplasLesoes,
  aplicarVascLesao,
  chaveEstenose,
  chaveHcMedida,
  chaveHcOn,
  chaveIndiceEsplenico,
  chaveLesoes,
  chaveLocalizacao,
  chaveMedida,
  chaveVascLesao,
  idsSelecionados,
  opcaoMedidaHepatocoledoco,
  opcaoPermiteMultiplasLesoes,
  opcaoRequerEstenose,
  opcaoRequerIndiceEsplenico,
  opcaoRequerLocalizacao,
  opcaoRequerMedida,
  opcaoRequerTirads,
  opcaoRequerVascLesao,
  exameUsaClassificacaoTireoide,
} from "@/data/exames";
import {
  aplicarMaoDedoAchado,
  aplicarMusculoNoTexto,
  chaveMaoDedoAchado,
  QUIRODACTILOS,
} from "@/data/mskExames";
import {
  frasesExamesCorrelacionados,
  observacoesDoExame,
} from "@/data/observacoes";
import { htmlTabelasAnexas } from "@/data/tabelas";
import {
  lerFormVenoso,
  textoFormVenosoParaLaudo,
} from "@/lib/mmiiVenosoForm";
import {
  lerCartografiaMmss,
  fraseMapeamentoFistulaMmss,
} from "@/lib/mmssCartografia";
import {
  aplicarEquipamentoObst,
  EXAMES_COM_DADOS_GESTACIONAIS,
  EXAMES_OBSTETRICOS,
  textoDadosGestacionaisObst,
} from "@/lib/obstetricoDadosComuns";
import {
  calcularEco,
  lerFormEco,
  textoFormEcoParaLaudo,
} from "@/lib/ecocardiogramaForm";
import {
  lerFormObstLaudous,
  textoFormObstLaudousParaLaudo,
  tipoObstPorExameId,
} from "@/lib/obstetricoLaudousForm";
import {
  aplicarIgMdgNoTexto,
  aplicarLacunas,
  aplicarLacunasNaImpressao,
  contarLacunas,
  lerValoresLacunas,
  temLacunas,
} from "@/lib/lacunas";
import type { LadoArticulacao } from "@/lib/ladoMsk";
import {
  DISCLAIMER_IMPRESSAO,
  tituloMedico,
  type SessaoMedico,
} from "@/lib/auth";
import {
  aplicarVolumesNoTexto,
  type DimensoesMap,
  type Volumes,
} from "@/lib/volumes";

export function aplicarRegiaoPartesMoles(
  texto: string,
  regiaoRaw: string,
): string {
  const r = regiaoRaw.trim() || "[INSERIR REGIÃO]";
  return texto.split("{{REGIAO}}").join(r);
}

export type Selecoes = Record<string, string | string[]>;

/** Tamanhos por seção (nódulo / massa / cisto) */
export type Medidas = Record<string, string>;

/** Várias lesões (nódulo/cisto) por seção+opção — botão + */
export type LesoesMap = Record<string, LesaoItem[]>;

export type { Volumes, DimensoesMap };

function idsSel(valor: string | string[] | undefined): string[] {
  if (Array.isArray(valor)) return valor.filter(Boolean);
  if (typeof valor === "string" && valor) return [valor];
  return [];
}

function aplicarGinecoNoTexto(
  texto: string,
  selecoes: Selecoes,
  volumes: Volumes | undefined,
): string {
  const dir = idsSel(selecoes["mama-direita"]).includes("ginecomastia");
  const esq = idsSel(selecoes["mama-esquerda"]).includes("ginecomastia");
  const inferido =
    dir && esq ? "bilateral" : dir ? "direita" : esq ? "esquerda" : "";
  const lado =
    (volumes?.["gineco-lado"] ?? "").trim() ||
    inferido ||
    "bilateral/direita/esquerda";
  const fase =
    (volumes?.["gineco-fase"] ?? "").trim() ||
    "nodular / dendrítica / quiescente";
  return texto
    .split("{{GINECO_LADO}}")
    .join(lado)
    .split("{{GINECO_FASE}}")
    .join(fase);
}

export type DadosPaciente = {
  nome: string;
  idade: string;
  data: string;
  solicitante: string;
  indicacao: string;
};

export type ExameAnterior = {
  id: string;
  data: string;
  modalidade: string;
};

export type ExtrasLaudo = {
  observacoesIds: string[];
  examesAnteriores: ExameAnterior[];
  tabelasIds?: string[];
};

export type BlocoLaudo = {
  exame: Exame;
  selecoes: Selecoes;
  impressao: string;
  extras: ExtrasLaudo;
  medidas?: Medidas;
  lesoes?: LesoesMap;
  volumes?: Volumes;
  dimensoes?: DimensoesMap;
};

export function selecoesPadrao(exame: Exame): Selecoes {
  const sel: Selecoes = {};
  for (const secao of exame.secoes) {
    if (secao.padrao !== undefined) {
      sel[secao.id] = secao.padrao;
    } else if (secao.tipo === "unico") {
      sel[secao.id] = secao.opcoes[0]?.id ?? "";
    } else {
      sel[secao.id] = [];
    }
  }
  return sel;
}

export function novoExameAnterior(): ExameAnterior {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    data: "",
    modalidade: "",
  };
}

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Une textos de várias patologias no mesmo órgão sem repetir a frase introdutória */
function fundirTextosOpcoes(blocos: string[]): string {
  if (blocos.length <= 1) return blocos[0] ?? "";
  const linhas: string[] = [];
  const vistas = new Set<string>();
  const intro =
    /^(de paredes|com forma|com topografia|topicos|situados|aspecto habitual|lobos e istmo|pele e tecido)/i;

  for (let i = 0; i < blocos.length; i++) {
    const parts = blocos[i]
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (i > 0 && linhas.length > 0) linhas.push("");
    for (const line of parts) {
      if (i > 0 && intro.test(line)) continue;
      const key = line
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (vistas.has(key)) continue;
      vistas.add(key);
      linhas.push(line);
    }
  }
  return linhas.join("\n");
}

/** Abertura típica do fígado (situação / dimensões) — substituída se houver hepatomegalia. */
const ABERTURA_FIGADO_RE =
  /^(com situa[cç][aã]o|f[ií]gado de morfologia|aumentado de volume)\b/i;

function ehOpcaoHepatomegalia(id: string, label = ""): boolean {
  const s = `${id} ${label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return /hepatomegalia/.test(s);
}

/**
 * Com hepatomegalia selecionada, a 1ª frase do fígado
 * (ex.: "Com situação, forma e contornos preservados, dimensões normais a discretamente aumentadas.")
 * é trocada pela frase de hepatomegalia.
 */
function fundirTextosFigado(
  ids: string[],
  secao: { opcoes: { id: string; label: string; texto: string }[] },
  blocos: string[],
): string {
  const idxHepato = ids.findIndex((id) => {
    const op = secao.opcoes.find((o) => o.id === id);
    return op ? ehOpcaoHepatomegalia(op.id, op.label) : ehOpcaoHepatomegalia(id);
  });
  if (idxHepato < 0) return fundirTextosOpcoes(blocos);

  const linhasHepato = (blocos[idxHepato] ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (linhasHepato.length === 0) return fundirTextosOpcoes(blocos);

  const aberturaHepato = linhasHepato[0];
  const restoHepato = linhasHepato.slice(1);
  const outras: string[] = [];

  for (let i = 0; i < blocos.length; i++) {
    if (i === idxHepato) continue;
    const parts = (blocos[i] ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (parts.length === 0) continue;
    // Remove a frase inicial de situação/dimensões (substituída pela hepatomegalia)
    const semAbertura = ABERTURA_FIGADO_RE.test(parts[0])
      ? parts.slice(1)
      : parts;
    outras.push(...semAbertura);
  }

  const vistas = new Set<string>();
  const out: string[] = [];
  for (const line of [aberturaHepato, ...restoHepato, ...outras]) {
    const key = line
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (vistas.has(key)) continue;
    vistas.add(key);
    out.push(line);
  }
  return out.join("\n");
}

/**
 * Formata o corpo do achado: rótulos "Região: texto" ficam com a região em negrito
 * e há linha em branco entre cada região.
 */
function formatarCorpoComRegioes(texto: string): string[] {
  const out: string[] = [];
  type Bloco = { label: string | null; lines: string[] };
  const blocos: Bloco[] = [];
  let atual: Bloco | null = null;

  const parseRotulo = (
    line: string,
  ): { label: string; rest: string } | null => {
    const m = /^([^:\n]{2,90}):\s*(.*)$/.exec(line.trim());
    if (!m) return null;
    const label = m[1].trim();
    const rest = (m[2] ?? "").trim();
    if (/^\d/.test(label)) return null;
    if (label.length > 72) return null;
    if (!/[A-Za-zÀ-ÿ]/.test(label)) return null;
    if (
      /^(imagem|sinais|aspectos|observa|presen[cç]a|n[aã]o se|exceto|nota|obs\.?)/i.test(
        label,
      )
    ) {
      return null;
    }
    if (/^(normal|referencia|di[aâ]metro|volume|espessura)$/i.test(label)) {
      return null;
    }
    return { label, rest };
  };

  for (const raw of texto.split("\n")) {
    const trimmed = raw.trim();
    if (!trimmed) {
      if (atual && atual.lines.length > 0) atual.lines.push("");
      continue;
    }
    const rot = parseRotulo(trimmed);
    if (rot) {
      if (atual) blocos.push(atual);
      atual = { label: rot.label, lines: rot.rest ? [rot.rest] : [] };
    } else {
      if (!atual) atual = { label: null, lines: [] };
      atual.lines.push(trimmed);
    }
  }
  if (atual) blocos.push(atual);

  for (let i = 0; i < blocos.length; i++) {
    const b = blocos[i];
    if (i > 0) out.push("");
    const uteis = b.lines.filter((l) => l.trim());
    if (b.label) {
      if (uteis.length === 0) {
        out.push(`**${b.label}:**`);
      } else {
        out.push(`**${b.label}:** ${uteis[0]}`);
        for (const l of uteis.slice(1)) out.push(l);
      }
    } else {
      for (const l of uteis) out.push(l);
    }
  }
  return out;
}

function emitirSecaoFormatada(
  linhas: string[],
  titulo: string,
  texto: string,
): void {
  const rotulo = titulo.trim();
  if (rotulo) {
    linhas.push(`**${rotulo}**`);
  }
  for (const linha of formatarCorpoComRegioes(texto)) {
    linhas.push(linha);
  }
  linhas.push("");
}

/**
 * Testículo: mantém frase do parênquima; nódulo/cisto entram após "exceto por:".
 * Heterogêneo / orquite / torção substituem o parênquima.
 */
function fundirTextosTesticulo(
  ids: string[],
  trechos: string[],
): string {
  if (trechos.length === 0) return "";
  if (trechos.length === 1) return trechos[0];

  const substituiParen = ids.some((id) =>
    /^(heterogeneo|orquite|torcao-testicular)$/.test(id),
  );
  if (substituiParen) {
    // Preferir o texto da alteração principal
    const idx = ids.findIndex((id) =>
      /^(orquite|torcao-testicular|heterogeneo)$/.test(id),
    );
    return trechos[idx >= 0 ? idx : trechos.length - 1];
  }

  const dimLinha =
    trechos
      .map((t) => t.split("\n").map((l) => l.trim()).find(Boolean) ?? "")
      .find((l) => /cm/i.test(l) && /volume|medindo/i.test(l)) ||
    "Com forma, dimensões e contornos normais, medindo ____ x ____ x ____ cm (volume de ____ cm³).";

  const focais = trechos.filter((_, i) => {
    const id = ids[i];
    return id && id !== "homogeneo" && id !== "normal";
  });

  const corpos: string[] = [];
  const vistas = new Set<string>();
  for (const t of focais) {
    const partes = t.split(/\nexceto por:\s*/i);
    const corpo =
      partes.length > 1
        ? partes.slice(1).join("\n").trim()
        : t
            .split("\n")
            .slice(1)
            .join("\n")
            .replace(/^Parênquima[^\n]*\n?/i, "")
            .trim();
    for (const line of corpo.split("\n").map((l) => l.trim()).filter(Boolean)) {
      const key = line.toLowerCase();
      if (vistas.has(key)) continue;
      vistas.add(key);
      corpos.push(line.replace(/\.$/, ""));
    }
  }

  const temDoppler = trechos.some((t) => /Doppler colorido/i.test(t));
  const dopplerLinha = temDoppler
    ? "\nDistribuição normal da vascularização parenquimatosa ao Doppler colorido, com picos de velocidade sistólica e diastólica dentro dos parâmetros da normalidade."
    : "";

  if (corpos.length === 0) {
    return `${dimLinha}\nParênquima testicular com ecotextura homogênea, normo-ecogênico.${dopplerLinha}`;
  }

  return `${dimLinha}\nParênquima testicular com ecotextura homogênea, normo-ecogênico, exceto por:\n${corpos.join(";\n")}.${dopplerLinha}`;
}

/**
 * Lobo tireoidiano: mantém frase do parênquima; patologias entram após "exceto por:".
 * Só o heterogêneo substitui a frase do parênquima.
 */
function fundirTextosLoboTireoide(
  ids: string[],
  trechos: string[],
): string {
  if (trechos.length === 0) return "";
  if (trechos.length === 1) return trechos[0];

  const ehTireoidectomia = ids.some((id) => /tireoidectomia/.test(id));
  if (ehTireoidectomia) return fundirTextosOpcoes(trechos);

  const temHetero = ids.some(
    (id) => id === "heterogeneo" || id === "tireoide-heterogenea",
  );
  const focais = ids.filter(
    (id) =>
      id !== "normal" &&
      id !== "heterogeneo" &&
      id !== "tireoide-heterogenea",
  );

  const dimLinha =
    trechos
      .map((t) => t.split("\n").map((l) => l.trim()).find(Boolean) ?? "")
      .find((l) => /cm/i.test(l) && /volume/i.test(l)) ||
    trechos[0].split("\n").map((l) => l.trim()).find(Boolean) ||
    "____ x ____ x ____ cm (volume de ____ cm³).";

  const paren = temHetero
    ? "Parênquima tireoidiano com ecotextura difusamente heterogênea"
    : "Parênquima tireoidiano com ecotextura uniforme, sem alterações de ecogenicidade";

  if (focais.length === 0) {
    return `${dimLinha}\n${paren}.\nNão há evidências de lesões parenquimatosas de caráter focal ou difuso, bem como calcificações patológicas.`;
  }

  const corpos: string[] = [];
  const vistas = new Set<string>();
  for (let i = 0; i < ids.length; i++) {
    if (!focais.includes(ids[i])) continue;
    const trecho = trechos[i] ?? "";
    let aposExceto = false;
    for (const raw of trecho.split("\n")) {
      const line = raw.trim();
      if (!line) continue;
      if (/exceto por\s*:?\s*$/i.test(line)) {
        aposExceto = true;
        continue;
      }
      if (/exceto por\s*:/i.test(line)) {
        const resto = line.replace(/^.*?exceto por\s*:\s*/i, "").trim();
        aposExceto = true;
        if (resto) {
          const key = resto.toLowerCase();
          if (!vistas.has(key)) {
            vistas.add(key);
            corpos.push(resto);
          }
        }
        continue;
      }
      if (
        /par[eê]nquima/i.test(line) ||
        (/cm/i.test(line) && /volume/i.test(line)) ||
        /n[aã]o h[aá] evid[eê]ncias/i.test(line)
      ) {
        continue;
      }
      if (aposExceto || focais.includes(ids[i])) {
        const key = line.toLowerCase();
        if (!vistas.has(key)) {
          vistas.add(key);
          corpos.push(line);
        }
      }
    }
  }

  if (corpos.length === 0) {
    return `${dimLinha}\n${paren}.\nNão há evidências de lesões parenquimatosas de caráter focal ou difuso, bem como calcificações patológicas.`;
  }

  return `${dimLinha}\n${paren}, exceto por:\n${corpos.join("\n")}`;
}

function montarRodapeHtml(medico: SessaoMedico): string {
  const nome = escaparHtml(tituloMedico(medico));
  const crm = escaparHtml(`CRM ${medico.crm}`);
  const local = escaparHtml((medico.localAtivo || "").trim().toUpperCase());
  const disclaimer = escaparHtml(`“${DISCLAIMER_IMPRESSAO}”`);
  const img = medico.assinaturaJpg
    ? `<img class="laudo-assinatura-img" src="${medico.assinaturaJpg}" alt="Assinatura" />`
    : `<div class="laudo-assinatura-espaco"></div>`;

  return `
<div class="laudo-rodape-v2">
  <div class="laudo-rodape-cols">
    <div class="laudo-rodape-esq">
      ${img}
      <div class="laudo-linha-assinatura"></div>
      <div class="laudo-nome">${nome}</div>
      <div class="laudo-crm">${crm}</div>
    </div>
    <div class="laudo-rodape-dir">
      ${local ? `<div class="laudo-local">${local}</div>` : "&nbsp;"}
    </div>
  </div>
  <p class="laudo-disclaimer">${disclaimer}</p>
</div>`.trim();
}

function montarRodapeTexto(medico: SessaoMedico): string {
  const linhas = [tituloMedico(medico), `CRM ${medico.crm}`];
  if (medico.localAtivo.trim()) {
    linhas.push(medico.localAtivo.trim().toUpperCase());
  }
  linhas.push("");
  linhas.push(`“${DISCLAIMER_IMPRESSAO}”`);
  return linhas.join("\n");
}

/** Texto único quando ambos os rins estão normais (sem lateralidade). */
const TEXTO_RINS_NORMAIS =
  "Em situações tópicas, com formas, contornos e dimensões normais.\nEspessuras corticais preservadas.\nParênquimas renais com espessura uniforme, normais, sem alterações ecotexturais.\nComplexos ecogênicos centrais com distribuição e ecogenicidade normais.\nAusência de massa ou coleção renal ou perirrenal.\nNão se notam imagens calculosas.";

function rimSemAlteracao(selecoes: Selecoes, secaoId: string): boolean {
  const ids = idsSelecionados(selecoes[secaoId]);
  if (ids.length === 0) return true;
  return ids.every((id) => id === "normal");
}

function montarCorpoExame(
  exame: Exame,
  selecoes: Selecoes,
  impressaoCustom: string | undefined,
  extras: ExtrasLaudo | undefined,
  medidas: Medidas | undefined,
  volumes: Volumes | undefined,
  dimensoes: DimensoesMap | undefined,
  opts: { incluirTitulo: boolean },
  lesoes?: LesoesMap,
): string[] {
  const linhas: string[] = [];
  const tituloDoc =
    exame.tituloDocumento?.trim() ||
    `ULTRASSONOGRAFIA — ${exame.nome.toUpperCase()}`;

  if (opts.incluirTitulo) {
    linhas.push(`@@TITULO@@${tituloDoc}`);
    linhas.push("");
  }

  if (exame.tecnica.trim()) {
    if (
      exame.id === "carotidas" ||
      exame.id === "mmii-venoso" ||
      exame.id === "mmii-arterial" ||
      exame.id === "mmss-venoso" ||
      exame.id === "mmss-arterial" ||
      EXAMES_COM_DADOS_GESTACIONAIS.has(exame.id)
    ) {
      linhas.push(
        EXAMES_COM_DADOS_GESTACIONAIS.has(exame.id)
          ? "**2. DADOS TÉCNICOS E APARELHAGEM**"
          : "**2. METODOLOGIA E EQUIPAMENTO**",
      );
      linhas.push("");
    }
    const tecnica = EXAMES_COM_DADOS_GESTACIONAIS.has(exame.id)
      ? aplicarEquipamentoObst(exame.tecnica.trim(), volumes)
      : exame.tecnica.trim();
    linhas.push(tecnica);
    linhas.push("");
  }

  if (EXAMES_COM_DADOS_GESTACIONAIS.has(exame.id)) {
    const formObstPre = EXAMES_OBSTETRICOS.has(exame.id)
      ? lerFormObstLaudous(volumes, exame.id)
      : null;
    const volsGest =
      formObstPre?.dum?.trim()
        ? { ...volumes, "obst-dum": formObstPre.dum.trim() }
        : volumes;
    linhas.push(textoDadosGestacionaisObst(volsGest));
    linhas.push("");
    linhas.push("**3. DESCRIÇÃO TÉCNICA ANALÍTICA**");
    linhas.push("");
  }

  const formObst = EXAMES_OBSTETRICOS.has(exame.id)
    ? lerFormObstLaudous(volumes, exame.id)
    : null;
  const tipoObst = formObst ? tipoObstPorExameId(exame.id) : "outro";
  const corpoObst =
    formObst && tipoObst !== "outro"
      ? textoFormObstLaudousParaLaudo(formObst, tipoObst)
      : "";
  const usarPainelObst = Boolean(corpoObst.trim());
  if (usarPainelObst) {
    linhas.push(corpoObst);
    linhas.push("");
  }

  if (exame.id === "partes-moles") {
    const regiao = (volumes?.["pm-regiao"] ?? "").trim() || "[INSERIR REGIÃO]";
    linhas.push(`**REGIÃO ESTUDADA:** ${regiao}`);
    linhas.push("");
    linhas.push("**RELATÓRIO TÉCNICO DOS ACHADOS**");
    linhas.push("");
  }

  if (exame.id === "musculo") {
    const musculo =
      (volumes?.["musculo-regiao"] ?? "").trim() ||
      "[Indicar o músculo / região anatômica]";
    linhas.push(`**MÚSCULO / REGIÃO AVALIADA:** ${musculo}`);
    linhas.push("");
  }

  const temRinsPareados =
    exame.secoes.some((s) => s.id === "rim-direito") &&
    exame.secoes.some((s) => s.id === "rim-esquerdo");
  const unificarRinsNormais =
    temRinsPareados &&
    rimSemAlteracao(selecoes, "rim-direito") &&
    rimSemAlteracao(selecoes, "rim-esquerdo");
  let rinsUnificadosEmitidos = false;
  let achadosHeaderEmitido = false;

  for (const secao of exame.secoes) {
    if (
      usarPainelObst &&
      secao.id !== "achados-adicionais"
    ) {
      continue;
    }
    if (
      unificarRinsNormais &&
      (secao.id === "rim-direito" || secao.id === "rim-esquerdo")
    ) {
      if (rinsUnificadosEmitidos) continue;
      const temSelecaoRim =
        idsSelecionados(selecoes["rim-direito"]).length > 0 ||
        idsSelecionados(selecoes["rim-esquerdo"]).length > 0;
      if (!temSelecaoRim) continue;
      rinsUnificadosEmitidos = true;
      emitirSecaoFormatada(linhas, "RINS", TEXTO_RINS_NORMAIS);
      continue;
    }

    let ids = idsSelecionados(selecoes[secao.id]);
    if (ids.length === 0) continue;

    if (
      (secao.id === "achados-adicionais-ombro" ||
        secao.id === "achados-mao") &&
      ids.includes("sem-achados")
    ) {
      if (ids.every((id) => id === "sem-achados")) continue;
      ids = ids.filter((id) => id !== "sem-achados");
    }

    const blocosTexto: string[] = [];
    for (const id of ids) {
      const opcao = secao.opcoes.find((o) => o.id === id);
      if (!opcao) continue;
      let trecho = opcao.texto.trim();
      if (!trecho) continue;
      const listaLesoes = lesoes?.[chaveLesoes(secao.id, id)];
      const usaLesoes =
        opcaoPermiteMultiplasLesoes(opcao) &&
        !!listaLesoes &&
        listaLesoes.length > 0 &&
        listaLesoes.some((l) => l.medida.trim() || l.local.trim());

      if (usaLesoes) {
        trecho = aplicarMultiplasLesoes(trecho, listaLesoes);
      }

      if (temLacunas(trecho) || trecho.includes("{{IG_MDG}}")) {
        const vals = lerValoresLacunas(
          medidas,
          secao.id,
          id,
          "texto",
          Math.max(contarLacunas(trecho), 1),
        );
        if (temLacunas(trecho)) {
          trecho = aplicarLacunas(trecho, vals);
        }
        trecho = aplicarIgMdgNoTexto(trecho, vals[0]);
      } else if (!usaLesoes && opcaoRequerMedida(opcao)) {
        const med =
          medidas?.[chaveMedida(secao.id, id)] ??
          medidas?.[secao.id] ??
          "";
        trecho = aplicarMedida(trecho, med);
      }
      if (!usaLesoes && opcaoRequerLocalizacao(opcao, secao)) {
        const loc = medidas?.[chaveLocalizacao(secao.id, id)] ?? "";
        trecho = aplicarLocalizacao(trecho, loc);
      }
      if (opcaoRequerEstenose(opcao)) {
        const pct = medidas?.[chaveEstenose(secao.id, id)] ?? "";
        trecho = aplicarEstenose(trecho, pct);
      }
      if (opcaoMedidaHepatocoledoco(opcao, secao)) {
        const on = medidas?.[chaveHcOn(secao.id, id)] === "1";
        const hc = medidas?.[chaveHcMedida(secao.id, id)] ?? "";
        trecho = aplicarMedidaHepatocoledoco(trecho, on, hc);
      } else {
        trecho = trecho.replace(/\{\{HC\}\}/g, "");
      }
      if (opcaoRequerIndiceEsplenico(opcao)) {
        const ind = medidas?.[chaveIndiceEsplenico(secao.id, id)] ?? "";
        trecho = aplicarIndiceEsplenico(trecho, ind);
      }
      if (exame.id === "partes-moles") {
        trecho = aplicarRegiaoPartesMoles(
          trecho,
          volumes?.["pm-regiao"] ?? "",
        );
      }
      if (exame.id === "musculo") {
        trecho = aplicarMusculoNoTexto(
          trecho,
          volumes?.["musculo-regiao"] ?? "",
        );
      }
      if (exame.id === "mao" && /\{\{MAO_DEDO_ACHADO\}\}/.test(trecho)) {
        const meta = QUIRODACTILOS.find((d) => d.id === id);
        if (meta) {
          trecho = aplicarMaoDedoAchado(
            trecho,
            meta.nro,
            meta.nome,
            medidas?.[chaveMaoDedoAchado(secao.id, id)] ?? "",
            volumes?.["mao-doppler"] === "1",
          );
        }
      }
      if (
        (exameUsaClassificacaoTireoide(exame.id) &&
          opcaoRequerTirads(opcao, exame.id))
      ) {
        trecho = aplicarClassificacaoNoduloTireoide(
          trecho,
          secao.id,
          id,
          medidas ?? {},
          volumes?.["tireoide-doppler"] === "1",
        );
      }
      if (
        exame.id === "pelvica-tv" &&
        volumes?.["pelvica-tv-doppler"] === "1" &&
        (opcaoRequerVascLesao(opcao) || /\{\{VASC_LESAO\}\}/.test(trecho))
      ) {
        trecho = aplicarVascLesao(
          trecho,
          medidas?.[chaveVascLesao(secao.id, id)] ?? "",
        );
      } else if (/\{\{VASC_LESAO\}\}/.test(trecho)) {
        trecho = aplicarVascLesao(trecho, "");
      }
      blocosTexto.push(trecho);
    }
    if (blocosTexto.length === 0) continue;

    if (
      (secao.id === "bexiga" || secao.id === "pelve") &&
      ids.some((id) => {
        const o = secao.opcoes.find((x) => x.id === id);
        return o
          ? /calculo/i.test(
              `${o.id} ${o.label}`
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            )
          : false;
      })
    ) {
      for (let i = 0; i < blocosTexto.length; i++) {
        blocosTexto[i] = blocosTexto[i]
          .replace(/Não se notam imagens calculosas evidentes\.?\n?/gi, "")
          .replace(/Não se notam imagens calculosas\.?\n?/gi, "");
      }
    }

    let texto = fundirTextosOpcoes(blocosTexto);
    if (secao.id === "figado") {
      texto = fundirTextosFigado(ids, secao, blocosTexto);
    }
    if (secao.id === "lobo-d" || secao.id === "lobo-e") {
      texto = fundirTextosLoboTireoide(ids, blocosTexto);
    }
    if (secao.id === "testiculo-direito" || secao.id === "testiculo-esquerdo") {
      texto = fundirTextosTesticulo(ids, blocosTexto);
    }
    texto = aplicarVolumesNoTexto(
      exame.id,
      secao.id,
      texto,
      volumes ?? {},
      dimensoes ?? {},
    );

    const rotulo = secao.titulo.trim();
    const precisaHeaderAchados =
      exame.id === "ombro" ||
      exame.id === "punho" ||
      exame.id === "cotovelo" ||
      exame.id === "carotidas" ||
      exame.id === "mmii-venoso" ||
      exame.id === "mmii-arterial" ||
      exame.id === "mmss-venoso" ||
      exame.id === "mmss-arterial";
    if (precisaHeaderAchados && !achadosHeaderEmitido) {
      if (
        exame.id === "carotidas" ||
        exame.id === "mmii-venoso" ||
        exame.id === "mmii-arterial" ||
        exame.id === "mmss-venoso" ||
        exame.id === "mmss-arterial"
      ) {
        linhas.push("**3. DESCRIÇÃO DOS ACHADOS ULTRASSONOGRÁFICOS**");
      } else {
        linhas.push("**ACHADOS**");
      }
      linhas.push("");
      achadosHeaderEmitido = true;
    }
    emitirSecaoFormatada(linhas, rotulo, texto);
  }

  if (exame.id === "mmii-venoso") {
    const form = lerFormVenoso(volumes);
    const ladoEfetivo: LadoArticulacao = /esquerdo/i.test(exame.nome)
      ? "esquerdo"
      : "direito";
    const extraForm = textoFormVenosoParaLaudo(form, ladoEfetivo);
    if (extraForm) {
      linhas.push("");
      linhas.push(extraForm);
      linhas.push("");
    }
    if (form.anexarCartografia && form.mapaPng) {
      linhas.push("**Mapa esquemático (marcação):**");
      linhas.push("");
      linhas.push(`@@IMG:${form.mapaPng}`);
      linhas.push("");
    }
  }

  if (exame.id === "ecocardiograma") {
    const formEco = lerFormEco(volumes);
    const calcEco = calcularEco(formEco);
    const textoEco = textoFormEcoParaLaudo(formEco, calcEco);
    if (textoEco.trim()) {
      linhas.push(textoEco);
      linhas.push("");
    }
  }

  if (exame.id === "mmss-venoso" || exame.id === "mmss-arterial") {
    const carto = lerCartografiaMmss(volumes);
    if (carto.anexarCartografia && carto.mapaPng) {
      const ladoMmss: LadoArticulacao = /esquerdo/i.test(exame.nome)
        ? "esquerdo"
        : "direito";
      linhas.push(fraseMapeamentoFistulaMmss(exame.id, ladoMmss));
      linhas.push("");
      linhas.push(
        exame.id === "mmss-arterial"
          ? "**Cartografia pré-fístula (arterial):**"
          : "**Cartografia pré-fístula (venosa):**",
      );
      linhas.push("");
      linhas.push(`@@IMG:${carto.mapaPng}`);
      linhas.push("");
    }
  }

  const tabelasAntesImpressao =
    exame.id === "carotidas" ? (extras?.tabelasIds ?? []) : [];
  if (tabelasAntesImpressao.length > 0) {
    linhas.push(
      "**4. PARÂMETROS HEMODINÂMICOS (AMOSTRA REPRESENTATIVA)**",
    );
    linhas.push("");
    linhas.push(`@@TABELAS:${tabelasAntesImpressao.join(",")}`);
    linhas.push("");
  }

  linhas.push("**IMPRESSÃO DIAGNÓSTICA:**");
  linhas.push("");
  let impressaoFinal = (impressaoCustom?.trim() || exame.impressaoPadrao).trim();
  if (exame.id === "partes-moles") {
    impressaoFinal = aplicarRegiaoPartesMoles(
      impressaoFinal,
      volumes?.["pm-regiao"] ?? "",
    );
  }
  if (exame.id === "musculo") {
    impressaoFinal = aplicarMusculoNoTexto(
      impressaoFinal,
      volumes?.["musculo-regiao"] ?? "",
    );
  }
  if (exame.id === "mamas-masculino") {
    impressaoFinal = aplicarGinecoNoTexto(impressaoFinal, selecoes, volumes);
  }
  impressaoFinal = aplicarLacunasNaImpressao(
    exame,
    selecoes,
    medidas,
    impressaoFinal,
  );
  linhas.push(impressaoFinal);
  linhas.push("");

  const obsCatalogo = observacoesDoExame(exame.id);
  const ids = extras?.observacoesIds ?? [];
  const correlacoes = (extras?.examesAnteriores ?? []).filter(
    (e) => e.modalidade.trim() && e.data.trim(),
  );

  const frasesObs: string[] = [];
  const semAnt = obsCatalogo.find((o) => o.id === "sem-anteriores");
  const fraseCorr = frasesExamesCorrelacionados(correlacoes);
  // Com exame anterior preenchido, a correlação substitui o item 1 (sem anteriores)
  if (fraseCorr) {
    frasesObs.push(fraseCorr);
  } else if (semAnt && ids.includes("sem-anteriores")) {
    frasesObs.push(semAnt.texto);
  }
  for (const obs of obsCatalogo) {
    if (obs.id === "sem-anteriores") continue;
    if (!ids.includes(obs.id)) continue;
    frasesObs.push(obs.texto);
  }

  if (frasesObs.length > 0) {
    linhas.push("**OBSERVAÇÕES:**");
    linhas.push("");
    for (const obs of frasesObs) {
      linhas.push(obs);
      linhas.push("");
    }
  }

  const tabelas = extras?.tabelasIds ?? [];
  if (tabelas.length > 0 && exame.id !== "carotidas") {
    linhas.push(`@@TABELAS:${tabelas.join(",")}`);
    linhas.push("");
  }

  return linhas;
}

/** Um único exame (compatível) */
export function montarLaudo(
  exame: Exame,
  selecoes: Selecoes,
  paciente: DadosPaciente,
  impressaoCustom?: string,
  _assinatura?: string,
  extras?: ExtrasLaudo,
): string {
  return montarLaudos(
    [{ exame, selecoes, impressao: impressaoCustom ?? exame.impressaoPadrao, extras: extras ?? { observacoesIds: [], examesAnteriores: [] } }],
    paciente,
  );
}

/** Um ou mais exames encadeados no mesmo documento */
export function montarLaudos(
  blocos: BlocoLaudo[],
  paciente: DadosPaciente,
): string {
  const linhas: string[] = [];
  if (blocos.length === 0) return "";

  const primeiro = blocos[0];
  const tituloDoc =
    primeiro.exame.tituloDocumento?.trim() ||
    `ULTRASSONOGRAFIA — ${primeiro.exame.nome.toUpperCase()}`;
  linhas.push(`@@TITULO@@${tituloDoc}`);
  linhas.push("");

  if (paciente.nome.trim()) linhas.push(`Paciente: ${paciente.nome.trim()}`);
  if (paciente.idade.trim()) linhas.push(`Idade: ${paciente.idade.trim()}`);
  if (paciente.data.trim()) linhas.push(`Data: ${paciente.data.trim()}`);
  if (paciente.solicitante.trim())
    linhas.push(`Médico solicitante: ${paciente.solicitante.trim()}`);
  if (paciente.indicacao.trim()) {
    const ehObst = blocos.some(
      (b) =>
        b.exame.id.startsWith("obstetrico") ||
        b.exame.id === "cervicometria" ||
        b.exame.id.startsWith("eco-fetal"),
    );
    linhas.push(
      ehObst
        ? `Motivo do Exame:\n${paciente.indicacao.trim()}`
        : `Indicação: ${paciente.indicacao.trim()}`,
    );
  }

  if (
    paciente.nome.trim() ||
    paciente.idade.trim() ||
    paciente.data.trim() ||
    paciente.solicitante.trim() ||
    paciente.indicacao.trim()
  ) {
    linhas.push("");
  }

  blocos.forEach((bloco, idx) => {
    if (idx > 0) {
      linhas.push("");
      const titulo =
        bloco.exame.tituloDocumento?.trim() ||
        `ULTRASSONOGRAFIA — ${bloco.exame.nome.toUpperCase()}`;
      linhas.push(`@@TITULO@@${titulo}`);
      linhas.push("");
    }

    const corpo = montarCorpoExame(
      bloco.exame,
      bloco.selecoes,
      bloco.impressao,
      bloco.extras,
      bloco.medidas,
      bloco.volumes,
      bloco.dimensoes,
      { incluirTitulo: false },
      bloco.lesoes,
    );
    linhas.push(...corpo);
  });

  linhas.push("@@RODAPE@@");

  return linhas.join("\n").replace(/\n{3,}/g, "\n\n");
}

/** Converte marcadores **texto** e monta rodapé no estilo foto 2 */
export function laudoParaHtml(
  texto: string,
  medico?: SessaoMedico,
  baseUrl = "",
): string {
  const limpo = texto.replace(/@@RODAPE@@[\s\S]*$/m, "@@RODAPE@@");
  const escapado = limpo
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const comTitulo = escapado.replace(
    /^@@TITULO@@(.+)$/gm,
    '<p class="laudo-titulo">$1</p>',
  );

  const comNegrito = comTitulo.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const partes = comNegrito.split("@@RODAPE@@");
  const corpo = partes[0]
    .replace(/\n+$/, "")
    .split("\n")
    .map((linha) => {
      if (linha.startsWith('<p class="laudo-titulo">')) return linha;
      const tabMatch = /^@@TABELAS:(.+)$/.exec(linha.trim());
      if (tabMatch) {
        const ids = tabMatch[1]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        return htmlTabelasAnexas(ids, baseUrl);
      }
      const imgMatch = /^@@IMG:(.+)$/.exec(linha.trim());
      if (imgMatch) {
        const src = imgMatch[1]
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
        return `<div class="laudo-mapa-mmii laudo-com-lupa"><img src="${src}" alt="Cartografia / mapa esquemático" /><button type="button" class="laudo-lupa-btn" contenteditable="false" aria-label="Ampliar cartografia"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>`;
      }
      if (!linha.trim()) return "<br/>";
      return `<p class="laudo-p">${linha}</p>`;
    })
    .join("");

  if (!medico) {
    const rodape = (partes[1] || "")
      .replace(/^\n+/, "")
      .replace(/\n/g, "<br/>");
    return `<div class="laudo-doc">${corpo}<div class="laudo-rodape">${rodape}</div></div>`;
  }

  return `<div class="laudo-doc">${corpo}${montarRodapeHtml(medico)}</div>`;
}

export function laudoTextoLimpo(texto: string, medico?: SessaoMedico): string {
  const base = texto
    .replace(/@@TITULO@@/g, "")
    .replace(/@@TABELAS:[^\n]*/g, "")
    .replace(/@@IMG:[^\n]*/g, "[Mapa esquemático]")
    .replace(/@@RODAPE@@[\s\S]*$/m, "")
    .replace(/\*\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();
  if (!medico) return base;
  return `${base}\n\n${montarRodapeTexto(medico)}`;
}
