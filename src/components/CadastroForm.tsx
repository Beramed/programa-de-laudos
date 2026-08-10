"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  autenticar,
  cadastrarMedico,
  formatarCep,
  getMasterSessao,
  getSessao,
  type Genero,
  validarSenha,
} from "@/lib/auth";
import { buscarCep } from "@/lib/cep";

export default function CadastroForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [rqe, setRqe] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [genero, setGenero] = useState<Genero>("Dr.");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [msgCep, setMsgCep] = useState("");

  useEffect(() => {
    if (getMasterSessao()) {
      router.replace("/admin");
      return;
    }
    if (getSessao()) router.replace("/laudos");
  }, [router]);

  async function onCepChange(valor: string) {
    const formatado = formatarCep(valor);
    setCep(formatado);
    setMsgCep("");

    const digitos = formatado.replace(/\D/g, "");
    if (digitos.length !== 8) return;

    setBuscandoCep(true);
    try {
      const dados = await buscarCep(digitos);
      setCep(formatarCep(dados.cep));
      setLogradouro(dados.logradouro);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setMsgCep("Endereço preenchido pelo CEP.");
    } catch (err) {
      setMsgCep(
        err instanceof Error ? err.message : "Não foi possível buscar o CEP.",
      );
    } finally {
      setBuscandoCep(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");
    setOk("");

    const falhaSenha = validarSenha(senha);
    if (falhaSenha) {
      setErro(falhaSenha);
      return;
    }
    if (senha !== confirmar) {
      setErro("A confirmação de senha não confere.");
      return;
    }

    const falha = cadastrarMedico({
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
      senha,
      genero,
    });
    if (falha) {
      setErro(falha);
      return;
    }

    autenticar(crm, senha);
    setOk("Cadastro realizado com sucesso.");
    router.push("/laudos");
  }

  return (
    <main className="auth-page">
      <div className="auth-card auth-card-wide">
        <div className="auth-logo-wrap compact">
          <Image
            src="/beramed-logo.png"
            alt="BeraMed Laudos"
            width={180}
            height={180}
            priority
            className="auth-logo"
          />
        </div>

        <h1 className="auth-title">Cadastro do médico</h1>
        <p className="auth-subtitle">
          O login de acesso será o número do CRM. Digite o CEP para preencher
          automaticamente o endereço.
        </p>

        <form className="auth-form register-grid" onSubmit={onSubmit} noValidate>
          <fieldset className="genero-field">
            <legend>Gênero</legend>
            <label className={`genero-option ${genero === "Dr." ? "on" : ""}`}>
              <input
                type="radio"
                name="genero"
                value="Dr."
                checked={genero === "Dr."}
                onChange={() => setGenero("Dr.")}
              />
              Dr.
            </label>
            <label className={`genero-option ${genero === "Dra." ? "on" : ""}`}>
              <input
                type="radio"
                name="genero"
                value="Dra."
                checked={genero === "Dra."}
                onChange={() => setGenero("Dra.")}
              />
              Dra.
            </label>
          </fieldset>

          <label className="field">
            <span>Nome do médico</span>
            <input
              value={nome}
              onChange={(ev) => setNome(ev.target.value)}
              placeholder="Nome completo"
              required
            />
          </label>

          <label className="field">
            <span>CRM (será o login)</span>
            <input
              value={crm}
              onChange={(ev) => setCrm(ev.target.value)}
              placeholder="Ex.: 123456/SP"
              required
            />
          </label>

          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="email@exemplo.com"
              required
            />
          </label>

          <label className="field">
            <span>Telefone</span>
            <input
              type="tel"
              value={telefone}
              onChange={(ev) => setTelefone(ev.target.value)}
              placeholder="(00) 00000-0000"
              required
            />
          </label>

          <label className="field">
            <span>Especialidade médica (opcional)</span>
            <input
              value={especialidade}
              onChange={(ev) => setEspecialidade(ev.target.value)}
              placeholder="Ex.: Radiologia / Ultrassonografia"
            />
          </label>

          <label className="field">
            <span>RQE (opcional)</span>
            <input
              value={rqe}
              onChange={(ev) => setRqe(ev.target.value)}
              placeholder="Número do RQE, se houver"
            />
          </label>

          <fieldset className="endereco-field full">
            <legend>Endereço</legend>

            <div className="register-grid endereco-grid">
              <label className="field">
                <span>CEP</span>
                <input
                  value={cep}
                  onChange={(ev) => void onCepChange(ev.target.value)}
                  placeholder="00000-000"
                  inputMode="numeric"
                  required
                />
              </label>

              <label className="field">
                <span>Número</span>
                <input
                  value={numero}
                  onChange={(ev) => setNumero(ev.target.value)}
                  placeholder="Nº"
                  required
                />
              </label>

              <label className="field full">
                <span>Logradouro</span>
                <input
                  value={logradouro}
                  onChange={(ev) => setLogradouro(ev.target.value)}
                  placeholder="Rua / Avenida"
                  required
                />
              </label>

              <label className="field full">
                <span>Complemento (opcional)</span>
                <input
                  value={complemento}
                  onChange={(ev) => setComplemento(ev.target.value)}
                  placeholder="Apto, sala, bloco…"
                />
              </label>

              <label className="field">
                <span>Bairro</span>
                <input
                  value={bairro}
                  onChange={(ev) => setBairro(ev.target.value)}
                  placeholder="Bairro"
                  required
                />
              </label>

              <label className="field">
                <span>Cidade</span>
                <input
                  value={cidade}
                  onChange={(ev) => setCidade(ev.target.value)}
                  placeholder="Cidade"
                  required
                />
              </label>

              <label className="field">
                <span>Estado (UF)</span>
                <input
                  value={estado}
                  onChange={(ev) =>
                    setEstado(ev.target.value.toUpperCase().slice(0, 2))
                  }
                  placeholder="UF"
                  maxLength={2}
                  required
                />
              </label>
            </div>

            {buscandoCep ? (
              <p className="auth-hint">Buscando CEP…</p>
            ) : msgCep ? (
              <p className="auth-hint">{msgCep}</p>
            ) : (
              <p className="auth-hint">
                Ao digitar o CEP completo, logradouro, bairro, cidade e estado
                são preenchidos automaticamente. O complemento é digitado
                manualmente.
              </p>
            )}
          </fieldset>

          <label className="field">
            <span>Senha de acesso</span>
            <input
              type="password"
              value={senha}
              onChange={(ev) => setSenha(ev.target.value)}
              placeholder="6–18 caracteres"
              minLength={6}
              maxLength={18}
              required
            />
          </label>

          <label className="field">
            <span>Confirmar senha</span>
            <input
              type="password"
              value={confirmar}
              onChange={(ev) => setConfirmar(ev.target.value)}
              placeholder="Repita a senha"
              minLength={6}
              maxLength={18}
              required
            />
          </label>

          <p className="auth-hint full">
            A senha deve ter no mínimo 6 e no máximo 18 dígitos, com ao menos
            uma letra maiúscula, uma minúscula e um número. O RQE só entra no
            laudo se for preenchido.
          </p>

          {erro ? <p className="auth-error full">{erro}</p> : null}
          {ok ? <p className="auth-ok full">{ok}</p> : null}

          <button type="submit" className="btn primary auth-submit full">
            Cadastrar e entrar
          </button>
        </form>

        <p className="auth-switch">
          Já possui cadastro? <Link href="/">Fazer login</Link>
        </p>
      </div>
    </main>
  );
}
