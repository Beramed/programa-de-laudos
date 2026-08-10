"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LaudoBuilder from "@/components/LaudoBuilder";
import {
  getSessao,
  logout,
  saudacaoHorario,
  tituloMedico,
  type SessaoMedico,
} from "@/lib/auth";

export default function LaudosGate() {
  const router = useRouter();
  const [medico, setMedico] = useState<SessaoMedico | null>(null);
  const [pronto, setPronto] = useState(false);

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
        <div>
          <p className="medico-saudacao">
            {saudacaoHorario()}, {titulo}
          </p>
          <p className="medico-crm">
            CRM {medico.crm}
            {medico.email ? ` · ${medico.email}` : ""}
          </p>
        </div>
        <button type="button" className="btn ghost small" onClick={sair}>
          Sair
        </button>
      </div>
      <LaudoBuilder medico={medico} />
    </div>
  );
}
