"use client";

import {
  FACES,
  LOCAIS_SEGMENTO,
  SEGMENTOS_MEMBRO,
  VEIAS_PROFUNDAS,
  formVenosoVazio,
  novaPerfurante,
  novaReticular,
  novaTributaria,
  type MmiiVenosoFormState,
  type PerfuranteItem,
  type ReticularItem,
  type TributariaItem,
} from "@/lib/mmiiVenosoForm";
import MarcadorImagemMmii from "@/components/MarcadorImagemMmii";

type Props = {
  valor: MmiiVenosoFormState;
  onChange: (v: MmiiVenosoFormState) => void;
  disabled?: boolean;
};

function Select({
  value,
  options,
  onChange,
  disabled,
}: {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

const LOCAIS_PERFURANTE = [
  "na face medial da perna",
  "na face lateral da perna",
  "na face posterior da perna",
  "na face medial da coxa",
  "na face lateral da coxa",
  "na face posterior da coxa",
  "na região do tornozelo",
] as const;

const LOCAIS_TRIB1 = [
  "na face medial",
  "na face lateral",
  "na face anterior",
  "na face posterior",
] as const;

const LOCAIS_VSP_PARCIAL = [
  "no terço superior da perna",
  "no terço médio da perna",
  "no terço inferior da perna",
] as const;

export default function MmiiVenosoPainel({ valor, onChange, disabled }: Props) {
  const form = valor ?? formVenosoVazio();

  function set(parcial: Partial<MmiiVenosoFormState>) {
    onChange({ ...form, ...parcial });
  }

  function setMedida(k: keyof MmiiVenosoFormState["medidas"], v: string) {
    set({ medidas: { ...form.medidas, [k]: v } });
  }

  function updPerf(id: string, p: Partial<PerfuranteItem>) {
    set({
      perfurantes: form.perfurantes.map((x) =>
        x.id === id ? { ...x, ...p } : x,
      ),
    });
  }

  function updTrib(id: string, p: Partial<TributariaItem>) {
    set({
      tributarias: form.tributarias.map((x) =>
        x.id === id ? { ...x, ...p } : x,
      ),
    });
  }

  function updRet(id: string, p: Partial<ReticularItem>) {
    set({
      reticulares: form.reticulares.map((x) =>
        x.id === id ? { ...x, ...p } : x,
      ),
    });
  }

  function toggleLista(
    campo: "refluxoProfundo" | "tromboseProfunda",
    veia: string,
  ) {
    const atual = form[campo];
    set({
      [campo]: atual.includes(veia)
        ? atual.filter((v) => v !== veia)
        : [...atual, veia],
    });
  }

  return (
    <div className="mmii-venoso-painel">
      <div className="mmii-venoso-grid">
        <div className="mmii-venoso-col">
          <section className="mmii-bloco">
            <h4>Medidas (mm)</h4>
            <div className="mmii-medidas">
              {(
                [
                  ["jsf", "JSF"],
                  ["coxa", "Coxa"],
                  ["perna", "Perna"],
                  ["parva", "Parva"],
                ] as const
              ).map(([k, label]) => (
                <label key={k}>
                  {label}
                  <input
                    type="text"
                    inputMode="decimal"
                    disabled={disabled}
                    value={form.medidas[k]}
                    onChange={(e) => setMedida(k, e.target.value)}
                    placeholder="mm"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="mmii-bloco">
            <h4>Insuficiência da safena magna</h4>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.insufVsm === "todo"}
                onChange={(e) =>
                  set({ insufVsm: e.target.checked ? "todo" : "" })
                }
              />
              Em todo o trajeto
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.insufVsm === "parcial"}
                onChange={(e) =>
                  set({ insufVsm: e.target.checked ? "parcial" : "" })
                }
              />
              Desde… até…
            </label>
            {form.insufVsm === "parcial" ? (
              <div className="mmii-inline">
                <Select
                  disabled={disabled}
                  value={form.insufVsmDe}
                  options={LOCAIS_SEGMENTO}
                  onChange={(insufVsmDe) => set({ insufVsmDe })}
                />
                <Select
                  disabled={disabled}
                  value={form.insufVsmAte}
                  options={LOCAIS_SEGMENTO}
                  onChange={(insufVsmAte) => set({ insufVsmAte })}
                />
              </div>
            ) : null}
          </section>

          <section className="mmii-bloco">
            <h4>Insuficiência da safena parva</h4>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.insufVsp === "todo"}
                onChange={(e) =>
                  set({ insufVsp: e.target.checked ? "todo" : "" })
                }
              />
              Em todo o trajeto
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.insufVsp === "parcial"}
                onChange={(e) =>
                  set({ insufVsp: e.target.checked ? "parcial" : "" })
                }
              />
              Parcial
            </label>
            {form.insufVsp === "parcial" ? (
              <Select
                disabled={disabled}
                value={form.insufVspOnde}
                options={LOCAIS_VSP_PARCIAL}
                onChange={(insufVspOnde) => set({ insufVspOnde })}
              />
            ) : null}
          </section>

          <section className="mmii-bloco">
            <div className="mmii-bloco-head">
              <h4>Veias perfurantes</h4>
              <button
                type="button"
                className="btn ghost small"
                disabled={disabled}
                onClick={() =>
                  set({ perfurantes: [...form.perfurantes, novaPerfurante()] })
                }
              >
                +
              </button>
            </div>
            {form.perfurantes.map((p) => (
              <div key={p.id} className="mmii-item-row">
                <input
                  type="text"
                  inputMode="decimal"
                  disabled={disabled}
                  value={p.medida}
                  placeholder="cm"
                  onChange={(e) => updPerf(p.id, { medida: e.target.value })}
                  className="mmii-cm"
                />
                <Select
                  disabled={disabled}
                  value={p.face}
                  options={FACES}
                  onChange={(face) => updPerf(p.id, { face })}
                />
                <Select
                  disabled={disabled}
                  value={p.local}
                  options={LOCAIS_PERFURANTE}
                  onChange={(local) => updPerf(p.id, { local })}
                />
                <button
                  type="button"
                  className="btn ghost small"
                  disabled={disabled}
                  onClick={() =>
                    set({
                      perfurantes: form.perfurantes.filter((x) => x.id !== p.id),
                    })
                  }
                  aria-label="Remover"
                >
                  ×
                </button>
              </div>
            ))}
          </section>

          <section className="mmii-bloco">
            <div className="mmii-bloco-head">
              <h4>Veias tributárias</h4>
              <button
                type="button"
                className="btn ghost small"
                disabled={disabled}
                onClick={() =>
                  set({ tributarias: [...form.tributarias, novaTributaria()] })
                }
              >
                +
              </button>
            </div>
            {form.tributarias.map((t) => (
              <div key={t.id} className="mmii-item-row">
                <Select
                  disabled={disabled}
                  value={t.local1}
                  options={LOCAIS_TRIB1}
                  onChange={(local1) => updTrib(t.id, { local1 })}
                />
                <Select
                  disabled={disabled}
                  value={t.local2}
                  options={SEGMENTOS_MEMBRO}
                  onChange={(local2) => updTrib(t.id, { local2 })}
                />
                <label className="check-row compact">
                  <input
                    type="checkbox"
                    disabled={disabled}
                    checked={t.tromboflebite}
                    onChange={(e) =>
                      updTrib(t.id, { tromboflebite: e.target.checked })
                    }
                  />
                  Tromboflebite
                </label>
                <button
                  type="button"
                  className="btn ghost small"
                  disabled={disabled}
                  onClick={() =>
                    set({
                      tributarias: form.tributarias.filter((x) => x.id !== t.id),
                    })
                  }
                >
                  ×
                </button>
              </div>
            ))}
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.tributariasDifusas}
                onChange={(e) => set({ tributariasDifusas: e.target.checked })}
              />
              Difusas
            </label>
          </section>

          <section className="mmii-bloco">
            <h4>Cirurgias</h4>
            <div className="mmii-sub">
              <strong>Safena magna</strong>
              <label className="check-row">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={form.cirurgiaVsm === "total"}
                  onChange={(e) =>
                    set({ cirurgiaVsm: e.target.checked ? "total" : "" })
                  }
                />
                Ausência total
              </label>
              <label className="check-row">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={form.cirurgiaVsm === "parcial"}
                  onChange={(e) =>
                    set({ cirurgiaVsm: e.target.checked ? "parcial" : "" })
                  }
                />
                Ausência parcial
              </label>
              {form.cirurgiaVsm === "parcial" ? (
                <Select
                  disabled={disabled}
                  value={form.cirurgiaVsmOnde}
                  options={["da coxa", "da perna", "da coxa e da perna"]}
                  onChange={(cirurgiaVsmOnde) => set({ cirurgiaVsmOnde })}
                />
              ) : null}
            </div>
            <div className="mmii-sub">
              <strong>Safena parva</strong>
              <label className="check-row">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={form.cirurgiaVsp === "total"}
                  onChange={(e) =>
                    set({ cirurgiaVsp: e.target.checked ? "total" : "" })
                  }
                />
                Ausência total
              </label>
              <label className="check-row">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={form.cirurgiaVsp === "parcial"}
                  onChange={(e) =>
                    set({ cirurgiaVsp: e.target.checked ? "parcial" : "" })
                  }
                />
                Ausência parcial
              </label>
              {form.cirurgiaVsp === "parcial" ? (
                <Select
                  disabled={disabled}
                  value={form.cirurgiaVspOnde}
                  options={["da perna", "do terço superior da perna"]}
                  onChange={(cirurgiaVspOnde) => set({ cirurgiaVspOnde })}
                />
              ) : null}
            </div>
          </section>

          <section className="mmii-bloco">
            <h4>Refluxo de veias profundas</h4>
            <div className="mmii-chips">
              {VEIAS_PROFUNDAS.map((v) => (
                <label key={v} className="check-row compact">
                  <input
                    type="checkbox"
                    disabled={disabled}
                    checked={form.refluxoProfundo.includes(v)}
                    onChange={() => toggleLista("refluxoProfundo", v)}
                  />
                  {v}
                </label>
              ))}
            </div>
          </section>

          <section className="mmii-bloco">
            <h4>Trombose de veias profundas</h4>
            <div className="mmii-chips">
              {VEIAS_PROFUNDAS.map((v) => (
                <label key={v} className="check-row compact">
                  <input
                    type="checkbox"
                    disabled={disabled}
                    checked={form.tromboseProfunda.includes(v)}
                    onChange={() => toggleLista("tromboseProfunda", v)}
                  />
                  {v}
                </label>
              ))}
            </div>
          </section>

          <section className="mmii-bloco">
            <h4>Tromboflebite</h4>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.tromboflebiteVsm}
                onChange={(e) => set({ tromboflebiteVsm: e.target.checked })}
              />
              Na veia safena magna
            </label>
            {form.tromboflebiteVsm ? (
              <Select
                disabled={disabled}
                value={form.tromboflebiteVsmOnde}
                options={[
                  "em todo o trajeto",
                  ...LOCAIS_SEGMENTO.filter((x) => x !== "a junção"),
                ]}
                onChange={(tromboflebiteVsmOnde) =>
                  set({ tromboflebiteVsmOnde })
                }
              />
            ) : null}
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.tromboflebiteVsp}
                onChange={(e) => set({ tromboflebiteVsp: e.target.checked })}
              />
              Na veia safena parva
            </label>
            {form.tromboflebiteVsp ? (
              <Select
                disabled={disabled}
                value={form.tromboflebiteVspOnde}
                options={["em todo o trajeto", ...LOCAIS_VSP_PARCIAL]}
                onChange={(tromboflebiteVspOnde) =>
                  set({ tromboflebiteVspOnde })
                }
              />
            ) : null}
          </section>

          <section className="mmii-bloco">
            <div className="mmii-bloco-head">
              <h4>Veias reticulares</h4>
              <button
                type="button"
                className="btn ghost small"
                disabled={disabled}
                onClick={() =>
                  set({ reticulares: [...form.reticulares, novaReticular()] })
                }
              >
                +
              </button>
            </div>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.reticularesDifusas}
                onChange={(e) => set({ reticularesDifusas: e.target.checked })}
              />
              Difusas
            </label>
            {form.reticulares.map((r) => (
              <div key={r.id} className="mmii-item-row">
                <Select
                  disabled={disabled}
                  value={r.face}
                  options={LOCAIS_TRIB1}
                  onChange={(face) => updRet(r.id, { face })}
                />
                <Select
                  disabled={disabled}
                  value={r.segmento}
                  options={SEGMENTOS_MEMBRO}
                  onChange={(segmento) => updRet(r.id, { segmento })}
                />
                <button
                  type="button"
                  className="btn ghost small"
                  disabled={disabled}
                  onClick={() =>
                    set({
                      reticulares: form.reticulares.filter((x) => x.id !== r.id),
                    })
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </section>

          <section className="mmii-bloco">
            <h4>Teleangiectasias</h4>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.teleangiectasiasDifusas}
                onChange={(e) =>
                  set({
                    teleangiectasiasDifusas: e.target.checked,
                    teleangiectasiasLocalizada: e.target.checked
                      ? false
                      : form.teleangiectasiasLocalizada,
                  })
                }
              />
              Difusas
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.teleangiectasiasLocalizada}
                onChange={(e) =>
                  set({
                    teleangiectasiasLocalizada: e.target.checked,
                    teleangiectasiasDifusas: e.target.checked
                      ? false
                      : form.teleangiectasiasDifusas,
                  })
                }
              />
              Localizada
            </label>
            {form.teleangiectasiasLocalizada ? (
              <div className="mmii-inline">
                <Select
                  disabled={disabled}
                  value={form.teleangiectasiasFace}
                  options={FACES}
                  onChange={(teleangiectasiasFace) =>
                    set({ teleangiectasiasFace })
                  }
                />
                <Select
                  disabled={disabled}
                  value={form.teleangiectasiasSegmento}
                  options={SEGMENTOS_MEMBRO}
                  onChange={(teleangiectasiasSegmento) =>
                    set({ teleangiectasiasSegmento })
                  }
                />
              </div>
            ) : null}
          </section>

          <section className="mmii-bloco">
            <h4>Observações</h4>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.obsBaker}
                onChange={(e) => set({ obsBaker: e.target.checked })}
              />
              Cisto de Baker
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.obsEdema}
                onChange={(e) => set({ obsEdema: e.target.checked })}
              />
              Edema
            </label>
            {form.obsEdema ? (
              <div className="mmii-inline">
                <Select
                  disabled={disabled}
                  value={form.obsEdemaGrau}
                  options={["leve", "moderado", "acentuado"]}
                  onChange={(obsEdemaGrau) => set({ obsEdemaGrau })}
                />
                <Select
                  disabled={disabled}
                  value={form.obsEdemaLocal}
                  options={["perna", "coxa", "pé", "membro"]}
                  onChange={(obsEdemaLocal) => set({ obsEdemaLocal })}
                />
              </div>
            ) : null}
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.obsLinfedema}
                onChange={(e) => set({ obsLinfedema: e.target.checked })}
              />
              Linfedema
            </label>
            {form.obsLinfedema ? (
              <div className="mmii-inline">
                <Select
                  disabled={disabled}
                  value={form.obsLinfedemaGrau}
                  options={["leve", "moderado", "acentuado"]}
                  onChange={(obsLinfedemaGrau) => set({ obsLinfedemaGrau })}
                />
                <Select
                  disabled={disabled}
                  value={form.obsLinfedemaLocal}
                  options={["perna", "coxa", "pé", "membro"]}
                  onChange={(obsLinfedemaLocal) => set({ obsLinfedemaLocal })}
                />
              </div>
            ) : null}
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.obsDecubito}
                onChange={(e) => set({ obsDecubito: e.target.checked })}
              />
              Exame realizado em decúbito dorsal horizontal
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.obsCurativo}
                onChange={(e) => set({ obsCurativo: e.target.checked })}
              />
              Segmento não avaliado (curativo oclusivo)
            </label>
            {form.obsCurativo ? (
              <Select
                disabled={disabled}
                value={form.obsCurativoOnde}
                options={[
                  "Terço inferior da perna",
                  "Terço médio da perna",
                  "Terço superior da perna",
                  "Terço inferior da coxa",
                  "Região do tornozelo",
                  "Pé",
                ]}
                onChange={(obsCurativoOnde) => set({ obsCurativoOnde })}
              />
            ) : null}
            <label className="check-row">
              Outras observações
              <input
                type="text"
                disabled={disabled}
                value={form.obsOutras}
                onChange={(e) => set({ obsOutras: e.target.value })}
                placeholder="Texto livre…"
                className="mmii-outras"
              />
            </label>
          </section>
        </div>

        <div className="mmii-venoso-marcador">
          <h4>Marcação no esquema</h4>
          <MarcadorImagemMmii
            valor={form.mapaPng}
            disabled={disabled}
            onChange={(mapaPng) => set({ mapaPng })}
          />
        </div>
      </div>
    </div>
  );
}
