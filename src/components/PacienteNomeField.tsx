"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { DadosPaciente } from "@/lib/montarLaudo";
import {
  formatarDataIsoCurta,
  listarPacientesSalvos,
  type PacienteSalvo,
} from "@/lib/pacientesSalvos";

type Props = {
  crm: string;
  value: string;
  onChangeNome: (nome: string) => void;
  /** Preenche os demais campos a partir de um paciente já atendido */
  onSelecionarPaciente: (dados: DadosPaciente, salvo?: PacienteSalvo) => void;
  disabled?: boolean;
};

function normalizaNome(nome: string): string {
  return nome
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Último atendimento por nome (mais recente) */
function pacientesUnicos(crm: string): PacienteSalvo[] {
  const lista = listarPacientesSalvos(crm);
  const visto = new Map<string, PacienteSalvo>();
  for (const p of lista) {
    const chave = normalizaNome(p.paciente.nome);
    if (!chave) continue;
    if (!visto.has(chave)) visto.set(chave, p);
  }
  return Array.from(visto.values());
}

export default function PacienteNomeField({
  crm,
  value,
  onChangeNome,
  onSelecionarPaciente,
  disabled,
}: Props) {
  const [lista, setLista] = useState<PacienteSalvo[]>([]);
  const [aberto, setAberto] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  function recarregar() {
    setLista(pacientesUnicos(crm));
  }

  useEffect(() => {
    recarregar();
  }, [crm]);

  useEffect(() => {
    function onDocClick(ev: MouseEvent) {
      if (!wrapRef.current?.contains(ev.target as Node)) setAberto(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const sugestoes = useMemo(() => {
    const q = normalizaNome(value);
    if (!q) return lista.slice(0, 10);
    return lista
      .filter((p) => normalizaNome(p.paciente.nome).includes(q))
      .slice(0, 10);
  }, [lista, value]);

  function selecionar(salvo: PacienteSalvo) {
    const hoje = new Date().toLocaleDateString("pt-BR");
    onSelecionarPaciente(
      {
        nome: salvo.paciente.nome,
        idade: salvo.paciente.idade,
        data: hoje,
        solicitante: salvo.paciente.solicitante,
        indicacao: salvo.paciente.indicacao,
      },
      salvo,
    );
    setAberto(false);
  }

  return (
    <div className="field paciente-nome-field" ref={wrapRef}>
      <span>Nome</span>
      <div className="paciente-nome-wrap">
        <input
          value={value}
          disabled={disabled}
          onChange={(ev) => {
            onChangeNome(ev.target.value);
            setAberto(true);
            recarregar();
          }}
          onFocus={() => {
            recarregar();
            setAberto(true);
          }}
          placeholder="Nome do paciente"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={aberto}
        />
        {aberto && !disabled && sugestoes.length > 0 ? (
          <ul className="paciente-nome-lista" role="listbox">
            {sugestoes.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="paciente-nome-pick"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selecionar(p)}
                >
                  <span className="paciente-nome-titulo">
                    {p.paciente.nome.trim() || "Sem nome"}
                    {p.paciente.idade.trim()
                      ? ` · ${p.paciente.idade} anos`
                      : ""}
                  </span>
                  <span className="paciente-nome-meta">
                    Último: {p.paciente.data || formatarDataIsoCurta(p.atualizadoEm)}
                    {p.resumoExames ? ` · ${p.resumoExames}` : ""}
                    {p.paciente.solicitante.trim()
                      ? ` · Sol.: ${p.paciente.solicitante}`
                      : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {aberto && !disabled && value.trim() && sugestoes.length === 0 ? (
          <ul className="paciente-nome-lista" role="listbox">
            <li className="paciente-nome-vazio">
              Nenhum paciente anterior com esse nome.
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}
