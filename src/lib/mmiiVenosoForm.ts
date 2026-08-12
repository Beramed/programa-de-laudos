import type { LadoArticulacao } from "@/lib/ladoMsk";

export type PerfuranteItem = {
  id: string;
  medida: string;
  face: string;
  local: string;
};

export type TributariaItem = {
  id: string;
  local1: string;
  local2: string;
  tromboflebite: boolean;
};

export type ReticularItem = {
  id: string;
  face: string;
  segmento: string;
};

export type MmiiVenosoFormState = {
  medidas: {
    jsf: string;
    coxa: string;
    perna: string;
    parva: string;
  };
  insufVsm: "" | "todo" | "parcial";
  insufVsmDe: string;
  insufVsmAte: string;
  insufVsp: "" | "todo" | "parcial";
  insufVspOnde: string;
  perfurantes: PerfuranteItem[];
  tributarias: TributariaItem[];
  tributariasDifusas: boolean;
  cirurgiaVsm: "" | "total" | "parcial";
  cirurgiaVsmOnde: string;
  cirurgiaVsp: "" | "total" | "parcial";
  cirurgiaVspOnde: string;
  refluxoProfundo: string[];
  tromboseProfunda: string[];
  tromboflebiteVsm: boolean;
  tromboflebiteVsmOnde: string;
  tromboflebiteVsp: boolean;
  tromboflebiteVspOnde: string;
  reticularesDifusas: boolean;
  reticulares: ReticularItem[];
  teleangiectasiasDifusas: boolean;
  teleangiectasiasLocalizada: boolean;
  teleangiectasiasFace: string;
  teleangiectasiasSegmento: string;
  obsBaker: boolean;
  obsEdema: boolean;
  obsEdemaGrau: string;
  obsEdemaLocal: string;
  obsLinfedema: boolean;
  obsLinfedemaGrau: string;
  obsLinfedemaLocal: string;
  obsDecubito: boolean;
  obsCurativo: boolean;
  obsCurativoOnde: string;
  obsOutras: string;
  /** Data URL do mapa marcado */
  mapaPng: string;
};

export const VEIAS_PROFUNDAS = [
  "Femoral Comum",
  "Femoral Superficial",
  "Femoral Profunda",
  "Poplítea",
  "Tibial Anterior",
  "Tibial Posterior",
  "Fibular",
] as const;

export const LOCAIS_SEGMENTO = [
  "a junção",
  "o terço superior da coxa",
  "o terço médio da coxa",
  "o terço inferior da coxa",
  "o terço superior da perna",
  "o terço médio da perna",
  "o terço inferior da perna",
] as const;

export const FACES = [
  "face medial",
  "face lateral",
  "face anterior",
  "face posterior",
  "face plantar",
] as const;

export const SEGMENTOS_MEMBRO = ["da coxa", "da perna", "do pé"] as const;

export function formVenosoVazio(): MmiiVenosoFormState {
  return {
    medidas: { jsf: "", coxa: "", perna: "", parva: "" },
    insufVsm: "",
    insufVsmDe: "a junção",
    insufVsmAte: "o terço médio da perna",
    insufVsp: "",
    insufVspOnde: "no terço superior da perna",
    perfurantes: [],
    tributarias: [],
    tributariasDifusas: false,
    cirurgiaVsm: "",
    cirurgiaVsmOnde: "da coxa",
    cirurgiaVsp: "",
    cirurgiaVspOnde: "da perna",
    refluxoProfundo: [],
    tromboseProfunda: [],
    tromboflebiteVsm: false,
    tromboflebiteVsmOnde: "em todo o trajeto",
    tromboflebiteVsp: false,
    tromboflebiteVspOnde: "em todo o trajeto",
    reticularesDifusas: false,
    reticulares: [],
    teleangiectasiasDifusas: false,
    teleangiectasiasLocalizada: false,
    teleangiectasiasFace: "face medial",
    teleangiectasiasSegmento: "da perna",
    obsBaker: false,
    obsEdema: false,
    obsEdemaGrau: "leve",
    obsEdemaLocal: "perna",
    obsLinfedema: false,
    obsLinfedemaGrau: "leve",
    obsLinfedemaLocal: "perna",
    obsDecubito: false,
    obsCurativo: false,
    obsCurativoOnde: "Terço inferior da perna",
    obsOutras: "",
    mapaPng: "",
  };
}

export const CHAVE_FORM_VENOSO = "mmii-venoso-form";
export const CHAVE_MAPA_LAUDO = "laudo-mapa-png";

export function lerFormVenoso(
  volumes: Record<string, string> | undefined,
): MmiiVenosoFormState {
  const raw = volumes?.[CHAVE_FORM_VENOSO];
  if (!raw) return formVenosoVazio();
  try {
    return { ...formVenosoVazio(), ...JSON.parse(raw) };
  } catch {
    return formVenosoVazio();
  }
}

export function gravarFormVenoso(form: MmiiVenosoFormState): string {
  return JSON.stringify(form);
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function novaPerfurante(): PerfuranteItem {
  return {
    id: uid(),
    medida: "",
    face: "face plantar",
    local: "na face medial da perna",
  };
}

export function novaTributaria(): TributariaItem {
  return {
    id: uid(),
    local1: "na face medial",
    local2: "da perna",
    tromboflebite: false,
  };
}

export function novaReticular(): ReticularItem {
  return {
    id: uid(),
    face: "na face medial",
    segmento: "da perna",
  };
}

/** Monta frases adicionais do formulário estruturado para o laudo */
export function textoFormVenosoParaLaudo(
  form: MmiiVenosoFormState,
  lado: LadoArticulacao,
): string {
  const linhas: string[] = [];
  const m = `membro inferior ${lado === "esquerdo" ? "esquerdo" : "direito"}`;
  const { jsf, coxa, perna, parva } = form.medidas;
  if (jsf || coxa || perna || parva) {
    linhas.push(`**Medidas da safena (${m}):**`);
    if (jsf) linhas.push(`JSF: ${jsf} mm.`);
    if (coxa) linhas.push(`Coxa: ${coxa} mm.`);
    if (perna) linhas.push(`Perna: ${perna} mm.`);
    if (parva) linhas.push(`Parva: ${parva} mm.`);
    linhas.push("");
  }

  if (form.insufVsm === "todo") {
    linhas.push(
      `Insuficiência da veia safena magna em todo o trajeto (${m}).`,
    );
  } else if (form.insufVsm === "parcial") {
    linhas.push(
      `Insuficiência da veia safena magna desde ${form.insufVsmDe} até ${form.insufVsmAte} (${m}).`,
    );
  }

  if (form.insufVsp === "todo") {
    linhas.push(
      `Insuficiência da veia safena parva em todo o trajeto (${m}).`,
    );
  } else if (form.insufVsp === "parcial") {
    linhas.push(
      `Insuficiência parcial da veia safena parva ${form.insufVspOnde} (${m}).`,
    );
  }

  if (form.perfurantes.length > 0) {
    linhas.push("");
    linhas.push(`**Veias perfurantes (${m}):**`);
    form.perfurantes.forEach((p, i) => {
      linhas.push(
        `Perfurante ${i + 1}: ${p.medida ? `${p.medida} cm` : "____ cm"}, ${p.face}, ${p.local}.`,
      );
    });
  }

  if (form.tributariasDifusas || form.tributarias.length > 0) {
    linhas.push("");
    linhas.push(`**Veias tributárias (${m}):**`);
    if (form.tributariasDifusas) linhas.push("Varicosidades/tributárias difusas.");
    form.tributarias.forEach((t, i) => {
      linhas.push(
        `Tributária ${i + 1}: ${t.local1} ${t.local2}${t.tromboflebite ? ", com sinais de tromboflebite" : ""}.`,
      );
    });
  }

  if (form.cirurgiaVsm) {
    linhas.push(
      `Safena magna: ausência ${form.cirurgiaVsm === "total" ? "total" : `parcial ${form.cirurgiaVsmOnde}`} (status cirúrgico).`,
    );
  }
  if (form.cirurgiaVsp) {
    linhas.push(
      `Safena parva: ausência ${form.cirurgiaVsp === "total" ? "total" : `parcial ${form.cirurgiaVspOnde}`} (status cirúrgico).`,
    );
  }

  if (form.refluxoProfundo.length > 0) {
    linhas.push(
      `Refluxo de veias profundas: ${form.refluxoProfundo.join(", ")}.`,
    );
  }
  if (form.tromboseProfunda.length > 0) {
    linhas.push(
      `Trombose de veias profundas: ${form.tromboseProfunda.join(", ")}.`,
    );
  }

  if (form.tromboflebiteVsm) {
    linhas.push(
      `Tromboflebite na veia safena magna ${form.tromboflebiteVsmOnde}.`,
    );
  }
  if (form.tromboflebiteVsp) {
    linhas.push(
      `Tromboflebite na veia safena parva ${form.tromboflebiteVspOnde}.`,
    );
  }

  if (form.reticularesDifusas || form.reticulares.length > 0) {
    linhas.push("");
    linhas.push(`**Veias reticulares (${m}):**`);
    if (form.reticularesDifusas) linhas.push("Reticulares difusas.");
    form.reticulares.forEach((r, i) => {
      linhas.push(`Reticular ${i + 1}: ${r.face} ${r.segmento}.`);
    });
  }

  if (form.teleangiectasiasDifusas) {
    linhas.push("Teleangiectasias difusas.");
  } else if (form.teleangiectasiasLocalizada) {
    linhas.push(
      `Teleangiectasias na ${form.teleangiectasiasFace} ${form.teleangiectasiasSegmento}.`,
    );
  }

  const obs: string[] = [];
  if (form.obsBaker) obs.push("Cisto de Baker.");
  if (form.obsEdema)
    obs.push(`Edema ${form.obsEdemaGrau} em ${form.obsEdemaLocal}.`);
  if (form.obsLinfedema)
    obs.push(`Linfedema ${form.obsLinfedemaGrau} em ${form.obsLinfedemaLocal}.`);
  if (form.obsDecubito)
    obs.push("Exame realizado em decúbito dorsal horizontal.");
  if (form.obsCurativo)
    obs.push(
      `Segmento não avaliado devido à presença de curativo oclusivo (${form.obsCurativoOnde}).`,
    );
  if (form.obsOutras.trim()) obs.push(form.obsOutras.trim());
  if (obs.length > 0) {
    linhas.push("");
    linhas.push("**Observações adicionais:**");
    obs.forEach((o) => linhas.push(o));
  }

  return linhas.join("\n").trim();
}
