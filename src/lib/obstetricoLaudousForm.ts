/**
 * Estado e geração de texto do painel Obstetrícia estilo LaudoUS.
 */

export const CHAVE_FORM_OBST_LAUDOUS = "obst-laudous-form";

export type ObstLaudousTipo =
  | "1r"
  | "1m"
  | "1tn"
  | "23"
  | "1mg"
  | "23m"
  | "23dop"
  | "outro";

export type ObstLaudousFormState = {
  baseIg: "biometria" | "anterior" | "dum" | "fiv" | "desconhecida";
  indicacao: string;
  via: string;
  dum: string;
  /** Limitações */
  limJanela: boolean;
  limFeixes: boolean;
  limEstrutura: boolean;
  limEstruturaTxt: string;
  /** 1T */
  sgLoc: "intrauterino" | "nao-id" | "ectopico";
  dmsg1: string;
  dmsg2: string;
  dmsg3: string;
  sgContornosOk: boolean;
  implantacao: string;
  vvStatus: "normal" | "ausente" | "";
  vvMm: string;
  embStatus: "presente" | "nao-id";
  ccn: string;
  bcfStatus: "presente" | "ausente";
  bcfBpm: string;
  movPresentes: boolean;
  cordInsercaoOk: boolean;
  tnIncluir: boolean;
  tnMm: string;
  uteroNormal: boolean;
  anexosOk: boolean;
  coloOk: boolean;
  descolamento: boolean;
  /** 2/3T biometria */
  dbp: string;
  cc: string;
  ca: string;
  cf: string;
  dof: string;
  umero: string;
  incDbp: boolean;
  incCc: boolean;
  incCa: boolean;
  incCf: boolean;
  incDof: boolean;
  situacao: string;
  apresentacao: string;
  dorso: string;
  placentaInsercao: string;
  placentaGrau: string;
  liquidoNormal: boolean;
  liquidoTxt: string;
  cordTresVasos: boolean;
  dopplerInc: boolean;
  auIp: string;
  acmIp: string;
  /** Morfologia 2T checkboxes */
  mm: Record<string, boolean>;
};

export const MM_KEYS_2T = [
  ["cranio", "Crânio normal"],
  ["cerebro", "Cérebro normal"],
  ["face", "Face normal"],
  ["coluna", "Coluna normal"],
  ["torax", "Tórax normal"],
  ["pulmoes", "Pulmões normais"],
  ["coracao", "Coração / 4 câmaras"],
  ["vasos", "Vasos da base"],
  ["estomago", "Estômago normal"],
  ["figado", "Fígado normal"],
  ["parede", "Parede abdominal"],
  ["alcas", "Alças intestinais"],
  ["rins", "Rins normais"],
  ["bexiga", "Bexiga normal"],
  ["vb", "Vesícula biliar"],
  ["membros", "Membros normais"],
  ["falange", "Falange 5º dedo"],
  ["genit", "Genitália externa"],
] as const;

export function tipoObstPorExameId(exameId: string): ObstLaudousTipo {
  switch (exameId) {
    case "obstetrico-tv-precoce":
      return "1r";
    case "obstetrico-morfo-1t":
      return "1m";
    case "obstetrico-gemelar-1t":
      return "1mg";
    case "obstetrico":
      return "23";
    case "obstetrico-morfo-2t":
      return "23m";
    case "obstetrico-doppler":
      return "23dop";
    default:
      return "outro";
  }
}

export function formObstLaudousVazio(
  tipo: ObstLaudousTipo = "1r",
): ObstLaudousFormState {
  const mm: Record<string, boolean> = {};
  for (const [k] of MM_KEYS_2T) mm[k] = tipo === "23m";
  return {
    baseIg: "biometria",
    indicacao: "Pré-natal de rotina",
    via: "",
    dum: "",
    limJanela: false,
    limFeixes: false,
    limEstrutura: false,
    limEstruturaTxt: "",
    sgLoc: "intrauterino",
    dmsg1: "",
    dmsg2: "",
    dmsg3: "",
    sgContornosOk: true,
    implantacao: "fúndica",
    vvStatus: "normal",
    vvMm: "",
    embStatus: "presente",
    ccn: "",
    bcfStatus: "presente",
    bcfBpm: "",
    movPresentes: true,
    cordInsercaoOk: false,
    tnIncluir: tipo === "1m" || tipo === "1tn" || tipo === "1mg",
    tnMm: "",
    uteroNormal: true,
    anexosOk: true,
    coloOk: true,
    descolamento: false,
    dbp: "",
    cc: "",
    ca: "",
    cf: "",
    dof: "",
    umero: "",
    incDbp: true,
    incCc: true,
    incCa: true,
    incCf: true,
    incDof: true,
    situacao: "longitudinal",
    apresentacao: "cefálica",
    dorso: "esquerda",
    placentaInsercao: "corporal posterior",
    placentaGrau: "0",
    liquidoNormal: true,
    liquidoTxt: "",
    cordTresVasos: true,
    dopplerInc: tipo === "23dop",
    auIp: "",
    acmIp: "",
    mm,
  };
}

export function lerFormObstLaudous(
  volumes: Record<string, string> | undefined,
  exameId: string,
): ObstLaudousFormState {
  const tipo = tipoObstPorExameId(exameId);
  const base = formObstLaudousVazio(tipo);
  const raw = volumes?.[CHAVE_FORM_OBST_LAUDOUS];
  if (!raw) {
    // hidratar DUM legado
    if (volumes?.["obst-dum"] || volumes?.["obst-tv-dum"]) {
      base.dum = volumes["obst-dum"] || volumes["obst-tv-dum"] || "";
    }
    return base;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<ObstLaudousFormState>;
    return {
      ...base,
      ...parsed,
      mm: { ...base.mm, ...(parsed.mm ?? {}) },
    };
  } catch {
    return base;
  }
}

export function gravarFormObstLaudous(form: ObstLaudousFormState): string {
  return JSON.stringify(form);
}

/** IG em dias a partir do CCN (FMF). */
export function igDiasPorCcn(ccnMm: number): number {
  const c = Math.max(2, Math.min(85, ccnMm));
  return Math.round(
    36.75827 + 1.42165 * c - 0.013779 * c * c + 0.00006946 * c * c * c,
  );
}

/** Interpolação linear em tabela [mm, semanas]. */
function interp(table: [number, number][], mm: number): number | null {
  if (!(mm > 0)) return null;
  if (mm <= table[0][0]) return table[0][1];
  const last = table[table.length - 1];
  if (mm >= last[0]) return last[1];
  for (let i = 0; i < table.length - 1; i++) {
    const [aM, aW] = table[i];
    const [bM, bW] = table[i + 1];
    if (mm >= aM && mm <= bM) {
      const t = (mm - aM) / (bM - aM);
      return aW + t * (bW - aW);
    }
  }
  return null;
}

/** Tabelas aproximadas (alinhadas a pontos tipificados Hadlock / LaudoUS). */
const TAB_DBP: [number, number][] = [
  [20, 12.2],
  [30, 14.8],
  [40, 18.0],
  [50, 21.0],
  [55, 22.76],
  [60, 24.2],
  [70, 28.0],
  [80, 32.0],
  [90, 36.0],
];
const TAB_CC: [number, number][] = [
  [80, 13.0],
  [120, 16.0],
  [160, 19.0],
  [200, 22.0],
  [240, 25.5],
  [280, 29.0],
  [320, 33.0],
];
const TAB_CA: [number, number][] = [
  [70, 13.0],
  [110, 16.5],
  [150, 20.0],
  [180, 22.86],
  [220, 26.5],
  [260, 30.0],
  [300, 33.5],
];
const TAB_CF: [number, number][] = [
  [10, 13.0],
  [20, 16.5],
  [30, 19.5],
  [40, 22.91],
  [50, 26.5],
  [60, 30.5],
  [70, 34.5],
];

export function igSemanasPorDbp(mm: number) {
  return interp(TAB_DBP, mm);
}
export function igSemanasPorCc(mm: number) {
  return interp(TAB_CC, mm);
}
export function igSemanasPorCa(mm: number) {
  return interp(TAB_CA, mm);
}
export function igSemanasPorCf(mm: number) {
  return interp(TAB_CF, mm);
}

export function fmtIgSemanas(w: number | null | undefined): string {
  if (w == null || !(w > 0)) return "—";
  let s = Math.floor(w);
  let d = Math.round((w - s) * 7);
  if (d >= 7) {
    s += 1;
    d = 0;
  }
  return d === 0 ? `${s}s` : `${s}s ${d}d`;
}

/** Hadlock III — peso em g (CC, CA, CF em mm). */
export function pesoHadlockIII(
  ccMm: number,
  caMm: number,
  cfMm: number,
): number | null {
  if (!(ccMm > 0 && caMm > 0 && cfMm > 0)) return null;
  const HC = ccMm / 10;
  const AC = caMm / 10;
  const FL = cfMm / 10;
  return Math.round(
    Math.pow(
      10,
      1.326 - 0.00326 * AC * FL + 0.0107 * HC + 0.0438 * AC + 0.158 * FL,
    ),
  );
}

export function idxsBiometricos(form: ObstLaudousFormState) {
  const cc = parseFloat(form.cc);
  const ca = parseFloat(form.ca);
  const cf = parseFloat(form.cf);
  const dbp = parseFloat(form.dbp);
  const dof = parseFloat(form.dof);
  return {
    ic:
      dbp > 0 && dof > 0 ? ((dbp / dof) * 100).toFixed(1) : "—",
    ccca: cc > 0 && ca > 0 ? (cc / ca).toFixed(2) : "—",
    cfca: cf > 0 && ca > 0 ? (cf / ca).toFixed(2) : "—",
    cfdbp: cf > 0 && dbp > 0 ? (cf / dbp).toFixed(2) : "—",
    cfcc: cf > 0 && cc > 0 ? ((cf / cc) * 100).toFixed(1) : "—",
  };
}

const MM_FRASES: Record<string, string> = {
  cranio: "Crânio íntegro, de conformação habitual.",
  cerebro:
    "Aspecto morfológico normal do parênquima cerebral e estruturas da linha média. Cavum do septo pelúcido visível.",
  face: "Face sem alterações aparentes. Perfil de aspecto habitual. Órbitas e nariz sem anormalidades detectáveis.",
  coluna:
    "Coluna vertebral visibilizada em toda a sua extensão, sem evidência de anormalidades.",
  torax: "Tórax de morfologia preservada. Diafragma de aspecto íntegro.",
  pulmoes:
    "Pulmões com ecogenicidade compatível com a fase da gestação. Ausência de formações císticas.",
  coracao:
    "Coração de morfologia habitual, com as quatro câmaras de aspecto habitual. Área cardíaca normal.",
  vasos: "Aspecto anatômico normal dos vasos da base caracterizados.",
  estomago: "Estômago bem caracterizado, em topografia habitual.",
  figado: "Fígado tópico, de aspecto homogêneo e dimensões normais.",
  parede: "Parede abdominal íntegra.",
  alcas: "Ecogenicidade normal das alças intestinais.",
  rins: "Rins tópicos, com morfologia preservada, sem hidronefrose.",
  bexiga: "Bexiga bem caracterizada, sem alterações detectáveis.",
  vb: "Vesícula biliar presente, de conteúdo anecogênico.",
  membros:
    "Ossos longos de aspecto normal. Mãos e pés com anatomia preservada bilateralmente.",
  falange: "Falange média do quinto dedo presente e com aspecto normal.",
  genit: "Genitália externa de aspecto anatômico preservado.",
};

function eh1t(tipo: ObstLaudousTipo) {
  return tipo === "1r" || tipo === "1m" || tipo === "1tn" || tipo === "1mg";
}

function eh23(tipo: ObstLaudousTipo) {
  return tipo === "23" || tipo === "23m" || tipo === "23dop";
}

/** Corpo estruturado a partir do formulário (formato LaudoUS). */
export function textoFormObstLaudousParaLaudo(
  form: ObstLaudousFormState,
  tipo: ObstLaudousTipo,
): string {
  const linhas: string[] = [];

  if (form.limJanela) {
    linhas.push(
      "Janela acústica inadequada pelo tecido subcutâneo.",
    );
  }
  if (form.limFeixes) {
    linhas.push(
      "Qualidade do exame prejudicada pela dificuldade de transposição dos feixes acústicos.",
    );
  }
  if (form.limEstrutura && form.limEstruturaTxt.trim()) {
    linhas.push(
      `Estrutura(s) não avaliada(s) por limitação técnica: ${form.limEstruturaTxt.trim()}.`,
    );
  }

  if (eh1t(tipo)) {
    if (form.uteroNormal) {
      linhas.push("Útero com contornos regulares e ecotextura homogênea.");
    }
    if (form.coloOk) {
      linhas.push(
        "Colo uterino e canal endocervical sem anormalidades demonstráveis.",
      );
    }
    if (form.anexosOk) {
      linhas.push("Regiões anexiais sem anormalidades detectáveis.");
    }
    if (!form.descolamento) {
      linhas.push("Não há sinais de descolamento ovular.");
    } else {
      linhas.push("Área de descolamento ovular.");
    }
    if (tipo === "1mg") {
      linhas.push("Gestação gemelar, na cavidade uterina.");
    }
    if (form.embStatus === "presente" && form.ccn.trim()) {
      linhas.push(
        `Feto único, com comprimento cabeça-nádega (CCN) de ${form.ccn.trim()} mm.`,
      );
    } else if (form.embStatus === "nao-id") {
      linhas.push("Embrião não identificado ao presente exame.");
    }
    if (form.bcfStatus === "presente" && form.bcfBpm.trim()) {
      linhas.push(
        `Batimentos cardíacos fetais presentes, ${form.bcfBpm.trim()} bpm.`,
      );
    } else if (form.bcfStatus === "ausente") {
      linhas.push("Ausência de batimentos cardíacos fetais.");
    }
    if (form.movPresentes) {
      linhas.push("Movimentos corpóreos ativos durante o exame.");
    }
    if (form.vvStatus === "normal") {
      linhas.push(
        form.vvMm.trim()
          ? `Vesícula vitelina visível, de aspecto preservado (${form.vvMm.trim()} mm).`
          : "Vesícula vitelina visível, de aspecto preservado.",
      );
    } else if (form.vvStatus === "ausente") {
      linhas.push("Vesícula vitelina ausente.");
    }
    if (form.tnIncluir && form.tnMm.trim()) {
      linhas.push("Marcadores de cromossomopatias:");
      linhas.push(`- Translucência nucal: ${form.tnMm.trim()} mm.`);
    }
    if (tipo === "1m" || tipo === "1tn") {
      linhas.push(
        "Crânio e hemisférios cerebrais com morfologia preservada.",
      );
      linhas.push("Face e perfil de morfologia preservada.");
      linhas.push(
        "Coração com quatro câmaras de aspecto habitual. Área cardíaca normal.",
      );
      linhas.push("Estômago em topografia habitual.");
      linhas.push("Parede abdominal íntegra.");
      linhas.push("Coluna vertebral de aspecto preservado.");
      linhas.push("Membros identificáveis, sem alterações detectáveis.");
      linhas.push("Bexiga fetal visualizada.");
      linhas.push("Rins identificados em topografia habitual.");
    }
  }

  if (eh23(tipo)) {
    linhas.push(
      `Feto único, vivo, em situação ${form.situacao}, apresentação ${form.apresentacao}, dorso à ${form.dorso}.`,
    );
    if (form.bcfBpm.trim()) {
      linhas.push(
        `Batimentos cardíacos fetais presentes, ${form.bcfBpm.trim()} bpm.`,
      );
    }
    if (form.movPresentes) {
      linhas.push("Movimentos corpóreos ativos durante o exame.");
    }
    if (form.cordTresVasos) {
      linhas.push(
        "Cordão umbilical com três vasos (duas artérias e uma veia).",
      );
    }

    const bioLinhas: string[] = ["BIOMETRIA FETAL"];
    const rows: { label: string; val: string; ig: string; on: boolean }[] = [
      {
        label: "Diâmetro biparietal (DBP)",
        val: form.dbp,
        ig: fmtIgSemanas(igSemanasPorDbp(parseFloat(form.dbp))),
        on: form.incDbp,
      },
      {
        label: "Circunferência cefálica (CC)",
        val: form.cc,
        ig: fmtIgSemanas(igSemanasPorCc(parseFloat(form.cc))),
        on: form.incCc,
      },
      {
        label: "Circunferência abdominal (CA)",
        val: form.ca,
        ig: fmtIgSemanas(igSemanasPorCa(parseFloat(form.ca))),
        on: form.incCa,
      },
      {
        label: "Comprimento femoral (CF)",
        val: form.cf,
        ig: fmtIgSemanas(igSemanasPorCf(parseFloat(form.cf))),
        on: form.incCf,
      },
    ];
    if (form.dof.trim() && form.incDof) {
      rows.push({
        label: "Diâmetro occiptofrontal (DOF)",
        val: form.dof,
        ig: "—",
        on: true,
      });
    }
    for (const r of rows) {
      if (!r.on || !r.val.trim()) continue;
      bioLinhas.push(
        r.ig !== "—"
          ? `${r.label}: ${r.val.trim()} mm - IG: ${r.ig.replace(" ", "")}`
          : `${r.label}: ${r.val.trim()} mm`,
      );
    }
    const peso = pesoHadlockIII(
      parseFloat(form.cc),
      parseFloat(form.ca),
      parseFloat(form.cf),
    );
    if (peso) {
      bioLinhas.push(
        `Peso fetal estimado em ${peso} g (Hadlock III, margem de erro +/- 15%).`,
      );
    }
    const idx = idxsBiometricos(form);
    bioLinhas.push("");
    bioLinhas.push("ÍNDICES BIOMÉTRICOS");
    bioLinhas.push(`Relação CC/CA: ${idx.ccca} (ref: 0,90-1,23)`);
    bioLinhas.push(`Relação CF/CA: ${idx.cfca} (normal de 0,20 a 0,24)`);
    if (bioLinhas.length > 1) linhas.push(...bioLinhas);

    if (tipo === "23m") {
      const morf: string[] = ["MORFOLOGIA FETAL"];
      for (const [k] of MM_KEYS_2T) {
        if (form.mm[k] && MM_FRASES[k]) morf.push(MM_FRASES[k]);
      }
      if (morf.length > 1) linhas.push(...morf);
    }

    linhas.push(
      `Placenta com inserção ${form.placentaInsercao}, grau ${form.placentaGrau} de Grannum, de aspecto homogêneo.`,
    );
    if (form.liquidoNormal) {
      linhas.push("Volume normal de líquido amniótico.");
    } else if (form.liquidoTxt.trim()) {
      linhas.push(form.liquidoTxt.trim());
    }

    if (form.dopplerInc || tipo === "23dop") {
      linhas.push("DOPPLER OBSTÉTRICO");
      linhas.push("- Artérias umbilicais:");
      linhas.push(
        "Traçado espectral das artérias umbilicais com morfologia normal.",
      );
      if (form.auIp.trim()) {
        linhas.push(`Índice de pulsatilidade (I.P.): ${form.auIp.trim()}`);
      }
      linhas.push("- Artéria cerebral média (ACM):");
      linhas.push("Traçado espectral com morfologia normal.");
      if (form.acmIp.trim()) {
        linhas.push(`Índice de pulsatilidade (I.P.): ${form.acmIp.trim()}`);
      }
    }
  }

  return linhas.filter(Boolean).join("\n");
}

export function impressaoFormObstLaudous(
  form: ObstLaudousFormState,
  tipo: ObstLaudousTipo,
): string {
  if (eh1t(tipo) && form.ccn.trim()) {
    const dias = igDiasPorCcn(parseFloat(form.ccn));
    const s = Math.floor(dias / 7);
    const d = dias % 7;
    const linhas = [
      `Idade gestacional estimada em ${s} semanas e ${d} dias pela biometria (+/-7 dias).`,
    ];
    if (tipo === "1m" || tipo === "1tn") {
      linhas.push(
        "Ausência de alterações morfológicas detectáveis no presente estudo e na resolução do método disponível.",
      );
    } else {
      linhas.push(
        "Gestação em evolução dentro dos parâmetros da normalidade.",
      );
    }
    return linhas.join("\n");
  }

  if (eh23(tipo)) {
    const igs: number[] = [];
    if (form.incDbp && form.dbp)
      igs.push(igSemanasPorDbp(parseFloat(form.dbp)) ?? 0);
    if (form.incCc && form.cc)
      igs.push(igSemanasPorCc(parseFloat(form.cc)) ?? 0);
    if (form.incCa && form.ca)
      igs.push(igSemanasPorCa(parseFloat(form.ca)) ?? 0);
    if (form.incCf && form.cf)
      igs.push(igSemanasPorCf(parseFloat(form.cf)) ?? 0);
    const valid = igs.filter((x) => x > 0);
    const linhas: string[] = [];
    if (valid.length) {
      const media = valid.reduce((a, b) => a + b, 0) / valid.length;
      let s = Math.floor(media);
      let d = Math.round((media - s) * 7);
      if (d >= 7) {
        s += 1;
        d = 0;
      }
      linhas.push(
        `Idade gestacional estimada em ${s} semanas e ${d} dias pela biometria (+/-14 dias).`,
      );
    }
    const peso = pesoHadlockIII(
      parseFloat(form.cc),
      parseFloat(form.ca),
      parseFloat(form.cf),
    );
    if (peso) linhas.push(`Peso fetal estimado em ${peso} g (Hadlock III).`);
    if (tipo === "23m") {
      linhas.push(
        "Ausência de alterações morfológicas detectáveis no presente estudo e na resolução do método disponível.",
      );
    } else if (!linhas.length) {
      linhas.push(
        "Gestação em evolução dentro dos parâmetros da normalidade.",
      );
    }
    if (form.dopplerInc || tipo === "23dop") {
      linhas.push(
        "Avaliação Dopplervelocimétrica sem anormalidades demonstráveis.",
      );
    }
    return linhas.join("\n");
  }

  return "Gestação em evolução dentro dos parâmetros da normalidade.";
}
