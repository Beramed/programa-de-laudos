import type { Exame, Opcao, Secao } from "@/data/exames";
import {
  impressaoAchadoQuirodactilo,
  chaveMaoDedoAchado,
  opcaoEhQuirodactilo,
  QUIRODACTILOS,
  type MaoDedoAchado,
} from "@/data/mskExames";
import type { Selecoes } from "@/lib/montarLaudo";

const IDS_NORMAIS = new Set([
  "normal",
  "normais",
  "cheia",
  "vazia",
  "baixa-replecao",
  "media-replecao",
  "nao-repleta",
  "1",
  "gorduroso",
  "fibroglandular",
  "desprezivel",
  "homogeneo",
  "endometrio-normal",
  "sem-achados",
]);

const SECOES_SEM_IMPRESSAO = new Set([
  "volume",
  "birads",
  "doppler",
  "tecnica",
  "istmo",
]);

function normaliza(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function opcaoEhNormal(opcao: Opcao, secao: Secao): boolean {
  if (
    opcao.impressao?.trim() &&
    /dentro dos (parâmetros|padrões) da normalidade/i.test(opcao.impressao)
  ) {
    return true;
  }
  const id = normaliza(opcao.id);
  if (IDS_NORMAIS.has(id)) return true;
  if (id.startsWith("normal")) return true;
  const label = normaliza(opcao.label);
  if (
    label === "normal" ||
    label === "normais" ||
    label.startsWith("normal ") ||
    label.includes("aspecto habitual") ||
    label.includes("lobos e istmo") ||
    label.includes("nota de volume") ||
    label.includes("3c") ||
    label.includes("bi-rads 1")
  ) {
    return true;
  }
  if (secao.padrao === opcao.id || (Array.isArray(secao.padrao) && secao.padrao.includes(opcao.id))) {
    if (
      label.includes("normal") ||
      label.includes("habitual") ||
      label.includes("topicos") ||
      label.includes("cheia") ||
      label.includes("vazia")
    ) {
      return true;
    }
  }
  return false;
}

/** Usa "Sinais sugestivos" para alterações difusas; "Imagem sugestiva" para lesões focais */
function prefixoImpressao(opcao: Opcao): "Sinais sugestivos de" | "Imagem sugestiva de" {
  const id = normaliza(`${opcao.id} ${opcao.label}`);
  if (
    /(esteatose|hepatopatia|heterogene|tireoidopat|hidronefrose|varicocele|hidrocele|ginecomastia|congestao|polimicro|adenopatia|suspeitos|calcific|textur)/.test(
      id,
    )
  ) {
    return "Sinais sugestivos de";
  }
  return "Imagem sugestiva de";
}

function nomePatologia(opcao: Opcao, secao: Secao): string {
  if (opcao.impressao?.trim()) {
    // Se já veio completa com prefixo, extrai o miolo; senão usa como nome
    const t = opcao.impressao.trim();
    const m = t.match(
      /^(?:imagem sugestiva de|sinais sugestivos de|imagens sugestivas de)\s+(.+)$/i,
    );
    if (m) return m[1].replace(/\.$/, "");
    // Frases longas custom: encurta para o label
  }

  const label = opcao.label.trim();
  const id = normaliza(opcao.id);
  const org = secao.titulo.trim().toLowerCase();

  if (id.includes("esteatose")) {
    return `esteatose hepática (${label.toLowerCase()})`;
  }
  if (id.includes("colelit") || id === "calculo") {
    return "colelitíase";
  }
  if (id.includes("lama") || id.includes("barro")) {
    return "lama / barro biliar";
  }
  if (id.includes("polipo")) {
    return `pólipo em ${org}`;
  }
  if (id.includes("colecistite")) {
    return "colecistite";
  }
  if (id.includes("cisto")) {
    return `cisto(s) em ${org}`;
  }
  if (id.includes("nodulo") || id.includes("chammas") || id.includes("espongiforme")) {
    if (secao.id === "figado") {
      return "nódulo hepático";
    }
    return `nódulo(s) em ${org}`;
  }
  if (id.includes("mioma")) {
    return "nódulo uterino (mioma)";
  }
  if (id.includes("litiase") || id.includes("litíase")) {
    return `litíase em ${org}`;
  }
  if (id.includes("hernia")) {
    return "hérnia";
  }
  if (id.includes("aneurisma")) {
    return "dilatação aneurismática da aorta abdominal";
  }
  if (id.includes("ateroma")) {
    return "placas de ateroma na aorta abdominal";
  }
  if (id.includes("ascite")) {
    return "ascite";
  }
  if (id.includes("hidronefrose")) {
    return "hidronefrose";
  }
  if (id.includes("varicocele")) {
    return "varicocele";
  }
  if (id.includes("hidrocele")) {
    return "hidrocele";
  }
  if (id.includes("ginecomastia")) {
    return "ginecomastia";
  }
  if (id.includes("bocelada") || id.includes("aumentada")) {
    return "aumento do volume e peso da próstata";
  }
  if (id.includes("calcific")) {
    return "calcificações parenquimatosas prostáticas";
  }
  if (id.includes("polimicro")) {
    return "ovários polimicrocísticos";
  }
  if (id.includes("congestao")) {
    return "congestão vascular pélvica difusa";
  }
  if (id.includes("suspeitos") || id.includes("adenopatia")) {
    return `adenopatia / linfonodos suspeitos em ${org}`;
  }
  if (id.includes("heterogeneo")) {
    return "tireoidopatia difusa (ecotextura heterogênea)";
  }
  if (id.includes("dilatad")) {
    return `dilatação de ${org.toLowerCase()}`;
  }
  if (id.includes("lipoma")) {
    return "nódulo em partes superficiais (considerar lipoma)";
  }
  if (id.includes("abscesso") || id.includes("cisto-abscesso")) {
    return "imagem cístico-espessa (considerar abscesso)";
  }

  return `${label.toLowerCase()} (${org})`;
}

export function fraseDeOpcao(secao: Secao, opcao: Opcao): string {
  if (opcao.impressao?.trim()) {
    const t = opcao.impressao.trim();
    if (
      /^(imagem sugestiva de|sinais sugestivos de|imagens sugestivas de)\b/i.test(
        t,
      )
    ) {
      return /[.!?]$/.test(t) ? t : `${t}.`;
    }
  }

  const prefixo = prefixoImpressao(opcao);
  const nome = nomePatologia(opcao, secao);
  const limpo = nome.replace(/\.$/, "");
  return `${prefixo} ${limpo}.`;
}

function idsDaSelecao(valor: string | string[] | undefined): string[] {
  if (Array.isArray(valor)) return valor.filter(Boolean);
  if (typeof valor === "string" && valor) return [valor];
  return [];
}

export function temGinecomastiaMamaMasculino(selecoes: Selecoes): boolean {
  return (
    idsDaSelecao(selecoes["mama-direita"]).includes("ginecomastia") ||
    idsDaSelecao(selecoes["mama-esquerda"]).includes("ginecomastia")
  );
}

/** Infere lateralidade a partir das mamas marcadas com ginecomastia. */
export function ladoGinecomastiaInferido(
  selecoes: Selecoes,
): "bilateral" | "direita" | "esquerda" | "" {
  const dir = idsDaSelecao(selecoes["mama-direita"]).includes("ginecomastia");
  const esq = idsDaSelecao(selecoes["mama-esquerda"]).includes("ginecomastia");
  if (dir && esq) return "bilateral";
  if (dir) return "direita";
  if (esq) return "esquerda";
  return "";
}

export const GINECO_LADOS = ["bilateral", "direita", "esquerda"] as const;
export const GINECO_FASES = ["nodular", "dendrítica", "quiescente"] as const;

export function aplicarGinecomastiaMasculino(
  texto: string,
  lado: string,
  fase: string,
): string {
  return texto
    .split("{{GINECO_LADO}}")
    .join(lado.trim() || "bilateral/direita/esquerda")
    .split("{{GINECO_FASE}}")
    .join(fase.trim() || "nodular / dendrítica / quiescente");
}

/**
 * Monta a impressão diagnóstica conforme os achados selecionados.
 * Frases sempre iniciam com "Imagem sugestiva de" ou "Sinais sugestivos de".
 */
export function gerarImpressaoDiagnostica(
  exame: Exame,
  selecoes: Selecoes,
  extras?: { medidas?: Record<string, string> },
): string {
  const frasesAlteracao: string[] = [];
  let fraseGinecomastia = "";

  for (const secao of exame.secoes) {
    if (SECOES_SEM_IMPRESSAO.has(secao.id)) continue;

    const ids = idsDaSelecao(selecoes[secao.id]);
    for (const id of ids) {
      const opcao = secao.opcoes.find((o) => o.id === id);
      if (!opcao) continue;
      if (opcaoEhNormal(opcao, secao)) continue;

      if (exame.id === "mamas-masculino" && id === "ginecomastia") {
        fraseGinecomastia =
          opcao.impressao?.trim() ||
          "Achados ultrassonográficos compatíveis com ginecomastia ({{GINECO_LADO}}), caracterizada pelo espessamento e hiperplasia do tecido fibroglandular retroareolar (fase {{GINECO_FASE}}).";
        continue;
      }

      if (exame.id === "mao" && opcaoEhQuirodactilo(opcao)) {
        const meta = QUIRODACTILOS.find((d) => d.id === id);
        const achadoRaw =
          extras?.medidas?.[chaveMaoDedoAchado(secao.id, id)] ?? "";
        const achado: MaoDedoAchado | "" =
          achadoRaw === "fluxo" || achadoRaw === "gatilho" ? achadoRaw : "";
        const frase = meta
          ? impressaoAchadoQuirodactilo(meta.nro, meta.nome, achado)
          : "";
        if (frase && !frasesAlteracao.includes(frase)) {
          frasesAlteracao.push(frase);
        }
        continue;
      }

      const frase = fraseDeOpcao(secao, opcao);
      if (frase && !frasesAlteracao.includes(frase)) {
        frasesAlteracao.push(frase);
      }
    }
  }

  if (fraseGinecomastia) {
    frasesAlteracao.unshift(fraseGinecomastia);
  }

  if (frasesAlteracao.length === 0) {
    return exame.impressaoPadrao.trim();
  }

  const demais =
    exame.id === "abdome-total" ||
    exame.id === "abdome-superior" ||
    exame.id === "aparelho-urinario"
      ? "Demais órgãos e regiões examinadas, dentro dos parâmetros da normalidade."
      : exame.id === "bolsa-testicular"
        ? "Demais estruturas escrotais com aspecto ultrassonográfico habitual."
      : exame.id === "regiao-inguinal"
        ? "Demais estruturas das regiões inguinais com aspecto ultrassonográfico habitual."
      : exame.id.startsWith("tireoide")
        ? "Demais áreas examinadas da tireoide dentro dos parâmetros da normalidade."
        : null;

  if (demais && !frasesAlteracao.some((f) => /demais/i.test(f))) {
    frasesAlteracao.push(demais);
  }

  return frasesAlteracao.join("\n");
}
