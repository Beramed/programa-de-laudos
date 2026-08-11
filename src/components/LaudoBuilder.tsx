"use client";

import { useEffect, useMemo, useState } from "react";
import { exames, getExame } from "@/data/exames";
import {
  modalidadesCorrelacao,
  observacoesDoExame,
} from "@/data/observacoes";
import type { SessaoMedico } from "@/lib/auth";
import { assinaturaMedico, formatarDataBr } from "@/lib/auth";
import {
  laudoParaHtml,
  laudoTextoLimpo,
  montarLaudo,
  novoExameAnterior,
  selecoesPadrao,
  type DadosPaciente,
  type ExameAnterior,
  type Selecoes,
} from "@/lib/montarLaudo";

const pacienteVazio = (): DadosPaciente => ({
  nome: "",
  idade: "",
  data: new Date().toLocaleDateString("pt-BR"),
  solicitante: "",
  indicacao: "",
});

type Props = {
  medico: SessaoMedico;
};

export default function LaudoBuilder({ medico }: Props) {
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
  const [observacoesIds, setObservacoesIds] = useState<string[]>([]);
  const [examesAnteriores, setExamesAnteriores] = useState<ExameAnterior[]>([
    novoExameAnterior(),
  ]);

  const listaObs = useMemo(() => observacoesDoExame(exameId), [exameId]);

  useEffect(() => {
    const e = getExame(exameId);
    if (!e) return;
    setSelecoes(selecoesPadrao(e));
    setImpressao(e.impressaoPadrao);
    setObservacoesIds([]);
    setExamesAnteriores([novoExameAnterior()]);
    setEditavel(false);
  }, [exameId]);

  const assinatura = assinaturaMedico(medico);

  const laudoGerado = useMemo(
    () =>
      montarLaudo(exame, selecoes, paciente, impressao, assinatura, {
        observacoesIds,
        examesAnteriores,
      }),
    [
      exame,
      selecoes,
      paciente,
      impressao,
      assinatura,
      observacoesIds,
      examesAnteriores,
    ],
  );

  const textoFinal = editavel ? textoEditado : laudoGerado;
  const todasObsMarcadas =
    listaObs.length > 0 && listaObs.every((o) => observacoesIds.includes(o.id));

  function escolherUnico(secaoId: string, opcaoId: string) {
    setSelecoes((prev) => ({ ...prev, [secaoId]: opcaoId }));
    setEditavel(false);
  }

  function toggleObs(id: string) {
    setObservacoesIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setEditavel(false);
  }

  function marcarTodasObs() {
    setObservacoesIds(todasObsMarcadas ? [] : listaObs.map((o) => o.id));
    setEditavel(false);
  }

  function atualizarAnterior(id: string, patch: Partial<ExameAnterior>) {
    setExamesAnteriores((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
    setEditavel(false);
  }

  async function copiar() {
    const html = laudoParaHtml(textoFinal);
    const plain = laudoTextoLimpo(textoFinal);
    try {
      const item = new ClipboardItem({
        "text/plain": new Blob([plain], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" }),
      });
      await navigator.clipboard.write([item]);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(plain);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = plain;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  }

  function imprimir() {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>Laudo</title>
      <style>
        body{font-family:Georgia,serif;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.55;color:#1a1a1a}
        strong{font-weight:700}
        .laudo-rodape{margin-top:18px;text-align:center;line-height:1.45}
        .laudo-disclaimer{margin:12px auto 0;max-width:34em;font-size:0.78rem;color:#444;font-style:italic}
        @media print{body{margin:0}}
      </style></head><body>${laudoParaHtml(textoFinal)}</body></html>`);
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
    setObservacoesIds([]);
    setExamesAnteriores([novoExameAnterior()]);
    setEditavel(false);
  }

  function renderObsItem(obs: (typeof listaObs)[number]) {
    const on = observacoesIds.includes(obs.id);
    return (
      <label key={obs.id} className={`obs-item ${on ? "on" : ""}`}>
        <input
          type="checkbox"
          checked={on}
          onChange={() => toggleObs(obs.id)}
        />
        <span>{obs.texto}</span>
      </label>
    );
  }

  const obsSemAnteriores = listaObs.find((o) => o.id === "sem-anteriores");
  const obsRestantes = listaObs.filter((o) => o.id !== "sem-anteriores");

  return (
    <div className="builder">
      <header className="topbar">
        <div className="brand">
          <div>
            <p className="brand-name">BeraMed Laudos</p>
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
                ["nome", "Nome"],
                ["idade", "Idade"],
                ["data", "Data"],
                ["solicitante", "Solicitante"],
                ["indicacao", "Indicação"],
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
            Selecione as opções de cada estrutura. Órgãos saem em negrito no
            laudo, com linha em branco entre os itens.
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
            <span>Impressão diagnóstica / conclusão</span>
            <textarea
              rows={3}
              value={impressao}
              onChange={(ev) => {
                setImpressao(ev.target.value);
                setEditavel(false);
              }}
            />
          </label>

          <div className="obs-block">
            <div className="obs-head">
              <h2 className="panel-title">Observações</h2>
              <button
                type="button"
                className="btn ghost small"
                onClick={marcarTodasObs}
              >
                {todasObsMarcadas ? "Desmarcar todas" : "Marcar todas"}
              </button>
            </div>
            <p className="hint">
              Marque individualmente ou todas. O item de correlação com exame
              anterior fica logo abaixo de “exames anteriores não disponíveis”.
            </p>
            <div className="obs-list">
              {obsSemAnteriores ? renderObsItem(obsSemAnteriores) : null}

              <div className="obs-item correlacao-item">
                <div className="correlacao-label">
                  Exame correlacionado com
                </div>
                <div className="correlacao-rows">
                  {examesAnteriores.map((ant, idx) => (
                    <div key={ant.id} className="correlacao-row">
                      <select
                        className="correlacao-select"
                        value={ant.modalidade}
                        onChange={(ev) =>
                          atualizarAnterior(ant.id, {
                            modalidade: ev.target.value,
                          })
                        }
                        aria-label={`Modalidade do exame correlacionado ${idx + 1}`}
                      >
                        <option value="">Selecionar exame…</option>
                        {modalidadesCorrelacao.map((mod) => (
                          <option key={mod} value={mod}>
                            {mod}
                          </option>
                        ))}
                      </select>
                      <span className="correlacao-de">de</span>
                      <input
                        className="correlacao-data"
                        value={ant.data}
                        onChange={(ev) =>
                          atualizarAnterior(ant.id, {
                            data: formatarDataBr(ev.target.value),
                          })
                        }
                        placeholder="__/__/____"
                        inputMode="numeric"
                        aria-label={`Data do exame correlacionado ${idx + 1}`}
                      />
                      {idx === examesAnteriores.length - 1 ? (
                        <button
                          type="button"
                          className="btn-plus"
                          title="Adicionar exame e data"
                          aria-label="Adicionar exame e data"
                          onClick={() => {
                            setExamesAnteriores((prev) => [
                              ...prev,
                              novoExameAnterior(),
                            ]);
                            setEditavel(false);
                          }}
                        >
                          +
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn ghost small"
                          onClick={() => {
                            setExamesAnteriores((prev) =>
                              prev.filter((e) => e.id !== ant.id),
                            );
                            setEditavel(false);
                          }}
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {obsRestantes.map((obs) => renderObsItem(obs))}
            </div>
          </div>
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
            <div
              className="preview-text preview-html"
              dangerouslySetInnerHTML={{ __html: laudoParaHtml(laudoGerado) }}
            />
          )}
        </section>
      </div>
    </div>
  );
}
