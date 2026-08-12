"use client";

import { useMemo, useState } from "react";
import {
  excluirPacienteSalvo,
  formatarDataIsoCurta,
  listarPacientesSalvos,
  type PacienteSalvo,
} from "@/lib/pacientesSalvos";

type Props = {
  aberto: boolean;
  crm: string;
  onFechar: () => void;
  onAbrir: (salvo: PacienteSalvo) => void;
};

export default function PacientesSalvosModal({
  aberto,
  crm,
  onFechar,
  onAbrir,
}: Props) {
  const [busca, setBusca] = useState("");
  const [tick, setTick] = useState(0);

  const lista = useMemo(() => {
    void tick;
    return listarPacientesSalvos(crm);
  }, [crm, tick, aberto]);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return lista;
    return lista.filter((p) => {
      const nome = p.paciente.nome.toLowerCase();
      const data = p.paciente.data.toLowerCase();
      const exames = p.resumoExames.toLowerCase();
      return nome.includes(q) || data.includes(q) || exames.includes(q);
    });
  }, [lista, busca]);

  if (!aberto) return null;

  function excluir(id: string, nome: string) {
    const ok = window.confirm(
      `Excluir o laudo salvo de "${nome || "Sem nome"}"?`,
    );
    if (!ok) return;
    excluirPacienteSalvo(crm, id);
    setTick((t) => t + 1);
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onFechar}>
      <div
        className="modal-card pacientes-salvos-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pacientes-salvos-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="pacientes-salvos-titulo">Pacientes salvos</h2>
          <button
            type="button"
            className="btn ghost small"
            onClick={onFechar}
            aria-label="Fechar"
          >
            Fechar
          </button>
        </div>

        <label className="field">
          <span>Buscar</span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Nome, data ou exame…"
            autoFocus
          />
        </label>

        {filtrados.length === 0 ? (
          <p className="pacientes-salvos-vazio">
            {lista.length === 0
              ? "Nenhum laudo salvo ainda. Use “Salvar laudo” no montador."
              : "Nenhum resultado para a busca."}
          </p>
        ) : (
          <ul className="pacientes-salvos-lista">
            {filtrados.map((p) => (
              <li key={p.id} className="pacientes-salvos-item">
                <div className="pacientes-salvos-info">
                  <p className="pacientes-salvos-nome">
                    {p.paciente.nome.trim() || "Sem nome"}
                    {p.paciente.idade.trim()
                      ? ` · ${p.paciente.idade} anos`
                      : ""}
                    {p.assinado ? (
                      <span className="pacientes-salvos-badge">Assinado</span>
                    ) : null}
                  </p>
                  <p className="pacientes-salvos-meta">
                    Exame: {p.paciente.data || "—"} · Salvo:{" "}
                    {formatarDataIsoCurta(p.atualizadoEm)}
                  </p>
                  <p className="pacientes-salvos-exames">{p.resumoExames}</p>
                </div>
                <div className="pacientes-salvos-acoes">
                  <button
                    type="button"
                    className="btn primary small"
                    onClick={() => {
                      onAbrir(p);
                      onFechar();
                    }}
                  >
                    Abrir
                  </button>
                  <button
                    type="button"
                    className="btn ghost small"
                    onClick={() =>
                      excluir(p.id, p.paciente.nome.trim() || "Sem nome")
                    }
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
