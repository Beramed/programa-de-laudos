"use client";

import type { ReactNode } from "react";
import {
  MM_KEYS_2T,
  fmtIgSemanas,
  formObstLaudousVazio,
  igDiasPorCcn,
  igSemanasPorCa,
  igSemanasPorCc,
  igSemanasPorCf,
  igSemanasPorDbp,
  idxsBiometricos,
  pesoHadlockIII,
  tipoObstPorExameId,
  type ObstLaudousFormState,
  type ObstLaudousTipo,
} from "@/lib/obstetricoLaudousForm";

type Props = {
  exameId: string;
  valor: ObstLaudousFormState;
  onChange: (v: ObstLaudousFormState) => void;
  disabled?: boolean;
};

function Chip({
  active,
  onClick,
  children,
  tone = "blue",
  disabled,
}: {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
  tone?: "blue" | "warn" | "danger";
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={`obs-lus-chip tone-${tone}${active ? " active" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Sec({
  color,
  icon,
  title,
  children,
}: {
  color: string;
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={`obs-lus-sec hdr-${color}`}>
      <header className="obs-lus-sec-hdr">
        <span className="obs-lus-sec-ico" aria-hidden>
          {icon}
        </span>
        <strong>{title}</strong>
      </header>
      <div className="obs-lus-sec-body">{children}</div>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="obs-lus-row">
      <span className="obs-lus-lab">{label}</span>
      <div className="obs-lus-row-ctrl">{children}</div>
    </div>
  );
}

export default function ObstetricoLaudousPainel({
  exameId,
  valor,
  onChange,
  disabled,
}: Props) {
  const tipo = tipoObstPorExameId(exameId);
  const form = valor ?? formObstLaudousVazio(tipo);
  const is1t = tipo === "1r" || tipo === "1m" || tipo === "1tn" || tipo === "1mg";
  const is23 = tipo === "23" || tipo === "23m" || tipo === "23dop";

  function set(parcial: Partial<ObstLaudousFormState>) {
    onChange({ ...form, ...parcial });
  }

  function setMm(k: string, on: boolean) {
    set({ mm: { ...form.mm, [k]: on } });
  }

  const ccnN = parseFloat(form.ccn);
  const igCcn =
    ccnN > 0
      ? (() => {
          const dias = igDiasPorCcn(ccnN);
          return `${Math.floor(dias / 7)}s ${dias % 7}d`;
        })()
      : null;

  const idx = idxsBiometricos(form);
  const peso = pesoHadlockIII(
    parseFloat(form.cc),
    parseFloat(form.ca),
    parseFloat(form.cf),
  );

  const tipoLabel: Record<ObstLaudousTipo, string> = {
    "1r": "🌱 1º Tri - Rotina",
    "1m": "🔬 Morfológico 1º Trimestre",
    "1tn": "🩺 Obstétrico c/ Translucência Nucal",
    "23": "👶 2º/3º Tri",
    "1mg": "👥 Morfológico 1º Tri - Gemelar",
    "23m": "🔬 Morfológico 2º/3º Tri",
    "23dop": "📡 2º/3º Tri com Doppler",
    outro: "Obstetrícia",
  };

  return (
    <div className="obs-lus-painel">
      <div className="obs-lus-tipo-bar">
        <span className="obs-lus-tipo-lab">TIPO</span>
        <span className="obs-lus-tipo-ativo">{tipoLabel[tipo]}</span>
      </div>

      <div className="obs-lus-meta">
        <div className="obs-lus-meta-block">
          <span className="obs-lus-meta-lab">BASE DA IG</span>
          <div className="obs-lus-radio-row">
            {(
              [
                ["biometria", "Biometria atual"],
                ["anterior", "Exame anterior"],
                ["dum", "DUM"],
                ["fiv", "FIV"],
                ["desconhecida", "Desconhecida"],
              ] as const
            ).map(([id, lab]) => (
              <label key={id} className="obs-lus-radio">
                <input
                  type="radio"
                  name={`base-ig-${exameId}`}
                  disabled={disabled}
                  checked={form.baseIg === id}
                  onChange={() => set({ baseIg: id })}
                />
                {lab}
              </label>
            ))}
          </div>
        </div>
        <label className="obs-lus-field">
          <span>INDICAÇÃO</span>
          <select
            disabled={disabled}
            value={form.indicacao}
            onChange={(e) => set({ indicacao: e.target.value })}
          >
            <option>Pré-natal de rotina</option>
            <option>Sangramento</option>
            <option>Dor pélvica</option>
            <option>Controle de crescimento</option>
            <option>Rastreamento morfológico</option>
            <option>Outra</option>
          </select>
        </label>
        <label className="obs-lus-field">
          <span>DUM</span>
          <input
            disabled={disabled}
            value={form.dum}
            placeholder="DD/MM/AAAA"
            onChange={(e) => set({ dum: e.target.value })}
          />
        </label>
        <label className="obs-lus-field">
          <span>VIA</span>
          <select
            disabled={disabled}
            value={form.via}
            onChange={(e) => set({ via: e.target.value })}
          >
            <option value="">— não citar —</option>
            <option value="transabdominal">Transabdominal</option>
            <option value="transvaginal">Transvaginal</option>
            <option value="ambas">Transab + Transvag</option>
          </select>
        </label>
      </div>

      <Sec color="red" icon="⚠" title="LIMITAÇÕES TÉCNICAS">
        <label className="obs-lus-check">
          <input
            type="checkbox"
            disabled={disabled}
            checked={form.limJanela}
            onChange={(e) => set({ limJanela: e.target.checked })}
          />
          Janela acústica inadequada pelo tecido subcutâneo
        </label>
        <label className="obs-lus-check">
          <input
            type="checkbox"
            disabled={disabled}
            checked={form.limFeixes}
            onChange={(e) => set({ limFeixes: e.target.checked })}
          />
          Qualidade do exame prejudicada pela dificuldade de transposição dos
          feixes acústicos
        </label>
        <label className="obs-lus-check">
          <input
            type="checkbox"
            disabled={disabled}
            checked={form.limEstrutura}
            onChange={(e) => set({ limEstrutura: e.target.checked })}
          />
          Estrutura(s) não avaliada(s) por limitação técnica:
          <input
            className="obs-lus-inline"
            disabled={disabled || !form.limEstrutura}
            placeholder="ex: face fetal, coluna lombar"
            value={form.limEstruturaTxt}
            onChange={(e) => set({ limEstruturaTxt: e.target.value })}
          />
        </label>
      </Sec>

      {is1t ? (
        <>
          <Sec color="blue" icon="○" title="SACO GESTACIONAL">
            <Row label="Localização">
              <Chip
                disabled={disabled}
                active={form.sgLoc === "intrauterino"}
                onClick={() => set({ sgLoc: "intrauterino" })}
              >
                Intrauterino
              </Chip>
              <Chip
                disabled={disabled}
                tone="warn"
                active={form.sgLoc === "nao-id"}
                onClick={() => set({ sgLoc: "nao-id" })}
              >
                Não identificado
              </Chip>
              <Chip
                disabled={disabled}
                tone="danger"
                active={form.sgLoc === "ectopico"}
                onClick={() => set({ sgLoc: "ectopico" })}
              >
                Suspeita ectópico
              </Chip>
            </Row>
            <Row label="DMSG (3 med.)">
              <input
                className="obs-lus-num"
                disabled={disabled}
                placeholder="D1"
                value={form.dmsg1}
                onChange={(e) => set({ dmsg1: e.target.value })}
              />
              <span>×</span>
              <input
                className="obs-lus-num"
                disabled={disabled}
                placeholder="D2"
                value={form.dmsg2}
                onChange={(e) => set({ dmsg2: e.target.value })}
              />
              <span>×</span>
              <input
                className="obs-lus-num"
                disabled={disabled}
                placeholder="D3"
                value={form.dmsg3}
                onChange={(e) => set({ dmsg3: e.target.value })}
              />
              <span className="obs-lus-un">mm</span>
            </Row>
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.sgContornosOk}
                onChange={(e) => set({ sgContornosOk: e.target.checked })}
              />
              Contornos regulares e paredes normoecogênicas
            </label>
            <Row label="Implantação">
              <select
                disabled={disabled}
                value={form.implantacao}
                onChange={(e) => set({ implantacao: e.target.value })}
              >
                <option>fúndica</option>
                <option>corporal</option>
                <option>ístmica</option>
              </select>
            </Row>
            <Row label="Vesícula vitelina">
              <Chip
                disabled={disabled}
                active={form.vvStatus === "normal"}
                onClick={() => set({ vvStatus: "normal" })}
              >
                Normal
              </Chip>
              <Chip
                disabled={disabled}
                active={form.vvStatus === "ausente"}
                onClick={() => set({ vvStatus: "ausente" })}
              >
                Ausente
              </Chip>
              <input
                className="obs-lus-num"
                disabled={disabled}
                placeholder="mm"
                value={form.vvMm}
                onChange={(e) => set({ vvMm: e.target.value })}
              />
              <span className="obs-lus-un">mm</span>
            </Row>
          </Sec>

          <Sec color="teal" icon="👶" title="EMBRIÃO / FETO">
            <Row label="Situação">
              <Chip
                disabled={disabled}
                active={form.embStatus === "presente"}
                onClick={() => set({ embStatus: "presente" })}
              >
                Presente
              </Chip>
              <Chip
                disabled={disabled}
                active={form.embStatus === "nao-id"}
                onClick={() => set({ embStatus: "nao-id" })}
              >
                Não identificado
              </Chip>
            </Row>
            <Row label="CCN">
              <input
                className="obs-lus-num wide"
                disabled={disabled}
                placeholder="CCN mm"
                value={form.ccn}
                onChange={(e) => set({ ccn: e.target.value })}
              />
              <span className="obs-lus-un">mm</span>
              {igCcn ? (
                <span className="obs-lus-badge">IG: {igCcn}</span>
              ) : null}
            </Row>
            <Row label="BCF">
              <Chip
                disabled={disabled}
                active={form.bcfStatus === "presente"}
                onClick={() => set({ bcfStatus: "presente" })}
              >
                Presente
              </Chip>
              <Chip
                disabled={disabled}
                tone="danger"
                active={form.bcfStatus === "ausente"}
                onClick={() => set({ bcfStatus: "ausente" })}
              >
                Ausente
              </Chip>
              <input
                className="obs-lus-num"
                disabled={disabled}
                placeholder="bpm"
                value={form.bcfBpm}
                onChange={(e) => set({ bcfBpm: e.target.value })}
              />
              <span className="obs-lus-un">bpm</span>
            </Row>
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.movPresentes}
                onChange={(e) => set({ movPresentes: e.target.checked })}
              />
              Movimentos fetais presentes
            </label>
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.cordInsercaoOk}
                onChange={(e) => set({ cordInsercaoOk: e.target.checked })}
              />
              Inserção normal do cordão umbilical
            </label>
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.tnIncluir}
                onChange={(e) => set({ tnIncluir: e.target.checked })}
              />
              Translucência nucal (TN)
              <input
                className="obs-lus-num"
                disabled={disabled || !form.tnIncluir}
                placeholder="mm"
                value={form.tnMm}
                onChange={(e) => set({ tnMm: e.target.value })}
              />
              <span className="obs-lus-un">mm</span>
            </label>
          </Sec>

          <Sec color="purple" icon="♡" title="ÚTERO / ANEXOS">
            <Row label="Útero">
              <Chip
                disabled={disabled}
                active={form.uteroNormal}
                onClick={() => set({ uteroNormal: true })}
              >
                Normal
              </Chip>
              <Chip
                disabled={disabled}
                active={!form.uteroNormal}
                onClick={() => set({ uteroNormal: false })}
              >
                Alterado
              </Chip>
            </Row>
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.descolamento}
                onChange={(e) => set({ descolamento: e.target.checked })}
              />
              Área de descolamento ovular
            </label>
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.anexosOk}
                onChange={(e) => set({ anexosOk: e.target.checked })}
              />
              Regiões anexiais sem anormalidades detectáveis
            </label>
          </Sec>

          <Sec color="orange" icon="📏" title="COLO UTERINO">
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.coloOk}
                onChange={(e) => set({ coloOk: e.target.checked })}
              />
              Colo uterino e canal endocervical sem anormalidades demonstráveis
            </label>
          </Sec>
        </>
      ) : null}

      {is23 ? (
        <>
          <Sec color="teal" icon="👶" title="FETO — SITUAÇÃO / VITALIDADE">
            <Row label="Situação">
              <select
                disabled={disabled}
                value={form.situacao}
                onChange={(e) => set({ situacao: e.target.value })}
              >
                <option value="longitudinal">longitudinal</option>
                <option value="transversa">transversa</option>
                <option value="oblíqua">oblíqua</option>
              </select>
              <select
                disabled={disabled}
                value={form.apresentacao}
                onChange={(e) => set({ apresentacao: e.target.value })}
              >
                <option value="cefálica">cefálica</option>
                <option value="pélvica">pélvica</option>
                <option value="córmica">córmica</option>
              </select>
              <select
                disabled={disabled}
                value={form.dorso}
                onChange={(e) => set({ dorso: e.target.value })}
              >
                <option value="esquerda">dorso E</option>
                <option value="direita">dorso D</option>
                <option value="anterior">dorso anterior</option>
                <option value="posterior">dorso posterior</option>
              </select>
            </Row>
            <Row label="BCF">
              <input
                className="obs-lus-num"
                disabled={disabled}
                placeholder="bpm"
                value={form.bcfBpm}
                onChange={(e) => set({ bcfBpm: e.target.value })}
              />
              <span className="obs-lus-un">bpm</span>
            </Row>
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.movPresentes}
                onChange={(e) => set({ movPresentes: e.target.checked })}
              />
              Movimentos corpóreos presentes
            </label>
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.cordTresVasos}
                onChange={(e) => set({ cordTresVasos: e.target.checked })}
              />
              Cordão com três vasos (2 artérias + 1 veia)
            </label>
          </Sec>

          <Sec color="blue" icon="📊" title="BIOMETRIA FETAL">
            <table className="obs-lus-btable">
              <thead>
                <tr>
                  <th>Parâmetro</th>
                  <th>Medida</th>
                  <th>IG estimada</th>
                  <th>Percentil</th>
                  <th>Inc.</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    {
                      key: "dbp" as const,
                      incKey: "incDbp" as const,
                      lab: "DBP",
                      val: form.dbp,
                      inc: form.incDbp,
                      fn: igSemanasPorDbp,
                    },
                    {
                      key: "cc" as const,
                      incKey: "incCc" as const,
                      lab: "CC",
                      val: form.cc,
                      inc: form.incCc,
                      fn: igSemanasPorCc,
                    },
                    {
                      key: "ca" as const,
                      incKey: "incCa" as const,
                      lab: "CA",
                      val: form.ca,
                      inc: form.incCa,
                      fn: igSemanasPorCa,
                    },
                    {
                      key: "cf" as const,
                      incKey: "incCf" as const,
                      lab: "CF",
                      val: form.cf,
                      inc: form.incCf,
                      fn: igSemanasPorCf,
                    },
                  ] as const
                ).map((row) => (
                  <tr key={row.key}>
                    <td>
                      <b>{row.lab}</b>
                    </td>
                    <td>
                      <input
                        className="obs-lus-num"
                        disabled={disabled}
                        placeholder={`${row.lab} mm`}
                        value={row.val}
                        onChange={(e) => set({ [row.key]: e.target.value })}
                      />{" "}
                      mm
                    </td>
                    <td className="ig-c">
                      {fmtIgSemanas(row.fn(parseFloat(row.val)))}
                    </td>
                    <td className="pc-c">—</td>
                    <td>
                      <input
                        type="checkbox"
                        disabled={disabled}
                        checked={row.inc}
                        onChange={(e) =>
                          set({ [row.incKey]: e.target.checked })
                        }
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <b>DOF</b>
                  </td>
                  <td>
                    <input
                      className="obs-lus-num"
                      disabled={disabled}
                      placeholder="mm"
                      value={form.dof}
                      onChange={(e) => set({ dof: e.target.value })}
                    />{" "}
                    mm
                  </td>
                  <td className="ig-c">—</td>
                  <td className="pc-c">—</td>
                  <td>
                    <input
                      type="checkbox"
                      disabled={disabled}
                      checked={form.incDof}
                      onChange={(e) => set({ incDof: e.target.checked })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="obs-lus-bio-cards">
              <div className="obs-lus-card">
                <span>Peso (Hadlock III)</span>
                <strong>{peso ? `${peso} g` : "—"}</strong>
                <small>ref.: exige CA e CF</small>
              </div>
              <div className="obs-lus-card">
                <span>Índices (ref.)</span>
                <div className="obs-lus-idx">
                  <span>IC (DBP/DOF×100): {idx.ic} <em>ref 70–86</em></span>
                  <span>CC/CA: {idx.ccca} <em>ref 0,90–1,23</em></span>
                  <span>CF/CA: {idx.cfca} <em>0,20–0,24</em></span>
                  <span>CF/DBP: {idx.cfdbp}</span>
                  <span>CF/CC: {idx.cfcc}</span>
                </div>
              </div>
            </div>
          </Sec>

          {tipo === "23m" ? (
            <Sec color="purple" icon="🔬" title="MORFOLOGIA FETAL">
              <div className="obs-lus-mm-grid">
                {MM_KEYS_2T.map(([k, lab]) => (
                  <label key={k} className="obs-lus-check">
                    <input
                      type="checkbox"
                      disabled={disabled}
                      checked={!!form.mm[k]}
                      onChange={(e) => setMm(k, e.target.checked)}
                    />
                    {lab}
                  </label>
                ))}
              </div>
            </Sec>
          ) : null}

          <Sec color="orange" icon="🟣" title="PLACENTA / LÍQUIDO">
            <Row label="Inserção">
              <select
                disabled={disabled}
                value={form.placentaInsercao}
                onChange={(e) => set({ placentaInsercao: e.target.value })}
              >
                <option>corporal posterior</option>
                <option>corporal anterior</option>
                <option>fúndica</option>
                <option>lateral direita</option>
                <option>lateral esquerda</option>
              </select>
              <span>Grau</span>
              <select
                disabled={disabled}
                value={form.placentaGrau}
                onChange={(e) => set({ placentaGrau: e.target.value })}
              >
                <option>0</option>
                <option>I</option>
                <option>II</option>
                <option>III</option>
              </select>
            </Row>
            <label className="obs-lus-check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.liquidoNormal}
                onChange={(e) => set({ liquidoNormal: e.target.checked })}
              />
              Volume normal de líquido amniótico
            </label>
            {!form.liquidoNormal ? (
              <input
                className="obs-lus-inline wide"
                disabled={disabled}
                placeholder="Descrever líquido amniótico..."
                value={form.liquidoTxt}
                onChange={(e) => set({ liquidoTxt: e.target.value })}
              />
            ) : null}
          </Sec>

          {(tipo === "23dop" || form.dopplerInc) && (
            <Sec color="blue" icon="📡" title="DOPPLER OBSTÉTRICO">
              <label className="obs-lus-check">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={form.dopplerInc}
                  onChange={(e) => set({ dopplerInc: e.target.checked })}
                />
                Incluir avaliação Doppler
              </label>
              <Row label="AU — I.P.">
                <input
                  className="obs-lus-num"
                  disabled={disabled}
                  value={form.auIp}
                  onChange={(e) => set({ auIp: e.target.value })}
                />
              </Row>
              <Row label="ACM — I.P.">
                <input
                  className="obs-lus-num"
                  disabled={disabled}
                  value={form.acmIp}
                  onChange={(e) => set({ acmIp: e.target.value })}
                />
              </Row>
            </Sec>
          )}

          {tipo === "23" ? (
            <label className="obs-lus-check obs-lus-dop-toggle">
              <input
                type="checkbox"
                disabled={disabled}
                checked={form.dopplerInc}
                onChange={(e) => set({ dopplerInc: e.target.checked })}
              />
              Incluir avaliação Doppler
            </label>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
