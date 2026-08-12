export type MedicoSolicitante = {
  id: string;
  nome: string;
  /** Apenas dígitos, quando conhecido */
  crm?: string;
  uf?: string;
  atualizadoEm: string;
};

export function formatarSolicitanteExibicao(m: {
  nome: string;
  crm?: string;
}): string {
  const nome = m.nome.trim();
  const crm = m.crm?.replace(/\D/g, "") || "";
  if (crm) return `${nome} (CRM ${crm})`;
  return nome;
}
