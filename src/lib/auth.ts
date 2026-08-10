export type Genero = "Dr." | "Dra.";

export type Medico = {
  nome: string;
  crm: string;
  email: string;
  telefone: string;
  endereco: string;
  especialidade: string;
  rqe: string;
  senha: string;
  genero: Genero;
};

export type SessaoMedico = Omit<Medico, "senha">;

export type SessaoMaster = {
  tipo: "master";
  nome: string;
};

const USERS_KEY = "beramed_medicos";
const SESSION_KEY = "beramed_sessao";
const MASTER_SESSION_KEY = "beramed_master";

export const MASTER_USER = "Bera";
export const MASTER_PASS = "1406";

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
    const lista = JSON.parse(raw) as Partial<Medico>[];
    return lista.map((m) => ({
      nome: m.nome ?? "",
      crm: m.crm ?? "",
      email: m.email ?? "",
      telefone: m.telefone ?? "",
      endereco: m.endereco ?? "",
      especialidade: m.especialidade ?? "",
      rqe: m.rqe ?? "",
      senha: m.senha ?? "",
      genero: (m.genero as Genero) ?? "Dr.",
    }));
  } catch {
    return [];
  }
}

function salvarMedicos(lista: Medico[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(lista));
}

export function listarMedicos(): SessaoMedico[] {
  return lerMedicos().map(({ senha: _s, ...rest }) => rest);
}

export function apagarMedico(crm: string): boolean {
  const lista = lerMedicos();
  const filtrada = lista.filter(
    (m) => m.crm.toLowerCase() !== crm.trim().toLowerCase(),
  );
  if (filtrada.length === lista.length) return false;
  salvarMedicos(filtrada);

  const sessao = getSessao();
  if (sessao && sessao.crm.toLowerCase() === crm.trim().toLowerCase()) {
    logout();
  }
  return true;
}

export function cadastrarMedico(dados: Medico): string | null {
  const crm = dados.crm.trim();
  const nome = dados.nome.trim();
  const email = dados.email.trim().toLowerCase();
  const telefone = dados.telefone.trim();
  const endereco = dados.endereco.trim();
  const especialidade = dados.especialidade.trim();
  const rqe = dados.rqe.trim();

  if (!nome) return "Informe o nome do médico.";
  if (!crm) return "Informe o CRM.";
  if (crm.toLowerCase() === MASTER_USER.toLowerCase()) {
    return "Este login é reservado ao administrador.";
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Informe um e-mail válido.";
  }
  if (!telefone) return "Informe o telefone.";
  if (!endereco) return "Informe o endereço.";
  if (!especialidade) return "Informe a especialidade médica.";
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
    telefone,
    endereco,
    especialidade,
    rqe,
    senha: dados.senha,
    genero: dados.genero,
  });
  salvarMedicos(lista);
  return null;
}

export function isMasterLogin(usuario: string, senha: string): boolean {
  return (
    usuario.trim().toLowerCase() === MASTER_USER.toLowerCase() &&
    senha === MASTER_PASS
  );
}

export function autenticarMaster(usuario: string, senha: string): string | null {
  if (!isMasterLogin(usuario, senha)) {
    return "Usuário ou senha master inválidos.";
  }
  const sessao: SessaoMaster = { tipo: "master", nome: MASTER_USER };
  localStorage.setItem(MASTER_SESSION_KEY, JSON.stringify(sessao));
  localStorage.removeItem(SESSION_KEY);
  return null;
}

export function getMasterSessao(): SessaoMaster | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(MASTER_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessaoMaster;
  } catch {
    return null;
  }
}

export function autenticar(crm: string, senha: string): string | null {
  if (isMasterLogin(crm, senha)) {
    return autenticarMaster(crm, senha);
  }

  const lista = lerMedicos();
  const medico = lista.find(
    (m) => m.crm.toLowerCase() === crm.trim().toLowerCase(),
  );
  if (!medico || medico.senha !== senha) {
    return "CRM ou senha inválidos.";
  }
  const sessao: SessaoMedico = {
    nome: medico.nome,
    crm: medico.crm,
    email: medico.email,
    telefone: medico.telefone,
    endereco: medico.endereco,
    especialidade: medico.especialidade,
    rqe: medico.rqe,
    genero: medico.genero,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessao));
  localStorage.removeItem(MASTER_SESSION_KEY);
  return null;
}

export function getSessao(): SessaoMedico | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Partial<SessaoMedico>;
    return {
      nome: s.nome ?? "",
      crm: s.crm ?? "",
      email: s.email ?? "",
      telefone: s.telefone ?? "",
      endereco: s.endereco ?? "",
      especialidade: s.especialidade ?? "",
      rqe: s.rqe ?? "",
      genero: (s.genero as Genero) ?? "Dr.",
    };
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(MASTER_SESSION_KEY);
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

export function assinaturaMedico(s: SessaoMedico): string {
  const partes = [`${tituloMedico(s)} — CRM ${s.crm}`];
  if (s.especialidade.trim()) {
    let esp = s.especialidade.trim();
    if (s.rqe.trim()) {
      esp += ` — RQE ${s.rqe.trim()}`;
    }
    partes.push(esp);
  } else if (s.rqe.trim()) {
    partes.push(`RQE ${s.rqe.trim()}`);
  }
  return partes.join("\n");
}
