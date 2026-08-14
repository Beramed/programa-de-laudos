export type TabelaAnexo = {
  id: string;
  label: string;
  src: string;
  alt: string;
};

/** Catálogo de tabelas anexáveis após observações */
export const TABELAS = {
  lagalla: {
    id: "lagalla",
    label: "Classificação de Lagalla",
    src: "/tabelas/lagalla.png",
    alt: "Classificação de Lagalla para vascularização de nódulos tireoidianos",
  },
  chammas: {
    id: "chammas",
    label: "Classificação de Chammas",
    src: "/tabelas/chammas.png",
    alt: "Classificação de Chammas para vascularização de nódulos tireoidianos",
  },
  tirads: {
    id: "tirads",
    label: "Sistema ACR TI-RADS",
    src: "/tabelas/tirads.png",
    alt: "Sistema ACR TI-RADS para nódulos tireoidianos",
  },
  "pi-rads": {
    id: "pi-rads",
    label: "Sistema PI-RADS v2.1",
    src: "/tabelas/pi-rads.png",
    alt: "Sistema PI-RADS v2.1 para próstata",
  },
  "bi-rads": {
    id: "bi-rads",
    label: "Sistema BI-RADS",
    src: "/tabelas/bi-rads.png",
    alt: "Sistema BI-RADS para mamografia, ultrassom e ressonância",
  },
  "hidronefrose-sfu": {
    id: "hidronefrose-sfu",
    label: "Tabela hidronefrose SFU (adultos)",
    src: "/tabelas/hidronefrose-sfu.png",
    alt: "Tabela de hidronefrose SFU adaptada para adultos — foco em etiologia obstrutiva",
  },
  "parametros-hemodinamicos-carotidas": {
    id: "parametros-hemodinamicos-carotidas",
    label: "4. Parâmetros hemodinâmicos (carótidas)",
    src: "/tabelas/parametros-hemodinamicos-carotidas.png",
    alt: "4. Parâmetros hemodinâmicos (amostra representativa) — VSP e relação ACI/ACC",
  },
} as const satisfies Record<string, TabelaAnexo>;

/** @deprecated use TABELAS */
export const TABELAS_TIREOIDE = TABELAS;

export type TabelaAnexoId = keyof typeof TABELAS;

/** Tabelas anexadas automaticamente no laudo padrão do exame */
export function tabelasPadraoDoExame(exameId: string): string[] {
  if (exameId === "carotidas") {
    return ["parametros-hemodinamicos-carotidas"];
  }
  return [];
}

/** Quais tabelas podem ser anexadas em cada exame */
export function tabelasDoExame(
  exameId: string,
  opts?: { comDoppler?: boolean },
): TabelaAnexo[] {
  if (exameId === "tireoide" || exameId === "tireoide-doppler") {
    if (opts?.comDoppler) {
      return [TABELAS.lagalla, TABELAS.chammas, TABELAS.tirads];
    }
    return [TABELAS.tirads];
  }
  if (exameId === "prostata") {
    return [TABELAS["pi-rads"]];
  }
  if (
    exameId === "mamas" ||
    exameId === "mamas-doppler" ||
    exameId === "mamas-masculino" ||
    exameId === "mamografia"
  ) {
    return [TABELAS["bi-rads"]];
  }
  if (exameId === "aparelho-urinario") {
    return [TABELAS["hidronefrose-sfu"]];
  }
  if (exameId === "carotidas") {
    return [TABELAS["parametros-hemodinamicos-carotidas"]];
  }
  return [];
}

export function htmlTabelasAnexas(ids: string[], baseUrl = ""): string {
  const origin = baseUrl.replace(/\/$/, "");
  const imgs = ids
    .map((id) => TABELAS[id as TabelaAnexoId])
    .filter(Boolean)
    .map((t) => {
      const src = origin ? `${origin}${t.src}` : t.src;
      return `<figure class="laudo-tabela laudo-com-lupa"><img src="${src}" alt="${t.alt}" /><button type="button" class="laudo-lupa-btn" contenteditable="false" aria-label="Ampliar tabela"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></figure>`;
    });
  if (imgs.length === 0) return "";
  return `<div class="laudo-tabelas">${imgs.join("")}</div>`;
}
