export type ViaCepResultado = {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export async function buscarCep(cep: string): Promise<ViaCepResultado> {
  const digitos = cep.replace(/\D/g, "");
  if (digitos.length !== 8) {
    throw new Error("CEP deve ter 8 dígitos.");
  }

  const res = await fetch(`https://viacep.com.br/ws/${digitos}/json/`);
  if (!res.ok) {
    throw new Error("Falha ao consultar o CEP.");
  }

  const data = (await res.json()) as {
    erro?: boolean;
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
  };

  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  return {
    cep: data.cep ?? digitos,
    logradouro: data.logradouro ?? "",
    bairro: data.bairro ?? "",
    cidade: data.localidade ?? "",
    estado: data.uf ?? "",
  };
}
