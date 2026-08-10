export type Genero = "Dr." | "Dra.";

export type Medico = {
  nome: string;
  crm: string;
  email: string;
  endereco: string;
  senha: string;
  genero: Genero;
};

const USERS_KEY = "beramed_medicos";
const SESSION_KEY = "beramed_sessao";

export function validarSenha(senha: string): string | null {
  if (senha.length < 6 || senha.length > 18) {
    return "A senha deve ter entre 6 e 18 caracteres.";
  }
  if (!/[a-z]/.test(senha)) {
    return "A senha deve conter pelo menos uma letra minúscula.";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve conter pelo menos uma letra maiúscula.";
  }
  if (!/[0-9]/.test(senha)) {
    return "A senha deve conter pelo menos um número.";
  }
  return null;
}

function lerMedicos(): Medico[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Medico[];
  } catch {
    return [];
  }
}

function salvarMedicos(lista: Medico[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(lista));
}

export function cadastrarMedico(
  dados: Omit<Medico, "crm"> & { crm: string },
): string | null {
  const crm = dados.crm.trim();
  const nome = dados.nome.trim();
  const email = dados.email.trim().toLowerCase();
  const endereco = dados.endereco.trim();

  if (!nome) return "Informe o nome do médico.";
  if (!crm) return "Informe o CRM.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Informe um e-mail válido.";
  }
  if (!endereco) return "Informe o endereço.";
  if (dados.genero !== "Dr." && dados.genero !== "Dra.") {
    return "Selecione Dr. ou Dra.";
  }

  const erroSenha = validarSenha(dados.senha);
  if (erroSenha) return erroSenha;

  const lista = lerMedicos();
  if (lista.some((m) => m.crm.toLowerCase() === crm.toLowerCase())) {
    return "Já existe um cadastro com este CRM.";
  }
  if (lista.some((m) => m.email.toLowerCase() === email)) {
    return "Já existe um cadastro com este e-mail.";
  }

  lista.push({
    nome,
    crm,
    email,
    endereco,
    senha: dados.senha,
    genero: dados.genero,
  });
  salvarMedicos(lista);
  return null;
}

export function autenticar(crm: string, senha: string): string | null {
  const lista = lerMedicos();
  const medico = lista.find(
    (m) => m.crm.toLowerCase() === crm.trim().toLowerCase(),
  );
  if (!medico || medico.senha !== senha) {
    return "CRM ou senha inválidos.";
  }
  const sessao: Omit<Medico, "senha"> = {
    nome: medico.nome,
    crm: medico.crm,
    email: medico.email,
    endereco: medico.endereco,
    genero: medico.genero,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessao));
  return null;
}

export type SessaoMedico = Omit<Medico, "senha">;

export function getSessao(): SessaoMedico | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessaoMedico;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function saudacaoHorario(): string {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export function tituloMedico(s: SessaoMedico): string {
  return `${s.genero} ${s.nome}`;
}
