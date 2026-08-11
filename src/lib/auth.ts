export type Genero = "Dr." | "Dra.";

export type TipoAssinatura = "" | "jpg" | "certificado";

export type Medico = {
  nome: string;
  crm: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  especialidade: string;
  rqe: string;
  senha: string;
  genero: Genero;
  /** Locais de atendimento gravados no perfil */
  locaisTrabalho: string[];
  /** Local ativo exibido no rodapé do laudo */
  localAtivo: string;
  /** Data URL da assinatura JPG */
  assinaturaJpg: string;
  /** Nome do arquivo de certificado digital, se houver */
  certificadoNome: string;
  tipoAssinatura: TipoAssinatura;
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

export function formatarCep(valor: string): string {
  const digitos = valor.replace(/\D/g, "").slice(0, 8);
  if (digitos.length <= 5) return digitos;
  return `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
}

export function formatarDataBr(valor: string): string {
  const digitos = valor.replace(/\D/g, "").slice(0, 8);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 4) {
    return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
  }
  return `${digitos.slice(0, 2)}/${digitos.slice(2, 4)}/${digitos.slice(4)}`;
}

export const DISCLAIMER_IMPRESSAO =
  "A impressão diagnóstica em exames de imagem não é absoluta, devendo ser correlacionada com dados clínicos, laboratoriais e outros métodos de imagem complementares.";

export function formatarEndereco(
  m: Pick<
    Medico,
    | "logradouro"
    | "numero"
    | "complemento"
    | "bairro"
    | "cidade"
    | "estado"
    | "cep"
  >,
): string {
  const linha1 = [m.logradouro, m.numero].filter(Boolean).join(", ");
  const linha2 = [m.complemento, m.bairro].filter(Boolean).join(" — ");
  const linha3 = [m.cidade, m.estado].filter(Boolean).join(" / ");
  const cep = m.cep ? `CEP ${m.cep}` : "";
  return [linha1, linha2, linha3, cep].filter(Boolean).join(" · ");
}

function normalizarLocais(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((x) => String(x ?? "").trim())
    .filter(Boolean)
    .filter((v, i, arr) => arr.findIndex((y) => y.toLowerCase() === v.toLowerCase()) === i);
}

function normalizarMedico(m: Partial<Medico> & { endereco?: string }): Medico {
  const locais = normalizarLocais(m.locaisTrabalho);
  let localAtivo = (m.localAtivo ?? "").trim();
  if (localAtivo && !locais.some((l) => l.toLowerCase() === localAtivo.toLowerCase())) {
    locais.push(localAtivo);
  }
  if (!localAtivo && locais.length > 0) localAtivo = locais[0];

  return {
    nome: m.nome ?? "",
    crm: m.crm ?? "",
    email: m.email ?? "",
    telefone: m.telefone ?? "",
    cep: m.cep ?? "",
    logradouro: m.logradouro ?? "",
    numero: m.numero ?? "",
    complemento: m.complemento ?? "",
    bairro: m.bairro ?? "",
    cidade: m.cidade ?? "",
    estado: m.estado ?? "",
    especialidade: m.especialidade ?? "",
    rqe: m.rqe ?? "",
    senha: m.senha ?? "",
    genero: (m.genero as Genero) ?? "Dr.",
    locaisTrabalho: locais,
    localAtivo,
    assinaturaJpg: m.assinaturaJpg ?? "",
    certificadoNome: m.certificadoNome ?? "",
    tipoAssinatura: (m.tipoAssinatura as TipoAssinatura) ?? "",
  };
}

function lerMedicos(): Medico[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const lista = JSON.parse(raw) as Array<Partial<Medico> & { endereco?: string }>;
    return lista.map((m) => {
      const n = normalizarMedico(m);
      if (!n.logradouro && m.endereco) {
        n.logradouro = m.endereco;
      }
      return n;
    });
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
  const cep = formatarCep(dados.cep);
  const logradouro = dados.logradouro.trim();
  const numero = dados.numero.trim();
  const complemento = dados.complemento.trim();
  const bairro = dados.bairro.trim();
  const cidade = dados.cidade.trim();
  const estado = dados.estado.trim().toUpperCase();
  const especialidade = dados.especialidade.trim();
  const rqe = dados.rqe.trim();
  const locaisTrabalho = normalizarLocais(dados.locaisTrabalho);
  let localAtivo = (dados.localAtivo || "").trim();
  if (localAtivo && !locaisTrabalho.some((l) => l.toLowerCase() === localAtivo.toLowerCase())) {
    locaisTrabalho.push(localAtivo);
  }
  if (!localAtivo && locaisTrabalho[0]) localAtivo = locaisTrabalho[0];

  if (!nome) return "Informe o nome do médico.";
  if (!crm) return "Informe o CRM.";
  if (crm.toLowerCase() === MASTER_USER.toLowerCase()) {
    return "Este login é reservado ao administrador.";
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Informe um e-mail válido.";
  }
  if (!telefone) return "Informe o telefone.";
  if (cep.replace(/\D/g, "").length !== 8) return "Informe um CEP válido.";
  if (!logradouro) return "Informe o logradouro.";
  if (!numero) return "Informe o número.";
  if (!bairro) return "Informe o bairro.";
  if (!cidade) return "Informe a cidade.";
  if (!estado || estado.length !== 2) return "Informe o estado (UF).";
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
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    especialidade,
    rqe,
    senha: dados.senha,
    genero: dados.genero,
    locaisTrabalho,
    localAtivo,
    assinaturaJpg: dados.assinaturaJpg ?? "",
    certificadoNome: dados.certificadoNome ?? "",
    tipoAssinatura: dados.tipoAssinatura ?? "",
  });
  salvarMedicos(lista);
  return null;
}

export type DadosAtualizacaoMedico = Omit<Medico, "senha" | "crm"> & {
  senhaNova?: string;
};

function validarDadosPerfil(
  dados: Omit<Medico, "senha" | "crm"> & { crm?: string },
): string | null {
  const nome = dados.nome.trim();
  const email = dados.email.trim().toLowerCase();
  const telefone = dados.telefone.trim();
  const cep = formatarCep(dados.cep);
  const logradouro = dados.logradouro.trim();
  const numero = dados.numero.trim();
  const bairro = dados.bairro.trim();
  const cidade = dados.cidade.trim();
  const estado = dados.estado.trim().toUpperCase();

  if (!nome) return "Informe o nome do médico.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Informe um e-mail válido.";
  }
  if (!telefone) return "Informe o telefone.";
  if (cep.replace(/\D/g, "").length !== 8) return "Informe um CEP válido.";
  if (!logradouro) return "Informe o logradouro.";
  if (!numero) return "Informe o número.";
  if (!bairro) return "Informe o bairro.";
  if (!cidade) return "Informe a cidade.";
  if (!estado || estado.length !== 2) return "Informe o estado (UF).";
  if (dados.genero !== "Dr." && dados.genero !== "Dra.") {
    return "Selecione Dr. ou Dra.";
  }
  return null;
}

export function atualizarMedico(
  crmAtual: string,
  dados: DadosAtualizacaoMedico,
): string | null {
  const lista = lerMedicos();
  const idx = lista.findIndex(
    (m) => m.crm.toLowerCase() === crmAtual.trim().toLowerCase(),
  );
  if (idx < 0) return "Cadastro não encontrado.";

  const erro = validarDadosPerfil(dados);
  if (erro) return erro;

  const email = dados.email.trim().toLowerCase();
  if (lista.some((m, i) => i !== idx && m.email.toLowerCase() === email)) {
    return "Já existe um cadastro com este e-mail.";
  }

  let senha = lista[idx].senha;
  if (dados.senhaNova && dados.senhaNova.trim()) {
    const erroSenha = validarSenha(dados.senhaNova);
    if (erroSenha) return erroSenha;
    senha = dados.senhaNova;
  }

  const locaisTrabalho = normalizarLocais(dados.locaisTrabalho);
  let localAtivo = (dados.localAtivo || "").trim();
  if (localAtivo && !locaisTrabalho.some((l) => l.toLowerCase() === localAtivo.toLowerCase())) {
    locaisTrabalho.push(localAtivo);
  }
  if (!localAtivo && locaisTrabalho[0]) localAtivo = locaisTrabalho[0];

  const atualizado: Medico = {
    ...lista[idx],
    nome: dados.nome.trim(),
    email,
    telefone: dados.telefone.trim(),
    cep: formatarCep(dados.cep),
    logradouro: dados.logradouro.trim(),
    numero: dados.numero.trim(),
    complemento: dados.complemento.trim(),
    bairro: dados.bairro.trim(),
    cidade: dados.cidade.trim(),
    estado: dados.estado.trim().toUpperCase(),
    especialidade: dados.especialidade.trim(),
    rqe: dados.rqe.trim(),
    genero: dados.genero,
    senha,
    locaisTrabalho,
    localAtivo,
    assinaturaJpg: dados.assinaturaJpg ?? "",
    certificadoNome: dados.certificadoNome ?? "",
    tipoAssinatura: dados.tipoAssinatura ?? "",
  };

  lista[idx] = atualizado;
  salvarMedicos(lista);
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessaoDeMedico(atualizado)));
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

function sessaoDeMedico(medico: Medico): SessaoMedico {
  const { senha: _s, ...rest } = medico;
  return rest;
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
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessaoDeMedico(medico)));
  localStorage.removeItem(MASTER_SESSION_KEY);
  return null;
}

export function getSessao(): SessaoMedico | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { senha: _s, ...rest } = normalizarMedico(
      JSON.parse(raw) as Partial<Medico>,
    );
    return rest;
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
  const linhas = [tituloMedico(s), `CRM ${s.crm}`];
  if (s.especialidade.trim()) {
    let esp = s.especialidade.trim();
    if (s.rqe.trim()) esp += ` — RQE ${s.rqe.trim()}`;
    linhas.push(esp);
  } else if (s.rqe.trim()) {
    linhas.push(`RQE ${s.rqe.trim()}`);
  }
  return linhas.join("\n");
}

/** Compacta JPG para caber no localStorage */
export async function compactarAssinaturaJpg(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Envie um arquivo de imagem JPG.");
  }
  const bitmap = await createImageBitmap(file);
  const maxW = 420;
  const scale = Math.min(1, maxW / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Não foi possível processar a imagem.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.72);
}
