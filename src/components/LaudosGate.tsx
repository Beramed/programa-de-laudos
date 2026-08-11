"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditarPerfilModal from "@/components/EditarPerfilModal";
import LaudoBuilder from "@/components/LaudoBuilder";
import {
  getSessao,
  logout,
  saudacaoHorario,
  tituloMedico,
  type SessaoMedico,
} from "@/lib/auth";

function IconeLapis() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 20h4.5L19 9.5a2.1 2.1 0 0 0 0-3L17.5 5a2.1 2.1 0 0 0-3 0L4 15.5V20z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 6.5l4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LaudosGate() {
  const router = useRouter();
  const [medico, setMedico] = useState<SessaoMedico | null>(null);
  const [pronto, setPronto] = useState(false);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const s = getSessao();
    if (!s) {
      router.replace("/");
      return;
    }
    setMedico(s);
    setPronto(true);
  }, [router]);

  function sair() {
    logout();
    router.replace("/");
  }

  if (!pronto || !medico) {
    return (
      <main className="auth-page">
        <p className="auth-loading">Carregando sessão…</p>
      </main>
    );
  }

  const titulo = tituloMedico(medico);

  return (
    <div className="laudos-shell">
      <div className="medico-banner">
        <div className="medico-identidade">
          <p className="medico-saudacao">
            <span>
              {saudacaoHorario()}, {titulo}
            </span>
            <button
              type="button"
              className="edit-pencil"
              onClick={() => setEditando(true)}
              title="Editar meus dados"
              aria-label="Editar meus dados"
            >
              <IconeLapis />
            </button>
          </p>
          <p className="medico-crm">CRM {medico.crm}</p>
          {(medico.especialidade || medico.rqe || medico.telefone) && (
            <p className="medico-meta">
              {[
                medico.especialidade,
                medico.rqe ? `RQE ${medico.rqe}` : "",
                medico.telefone,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
        </div>
        <button type="button" className="btn ghost small" onClick={sair}>
          Sair
        </button>
      </div>
      <LaudoBuilder medico={medico} />
      <EditarPerfilModal
        medico={medico}
        aberto={editando}
        onFechar={() => setEditando(false)}
        onSalvo={setMedico}
      />
    </div>
  );
}
