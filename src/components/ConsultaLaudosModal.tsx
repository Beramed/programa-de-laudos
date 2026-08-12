"use client";

import { useMemo, useState } from "react";
import {
  CONSULTA_LAUDOS,
  CONSULTA_LAUDOS_SECOES,
  type ConsultaLaudoEntry,
} from "@/data/consultaLaudos";

type Props = {
  aberto: boolean;
  onFechar: () => void;
};

function normalizaBusca(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function ConsultaLaudosModal({ aberto, onFechar }: Props) {
  const [busca, setBusca] = useState("");
  const [secao, setSecao] = useState("todas");
  const [selecionado, setSelecionado] = useState<ConsultaLaudoEntry | null>(
    null,
  );

  const filtrados = useMemo(() => {
    const q = normalizaBusca(busca);
    const tokens = q.split(/\s+/).filter(Boolean);
    return CONSULTA_LAUDOS.filter((e) => {
      if (secao !== "todas" && e.sectionLabel !== secao) return false;
      if (tokens.length === 0) return true;
      return tokens.every((t) => e.search.includes(t));
    }).slice(0, 120);
  }, [busca, secao]);

  if (!aberto) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={onFechar}
    >
      <div
        className="modal-card consulta-laudos-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consulta-laudos-titulo"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="consulta-laudos-titulo">Laudário</h2>
          <button type="button" className="btn ghost" onClick={onFechar}>
            Fechar
          </button>
        </div>
        <p className="consulta-laudos-hint">
          Pesquisa no conteúdo do PDF 01 LAUDOS (textos e impressões
          diagnósticas).
        </p>
        <div className="consulta-laudos-filtros">
          <input
            type="search"
            className="field"
            placeholder="Buscar patologia, órgão, texto…"
            value={busca}
            onChange={(ev) => {
              setBusca(ev.target.value);
              setSelecionado(null);
            }}
            autoFocus
          />
          <select
            className="field"
            value={secao}
            onChange={(ev) => {
              setSecao(ev.target.value);
              setSelecionado(null);
            }}
            aria-label="Filtrar por seção"
          >
            <option value="todas">Todas as seções</option>
            {CONSULTA_LAUDOS_SECOES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="consulta-laudos-corpo">
          <ul className="consulta-laudos-lista">
            {filtrados.length === 0 ? (
              <li className="consulta-laudos-vazio">Nenhum resultado.</li>
            ) : (
              filtrados.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    className={
                      selecionado?.id === e.id
                        ? "consulta-laudos-item ativo"
                        : "consulta-laudos-item"
                    }
                    onClick={() => setSelecionado(e)}
                  >
                    <span className="consulta-laudos-item-titulo">
                      {e.title}
                    </span>
                    <span className="consulta-laudos-item-sec">
                      {e.sectionLabel}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="consulta-laudos-detalhe">
            {selecionado ? (
              <>
                <h3>{selecionado.title}</h3>
                <p className="consulta-laudos-item-sec">
                  {selecionado.sectionLabel}
                </p>
                <h4>Texto</h4>
                <pre className="consulta-laudos-texto">
                  {selecionado.texto}
                </pre>
                <h4>Impressão</h4>
                <pre className="consulta-laudos-texto">
                  {selecionado.impressao}
                </pre>
              </>
            ) : (
              <p className="consulta-laudos-vazio">
                Selecione um item à esquerda para ver o texto completo.
              </p>
            )}
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn secondary" onClick={onFechar}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
