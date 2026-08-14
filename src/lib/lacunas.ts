/** Lacunas de preenchimento no texto do laudo (`____` / `___`). */

export const LACUNA_RE = /_{3,}/g;

export type OrigemLacuna = "texto" | "impressao";

export type MetaLacuna = {
  index: number;
  rotulo: string;
  unidade: string;
  placeholder: string;
};

export function contarLacunas(texto: string | undefined | null): number {
  if (!texto) return 0;
  return (texto.match(LACUNA_RE) ?? []).length;
}

export function temLacunas(texto: string | undefined | null): boolean {
  return contarLacunas(texto) > 0;
}

export function opcaoTemLacunas(opcao: {
  texto?: string;
  impressao?: string;
}): boolean {
  return temLacunas(opcao.texto) || temLacunas(opcao.impressao);
}

/** Chave em `medidas` para a n-ésima lacuna da opção. */
export function chaveLacuna(
  secaoId: string,
  opcaoId: string,
  origem: OrigemLacuna,
  index: number,
): string {
  const tag = origem === "impressao" ? "LI" : "L";
  return `${secaoId}::${opcaoId}::${tag}::${index}`;
}

/** Lacunas remanescentes na impressão diagnóstica montada (ex.: impressaoPadrao). */
export function chaveLacunaImpressaoFinal(index: number): string {
  return `__impressao__::L::${index}`;
}

function limparRotulo(s: string): string {
  return s
    .replace(/\s+/g, " ")
    .replace(/[:：=\-–—]\s*$/u, "")
    .replace(/^[(\[{«"'=\s]+|[)\]}»"'\s]+$/gu, "")
    .trim();
}

/**
 * Rótulo da n-ésima lacuna: usa só o trecho após a lacuna anterior
 * (assim "____ semanas e ____ dias" vira dois campos distintos).
 */
function extrairRotulo(
  before: string,
  after: string,
  unidade: string,
  index: number,
): string {
  const partes = before.split(LACUNA_RE);
  const trecho = limparRotulo(partes[partes.length - 1] ?? "");
  const linha = trecho.split(/\n/).pop()?.trim() ?? trecho;
  let chunk = limparRotulo(linha.replace(/^[\s\S]*[.;]\s*/u, ""));
  if (!chunk) chunk = limparRotulo(linha);

  if (!chunk && unidade) {
    return `${unidade} (${index + 1})`;
  }
  if (!chunk) {
    const m = after.match(
      /^\s*(semanas?|dias?|mm|cm|bpm|g|%|percentil|PI|IR|IP)\b/i,
    );
    if (m) return `${m[1]} (${index + 1})`;
    return `Valor ${index + 1}`;
  }
  if (chunk.length > 52) chunk = `…${chunk.slice(-49)}`;
  return unidade ? `${chunk} (${unidade})` : chunk;
}

function extrairUnidade(after: string): string {
  const m = after.match(
    /^\s*([%]|mm\b|cm\b|bpm\b|g\b|kg\b|semanas?\b|dias?\b)/i,
  );
  return m ? m[1] : "";
}

/** Detecta sequência tipo `____ x ____ x ____ mm` e rotula Medida 1/2/3. */
function rotuloDimensaoEmCadeia(
  texto: string,
  matchIndex: number,
): string | null {
  const re = new RegExp(LACUNA_RE.source, "g");
  const hits: { index: number; len: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(texto)) !== null) {
    hits.push({ index: m.index, len: m[0].length });
  }
  const pos = hits.findIndex((h) => h.index === matchIndex);
  if (pos < 0) return null;

  let startPos = pos;
  for (let i = pos; i > 0; i--) {
    const prev = hits[i - 1];
    const cur = hits[i];
    const entre = texto.slice(prev.index + prev.len, cur.index);
    if (/^\s*x\s*$/i.test(entre)) startPos = i - 1;
    else break;
  }

  const cadeia: typeof hits = [];
  for (let i = startPos; i < hits.length; i++) {
    if (cadeia.length === 0) {
      cadeia.push(hits[i]);
      continue;
    }
    const prev = cadeia[cadeia.length - 1];
    const entre = texto.slice(prev.index + prev.len, hits[i].index);
    if (/^\s*x\s*$/i.test(entre)) cadeia.push(hits[i]);
    else break;
  }
  if (cadeia.length < 2) return null;
  const last = cadeia[cadeia.length - 1];
  const afterLast = texto.slice(last.index + last.len, last.index + last.len + 12);
  const unidade = extrairUnidade(afterLast) || "mm";
  const ord = cadeia.findIndex((h) => h.index === matchIndex) + 1;
  if (ord < 1) return null;
  return `Medida ${ord} (${unidade})`;
}

export function listarLacunas(texto: string): MetaLacuna[] {
  const metas: MetaLacuna[] = [];
  const re = new RegExp(LACUNA_RE.source, "g");
  let m: RegExpExecArray | null;
  const usados = new Map<string, number>();
  while ((m = re.exec(texto)) !== null) {
    const before = texto.slice(0, m.index);
    const after = texto.slice(m.index + m[0].length);
    const unidade = extrairUnidade(after);
    const dim = rotuloDimensaoEmCadeia(texto, m.index);
    let rotulo =
      dim ?? extrairRotulo(before, after, unidade, metas.length);
    const n = (usados.get(rotulo) ?? 0) + 1;
    usados.set(rotulo, n);
    if (n > 1 && !dim) rotulo = `${rotulo} #${n}`;
    metas.push({
      index: metas.length,
      rotulo,
      unidade: unidade || (dim ? "mm" : ""),
      placeholder: "____",
    });
  }
  return metas;
}

export function lerValoresLacunas(
  medidas: Record<string, string> | undefined,
  secaoId: string,
  opcaoId: string,
  origem: OrigemLacuna,
  quantidade: number,
): string[] {
  const out: string[] = [];
  for (let i = 0; i < quantidade; i++) {
    out.push(
      (medidas?.[chaveLacuna(secaoId, opcaoId, origem, i)] ?? "").trim(),
    );
  }
  return out;
}

export function lerValoresLacunasImpressaoFinal(
  medidas: Record<string, string> | undefined,
  quantidade: number,
): string[] {
  const out: string[] = [];
  for (let i = 0; i < quantidade; i++) {
    out.push((medidas?.[chaveLacunaImpressaoFinal(i)] ?? "").trim());
  }
  return out;
}

/** Remove unidade repetida digitada pelo usuário (ex.: "1,2 cm" → "1,2"). */
export function limparValorMedidaNumerica(v: string): string {
  return v
    .trim()
    .replace(/\s*(cm\s*³|cm3|cm²|cm2|mm\s*²|mm2|cm|mm)\s*$/i, "")
    .trim();
}

type HitLacuna = { index: number; len: number; match: string };

function listarHitsLacunas(texto: string): HitLacuna[] {
  const re = new RegExp(LACUNA_RE.source, "g");
  const hits: HitLacuna[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(texto)) !== null) {
    hits.push({ index: m.index, len: m[0].length, match: m[0] });
  }
  return hits;
}

/** Cadeias `____ x ____ x ____` (2+ lacunas ligadas por x). */
function cadeiasDimensao(texto: string, hits: HitLacuna[]): number[][] {
  const cadeias: number[][] = [];
  let i = 0;
  while (i < hits.length) {
    const cadeia = [i];
    let j = i + 1;
    while (j < hits.length) {
      const prev = hits[j - 1];
      const cur = hits[j];
      const entre = texto.slice(prev.index + prev.len, cur.index);
      if (/^\s*x\s*$/i.test(entre)) {
        cadeia.push(j);
        j++;
      } else break;
    }
    if (cadeia.length >= 2) cadeias.push(cadeia);
    i = j > i ? j : i + 1;
  }
  return cadeias;
}

/**
 * Substitui cada `____`/`___` pelos valores.
 * Em cadeias `____ x ____ x ____ [unidade]`:
 * - 1 valor preenchido → `VAL unidade em seu maior eixo`
 * - 2+ valores → `a x b [x c] unidade`
 */
export function aplicarLacunas(
  texto: string,
  valores: Array<string | undefined | null>,
): string {
  const hits = listarHitsLacunas(texto);
  if (hits.length === 0) return texto;

  const vals = valores.map((v) => limparValorMedidaNumerica(String(v ?? "")));
  const cadeias = cadeiasDimensao(texto, hits);
  const hitEmCadeia = new Set<number>();
  for (const c of cadeias) for (const idx of c) hitEmCadeia.add(idx);

  type Seg =
    | { tipo: "texto"; s: string }
    | { tipo: "lacuna"; hitIdx: number }
    | { tipo: "cadeia"; hitIndices: number[]; end: number };

  const segs: Seg[] = [];
  let cursor = 0;
  let hi = 0;
  while (hi < hits.length) {
    const hit = hits[hi];
    if (cursor < hit.index) {
      segs.push({ tipo: "texto", s: texto.slice(cursor, hit.index) });
    }
    const cadeia = cadeias.find((c) => c[0] === hi);
    if (cadeia) {
      const last = hits[cadeia[cadeia.length - 1]];
      let end = last.index + last.len;
      const after = texto.slice(end, end + 16);
      const um = after.match(/^\s*(cm\s*³|cm3|mm\s*²|mm2|cm|mm)\b/i);
      if (um) end += um[0].length;
      segs.push({ tipo: "cadeia", hitIndices: cadeia, end });
      cursor = end;
      hi = cadeia[cadeia.length - 1] + 1;
      continue;
    }
    segs.push({ tipo: "lacuna", hitIdx: hi });
    cursor = hit.index + hit.len;
    hi++;
  }
  if (cursor < texto.length) segs.push({ tipo: "texto", s: texto.slice(cursor) });

  let out = "";
  for (const seg of segs) {
    if (seg.tipo === "texto") {
      out += seg.s;
      continue;
    }
    if (seg.tipo === "lacuna") {
      const v = vals[seg.hitIdx] ?? "";
      out += v || hits[seg.hitIdx].match;
      continue;
    }
    // cadeia dimensional
    const preenchidos = seg.hitIndices
      .map((idx) => vals[idx] ?? "")
      .filter(Boolean);
    const lastHit = hits[seg.hitIndices[seg.hitIndices.length - 1]];
    const unidadeMatch = texto
      .slice(lastHit.index + lastHit.len, seg.end)
      .match(/\s*(cm\s*³|cm3|mm\s*²|mm2|cm|mm)\b/i);
    const unidade = (unidadeMatch?.[1] ?? "cm").replace(/\s+/g, "");

    if (preenchidos.length === 0) {
      // mantém o trecho original da cadeia
      const first = hits[seg.hitIndices[0]];
      out += texto.slice(first.index, seg.end);
    } else if (preenchidos.length === 1) {
      out += `${preenchidos[0]} ${unidade} em seu maior eixo`;
    } else {
      out += `${preenchidos.join(" x ")} ${unidade}`;
    }
  }
  return out;
}

/**
 * IG aproximada a partir do MDG (mm): dias ≈ MDG + 30
 * (aproximação clássica do saco gestacional).
 */
export function formatarIgPorMdg(mdgRaw: string | undefined | null): string {
  const n = Number.parseFloat(
    String(mdgRaw ?? "")
      .trim()
      .replace(",", "."),
  );
  if (!Number.isFinite(n) || n <= 0) {
    return "____ semanas e ____ dias";
  }
  const totalDias = Math.round(n + 30);
  const semanas = Math.floor(totalDias / 7);
  const dias = totalDias % 7;
  return `${semanas} semanas e ${dias} dias`;
}

/** Substitui `{{IG_MDG}}` pela IG calculada a partir do valor do MDG (1ª lacuna). */
export function aplicarIgMdgNoTexto(
  texto: string,
  mdgValor: string | undefined | null,
): string {
  if (!texto.includes("{{IG_MDG}}")) return texto;
  return texto.split("{{IG_MDG}}").join(formatarIgPorMdg(mdgValor));
}

/**
 * Preenche lacunas da impressão:
 * 1) frases de impressão das opções (chaves LI);
 * 2) lacunas restantes via `__impressao__`.
 */
export function aplicarLacunasNaImpressao(
  exame: {
    secoes: Array<{
      id: string;
      opcoes: Array<{ id: string; impressao?: string }>;
    }>;
  },
  selecoes: Record<string, string | string[] | undefined>,
  medidas: Record<string, string> | undefined,
  impressao: string,
): string {
  let out = impressao;

  for (const secao of exame.secoes) {
    const raw = selecoes[secao.id];
    const ids = Array.isArray(raw)
      ? raw.filter(Boolean)
      : typeof raw === "string" && raw
        ? [raw]
        : [];
    for (const id of ids) {
      const opcao = secao.opcoes.find((o) => o.id === id);
      const base = opcao?.impressao?.trim();
      if (!base || !temLacunas(base)) continue;
      const vals = lerValoresLacunas(
        medidas,
        secao.id,
        id,
        "impressao",
        contarLacunas(base),
      );
      const preenchida = aplicarLacunas(base, vals);
      if (out.includes(base)) {
        out = out.split(base).join(preenchida);
      }
    }
  }

  if (temLacunas(out)) {
    out = aplicarLacunas(
      out,
      lerValoresLacunasImpressaoFinal(medidas, contarLacunas(out)),
    );
  }

  return out;
}
