"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSessao,
  logout,
  tituloMedico,
  type SessaoMedico,
} from "@/lib/auth";
import {
  imagemModalidade,
  modalidades,
} from "@/data/modalidades";

export default function ModalidadesHub() {
  const router = useRouter();
  const [medico, setMedico] = useState<SessaoMedico | null>(null);

  useEffect(() => {
    const s = getSessao();
    if (!s) {
      router.replace("/");
      return;
    }
    setMedico(s);
  }, [router]);

  if (!medico) {
    return (
      <main className="auth-page">
        <p className="auth-loading">Carregando sessão…</p>
      </main>
    );
  }

  const titulo = tituloMedico(medico);

  return (
    <main className="modalidades-page">
      <header className="modalidades-top">
        <Image
          src="/beramed-logo.png"
          alt="BeraMed Laudos"
          width={120}
          height={120}
          className="modalidades-logo"
          priority
        />
        <div className="modalidades-top-acoes">
          <button
            type="button"
            className="btn ghost small"
            onClick={() => {
              logout();
              router.replace("/");
            }}
          >
            Voltar ao login
          </button>
          <button
            type="button"
            className="btn primary small"
            onClick={() => {
              logout();
              router.replace("/");
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <div className="modalidades-hero">
        <h1 className="modalidades-saudacao">
          Olá {titulo}, escolha seu exame a ser laudado
        </h1>
      </div>

      <div className="modalidades-grid" role="list">
        {modalidades.map((m) => (
          <Link
            key={m.id}
            href={`/exames/${m.id}`}
            className="modalidade-card"
            role="listitem"
          >
            <span className="modalidade-img-wrap">
              <Image
                src={imagemModalidade(m, medico.genero)}
                alt={m.nome}
                width={220}
                height={220}
                className="modalidade-img"
              />
            </span>
            <span className="modalidade-nome">{m.nome}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
