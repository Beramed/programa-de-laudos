"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

type Props = {
  valor: string;
  onChange: (dataUrl: string) => void;
  disabled?: boolean;
};

type Ferramenta = "caneta" | "borracha";

/**
 * Editor simples: desenha sobre silhueta esquemática do membro inferior.
 */
export default function MarcadorImagemMmii({
  valor,
  onChange,
  disabled,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const desenhoRef = useRef(false);
  const [cor, setCor] = useState("#c62828");
  const [espessura, setEspessura] = useState(3);
  const [ferramenta, setFerramenta] = useState<Ferramenta>("caneta");
  const historicoRef = useRef<ImageData[]>([]);

  function desenharBase(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.fillStyle = "#f7faf7";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#6a8f6a";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#e8f2e8";

    // coxa
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.22, w * 0.16, h * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // joelho
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.42, w * 0.11, h * 0.07, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // perna
    ctx.beginPath();
    ctx.moveTo(w * 0.4, h * 0.45);
    ctx.lineTo(w * 0.38, h * 0.78);
    ctx.lineTo(w * 0.62, h * 0.78);
    ctx.lineTo(w * 0.6, h * 0.45);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // pé
    ctx.beginPath();
    ctx.ellipse(w * 0.52, h * 0.88, w * 0.18, h * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // eixo venoso esquemático
    ctx.strokeStyle = "#2a6bb5";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.08);
    ctx.lineTo(w * 0.5, h * 0.85);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#456";
    ctx.font = "11px sans-serif";
    ctx.fillText("Coxa", w * 0.68, h * 0.22);
    ctx.fillText("Perna", w * 0.68, h * 0.6);
    ctx.fillText("Pé", w * 0.72, h * 0.88);
  }

  function snapshot() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    historicoRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (historicoRef.current.length > 30) historicoRef.current.shift();
  }

  function emitir() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL("image/png"));
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    if (valor) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
      };
      img.src = valor;
    } else {
      desenharBase(ctx, w, h);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pos(ev: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const r = canvas.getBoundingClientRect();
    return {
      x: ((ev.clientX - r.left) / r.width) * canvas.width,
      y: ((ev.clientY - r.top) / r.height) * canvas.height,
    };
  }

  function onDown(ev: PointerEvent<HTMLCanvasElement>) {
    if (disabled) return;
    ev.currentTarget.setPointerCapture(ev.pointerId);
    snapshot();
    desenhoRef.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(ev);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = espessura;
    if (ferramenta === "borracha") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = espessura * 3;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = cor;
    }
  }

  function onMove(ev: PointerEvent<HTMLCanvasElement>) {
    if (!desenhoRef.current || disabled) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(ev);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function onUp() {
    if (!desenhoRef.current) return;
    desenhoRef.current = false;
    const ctx = canvasRef.current!.getContext("2d");
    if (ctx) ctx.globalCompositeOperation = "source-over";
    emitir();
  }

  function desfazer() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const prev = historicoRef.current.pop();
    if (!prev) {
      desenharBase(ctx, canvas.width, canvas.height);
      onChange("");
      return;
    }
    ctx.putImageData(prev, 0, 0);
    emitir();
  }

  function limpar() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    snapshot();
    desenharBase(ctx, canvas.width, canvas.height);
    onChange("");
  }

  return (
    <div className="mmii-marcador">
      <div className="mmii-marcador-toolbar">
        <label>
          Cor
          <input
            type="color"
            value={cor}
            disabled={disabled}
            onChange={(e) => setCor(e.target.value)}
          />
        </label>
        <label>
          Traço
          <input
            type="range"
            min={1}
            max={12}
            value={espessura}
            disabled={disabled}
            onChange={(e) => setEspessura(Number(e.target.value))}
          />
        </label>
        <button
          type="button"
          className={`btn small ${ferramenta === "caneta" ? "primary" : "ghost"}`}
          disabled={disabled}
          onClick={() => setFerramenta("caneta")}
        >
          Caneta
        </button>
        <button
          type="button"
          className={`btn small ${ferramenta === "borracha" ? "primary" : "ghost"}`}
          disabled={disabled}
          onClick={() => setFerramenta("borracha")}
        >
          Borracha
        </button>
        <button
          type="button"
          className="btn ghost small"
          disabled={disabled}
          onClick={desfazer}
        >
          Desfazer
        </button>
        <button
          type="button"
          className="btn ghost small"
          disabled={disabled}
          onClick={limpar}
        >
          Limpar
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={280}
        height={420}
        className="mmii-marcador-canvas"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      />
      <p className="hint">
        Marque no esquema o trajeto/insuficiência, perfurantes ou trombose.
      </p>
    </div>
  );
}
