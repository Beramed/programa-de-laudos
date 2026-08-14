"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { LadoArticulacao } from "@/lib/ladoMsk";
import {
  CORES_LINHA_MMSS,
  camposPosMmss,
  cartografiaMmssVazia,
  desenharLinhasMmss,
  mapaMmssDims,
  mapaMmssSrc,
  setValorCampo,
  valorCampo,
  type MmssCartografiaState,
  type MmssLinhaStroke,
} from "@/lib/mmssCartografia";

type Props = {
  lado: LadoArticulacao;
  valor: MmssCartografiaState;
  onChange: (v: MmssCartografiaState) => void;
  disabled?: boolean;
};

type Modo = "medida" | "linha";

async function renderMapaPng(
  next: MmssCartografiaState,
  lado: LadoArticulacao,
): Promise<string> {
  const src = mapaMmssSrc(lado);
  const { w, h } = mapaMmssDims(lado);
  const camposPos = camposPosMmss(lado);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Falha ao carregar mapa MMSS"));
    el.src = src;
  });

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(img, 0, 0, w, h);
  desenharLinhasMmss(ctx, next.linhas);

  ctx.font = "600 14px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const pos of camposPos) {
    const x = (pos.left / 100) * w;
    const y = (pos.top / 100) * h;
    const bw = (pos.width / 100) * w;
    const bh = (pos.height / 100) * h;
    const texto = valorCampo(next.campos, pos.id);
    if (!texto) continue;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + 2, y + 2, bw - 4, bh - 4);
    ctx.fillStyle = "#111";
    ctx.fillText(texto, x + bw / 2, y + bh / 2 + 0.5);
  }

  return canvas.toDataURL("image/png");
}

export default function CartografiaMmssVenoso({
  lado,
  valor,
  onChange,
  disabled,
}: Props) {
  const state = valor ?? cartografiaMmssVazia();
  const [pronto, setPronto] = useState(false);
  const [modo, setModo] = useState<Modo>("medida");
  const [corLinha, setCorLinha] = useState<string>(CORES_LINHA_MMSS[0].hex);
  const [espessuraLinha, setEspessuraLinha] = useState(5);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const desenhandoRef = useRef(false);
  const strokeAtualRef = useRef<MmssLinhaStroke | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const { w: mapaW, h: mapaH } = mapaMmssDims(lado);
  const mapaSrc = mapaMmssSrc(lado);
  const camposPos = camposPosMmss(lado);

  useEffect(() => {
    setPronto(true);
  }, []);

  function pintarOverlay(linhas: MmssLinhaStroke[]) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharLinhasMmss(ctx, linhas);
  }

  useEffect(() => {
    pintarOverlay(state.linhas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.linhas, pronto, lado]);

  function emitirMapa(next: MmssCartografiaState) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void renderMapaPng(next, lado)
        .then((mapaPng) => {
          const atual = stateRef.current;
          onChange({
            ...atual,
            campos: next.campos,
            linhas: next.linhas,
            anexarCartografia: next.anexarCartografia,
            mapaPng,
          });
        })
        .catch(() => onChange(next));
    }, 280);
  }

  function atualizarCampo(id: string, raw: string) {
    const campos = setValorCampo(state.campos, id, raw);
    const next = { ...state, campos };
    onChange(next);
    emitirMapa(next);
  }

  useEffect(() => {
    if (!pronto) return;
    emitirMapa(stateRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lado, pronto]);

  const linhaAtiva = modo === "linha";

  function posMapa(ev: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const r = canvas.getBoundingClientRect();
    return {
      x: ((ev.clientX - r.left) / r.width) * mapaW,
      y: ((ev.clientY - r.top) / r.height) * mapaH,
    };
  }

  function onPointerDown(ev: PointerEvent<HTMLCanvasElement>) {
    if (disabled || !linhaAtiva) return;
    ev.preventDefault();
    ev.currentTarget.setPointerCapture(ev.pointerId);
    desenhandoRef.current = true;
    const p = posMapa(ev);
    const stroke: MmssLinhaStroke = {
      color: corLinha,
      width: espessuraLinha,
      pts: [p],
    };
    strokeAtualRef.current = stroke;
    pintarOverlay([...state.linhas, stroke]);
  }

  function onPointerMove(ev: PointerEvent<HTMLCanvasElement>) {
    if (!desenhandoRef.current || !strokeAtualRef.current) return;
    const p = posMapa(ev);
    const stroke = strokeAtualRef.current;
    const last = stroke.pts[stroke.pts.length - 1];
    if (Math.hypot(p.x - last.x, p.y - last.y) < 1.2) return;
    stroke.pts.push(p);
    pintarOverlay([...state.linhas, stroke]);
  }

  function onPointerUp() {
    if (!desenhandoRef.current) return;
    desenhandoRef.current = false;
    const stroke = strokeAtualRef.current;
    strokeAtualRef.current = null;
    if (!stroke || stroke.pts.length < 1) return;
    const next = { ...state, linhas: [...state.linhas, stroke] };
    onChange(next);
    emitirMapa(next);
  }

  function desfazerLinha() {
    if (!state.linhas.length) return;
    const next = { ...state, linhas: state.linhas.slice(0, -1) };
    onChange(next);
    emitirMapa(next);
  }

  function limparLinhas() {
    const next = { ...state, linhas: [] };
    onChange(next);
    emitirMapa(next);
  }

  return (
    <div className="mmss-cartografia-painel">
      <div className="mmii-bloco-head">
        <h4>
          Mapeamento pré-fístula{" "}
          {lado === "esquerdo" ? "MSE" : "MSD"}
        </h4>
        <label className="check-row mmii-anexar-cartografia">
          <input
            type="checkbox"
            disabled={disabled}
            checked={state.anexarCartografia}
            onChange={(e) => {
              const on = e.target.checked;
              const next = { ...state, anexarCartografia: on };
              onChange(next);
              if (on) emitirMapa(next);
            }}
          />
          Anexar cartografia no laudo
        </label>
      </div>

      <div className="mmss-cartografia-toolbar">
        <button
          type="button"
          className={`btn small ${modo === "medida" ? "primary" : "ghost"}`}
          disabled={disabled}
          onClick={() => setModo("medida")}
        >
          Medidas
        </button>
        <button
          type="button"
          className={`btn small ${linhaAtiva ? "primary" : "ghost"}`}
          disabled={disabled}
          onClick={() => setModo("linha")}
        >
          Linha colorida
        </button>
        {linhaAtiva ? (
          <>
            <label className="mmss-espessura-linha">
              Espessura
              <input
                type="range"
                min={2}
                max={14}
                value={espessuraLinha}
                disabled={disabled}
                onChange={(e) => setEspessuraLinha(Number(e.target.value))}
              />
            </label>
            <div className="mmii-cores-linha" role="group" aria-label="Cor da linha">
              {CORES_LINHA_MMSS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`mmii-cor-btn${corLinha === c.hex ? " on" : ""}`}
                  style={{ background: c.hex }}
                  title={c.label}
                  aria-label={c.label}
                  disabled={disabled}
                  onClick={() => setCorLinha(c.hex)}
                />
              ))}
              <label className="mmii-cor-custom" title="Cor personalizada">
                <input
                  type="color"
                  value={corLinha}
                  disabled={disabled}
                  onChange={(e) => setCorLinha(e.target.value)}
                  aria-label="Cor personalizada"
                />
              </label>
            </div>
            <button
              type="button"
              className="btn small ghost"
              disabled={disabled || !state.linhas.length}
              onClick={desfazerLinha}
            >
              Desfazer
            </button>
            <button
              type="button"
              className="btn small ghost"
              disabled={disabled || !state.linhas.length}
              onClick={limparLinhas}
            >
              Limpar linhas
            </button>
          </>
        ) : null}
      </div>

      <div
        className="mmss-cartografia-wrap"
        style={{
          maxWidth: mapaW,
          aspectRatio: `${mapaW} / ${mapaH}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mapaSrc}
          alt={
            lado === "esquerdo"
              ? "Mapa venoso MSE pré-fístula"
              : "Mapa venoso MSD pré-fístula"
          }
          className="mmss-cartografia-img"
          draggable={false}
        />
        <canvas
          ref={canvasRef}
          width={mapaW}
          height={mapaH}
          className={`mmss-cartografia-canvas${linhaAtiva ? " desenho" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
        {camposPos.map((pos) => (
          <input
            key={pos.id}
            type="text"
            className="mmss-cartografia-campo"
            maxLength={6}
            disabled={disabled || linhaAtiva}
            value={valorCampo(state.campos, pos.id)}
            onChange={(e) => atualizarCampo(pos.id, e.target.value)}
            aria-label={pos.id}
            style={{
              left: `calc(${pos.left}% + 2px)`,
              top: `calc(${pos.top}% + 1px)`,
              width: `calc(${pos.width}% - 4px)`,
              height: `calc(${pos.height}% - 2px)`,
            }}
          />
        ))}
      </div>
      <p className="hint">
        {linhaAtiva
          ? "Desenhe a linha colorida (fluxo Doppler) sobre o mapa; mude a cor a qualquer momento."
          : "Digite as medidas (mm) dentro das caixas da figura — até 6 caracteres. Use “Linha colorida” para o traço Doppler."}
      </p>
    </div>
  );
}
