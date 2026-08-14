"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  autenticar,
  getMasterSessao,
  getSessao,
  isMasterLogin,
} from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const [crm, setCrm] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (getMasterSessao()) {
      router.replace("/admin");
      return;
    }
    if (getSessao()) router.replace("/exames");
  }, [router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");
    if (!crm.trim()) {
      setErro("Informe o CRM ou o usuário master.");
      return;
    }
    if (!senha) {
      setErro("Informe a senha.");
      return;
    }
    const falha = autenticar(crm, senha);
    if (falha) {
      setErro(falha);
      return;
    }
    if (isMasterLogin(crm, senha)) {
      router.push("/admin");
      return;
    }
    router.push("/exames");
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <Image
            src="/beramed-logo.png"
            alt="BeraMed Laudos"
            width={320}
            height={320}
            priority
            className="auth-logo"
          />
        </div>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <label className="auth-field">
            <span className="auth-icon" aria-hidden>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M5 19.5c1.8-3.2 4.2-4.8 7-4.8s5.2 1.6 7 4.8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              type="text"
              autoComplete="username"
              placeholder="CRM (login)"
              value={crm}
              onChange={(ev) => setCrm(ev.target.value)}
            />
          </label>

          <label className="auth-field">
            <span className="auth-icon" aria-hidden>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 10V7.5a4 4 0 0 1 8 0V10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              type={mostrar ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Senha"
              value={senha}
              onChange={(ev) => setSenha(ev.target.value)}
            />
            <button
              type="button"
              className="auth-eye"
              onClick={() => setMostrar((v) => !v)}
              aria-label={mostrar ? "Ocultar senha" : "Mostrar senha"}
            >
              {mostrar ? "Ocultar" : "Ver"}
            </button>
          </label>

          <p className="auth-hint">
            Senha do médico: 6–18 caracteres, com maiúscula, minúscula e número.
          </p>

          {erro ? <p className="auth-error">{erro}</p> : null}

          <button type="submit" className="btn primary auth-submit">
            Entrar
          </button>
        </form>

        <p className="auth-switch">
          Ainda não tem conta?{" "}
          <Link href="/cadastro">Criar cadastro</Link>
        </p>
      </div>
    </main>
  );
}
