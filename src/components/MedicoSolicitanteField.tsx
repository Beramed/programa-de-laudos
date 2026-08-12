"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  formatarSolicitanteExibicao,
  type MedicoSolicitante,
} from "@/lib/medicosSolicitantesTypes";

const LOCAL_KEY = "beramed_medicos_solicitantes_v1";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function lerLocal(): MedicoSolicitante[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MedicoSolicitante[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function gravarLocal(lista: MedicoSolicitante[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(lista));
}

function soDigitos(s: string): string {
  return s.replace(/\D/g, "");
}

function pareceCrm(texto: string): boolean {
  const t = texto.trim();
  if (!t) return false;
  // CRM puro ou "CRM 12345"
  const digitos = soDigitos(t);
  if (digitos.length < 3 || digitos.length > 7) return false;
  return /^(\s*crm\s*)?\d[\d.\-\s]*$/i.test(t) || digitos === t.replace(/\s/g, "");
}

export default function MedicoSolicitanteField({ value, onChange }: Props) {
  const [lista, setLista] = useState<MedicoSolicitante[]>([]);
  const [aberto, setAberto] = useState(false);
  const [buscandoCrm, setBuscandoCrm] = useState(false);
  const [erroCrm, setErroCrm] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function sincronizar(listaLocal?: MedicoSolicitante[]) {
    const local = listaLocal ?? lerLocal();
    try {
      const res = await fetch("/api/medicos-solicitantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medicos: local.map((m) => ({
            id: m.id,
            nome: m.nome,
            crm: m.crm,
            uf: m.uf,
          })),
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { medicos: MedicoSolicitante[] };
        setLista(data.medicos);
        gravarLocal(data.medicos);
        return;
      }
    } catch {
      /* offline / erro de rede */
    }
    setLista(local);
  }

  useEffect(() => {
    void sincronizar();
  }, []);

  useEffect(() => {
    function onDocClick(ev: MouseEvent) {
      if (!wrapRef.current?.contains(ev.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const sugestoes = useMemo(() => {
    const q = value.trim().toLocaleLowerCase("pt-BR");
    if (!q) return lista.slice(0, 12);
    const digitos = soDigitos(q);
    return lista
      .filter((m) => {
        const nome = m.nome.toLocaleLowerCase("pt-BR");
        if (nome.includes(q)) return true;
        if (digitos && m.crm?.includes(digitos)) return true;
        return false;
      })
      .slice(0, 12);
  }, [lista, value]);

  async function salvarNomeAtual() {
    const nome = value.trim();
    if (!nome || pareceCrm(nome)) return;
    // Evita salvar se já é só CRM ou vazio
    const ja = lista.find(
      (m) =>
        formatarSolicitanteExibicao(m).toLocaleLowerCase("pt-BR") ===
          nome.toLocaleLowerCase("pt-BR") ||
        m.nome.toLocaleLowerCase("pt-BR") === nome.toLocaleLowerCase("pt-BR"),
    );
    if (ja) return;
    try {
      const res = await fetch("/api/medicos-solicitantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });
      if (res.ok) {
        const data = (await res.json()) as { medicos: MedicoSolicitante[] };
        setLista(data.medicos);
        gravarLocal(data.medicos);
      }
    } catch {
      const local = lerLocal();
      const novo: MedicoSolicitante = {
        id: `local-${Date.now()}`,
        nome: nome.toLocaleUpperCase("pt-BR"),
        atualizadoEm: new Date().toISOString(),
        uf: "SP",
      };
      const next = [...local, novo];
      gravarLocal(next);
      setLista(next);
    }
  }

  async function buscarCrm(crm: string) {
    setBuscandoCrm(true);
    setErroCrm("");
    try {
      const res = await fetch(`/api/cremesp/crm/${crm}`);
      const data = (await res.json()) as {
        nome?: string;
        crm?: string;
        uf?: string;
        erro?: string;
      };
      if (!res.ok || !data.nome) {
        setErroCrm(data.erro || "CRM não encontrado.");
        return;
      }
      const upsert = await fetch("/api/medicos-solicitantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          crm: data.crm || crm,
          uf: data.uf || "SP",
        }),
      });
      const body = (await upsert.json()) as {
        medico?: MedicoSolicitante;
        medicos?: MedicoSolicitante[];
      };
      if (body.medicos) {
        setLista(body.medicos);
        gravarLocal(body.medicos);
      }
      const medico = body.medico ?? {
        id: "",
        nome: data.nome,
        crm: data.crm || crm,
        atualizadoEm: new Date().toISOString(),
      };
      onChange(formatarSolicitanteExibicao(medico));
      setAberto(false);
    } catch {
      setErroCrm("Falha na consulta CREMESP.");
    } finally {
      setBuscandoCrm(false);
    }
  }

  function onInputChange(texto: string) {
    onChange(texto);
    setErroCrm("");
    setAberto(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (pareceCrm(texto)) {
        const crm = soDigitos(texto);
        void buscarCrm(crm);
      }
    }, 650);
  }

  async function excluir(id: string) {
    try {
      const res = await fetch(
        `/api/medicos-solicitantes?id=${encodeURIComponent(id)}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        const data = (await res.json()) as { medicos: MedicoSolicitante[] };
        setLista(data.medicos);
        gravarLocal(data.medicos);
        return;
      }
    } catch {
      /* fallback local */
    }
    const next = lerLocal().filter((m) => m.id !== id);
    gravarLocal(next);
    setLista(next);
  }

  return (
    <div className="field medico-solicitante-field" ref={wrapRef}>
      <span>Médico solicitante</span>
      <div className="medico-solicitante-wrap">
        <input
          value={value}
          onChange={(ev) => onInputChange(ev.target.value)}
          onFocus={() => setAberto(true)}
          onBlur={() => {
            // salva nome digitado ao sair do campo
            setTimeout(() => void salvarNomeAtual(), 180);
          }}
          placeholder="Nome ou CRM (CREMESP)"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={aberto}
        />
        {buscandoCrm ? (
          <span className="medico-solicitante-status">Consultando CREMESP…</span>
        ) : null}
        {erroCrm ? (
          <span className="medico-solicitante-erro">{erroCrm}</span>
        ) : null}
        {aberto && (sugestoes.length > 0 || value.trim()) ? (
          <ul className="medico-solicitante-lista" role="listbox">
            {sugestoes.map((m) => (
              <li key={m.id} className="medico-solicitante-item">
                <button
                  type="button"
                  className="medico-solicitante-pick"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(formatarSolicitanteExibicao(m));
                    setAberto(false);
                  }}
                >
                  <span className="medico-solicitante-nome">{m.nome}</span>
                  {m.crm ? (
                    <span className="medico-solicitante-crm">CRM {m.crm}</span>
                  ) : null}
                </button>
                <button
                  type="button"
                  className="medico-solicitante-x"
                  title="Remover do banco"
                  aria-label={`Remover ${m.nome}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => void excluir(m.id)}
                >
                  ×
                </button>
              </li>
            ))}
            {sugestoes.length === 0 && value.trim() && !pareceCrm(value) ? (
              <li className="medico-solicitante-vazio">
                Nenhum cadastro — o nome será salvo ao sair do campo.
              </li>
            ) : null}
            {pareceCrm(value) && !buscandoCrm ? (
              <li className="medico-solicitante-vazio">
                Digite o CRM e aguarde a busca no Guia Médico CREMESP…
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
