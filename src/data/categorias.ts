import { exames, getExame, type Exame } from "@/data/exames";

export type CategoriaExameId =
  | "medicina-interna"
  | "ginecologia"
  | "obstetricia"
  | "musculo-esqueletico"
  | "vascular"
  | "urologia";

export type CategoriaExame = {
  id: CategoriaExameId;
  nome: string;
  exameIds: string[];
};

/** Agrupamento dos laudos por área clínica */
export const categoriasExame: CategoriaExame[] = [
  {
    id: "medicina-interna",
    nome: "Medicina Interna",
    exameIds: [
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
    ],
  },
  {
    id: "ginecologia",
    nome: "Ginecologia",
    exameIds: [
      "mamas",
      "axilas",
      "pelvica",
      "pelvica-tv",
    ],
  },
  {
    id: "obstetricia",
    nome: "Obstetrícia",
    exameIds: ["obstetrico"],
  },
  {
    id: "musculo-esqueletico",
    nome: "Músculo Esquelético",
    exameIds: [
      "ombro",
      "cotovelo",
      "punho",
      "mao",
      "joelho",
      "quadril",
      "tornozelo",
      "pe",
      "musculo",
    ],
  },
  {
    id: "vascular",
    nome: "Vascular",
    exameIds: ["carotidas", "vertebrais", "mmii-arterial", "mmii-venoso"],
  },
  {
    id: "urologia",
    nome: "Urologia",
    exameIds: [
      "aparelho-urinario",
      "prostata",
      "bolsa-testicular",
      "penis",
    ],
  },
];

export function examesDaCategoria(categoriaId: CategoriaExameId): Exame[] {
  const cat = categoriasExame.find((c) => c.id === categoriaId);
  if (!cat) return [];
  return cat.exameIds
    .map((id) => getExame(id))
    .filter((e): e is Exame => e != null);
}

/** Exames da categoria em ordem alfabética (pt-BR) */
export function examesDaCategoriaAlfabetico(
  categoriaId: CategoriaExameId,
): Exame[] {
  return examesDaCategoria(categoriaId)
    .slice()
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

/**
 * Distribui itens em colunas (preenchimento de cima para baixo em cada coluna).
 * Ex.: A B C D E F G com 3 colunas → [A D G] [B E] [C F]
 */
export function distribuirEmColunas<T>(itens: T[], colunas = 3): T[][] {
  if (itens.length === 0) return Array.from({ length: colunas }, () => []);
  const cols = Math.max(1, colunas);
  const porColuna = Math.ceil(itens.length / cols);
  const out: T[][] = [];
  for (let c = 0; c < cols; c++) {
    out.push(itens.slice(c * porColuna, (c + 1) * porColuna));
  }
  return out.filter((col) => col.length > 0);
}

export function categoriaDoExame(exameId: string): CategoriaExameId {
  for (const cat of categoriasExame) {
    if (cat.exameIds.includes(exameId)) return cat.id;
  }
  return "medicina-interna";
}

/** Todos os exames na ordem das categorias (evita órfãos fora da lista) */
export function examesOrdenadosPorCategoria(): Exame[] {
  const visto = new Set<string>();
  const out: Exame[] = [];
  for (const cat of categoriasExame) {
    for (const id of cat.exameIds) {
      if (visto.has(id)) continue;
      const e = getExame(id);
      if (!e) continue;
      visto.add(id);
      out.push(e);
    }
  }
  for (const e of exames) {
    if (visto.has(e.id)) continue;
    out.push(e);
  }
  return out;
}
