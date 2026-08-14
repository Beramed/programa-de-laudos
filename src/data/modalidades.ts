import {
  categoriasExame,
  type CategoriaExame,
  type CategoriaExameId,
} from "@/data/categorias";
import type { Genero } from "@/lib/auth";

export type ModalidadeId =
  | "ultrassom"
  | "tomografia"
  | "ressonancia"
  | "mamografia"
  | "raio-x"
  | "ecocardiografia";

export type Modalidade = {
  id: ModalidadeId;
  nome: string;
  nomeCurto: string;
  imagemDr: string;
  imagemDra: string;
};

/** Exames que saem do Ultrassom e ficam na página de Ecocardiografia */
export const EXAMES_ECOCARDIOGRAFIA = [
  "ecocardiograma",
  "carotidas",
  "vertebrais",
] as const;

const EXAMES_ECO_SET = new Set<string>(EXAMES_ECOCARDIOGRAFIA);

export const modalidades: Modalidade[] = [
  {
    id: "ultrassom",
    nome: "Ultrassom",
    nomeCurto: "US",
    imagemDr: "/modalidades/dr-ultrassom.png",
    imagemDra: "/modalidades/dra-ultrassom.png",
  },
  {
    id: "tomografia",
    nome: "Tomografia computadorizada",
    nomeCurto: "TC",
    imagemDr: "/modalidades/dr-tomografia.png",
    imagemDra: "/modalidades/dra-tomografia.png",
  },
  {
    id: "ressonancia",
    nome: "Ressonância magnética",
    nomeCurto: "RM",
    imagemDr: "/modalidades/dr-ressonancia.png",
    imagemDra: "/modalidades/dra-ressonancia.png",
  },
  {
    id: "mamografia",
    nome: "Mamografia",
    nomeCurto: "MG",
    imagemDr: "/modalidades/dr-mamografia.png",
    imagemDra: "/modalidades/dra-mamografia.png",
  },
  {
    id: "raio-x",
    nome: "Raio-X",
    nomeCurto: "RX",
    imagemDr: "/modalidades/dr-raio-x.png",
    imagemDra: "/modalidades/dra-raio-x.png",
  },
  {
    id: "ecocardiografia",
    nome: "Ecocardiografia",
    nomeCurto: "ECO",
    imagemDr: "/modalidades/dr-ecocardiografia.png",
    imagemDra: "/modalidades/dra-ecocardiografia.png",
  },
];

export function getModalidade(id: string): Modalidade | undefined {
  return modalidades.find((m) => m.id === id);
}

export function imagemModalidade(m: Modalidade, genero: Genero): string {
  return genero === "Dra." ? m.imagemDra : m.imagemDr;
}

export function isModalidadeId(id: string): id is ModalidadeId {
  return modalidades.some((m) => m.id === id);
}

/** Categorias/exames disponíveis em cada sistema de laudos */
export function categoriasDaModalidade(
  modalidadeId: ModalidadeId,
): CategoriaExame[] {
  if (modalidadeId === "ultrassom") {
    return categoriasExame
      .map((cat) => ({
        ...cat,
        exameIds: cat.exameIds.filter((id) => !EXAMES_ECO_SET.has(id)),
      }))
      .filter((cat) => cat.exameIds.length > 0);
  }

  if (modalidadeId === "ecocardiografia") {
    return [
      {
        id: "cardiologia" as CategoriaExameId,
        nome: "Cardiologia",
        exameIds: ["ecocardiograma"],
      },
      {
        id: "vascular" as CategoriaExameId,
        nome: "Vascular cervical",
        exameIds: ["carotidas", "vertebrais"],
      },
    ];
  }

  if (modalidadeId === "mamografia") {
    return [
      {
        id: "ginecologia" as CategoriaExameId,
        nome: "Mamografia",
        exameIds: ["mamografia"],
      },
    ];
  }

  return [];
}

export function exameInicialDaModalidade(
  modalidadeId: ModalidadeId,
): string | null {
  const cats = categoriasDaModalidade(modalidadeId);
  return cats[0]?.exameIds[0] ?? null;
}

export function modalidadeTemLaudos(modalidadeId: ModalidadeId): boolean {
  return categoriasDaModalidade(modalidadeId).some(
    (c) => c.exameIds.length > 0,
  );
}
