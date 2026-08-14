"use client";

import {
  SCORE_LABELS,
  SEGMENTOS_17,
  calcularEco,
  fmtNum,
  formEcoVazio,
  refsPorSexo,
  statusFaixa,
  type EcocardiogramaFormState,
  type ScoreSegmento,
  type StatusNorm,
} from "@/lib/ecocardiogramaForm";
import { useMemo, useState } from "react";

type Props = {
  valor: EcocardiogramaFormState;
  onChange: (v: EcocardiogramaFormState) => void;
  disabled?: boolean;
};

type Aba = "medidas" | "strain" | "segmentar";

function Field({
  label,
  value,
  onChange,
  unit,
  disabled,
  readOnly,
  refText,
  status,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  unit?: string;
  disabled?: boolean;
  readOnly?: boolean;
  refText?: string;
  status?: StatusNorm;
}) {
  return (
    <div className={`eco-field${status ? ` st-${status}` : ""}`}>
      <span className="eco-field-lab">{label}</span>
      <input
        className={`eco-field-inp${readOnly ? " calc" : ""}`}
        value={value}
        readOnly={readOnly}
        disabled={disabled || readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        inputMode="decimal"
      />
      {unit ? <span className="eco-field-un">{unit}</span> : null}
      {refText ? <span className="eco-field-ref">{refText}</span> : null}
    </div>
  );
}

export default function EcocardiogramaPainel({
  valor,
  onChange,
  disabled,
}: Props) {
  const form = valor ?? formEcoVazio();
  const [aba, setAba] = useState<Aba>("medidas");
  const calc = useMemo(() => calcularEco(form), [form]);
  const refs = refsPorSexo(form.sexo);

  function set(parcial: Partial<EcocardiogramaFormState>) {
    onChange({ ...form, ...parcial });
  }

  function setSeg(id: string, score: ScoreSegmento) {
    set({ segmentos: { ...form.segmentos, [id]: score } });
  }

  function marcarTodos(score: ScoreSegmento) {
    const segmentos = { ...form.segmentos };
    for (const s of SEGMENTOS_17) segmentos[s.id] = score;
    set({ segmentos });
  }

  return (
    <div className="eco-painel">
      <div className="eco-abas">
        {(
          [
            ["medidas", "Medidas Gerais"],
            ["strain", "Strain"],
            ["segmentar", "Análise Segmentar"],
          ] as const
        ).map(([id, lab]) => (
          <button
            key={id}
            type="button"
            className={`eco-aba${aba === id ? " active" : ""}`}
            disabled={disabled}
            onClick={() => setAba(id)}
          >
            {lab}
          </button>
        ))}
      </div>

      {aba === "medidas" ? (
        <>
          <section className="eco-bloco">
            <h3>DADOS DO PACIENTE</h3>
            <div className="eco-grid-4">
              <label className="eco-select">
                <span>Sexo</span>
                <select
                  disabled={disabled}
                  value={form.sexo}
                  onChange={(e) =>
                    set({ sexo: e.target.value as EcocardiogramaFormState["sexo"] })
                  }
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </label>
              <Field
                label="Peso"
                unit="kg"
                value={form.pesoKg}
                disabled={disabled}
                onChange={(v) => set({ pesoKg: v })}
              />
              <Field
                label="Altura"
                unit="cm"
                value={form.alturaCm}
                disabled={disabled}
                onChange={(v) => set({ alturaCm: v })}
              />
              <Field
                label="Sup. corporal"
                unit="m²"
                value={fmtNum(calc.bsa, 2)}
                readOnly
              />
              <Field
                label="Idade"
                unit="anos"
                value={form.idade}
                disabled={disabled}
                onChange={(v) => set({ idade: v })}
              />
            </div>
          </section>

          <div className="eco-colunas eco-colunas-medidas">
            <section className="eco-bloco">
              <h3>CÂMARAS ESQUERDAS</h3>
              <Field label="Via de saída do VE" unit="mm" value={form.vsve} disabled={disabled} onChange={(v) => set({ vsve: v })} />
              <Field label="Anel aórtico" unit="mm" value={form.anelAo} disabled={disabled} onChange={(v) => set({ anelAo: v })} refText={`${refs.anelAo.min} – ${refs.anelAo.max}`} status={statusFaixa(Number(form.anelAo.replace(",",".")), refs.anelAo.min, refs.anelAo.max)} />
              <Field label="Anel aórtico indexado" unit="mm/m²" value={fmtNum(calc.anelAoIdx, 2)} readOnly refText={`${refs.anelAoIdx.min} – ${refs.anelAoIdx.max}`} status={statusFaixa(calc.anelAoIdx, refs.anelAoIdx.min, refs.anelAoIdx.max)} />
              <Field label="Aorta (seios de Valsalva)" unit="mm" value={form.seiosValsalva} disabled={disabled} onChange={(v) => set({ seiosValsalva: v })} refText={`${refs.seios.min} – ${refs.seios.max}`} status={statusFaixa(Number(form.seiosValsalva.replace(",",".")), refs.seios.min, refs.seios.max)} />
              <Field label="Aorta (seios) indexado" unit="mm/m²" value={fmtNum(calc.seiosIdx, 2)} readOnly refText={`${refs.seiosIdx.min} – ${refs.seiosIdx.max}`} status={statusFaixa(calc.seiosIdx, refs.seiosIdx.min, refs.seiosIdx.max)} />
              <Field label="Aorta (junção sinotubular)" unit="mm" value={form.juncaoSinoTub} disabled={disabled} onChange={(v) => set({ juncaoSinoTub: v })} refText={`${refs.juncao.min} – ${refs.juncao.max}`} status={statusFaixa(Number(form.juncaoSinoTub.replace(",",".")), refs.juncao.min, refs.juncao.max)} />
              <Field label="Junção sinotubular indexada" unit="mm/m²" value={fmtNum(calc.juncaoIdx, 2)} readOnly refText={`${refs.juncaoIdx.min} – ${refs.juncaoIdx.max}`} status={statusFaixa(calc.juncaoIdx, refs.juncaoIdx.min, refs.juncaoIdx.max)} />
              <Field label="Aorta ascendente" unit="mm" value={form.aortaAsc} disabled={disabled} onChange={(v) => set({ aortaAsc: v })} refText={`${refs.aortaAsc.min} – ${refs.aortaAsc.max}`} status={statusFaixa(Number(form.aortaAsc.replace(",",".")), refs.aortaAsc.min, refs.aortaAsc.max)} />
              <Field label="Aorta ascendente indexada" unit="mm/m²" value={fmtNum(calc.aortaAscIdx, 2)} readOnly />
              <Field label="Arco aórtico" unit="mm" value={form.arcoAo} disabled={disabled} onChange={(v) => set({ arcoAo: v })} />
              <Field label="Átrio esquerdo (A-P)" unit="mm" value={form.aeAP} disabled={disabled} onChange={(v) => set({ aeAP: v })} refText={`${refs.aeAP.min} – ${refs.aeAP.max}`} status={statusFaixa(Number(form.aeAP.replace(",",".")), refs.aeAP.min, refs.aeAP.max)} />
              <Field label="Volume átrio esquerdo" unit="ml" value={form.volAE} disabled={disabled} onChange={(v) => set({ volAE: v })} />
              <Field label="Volume AE indexado" unit="mL/m²" value={fmtNum(calc.volAEIdx, 1)} readOnly refText={`normal < ${refs.volAEIdx.max}`} status={statusFaixa(calc.volAEIdx, undefined, refs.volAEIdx.max)} />
              <Field label="Diâmetro diastólico VE" unit="mm" value={form.ddfVE} disabled={disabled} onChange={(v) => set({ ddfVE: v })} refText={`${refs.ddf.min} – ${refs.ddf.max}`} status={statusFaixa(Number(form.ddfVE.replace(",",".")), refs.ddf.min, refs.ddf.max)} />
              <Field label="Diâmetro sistólico VE" unit="mm" value={form.dsfVE} disabled={disabled} onChange={(v) => set({ dsfVE: v })} refText={`${refs.dsf.min} – ${refs.dsf.max}`} status={statusFaixa(Number(form.dsfVE.replace(",",".")), refs.dsf.min, refs.dsf.max)} />
              <Field label="Septo interventricular (d)" unit="mm" value={form.siv} disabled={disabled} onChange={(v) => set({ siv: v })} refText={`${refs.siv.min} – ${refs.siv.max}`} status={statusFaixa(Number(form.siv.replace(",",".")), refs.siv.min, refs.siv.max)} />
              <Field label="Parede posterior do VE (d)" unit="mm" value={form.ppVE} disabled={disabled} onChange={(v) => set({ ppVE: v })} refText={`${refs.pp.min} – ${refs.pp.max}`} status={statusFaixa(Number(form.ppVE.replace(",",".")), refs.pp.min, refs.pp.max)} />

              <h3 className="eco-sub">RELAÇÕES / FUNÇÕES</h3>
              <Field label="Vol. diast. final VE" unit="ml" value={fmtNum(calc.edv, 1)} readOnly />
              <Field label="Vol. sist. final VE" unit="ml" value={fmtNum(calc.esv, 1)} readOnly />
              <Field label="Vol. diast. final VE / SC" unit="ml/m²" value={fmtNum(calc.edvi, 1)} readOnly />
              <Field label="Vol. sist. final VE / SC" unit="ml/m²" value={fmtNum(calc.esvi, 1)} readOnly />
              <Field label="FE do VE (Teichholz)" unit="%" value={fmtNum(calc.feTeich, 1)} readOnly refText={`${refs.fe.min} – ${refs.fe.max}`} status={statusFaixa(calc.feTeich, refs.fe.min, refs.fe.max)} />
              <Field label="FE do VE (Simpson)" unit="%" value={form.feSimpson} disabled={disabled} onChange={(v) => set({ feSimpson: v })} refText={`${refs.fe.min} – ${refs.fe.max}`} />
              <Field label="% Encurtamento do VE" unit="%" value={fmtNum(calc.fs, 1)} readOnly refText={`${refs.fs.min} – ${refs.fs.max}`} status={statusFaixa(calc.fs, refs.fs.min, refs.fs.max)} />
              <Field label="Massa VE" unit="g" value={fmtNum(calc.massa, 1)} readOnly refText={`${refs.massa.min} – ${refs.massa.max}`} status={statusFaixa(calc.massa, refs.massa.min, refs.massa.max)} />
              <Field label="Índice de massa VE" unit="g/m²" value={fmtNum(calc.massaIdx, 1)} readOnly refText={`${refs.massaIdx.min} – ${refs.massaIdx.max}`} status={statusFaixa(calc.massaIdx, refs.massaIdx.min, refs.massaIdx.max)} />
              <Field label="Espes. rel. paredes VE (RWT)" value={fmtNum(calc.rwt, 2)} readOnly refText={`≤ ${refs.rwt.max}`} status={statusFaixa(calc.rwt, undefined, refs.rwt.max)} />
              <div className="eco-geometria">
                Geometria VE: <strong>{calc.geometria}</strong>
              </div>
              <Field label="TAPSE VD" unit="mm" value={form.tapse} disabled={disabled} onChange={(v) => set({ tapse: v })} refText={`≥ ${refs.tapse.min}`} status={statusFaixa(Number(form.tapse.replace(",",".")), refs.tapse.min)} />
              <Field label="FAC VD" unit="%" value={form.facVD} disabled={disabled} onChange={(v) => set({ facVD: v })} refText={`≥ ${refs.fac.min}`} status={statusFaixa(Number(form.facVD.replace(",",".")), refs.fac.min)} />
              <Field label="S' anel tricúspide" unit="cm/s" value={form.sTric} disabled={disabled} onChange={(v) => set({ sTric: v })} refText={`≥ ${refs.sTric.min}`} />
              <Field label="Tei VD" value={form.teiVD} disabled={disabled} onChange={(v) => set({ teiVD: v })} />
              <Field label="Tei VE" value={form.teiVE} disabled={disabled} onChange={(v) => set({ teiVE: v })} />
              <Field label="dp/dt" unit="mmHg/s" value={form.dpDt} disabled={disabled} onChange={(v) => set({ dpDt: v })} />
            </section>

            <section className="eco-bloco">
              <h3>CÂMARAS DIREITAS</h3>
              <Field label="Via de saída do VD" unit="mm" value={form.vsvd} disabled={disabled} onChange={(v) => set({ vsvd: v })} />
              <Field label="Tronco pulmonar" unit="mm" value={form.troncoPulm} disabled={disabled} onChange={(v) => set({ troncoPulm: v })} />
              <Field label="Artéria pulmonar" unit="mm" value={form.artPulm} disabled={disabled} onChange={(v) => set({ artPulm: v })} />
              <Field label="Volume átrio direito" unit="ml" value={form.volAD} disabled={disabled} onChange={(v) => set({ volAD: v })} />
              <Field label="VD (basal)" unit="mm" value={form.vdBasal} disabled={disabled} onChange={(v) => set({ vdBasal: v })} />
              <Field label="Espessura parede livre VD" unit="mm" value={form.espParedeLivreVD} disabled={disabled} onChange={(v) => set({ espParedeLivreVD: v })} />

              <h3 className="eco-sub">PARÂMETROS HEMODINÂMICOS</h3>
              <Field label="Frequência cardíaca" unit="bpm" value={form.fc} disabled={disabled} onChange={(v) => set({ fc: v })} />
              <Field label="Pressão arterial" unit="mmHg" value={form.pa} disabled={disabled} onChange={(v) => set({ pa: v })} />
              <Field label="Integral fluxo VSVE (VTI)" unit="cm" value={form.vtiVsve} disabled={disabled} onChange={(v) => set({ vtiVsve: v })} />
              <Field label="Volume sistólico" unit="ml/bat" value={fmtNum(calc.debitoSistolico, 1)} readOnly />
              <Field label="Débito cardíaco" unit="L/min" value={fmtNum(calc.debitoCardiaco, 2)} readOnly />

              <h3 className="eco-sub">FUNÇÃO DIASTÓLICA</h3>
              <Field label="Onda E mitral" unit="m/s" value={form.ondaE} disabled={disabled} onChange={(v) => set({ ondaE: v })} />
              <Field label="Onda A mitral" unit="m/s" value={form.ondaA} disabled={disabled} onChange={(v) => set({ ondaA: v })} />
              <Field label="Relação E/A" value={fmtNum(calc.ea, 2)} readOnly refText={`${refs.ea.min} – ${refs.ea.max}`} status={statusFaixa(calc.ea, refs.ea.min, refs.ea.max)} />
              <Field label="e' septal" unit="cm/s" value={form.eSeptal} disabled={disabled} onChange={(v) => set({ eSeptal: v })} />
              <Field label="e' lateral" unit="cm/s" value={form.eLateral} disabled={disabled} onChange={(v) => set({ eLateral: v })} />
              <Field label="e' média" unit="cm/s" value={fmtNum(calc.eMedia, 1)} readOnly />
              <Field label="Relação E/e'" value={fmtNum(calc.eSobreE, 1)} readOnly refText={`< ${refs.eSobreE.max}`} status={statusFaixa(calc.eSobreE, undefined, refs.eSobreE.max)} />
              <Field label="TRIV" unit="ms" value={form.triv} disabled={disabled} onChange={(v) => set({ triv: v })} />
              <Field label="Tempo desaceleração E" unit="ms" value={form.tempoDesacelE} disabled={disabled} onChange={(v) => set({ tempoDesacelE: v })} />
              <Field label="Vp mitral" unit="cm/s" value={form.vpMitral} disabled={disabled} onChange={(v) => set({ vpMitral: v })} />

              <h3 className="eco-sub">HIPERTENSÃO PULMONAR</h3>
              <Field label="Vmáx. regurgitação tricúspide" unit="m/s" value={form.vmaxRT} disabled={disabled} onChange={(v) => set({ vmaxRT: v })} />
              <Field label="Tempo aceleração fluxo pulmonar" unit="ms" value={form.tempoAcelPulm} disabled={disabled} onChange={(v) => set({ tempoAcelPulm: v })} />
              <Field label="Tempo ejeção fluxo pulmonar" unit="ms" value={form.tempoEjecPulm} disabled={disabled} onChange={(v) => set({ tempoEjecPulm: v })} />
              <Field label="VCI inspiração" unit="mm" value={form.vciInsp} disabled={disabled} onChange={(v) => set({ vciInsp: v })} />
              <Field label="VCI expiração" unit="mm" value={form.vciExp} disabled={disabled} onChange={(v) => set({ vciExp: v })} />
              <Field label="Variação VCI" unit="%" value={fmtNum(calc.variacaoVCI, 0)} readOnly />
              <Field label="Pressão AD estimada" unit="mmHg" value={form.pressaoAD} disabled={disabled} onChange={(v) => set({ pressaoAD: v })} />
              <Field label="PSAP estimada" unit="mmHg" value={fmtNum(calc.psap, 0)} readOnly refText={`< ${refs.psap.max}`} status={statusFaixa(calc.psap, undefined, refs.psap.max)} />
            </section>
          </div>
        </>
      ) : null}

      {aba === "strain" ? (
        <section className="eco-bloco">
          <h3>STRAIN</h3>
          <div className="eco-colunas">
            <div>
              <h4>VENTRÍCULO ESQUERDO</h4>
              <Field label="Strain longitudinal global (GLS)" unit="%" value={form.glsVE} disabled={disabled} onChange={(v) => set({ glsVE: v })} refText="≈ −21,5 ± 2%" />
              <Field label="Strain circunferencial" unit="%" value={form.strainCirc} disabled={disabled} onChange={(v) => set({ strainCirc: v })} refText="≈ −22,2 ± 3,4%" />
              <Field label="Strain radial" unit="%" value={form.strainRadial} disabled={disabled} onChange={(v) => set({ strainRadial: v })} refText="≈ +40 ± 12%" />
            </div>
            <div>
              <h4>ÁTRIO ESQUERDO / VD</h4>
              <Field label="Strain átrio esquerdo" unit="%" value={form.strainAE} disabled={disabled} onChange={(v) => set({ strainAE: v })} refText="38 – 41%" />
              <Field label="Strain longitudinal global VD" unit="%" value={form.glsVD} disabled={disabled} onChange={(v) => set({ glsVD: v })} refText="≈ −34 ± 8%" />
            </div>
          </div>
        </section>
      ) : null}

      {aba === "segmentar" ? (
        <section className="eco-bloco">
          <h3>ANÁLISE SEGMENTAR (17 segmentos)</h3>
          <div className="eco-seg-actions">
            <button type="button" disabled={disabled} onClick={() => marcarTodos("1")}>
              Normal
            </button>
            <button type="button" disabled={disabled} onClick={() => marcarTodos("2")}>
              Hipo. difusa
            </button>
          </div>
          {(["basal", "medial", "apical", "apice"] as const).map((nivel) => (
            <div key={nivel} className="eco-seg-nivel">
              <h4>
                {nivel === "basal"
                  ? "Basal"
                  : nivel === "medial"
                    ? "Medial"
                    : nivel === "apical"
                      ? "Apical"
                      : "Ápice"}
              </h4>
              <div className="eco-seg-grid">
                {SEGMENTOS_17.filter((s) => s.nivel === nivel).map((s) => (
                  <label key={s.id} className="eco-seg-item">
                    <span>{s.nome}</span>
                    <select
                      disabled={disabled}
                      value={form.segmentos[s.id] ?? "1"}
                      onChange={(e) =>
                        setSeg(s.id, e.target.value as ScoreSegmento)
                      }
                    >
                      {(Object.keys(SCORE_LABELS) as ScoreSegmento[]).map(
                        (k) => (
                          <option key={k} value={k}>
                            {SCORE_LABELS[k]}
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <section className="eco-bloco">
        <h3>OBSERVAÇÃO / COMENTÁRIO</h3>
        <textarea
          className="eco-comentario"
          disabled={disabled}
          rows={3}
          placeholder="Comentários de normalidade ou achados adicionais..."
          value={form.comentario}
          onChange={(e) => set({ comentario: e.target.value })}
        />
      </section>
    </div>
  );
}
