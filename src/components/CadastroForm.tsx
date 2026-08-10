"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  autenticar,
  cadastrarMedico,
  getSessao,
  type Genero,
  validarSenha,
} from "@/lib/auth";

export default function CadastroForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [genero, setGenero] = useState<Genero>("Dr.");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    if (getSessao()) router.replace("/laudos");
  }, [router]);

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
      endereco,
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
          O login de acesso será o número do CRM.
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

          <label className="field full">
            <span>Endereço</span>
            <input
              value={endereco}
              onChange={(ev) => setEndereco(ev.target.value)}
              placeholder="Rua, número, cidade"
              required
            />
          </label>

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
            uma letra maiúscula, uma minúscula e um número.
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
