import { mergeOpcoes } from "@/data/patologiasCatalogo";
import {
  ajustarExameCotovelo as ajustarExameCotoveloMsk,
  ajustarExameMao as ajustarExameMaoMsk,
  ajustarExameMusculo as ajustarExameMusculoMsk,
  ajustarExameOmbro as ajustarExameOmbroMsk,
  ajustarExamePe as ajustarExamePeMsk,
  ajustarExamePunho as ajustarExamePunhoMsk,
  ajustarExameQuadril as ajustarExameQuadrilMsk,
  ajustarExameTornozelo as ajustarExameTornozeloMsk,
  impressaoCotoveloNormal,
  secoesCotovelo,
  secoesMao,
  secoesMusculo,
  secoesOmbro,
  secoesPe,
  secoesPunho,
  secoesQuadril,
  secoesTornozelo,
  impressaoOmbroNormal,
  impressaoPunhoNormal,
  impressaoMaoNormal,
  impressaoQuadrilNormal,
  impressaoTornozeloNormal,
  impressaoPeNormal,
  impressaoMusculoNormal,
} from "@/data/mskExames";
import {
  secoesCarotidas,
  TECNICA_CAROTIDAS,
  IMPRESSAO_CAROTIDAS_NORMAL,
} from "@/data/carotidasExames";
import {
  ajustarExameMmiiVenoso as ajustarExameMmiiVenosoBase,
  secoesMmiiVenoso,
  TECNICA_MMII_VENOSO,
  impressaoMmiiVenosoNormal,
} from "@/data/mmiiVenosoExames";
import {
  ajustarExameMmiiArterial as ajustarExameMmiiArterialBase,
  secoesMmiiArterial,
  TECNICA_MMII_ARTERIAL,
  impressaoMmiiArterialNormal,
} from "@/data/mmiiArterialExames";
import {
  ajustarExameMmssVenoso as ajustarExameMmssVenosoBase,
  secoesMmssVenoso,
  TECNICA_MMSS_VENOSO,
  impressaoMmssVenosoNormal,
} from "@/data/mmssVenosoExames";
import {
  ajustarExameMmssArterial as ajustarExameMmssArterialBase,
  secoesMmssArterial,
  TECNICA_MMSS_ARTERIAL,
  impressaoMmssArterialNormal,
} from "@/data/mmssArterialExames";
import { exameObstetricoTvPrecoce } from "@/data/obstetricoTvPrecoceExames";
import { exameObstetricoMorfo1t } from "@/data/obstetricoMorfo1tExames";
import { exameObstetricoGemelar1t } from "@/data/obstetricoGemelar1tExames";
import { exameObstetricoBasico } from "@/data/obstetricoBasicoExames";
import { exameObstetricoMorfo2t } from "@/data/obstetricoMorfo2tExames";
import { exameObstetricoDoppler } from "@/data/obstetricoDopplerExames";
import { exameObstetricoGemelarDoppler } from "@/data/obstetricoGemelarDopplerExames";
import { exameObstetricoPerfilBiofisico } from "@/data/obstetricoPerfilBiofisicoExames";
import { exameObstetrico3d4d } from "@/data/obstetrico3d4dExames";
import { exameCervicometria } from "@/data/cervicometriaExames";
import { exameEcoFetal } from "@/data/ecoFetalExames";
import { exameEcoFetalGemelar } from "@/data/ecoFetalGemelarExames";
import { exameElastografiaHepatica } from "@/data/elastografiaHepaticaExames";
import { exameEcocardiograma } from "@/data/ecocardiogramaExames";
import { exameMamografia } from "@/data/mamografiaExames";
import { exameArteriasTemporais } from "@/data/arteriasTemporaisExames";
import {
  exameTransfontanelar,
  exameQuadrilInfantil,
} from "@/data/pediatriaExames";
import {
  exameHisterossonografia,
  exameHycosy,
  examePelvicoTvHycosy,
  examePelvicoTvDoppler,
  exameEndometriose,
  exameMonitoracaoFolicular,
} from "@/data/ginecologiaExtraExames";
import {
  exameAvaliacaoMultiparametricaHepatica,
  exameDopplerHepatico,
  exameProstataTransretal,
} from "@/data/hepaticoUrologiaExtraExames";
import type { LadoArticulacao } from "@/lib/ladoMsk";


export type Opcao = {
  id: string;
  label: string;
  texto: string;
  /** Frase sugerida na impressão diagnóstica quando esta opção está marcada */
  impressao?: string;
};

export type Secao = {
  id: string;
  /** Rótulo no laudo (ex.: FÍGADO, VES. BILIAR) */
  titulo: string;
  tipo: "unico" | "multiplo";
  opcoes: Opcao[];
  padrao?: string | string[];
};

export type Exame = {
  id: string;
  nome: string;
  /** Título oficial no documento, ex.: ULTRASSONOGRAFIA DO ABDOME TOTAL */
  tituloDocumento?: string;
  tecnica: string;
  secoes: Secao[];
  impressaoPadrao: string;
};

/** Detecta opções que pedem tamanho (nódulo/cisto/etc. ou texto com cm/mm a preencher) */
export function opcaoRequerMedida(opcao: Opcao): boolean {
  const idLabel = `${opcao.id} ${opcao.label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (
    /^(normal|normais|sem-achados|cheia|vazia|homogeneo|gorduroso|fibroglandular)/.test(
      opcao.id,
    )
  ) {
    return false;
  }
  if (
    /(cisto|nodulo|massa|lipoma|mioma|abscesso|espongiforme|chammas|polipo|calculo|litiase|colelit|ginecomastia|hemangioma|adenocarcinoma|prostatite|endometrio|diu|neuropatia-mediano|tunel-do-carpo|area-mediano|talalgia|neuroma|bursite|rotura|ruptura|ganglio|ledderhose|fascite|entesopatia|aquiles|calcaneo|placa|eim|estenose|hipoplasia|kinking|coiling|vsp|refluxo|perfurante)/.test(
      idLabel,
    )
  ) {
    return true;
  }

  const t = opcao.texto;
  if (/\{\{MEDIDA\}\}/.test(t)) return true;
  if (/_{2,}\s*(cm|mm)\b/i.test(t)) return true;
  if (/\(\s*_{2,}\s*mm\s*\)/i.test(t)) return true;
  if (/\bmedindo\s+(cerca\s+de\s+)?(cm|mm)\b/i.test(t)) return true;
  if (/\bmedindo\s+(cerca\s+de\s+)?_{2,}/i.test(t)) return true;
  if (/\bespessura\s+([^\n.]{0,40}?\s)?de\s+(cm|mm)\b/i.test(t)) return true;
  if (/\bcerca\s+de\s+(cm|mm)\b/i.test(t)) return true;
  if (/\bde\s+cm\s*\(/i.test(t)) return true;
  if (/\barea\s+(transversal\s+)?(de\s+)?mm/i.test(t)) return true;
  if (/área\s+(transversal\s+)?(de\s+)?mm/i.test(t)) return true;
  if (/_{2,}\s*mm\s*²/i.test(t)) return true;
  return false;
}

/** TIRADS / Chammas / Lagalla só no exame de tireoide */
export function exameUsaClassificacaoTireoide(exameId: string): boolean {
  return exameId === "tireoide" || exameId === "tireoide-doppler";
}

/** Nódulo/cisto tireoidiano: TIRADS obrigatório ao final da frase */
export function opcaoRequerTirads(opcao: Opcao, exameId?: string): boolean {
  if (exameId != null && !exameUsaClassificacaoTireoide(exameId)) {
    return false;
  }
  const s = `${opcao.id} ${opcao.label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (
    /(tireoidectomia|heterogene|hashimoto|graves|normal|normais|habitual)/.test(
      s,
    )
  ) {
    return false;
  }
  return /(nodulo|cisto|espongiforme)/.test(s);
}

/** Campos Doppler (Chammas/Lagalla/IR/IP/Vel) — nódulos da tireoide */
export function opcaoRequerDopplerNodulo(
  opcao: Opcao,
  exameId?: string,
): boolean {
  if (exameId != null && !exameUsaClassificacaoTireoide(exameId)) {
    return false;
  }
  const s = `${opcao.id} ${opcao.label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (/(tireoidectomia|heterogene)/.test(s)) return false;
  if (/cisto/.test(s) && !/espongiforme/.test(s)) return false;
  return /(nodulo|espongiforme|chammas)/.test(s);
}

/** Miomas / nódulos (massa) ovarianos: padrão de vascularização da lesão (TV + Doppler) */
export function opcaoRequerVascLesao(opcao: Opcao): boolean {
  const s = `${opcao.id} ${opcao.label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (/aumento-vascularizacao|congestao|polimicro|normal|normais|ausente/.test(s)) {
    return false;
  }
  return /(mioma|massa-ovar|nodulo.?ovar)/.test(s);
}

export const VASC_LESAO_OPCOES = [
  "central",
  "periférica",
  "central e periférica",
] as const;

export function chaveVascLesao(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::vasc-lesao`;
}

export function aplicarVascLesao(texto: string, valorRaw: string): string {
  const v = valorRaw.trim() || "central / periférica / central e periférica";
  return texto.split("{{VASC_LESAO}}").join(v);
}

function comPlaceholderVascLesao(op: Opcao): Opcao {
  if (!opcaoRequerVascLesao(op)) return op;
  if (/\{\{VASC_LESAO\}\}/.test(op.texto)) return op;
  return {
    ...op,
    texto: `${op.texto.replace(/\s+$/, "").replace(/\.$/, "")}.\nVascularização da lesão ao Doppler: {{VASC_LESAO}}.`,
  };
}

function secaoDopplerVascOrgao(
  id: string,
  titulo: string,
  orgaoFrase: string,
  impressaoDe: string,
): Secao {
  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: [
      {
        id: "normal",
        label: "Normal",
        texto: `${orgaoFrase} com distribuição normal da vascularização ao Doppler colorido.`,
      },
      {
        id: "aumentada",
        label: "Aumentada",
        texto: `${orgaoFrase} com aumento da vascularização ao Doppler colorido.`,
        impressao: `Sinais sugestivos de aumento da vascularização ${impressaoDe} ao Doppler.`,
      },
    ],
  };
}

export function chaveTirads(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::tirads`;
}
export function chaveChammas(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::chammas`;
}
export function chaveLagalla(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::lagalla`;
}
export function chaveIr(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::ir`;
}
export function chaveIp(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::ip`;
}
export function chaveVel(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::vel`;
}

export function tiradsPadraoOpcao(opcao: Opcao): string {
  const s = `${opcao.id} ${opcao.label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (/cisto-simples/.test(s)) return "TIRADS 1";
  if (/espongiforme|cisto-coloide/.test(s)) return "TIRADS 2";
  if (/^cisto\b|cisto-tireoide|cistos/.test(s)) return "TIRADS 2";
  return "";
}

export function formatarTirads(valor: string): string {
  const v = valor.trim();
  if (!v) return "TIRADS ____";
  if (/tirads/i.test(v)) return v.toUpperCase().replace(/TIRADS/i, "TIRADS");
  return `TIRADS ${v}`;
}

/** Aplica TIRADS e, se Doppler, Chammas/Lagalla/IR/IP/Vel no texto do nódulo/cisto */
export function aplicarClassificacaoNoduloTireoide(
  texto: string,
  secaoId: string,
  opcaoId: string,
  medidas: Record<string, string>,
  comDoppler: boolean,
): string {
  let out = texto;
  const tirads = formatarTirads(medidas[chaveTirads(secaoId, opcaoId)] ?? "");
  out = out.replace(/\{\{TIRADS\}\}/g, tirads);

  if (comDoppler) {
    const chammas = (medidas[chaveChammas(secaoId, opcaoId)] ?? "").trim() || "____";
    const lagalla = (medidas[chaveLagalla(secaoId, opcaoId)] ?? "").trim() || "____";
    const ir = (medidas[chaveIr(secaoId, opcaoId)] ?? "").trim() || "0,__";
    const ip = (medidas[chaveIp(secaoId, opcaoId)] ?? "").trim() || "0,__";
    const vel = (medidas[chaveVel(secaoId, opcaoId)] ?? "").trim() || "____";
    out = out
      .replace(/\{\{CHAMMAS\}\}/g, chammas)
      .replace(/\{\{LAGALLA\}\}/g, lagalla)
      .replace(/\{\{IR\}\}/g, ir)
      .replace(/\{\{IP\}\}/g, ip)
      .replace(/\{\{VEL\}\}/g, vel);
  } else {
    out = out
      .replace(/\{\{CHAMMAS\}\}/g, "____")
      .replace(/\{\{LAGALLA\}\}/g, "____")
      .replace(/\{\{IR\}\}/g, "0,__")
      .replace(/\{\{IP\}\}/g, "0,__")
      .replace(/\{\{VEL\}\}/g, "____");
  }
  return out;
}

/** Chave de medida por seção + opção (múltiplas patologias) */
export function chaveMedida(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}`;
}

/** Chave de localização (ex.: segmento hepático) */
export function chaveLocalizacao(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::loc`;
}

/** Chave de % de estreitamento (placas de ateroma) */
export function chaveEstenose(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::estenose`;
}

export const ESTENOSE_OPCOES = ["25", "50", "75"] as const;

/** Lesões focais hepáticas / mama (e textos com {{LOCAL}}) pedem localização */
export function opcaoRequerLocalizacao(opcao: Opcao, secao?: Secao): boolean {
  if (/\{\{LOCAL\}\}/.test(opcao.texto)) return true;
  if (secao?.id === "figado") {
    const s = `${opcao.id} ${opcao.label}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return /(nodulo|cisto|hemangioma)/.test(s);
  }
  if (secao && /^mama-/.test(secao.id)) {
    return opcaoPermiteMultiplasLesoes(opcao) || opcaoRequerMedida(opcao);
  }
  // Textos de mama com Q____ / às ____ h
  if (/Q_{2,}|às _{2,} h|localizada em Q/i.test(opcao.texto)) return true;
  return false;
}

/** Placas de ateroma: caixa opcional 25 / 50 / 75% */
export function opcaoRequerEstenose(opcao: Opcao): boolean {
  const s = `${opcao.id} ${opcao.label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return /ateroma/.test(s) || /\{\{ESTENOSE\}\}/.test(opcao.texto);
}

/** Seções em que só uma opção pode ficar ativa (classificação / estado) */
export function secaoExclusiva(secao: Secao): boolean {
  const id = secao.id.toLowerCase();
  if (
    [
      "birads",
      "volume",
      "doppler",
      "istmo",
      "vagina",
      "tecnica",
      "regiao",
    ].includes(id)
  ) {
    return true;
  }
  return secao.opcoes.length <= 2;
}

/** Órgãos com Normal + achados que podem coexistir (colelitíase + pólipo + lama, etc.) */
export function secaoPermiteMultiplo(secao: Secao): boolean {
  if (secaoExclusiva(secao)) return false;
  return secao.opcoes.length >= 3;
}

/** Lesões focais (nódulo/cisto/cálculo/pólipo) que permitem várias instâncias com + */
export function opcaoPermiteMultiplasLesoes(opcao: Opcao): boolean {
  const s = `${opcao.id} ${opcao.label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return /(cisto|nodulo|massa|abscesso|lipoma|mioma|calculo|colelit|litiase|polipo)/.test(
    s,
  );
}

/** Topografia usada nas frases de retirada / não visibilizada */
export function topografiaDaSecao(secao: Secao): string {
  const id = secao.id.toLowerCase();
  const porId: Record<string, string> = {
    figado: "hepática",
    vesicula: "vesicular",
    "vias-biliares": "das vias biliares",
    pancreas: "pancreática",
    baco: "esplênica",
    rins: "renal",
    "rim-direito": "renal direita",
    "rim-esquerdo": "renal esquerda",
    bexiga: "vesical",
    retroperitonio: "retroperitoneal",
    aorta: "aórtica",
    "cav-abdominal": "da cavidade abdominal",
    pelve: "pélvica",
    intestino: "intestinal / mesentérica",
    "mama-direita": "mama direita",
    "mama-esquerda": "mama esquerda",
    "axila-direita": "axilar direita",
    "axila-esquerda": "axilar esquerda",
    utero: "uterina",
    ovarios: "ovariana",
    "ovario-direito": "ovariana direita",
    "ovario-esquerdo": "ovariana esquerda",
    vagina: "vaginal",
    tireoide: "tireoidiana",
    istmo: "do istmo tireoidiano",
    linfonodos: "linfonodal",
    parotidas: "parotídea",
    submandibular: "submandibular",
    sublingual: "sublingual",
    prostata: "prostática",
    "ves-seminais": "das vesículas seminais",
    testiculos: "testicular",
    "testiculo-direito": "testicular direita",
    "testiculo-esquerdo": "testicular esquerda",
    "epididimo-direito": "epididimária direita",
    "epididimo-esquerdo": "epididimária esquerda",
    "bolsa-direita": "da bolsa testicular direita",
    "bolsa-esquerda": "da bolsa testicular esquerda",
    "plexo-direito": "do plexo pampiniforme direito",
    "plexo-esquerdo": "do plexo pampiniforme esquerdo",
    "corpos-cavernosos": "dos corpos cavernosos",
    "corpo-esponjoso": "do corpo esponjoso",
    "uretra-peniana": "uretral peniana",
    endometrio: "endometrial",
    "a-direita": "mama direita",
    "a-esquerda": "mama esquerda",
    epidermis: "epidérmica",
    derme: "dérmica",
    hipoderme: "hipodérmica",
    achados: "da região examinada",
  };
  if (porId[id]) return porId[id];
  return secao.titulo
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function secaoElegivelOpcoesVisibilidade(secao: Secao): boolean {
  const id = secao.id.toLowerCase();
  if (
    [
      "birads",
      "volume",
      "tecnica",
      "regiao",
      "classificacao",
      "pi-rads",
      "tirads",
    ].includes(id)
  ) {
    return false;
  }
  if (/^birads/.test(id)) return false;
  return true;
}

export function opcaoRetiradaCirurgica(secao: Secao): Opcao {
  const topo = topografiaDaSecao(secao);
  return {
    id: "retirada-cirurgica",
    label: "Retirada cirúrgica",
    texto: `"Não visibilizada (retirada cirúrgica) topografia ${topo} livre , sem sinais de massa , nódulos ou coleções."`,
    impressao: `Sinais sugestivos de status pós-cirúrgico (topografia ${topo}).`,
  };
}

export function opcaoNaoVisibilizada(secao: Secao): Opcao {
  const topo = topografiaDaSecao(secao);
  return {
    id: "nao-visibilizada",
    label: "Não visibilizada",
    texto: `Não visibilizada. Topografia ${topo} sem caracterização adequada no presente estudo.`,
    impressao: `Topografia ${topo} não visibilizada no presente estudo.`,
  };
}

/** Exames de Medicina Interna, Urologia e Ginecologia */
const EXAMES_COM_NAO_VISIBILIZADA = new Set([
  "abdome-total",
  "abdome-superior",
  "intestino-mesenterio",
  "tireoide",
  "glandulas-salivares",
  "regiao-cervical",
  "torax",
  "partes-moles",
  "dermatologico",
  "parede-abdominal",
  "regiao-inguinal",
  "mamas-masculino",
  "mamas",
  "mamas",
  "axilas",
  "pelvica",
  "pelvica-tv",
  "aparelho-urinario",
  "prostata",
  "bolsa-testicular",
  "penis",
]);

function enriquecerSecao(secao: Secao, exameId: string): Secao {
  if (!secaoElegivelOpcoesVisibilidade(secao)) return secao;
  const opcoes = [...secao.opcoes];
  const semRetiradaCirurgica =
    exameId.startsWith("obstetrico") ||
    exameId.startsWith("eco-fetal") ||
    exameId === "cervicometria" ||
    exameId === "ecocardiograma" ||
    exameId === "elastografia-hepatica" ||
    exameId === "arterias-temporais" ||
    exameId === "transfontanelar" ||
    exameId === "quadril-infantil" ||
    exameId.startsWith("histero") ||
    exameId === "hycosy" ||
    exameId.startsWith("pelvico-tv") ||
    exameId === "endometriose" ||
    exameId === "monitoracao-folicular" ||
    exameId === "avaliacao-multiparametrica-hepatica" ||
    exameId === "doppler-hepatico" ||
    exameId === "prostata-transretal" ||
    exameId === "dermatologico" ||
    exameId === "glandulas-salivares" ||
    exameId === "penis" ||
    secao.id === "cav-abdominal" ||
    secao.id === "pelve" ||
    secao.id === "aorta" ||
    secao.id === "retroperitonio" ||
    secao.id === "vias-biliares";

  if (
    !semRetiradaCirurgica &&
    !opcoes.some((o) => o.id === "retirada-cirurgica")
  ) {
    const ausenteIdx = opcoes.findIndex(
      (o) =>
        o.id === "ausente" ||
        /nao visibilizad[oa].*\(cirurg/i.test(o.label),
    );
    const padrao = opcaoRetiradaCirurgica(secao);
    if (ausenteIdx >= 0) {
      opcoes[ausenteIdx] = {
        ...opcoes[ausenteIdx],
        id: "retirada-cirurgica",
        label: padrao.label,
        texto: padrao.texto,
        impressao: padrao.impressao,
      };
    } else {
      opcoes.push(padrao);
    }
  }

  if (
    EXAMES_COM_NAO_VISIBILIZADA.has(exameId) &&
    !opcoes.some((o) => o.id === "nao-visibilizada")
  ) {
    opcoes.push(opcaoNaoVisibilizada(secao));
  }

  return { ...secao, opcoes };
}

function enriquecerExame(exame: Exame): Exame {
  return {
    ...exame,
    secoes: exame.secoes.map((s) => enriquecerSecao(s, exame.id)),
  };
}

/** Hepatocolédoco: medida opcional (checkbox) */
export function opcaoMedidaHepatocoledoco(
  opcao: Opcao,
  secao?: Secao,
): boolean {
  return secao?.id === "vias-biliares";
}

export function chaveHcOn(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::hc-on`;
}

export function chaveHcMedida(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::hc`;
}

/** Esplenomegalia: índice esplênico */
export function opcaoRequerIndiceEsplenico(opcao: Opcao): boolean {
  const s = `${opcao.id} ${opcao.label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return /esplenomegalia/.test(s);
}

export function chaveIndiceEsplenico(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}::indice-esplenico`;
}

/** Opções de repleção vesical (mutuamente exclusivas; cálculo pode coexistir) */
export function opcaoEhReplecaoBexiga(opcao: Opcao): boolean {
  const id = opcao.id.toLowerCase();
  return (
    id === "cheia" ||
    id === "vazia" ||
    id === "normal" ||
    id === "baixa-replecao" ||
    id === "media-replecao" ||
    id === "nao-repleta" ||
    id === "paredes-espessadas"
  );
}

export function opcaoEhCalculoVesical(opcao: Opcao): boolean {
  const s = `${opcao.id} ${opcao.label}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return /calculo/.test(s) && /vesic|bexiga|calculo$/.test(s);
}

export type LesaoItem = { medida: string; local: string };

export function chaveLesoes(secaoId: string, opcaoId: string): string {
  return `${secaoId}::${opcaoId}`;
}

export function lesaoVazia(): LesaoItem {
  return { medida: "", local: "" };
}

export function idsSelecionados(
  valor: string | string[] | undefined,
): string[] {
  if (Array.isArray(valor)) return valor.filter(Boolean);
  if (typeof valor === "string" && valor) return [valor];
  return [];
}

export function formatarMedida(valor: string): string {
  const v = valor.trim();
  if (!v) return "";
  if (/\bcm\b|\bmm\b/i.test(v)) return v;
  return `${v} cm`;
}

/** Insere o tamanho informado no texto do achado */
export function aplicarMedida(texto: string, medidaRaw: string): string {
  const raw = medidaRaw.trim();
  if (!raw) return texto;
  if (texto.includes("{{MEDIDA}}")) {
    const ehAreaMm2 =
      /mm\s*²|mm2|mm²/i.test(texto) &&
      /área transversal|area transversal/i.test(texto);
    const ehVsp = /\bVSP\b/i.test(texto);
    const ehEim =
      /\b(EIM|EMI|CIMT)\b/i.test(texto) ||
      /[ií]ntima-m[eé]dia/i.test(texto);
    let medida: string;
    if (ehAreaMm2) {
      medida = /\bmm/i.test(raw) ? raw : `${raw} mm²`;
    } else if (ehVsp) {
      medida = /\bcm/i.test(raw) ? raw : `${raw} cm/s`;
    } else if (ehEim) {
      medida = /\bmm\b/i.test(raw) ? raw : `${raw} mm`;
    } else {
      medida = formatarMedida(raw);
    }
    return texto.split("{{MEDIDA}}").join(medida);
  }

  const medida = formatarMedida(medidaRaw);
  if (!medida) return texto;

  const rawMm = /\bmm\b/i.test(raw) ? raw : `${raw} mm`;
  const rawMm2 = /\bmm/i.test(raw) ? raw : `${raw} mm²`;

  if (/espessura de _{2,} mm/i.test(texto)) {
    return texto.replace(/espessura de _{2,} mm/i, `espessura de ${rawMm}`);
  }
  if (/medindo _{2,} mm/i.test(texto)) {
    return texto.replace(/medindo _{2,} mm/i, `medindo ${rawMm}`);
  }
  if (/\(\s*_{2,}\s*mm\s*\)/i.test(texto)) {
    return texto.replace(/\(\s*_{2,}\s*mm\s*\)/i, `(${rawMm})`);
  }
  if (/distensão capsular _{2,} mm/i.test(texto)) {
    return texto.replace(
      /distensão capsular _{2,} mm/i,
      `distensão capsular ${rawMm}`,
    );
  }
  if (/área transversal _{2,} mm/i.test(texto)) {
    return texto.replace(
      /área transversal _{2,}\s*mm\s*²?/i,
      `área transversal ${rawMm2}`,
    );
  }
  if (/area transversal _{2,} mm/i.test(texto)) {
    return texto.replace(
      /area transversal _{2,}\s*mm\s*²?/i,
      `area transversal ${rawMm2}`,
    );
  }
  if (/retração tendínea de _{2,} cm/i.test(texto)) {
    return texto.replace(
      /retração tendínea de _{2,} cm/i,
      `retração tendínea de ${medida}`,
    );
  }
  if (/gap de _{2,} cm/i.test(texto)) {
    return texto.replace(/gap de _{2,} cm/i, `gap de ${medida}`);
  }
  if (/espessura do coxim de (_{2,}\s*)?cm/i.test(texto)) {
    return texto.replace(
      /espessura do coxim de (_{2,}\s*)?cm/i,
      `espessura do coxim de ${medida}`,
    );
  }
  if (/\bde cm \(normal/i.test(texto)) {
    return texto.replace(/\bde cm \(normal/i, `de ${medida} (normal`);
  }
  if (/\bcerca de cm da/i.test(texto)) {
    return texto.replace(/\bcerca de cm da/i, `cerca de ${medida} da`);
  }
  if (/\barea de mm/i.test(texto)) {
    return texto.replace(/\barea de mm/i, `área de ${rawMm2}`);
  }
  if (/área de mm/i.test(texto)) {
    return texto.replace(/área de mm/i, `área de ${rawMm2}`);
  }

  if (/medindo _{2,} x _{2,} x _{2,} cm/i.test(texto)) {
    return texto.replace(
      /medindo _{2,} x _{2,} x _{2,} cm/i,
      `medindo ${medida} em seu maior eixo`,
    );
  }
  if (/medindo _{2,} x _{2,} x _{2,} mm/i.test(texto)) {
    return texto.replace(
      /medindo _{2,} x _{2,} x _{2,} mm/i,
      `medindo ${rawMm} em seu maior eixo`,
    );
  }

  const patterns: RegExp[] = [
    /medindo cerca de _{2,} cm/i,
    /medindo _{2,} x _{2,} cm/i,
    /medindo _{2,} cm/i,
    /medindo cerca de cm/i,
    /medindo x x x cm/i,
    /medindo x x cm/i,
    /medindo cm/i,
  ];
  for (const p of patterns) {
    if (p.test(texto)) {
      return texto.replace(p, `medindo ${medida}`);
    }
  }

  // Último recurso: primeiro "____ cm" / "____ mm"
  if (/_{2,}\s*cm\b/i.test(texto)) {
    return texto.replace(/_{2,}\s*cm\b/i, medida);
  }
  if (/_{2,}\s*mm\s*²/i.test(texto)) {
    return texto.replace(/_{2,}\s*mm\s*²/i, rawMm2);
  }
  if (/_{2,}\s*mm\b/i.test(texto)) {
    return texto.replace(/_{2,}\s*mm\b/i, rawMm);
  }

  const base = texto.replace(/\s+$/, "");
  const sep = /[.!?]$/.test(base) ? " " : ". ";
  return `${base}${sep}Medindo ${medida}.`;
}

/** Aplica 1ª lesão no texto e acrescenta as demais */
export function aplicarMultiplasLesoes(
  texto: string,
  lesoes: LesaoItem[] | undefined,
): string {
  const items =
    lesoes && lesoes.length > 0 ? lesoes : [{ medida: "", local: "" }];
  let out = aplicarMedida(texto, items[0].medida);
  out = aplicarLocalizacao(out, items[0].local);
  for (let i = 1; i < items.length; i++) {
    const med = formatarMedida(items[i].medida) || "____ cm";
    const loc = items[i].local.trim();
    if (loc) {
      out += `\nAdicionalmente, identifica-se outra formação semelhante, medindo cerca de ${med}, localizada em ${loc}.`;
    } else {
      out += `\nAdicionalmente, identifica-se outra formação semelhante, medindo cerca de ${med}.`;
    }
  }
  return out;
}

/** Insere medida opcional do hepatocolédoco */
export function aplicarMedidaHepatocoledoco(
  texto: string,
  incluir: boolean,
  medidaRaw: string,
): string {
  const medida = formatarMedida(medidaRaw);
  const trecho = incluir
    ? medida
      ? `, medindo ${medida}`
      : ", medindo ____ cm"
    : "";
  if (texto.includes("{{HC}}")) {
    return texto.split("{{HC}}").join(trecho);
  }
  if (!incluir) return texto;
  // Anexa à menção de hepatocolédoco / colédoco
  if (/hepato-?col[eé]doco|ducto col[eé]doco|col[eé]doco/i.test(texto)) {
    return texto.replace(
      /(hepato-?col[eé]doco[^.]*|ducto col[eé]doco[^.]*|col[eé]doco[^.]*)(\.?)/i,
      (_, a, p) => `${a}${trecho}${p || "."}`,
    );
  }
  return `${texto.trim()}${trecho ? ` Hepatocolédoco${trecho}.` : ""}`;
}

/** Índice esplênico na esplenomegalia */
export function aplicarIndiceEsplenico(
  texto: string,
  indiceRaw: string,
): string {
  const v = indiceRaw.trim();
  const frase = v
    ? `Índice esplênico ${v} (normal até 60).`
    : "Índice esplênico ___ (normal até 60).";
  if (texto.includes("{{INDICE_ESPLENICO}}")) {
    return texto.split("{{INDICE_ESPLENICO}}").join(frase);
  }
  if (/[ií]ndice espl[eê]nico/i.test(texto)) {
    return texto.replace(
      /[ií]ndice espl[eê]nico[^.]*\.?/i,
      frase,
    );
  }
  const base = texto.replace(/\s+$/, "");
  const sep = /[.!?]$/.test(base) ? " " : ". ";
  return `${base}${sep}${frase}`;
}

/** Insere a localização informada no texto do achado */
export function aplicarLocalizacao(texto: string, localRaw: string): string {
  const local = localRaw.trim();
  if (!local) {
    return texto.replace(/\{\{LOCAL\}\}/g, "____");
  }
  if (texto.includes("{{LOCAL}}")) {
    return texto.split("{{LOCAL}}").join(local);
  }
  const patterns: RegExp[] = [
    /localizad[ao]s? em Q_{2,}\s*às\s*_{2,}\s*h/i,
    /localizad[ao]s? em _{2,}/i,
    /localizad[ao]s? no segmento _{2,}/i,
    /no segmento _{2,}/i,
    /às _{2,} horas/i,
    /às horas/i,
  ];
  for (const p of patterns) {
    if (p.test(texto)) {
      return texto.replace(p, (m) => {
        if (/Q_/i.test(m) || /às/i.test(m)) {
          return /localizad/i.test(m)
            ? `localizada em ${local}`
            : `às ${local}`;
        }
        if (/segmento/i.test(m)) {
          return `no segmento ${local}`.replace(/^no segmento no /i, "no ");
        }
        return `localizado em ${local}`;
      });
    }
  }
  const base = texto.replace(/\s+$/, "");
  const sep = /[.!?]$/.test(base) ? " " : ". ";
  return `${base}${sep}Localização: ${local}.`;
}

/** Insere % de estreitamento opcional (25 / 50 / 75) */
export function aplicarEstenose(texto: string, pctRaw: string): string {
  const pct = pctRaw.trim();
  if (!pct) {
    return texto.replace(/\{\{ESTENOSE\}\}/g, "");
  }
  const frase = `, com redução luminal estimada em cerca de ${pct}%`;
  if (texto.includes("{{ESTENOSE}}")) {
    return texto.split("{{ESTENOSE}}").join(frase);
  }
  const base = texto.replace(/\s+$/, "").replace(/\.$/, "");
  return `${base}${frase}.`;
}

/* ——— textos reutilizáveis (estilo ODT) ——— */

const TECNICA_LINEAR =
  "Ultrassonografia realizada em equipamento bidimensional com transdutor LINEAR multifrequencial. Foram feitas varreduras nos sentidos transversais, longitudinais e oblíquos e os seguintes aspectos foram observados:";

const TECNICA_MAMAS =
  "Estudo ultrassonográfico das mamas e regiões axilares pelo modo bidimensional, usando-se transdutor linear multifrequencial, em contato com a pele.\nForam feitas varreduras nos sentidos transversal, longitudinal e oblíquas.";

const TECNICA_MAMAS_MASCULINO =
  "**TÉCNICA:** Transdutor: Transdutor linear eletrônico de alta frequência, proporcionando resolução espacial otimizada para avaliação detalhada das camadas cutânea, subcutânea, glandular e planos profundos torácicos.";

const TECNICA_TIREOIDE =
  "Estudo ultrassonográfico da tireoide realizado em modo bidimensional, usando-se transdutor linear multifrequencial, em contato com a pele.\nVarreduras da glândula realizadas em sentidos longitudinal e transverso.\nOs seguintes aspectos foram observados:";

const TECNICA_CERVICAL =
  "Estudo ultrassonográfico da Região Cervical realizado em modo bidimensional, usando-se transdutor linear multifrequencial, em contato com a pele.\nVarreduras da glândula realizadas em sentidos longitudinal e transverso.\nOs seguintes aspectos foram observados:";

const TECNICA_TESTICULOS =
  "Exame realizado em modo bidimensional, com equipamento dinâmico linear multifrequencial.\nForam feitas varreduras nos sentidos transversal, longitudinal e oblíquos.";

const TECNICA_TESTICULOS_DOPPLER =
  "\nEstudo complementado com Doppler colorido para avaliação da vascularização testicular e do plexo pampiniforme.";

function tecnicaBolsaTesticular(comDoppler: boolean): string {
  return TECNICA_TESTICULOS + (comDoppler ? TECNICA_TESTICULOS_DOPPLER : "");
}

function adaptarLadoBolsa(op: Opcao, lado: string, ladoFem: string): Opcao {
  const repl = (s: string) =>
    s
      .replace(/direita\/esquerda\/bilateral/gi, ladoFem)
      .replace(/à direita\/esquerda/gi, `à ${ladoFem}`)
      .replace(/direita\/esquerda/gi, ladoFem)
      .replace(/direito\/esquerdo/gi, lado);
  return {
    ...op,
    texto: repl(op.texto),
    impressao: op.impressao ? repl(op.impressao) : op.impressao,
  };
}

function secaoTesticuloBolsa(
  id: "testiculo-direito" | "testiculo-esquerdo",
  titulo: string,
  comDoppler = false,
): Secao {
  const lado = id === "testiculo-esquerdo" ? "esquerdo" : "direito";
  const ladoFem = id === "testiculo-esquerdo" ? "esquerda" : "direita";
  const dim =
    "Com forma, dimensões e contornos normais, medindo ____ x ____ x ____ cm (volume de ____ cm³).";
  const parenHomo =
    "Parênquima testicular com ecotextura homogênea, normo-ecogênico";
  const dopplerVasc = comDoppler
    ? "\nDistribuição normal da vascularização parenquimatosa ao Doppler colorido, com picos de velocidade sistólica e diastólica dentro dos parâmetros da normalidade."
    : "";

  const idsDopplerOnly = new Set(["orquite", "torcao-testicular"]);

  const opcoesBase: Opcao[] = [
    {
      id: "homogeneo",
      label: "Homogêneo",
      texto: `${dim}\n${parenHomo}.${dopplerVasc}`,
    },
    {
      id: "heterogeneo",
      label: "Heterogêneo",
      texto: `${dim}\nParênquima testicular com ecotextura difusamente heterogênea.${dopplerVasc}`,
      impressao: `Sinais sugestivos de heterogenicidade do parênquima testicular à ${ladoFem}.`,
    },
  ];

  const extras = mergeOpcoes([], "bolsa::testiculo")
    .filter((op) => comDoppler || !idsDopplerOnly.has(op.id))
    .map((op) => {
      if (op.id === "orquite") {
        return {
          ...op,
          texto: `${dim}\nParênquima testicular com ecotextura heterogênea, dimensões aumentadas e hiperemia parenquimatosa ao Doppler colorido, aspectos sugestivos de orquite.`,
        };
      }
      if (op.id === "torcao-testicular") {
        return {
          ...op,
          texto: `${dim}\nTestículo com parênquima heterogêneo/hipoecogênico em relação ao contralateral. Ausência de fluxo vascular parenquimatoso ao Doppler colorido, aspectos sugestivos de torção testicular.`,
        };
      }
      return {
        ...op,
        texto: `${dim}\n${parenHomo}, exceto por:\n${op.texto.trim()}.`,
      };
    });

  return {
    id,
    titulo,
    tipo: "multiplo",
    padrao: "homogeneo",
    opcoes: [...opcoesBase, ...extras].map((op) =>
      adaptarLadoBolsa(op, lado, ladoFem),
    ),
  };
}

function secaoEpididimoBolsa(
  id: "epididimo-direito" | "epididimo-esquerdo",
  titulo: string,
  comDoppler = false,
): Secao {
  const lado = id === "epididimo-esquerdo" ? "esquerdo" : "direito";
  const ladoFem = id === "epididimo-esquerdo" ? "esquerda" : "direita";

  const opcoes = mergeOpcoes(
    [
      {
        id: "normal",
        label: "Normal",
        texto:
          "Com configuração, diâmetros e textura normais.",
      },
    ],
    "bolsa::epididimo",
  )
    .filter((op) => comDoppler || op.id !== "epididimite")
    .map((op) => {
      if (op.id === "epididimite") {
        return {
          ...op,
          texto:
            "Epidídimo de dimensões aumentadas, com ecotextura heterogênea e hiperemia ao Doppler colorido, aspectos sugestivos de epididimite.",
        };
      }
      return op;
    })
    .map((op) => adaptarLadoBolsa(op, lado, ladoFem));

  return {
    id,
    titulo,
    tipo: "multiplo",
    padrao: "normal",
    opcoes,
  };
}

function secaoBolsaEscrotalLado(
  id: "bolsa-direita" | "bolsa-esquerda",
  titulo: string,
): Secao {
  const lado = id === "bolsa-esquerda" ? "esquerdo" : "direito";
  const ladoFem = id === "bolsa-esquerda" ? "esquerda" : "direita";

  return {
    id,
    titulo,
    tipo: "multiplo",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
        {
          id: "normal",
          label: "Normal",
          texto:
            "Paredes regulares e de espessura normal.\nAusência de sinais de hidrocele.",
        },
      ],
      "bolsa::bolsa",
    ).map((op) => adaptarLadoBolsa(op, lado, ladoFem)),
  };
}

function secaoPlexoPampiniforme(
  id: "plexo-direito" | "plexo-esquerdo",
  titulo: string,
): Secao {
  const lado = id === "plexo-esquerdo" ? "esquerdo" : "direito";
  const ladoFem = id === "plexo-esquerdo" ? "esquerda" : "direita";

  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
        {
          id: "normal",
          label: "Sem varicocele",
          texto:
            "Sem dilatação significativa dos vasos do plexo pampiniforme. Ausência de refluxo à manobra de Valsalva no Doppler colorido.",
        },
      ],
      "bolsa::plexo",
    ).map((op) => adaptarLadoBolsa(op, lado, ladoFem)),
  };
}

function secoesBolsaTesticular(comDoppler = false): Secao[] {
  const secoes: Secao[] = [
    secaoTesticuloBolsa("testiculo-direito", "TESTÍCULO DIREITO", comDoppler),
    secaoTesticuloBolsa("testiculo-esquerdo", "TESTÍCULO ESQUERDO", comDoppler),
    secaoEpididimoBolsa("epididimo-direito", "EPIDÍDIMO DIREITO", comDoppler),
    secaoEpididimoBolsa("epididimo-esquerdo", "EPIDÍDIMO ESQUERDO", comDoppler),
    secaoBolsaEscrotalLado("bolsa-direita", "BOLSA TESTICULAR DIREITA"),
    secaoBolsaEscrotalLado("bolsa-esquerda", "BOLSA TESTICULAR ESQUERDA"),
  ];
  if (comDoppler) {
    secoes.push(
      secaoPlexoPampiniforme("plexo-direito", "PLEXO PAMPINIFORME DIREITO"),
      secaoPlexoPampiniforme("plexo-esquerdo", "PLEXO PAMPINIFORME ESQUERDO"),
    );
  }
  return secoes;
}


const TECNICA_PELVICA_TV =
  "Exame realizado em modo bidimensional, com transdutor endocavitário multifrequencial por via transvaginal.";

const TECNICA_INGUINAL_BASE =
  "Exame realizado com transdutor linear de alta frequência, com varredura dinâmica em modo B, utilizando manobras de Valsalva e tosse para avaliação de potenciais defeitos herniários.";

const TECNICA_INGUINAL_DOPPLER =
  " Estudo complementado com Doppler colorido para diferenciação de estruturas vasculares e avaliação de fluxos.";

const TEXTO_INGUINAL_VASCULAR =
  "Estruturas Vasculares: Veias femorais e artérias femorais com trajetos e calibres habituais. Ausência de sinais de trombose venosa profunda ou varicosidades safeno-femorais patológicas.";

const IDS_PATOLOGIAS_INGUINAL_VASCULARES = new Set([
  "varicosidades",
  "aneurisma-pseudoaneurisma",
]);

function textoInguinalNormal(comDoppler: boolean): string {
  const linhas = [
    "Canal Inguinal: Canais inguinais com trajetos preservados. Não se observam coleções, formações expansivas ou alterações da ecotextura dos planos musculares e aponeuróticos nesta topografia.",
    "Orifício Miopectíneo de Fruchaud: Ausência de protusões, imagens saculares ou falhas fasciais durante as manobras de esforço (Valsalva).",
  ];
  if (comDoppler) linhas.push(TEXTO_INGUINAL_VASCULAR);
  linhas.push(
    "Linfonodos: Ausência de linfonodomegalias significativas; linfonodos visualizados apresentam morfologia habitual, com hilo gorduroso preservado e dimensões dentro da normalidade.",
  );
  return linhas.join("\n");
}

function secaoInguinal(
  id: "inguinal-direita" | "inguinal-esquerda",
  titulo: string,
  comDoppler = false,
): Secao {
  const ladoFem = id === "inguinal-esquerda" ? "esquerda" : "direita";

  function adaptarLado(op: Opcao): Opcao {
    const repl = (s: string) =>
      s
        .replace(/direita\/esquerda\/bilateral/gi, ladoFem)
        .replace(/à direita\/esquerda/gi, `à ${ladoFem}`)
        .replace(/direita\/esquerda/gi, ladoFem)
        .replace(/direito\/esquerdo/gi, id === "inguinal-esquerda" ? "esquerdo" : "direito");
    return {
      ...op,
      texto: repl(op.texto),
      impressao: op.impressao ? repl(op.impressao) : op.impressao,
    };
  }

  const opcoes = mergeOpcoes(
    [
      {
        id: "normal",
        label: "Normal",
        texto: textoInguinalNormal(comDoppler),
      },
    ],
    "regiao-inguinal::achados",
  )
    .filter((op) => comDoppler || !IDS_PATOLOGIAS_INGUINAL_VASCULARES.has(op.id))
    .map(adaptarLado);

  return {
    id,
    titulo,
    tipo: "multiplo",
    padrao: "normal",
    opcoes,
  };
}

function tecnicaInguinal(comDoppler: boolean): string {
  return (
    TECNICA_INGUINAL_BASE + (comDoppler ? TECNICA_INGUINAL_DOPPLER : "")
  );
}

function impressaoPadraoInguinal(comDoppler: boolean): string {
  const base =
    "Exame ultrassonográfico das regiões inguinais direita e esquerda sem evidências de hérnias da parede abdominal (inguinais ou femorais) em repouso ou sob manobras de esforço.";
  if (comDoppler) {
    return `${base}\n\nEstruturas vasculares e linfonodais com aspecto ultrassonográfico habitual.`;
  }
  return `${base}\n\nEstruturas linfonodais com aspecto ultrassonográfico habitual.`;
}

const TECNICA_PARTES_MOLES =
  "Transdutor: Linear de alta frequência (9 - 18 MHz).\n\nExame realizado com variação dinâmica de frequência (modo B), associado ao estudo com Doppler Colorido e Power Doppler, com varreduras multiplanares (cortes longitudinais e transversais) de toda a extensão da região anatômica em questão, incluindo manobras de compressão e estudo comparativo com o antímero contralateral, quando aplicável.";

function secoesPartesMoles(): Secao[] {
  return [
    {
      id: "cutaneo",
      titulo: "1. PLANO CUTÂNEO E SUBCUTÂNEO",
      tipo: "unico",
      padrao: "normal",
      opcoes: mergeOpcoes(
        [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Pele e derme: Espessura preservada, com ecogenicidade habitual. Ausência de espessamentos focais ou soluções de continuidade.\nTecido celular subcutâneo: Mantém sua arquitetura habitual, caracterizada por trabeculações fibrogordurosas de permeio, sem evidências de coleções líquidas, áreas de fibrose cicatricial, corpos estranhos radiopacos ou lesões focais sólidas/císticas. Ausência de edema difuso (sinais de celulite/paniculite).",
          },
          {
            id: "cisto-abscesso",
            label: "Coleção / abscesso",
            texto:
              "Pele e derme com espessura alterada na topografia da lesão.\nNota-se imagem cística de contornos irregulares/lobulados, com traves e moderados debris de permeio, sugerindo coleção cístico-espessa, medindo ____ x ____ x ____ cm, distando ____ cm da pele. Observa-se borramento dos planos adiposos adjacentes, sugerindo processo inflamatório/infeccioso.",
          },
          {
            id: "lipoma",
            label: "Nódulo / lipoma",
            texto:
              "Pele e derme: Espessura preservada.\nNota-se imagem nodular de contornos regulares/lobulados, expansiva, isoecogênica/hipoecogênica ao tecido adiposo, medindo ____ x ____ x ____ cm, distando ____ cm da pele, compatível com lipoma.",
          },
        ],
        "partes-moles::achados",
      ),
    },
    {
      id: "fascia",
      titulo: "2. FÁSCIA SUPERFICIAL E PROFUNDA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "Aponeuroses e planos fasciais: Planos deslizantes íntegros, sem espessamentos anômalos, descontinuidades ou coleções líquidas interfasciais. Espaços virtuais com manutenção de sua ecogenicidade habitual.",
        },
      ],
    },
    {
      id: "musculatura",
      titulo: "3. MUSCULATURA ESQUELÉTICA DA REGIÃO",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "Arquitetura fascicular: Padrão arquitetural preservado, evidenciando o clássico aspecto penado/fusiforme aos cortes longitudinais e \"céu estrelado\" aos cortes transversais.\nEcocontraste e ecogenicidade: Fibras musculares com ecogenicidade homogênea, sem áreas de rotura parcial ou total (ausência de soluções de continuidade miofasciais ou gaps fibrilares).\nDinâmica contrátil: Contração muscular preservada ao estudo dinâmico, sem hérnias musculares através da fáscia profunda. Ausência de hematomas (intra ou interfasciais), calcificações heterotópicas ou áreas de miosite ossificante.",
        },
        {
          id: "rotura",
          label: "Rotura muscular",
          texto:
            "Arquitetura fascicular alterada.\nIdentifica-se solução de continuidade miofascial / gap fibrilar, compatível com rotura parcial/total, medindo ____ cm, com/sem hematoma associado.",
          impressao:
            "Imagem sugestiva de rotura muscular na região {{REGIAO}}.",
        },
      ],
    },
    {
      id: "vasos-nervos",
      titulo: "4. ELEMENTOS VASCULARES E NERVOSOS SUPERFICIAIS",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "Vasos sanguíneos (artérias e veias): Calibre, trajeto e paredes preservados. Ao estudo com Doppler Colorido e Espectral, observa-se fluxo pérvio, sem sinais de trombose luminal, recanalizações ou aneurismas/pseudoaneurismas. Ausência de malformações arteriovenosas ou fístulas de alto débito.\nTroncos nervosos visíveis: Calibre e ecotextura usuais, com feixes fasciculares normoecogênicos e limites nítidos, sem sinais de neuroma, espessamentos focais ou compressões extrínsecas.",
        },
      ],
    },
    {
      id: "osseo",
      titulo: "5. ARCABOUÇO ÓSSEO SUBJACENTE (CORTICAIS)",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto:
            "Superfícies ósseas acessíveis: Contornos regulares, contínuos e bem definidos, sem evidências de soluções de continuidade (fraturas), osteófitos marginais, erosões corticais ou reações periósticas.",
        },
      ],
    },
    {
      id: "doppler",
      titulo: "ESTUDO COM DOPPLER COLORIDO",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Sem hiperemia",
          texto:
            "Ausência de hiperemia focal ou difusa nos tecidos avaliados. Vascularização de padrão fisiológico ao repouso, sem aumento patológico da resistência vascular regional ou shunts arteriovenosos.",
        },
        {
          id: "hiperemia",
          label: "Hiperemia",
          texto:
            "Nota-se hiperemia focal/difusa ao Doppler Colorido na topografia da alteração descrita, sugerindo processo inflamatório ativo.",
          impressao:
            "Sinais sugestivos de hiperemia tecidual na região {{REGIAO}}.",
        },
      ],
    },
  ];
}

function opcaoCalculoVesical(): Opcao {
  return {
    id: "calculo",
    label: "Cálculo vesical",
    texto:
      "Contendo imagem calculosa móvel com sombra acústica posterior, medindo ____ cm.",
    impressao: "Imagem sugestiva de cálculo(s) vesical(is).",
  };
}

function secaoFigadoAbdome(): Secao {
  return {
    id: "figado",
    titulo: "FÍGADO",
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
      {
        id: "normal",
        label: "Normal",
        texto:
          "Com situação, forma, contornos e dimensões normais.\nParênquima hepático com textura uniforme, sem alterações de ecogenicidade.\nEstruturas vasculares intra-hepáticas e tronco da veia porta de características normais.\nHilo hepático de aspecto normal.",
      },
      {
        id: "esteatose-leve",
        label: "Esteatose leve",
        texto:
          "Com situação, forma, contornos e dimensões normais.\nParênquima hepático com aumento difuso e discreto da ecogenicidade, sugestivo de esteatose hepática leve.\nEstruturas vasculares intra-hepáticas e tronco da veia porta de características normais.\nAusência de lesões focais.",
      },
      {
        id: "esteatose-moderada",
        label: "Esteatose moderada",
        texto:
          "Com situação, forma e contornos preservados, dimensões normais a discretamente aumentadas.\nParênquima hepático com aumento difuso e moderado da ecogenicidade, atenuando parcialmente a visualização do diafragma e dos vasos hepáticos, sugestivo de esteatose hepática moderada.\nAusência de lesões focais.",
      },
      {
        id: "esteatose-acentuada",
        label: "Esteatose acentuada",
        texto:
          "Aumentado de volume, contornos regulares.\nParênquima hepático com acentuado aumento difuso da ecogenicidade, dificultando a visualização do diafragma e dos vasos hepáticos, sugestivo de esteatose hepática acentuada.\nAusência de lesões focais identificáveis.",
      },
      {
        id: "cisto",
        label: "Cisto simples",
        texto:
          "Com situação, forma, contornos e dimensões normais.\nParênquima hepático com textura uniforme.\nIdentifica-se imagem cística anecoica, de paredes finas e reforço acústico posterior, sem septos ou vegetações, compatível com cisto hepático simples, localizado em {{LOCAL}}, medindo ____ cm.",
      },
      {
        id: "nodulo",
        label: "Nódulo",
        texto:
          "Com situação, forma, contornos e dimensões normais.\nParênquima hepático com textura uniforme.\nIdentifica-se formação nodular sólida, hipoecogênica/isoecogênica/hiperecogênica, de contornos regulares/irregulares, localizada em {{LOCAL}}, medindo ____ cm.\nEstruturas vasculares intra-hepáticas e tronco da veia porta de características normais.\nHilo hepático de aspecto normal.",
      },
      {
        id: "hepatomegalia",
        label: "Hepatomegalia sem esteatose",
        texto:
          "Aumentado de volume, contornos regulares e ecotextura homogênea.\nAusência de lesões focais.",
      },
    ],
      "abdome::figado",
    ),
  };
}

function secaoVesicula(): Secao {
  return {
    id: "vesicula",
    titulo: "VES. BILIAR",
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
      {
        id: "normal",
        label: "Normal",
        texto:
          "De paredes normo-espessas e contornos regulares.\nNão se constata a presença de sedimento biliar patológico.",
      },
      {
        id: "calculo",
        label: "Colelitíase",
        texto:
          "De paredes normo-espessas e contornos regulares.\nContendo cálculo(s) com sombra acústica posterior, medindo ____ cm.",
      },
      {
        id: "lama",
        label: "Lama biliar",
        texto:
          "De paredes normo-espessas e contornos regulares.\nContendo lama / sedimento biliar em seu interior.",
      },
      {
        id: "colecistite",
        label: "Sinais de colecistite",
        texto:
          "De paredes espessadas e edema mural, contendo cálculo(s), com sinal de Murphy ultrassonográfico positivo, aspectos sugestivos de colecistite aguda.",
      },
      {
        id: "polipo",
        label: "Pólipo",
        texto:
          "De paredes normo-espessas, evidenciando imagem parietal fixa, sem sombra acústica, compatível com pólipo, medindo ____ cm.",
      },
    ],
      "abdome::vesicula",
    ),
  };
}

function secaoViasBiliares(): Secao {
  return {
    id: "vias-biliares",
    titulo: "VIAS BILIARES",
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
      {
        id: "normal",
        label: "Normais",
        texto:
          "Aspecto habitual da árvore biliar intra-hepática.\nHepato-colédoco com diâmetro normal{{HC}}.",
      },
      {
        id: "dilatadas",
        label: "Dilatadas",
        texto:
          "Vias biliares intra e/ou extra-hepáticas dilatadas.\nDilatação do ducto colédoco{{HC}}.",
      },
    ],
      "abdome::vias-biliares",
    ),
  };
}

function secaoPancreas(): Secao {
  return {
    id: "pancreas",
    titulo: "PÂNCREAS",
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
      {
        id: "normal",
        label: "Normal",
        texto:
          "Com forma, contornos e espessura normais.\nParênquima com textura uniforme, normo-ecogênico.",
      },
      {
        id: "parcial",
        label: "Visualização parcial",
        texto:
          "Parcialmente visibilizado. Cabeça e corpo pancreáticos de topografia, morfologia, dimensões e ecotextura habituais.",
      },
      {
        id: "nao-visto",
        label: "Não visualizado",
        texto:
          "Mal caracterizado no presente estudo devido à interposição gasosa de alças intestinais.",
      },
    ],
      "abdome::pancreas",
    ),
  };
}

function secaoBaco(): Secao {
  return {
    id: "baco",
    titulo: "BAÇO",
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
      {
        id: "normal",
        label: "Normal",
        texto: "Ausência de esplenomegalia. Ecotextura esplênica normal.",
      },
      {
        id: "esplenomegalia",
        label: "Esplenomegalia",
        texto:
          "Aumentado de volume, contornos regulares e ecotextura homogênea. Ausência de lesões focais.\n{{INDICE_ESPLENICO}}",
      },
      {
        id: "cisto",
        label: "Cisto(s)",
        texto:
          "Ecotextura esplênica habitual, evidenciando cisto(s) esplênico(s) simples, medindo ____ cm.",
      },
      {
        id: "nodulo",
        label: "Nódulo(s)",
        texto:
          "Ecotextura esplênica habitual, evidenciando formação(ões) nodular(es) esplênica(s), medindo ____ cm.",
      },
    ],
      "abdome::baco",
    ),
  };
}

function secaoIntestinoAbdome(): Secao {
  return {
    id: "intestino",
    titulo: "INTESTINO / MESENTÉRIO",
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
        {
          id: "normal",
          label: "Sem alterações focais",
          texto:
            "Não se caracterizam sinais de apendicite, intussuscepção ou espessamento parietal significativo de alças no campo do exame.",
        },
      ],
      "abdome::intestino",
    ),
  };
}

/** Seção genérica a partir do catálogo PDF */
function secaoCatalogo(
  id: string,
  titulo: string,
  catalogKey: string,
  normalTexto: string,
  normalLabel = "Normal",
): Secao {
  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [{ id: "normal", label: normalLabel, texto: normalTexto }],
      catalogKey,
    ),
  };
}

function opcoesHidronefroseSfu(comMedidasRim = false): Opcao[] {
  const intro = comMedidasRim
    ? "Em situação tópica, com forma e contornos normais, medindo ____ cm.\n"
    : "Em situações tópicas.\n";
  return [
    {
      id: "hidronefrose-grau-1",
      label: "Hidronefrose grau I",
      texto: `${intro}Pelve renal levemente dilatada, compatível com hidronefrose grau I. Cálices sem dilatação significativa.`,
      impressao: "Imagem sugestiva de hidronefrose grau I.",
    },
    {
      id: "hidronefrose-grau-2",
      label: "Hidronefrose grau II",
      texto: `${intro}Pelve e alguns cálices maiores dilatados, compatível com hidronefrose grau II. Sem afinamento cortical óbvio.`,
      impressao: "Imagem sugestiva de hidronefrose grau II.",
    },
    {
      id: "hidronefrose-grau-3",
      label: "Hidronefrose grau III",
      texto: `${intro}Pelve e todos os cálices dilatados, sem afinamento cortical óbvio, compatível com hidronefrose grau III.`,
      impressao: "Imagem sugestiva de hidronefrose grau III.",
    },
    {
      id: "hidronefrose-grau-4",
      label: "Hidronefrose grau IV",
      texto: `${intro}Dilatação grave do sistema coletor com afinamento cortical evidente (atrofia), compatível com hidronefrose grau IV.`,
      impressao: "Imagem sugestiva de hidronefrose grau IV.",
    },
  ];
}

function secaoRim(id: string, titulo: string): Secao {
  const lado = id === "rim-esquerdo" ? "esquerdo" : "direito";
  const ladoFem = id === "rim-esquerdo" ? "esquerda" : "direita";

  function adaptarLado(op: Opcao): Opcao {
    const repl = (s: string) =>
      s
        .replace(/direita\/esquerda\/bilateral/gi, ladoFem)
        .replace(/direito\/esquerdo\/bilateral/gi, lado)
        .replace(/à direita\/esquerda/gi, `à ${ladoFem}`)
        .replace(/direita\/esquerda/gi, ladoFem)
        .replace(/direito\/esquerdo/gi, lado)
        .replace(/Rim direito\/esquerdo/gi, `Rim ${lado}`)
        .replace(/rim direito\/esquerdo/gi, `rim ${lado}`);
    return {
      ...op,
      texto: repl(op.texto),
      impressao: op.impressao ? repl(op.impressao) : op.impressao,
    };
  }

  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
        {
          id: "normal",
          label: "Normal",
          texto:
            "Em situação tópica, com forma e contornos normais, medindo ____ cm.\nEspessura cortical de ____ cm.\nParênquima renal com espessura uniforme, normal, sem alterações ecotexturais.\nComplexo ecogênico central, que representa as estruturas do seio renal com distribuição e ecogenicidade normais.\nAusência de massa ou coleção renal ou perirrenal.\nNão se notam imagens calculosas.",
        },
        {
          id: "cisto",
          label: "Cisto(s)",
          texto: `Em situação tópica, com forma e contornos normais, medindo ____ cm.\nEspessura cortical de ____ cm.\nIdentifica-se cisto(s) renal(is) simples no rim ${lado}.\nComplexo ecogênico central com distribuição e ecogenicidade normais.\nNão se notam imagens calculosas.`,
          impressao: `Imagem sugestiva de cisto(s) renal(is) à ${ladoFem}.`,
        },
        {
          id: "litíase",
          label: "Litíase",
          texto: `Em situação tópica, com forma e contornos normais, medindo ____ cm.\nEvidencia-se cálculo(s) com sombra acústica posterior no rim ${lado}.\nSistemas pielocalicinais sem dilatação significativa.`,
          impressao: `Imagem sugestiva de litíase renal à ${ladoFem}.`,
        },
        ...opcoesHidronefroseSfu(true).map((op) => ({
          ...op,
          impressao: op.impressao
            ? op.impressao.replace(/\.$/, ` à ${ladoFem}.`)
            : `Imagem sugestiva de hidronefrose à ${ladoFem}.`,
        })),
      ],
      "renal::rins",
    ).map(adaptarLado),
  };
}

function secaoMama(
  id: string,
  titulo: string,
  comDoppler = false,
): Secao {
  const dopplerExtra = comDoppler
    ? "\nAs demais regiões das mamas apresentam distribuição normal da vascularização com picos de velocidade sistólica e diastólica dentro dos parâmetros da normalidade."
    : "";
  const ecoMisto =
    "Ecotextura homogênea de fundo, com tecido mamário entremeado por tecido gorduroso.";
  const envelope =
    "Envelope cutâneo, complexo aréolo-papilar e tecido subcutâneo de aspectos ecográficos habituais.";
  const espaco = "Espaço retro mamário normal.";

  function comQuadroMama(op: Opcao): Opcao {
    if (op.id === "gorduroso" || op.id === "fibroglandular") return op;
    if (op.texto.includes(ecoMisto)) return op;
    let t = op.texto.trim();
    if (t.includes("Espaço retro mamário")) {
      t = t.replace(
        /Espaço retro mamário normal\.?/i,
        `${ecoMisto}\n${espaco}`,
      );
    } else if (/Envelope cutâneo/i.test(t)) {
      t = `${t}\n${ecoMisto}\n${espaco}`;
    } else {
      t = `${envelope}\n${t}\n${ecoMisto}\n${espaco}${dopplerExtra}`;
    }
    return { ...op, texto: t };
  }

  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
        {
          id: "normal",
          label: "Normal (3C)",
          texto: `${envelope}\nNão há evidência de nódulo ou massa de caráter sólido, cístico ou complexo.\n${ecoMisto}\n${espaco}${dopplerExtra}`,
        },
        {
          id: "gorduroso",
          label: "Padrão 3A (gorduroso)",
          texto: `${envelope}\nNão há evidência de nódulo ou massa de caráter sólido, cístico ou complexo.\nEcotextura homogênea de fundo, com predomínio do tecido gorduroso.\n${espaco}`,
        },
        {
          id: "fibroglandular",
          label: "Padrão 3B (fibroglandular)",
          texto: `${envelope}\nNão há evidência de nódulo ou massa de caráter sólido, cístico ou complexo.\nEcotextura homogênea de fundo, com predomínio do tecido fibroglandular.\n${espaco}`,
        },
        {
          id: "cisto",
          label: "Cisto",
          texto: `${envelope}\nCisto. Presença de imagem anecóica de contornos regulares e bordos finos, bem circunscrito, de orientação paralela à pele, medindo cerca de ____ cm, distante ____ cm da pele e ____ cm da região areolar, localizada em Q____ às ____ h.\n${ecoMisto}\n${espaco}`,
        },
        {
          id: "nodulo",
          label: "Nódulo",
          texto: `${envelope}\nNódulo. Presença de imagem sólida isoecogênica / hipoecogênica / hiperecogênica de contornos regulares / parcialmente precisos e bordos finos, bem circunscrito, de orientação paralela à pele, medindo cerca de ____ cm, distante ____ cm da pele e ____ cm da região areolar, localizada em Q____ às ____ h.\n${ecoMisto}\n${espaco}`,
        },
      ],
      "mama::achados",
    ).map(comQuadroMama),
  };
}

function secaoBirads(): Secao {
  return {
    id: "birads",
    titulo: "CLASSIFICAÇÃO",
    tipo: "unico",
    padrao: "1",
    opcoes: [
      {
        id: "1",
        label: "BI-RADS 1",
        texto: "CLASSIFICAÇÃO: BI-RADS ultrassonográfico 1.",
      },
      {
        id: "2",
        label: "BI-RADS 2",
        texto: "CLASSIFICAÇÃO: BI-RADS ultrassonográfico 2.",
      },
      {
        id: "3",
        label: "BI-RADS 3",
        texto: "CLASSIFICAÇÃO: BI-RADS ultrassonográfico 3.",
      },
      {
        id: "4",
        label: "BI-RADS 4",
        texto: "CLASSIFICAÇÃO: BI-RADS ultrassonográfico 4.",
      },
      {
        id: "5",
        label: "BI-RADS 5",
        texto: "CLASSIFICAÇÃO: BI-RADS ultrassonográfico 5.",
      },
    ],
  };
}

function secaoMamaMasculino(id: string, titulo: string): Secao {
  const pele =
    "Pele e tecido subcutâneo: Espessura preservada, sem evidência de retrações, espessamentos cutâneos difusos ou coleções líquidas no tecido adiposo subcutâneo.";
  const cap =
    "Complexo aréolo-papilar (CAP): Eixo papilar preservado, sem abaulamentos ou distorções arquiteturais retroareolares patológicas.";
  const parenquimaSemNodulos =
    "Parênquima mamário retroareolar e quadrantes:\n\nAusência de nódulos sólidos ou císticos suspeitos.";
  /** Só entra no laudo quando a patologia Ginecomastia está marcada (avaliação sob suspeita). */
  const avaliacaoGlandula =
    "Avaliação da glândula/gordura: Espessura do tecido fibroglandular retroareolar com espessamento e hiperplasia (medindo aproximadamente ____ mm de espessura sagital), apresentando ecogenicidade habitual, homogênea, sem evidência de proliferação ductal ectásica ou componente nodular misto difuso.";

  function nodulo(
    idOp: string,
    label: string,
    caracteristica: string,
  ): Opcao {
    return {
      id: idOp,
      label,
      texto: `${pele}\n${cap}\nParênquima mamário retroareolar e quadrantes:\n\nPresença de imagem nodular sólida de características ultrassonográficas ${caracteristica}, localizada às ____ h, distando ____ cm da papila, medindo ____ x ____ x ____ cm, com orientação ____ em relação à pele, limites/margens ____, forma ____, ecogenicidade ____, padrão eco-textural interno ____, sombra acústica posterior / reforço ____, vascularização ao Doppler ____.`,
      impressao: `Presença de imagem nodular sólida de características ultrassonográficas ${caracteristica}, correlacionando-se com a classificação BI-RADS®.`,
    };
  }

  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: [
      {
        id: "normal",
        label: "Normal",
        texto: `${pele}\n${cap}\n${parenquimaSemNodulos}`,
      },
      {
        id: "ginecomastia",
        label: "Ginecomastia",
        texto: `${pele}\n${cap}\n${parenquimaSemNodulos}\n\n${avaliacaoGlandula}`,
        impressao:
          "Achados ultrassonográficos compatíveis com ginecomastia ({{GINECO_LADO}}), caracterizada pelo espessamento e hiperplasia do tecido fibroglandular retroareolar (fase {{GINECO_FASE}}).",
      },
      nodulo("nodulo-benigno", "Nódulo sólido (benigno)", "benignas"),
      nodulo(
        "nodulo-indeterminado",
        "Nódulo sólido (indeterminado)",
        "indeterminadas",
      ),
      nodulo("nodulo-suspeito", "Nódulo sólido (suspeito)", "suspeitas"),
    ],
  };
}

function secaoAxila(id: string, titulo: string, comDoppler = false): Secao {
  const dopplerExtra = comDoppler
    ? "\nAs demais regiões axilares apresentam distribuição normal da vascularização com picos de velocidade sistólica e diastólica dentro dos parâmetros da normalidade."
    : "";
  const ladoFem = id === "axila-esquerda" ? "esquerda" : "direita";

  function adaptar(op: Opcao): Opcao {
    const repl = (s: string) =>
      s
        .replace(/à direita\/esquerda/gi, `à ${ladoFem}`)
        .replace(/direita\/esquerda/gi, ladoFem);
    return {
      ...op,
      texto: repl(op.texto),
      impressao: op.impressao ? repl(op.impressao) : op.impressao,
    };
  }

  return {
    id,
    titulo,
    tipo: "multiplo",
    padrao: "normal",
    opcoes: mergeOpcoes(
      [
        {
          id: "normal",
          label: "Normal",
          texto:
            `Pele e tecido subcutâneo de espessura conservada.\nMusculatura de aspecto ecográfico normal.\nNão há evidência de nódulo ou massa de caráter sólido, cístico ou complexo.\nLinfonodos axilares identificados no exame de aspecto habitual (morfologia ovalada, hilo gorduroso preservado).${dopplerExtra}`,
        },
        {
          id: "fibroglandular",
          label: "Tecido fibroglandular",
          texto:
            "Pele e tecido subcutâneo de espessura conservada.\nPresença de tecido fibroglandular em região axilar.\nMusculatura de aspecto ecográfico normal.\nNão há evidência de nódulo ou massa de caráter sólido, cístico ou complexo.\nLinfonodos axilares identificados no exame de aspecto habitual.",
        },
      ],
      "axilas::achados",
    )
      .filter((op) => comDoppler || op.id !== "trombose-veia-axilar")
      .map(adaptar),
  };
}

function secaoEndometrioTv(): Secao {
  return {
    id: "endometrio",
    titulo: "ENDOMÉTRIO",
    tipo: "multiplo",
    padrao: "endometrio-normal",
    opcoes: [
      {
        id: "endometrio-normal",
        label: "Normal",
        texto:
          "Eco endometrial com espessura de ____ mm (normal máximo até 16 mm na menacme / correlacionar com fase do ciclo e menopausa).",
      },
      {
        id: "diu-bem-posicionado",
        label: "DIU bem posicionado",
        texto:
          "Dispositivo intrauterino (DIU) em situação tópica, bem posicionado na cavidade uterina.\nEco endometrial com espessura de ____ mm.",
        impressao:
          "Dispositivo intrauterino (DIU) bem posicionado na cavidade uterina.",
      },
      {
        id: "diu-mal-posicionado",
        label: "DIU mal posicionado",
        texto:
          "Dispositivo intrauterino (DIU) em situação ectópica/deslocada (____).\nEco endometrial com espessura de ____ mm.",
        impressao:
          "Imagem sugestiva de dispositivo intrauterino (DIU) mal posicionado.",
      },
      {
        id: "polipo-endometrial",
        label: "Pólipo endometrial",
        texto:
          "Cavidade uterina apresentando imagem nodular hiperecogênica, de aspecto polipoide, em continuidade com a camada basal do endométrio, medindo ____ mm.\nEco endometrial com espessura de ____ mm.",
        impressao: "Imagem sugestiva de pólipo endometrial.",
      },
    ],
  };
}

function secoesLoboTireoide(
  id: string,
  titulo: string,
  comDoppler = false,
): Secao {
  const classif = comDoppler
    ? ", com IR {{IR}}, IP {{IP}} e Vel. {{VEL}} cm/s (LAGALLA {{LAGALLA}}, CHAMMAS {{CHAMMAS}}, {{TIRADS}})"
    : " ({{TIRADS}})";
  const dim = "____ x ____ x ____ cm (volume de ____ cm³).";
  const parenUniforme =
    "Parênquima tireoidiano com ecotextura uniforme, sem alterações de ecogenicidade";
  const parenHetero =
    "Parênquima tireoidiano com ecotextura difusamente heterogênea";
  const semLesoes =
    "Não há evidências de lesões parenquimatosas de caráter focal ou difuso, bem como calcificações patológicas.";

  const opcoes: Opcao[] = [
    {
      id: "normal",
      label: "Normal",
      texto: `${dim}\n${parenUniforme}.\n${semLesoes}`,
    },
    {
      id: "heterogeneo",
      label: "Heterogêneo difuso",
      texto: `${dim}\n${parenHetero}.\n${semLesoes}`,
      impressao:
        "Imagem sugestiva de tireoide difusamente heterogênea. Considerar possibilidade de tireoidopatia de Hashimoto.",
    },
    {
      id: "nodulo",
      label: "Nódulo",
      texto: `${dim}\n${parenUniforme}, exceto por:\nFormação nodular hipoecogênica de contornos regulares e bordos finos e limites parcialmente precisos, orientação paralela à pele medindo ____ x ____ x ____ cm, relacionada ao terço inferior/médio/superior do lobo${classif}.`,
      impressao:
        "Imagem sugestiva de nódulo(s) tireoidiano(s) com características descritas no corpo do texto.",
    },
    {
      id: "espongiforme",
      label: "Nódulo espongiforme",
      texto: `${dim}\n${parenUniforme}, exceto por:\nNódulo espongiforme: Formação nodular mista, de aspecto espongiforme, de contornos regulares e bordos finos de limites parcialmente precisos, de orientação paralela à pele, medindo ____ x ____ x ____ cm${classif}.`,
      impressao:
        "Imagem sugestiva de nódulo espongiforme com características descritas no corpo do texto.",
    },
    {
      id: "cisto-coloide",
      label: "Cisto coloide",
      texto: `${dim}\n${parenUniforme}, exceto por:\nCisto coloide: Formação nodular mista, de contornos regulares e bordos finos de limites parcialmente precisos medindo ____ x ____ x ____ cm, compatível com cisto coloide ({{TIRADS}}).`,
      impressao:
        "Imagem sugestiva de cisto coloide com características descritas no corpo do texto.",
    },
    {
      id: "cisto-simples",
      label: "Cisto simples",
      texto: `${dim}\n${parenUniforme}, exceto por:\nCisto simples: Presença de imagem anecóica de contornos regulares e bordos finos, bem circunscrita, de orientação paralela à pele medindo ____ cm no seu maior eixo ({{TIRADS}}).`,
      impressao:
        "Imagem sugestiva de cisto(s) simples tireoidiano(s) com características descritas no corpo do texto.",
    },
  ];

  return {
    id,
    titulo,
    tipo: "unico",
    padrao: "normal",
    opcoes: mergeOpcoes(opcoes, "tireoide::tireoide").map((op) => {
      if (op.id === "normal" || op.id === "heterogeneo") return op;
      if (
        /tireoidectomia/.test(op.id) ||
        /tireoide-heterogenea/.test(op.id)
      ) {
        return op;
      }
      // Patologias do catálogo: garantir "exceto por" após parênquima uniforme
      let t = op.texto.trim();
      if (!/exceto por/i.test(t)) {
        if (/par[eê]nquima/i.test(t)) {
          t = t.replace(
            /(par[eê]nquima[^\n.]*?)([.,])(\s*)/i,
            (_, p1, _p2, sp) => `${p1}, exceto por:${sp}`,
          );
        } else {
          t = `${dim}\n${parenUniforme}, exceto por:\n${t}`;
        }
      }
      if (opcaoRequerTirads(op) && !/\{\{TIRADS\}\}/.test(t)) {
        t = `${t.replace(/\.$/, "")} ({{TIRADS}}).`;
      }
      return { ...op, texto: t };
    }),
  };
}

function secoesPelvicaTv(comDoppler = false): Secao[] {
  const secoes: Secao[] = [
    {
      id: "bexiga",
      titulo: "BEXIGA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Vazia",
          texto: "Vazia, de paredes normo-espessas.",
        },
        opcaoCalculoVesical(),
      ],
    },
    {
      id: "vagina",
      titulo: "VAGINA",
      tipo: "unico",
      padrao: "normal",
      opcoes: [
        {
          id: "normal",
          label: "Normal",
          texto: "Normal.",
        },
      ],
    },
    {
      id: "utero",
      titulo: "ÚTERO",
      tipo: "unico",
      padrao: "normal",
      opcoes: mergeOpcoes(
        [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Em anteversão, de forma, ecotextura e contornos normais, medindo ____ x ____ x ____ mm (volume de ____ cm³).\nValores normais na menacme do volume uterino: (0 gest 30 a 90 cm³) (1 gest 60-140 cm³) (2 gest 60-150 cm³) (3 gest 60 a 155 cm³) (4 ou >4 gest 95 a 165 cm³) (menopausa de 20-70 cm³).\nCavidade uterina representada por eco linear central, vazia.\nFundos de saco anterior e posterior livres.",
          },
          {
            id: "ausente",
            label: "Não visibilizado (cirúrgico)",
            texto:
              "Não visibilizado (retirada cirúrgica), colo preservado, topografia uterina livre sem sinais de massa, nódulos ou coleções.",
          },
          {
            id: "mioma",
            label: "Mioma único",
            texto:
              "Em anteversão, medindo ____ x ____ x ____ mm (volume de ____ cm³).\nMiométrio com ecotextura homogênea, exceto por imagem nodular, sólida, de contornos bem definidos e regulares, conteúdo hipoecogênico/heterogêneo, na parede anterior/posterior/fúndica intramural/subseroso, medindo ____ cm no seu maior eixo.\nCavidade uterina representada por eco linear central, vazia.\nFundos de saco anterior e posterior livres.",
          },
          {
            id: "miomas",
            label: "Miomas múltiplos",
            texto:
              "Em anteversão, medindo ____ x ____ x ____ mm (volume de ____ cm³).\nMiométrio com ecotextura homogênea/heterogênea apresentando imagens nodulares, sólidas, hipoecogênicas/heterogêneas, de contornos regulares, nas paredes:\n- anterior/intramural, medindo ____ cm.\n- posterior/subseroso, medindo ____ cm.\n- fúndica, com componentes submucoso/subseroso, medindo ____ cm.\nCavidade uterina representada por eco linear central, vazia.\nFundos de saco anterior e posterior livres.",
          },
        ],
        "tv::utero",
      )
        .filter((op) => !/^(endometrio|polipo-endometrial)/.test(op.id))
        .map((op) => (comDoppler ? comPlaceholderVascLesao(op) : op)),
    },
    secaoEndometrioTv(),
    {
      id: "ovarios",
      titulo: "OVÁRIOS",
      tipo: "unico",
      padrao: "normal",
      opcoes: mergeOpcoes(
        [
          {
            id: "normal",
            label: "Normais",
            texto:
              "De morfologia, topografia, ecotextura e contornos normais, medindo:\nOVÁRIO D.: ____ x ____ x ____ mm (volume de ____ cm³).\nOVÁRIO E.: ____ x ____ x ____ mm (volume de ____ cm³).\nValores normais do volume ovariano: 3 a 9 cm³ (menopausa de 1 a 5 cm³).\nNão se constata a presença de massa, coleção encistada ou espessamento tecidual atípico na região anatômica dos anexos.",
          },
          {
            id: "polimicrocisticos",
            label: "Polimicrocísticos",
            texto:
              "Mostrando microcistos predominantemente periféricos, medindo:\nOVÁRIO D.: ____ x ____ x ____ mm (volume de ____ cm³).\nOVÁRIO E.: ____ x ____ x ____ mm (volume de ____ cm³).\nValores normais do volume ovariano: 3 a 9 cm³ (menopausa de 1 a 5 cm³).\nNão se constata a presença de massa, coleção encistada ou espessamento tecidual atípico na região anatômica dos anexos.",
          },
          {
            id: "congestao",
            label: "Com congestão vascular",
            texto:
              "De morfologia, topografia, ecotextura e contornos normais, medindo:\nOVÁRIO D.: ____ x ____ x ____ mm (volume de ____ cm³).\nOVÁRIO E.: ____ x ____ x ____ mm (volume de ____ cm³).\nValores normais do volume ovariano: 3 a 9 cm³ (menopausa de 1 a 5 cm³).\nNão se constata a presença de massa, coleção encistada ou espessamento tecidual atípico na região anatômica dos anexos.\nNota-se congestão vascular pélvica difusa traduzida por imagens tubuliformes, sinuosas e irregulares.",
          },
        ],
        "tv::ovarios",
      ).map((op) => (comDoppler ? comPlaceholderVascLesao(op) : op)),
    },
    secaoCatalogo(
      "achados-tv",
      "ACHADOS ADICIONAIS",
      "tv::achados",
      "Sem achados adicionais relevantes no campo do exame.",
      "Sem achados adicionais",
    ),
  ];

  if (comDoppler) {
    secoes.push(
      secaoDopplerVascOrgao(
        "doppler-utero",
        "VASCULARIZAÇÃO DO ÚTERO",
        "Útero",
        "do útero",
      ),
      secaoDopplerVascOrgao(
        "doppler-colo",
        "VASCULARIZAÇÃO DO COLO UTERINO",
        "Colo uterino",
        "do colo uterino",
      ),
      secaoDopplerVascOrgao(
        "doppler-endometrio",
        "VASCULARIZAÇÃO DO ENDOMÉTRIO",
        "Endométrio",
        "do endométrio",
      ),
      secaoDopplerVascOrgao(
        "doppler-ovario-d",
        "VASCULARIZAÇÃO DO OVÁRIO DIREITO",
        "Ovário direito",
        "do ovário direito",
      ),
      secaoDopplerVascOrgao(
        "doppler-ovario-e",
        "VASCULARIZAÇÃO DO OVÁRIO ESQUERDO",
        "Ovário esquerdo",
        "do ovário esquerdo",
      ),
    );
  }

  return secoes;
}

type LadoMskArticular = "direito" | "esquerdo";

function stripFrasesDoppler(texto: string): string {
  const limpo = texto
    .split(/\n/)
    .map((linha) => {
      const frases = linha
        .split(/(?<=\.)\s+/)
        .filter((f) => f.trim() && !/\bdoppler\b/i.test(f));
      return frases.join(" ").trim();
    })
    .filter(Boolean)
    .join("\n");
  return limpo.replace(/\n{3,}/g, "\n\n").trim();
}

function opcaoSemDopplerSePreciso(op: Opcao, comDoppler: boolean): Opcao {
  if (comDoppler) return op;
  return {
    ...op,
    texto: stripFrasesDoppler(op.texto),
    impressao: op.impressao
      ? stripFrasesDoppler(op.impressao)
      : op.impressao,
  };
}

function impressaoJoelhoNormal(
  comDoppler: boolean,
  lado: LadoMskArticular,
): string {
  const ladoTxt = lado === "esquerdo" ? "esquerdo" : "direito";
  const base = `Exame ultrassonográfico do joelho ${ladoTxt} dentro dos limites da normalidade anatômica.

Integridade preservada dos tendões quadricipital e patelar, dos ligamentos colaterais (medial e lateral), e das estruturas avaliadas da fossa poplítea.`;
  if (!comDoppler) return base;
  return `${base}

Ausência de sinais inflamatórios ou hiperemia patológica ao estudo com Doppler colorido.`;
}

function textoNormalJoelho(
  secao: "anterior" | "colaterais" | "posterior" | "recessos",
  comDoppler: boolean,
): string {
  const map: Record<typeof secao, { base: string; doppler?: string }> = {
    anterior: {
      base: `Tendão Quadricipital: Apresenta espessura preservada, contornos regulares e ecotextura fibrilar homogênea em toda a sua extensão até a base da patela. Ausência de áreas focais de descontinuidade ou microfissuras.
Tendão Patelar (Rotuliano): Exibe padrão ecotextural fibrilar linear bem definido, sem áreas de afilamento ou heterogeneidade intratendínea. Inserção na tuberosidade da tíbia íntegra.
Bursa Suprapatelar e Coxim Adiposo de Hoffa: Ausência de distensão líquida na bursa suprapatelar. Coxim adiposo de Hoffa com ecogenicidade habitual, sem sinais de fibrose ou edema focal.`,
      doppler:
        "\nEstudo Doppler Colorido (Compartimento Anterior): Padrão vascular basal fisiológico, sem hiperfluxo patológico peritendíneo ou intratendíneo.",
    },
    colaterais: {
      base: `Ligamento Colateral Medial (LCM): Fibras superficiais e profundas contínuas, homogêneas e bem delimitadas, sem evidências de estiramentos ou rupturas.
Ligamento Colateral Lateral (LCL): Banda fibrilar íntegra, com espessura e tensão preservadas da cabeça da fíbula ao estiloide fibular.
Meniscos (Corpo e Cornos Anterior/Posterior visíveis): Perfil fibrocartilaginoso com margens regulares e contornos bem definidos. Ausência de extrusão meniscal significativa ou imagens focais compatíveis com lesões expansivas/fissuras periféricas.`,
      doppler:
        "\nEstudo Doppler Colorido (Periferia Meniscal): Ausência de hiperemia vascular periférica.",
    },
    posterior: {
      base: `Conteúdo da Fossa Poplítea: Ausência de coleções líquidas significativas, cistos sinoviais (cisto de Baker ausente) ou tromboses venosas profundas visíveis nos eixos vasculares principais (veias poplítea e safena parva pérvias, com compressibilidade preservada).
Tendões dos Músculos Isquiotibiais: Íntegros em suas respectivas inserções e trajetos.`,
    },
    recessos: {
      base: `Superfícies corticais da tróclea femoral e dos platôs tibiais regulares e contínuas, sem defeitos osteocondrais evidentes ou osteófitos marginais expressivos.
Ausência de derrame articular patológico nos recessos explorados.`,
    },
  };
  const t = map[secao];
  return comDoppler ? `${t.base}${t.doppler ?? ""}` : t.base;
}

function secoesJoelho(comDoppler = false): Secao[] {
  const mapOps = (ops: Opcao[]) =>
    ops.map((op) => opcaoSemDopplerSePreciso(op, comDoppler));

  const hiperemia = comDoppler
    ? " Ao Doppler colorido observa-se hiperemia/neovascularização, compatível com processo inflamatório ativo."
    : "";

  return [
    {
      id: "compartimento-anterior",
      titulo:
        "COMPARTIMENTO ANTERIOR (TENDÃO QUADRICIPITAL, PATELA E TENDÃO PATELAR)",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps([
        {
          id: "normal",
          label: "Normal",
          texto: textoNormalJoelho("anterior", comDoppler),
        },
        {
          id: "tendinopatia-patelar",
          label: "Tendinopatia patelar (jumper's knee)",
          texto: `Tendão patelar com espessamento focal, hipoecogenicidade e perda do padrão fibrilar na origem (polo inferior da patela) e/ou inserção na tuberosidade da tíbia, aspectos sugestivos de tendinopatia patelar (joelho de saltador).${hiperemia}`,
          impressao:
            "Imagem sugestiva de tendinopatia patelar (jumper's knee).",
        },
        {
          id: "tendinopatia-quadriceps",
          label: "Tendinopatia do quadríceps",
          texto: `Tendão do quadríceps com espessamento e alteração da ecotextura na inserção superior da patela, aspectos sugestivos de tendinopatia quadricipital.${hiperemia}`,
          impressao: "Imagem sugestiva de tendinopatia do tendão quadricipital.",
        },
        {
          id: "ruptura-quadriceps",
          label: "Ruptura do tendão quadricipital",
          texto:
            "Tendão do quadríceps com descontinuidade fibrilar ____ (parcial/total) na inserção superior da patela, medindo ____ cm, com ____ (retração / gap) entre os cotos.",
          impressao:
            "Imagem sugestiva de ruptura do tendão quadricipital.",
        },
        {
          id: "bursite-pre-infrapatelar",
          label: "Bursite pré-patelar / infrapatelar",
          texto: `Bursa ____ (pré-patelar / infrapatelar superficial / profunda) distendida por líquido anecóide/heterogêneo, medindo ____ cm, aspectos sugestivos de bursite.${hiperemia}`,
          impressao:
            "Imagem sugestiva de bursite pré-patelar/infrapatelar.",
        },
        {
          id: "hoffa",
          label: "Alterações do coxim de Hoffa",
          texto: `Coxim adiposo infrapatelar de Hoffa com edema/fibrose e alteração da ecogenicidade${comDoppler ? " e hiperemia ao Doppler" : ""}, podendo corresponder à síndrome da dor femoropatelar / hoffite.`,
          impressao:
            "Imagem sugestiva de alterações inflamatórias/fibróticas do coxim adiposo de Hoffa.",
        },
      ]),
    },
    {
      id: "compartimentos-colaterais",
      titulo: "COMPARTIMENTOS COLATERAIS E MENISCAIS PERIFÉRICOS",
      tipo: "multiplo",
      padrao: "normal",
      opcoes: mapOps([
        {
          id: "normal",
          label: "Normal",
          texto: textoNormalJoelho("colaterais", comDoppler),
        },
        {
          id: "lesao-lcm",
          label: "Lesão do LCM",
          texto:
            "Ligamento colateral medial com ____ (estiramento / espessamento / descontinuidade fibrilar parcial ou total), medindo ____ cm, podendo associar coleção líquida periligamentar. Aspectos sugestivos de lesão do LCM.",
          impressao: "Imagem sugestiva de lesão do ligamento colateral medial.",
        },
        {
          id: "tendinopatia-lcm",
          label: "Tendinopatia do LCM",
          texto: `Ligamento colateral medial com espessamento e hipoecogenicidade textural, sem descontinuidade franca, aspectos sugestivos de tendinopatia do LCM.${hiperemia}`,
          impressao:
            "Imagem sugestiva de tendinopatia do ligamento colateral medial.",
        },
        {
          id: "lesao-lcl",
          label: "Lesão do LCL",
          texto:
            "Ligamento colateral lateral com ____ (estiramento / espessamento / descontinuidade fibrilar parcial ou total), medindo ____ cm. Aspectos sugestivos de lesão do LCL.",
          impressao: "Imagem sugestiva de lesão do ligamento colateral lateral.",
        },
        {
          id: "tendinopatia-lcl",
          label: "Tendinopatia do LCL",
          texto: `Ligamento colateral lateral com espessamento e hipoecogenicidade textural, sem descontinuidade franca, aspectos sugestivos de tendinopatia do LCL.${hiperemia}`,
          impressao:
            "Imagem sugestiva de tendinopatia do ligamento colateral lateral.",
        },
        {
          id: "lesao-meniscal-periferica",
          label: "Lesão meniscal periférica / extrusão",
          texto:
            "Menisco ____ (medial/lateral) com ____ (extrusão significativa / cisto parameniscal / irregularidade na porção periférica — zona vermelha), medindo ____ cm. Avaliação meniscal ultrassonográfica limitada — correlacionar clinicamente e com RM se indicado.",
          impressao:
            "Imagem sugestiva de alteração meniscal periférica/extrusão. Correlacionar com RM se indicado.",
        },
      ]),
    },
    {
      id: "compartimento-posterior",
      titulo: "COMPARTIMENTO POSTERIOR (FOSSA POPLÍTEA)",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps([
        {
          id: "normal",
          label: "Normal",
          texto: textoNormalJoelho("posterior", comDoppler),
        },
        {
          id: "cisto-baker",
          label: "Cisto de Baker",
          texto:
            "Coleção líquida bem delimitada na região posteromedial da fossa poplítea, comunicando-se com a bursa gastrocnêmio-semimembranosa, medindo ____ cm (L × AP × T), aspectos sugestivos de cisto de Baker (cisto poplíteo). ____ (sem / com) septações; ____ (sem / com) sinais de ruptura/extravasamento para a panturrilha.",
          impressao: "Imagem sugestiva de cisto de Baker (cisto poplíteo).",
        },
        {
          id: "tendinopatia-isquiotibiais",
          label: "Tendinopatia dos isquiotibiais / gastrocnêmio",
          texto: `Tendão(ões) ____ (isquiotibiais / gastrocnêmio) com espessamento/hipoecogenicidade e/ou descontinuidade fibrilar na origem/inserção, medindo ____ cm, aspectos sugestivos de lesão miofascial/tendínea.${hiperemia}`,
          impressao:
            "Imagem sugestiva de tendinopatia/lesão dos isquiotibiais ou gastrocnêmio.",
        },
      ]),
    },
    {
      id: "recessos-articulares",
      titulo: "RECESSOS ARTICULARES E SUPERFÍCIES ÓSSEAS",
      tipo: "unico",
      padrao: "normal",
      opcoes: mapOps([
        {
          id: "normal",
          label: "Normal",
          texto: textoNormalJoelho("recessos", comDoppler),
        },
        {
          id: "derrame-articular",
          label: "Derrame articular",
          texto:
            "Derrame articular ____ (leve/moderado/acentuado) no recesso suprapatelar e/ou recessos parapatelares, com líquido anecóide/complexo, aspectos sugestivos de derrame articular (água no joelho).",
          impressao: "Imagem sugestiva de derrame articular no joelho.",
        },
        {
          id: "sinovite",
          label: "Sinovite",
          texto: `Espessamento da membrana sinovial nos recessos explorados${comDoppler ? ", associado a hiperemia importante ao Doppler colorido" : ""}, aspectos sugestivos de sinovite (considerar processo inflamatório crônico, artrite reumatoide ou artropatia microcristalina). Correlacionar clinicamente.`,
          impressao:
            "Imagem sugestiva de sinovite. Correlacionar clinicamente.",
        },
      ]),
    },
  ];
}

const examesBase: Exame[] = [
  {
    id: "abdome-total",
    nome: "Abdome Total",
    tituloDocumento: "ULTRASSONOGRAFIA DO ABDOME TOTAL",
    tecnica:
      "Exame realizado em modo bidimensional, com equipamento dinâmico convexo multifrequencial. Foram feitas varreduras nos sentidos transversal, longitudinal e oblíquos.",
    secoes: [
      secaoFigadoAbdome(),
      secaoVesicula(),
      secaoViasBiliares(),
      secaoPancreas(),
      secaoBaco(),
      secaoRim("rim-direito", "RIM DIREITO"),
      secaoRim("rim-esquerdo", "RIM ESQUERDO"),
      {
        id: "retroperitonio",
        titulo: "RETROPERITÔNEO",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Não se constata adenopatia para-aórtica ou ao redor dos demais grandes vasos abdominais.",
          },
          {
            id: "adenopatia",
            label: "Adenopatia",
            texto:
              "Identificam-se linfonodos aumentados / adenopatia para-aórtica ou ao redor dos grandes vasos abdominais. Correlacionar clinicamente.",
          },
        ],
          "abdome::retroperitonio",
        ),
      },
      {
        id: "aorta",
        titulo: "AORTA ABDOMINAL",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
          {
            id: "normal",
            label: "Normal",
            texto:
              "De diâmetro preservado.\nParedes aórticas com espessura e ecogenicidade normais, regulares.",
          },
          {
            id: "ateroma",
            label: "Placas de ateroma",
            texto:
              "De diâmetro preservado.\nParedes aórticas com placas de ateroma{{ESTENOSE}}.",
          },
          {
            id: "aneurisma",
            label: "Aneurisma",
            texto:
              "Com dilatação aneurismática no segmento avaliado.\nDemais segmentos sem alterações significativas no campo do exame.",
          },
        ],
          "abdome::aorta",
        ),
      },
      {
        id: "cav-abdominal",
        titulo: "CAV.ABDOMINAL",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
          {
            id: "normal",
            label: "Sem ascite",
            texto: "Não há evidências de ascite.",
          },
          {
            id: "ascite",
            label: "Ascite",
            texto: "Presença de líquido livre na cavidade abdominal.",
          },
        ],
          "abdome::cav-abdominal",
        ),
      },
      {
        id: "pelve",
        titulo: "PELVE",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Cheia",
            texto:
              "Bexiga cheia, de paredes normo-espessas.\nNão se notam imagens calculosas.\nAusência de massa ou de coleção pélvica de qualquer natureza.",
          },
          {
            id: "paredes-espessadas",
            label: "Paredes espessadas",
            texto:
              "Bexiga com paredes espessadas.\nNão se notam imagens calculosas evidentes.\nAusência de massa ou de coleção pélvica de qualquer natureza.",
          },
          {
            id: "baixa-replecao",
            label: "Baixa repleção",
            texto:
              "Bexiga apresentando baixa repleção, de caracterização limitada ao estudo ultrassonográfico.\nNão se notam imagens calculosas.\nAusência de massa ou de coleção pélvica de qualquer natureza.",
          },
          {
            id: "media-replecao",
            label: "Média repleção",
            texto:
              "Bexiga apresentando média repleção, de caracterização limitada ao estudo ultrassonográfico.\nNão se notam imagens calculosas.\nAusência de massa ou de coleção pélvica de qualquer natureza.",
          },
          opcaoCalculoVesical(),
        ],
      },
    ],
    impressaoPadrao:
      "Exame ultrassonográfico do abdômen dentro dos parâmetros da normalidade.",
  },
  {
    id: "abdome-superior",
    nome: "Abdome Superior",
    tituloDocumento: "ULTRASSONOGRAFIA DO ABDÔMEN SUPERIOR",
    tecnica:
      "Exame realizado em modo bidimensional, com equipamento dinâmico convexo multifrequencial. Foram feitas varreduras nos sentidos transversal, longitudinal e oblíquos.",
    secoes: [
      secaoFigadoAbdome(),
      secaoVesicula(),
      secaoViasBiliares(),
      secaoPancreas(),
      secaoBaco(),
    ],
    impressaoPadrao:
      "Exame ultrassonográfico do abdômen superior dentro dos parâmetros da normalidade.",
  },
  {
    id: "intestino-mesenterio",
    nome: "Intestino / Mesentério",
    tituloDocumento:
      "ULTRASSONOGRAFIA COMPLEMENTAR — INTESTINO / MESENTÉRIO",
    tecnica:
      "Estudo ultrassonográfico complementar com sonda linear de alta frequência, dirigido às fossas ilíacas, região periumbilical e demais topografias intestinais/mesentéricas de interesse clínico.",
    secoes: [secaoIntestinoAbdome()],
    impressaoPadrao:
      "Estudo complementar de intestino/mesentério sem alterações significativas no campo do exame.",
  },
  {
    id: "aparelho-urinario",
    nome: "Aparelho Urinário",
    tituloDocumento: "ULTRASSONOGRAFIA DO APARELHO URINÁRIO",
    tecnica: "",
    secoes: [
      secaoRim("rim-direito", "RIM DIREITO"),
      secaoRim("rim-esquerdo", "RIM ESQUERDO"),
      {
        id: "bexiga",
        titulo: "BEXIGA",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
          {
            id: "normal",
            label: "Cheia",
            texto:
              "Cheia, de paredes normo-espessas.\nNão se notam imagens calculosas.",
          },
          {
            id: "baixa-replecao",
            label: "Baixa repleção",
            texto:
              "Apresentando baixa repleção, de caracterização limitada ao estudo ultrassonográfico.\nNão se notam imagens calculosas.",
          },
          {
            id: "media-replecao",
            label: "Média repleção",
            texto:
              "Apresentando média repleção, de caracterização limitada ao estudo ultrassonográfico.\nNão se notam imagens calculosas.",
          },
          opcaoCalculoVesical(),
        ],
          "renal::bexiga",
        ),
      },
    ],
    impressaoPadrao:
      "Rins e bexiga urinária de aspectos ecográficos normais.",
  },
  {
    id: "prostata",
    nome: "Próstata",
    tituloDocumento: "ULTRASSONOGRAFIA DA PRÓSTATA",
    tecnica: "",
    secoes: [
      {
        id: "bexiga",
        titulo: "BEXIGA",
        tipo: "unico",
        padrao: "cheia",
        opcoes: [
          {
            id: "cheia",
            label: "Cheia",
            texto:
              "Cheia, de paredes normo-espessas.\nNão se notam imagens calculosas.",
          },
          {
            id: "baixa-replecao",
            label: "Baixa repleção",
            texto:
              "Apresentando baixa repleção, de caracterização limitada ao estudo ultrassonográfico.\nNão se notam imagens calculosas.",
          },
          {
            id: "media-replecao",
            label: "Média repleção",
            texto:
              "Apresentando média repleção, de caracterização limitada ao estudo ultrassonográfico.\nNão se notam imagens calculosas.",
          },
          {
            id: "vazia",
            label: "Vazia",
            texto: "Vazia.",
          },
          opcaoCalculoVesical(),
        ],
      },
      {
        id: "prostata",
        titulo: "PRÓSTATA",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
          {
            id: "normal",
            label: "Normal (superfície regular)",
            texto:
              "Com configuração cônica característica, apresentando superfície regular e cápsula íntegra, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.\nVolume da próstata: ____ cm³.\nPeso aproximado: ____ gramas.\nTecido prostático com textura uniforme, sem alterações de ecogenicidade.\nAusência de calcificações patológicas.",
          },
          {
            id: "bocelada",
            label: "Bocelada",
            texto:
              "Com configuração cônica característica, apresentando superfície bocelada e cápsula aparentemente íntegra, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.\nVolume da próstata: ____ cm³.\nPeso aproximado: ____ gramas.\nTecido prostático com textura uniforme, sem alterações de ecogenicidade.\nAusência de calcificações patológicas.",
            impressao:
              "Imagem sugestiva de aumento do volume e peso da próstata, que determina compressão sobre o assoalho vesical.",
          },
          {
            id: "calcificacoes",
            label: "Calcificações prostáticas",
            texto:
              "Com configuração cônica característica, apresentando superfície regular e cápsula íntegra, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.\nVolume da próstata: ____ cm³.\nPeso aproximado: ____ gramas.\nTecido prostático com textura heterogênea, com destaque para calcificações parenquimatosas / periuretrais (zona de transição), traduzidas por imagens focais puntiformes hiperrefletivas produtoras de sombras acústicas.",
            impressao:
              "Imagens sugestivas de calcificações prostáticas com as demais características descritas no texto.",
          },
          {
            id: "aumentada-bocelada",
            label: "Aumentada bocelada + calcificações",
            texto:
              "Com configuração cônica característica, apresentando superfície bocelada e cápsula aparentemente íntegra, medindo ____ x ____ x ____ cm, em relação aos maiores diâmetros.\nVolume da próstata: ____ cm³.\nPeso aproximado: ____ gramas.\nTecido prostático com textura heterogênea, com destaque para calcificações parenquimatosas, traduzidas por imagens ecorrefringentes, produtoras de sombras acústicas.",
            impressao:
              "Imagem sugestiva de aumento do volume e peso da próstata, que determina compressão sobre o assoalho vesical, associado a alterações texturais difusas, com destaque para calcificações parenquimatosas com as demais características descritas no texto.",
          },
        ],
          "prostata::prostata",
        ),
      },
      {
        id: "ves-seminais",
        titulo: "VES.SEMINAIS",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normais",
              texto:
                "Bem individualizadas, com curso, configuração, diâmetros e ecotextura compatíveis com o normal.",
            },
          ],
          "prostata::ves-seminais",
        ),
      },
    ],
    impressaoPadrao:
      "Exame ultrassonográfico da bexiga, próstata e vesículas seminais, dentro dos parâmetros da normalidade.",
  },
  {
    id: "pelvica",
    nome: "Pélvica (via abdominal)",
    tituloDocumento: "ULTRASSONOGRAFIA PÉLVICA - VIA ABDOMINAL",
    tecnica:
      "Exame realizado em modo bidimensional, com transdutor convexo multifrequencial por via suprapúbica.",
    secoes: [
      {
        id: "bexiga",
        titulo: "BEXIGA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Cheia",
            texto: "Cheia, de paredes normo-espessas.",
          },
          {
            id: "baixa-replecao",
            label: "Baixa repleção",
            texto:
              "Apresentando baixa repleção, de caracterização limitada ao estudo ultrassonográfico.",
          },
          {
            id: "media-replecao",
            label: "Média repleção",
            texto:
              "Apresentando média repleção, de caracterização limitada ao estudo ultrassonográfico.",
          },
          {
            id: "vazia",
            label: "Vazia",
            texto: "Vazia.",
          },
          opcaoCalculoVesical(),
        ],
      },
      {
        id: "utero",
        titulo: "ÚTERO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Em anteversão, de forma, ecotextura e contornos normais, medindo ____ x ____ x ____ mm (volume de ____ cm³).\nValores normais do volume uterino: 25 a 90 cm³.\nEco endometrial com espessura de ____ mm.",
          },
          {
            id: "mioma",
            label: "Mioma(s)",
            texto:
              "De dimensões alteradas, evidenciando nódulo(s) miometrial(is) compatível(is) com leiomioma(s), medindo ____ x ____ x ____ mm (volume de ____ cm³).\nEco endometrial com espessura de ____ mm.",
          },
        ],
      },
      {
        id: "ovarios",
        titulo: "OVÁRIOS",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto:
              "De morfologia, topografia, ecotextura e contornos normais, medindo:\nOVÁRIO D.: ____ x ____ x ____ mm (volume de ____ cm³).\nOVÁRIO E.: ____ x ____ x ____ mm (volume de ____ cm³).\nValores normais do volume ovariano: 3 a 9 cm³.\nNão se constata a presença de massa, coleção encistada ou espessamento tecidual atípico na região anatômica dos anexos.",
          },
          {
            id: "polimicrocisticos",
            label: "Polimicrocísticos",
            texto:
              "Mostrando microcistos predominantemente periféricos, medindo:\nOVÁRIO D.: ____ x ____ x ____ mm (volume de ____ cm³).\nOVÁRIO E.: ____ x ____ x ____ mm (volume de ____ cm³).\nValores normais do volume ovariano: 3 a 9 cm³.\nNão se constata a presença de massa, coleção encistada ou espessamento tecidual atípico na região anatômica dos anexos.",
          },
          {
            id: "congestao",
            label: "Com congestão vascular",
            texto:
              "De morfologia, topografia, ecotextura e contornos normais, medindo:\nOVÁRIO D.: ____ x ____ x ____ mm (volume de ____ cm³).\nOVÁRIO E.: ____ x ____ x ____ mm (volume de ____ cm³).\nValores normais do volume ovariano: 3 a 9 cm³.\nNão se constata a presença de massa, coleção encistada ou espessamento tecidual atípico na região anatômica dos anexos.\nNota-se congestão vascular pélvica difusa traduzida por imagens tubuliformes, sinuosas e irregulares.",
          },
        ],
      },
    ],
    impressaoPadrao:
      "Útero e ovários com aspectos ecográficos normais.",
  },
  {
    id: "partes-moles",
    nome: "Partes Moles",
    tituloDocumento: "ULTRASSONOGRAFIA DE PARTES MOLES",
    tecnica: TECNICA_PARTES_MOLES,
    secoes: secoesPartesMoles(),
    impressaoPadrao:
      "Exame ultrassonográfico de partes moles da região {{REGIAO}} dentro dos limites da normalidade.\nAusência de evidências ecográficas de lesões expansivas (sólidas ou císticas), coleções líquidas, alterações inflamatórias ativas ou roturas musculares/tendíneas no campo de varredura analisado.",
  },
  {
    id: "dermatologico",
    nome: "Dermatológico",
    tituloDocumento: "ULTRASSONOGRAFIA DERMATOLÓGICA",
    tecnica: TECNICA_LINEAR,
    secoes: [
      {
        id: "regiao",
        titulo: "REGIÃO EXAMINADA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "As imagens ultrassonográficas da região [especificar a região] demonstram camadas da pele com ecotextura e espessura preservadas e sem evidências de alterações.",
          },
        ],
      },
      {
        id: "epiderme",
        titulo: "EPIDERME",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normal",
              texto:
                "Apresenta-se como uma linha hiperecogênica fina e regular, contínua e sem interrupções.",
            },
          ],
          "dermatologico::epiderme",
        ),
      },
      {
        id: "derme",
        titulo: "DERME",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normal",
              texto:
                "Caracteriza-se por uma faixa hipoecogênica homogênea, com espessura usual para a região, sem a presença de lesões focais, coleções líquidas ou massas. A junção dermo-epidérmica é nítida e bem definida.",
            },
          ],
          "dermatologico::derme",
        ),
      },
      {
        id: "hipoderme",
        titulo: "HIPODERME (TECIDO SUBCUTÂNEO)",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normal",
              texto:
                "Visibiliza-se com seu padrão ecogênico típico, composto por lóbulos de gordura hipoecogênicos separados por septos conectivos hiperecogênicos finos. Não há evidência de espessamento, edemas, nódulos ou massas anormais.",
            },
          ],
          "dermatologico::hipoderme",
        ),
      },
      {
        id: "anexos",
        titulo: "ANEXOS CUTÂNEOS",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normais",
              texto:
                "Folículos pilosos, glândulas sebáceas e sudoríparas são visualizados dentro de seus padrões de normalidade, sem sinais de inflamação ou dilatação cística.",
            },
          ],
          "dermatologico::anexos",
        ),
      },
      {
        id: "planos-profundos",
        titulo: "PLANOS PROFUNDOS",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normais",
              texto:
                "As estruturas musculares e ósseas subjacentes à hipoderme apresentam-se com ecotextura e contornos preservados, sem alterações significativas visualizáveis no campo do ultrassom dermatológico.",
            },
          ],
          "dermatologico::planos-profundos",
        ),
      },
      {
        id: "vascularizacao",
        titulo: "VASCULARIZAÇÃO (DOPPLER)",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normal",
              texto:
                "Não há evidência de fluxo vascular anômalo ou neovascularização significativa ao estudo com Doppler colorido.",
            },
          ],
          "dermatologico::vascularizacao",
        ),
      },
    ],
    impressaoPadrao:
      "Exame ultrassonográfico dermatológico da região [especificar a região] sem alterações, com padrões ecográficos da pele e estruturas subjacentes dentro dos limites da normalidade.",
  },
  {
    id: "parede-abdominal",
    nome: "Parede Abdominal",
    tituloDocumento: "ULTRASSONOGRAFIA DE PAREDE ABDOMINAL",
    tecnica: TECNICA_LINEAR,
    secoes: [
      {
        id: "achados",
        titulo: "ACHADOS",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Pele e tecido subcutâneos bem configurados com espessura, contornos e ecotextura normais.\nFeixes musculares em situação tópica com morfologia e demais características ecográficas normais.\nAusência de calcificações patológicas.\nNão há sinais de massas sólidas ou císticas, isoladas ou em comunicações com cavidade articular.\nNão se caracterizam falhas aponeuróticas nem herniações à manobra de Valsalva no campo do exame.",
          },
          {
            id: "hernia",
            label: "Hérnia de parede",
            texto:
              "Pele e tecido subcutâneos bem configurados com espessura, contornos e ecotextura normais.\nFeixes musculares em situação tópica com morfologia e demais características ecográficas normais.\nHerniação de conteúdo omental através do _______ medindo ____ cm de espessura, observado à manobra de Valsalva.",
          },
          {
            id: "diastase",
            label: "Diástase",
            texto:
              "Pele e tecido subcutâneos bem configurados com espessura, contornos e ecotextura normais.\nFeixes musculares em situação tópica com morfologia e demais características ecográficas normais.\nImagens sugestivas de separação entre os músculos retos abdominais ________ medindo cerca de ____ cm.",
          },
        ],
          "parede-abdominal::achados",
        ),
      },
    ],
    impressaoPadrao: "Exame de parede abdominal dentro dos padrões da normalidade.",
  },
  {
    id: "regiao-inguinal",
    nome: "Região Inguinal",
    tituloDocumento: "ULTRASSONOGRAFIA DE REGIÃO INGUINAL",
    tecnica: tecnicaInguinal(false),
    secoes: [
      secaoInguinal("inguinal-direita", "REGIÃO INGUINAL DIREITA"),
      secaoInguinal("inguinal-esquerda", "REGIÃO INGUINAL ESQUERDA"),
    ],
    impressaoPadrao: impressaoPadraoInguinal(false),
  },
  {
    id: "tireoide",
    nome: "Tireoide",
    tituloDocumento: "ULTRASSONOGRAFIA DA TIREÓIDE",
    tecnica: TECNICA_TIREOIDE,
    secoes: [
      secoesLoboTireoide("lobo-d", "LOBO DIREITO"),
      secoesLoboTireoide("lobo-e", "LOBO ESQUERDO"),
      {
        id: "istmo",
        titulo: "ISTMO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto: "Desprezível.",
          },
        ],
      },
      {
        id: "volume",
        titulo: "VOLUME",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Nota de volume",
            texto:
              "____ cm³ (normal de 4,8 a 15,1 mulher e homem 7,7 a 19,1 cm³).",
          },
        ],
      },
      {
        id: "doppler",
        titulo: "DOPPLER / VASCULARIZAÇÃO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "As demais regiões do parênquima apresentam distribuição normal da vascularização e as artérias tireoidianas picos de velocidade sistólica e diastólica dentro dos parâmetros da normalidade.",
          },
        ],
      },
      {
        id: "linfonodos",
        titulo: "LINFONODOS",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Aspecto habitual",
            texto:
              "Linfonodos identificados no exame de aspecto habitual.\nAusência de calcificações patológicas, bem como de adenopatia cervical não habitual.",
          },
          {
            id: "suspeitos",
            label: "Suspeitos",
            texto:
              "Linfonodo(s) cervical(is) com morfologia suspeita. Correlacionar clinicamente.",
          },
        ],
      },
    ],
    impressaoPadrao:
      "Exame ultrassonográfico da tireoide dentro dos parâmetros da normalidade.",
  },
  {
    id: "glandulas-salivares",
    nome: "Glândulas Salivares",
    tituloDocumento: "ULTRASSONOGRAFIA DAS GLÂNDULAS SALIVARES",
    tecnica: TECNICA_CERVICAL,
    secoes: [
      {
        id: "parotidas",
        titulo: "PARÓTIDAS",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normais",
              texto:
                "Parótida em situações tópicas, com configurações, contornos e dimensões normais.\nParênquima parotídeo com ecotextura uniforme, sem alterações de ecogenicidade.\nNão há evidências de lesões parenquimatosas de caráter focal ou difuso, bem como calcificações patológicas.",
            },
          ],
          "salivares::achados",
        ),
      },
      {
        id: "submandibular",
        titulo: "SUBMANDIBULAR",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normais",
              texto:
                "Submandibular esquerdo e direito em situações tópicas, com configurações, contornos e dimensões normais.\nParênquima submandibular com ecotextura uniforme, sem alterações de ecogenicidade.",
            },
          ],
          "salivares::achados",
        ),
      },
      {
        id: "sublingual",
        titulo: "SUBLINGUAL",
        tipo: "unico",
        padrao: "normal",
        opcoes: mergeOpcoes(
          [
            {
              id: "normal",
              label: "Normais",
              texto:
                "Sublingual esquerdo e direito em situações tópicas, com configurações, contornos e dimensões normais.\nParênquima sublingual com ecotextura uniforme, sem alterações de ecogenicidade.",
            },
          ],
          "salivares::achados",
        ),
      },
      {
        id: "linfonodos",
        titulo: "LINFONODOS",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Aspecto habitual",
            texto: "Linfonodos identificados no exame de aspecto habitual.",
          },
          {
            id: "suspeitos",
            label: "Suspeitos",
            texto:
              "Linfonodo(s) cervical(is) com morfologia suspeita. Correlacionar clinicamente.",
          },
        ],
      },
    ],
    impressaoPadrao:
      "Exame ultrassonográfico das glândulas salivares dentro dos parâmetros da normalidade.",
  },
  {
    id: "regiao-cervical",
    nome: "Região Cervical",
    tituloDocumento: "ULTRASSONOGRAFIA DA REGIÃO CERVICAL",
    tecnica: TECNICA_CERVICAL,
    secoes: [
      {
        id: "direita",
        titulo: "A DIREITA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Aspecto habitual",
            texto:
              "Linfonodos identificados:\nRegião 2A: no presente exame de aspecto habitual.\nRegião 2B: no presente exame de aspecto habitual.\nRegião 3: no presente exame de aspecto habitual.\nRegião 4: no presente exame de aspecto habitual.\nRegião 5A: no presente exame de aspecto habitual.\nRegião 5B: no presente exame de aspecto habitual.",
          },
        ],
      },
      {
        id: "esquerda",
        titulo: "À ESQUERDA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Aspecto habitual",
            texto:
              "Região 2A: no presente exame de aspecto habitual.\nRegião 2B: no presente exame de aspecto habitual.\nRegião 3: no presente exame de aspecto habitual.\nRegião 4: no presente exame de aspecto habitual.\nRegião 5A: no presente exame de aspecto habitual.\nRegião 5B: no presente exame de aspecto habitual.\nAusência de calcificações patológicas, bem como de adenopatia cervical não habitual.",
          },
        ],
      },
    ],
    impressaoPadrao:
      "Exame ultrassonográfico da região cervical dentro dos parâmetros da normalidade.",
  },
  {
    id: "bolsa-testicular",
    nome: "Bolsa Testicular",
    tituloDocumento: "ULTRASSONOGRAFIA DOS TESTÍCULOS",
    tecnica: tecnicaBolsaTesticular(false),
    secoes: secoesBolsaTesticular(false),
    impressaoPadrao:
      "Exame ultrassonográfico da bolsa testicular, testículos e epidídimos, dentro dos parâmetros da normalidade.",
  },
  {
    id: "penis",
    nome: "Peniana",
    tituloDocumento: "ULTRASSONOGRAFIA PENIANA",
    tecnica:
      "Exame realizado com transdutor linear de alta frequência, com o paciente em posição supina. Avaliação em planos longitudinais e transversais, com o pênis em posição flácida.",
    secoes: [
      {
        id: "corpos-cavernosos",
        titulo: "CORPOS CAVERNOSOS",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto:
              "Simétricos, com ecotextura homogênea, sem evidência de áreas hipo ou hiperecogênicas. Revestidos por túnica albugínea de espessura e ecogenicidade preservadas.",
          },
        ],
      },
      {
        id: "corpo-esponjoso",
        titulo: "CORPO ESPONJOSO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Bem visualizado, com ecotextura homogênea e sem alterações estruturais.",
          },
        ],
      },
      {
        id: "uretra",
        titulo: "URETRA PENIANA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto: "Sem dilatações ou espessamentos aparentes ao longo de seu trajeto.",
          },
        ],
      },
      {
        id: "septos",
        titulo: "SEPTOS / ALBUGÍNEA",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normais",
            texto:
              "Septos intercavernosos preservados.\nSem evidência de coleções líquidas, calcificações, nódulos ou áreas de fibrose.\nAusência de placas fibróticas na túnica albugínea (sem sinais sugestivos de doença de Peyronie).",
          },
          {
            id: "peyronie",
            label: "Sugestivo de Peyronie",
            texto:
              "Identificam-se placas fibróticas na túnica albugínea, aspectos sugestivos de doença de Peyronie. Correlacionar clinicamente.",
          },
        ],
      },
      {
        id: "pele",
        titulo: "PELE E TECIDO SUBCUTÂNEO",
        tipo: "unico",
        padrao: "normal",
        opcoes: [
          {
            id: "normal",
            label: "Normal",
            texto:
              "Sem espessamentos ou lesões focalizadas.\nNão foram observadas alterações significativas no exame.",
          },
        ],
      },
    ],
    impressaoPadrao:
      "Exame ultrassonográfico do pênis dentro dos padrões da normalidade para a fase flácida, sem evidência de alterações estruturais nos corpos cavernosos, corpo esponjoso ou uretra peniana.",
  },
  {
    id: "mamas-masculino",
    nome: "Mamas Masculino",
    tituloDocumento: "ULTRASSONOGRAFIA DAS MAMAS MASCULINO",
    tecnica: TECNICA_MAMAS_MASCULINO,
    secoes: [
      secaoMamaMasculino("mama-direita", "MAMA DIREITA"),
      secaoMamaMasculino("mama-esquerda", "MAMA ESQUERDA"),
      secaoBirads(),
    ],
    impressaoPadrao:
      "Estudo ultrassonográfico das mamas dentro dos padrões da normalidade bilateralmente, sem evidência de sinais ultrassonográficos de ginecomastia ou lesões focais suspeitas.",
  },
  {
    id: "mamas",
    nome: "Mamas",
    tituloDocumento: "ULTRASSONOGRAFIA DAS MAMAS",
    tecnica: TECNICA_MAMAS,
    secoes: [
      secaoMama("mama-direita", "MAMA DIREITA"),
      secaoMama("mama-esquerda", "MAMA ESQUERDA"),
      secaoBirads(),
    ],
    impressaoPadrao:
      "Mamas dentro dos parâmetros da normalidade ao exame ultrassonográfico.",
  },
  {
    id: "axilas",
    nome: "Regiões Axilares",
    tituloDocumento: "ULTRASSONOGRAFIA DAS REGIÕES AXILARES",
    tecnica: TECNICA_MAMAS,
    secoes: [
      secaoAxila("axila-direita", "AXILA DIREITA"),
      secaoAxila("axila-esquerda", "AXILA ESQUERDA"),
    ],
    impressaoPadrao:
      "Exame ultrassonográfico das regiões axilares dentro dos padrões da normalidade.",
  },
  {
    id: "pelvica-tv",
    nome: "Pélvica Transvaginal",
    tituloDocumento: "ULTRASSONOGRAFIA PÉLVICA - VIA TRANSVAGINAL",
    tecnica: TECNICA_PELVICA_TV,
    secoes: secoesPelvicaTv(false),
    impressaoPadrao:
      "Útero e ovários com aspectos ecográficos normais.",
  },
  {
    id: "torax",
    nome: "Tórax",
    tituloDocumento: "ULTRASSONOGRAFIA DO TÓRAX",
    tecnica: TECNICA_LINEAR,
    secoes: [
      secaoCatalogo(
        "achados",
        "ACHADOS",
        "torax::achados",
        "Sem evidência de derrame pleural significativo no campo do exame.",
      ),
    ],
    impressaoPadrao: "Exame ultrassonográfico do tórax dentro dos parâmetros da normalidade.",
  },
  {
    id: "obstetrico-tv-precoce",
    nome: exameObstetricoTvPrecoce().nome,
    tituloDocumento: exameObstetricoTvPrecoce().tituloDocumento,
    tecnica: exameObstetricoTvPrecoce().tecnica,
    secoes: exameObstetricoTvPrecoce().secoes,
    impressaoPadrao: exameObstetricoTvPrecoce().impressaoPadrao,
  },
  {
    id: "obstetrico-morfo-1t",
    nome: exameObstetricoMorfo1t().nome,
    tituloDocumento: exameObstetricoMorfo1t().tituloDocumento,
    tecnica: exameObstetricoMorfo1t().tecnica,
    secoes: exameObstetricoMorfo1t().secoes,
    impressaoPadrao: exameObstetricoMorfo1t().impressaoPadrao,
  },
  {
    id: "obstetrico-gemelar-1t",
    nome: exameObstetricoGemelar1t().nome,
    tituloDocumento: exameObstetricoGemelar1t().tituloDocumento,
    tecnica: exameObstetricoGemelar1t().tecnica,
    secoes: exameObstetricoGemelar1t().secoes,
    impressaoPadrao: exameObstetricoGemelar1t().impressaoPadrao,
  },
  {
    id: "obstetrico",
    nome: exameObstetricoBasico().nome,
    tituloDocumento: exameObstetricoBasico().tituloDocumento,
    tecnica: exameObstetricoBasico().tecnica,
    secoes: exameObstetricoBasico().secoes,
    impressaoPadrao: exameObstetricoBasico().impressaoPadrao,
  },
  {
    id: "obstetrico-morfo-2t",
    nome: exameObstetricoMorfo2t().nome,
    tituloDocumento: exameObstetricoMorfo2t().tituloDocumento,
    tecnica: exameObstetricoMorfo2t().tecnica,
    secoes: exameObstetricoMorfo2t().secoes,
    impressaoPadrao: exameObstetricoMorfo2t().impressaoPadrao,
  },
  {
    id: "obstetrico-doppler",
    nome: exameObstetricoDoppler().nome,
    tituloDocumento: exameObstetricoDoppler().tituloDocumento,
    tecnica: exameObstetricoDoppler().tecnica,
    secoes: exameObstetricoDoppler().secoes,
    impressaoPadrao: exameObstetricoDoppler().impressaoPadrao,
  },
  {
    id: "obstetrico-gemelar-doppler",
    nome: exameObstetricoGemelarDoppler().nome,
    tituloDocumento: exameObstetricoGemelarDoppler().tituloDocumento,
    tecnica: exameObstetricoGemelarDoppler().tecnica,
    secoes: exameObstetricoGemelarDoppler().secoes,
    impressaoPadrao: exameObstetricoGemelarDoppler().impressaoPadrao,
  },
  {
    id: "obstetrico-perfil-biofisico",
    nome: exameObstetricoPerfilBiofisico().nome,
    tituloDocumento: exameObstetricoPerfilBiofisico().tituloDocumento,
    tecnica: exameObstetricoPerfilBiofisico().tecnica,
    secoes: exameObstetricoPerfilBiofisico().secoes,
    impressaoPadrao: exameObstetricoPerfilBiofisico().impressaoPadrao,
  },
  {
    id: "obstetrico-3d4d",
    nome: exameObstetrico3d4d().nome,
    tituloDocumento: exameObstetrico3d4d().tituloDocumento,
    tecnica: exameObstetrico3d4d().tecnica,
    secoes: exameObstetrico3d4d().secoes,
    impressaoPadrao: exameObstetrico3d4d().impressaoPadrao,
  },
  {
    id: "cervicometria",
    nome: exameCervicometria().nome,
    tituloDocumento: exameCervicometria().tituloDocumento,
    tecnica: exameCervicometria().tecnica,
    secoes: exameCervicometria().secoes,
    impressaoPadrao: exameCervicometria().impressaoPadrao,
  },
  {
    id: "eco-fetal",
    nome: exameEcoFetal().nome,
    tituloDocumento: exameEcoFetal().tituloDocumento,
    tecnica: exameEcoFetal().tecnica,
    secoes: exameEcoFetal().secoes,
    impressaoPadrao: exameEcoFetal().impressaoPadrao,
  },
  {
    id: "eco-fetal-gemelar",
    nome: exameEcoFetalGemelar().nome,
    tituloDocumento: exameEcoFetalGemelar().tituloDocumento,
    tecnica: exameEcoFetalGemelar().tecnica,
    secoes: exameEcoFetalGemelar().secoes,
    impressaoPadrao: exameEcoFetalGemelar().impressaoPadrao,
  },
  {
    id: "elastografia-hepatica",
    nome: exameElastografiaHepatica().nome,
    tituloDocumento: exameElastografiaHepatica().tituloDocumento,
    tecnica: exameElastografiaHepatica().tecnica,
    secoes: exameElastografiaHepatica().secoes,
    impressaoPadrao: exameElastografiaHepatica().impressaoPadrao,
  },
  {
    id: "avaliacao-multiparametrica-hepatica",
    nome: exameAvaliacaoMultiparametricaHepatica().nome,
    tituloDocumento: exameAvaliacaoMultiparametricaHepatica().tituloDocumento,
    tecnica: exameAvaliacaoMultiparametricaHepatica().tecnica,
    secoes: exameAvaliacaoMultiparametricaHepatica().secoes,
    impressaoPadrao: exameAvaliacaoMultiparametricaHepatica().impressaoPadrao,
  },
  {
    id: "doppler-hepatico",
    nome: exameDopplerHepatico().nome,
    tituloDocumento: exameDopplerHepatico().tituloDocumento,
    tecnica: exameDopplerHepatico().tecnica,
    secoes: exameDopplerHepatico().secoes,
    impressaoPadrao: exameDopplerHepatico().impressaoPadrao,
  },
  {
    id: "ecocardiograma",
    nome: exameEcocardiograma().nome,
    tituloDocumento: exameEcocardiograma().tituloDocumento,
    tecnica: exameEcocardiograma().tecnica,
    secoes: exameEcocardiograma().secoes,
    impressaoPadrao: exameEcocardiograma().impressaoPadrao,
  },
  {
    id: "mamografia",
    nome: exameMamografia().nome,
    tituloDocumento: exameMamografia().tituloDocumento,
    tecnica: exameMamografia().tecnica,
    secoes: exameMamografia().secoes,
    impressaoPadrao: exameMamografia().impressaoPadrao,
  },
  {
    id: "arterias-temporais",
    nome: exameArteriasTemporais().nome,
    tituloDocumento: exameArteriasTemporais().tituloDocumento,
    tecnica: exameArteriasTemporais().tecnica,
    secoes: exameArteriasTemporais().secoes,
    impressaoPadrao: exameArteriasTemporais().impressaoPadrao,
  },
  {
    id: "transfontanelar",
    nome: exameTransfontanelar().nome,
    tituloDocumento: exameTransfontanelar().tituloDocumento,
    tecnica: exameTransfontanelar().tecnica,
    secoes: exameTransfontanelar().secoes,
    impressaoPadrao: exameTransfontanelar().impressaoPadrao,
  },
  {
    id: "quadril-infantil",
    nome: exameQuadrilInfantil().nome,
    tituloDocumento: exameQuadrilInfantil().tituloDocumento,
    tecnica: exameQuadrilInfantil().tecnica,
    secoes: exameQuadrilInfantil().secoes,
    impressaoPadrao: exameQuadrilInfantil().impressaoPadrao,
  },
  {
    id: "histerossonografia",
    nome: exameHisterossonografia().nome,
    tituloDocumento: exameHisterossonografia().tituloDocumento,
    tecnica: exameHisterossonografia().tecnica,
    secoes: exameHisterossonografia().secoes,
    impressaoPadrao: exameHisterossonografia().impressaoPadrao,
  },
  {
    id: "hycosy",
    nome: exameHycosy().nome,
    tituloDocumento: exameHycosy().tituloDocumento,
    tecnica: exameHycosy().tecnica,
    secoes: exameHycosy().secoes,
    impressaoPadrao: exameHycosy().impressaoPadrao,
  },
  {
    id: "pelvico-tv-hycosy",
    nome: examePelvicoTvHycosy().nome,
    tituloDocumento: examePelvicoTvHycosy().tituloDocumento,
    tecnica: examePelvicoTvHycosy().tecnica,
    secoes: examePelvicoTvHycosy().secoes,
    impressaoPadrao: examePelvicoTvHycosy().impressaoPadrao,
  },
  {
    id: "pelvico-tv-doppler",
    nome: examePelvicoTvDoppler().nome,
    tituloDocumento: examePelvicoTvDoppler().tituloDocumento,
    tecnica: examePelvicoTvDoppler().tecnica,
    secoes: examePelvicoTvDoppler().secoes,
    impressaoPadrao: examePelvicoTvDoppler().impressaoPadrao,
  },
  {
    id: "endometriose",
    nome: exameEndometriose().nome,
    tituloDocumento: exameEndometriose().tituloDocumento,
    tecnica: exameEndometriose().tecnica,
    secoes: exameEndometriose().secoes,
    impressaoPadrao: exameEndometriose().impressaoPadrao,
  },
  {
    id: "monitoracao-folicular",
    nome: exameMonitoracaoFolicular().nome,
    tituloDocumento: exameMonitoracaoFolicular().tituloDocumento,
    tecnica: exameMonitoracaoFolicular().tecnica,
    secoes: exameMonitoracaoFolicular().secoes,
    impressaoPadrao: exameMonitoracaoFolicular().impressaoPadrao,
  },
  {
    id: "prostata-transretal",
    nome: exameProstataTransretal().nome,
    tituloDocumento: exameProstataTransretal().tituloDocumento,
    tecnica: exameProstataTransretal().tecnica,
    secoes: exameProstataTransretal().secoes,
    impressaoPadrao: exameProstataTransretal().impressaoPadrao,
  },
  {
    id: "ombro",
    nome: "Ombro",
    tituloDocumento: "ULTRASSONOGRAFIA DO OMBRO",
    tecnica:
      "Exame ultrassonográfico realizado com transdutor linear de alta frequência (8–18 MHz) e manobras dinâmicas.",
    secoes: secoesOmbro(false, "direito"),
    impressaoPadrao: impressaoOmbroNormal(false, "direito"),
  },
  {
    id: "cotovelo",
    nome: "Cotovelo",
    tituloDocumento: "ULTRASSONOGRAFIA DO COTOVELO",
    tecnica:
      "Exame ultrassonográfico de alta resolução com manobras dinâmicas.",
    secoes: secoesCotovelo(false, "direito"),
    impressaoPadrao: impressaoCotoveloNormal(false, "direito"),
  },
  {
    id: "punho",
    nome: "Punho",
    tituloDocumento: "ULTRASSONOGRAFIA DO PUNHO",
    tecnica:
      "Exame ultrassonográfico com transdutor linear de alta frequência e manobras dinâmicas.",
    secoes: secoesPunho(false, "direito"),
    impressaoPadrao: impressaoPunhoNormal(false, "direito"),
  },
  {
    id: "mao",
    nome: "Mão",
    tituloDocumento: "ULTRASSONOGRAFIA DA MÃO",
    tecnica:
      "Exame ultrassonográfico com transdutor linear de alta frequência e manobras dinâmicas.",
    secoes: secoesMao(false),
    impressaoPadrao: impressaoMaoNormal(false, "direito"),
  },
  {
    id: "joelho",
    nome: "Joelho",
    tituloDocumento: "ULTRASSONOGRAFIA DO JOELHO",
    tecnica:
      "Exame ultrassonográfico de alta resolução realizado com transdutor linear de multifrequência (8–18 MHz) e convexo (3–6 MHz), associado a manobras dinâmicas.",
    secoes: secoesJoelho(false),
    impressaoPadrao: impressaoJoelhoNormal(false, "direito"),
  },
  {
    id: "quadril",
    nome: "Quadril",
    tituloDocumento: "ULTRASSONOGRAFIA DO QUADRIL",
    tecnica: "Exame ultrassonográfico com transdutores linear e convexo.",
    secoes: secoesQuadril(false, "direito"),
    impressaoPadrao: impressaoQuadrilNormal(false, "direito"),
  },
  {
    id: "tornozelo",
    nome: "Tornozelo",
    tituloDocumento: "ULTRASSONOGRAFIA DO TORNOZELO",
    tecnica:
      "Exame ultrassonográfico de alta resolução com manobras dinâmicas.",
    secoes: secoesTornozelo(false, "direito"),
    impressaoPadrao: impressaoTornozeloNormal(false, "direito"),
  },
  {
    id: "pe",
    nome: "Pé",
    tituloDocumento: "ULTRASSONOGRAFIA DO PÉ",
    tecnica: "Exame ultrassonográfico de alta resolução.",
    secoes: secoesPe(false, "direito"),
    impressaoPadrao: impressaoPeNormal(false, "direito"),
  },
  {
    id: "musculo",
    nome: "Músculo",
    tituloDocumento: "ULTRASSONOGRAFIA MUSCULAR",
    tecnica:
      "Exame ultrassonográfico direcionado de partes moles e tecido muscular com transdutor linear/convexo de alta frequência.",
    secoes: secoesMusculo(false),
    impressaoPadrao: impressaoMusculoNormal(false),
  },
  {
    id: "carotidas",
    nome: "Carótidas e Vertebrais",
    tituloDocumento:
      "ULTRASSONOGRAFIA DOPPLER DE ARTÉRIAS CARÓTIDAS E VERTEBRAIS",
    tecnica: TECNICA_CAROTIDAS,
    secoes: secoesCarotidas(),
    impressaoPadrao: IMPRESSAO_CAROTIDAS_NORMAL,
  },
  {
    id: "vertebrais",
    nome: "Artérias Vertebrais",
    tituloDocumento: "ULTRASSONOGRAFIA DOPPLER DAS ARTÉRIAS VERTEBRAIS",
    tecnica: TECNICA_LINEAR,
    secoes: [
      secaoCatalogo(
        "achados",
        "ACHADOS",
        "vertebrais::achados",
        "Artérias vertebrais pérvias, com fluxos dentro dos parâmetros da normalidade no campo do exame.",
      ),
    ],
    impressaoPadrao: "Doppler de artérias vertebrais dentro dos parâmetros da normalidade.",
  },
  {
    id: "mmii-arterial",
    nome: "Arterial MMII",
    tituloDocumento: "ULTRASSONOGRAFIA COM DOPPLER COLORIDO DAS ARTÉRIAS DOS MEMBROS INFERIORES",
    tecnica: TECNICA_MMII_ARTERIAL,
    secoes: secoesMmiiArterial("direito"),
    impressaoPadrao: impressaoMmiiArterialNormal("direito"),
  },
  {
    id: "mmii-venoso",
    nome: "Venoso MMII",
    tituloDocumento: "ULTRASSONOGRAFIA DOPPLER VENOSO DOS MEMBROS INFERIORES",
    tecnica: TECNICA_MMII_VENOSO,
    secoes: secoesMmiiVenoso("direito"),
    impressaoPadrao: impressaoMmiiVenosoNormal("direito"),
  },
  {
    id: "mmss-arterial",
    nome: "Arterial MMSS",
    tituloDocumento:
      "ULTRASSONOGRAFIA DOPPLER VASCULAR DOS MEMBROS SUPERIORES (ARTERIAL)",
    tecnica: TECNICA_MMSS_ARTERIAL,
    secoes: secoesMmssArterial("direito"),
    impressaoPadrao: impressaoMmssArterialNormal("direito"),
  },
  {
    id: "mmss-venoso",
    nome: "Venoso MMSS",
    tituloDocumento:
      "ULTRASSONOGRAFIA DOPPLER VASCULAR DOS MEMBROS SUPERIORES (VENOSO)",
    tecnica: TECNICA_MMSS_VENOSO,
    secoes: secoesMmssVenoso("direito"),
    impressaoPadrao: impressaoMmssVenosoNormal("direito"),
  },
];

/** Exames com opções padrão de retirada cirúrgica / não visibilizada */
export const exames: Exame[] = examesBase.map(enriquecerExame);

export function getExame(id: string): Exame | undefined {
  const normalizado =
    id === "tireoide-doppler"
      ? "tireoide"
      : id === "bolsa-testicular-doppler"
        ? "bolsa-testicular"
        : id === "mamas-doppler"
          ? "mamas"
          : id === "axilas-doppler"
            ? "axilas"
            : id === "pelvica-tv-doppler"
              ? "pelvica-tv"
              : id;
  return exames.find((e) => e.id === normalizado);
}

/** Título e seções do dermatológico conforme Doppler ligado/desligado */
export function ajustarExameDermatologico(
  exame: Exame,
  comDoppler: boolean,
): Exame {
  if (exame.id !== "dermatologico") return exame;
  return {
    ...exame,
    tituloDocumento: comDoppler
      ? "ULTRASSONOGRAFIA DERMATOLÓGICA COM DOPPLER COLORIDO"
      : "ULTRASSONOGRAFIA DERMATOLÓGICA",
    secoes: exame.secoes.filter(
      (s) => s.id !== "vascularizacao" || comDoppler,
    ),
  };
}

/** Título e seções da tireoide conforme Doppler ligado/desligado */
export function ajustarExameTireoide(
  exame: Exame,
  comDoppler: boolean,
): Exame {
  if (exame.id !== "tireoide") return exame;
  return {
    ...exame,
    tituloDocumento: comDoppler
      ? "ULTRASSONOGRAFIA DA TIREÓIDE COM DOPPLER COLORIDO"
      : "ULTRASSONOGRAFIA DA TIREÓIDE",
    secoes: exame.secoes
      .filter((s) => s.id !== "doppler" || comDoppler)
      .map((s) => {
        if (s.id === "lobo-d" || s.id === "lobo-e") {
          return secoesLoboTireoide(s.id, s.titulo, comDoppler);
        }
        return s;
      }),
  };
}

/** Técnica, título, impressão e seções da região inguinal conforme Doppler */
export function ajustarExameRegiaoInguinal(
  exame: Exame,
  comDoppler: boolean,
): Exame {
  if (exame.id !== "regiao-inguinal") return exame;
  return {
    ...exame,
    tituloDocumento: comDoppler
      ? "ULTRASSONOGRAFIA DE REGIÃO INGUINAL COM DOPPLER COLORIDO"
      : "ULTRASSONOGRAFIA DE REGIÃO INGUINAL",
    tecnica: tecnicaInguinal(comDoppler),
    impressaoPadrao: impressaoPadraoInguinal(comDoppler),
    secoes: [
      secaoInguinal("inguinal-direita", "REGIÃO INGUINAL DIREITA", comDoppler),
      secaoInguinal("inguinal-esquerda", "REGIÃO INGUINAL ESQUERDA", comDoppler),
    ],
  };
}

/** Técnica, título e seções da bolsa testicular conforme Doppler */
export function ajustarExameBolsaTesticular(
  exame: Exame,
  comDoppler: boolean,
): Exame {
  if (exame.id !== "bolsa-testicular") return exame;
  return {
    ...exame,
    tituloDocumento: comDoppler
      ? "ULTRASSONOGRAFIA DOS TESTÍCULOS COM DOPPLER COLORIDO"
      : "ULTRASSONOGRAFIA DOS TESTÍCULOS",
    tecnica: tecnicaBolsaTesticular(comDoppler),
    secoes: secoesBolsaTesticular(comDoppler),
  };
}

/** Mamas com/sem Doppler */
export function ajustarExameMamas(exame: Exame, comDoppler: boolean): Exame {
  if (exame.id !== "mamas") return exame;
  return {
    ...exame,
    tituloDocumento: comDoppler
      ? "ULTRASSONOGRAFIA DAS MAMAS COM DOPPLER COLORIDO"
      : "ULTRASSONOGRAFIA DAS MAMAS",
    secoes: [
      secaoMama("mama-direita", "MAMA DIREITA", comDoppler),
      secaoMama("mama-esquerda", "MAMA ESQUERDA", comDoppler),
      secaoBirads(),
    ],
  };
}

/** Regiões axilares com/sem Doppler */
export function ajustarExameAxilas(exame: Exame, comDoppler: boolean): Exame {
  if (exame.id !== "axilas") return exame;
  return {
    ...exame,
    tituloDocumento: comDoppler
      ? "ULTRASSONOGRAFIA DAS REGIÕES AXILARES COM DOPPLER COLORIDO"
      : "ULTRASSONOGRAFIA DAS REGIÕES AXILARES",
    secoes: [
      secaoAxila("axila-direita", "AXILA DIREITA", comDoppler),
      secaoAxila("axila-esquerda", "AXILA ESQUERDA", comDoppler),
    ],
  };
}

/** Pélvica transvaginal com/sem Doppler */
export function ajustarExamePelvicaTv(
  exame: Exame,
  comDoppler: boolean,
): Exame {
  if (exame.id !== "pelvica-tv") return exame;
  return {
    ...exame,
    nome: "Pélvica Transvaginal",
    tituloDocumento: comDoppler
      ? "ULTRASSONOGRAFIA PÉLVICA - VIA TRANSVAGINAL COM DOPPLER COLORIDO"
      : "ULTRASSONOGRAFIA PÉLVICA - VIA TRANSVAGINAL",
    secoes: secoesPelvicaTv(comDoppler),
  };
}

/** Cotovelo D/E com/sem Doppler */
export function ajustarExameCotovelo(
  exame: Exame,
  comDoppler: boolean,
  lado: "direito" | "esquerdo" | null = null,
): Exame {
  return ajustarExameCotoveloMsk(exame, comDoppler, lado);
}

export function ajustarExameOmbro(
  exame: Exame,
  comDoppler: boolean,
  lado: "direito" | "esquerdo" | null = null,
): Exame {
  return ajustarExameOmbroMsk(exame, comDoppler, lado);
}

export function ajustarExamePunho(
  exame: Exame,
  comDoppler: boolean,
  lado: "direito" | "esquerdo" | null = null,
): Exame {
  return ajustarExamePunhoMsk(exame, comDoppler, lado);
}

export function ajustarExameMao(
  exame: Exame,
  comDoppler: boolean,
  lado: "direito" | "esquerdo" | null = null,
): Exame {
  return ajustarExameMaoMsk(exame, comDoppler, lado);
}

export function ajustarExameQuadril(
  exame: Exame,
  comDoppler: boolean,
  lado: "direito" | "esquerdo" | null = null,
): Exame {
  return ajustarExameQuadrilMsk(exame, comDoppler, lado);
}

export function ajustarExameTornozelo(
  exame: Exame,
  comDoppler: boolean,
  lado: "direito" | "esquerdo" | null = null,
): Exame {
  return ajustarExameTornozeloMsk(exame, comDoppler, lado);
}

export function ajustarExamePe(
  exame: Exame,
  comDoppler: boolean,
  lado: "direito" | "esquerdo" | null = null,
): Exame {
  return ajustarExamePeMsk(exame, comDoppler, lado);
}

export function ajustarExameMusculo(
  exame: Exame,
  comDoppler: boolean,
): Exame {
  return ajustarExameMusculoMsk(exame, comDoppler);
}

export function ajustarExameMmiiVenoso(
  exame: Exame,
  lado: LadoArticulacao | null = null,
): Exame {
  return ajustarExameMmiiVenosoBase(exame, lado);
}

export function ajustarExameMmiiArterial(
  exame: Exame,
  lado: LadoArticulacao | null = null,
): Exame {
  return ajustarExameMmiiArterialBase(exame, lado);
}

export function ajustarExameMmssVenoso(
  exame: Exame,
  lado: LadoArticulacao | null = null,
): Exame {
  return ajustarExameMmssVenosoBase(exame, lado);
}

export function ajustarExameMmssArterial(
  exame: Exame,
  lado: LadoArticulacao | null = null,
): Exame {
  return ajustarExameMmssArterialBase(exame, lado);
}

/** Joelho D/E com/sem Doppler */
export function ajustarExameJoelho(
  exame: Exame,
  comDoppler: boolean,
  lado: "direito" | "esquerdo" | null = null,
): Exame {
  if (exame.id !== "joelho") return exame;
  const ladoEfetivo = lado === "esquerdo" ? "esquerdo" : "direito";
  const baseTitulo =
    exame.tituloDocumento?.replace(/\s*COM DOPPLER COLORIDO/gi, "").trim() ||
    "ULTRASSONOGRAFIA DO JOELHO";
  return {
    ...exame,
    tecnica: comDoppler
      ? "Exame ultrassonográfico de alta resolução realizado com transdutor linear de multifrequência (8–18 MHz) e convexo (3–6 MHz), associado a estudo Doppler colorido e manobras dinâmicas."
      : "Exame ultrassonográfico de alta resolução realizado com transdutor linear de multifrequência (8–18 MHz) e convexo (3–6 MHz), associado a manobras dinâmicas.",
    tituloDocumento: comDoppler
      ? `${baseTitulo} COM DOPPLER COLORIDO`
      : baseTitulo,
    secoes: secoesJoelho(comDoppler),
    impressaoPadrao: impressaoJoelhoNormal(comDoppler, ladoEfetivo),
  };
}
