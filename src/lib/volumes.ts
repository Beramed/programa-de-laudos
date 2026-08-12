/** Volumes manuais por id (legado / override) */
export type Volumes = Record<string, string>;

/** Três eixos (comprimento × largura × espessura) */
export type Dimensoes3 = { a: string; b: string; c: string };

export type DimensoesMap = Record<string, Dimensoes3>;

export type CampoDimensoes = {
  /** chave em DimensoesMap / Volumes */
  key: string;
  /** seção do exame onde o campo aparece na UI */
  secaoId: string;
  label: string;
  unidade: "cm" | "mm";
};

export function parseNumeroBr(valor: string): number | null {
  const t = valor.trim().replace(/\s/g, "");
  if (!t) return null;
  let n: number;
  if (t.includes(",") && t.includes(".")) {
    n = Number(t.replace(/\./g, "").replace(",", "."));
  } else if (t.includes(",")) {
    n = Number(t.replace(",", "."));
  } else {
    n = Number(t);
  }
  return Number.isFinite(n) ? n : null;
}

export function formatarNumeroBr(n: number, casas = 1): string {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: casas,
  });
}

/** Volume elipsoide: L × A × P × 0,523 (mm → cm³ divide por 1000) */
export function volumeElipsoide(
  a: number,
  b: number,
  c: number,
  unidade: "cm" | "mm",
): number {
  const bruto = a * b * c * 0.523;
  const vol = unidade === "mm" ? bruto / 1000 : bruto;
  return Math.round(vol * 100) / 100;
}

export function volumeDeDimensoes(
  d: Dimensoes3 | undefined,
  unidade: "cm" | "mm",
): number | null {
  if (!d) return null;
  const a = parseNumeroBr(d.a);
  const b = parseNumeroBr(d.b);
  const c = parseNumeroBr(d.c);
  if (a == null || b == null || c == null) return null;
  return volumeElipsoide(a, b, c, unidade);
}

export function dimensoesVazias(): Dimensoes3 {
  return { a: "", b: "", c: "" };
}

export function camposDimensoesDoExame(exameId: string): CampoDimensoes[] {
  if (exameId === "tireoide" || exameId === "tireoide-doppler") {
    return [
      { key: "lobo-d", secaoId: "lobo-d", label: "Lobo Direito", unidade: "cm" },
      { key: "lobo-e", secaoId: "lobo-e", label: "Lobo Esquerdo", unidade: "cm" },
      { key: "istmo", secaoId: "istmo", label: "Istmo", unidade: "cm" },
    ];
  }
  if (exameId === "prostata") {
    return [
      {
        key: "prostata",
        secaoId: "prostata",
        label: "Próstata",
        unidade: "cm",
      },
    ];
  }
  if (
    exameId === "bolsa-testicular" ||
    exameId === "bolsa-testicular-doppler"
  ) {
    return [
      {
        key: "testiculo-direito",
        secaoId: "testiculo-direito",
        label: "Testículo D.",
        unidade: "cm",
      },
      {
        key: "testiculo-esquerdo",
        secaoId: "testiculo-esquerdo",
        label: "Testículo E.",
        unidade: "cm",
      },
    ];
  }
  if (
    exameId === "pelvica" ||
    exameId === "pelvica-tv" ||
    exameId === "pelvica-tv-doppler"
  ) {
    return [
      { key: "utero", secaoId: "utero", label: "Útero", unidade: "mm" },
      {
        key: "ovario-d",
        secaoId: "ovarios",
        label: "Ovário D.",
        unidade: "mm",
      },
      {
        key: "ovario-e",
        secaoId: "ovarios",
        label: "Ovário E.",
        unidade: "mm",
      },
    ];
  }
  return [];
}

export function camposDimensoesNaSecao(
  exameId: string,
  secaoId: string,
): CampoDimensoes[] {
  return camposDimensoesDoExame(exameId).filter((c) => c.secaoId === secaoId);
}

/** Resolve volume: dimensões → elipsoide; senão volume manual */
export function volumeResolvido(
  key: string,
  unidade: "cm" | "mm",
  dimensoes: DimensoesMap,
  volumes: Volumes,
): number | null {
  const deDim = volumeDeDimensoes(dimensoes[key], unidade);
  if (deDim != null) return deDim;
  return parseNumeroBr(volumes[key] ?? "");
}

export function exameTemVolumeTotalTireoide(exameId: string): boolean {
  return exameId === "tireoide" || exameId === "tireoide-doppler";
}

export function volumeTotalTireoide(
  dimensoes: DimensoesMap,
  volumes: Volumes,
): number | null {
  let sum = 0;
  let any = false;
  for (const key of ["lobo-d", "lobo-e", "istmo"] as const) {
    const n = volumeResolvido(key, "cm", dimensoes, volumes);
    if (n != null) {
      sum += n;
      any = true;
    }
  }
  return any ? Math.round(sum * 100) / 100 : null;
}

/** Peso aproximado da próstata = volume (cm³) × 1,05 */
export function pesoProstataDeVolume(volumeCm3: number): number {
  return Math.round(volumeCm3 * 1.05 * 10) / 10;
}

function fmtTrio(d: Dimensoes3, unidade: "cm" | "mm"): string | null {
  const a = parseNumeroBr(d.a);
  const b = parseNumeroBr(d.b);
  const c = parseNumeroBr(d.c);
  if (a == null || b == null || c == null) return null;
  return `${formatarNumeroBr(a, 2)} x ${formatarNumeroBr(b, 2)} x ${formatarNumeroBr(c, 2)} ${unidade}`;
}

function substituirPrimeiroTrio(
  texto: string,
  unidade: "cm" | "mm",
  trio: string,
): string {
  const re =
    unidade === "cm"
      ? /_{2,} x _{2,} x _{2,} cm/
      : /_{2,} x _{2,} x _{2,} mm/;
  return texto.replace(re, trio);
}

/** Injeta medidas 3 eixos + volumes no texto do achado */
export function aplicarVolumesNoTexto(
  exameId: string,
  secaoId: string,
  texto: string,
  volumes: Volumes,
  dimensoes: DimensoesMap = {},
): string {
  let out = texto;

  if (exameId === "tireoide" || exameId === "tireoide-doppler") {
    if (secaoId === "lobo-d" || secaoId === "lobo-e" || secaoId === "istmo") {
      const d = dimensoes[secaoId];
      const trio = d ? fmtTrio(d, "cm") : null;
      const vol = volumeResolvido(secaoId, "cm", dimensoes, volumes);
      const temMedidaIstmo =
        secaoId === "istmo" &&
        (Boolean(trio) || vol != null) &&
        /desprez[ií]vel/i.test(out);

      if (temMedidaIstmo) {
        // Com medida preenchida, remove "Desprezível" e usa só as dimensões/volume
        if (trio && vol != null) {
          out = `${trio} (volume de ${formatarNumeroBr(vol, 2)} cm³).`;
        } else if (trio) {
          out = `${trio}.`;
        } else if (vol != null) {
          out = `${formatarNumeroBr(vol, 2)} cm³.`;
        }
      } else {
        if (trio) {
          out = substituirPrimeiroTrio(out, "cm", trio);
        }
        if (vol != null) {
          const f = formatarNumeroBr(vol, 2);
          if (/\(volume de _{2,} cm³\)/i.test(out)) {
            out = out.replace(
              /\(volume de _{2,} cm³\)/i,
              `(volume de ${f} cm³)`,
            );
          } else if (/volume de _{2,} cm³/i.test(out)) {
            out = out.replace(/volume de _{2,} cm³/i, `volume de ${f} cm³`);
          }
        }
      }
    }

    if (secaoId === "volume") {
      const total = volumeTotalTireoide(dimensoes, volumes);
      if (total != null) {
        const f = formatarNumeroBr(total, 2);
        out = out.replace(/^_{2,} cm³/i, `${f} cm³`);
        if (out.includes("____ cm³")) {
          out = out.replace("____ cm³", `${f} cm³`);
        }
      }
    }
  }

  if (
    (exameId === "bolsa-testicular" ||
      exameId === "bolsa-testicular-doppler") &&
    (secaoId === "testiculo-direito" || secaoId === "testiculo-esquerdo")
  ) {
    const d = dimensoes[secaoId];
    const trio = d ? fmtTrio(d, "cm") : null;
    const vol = volumeResolvido(secaoId, "cm", dimensoes, volumes);
    if (trio) {
      out = substituirPrimeiroTrio(out, "cm", trio);
    }
    if (vol != null) {
      const f = formatarNumeroBr(vol, 2);
      if (/\(volume de _{2,} cm³\)/i.test(out)) {
        out = out.replace(/\(volume de _{2,} cm³\)/i, `(volume de ${f} cm³)`);
      } else if (/volume de _{2,} cm³/i.test(out)) {
        out = out.replace(/volume de _{2,} cm³/i, `volume de ${f} cm³`);
      }
    }
  }

  if (exameId === "prostata" && secaoId === "prostata") {
    const d = dimensoes.prostata;
    const trio = d ? fmtTrio(d, "cm") : null;
    if (trio) {
      out = substituirPrimeiroTrio(out, "cm", trio);
    }
    const vol = volumeResolvido("prostata", "cm", dimensoes, volumes);
    if (vol != null) {
      const fVol = formatarNumeroBr(vol, 2);
      const fPeso = formatarNumeroBr(pesoProstataDeVolume(vol), 1);
      out = out.replace(
        /Volume da pr[oó]stata:[^\n]*/i,
        `Volume da próstata: ${fVol} cm³.`,
      );
      out = out.replace(
        /Peso aproximado:[^\n]*/i,
        `Peso aproximado: ${fPeso} gramas.`,
      );
    }
  }

  if (exameId === "prostata" && secaoId === "bexiga") {
    // Vazia: só a palavra — não acrescenta volumes
    if (/^vazia\.?$/i.test(out.trim())) {
      return "Vazia.";
    }
    const pre = parseNumeroBr(volumes["bexiga-pre"] ?? "");
    const incluirPos = volumes["bexiga-pos-on"] === "1";
    const pos = parseNumeroBr(volumes["bexiga-pos"] ?? "");
    const linhasExtra: string[] = [];
    if (pre != null) {
      linhasExtra.push(
        `Volume vesical pré-miccional de ${formatarNumeroBr(pre, 2)} cm³.`,
      );
    }
    if (incluirPos) {
      if (pos != null) {
        linhasExtra.push(
          `Volume residual pós-miccional de ${formatarNumeroBr(pos, 2)} cm³.`,
        );
      } else {
        linhasExtra.push("Volume residual pós-miccional de ____ cm³.");
      }
    }
    if (linhasExtra.length > 0) {
      out = `${out.replace(/\s+$/, "")}\n${linhasExtra.join("\n")}`;
    }
  }

  if (
    (exameId === "pelvica" ||
      exameId === "pelvica-tv" ||
      exameId === "pelvica-tv-doppler") &&
    secaoId === "utero"
  ) {
    const d = dimensoes.utero;
    const trio = d ? fmtTrio(d, "mm") : null;
    if (trio) out = substituirPrimeiroTrio(out, "mm", trio);
    const vol = volumeResolvido("utero", "mm", dimensoes, volumes);
    if (vol != null) {
      const f = formatarNumeroBr(vol, 2);
      out = out.replace(/\(volume de _{2,} cm³\)/i, `(volume de ${f} cm³)`);
    }
  }

  if (
    (exameId === "pelvica" ||
      exameId === "pelvica-tv" ||
      exameId === "pelvica-tv-doppler") &&
    secaoId === "ovarios"
  ) {
    for (const lado of ["ovario-d", "ovario-e"] as const) {
      const d = dimensoes[lado];
      const trio = d ? fmtTrio(d, "mm") : null;
      const vol = volumeResolvido(lado, "mm", dimensoes, volumes);
      const fVol = vol != null ? formatarNumeroBr(vol, 2) : null;

      // Padrões: "OVÁRIO D.: ____ x ____ x ____ mm (volume de ____ cm³)."
      // ou "OVÁRIO D.: ____ mm (volume de ____ cm³)."
      const rotulo = lado === "ovario-d" ? "OVÁRIO D\\." : "OVÁRIO E\\.";
      const reTrio = new RegExp(
        `(${rotulo}:\\s*)_{2,} x _{2,} x _{2,} mm(\\s*\\(volume de _{2,} cm³\\))?`,
        "i",
      );
      const reUm = new RegExp(
        `(${rotulo}:\\s*)_{2,} mm(\\s*\\(volume de _{2,} cm³\\))?`,
        "i",
      );

      if (trio && reTrio.test(out)) {
        out = out.replace(
          reTrio,
          fVol != null
            ? `$1${trio} (volume de ${fVol} cm³)`
            : `$1${trio}`,
        );
      } else if (trio && reUm.test(out)) {
        out = out.replace(
          reUm,
          fVol != null
            ? `$1${trio} (volume de ${fVol} cm³)`
            : `$1${trio}`,
        );
      } else if (fVol != null) {
        const reVol = new RegExp(
          `(${rotulo}:[^\\n]*volume de )_{2,}( cm³)`,
          "i",
        );
        out = out.replace(reVol, `$1${fVol}$2`);
      }
    }
  }

  return out;
}

/** @deprecated use camposDimensoesDoExame */
export function secoesComVolume(exameId: string): string[] {
  return [...new Set(camposDimensoesDoExame(exameId).map((c) => c.secaoId))];
}
