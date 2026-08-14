/**
 * Formulário de ecocardiograma estilo Medware (Medidas Gerais + cálculos).
 * Referências aproximadas ASE / práticas clínicas usuais (adulto).
 */

export const CHAVE_FORM_ECO = "eco-form";

export type SexoEco = "M" | "F" | "";

export type ScoreSegmento = "1" | "2" | "3" | "4" | "5";

export const SEGMENTOS_17: { id: string; nome: string; nivel: string }[] = [
  { id: "s1", nome: "1 Basal anterior", nivel: "basal" },
  { id: "s2", nome: "2 Basal anterosseptal", nivel: "basal" },
  { id: "s3", nome: "3 Basal inferosseptal", nivel: "basal" },
  { id: "s4", nome: "4 Basal inferior", nivel: "basal" },
  { id: "s5", nome: "5 Basal inferolateral", nivel: "basal" },
  { id: "s6", nome: "6 Basal anterolateral", nivel: "basal" },
  { id: "s7", nome: "7 Médio anterior", nivel: "medial" },
  { id: "s8", nome: "8 Médio anterosseptal", nivel: "medial" },
  { id: "s9", nome: "9 Médio inferosseptal", nivel: "medial" },
  { id: "s10", nome: "10 Médio inferior", nivel: "medial" },
  { id: "s11", nome: "11 Médio inferolateral", nivel: "medial" },
  { id: "s12", nome: "12 Médio anterolateral", nivel: "medial" },
  { id: "s13", nome: "13 Apical anterior", nivel: "apical" },
  { id: "s14", nome: "14 Apical septal", nivel: "apical" },
  { id: "s15", nome: "15 Apical inferior", nivel: "apical" },
  { id: "s16", nome: "16 Apical lateral", nivel: "apical" },
  { id: "s17", nome: "17 Ápice", nivel: "apice" },
];

export const SCORE_LABELS: Record<ScoreSegmento, string> = {
  "1": "1 — Normal",
  "2": "2 — Hipocinesia",
  "3": "3 — Acinesia",
  "4": "4 — Discinesia",
  "5": "5 — Aneurisma",
};

export type EcocardiogramaFormState = {
  sexo: SexoEco;
  pesoKg: string;
  alturaCm: string;
  idade: string;
  /** Câmaras esquerdas (mm / ml) */
  vsve: string;
  anelAo: string;
  seiosValsalva: string;
  juncaoSinoTub: string;
  aortaAsc: string;
  arcoAo: string;
  aeAP: string;
  volAE: string;
  ddfVE: string;
  dsfVE: string;
  siv: string;
  ppVE: string;
  /** Câmaras direitas */
  vsvd: string;
  troncoPulm: string;
  artPulm: string;
  volAD: string;
  vdBasal: string;
  espParedeLivreVD: string;
  /** Hemodinâmica */
  fc: string;
  pa: string;
  vtiVsve: string;
  /** Funções manuais / Doppler */
  feSimpson: string;
  tapse: string;
  facVD: string;
  sTric: string;
  teiVD: string;
  teiVE: string;
  dpDt: string;
  ondaE: string;
  ondaA: string;
  eSeptal: string;
  eLateral: string;
  triv: string;
  tempoDesacelE: string;
  vpMitral: string;
  /** Hipertensão pulmonar */
  vmaxRT: string;
  tempoAcelPulm: string;
  tempoEjecPulm: string;
  vciInsp: string;
  vciExp: string;
  pressaoAD: string;
  /** Strain */
  glsVE: string;
  strainCirc: string;
  strainRadial: string;
  strainAE: string;
  glsVD: string;
  /** Segmentar */
  segmentos: Record<string, ScoreSegmento>;
  /** Comentários */
  comentario: string;
};

export function formEcoVazio(): EcocardiogramaFormState {
  const segmentos: Record<string, ScoreSegmento> = {};
  for (const s of SEGMENTOS_17) segmentos[s.id] = "1";
  return {
    sexo: "M",
    pesoKg: "",
    alturaCm: "",
    idade: "",
    vsve: "",
    anelAo: "",
    seiosValsalva: "",
    juncaoSinoTub: "",
    aortaAsc: "",
    arcoAo: "",
    aeAP: "",
    volAE: "",
    ddfVE: "",
    dsfVE: "",
    siv: "",
    ppVE: "",
    vsvd: "",
    troncoPulm: "",
    artPulm: "",
    volAD: "",
    vdBasal: "",
    espParedeLivreVD: "",
    fc: "",
    pa: "",
    vtiVsve: "",
    feSimpson: "",
    tapse: "",
    facVD: "",
    sTric: "",
    teiVD: "",
    teiVE: "",
    dpDt: "",
    ondaE: "",
    ondaA: "",
    eSeptal: "",
    eLateral: "",
    triv: "",
    tempoDesacelE: "",
    vpMitral: "",
    vmaxRT: "",
    tempoAcelPulm: "",
    tempoEjecPulm: "",
    vciInsp: "",
    vciExp: "",
    pressaoAD: "",
    glsVE: "",
    strainCirc: "",
    strainRadial: "",
    strainAE: "",
    glsVD: "",
    segmentos,
    comentario: "",
  };
}

export function lerFormEco(
  volumes: Record<string, string> | undefined,
): EcocardiogramaFormState {
  const base = formEcoVazio();
  const raw = volumes?.[CHAVE_FORM_ECO];
  if (!raw) return base;
  try {
    const parsed = JSON.parse(raw) as Partial<EcocardiogramaFormState>;
    return {
      ...base,
      ...parsed,
      segmentos: { ...base.segmentos, ...(parsed.segmentos ?? {}) },
    };
  } catch {
    return base;
  }
}

export function gravarFormEco(form: EcocardiogramaFormState): string {
  return JSON.stringify(form);
}

function num(s: string): number | null {
  const t = s.trim().replace(",", ".");
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

export function fmtNum(n: number | null, casas = 2): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: casas,
  });
}

/** Du Bois */
export function calcBSA(pesoKg: number, alturaCm: number): number {
  return 0.007184 * Math.pow(pesoKg, 0.425) * Math.pow(alturaCm, 0.725);
}

/** Teichholz volume (mm → cm) */
export function volTeichholz(diamMm: number): number {
  const D = diamMm / 10;
  return (7 * Math.pow(D, 3)) / (2.4 + D);
}

/** Massa VE ASE (mm) */
export function massaVE(ddf: number, siv: number, pp: number): number {
  const LVIDd = ddf / 10;
  const IVSd = siv / 10;
  const PWd = pp / 10;
  return (
    0.8 * (1.04 * (Math.pow(LVIDd + IVSd + PWd, 3) - Math.pow(LVIDd, 3))) + 0.6
  );
}

export type EcoCalc = {
  bsa: number | null;
  anelAoIdx: number | null;
  seiosIdx: number | null;
  juncaoIdx: number | null;
  aortaAscIdx: number | null;
  volAEIdx: number | null;
  edv: number | null;
  esv: number | null;
  edvi: number | null;
  esvi: number | null;
  feTeich: number | null;
  fs: number | null;
  massa: number | null;
  massaIdx: number | null;
  rwt: number | null;
  geometria: string;
  ea: number | null;
  eMedia: number | null;
  eSobreE: number | null;
  variacaoVCI: number | null;
  psap: number | null;
  debitoSistolico: number | null;
  debitoCardiaco: number | null;
};

export function calcularEco(form: EcocardiogramaFormState): EcoCalc {
  const peso = num(form.pesoKg);
  const alt = num(form.alturaCm);
  const bsa = peso && alt ? calcBSA(peso, alt) : null;

  const idx = (v: number | null) =>
    v != null && bsa && bsa > 0 ? v / bsa : null;

  const anel = num(form.anelAo);
  const seios = num(form.seiosValsalva);
  const juncao = num(form.juncaoSinoTub);
  const asc = num(form.aortaAsc);
  const volAE = num(form.volAE);
  const ddf = num(form.ddfVE);
  const dsf = num(form.dsfVE);
  const siv = num(form.siv);
  const pp = num(form.ppVE);

  const edv = ddf != null && ddf > 0 ? volTeichholz(ddf) : null;
  const esv = dsf != null && dsf > 0 ? volTeichholz(dsf) : null;
  const feTeich =
    edv != null && esv != null && edv > 0
      ? ((edv - esv) / edv) * 100
      : null;
  const fs =
    ddf != null && dsf != null && ddf > 0 ? ((ddf - dsf) / ddf) * 100 : null;
  const massa =
    ddf != null && siv != null && pp != null ? massaVE(ddf, siv, pp) : null;
  const rwt = ddf != null && pp != null && ddf > 0 ? (2 * pp) / ddf : null;
  const massaIdx = idx(massa);

  const limMassa = form.sexo === "F" ? 95 : 115;
  const massaAlta = massaIdx != null && massaIdx > limMassa;
  const rwtAlta = rwt != null && rwt > 0.42;
  let geometria = "—";
  if (massaIdx != null && rwt != null) {
    if (!massaAlta && !rwtAlta) geometria = "Geometria normal";
    else if (!massaAlta && rwtAlta) geometria = "Remodelamento concêntrico";
    else if (massaAlta && !rwtAlta) geometria = "Hipertrofia excêntrica";
    else geometria = "Hipertrofia concêntrica";
  }

  const e = num(form.ondaE);
  const a = num(form.ondaA);
  const eSept = num(form.eSeptal);
  const eLat = num(form.eLateral);
  const ea = e != null && a != null && a > 0 ? e / a : null;
  const eMedia =
    eSept != null && eLat != null ? (eSept + eLat) / 2 : eSept ?? eLat;
  const eSobreE =
    e != null && eMedia != null && eMedia > 0 ? e / eMedia : null;

  const vciI = num(form.vciInsp);
  const vciE = num(form.vciExp);
  const variacaoVCI =
    vciI != null && vciE != null && vciE > 0
      ? ((vciE - vciI) / vciE) * 100
      : null;

  const vmaxRT = num(form.vmaxRT);
  const pad = num(form.pressaoAD) ?? 5;
  const psap =
    vmaxRT != null ? 4 * Math.pow(vmaxRT, 2) + pad : null;

  const vsve = num(form.vsve) ?? num(form.anelAo);
  const vti = num(form.vtiVsve);
  const fc = num(form.fc);
  const areaVsve =
    vsve != null ? Math.PI * Math.pow(vsve / 20, 2) : null;
  const debitoSistolico =
    areaVsve != null && vti != null ? areaVsve * vti : null;
  const debitoCardiaco =
    debitoSistolico != null && fc != null
      ? (debitoSistolico * fc) / 1000
      : null;

  return {
    bsa,
    anelAoIdx: idx(anel),
    seiosIdx: idx(seios),
    juncaoIdx: idx(juncao),
    aortaAscIdx: idx(asc),
    volAEIdx: idx(volAE),
    edv,
    esv,
    edvi: idx(edv),
    esvi: idx(esv),
    feTeich,
    fs,
    massa,
    massaIdx,
    rwt,
    geometria,
    ea,
    eMedia,
    eSobreE,
    variacaoVCI,
    psap,
    debitoSistolico,
    debitoCardiaco,
  };
}

export type StatusNorm = "ok" | "alto" | "baixo" | "info" | "";

export function statusFaixa(
  valor: number | null,
  min?: number,
  max?: number,
): StatusNorm {
  if (valor == null) return "";
  if (min != null && valor < min) return "baixo";
  if (max != null && valor > max) return "alto";
  if (min != null || max != null) return "ok";
  return "info";
}

/** Refs adultas típicas (homem); ajusta FE/massa por sexo. */
export function refsPorSexo(sexo: SexoEco) {
  const fem = sexo === "F";
  return {
    anelAo: { min: 19, max: 23.4 },
    anelAoIdx: { min: 10, max: 12.6 },
    seios: { min: 28.5, max: 35.9 },
    seiosIdx: { min: 14.7, max: 19.7 },
    juncao: { min: 24, max: 31.4 },
    juncaoIdx: { min: 12.5, max: 17.1 },
    aortaAsc: { min: 26, max: 32 },
    aeAP: { min: 30, max: 40 },
    volAEIdx: { max: 34 },
    ddf: { min: fem ? 38 : 42, max: fem ? 52 : 58 },
    dsf: { min: fem ? 22 : 25, max: fem ? 35 : 40 },
    siv: { min: 6, max: fem ? 9 : 10 },
    pp: { min: 6, max: fem ? 9 : 10 },
    fe: { min: 52, max: 72 },
    fs: { min: 25, max: 43 },
    massa: { min: fem ? 67 : 88, max: fem ? 162 : 224 },
    massaIdx: { min: fem ? 43 : 49, max: fem ? 95 : 115 },
    rwt: { max: 0.42 },
    tapse: { min: 17 },
    fac: { min: 35 },
    sTric: { min: 9.5 },
    ea: { min: 0.8, max: 2.0 },
    eSobreE: { max: 14 },
    psap: { max: 37 },
    gls: { max: -16.85 }, // mais negativo = melhor; alerta se > -16.85 (menos negativo)
  };
}

export function textoFormEcoParaLaudo(
  form: EcocardiogramaFormState,
  calc: EcoCalc,
): string {
  const L: string[] = [];
  const linha = (rotulo: string, valor: string, un = "") => {
    if (!valor || valor === "—") return;
    L.push(`${rotulo}: ${valor}${un ? ` ${un}` : ""}.`);
  };

  if (form.pesoKg || form.alturaCm || calc.bsa) {
    L.push("DADOS ANTROPOMÉTRICOS");
    if (form.sexo) L.push(`Sexo: ${form.sexo === "F" ? "feminino" : "masculino"}.`);
    if (form.idade) L.push(`Idade: ${form.idade} anos.`);
    if (form.pesoKg) L.push(`Peso: ${form.pesoKg} kg.`);
    if (form.alturaCm) L.push(`Altura: ${form.alturaCm} cm.`);
    if (calc.bsa) L.push(`Superfície corporal: ${fmtNum(calc.bsa, 2)} m².`);
    L.push("");
  }

  L.push("CÂMARAS ESQUERDAS");
  linha("Via de saída do VE", form.vsve, "mm");
  linha("Anel aórtico", form.anelAo, "mm");
  if (calc.anelAoIdx)
    L.push(`Anel aórtico indexado: ${fmtNum(calc.anelAoIdx, 2)} mm/m².`);
  linha("Aorta (seios de Valsalva)", form.seiosValsalva, "mm");
  if (calc.seiosIdx)
    L.push(`Seios de Valsalva indexado: ${fmtNum(calc.seiosIdx, 2)} mm/m².`);
  linha("Aorta (junção sinotubular)", form.juncaoSinoTub, "mm");
  if (calc.juncaoIdx)
    L.push(`Junção sinotubular indexada: ${fmtNum(calc.juncaoIdx, 2)} mm/m².`);
  linha("Aorta ascendente", form.aortaAsc, "mm");
  if (calc.aortaAscIdx)
    L.push(`Aorta ascendente indexada: ${fmtNum(calc.aortaAscIdx, 2)} mm/m².`);
  linha("Arco aórtico", form.arcoAo, "mm");
  linha("Átrio esquerdo (A-P)", form.aeAP, "mm");
  linha("Volume do átrio esquerdo", form.volAE, "ml");
  if (calc.volAEIdx)
    L.push(`Volume do átrio esquerdo indexado: ${fmtNum(calc.volAEIdx, 1)} mL/m².`);
  linha("Diâmetro diastólico do VE", form.ddfVE, "mm");
  linha("Diâmetro sistólico do VE", form.dsfVE, "mm");
  linha("Septo interventricular (diástole)", form.siv, "mm");
  linha("Parede posterior do VE (diástole)", form.ppVE, "mm");
  L.push("");

  L.push("CÂMARAS DIREITAS");
  linha("Via de saída do VD", form.vsvd, "mm");
  linha("Tronco pulmonar", form.troncoPulm, "mm");
  linha("Artéria pulmonar", form.artPulm, "mm");
  linha("Volume do átrio direito", form.volAD, "ml");
  linha("Ventrículo direito (basal)", form.vdBasal, "mm");
  linha("Espessura da parede livre do VD", form.espParedeLivreVD, "mm");
  L.push("");

  L.push("PARÂMETROS HEMODINÂMICOS");
  linha("Frequência cardíaca", form.fc, "bpm");
  linha("Pressão arterial", form.pa, "mmHg");
  linha("Diâmetro da VSVE", form.vsve || form.anelAo, "mm");
  linha("Integral de fluxo da VSVE (VTI)", form.vtiVsve, "cm");
  if (calc.debitoSistolico)
    L.push(`Volume sistólico: ${fmtNum(calc.debitoSistolico, 1)} ml/bat.`);
  if (calc.debitoCardiaco)
    L.push(`Débito cardíaco: ${fmtNum(calc.debitoCardiaco, 2)} L/min.`);
  L.push("");

  L.push("RELAÇÕES / FUNÇÕES");
  if (calc.edv) L.push(`Volume diastólico final do VE: ${fmtNum(calc.edv, 1)} ml.`);
  if (calc.esv) L.push(`Volume sistólico final do VE: ${fmtNum(calc.esv, 1)} ml.`);
  if (calc.edvi)
    L.push(`Volume diastólico final do VE / SC: ${fmtNum(calc.edvi, 1)} ml/m².`);
  if (calc.esvi)
    L.push(`Volume sistólico final do VE / SC: ${fmtNum(calc.esvi, 1)} ml/m².`);
  if (calc.feTeich)
    L.push(`Fração de ejeção do VE (Teichholz): ${fmtNum(calc.feTeich, 1)} %.`);
  linha("Fração de ejeção do VE (Simpson)", form.feSimpson, "%");
  if (calc.fs) L.push(`% de encurtamento do VE: ${fmtNum(calc.fs, 1)} %.`);
  if (calc.massa) L.push(`Massa do VE: ${fmtNum(calc.massa, 1)} g.`);
  if (calc.massaIdx)
    L.push(`Índice de massa do VE: ${fmtNum(calc.massaIdx, 1)} g/m².`);
  if (calc.rwt) L.push(`Espessura relativa das paredes do VE: ${fmtNum(calc.rwt, 2)}.`);
  if (calc.geometria !== "—") L.push(`Geometria do VE: ${calc.geometria}.`);
  linha("TAPSE", form.tapse, "mm");
  linha("FAC do VD", form.facVD, "%");
  linha("S' do anel tricúspide", form.sTric, "cm/s");
  linha("Índice de performance miocárdica do VD (Tei)", form.teiVD);
  linha("Índice de performance miocárdica do VE (Tei)", form.teiVE);
  linha("Relação dp/dt", form.dpDt, "mmHg/s");
  linha("Onda E mitral", form.ondaE, "m/s");
  linha("Onda A mitral", form.ondaA, "m/s");
  if (calc.ea) L.push(`Relação E/A: ${fmtNum(calc.ea, 2)}.`);
  linha("e' septal", form.eSeptal, "cm/s");
  linha("e' lateral", form.eLateral, "cm/s");
  if (calc.eMedia) L.push(`e' média: ${fmtNum(calc.eMedia, 1)} cm/s.`);
  if (calc.eSobreE) L.push(`Relação E/e': ${fmtNum(calc.eSobreE, 1)}.`);
  linha("Tempo de relaxamento isovolumétrico (TRIV)", form.triv, "ms");
  linha("Tempo de desaceleração da onda E", form.tempoDesacelE, "ms");
  linha("Velocidade de propagação do fluxo mitral (Vp)", form.vpMitral, "cm/s");
  L.push("");

  L.push("ANÁLISE DE HIPERTENSÃO PULMONAR");
  linha("Velocidade máxima da regurgitação tricúspide", form.vmaxRT, "m/s");
  linha("Tempo de aceleração do fluxo pulmonar", form.tempoAcelPulm, "ms");
  linha("Tempo de ejeção do fluxo pulmonar", form.tempoEjecPulm, "ms");
  linha("Veia cava inferior (inspiração)", form.vciInsp, "mm");
  linha("Veia cava inferior (expiração)", form.vciExp, "mm");
  if (calc.variacaoVCI)
    L.push(`Variação da VCI: ${fmtNum(calc.variacaoVCI, 0)} %.`);
  linha("Pressão do átrio direito (estimada)", form.pressaoAD, "mmHg");
  if (calc.psap) L.push(`PSAP estimada: ${fmtNum(calc.psap, 0)} mmHg.`);
  L.push("");

  if (form.glsVE || form.strainCirc || form.strainRadial || form.strainAE || form.glsVD) {
    L.push("STRAIN");
    linha("Strain longitudinal global do VE (GLS)", form.glsVE, "%");
    linha("Strain circunferencial do VE", form.strainCirc, "%");
    linha("Strain radial do VE", form.strainRadial, "%");
    linha("Strain do átrio esquerdo", form.strainAE, "%");
    linha("Strain longitudinal global do VD", form.glsVD, "%");
    L.push("");
  }

  const alterados = SEGMENTOS_17.filter(
    (s) => (form.segmentos[s.id] ?? "1") !== "1",
  );
  L.push("ANÁLISE SEGMENTAR (modelo de 17 segmentos)");
  if (alterados.length === 0) {
    L.push("Contração segmentar do ventrículo esquerdo preservada em todos os segmentos.");
  } else {
    for (const s of alterados) {
      const sc = form.segmentos[s.id] ?? "1";
      L.push(`${s.nome}: ${SCORE_LABELS[sc]}.`);
    }
  }
  L.push("");

  if (form.comentario.trim()) {
    L.push("OBSERVAÇÃO");
    L.push(form.comentario.trim());
  }

  return L.join("\n").replace(/\n{3,}/g, "\n\n");
}

export function impressaoFormEco(
  form: EcocardiogramaFormState,
  calc: EcoCalc,
): string {
  const partes: string[] = [];
  if (calc.geometria && calc.geometria !== "—") {
    partes.push(`${calc.geometria} do ventrículo esquerdo.`);
  }
  if (calc.feTeich != null) {
    if (calc.feTeich >= 52) {
      partes.push(
        `Função sistólica do ventrículo esquerdo preservada (FE Teichholz ${fmtNum(calc.feTeich, 0)}%).`,
      );
    } else {
      partes.push(
        `Função sistólica do ventrículo esquerdo reduzida (FE Teichholz ${fmtNum(calc.feTeich, 0)}%).`,
      );
    }
  } else if (form.feSimpson) {
    partes.push(`Fração de ejeção (Simpson): ${form.feSimpson}%.`);
  }
  const alterados = SEGMENTOS_17.filter(
    (s) => (form.segmentos[s.id] ?? "1") !== "1",
  );
  if (alterados.length === 0) {
    partes.push("Função segmentar do ventrículo esquerdo preservada.");
  } else {
    partes.push(
      `Alteração da contração segmentar em ${alterados.length} segmento(s).`,
    );
  }
  if (calc.psap != null) {
    if (calc.psap < 37) {
      partes.push(`PSAP estimada dentro da normalidade (${fmtNum(calc.psap, 0)} mmHg).`);
    } else {
      partes.push(`Sinais de hipertensão pulmonar (PSAP estimada ${fmtNum(calc.psap, 0)} mmHg).`);
    }
  }
  if (!partes.length) {
    return "Ecocardiograma sem alterações significativas apreciáveis ao método.";
  }
  partes.push("Demais estruturas sem evidentes anormalidades apreciáveis ao método.");
  return partes.join("\n");
}
