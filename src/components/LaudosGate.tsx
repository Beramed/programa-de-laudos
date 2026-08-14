"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditarPerfilModal from "@/components/EditarPerfilModal";
import LaudoBuilder, {
  type LaudoBuilderHandle,
} from "@/components/LaudoBuilder";
import PacientesSalvosModal from "@/components/PacientesSalvosModal";
import {
  getModalidade,
  modalidadeTemLaudos,
  type ModalidadeId,
} from "@/data/modalidades";
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

type Props = {
  modalidadeId?: ModalidadeId;
};

export default function LaudosGate({ modalidadeId = "ultrassom" }: Props) {
  const router = useRouter();
  const [medico, setMedico] = useState<SessaoMedico | null>(null);
  const [pronto, setPronto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [pacientesAberto, setPacientesAberto] = useState(false);
  const builderRef = useRef<LaudoBuilderHandle>(null);
  const modalidade = getModalidade(modalidadeId);

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
  const temLaudos = modalidadeTemLaudos(modalidadeId);

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
          <p className="medico-crm">
            CRM {medico.crm}
            {modalidade ? ` · ${modalidade.nome}` : null}
          </p>
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
        <div className="medico-banner-acoes">
          <Link href="/exames" className="btn ghost small">
            Trocar exame
          </Link>
          {temLaudos ? (
            <button
              type="button"
              className="btn ghost small"
              onClick={() => setPacientesAberto(true)}
            >
              Pacientes salvos
            </button>
          ) : null}
          <button type="button" className="btn ghost small" onClick={sair}>
            Sair
          </button>
        </div>
      </div>

      {temLaudos ? (
        <LaudoBuilder
          ref={builderRef}
          medico={medico}
          modalidadeId={modalidadeId}
        />
      ) : (
        <div className="modalidade-vazia">
          <h2>{modalidade?.nome ?? "Modalidade"}</h2>
          <p>
            Os laudos desta modalidade serão disponibilizados em breve. Enquanto
            isso, você pode voltar e escolher Ultrassom ou Ecocardiografia.
          </p>
          <Link href="/exames" className="btn primary">
            Voltar à escolha de exame
          </Link>
        </div>
      )}

      <EditarPerfilModal
        medico={medico}
        aberto={editando}
        onFechar={() => setEditando(false)}
        onSalvo={setMedico}
      />
      {temLaudos ? (
        <PacientesSalvosModal
          aberto={pacientesAberto}
          crm={medico.crm}
          onFechar={() => setPacientesAberto(false)}
          onAbrir={(salvo) => builderRef.current?.carregarPacienteSalvo(salvo)}
        />
      ) : null}
    </div>
  );
}
