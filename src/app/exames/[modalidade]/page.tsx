import { notFound } from "next/navigation";
import LaudosGate from "@/components/LaudosGate";
import { getModalidade, isModalidadeId } from "@/data/modalidades";

type Props = {
  params: Promise<{ modalidade: string }>;
};

export default async function ExameModalidadePage({ params }: Props) {
  const { modalidade } = await params;
  if (!isModalidadeId(modalidade) || !getModalidade(modalidade)) {
    notFound();
  }
  return <LaudosGate modalidadeId={modalidade} />;
}
