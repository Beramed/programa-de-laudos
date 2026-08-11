"use client";

import { useEffect, useMemo, useState } from "react";
import { exames, getExame } from "@/data/exames";
import {
  modalidadesDoExame,
  observacoesDoExame,
} from "@/data/observacoes";
import type { SessaoMedico } from "@/lib/auth";
import { assinaturaMedico } from "@/lib/auth";
import {
  laudoParaHtml,
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
  const modalidades = useMemo(() => modalidadesDoExame(exameId), [exameId]);

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

  function atualizarAnterior(
    id: string,
    patch: Partial<ExameAnterior>,
  ) {
    setExamesAnteriores((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
    setEditavel(false);
  }

  function toggleModalidade(id: string, mod: string) {
    setExamesAnteriores((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const tem = e.modalidades.includes(mod);
        return {
          ...e,
          modalidades: tem
            ? e.modalidades.filter((m) => m !== mod)
            : [...e.modalidades, mod],
        };
      }),
    );
    setEditavel(false);
  }

  async function copiar() {
    const html = laudoParaHtml(textoFinal);
    const plain = textoFinal.replace(/\*\*/g, "");
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
              Marque individualmente ou todas de uma vez. Aparecem após a
              impressão diagnóstica.
            </p>
            <div className="obs-list">
              {listaObs.map((obs) => {
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
              })}
            </div>
          </div>

          <div className="obs-block">
            <div className="obs-head">
              <h2 className="panel-title">Exames anteriores</h2>
              <button
                type="button"
                className="btn secondary small"
                onClick={() => {
                  setExamesAnteriores((prev) => [...prev, novoExameAnterior()]);
                  setEditavel(false);
                }}
              >
                + Adicionar exame
              </button>
            </div>
            <p className="hint">
              Informe a data e marque USG, Tomografia e Ressonância
              {exameId === "mamas" ? " (e Mamografia neste exame)" : ""}.
            </p>

            <div className="anteriores-list">
              {examesAnteriores.map((ant, idx) => (
                <div key={ant.id} className="anterior-card">
                  <div className="anterior-top">
                    <label className="field">
                      <span>Data do exame {idx + 1}</span>
                      <input
                        value={ant.data}
                        onChange={(ev) =>
                          atualizarAnterior(ant.id, { data: ev.target.value })
                        }
                        placeholder="dd/mm/aaaa"
                      />
                    </label>
                    {examesAnteriores.length > 1 ? (
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
                    ) : null}
                  </div>
                  <div className="mod-chips">
                    {modalidades.map((mod) => {
                      const on = ant.modalidades.includes(mod);
                      return (
                        <button
                          key={mod}
                          type="button"
                          className={`chip ${on ? "on" : ""}`}
                          onClick={() => toggleModalidade(ant.id, mod)}
                        >
                          {mod}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
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
