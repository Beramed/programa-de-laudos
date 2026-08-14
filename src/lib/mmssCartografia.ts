export type MmssCartografiaCampos = {
  /** 7 medidas ao longo da V. Cefálica (proximal → distal) */
  cefalica: [string, string, string, string, string, string, string];
  /** 5 medidas ao longo da V. Basílica (coluna) */
  basilica: [string, string, string, string, string];
  axilar: string;
  basilicaBraco: string;
};

/** Traço colorido (Doppler) sobre o mapa — coords no espaço MSD. */
export type MmssLinhaStroke = {
  color: string;
  width: number;
  pts: { x: number; y: number }[];
};

export type MmssCartografiaState = {
  campos: MmssCartografiaCampos;
  anexarCartografia: boolean;
  /** Data URL da cartografia preenchida para o laudo */
  mapaPng: string;
  linhas: MmssLinhaStroke[];
};

export const CHAVE_CARTOGRAFIA_MMSS = "mmss-venoso-cartografia";

export const CORES_LINHA_MMSS = [
  { id: "vermelho", hex: "#e53935", label: "Vermelho" },
  { id: "azul", hex: "#1e88e5", label: "Azul" },
  { id: "ciano", hex: "#00acc1", label: "Ciano" },
  { id: "amarelo", hex: "#fdd835", label: "Amarelo" },
  { id: "verde", hex: "#43a047", label: "Verde" },
  { id: "preto", hex: "#212121", label: "Preto" },
] as const;

export function camposCartografiaVazios(): MmssCartografiaCampos {
  return {
    cefalica: ["", "", "", "", "", "", ""],
    basilica: ["", "", "", "", ""],
    axilar: "",
    basilicaBraco: "",
  };
}

export function cartografiaMmssVazia(): MmssCartografiaState {
  return {
    campos: camposCartografiaVazios(),
    anexarCartografia: true,
    mapaPng: "",
    linhas: [],
  };
}

function lerLinhas(raw: unknown): MmssLinhaStroke[] {
  if (!Array.isArray(raw)) return [];
  const out: MmssLinhaStroke[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Partial<MmssLinhaStroke>;
    if (typeof o.color !== "string" || !Array.isArray(o.pts)) continue;
    const pts = o.pts
      .filter(
        (p): p is { x: number; y: number } =>
          !!p &&
          typeof p === "object" &&
          typeof (p as { x: unknown }).x === "number" &&
          typeof (p as { y: unknown }).y === "number",
      )
      .map((p) => ({ x: p.x, y: p.y }));
    if (pts.length < 1) continue;
    out.push({
      color: o.color,
      width: typeof o.width === "number" && o.width > 0 ? o.width : 4,
      pts,
    });
  }
  return out;
}

export function lerCartografiaMmss(
  volumes: Record<string, string> | undefined,
): MmssCartografiaState {
  const raw = volumes?.[CHAVE_CARTOGRAFIA_MMSS];
  if (!raw) return cartografiaMmssVazia();
  try {
    const parsed = JSON.parse(raw) as Partial<MmssCartografiaState>;
    const base = cartografiaMmssVazia();
    const c = parsed.campos ?? base.campos;
    return {
      anexarCartografia:
        parsed.anexarCartografia !== undefined
          ? Boolean(parsed.anexarCartografia)
          : true,
      mapaPng: typeof parsed.mapaPng === "string" ? parsed.mapaPng : "",
      linhas: lerLinhas(parsed.linhas),
      campos: {
        cefalica: [
          c.cefalica?.[0] ?? "",
          c.cefalica?.[1] ?? "",
          c.cefalica?.[2] ?? "",
          c.cefalica?.[3] ?? "",
          c.cefalica?.[4] ?? "",
          c.cefalica?.[5] ?? "",
          c.cefalica?.[6] ?? "",
        ],
        basilica: [
          c.basilica?.[0] ?? "",
          c.basilica?.[1] ?? "",
          c.basilica?.[2] ?? "",
          c.basilica?.[3] ?? "",
          c.basilica?.[4] ?? "",
        ],
        axilar: c.axilar ?? "",
        basilicaBraco: c.basilicaBraco ?? "",
      },
    };
  } catch {
    return cartografiaMmssVazia();
  }
}

export function gravarCartografiaMmss(state: MmssCartografiaState): string {
  return JSON.stringify(state);
}

/** Posições % dos campos sobre o mapa MSD 800×777 (interiores brancos detectados) */
export type CampoPos = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

export const MAPA_MMSS_W = 800;
export const MAPA_MMSS_H = 777;
export const MAPA_MSE_W = 1024;
export const MAPA_MSE_H = 994;

export const MAPA_SRC_MSD = "/mmss-mapa/mapa-msd-venoso.png";
export const MAPA_SRC_MSE = "/mmss-mapa/mapa-mse-venoso.png";

/** Posições % sobre mapa MSD 800×777 (interiores brancos detectados) */
export const CAMPOS_POS_MSD: CampoPos[] = [
  // V. Cefálica — coluna esquerda (7), proximal → distal
  { id: "cefalica-0", left: 16.5, top: 23.29, width: 10, height: 6.82 },
  { id: "cefalica-1", left: 16.5, top: 32.69, width: 10, height: 6.69 },
  { id: "cefalica-2", left: 16.5, top: 42.08, width: 10, height: 6.69 },
  { id: "cefalica-3", left: 16.5, top: 51.74, width: 10, height: 6.69 },
  { id: "cefalica-4", left: 16.5, top: 61.78, width: 10, height: 6.69 },
  { id: "cefalica-5", left: 16.5, top: 71.43, width: 10, height: 6.82 },
  { id: "cefalica-6", left: 16.5, top: 81.85, width: 10, height: 6.69 },
  // V. Basílica — coluna direita (5)
  { id: "basilica-0", left: 73.88, top: 32.95, width: 10, height: 6.69 },
  { id: "basilica-1", left: 73.88, top: 42.6, width: 10, height: 6.82 },
  { id: "basilica-2", left: 73.88, top: 52.64, width: 10, height: 6.69 },
  { id: "basilica-3", left: 73.88, top: 62.29, width: 10, height: 6.82 },
  { id: "basilica-4", left: 73.88, top: 72.72, width: 10, height: 6.69 },
  // Caixas no esquema (axilar / basílica do braço)
  { id: "axilar", left: 57.13, top: 37.45, width: 10.13, height: 6.69 },
  { id: "basilicaBraco", left: 56.88, top: 52.51, width: 10, height: 6.69 },
];

/** Posições % sobre mapa MSE 1024×994 (imagem própria, sem espelho) */
export const CAMPOS_POS_MSE: CampoPos[] = [
  // V. Basílica — coluna esquerda (5)
  { id: "basilica-0", left: 16.11, top: 33.0, width: 9.96, height: 6.64 },
  { id: "basilica-1", left: 16.11, top: 42.66, width: 9.96, height: 6.64 },
  { id: "basilica-2", left: 16.11, top: 52.72, width: 9.96, height: 6.64 },
  { id: "basilica-3", left: 16.11, top: 62.37, width: 9.96, height: 6.64 },
  { id: "basilica-4", left: 16.11, top: 72.74, width: 9.96, height: 6.64 },
  // Caixas no esquema
  { id: "axilar", left: 32.81, top: 37.42, width: 9.96, height: 6.74 },
  { id: "basilicaBraco", left: 33.2, top: 52.62, width: 9.86, height: 6.54 },
  // V. Cefálica — coluna direita (7), proximal → distal
  { id: "cefalica-0", left: 73.54, top: 23.34, width: 10.06, height: 6.64 },
  { id: "cefalica-1", left: 73.54, top: 32.7, width: 9.96, height: 6.64 },
  { id: "cefalica-2", left: 73.54, top: 42.15, width: 9.96, height: 6.54 },
  { id: "cefalica-3", left: 73.54, top: 51.81, width: 9.96, height: 6.64 },
  { id: "cefalica-4", left: 73.54, top: 61.87, width: 9.96, height: 6.64 },
  { id: "cefalica-5", left: 73.54, top: 71.53, width: 9.96, height: 6.64 },
  { id: "cefalica-6", left: 73.54, top: 81.89, width: 9.96, height: 6.64 },
];

export function mapaMmssSrc(lado: "direito" | "esquerdo"): string {
  return lado === "esquerdo" ? MAPA_SRC_MSE : MAPA_SRC_MSD;
}

export function mapaMmssDims(lado: "direito" | "esquerdo"): {
  w: number;
  h: number;
} {
  return lado === "esquerdo"
    ? { w: MAPA_MSE_W, h: MAPA_MSE_H }
    : { w: MAPA_MMSS_W, h: MAPA_MMSS_H };
}

export function camposPosMmss(lado: "direito" | "esquerdo"): CampoPos[] {
  return lado === "esquerdo" ? CAMPOS_POS_MSE : CAMPOS_POS_MSD;
}

/** Frase padrão ao anexar a cartografia de mapeamento pré-FAV. */
export function fraseMapeamentoFistulaMmss(
  exameId: string,
  lado: "direito" | "esquerdo",
): string {
  const m =
    lado === "esquerdo" ? "membro superior esquerdo" : "membro superior direito";
  if (exameId === "mmss-arterial") {
    return `Realizado mapeamento arterial do ${m} para planejamento de fístula arteriovenosa (FAV) para hemodiálise.`;
  }
  return `Realizado mapeamento venoso do ${m} para planejamento de fístula arteriovenosa (FAV) para hemodiálise.`;
}

export function valorCampo(
  campos: MmssCartografiaCampos,
  id: string,
): string {
  if (id.startsWith("cefalica-")) {
    const i = Number(id.slice("cefalica-".length));
    return campos.cefalica[i] ?? "";
  }
  if (id.startsWith("basilica-")) {
    const i = Number(id.slice("basilica-".length));
    return campos.basilica[i] ?? "";
  }
  if (id === "axilar") return campos.axilar;
  if (id === "basilicaBraco") return campos.basilicaBraco;
  return "";
}

export function setValorCampo(
  campos: MmssCartografiaCampos,
  id: string,
  valor: string,
): MmssCartografiaCampos {
  const v = valor.slice(0, 6);
  if (id.startsWith("cefalica-")) {
    const i = Number(id.slice("cefalica-".length));
    const cefalica = [...campos.cefalica] as MmssCartografiaCampos["cefalica"];
    cefalica[i] = v;
    return { ...campos, cefalica };
  }
  if (id.startsWith("basilica-")) {
    const i = Number(id.slice("basilica-".length));
    const basilica = [...campos.basilica] as MmssCartografiaCampos["basilica"];
    basilica[i] = v;
    return { ...campos, basilica };
  }
  if (id === "axilar") return { ...campos, axilar: v };
  if (id === "basilicaBraco") return { ...campos, basilicaBraco: v };
  return campos;
}

export function desenharLinhasMmss(
  ctx: CanvasRenderingContext2D,
  linhas: MmssLinhaStroke[],
) {
  for (const stroke of linhas) {
    if (stroke.pts.length < 1) continue;
    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(stroke.pts[0].x, stroke.pts[0].y);
    for (let i = 1; i < stroke.pts.length; i++) {
      ctx.lineTo(stroke.pts[i].x, stroke.pts[i].y);
    }
    if (stroke.pts.length === 1) {
      ctx.lineTo(stroke.pts[0].x + 0.01, stroke.pts[0].y);
    }
    ctx.stroke();
    ctx.restore();
  }
}
