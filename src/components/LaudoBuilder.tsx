"use client";

import { useEffect, useMemo, useState } from "react";
import { exames, getExame } from "@/data/exames";
import {
  montarLaudo,
  selecoesPadrao,
  type DadosPaciente,
  type Selecoes,
} from "@/lib/montarLaudo";

const pacienteVazio = (): DadosPaciente => ({
  nome: "",
  idade: "",
  data: new Date().toLocaleDateString("pt-BR"),
  solicitante: "",
  indicacao: "",
});

export default function LaudoBuilder() {
  const [exameId, setExameId] = useState(exames[0].id);
  const exame = getExame(exameId)!;
  const [selecoes, setSelecoes] = useState<Selecoes>(() =>
    selecoesPadrao(exames[0]),
  );
  const [paciente, setPaciente] = useState<DadosPaciente>(pacienteVazio);
  const [impressao, setImpressao] = useState(exames[0].impressaoPadrao);
  const [copiado, setCopiado] = useState(false);
  const [editavel, setEditavel] = useState(false);
  const [textoEditado, setTextoEditado] = useState("");

  useEffect(() => {
    const e = getExame(exameId);
    if (!e) return;
    setSelecoes(selecoesPadrao(e));
    setImpressao(e.impressaoPadrao);
    setEditavel(false);
  }, [exameId]);

  const laudoGerado = useMemo(
    () => montarLaudo(exame, selecoes, paciente, impressao),
    [exame, selecoes, paciente, impressao],
  );

  const textoFinal = editavel ? textoEditado : laudoGerado;

  function escolherUnico(secaoId: string, opcaoId: string) {
    setSelecoes((prev) => ({ ...prev, [secaoId]: opcaoId }));
    setEditavel(false);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(textoFinal);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = textoFinal;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  }

  function imprimir() {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>Laudo</title>
      <style>
        body{font-family:Georgia,serif;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.55;color:#1a1a1a;white-space:pre-wrap}
        @media print{body{margin:0}}
      </style></head><body>${textoFinal
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
  }

  function limparPaciente() {
    setPaciente(pacienteVazio());
    setEditavel(false);
  }

  function resetExame() {
    setSelecoes(selecoesPadrao(exame));
    setImpressao(exame.impressaoPadrao);
    setEditavel(false);
  }

  return (
    <div className="builder">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden />
          <div>
            <p className="brand-name">Laudos US</p>
            <p className="brand-sub">Montador de laudos de ultrassom</p>
          </div>
        </div>
        <div className="top-actions">
          <button type="button" className="btn ghost" onClick={resetExame}>
            Restaurar padrões
          </button>
          <button type="button" className="btn ghost" onClick={limparPaciente}>
            Limpar paciente
          </button>
          <button type="button" className="btn secondary" onClick={imprimir}>
            Imprimir
          </button>
          <button type="button" className="btn primary" onClick={copiar}>
            {copiado ? "Copiado!" : "Copiar laudo"}
          </button>
        </div>
      </header>

      <div className="exam-tabs" role="tablist" aria-label="Tipo de exame">
        {exames.map((e) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            aria-selected={exameId === e.id}
            className={`exam-tab ${exameId === e.id ? "active" : ""}`}
            onClick={() => setExameId(e.id)}
          >
            {e.nome}
          </button>
        ))}
      </div>

      <div className="workspace">
        <section className="panel options-panel">
          <h2 className="panel-title">Dados do paciente</h2>
          <div className="patient-grid">
            {(
              [
                ["nome", "Nome", "text"],
                ["idade", "Idade", "text"],
                ["data", "Data", "text"],
                ["solicitante", "Solicitante", "text"],
                ["indicacao", "Indicação", "text"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="field">
                <span>{label}</span>
                <input
                  value={paciente[key]}
                  onChange={(ev) => {
                    setPaciente((p) => ({ ...p, [key]: ev.target.value }));
                    setEditavel(false);
                  }}
                  placeholder={label}
                />
              </label>
            ))}
          </div>

          <h2 className="panel-title spaced">Achados — {exame.nome}</h2>
          <p className="hint">
            Selecione as opções de cada estrutura. O texto do laudo é montado
            automaticamente à direita.
          </p>

          <div className="sections">
            {exame.secoes.map((secao) => (
              <div key={secao.id} className="section-block">
                <h3>{secao.titulo}</h3>
                <div className="chips">
                  {secao.opcoes.map((op) => {
                    const ativo = selecoes[secao.id] === op.id;
                    return (
                      <button
                        key={op.id}
                        type="button"
                        className={`chip ${ativo ? "on" : ""}`}
                        onClick={() => escolherUnico(secao.id, op.id)}
                      >
                        {op.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <label className="field impressao-field">
            <span>Impressão / conclusão</span>
            <textarea
              rows={3}
              value={impressao}
              onChange={(ev) => {
                setImpressao(ev.target.value);
                setEditavel(false);
              }}
            />
          </label>
        </section>

        <section className="panel preview-panel">
          <div className="preview-head">
            <h2 className="panel-title">Laudo pronto</h2>
            <button
              type="button"
              className="btn ghost small"
              onClick={() => {
                if (!editavel) {
                  setTextoEditado(laudoGerado);
                  setEditavel(true);
                } else {
                  setEditavel(false);
                }
              }}
            >
              {editavel ? "Voltar ao automático" : "Editar texto"}
            </button>
          </div>

          {editavel ? (
            <textarea
              className="preview-edit"
              value={textoEditado}
              onChange={(ev) => setTextoEditado(ev.target.value)}
              spellCheck
            />
          ) : (
            <pre className="preview-text">{laudoGerado}</pre>
          )}
        </section>
      </div>
    </div>
  );
}
