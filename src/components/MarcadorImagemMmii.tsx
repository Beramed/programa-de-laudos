"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import LupaAmpliar, { IconeLupa } from "@/components/LupaAmpliar";

type Props = {
  valor: string;
  onChange: (dataUrl: string) => void;
  disabled?: boolean;
  /** Incrementar para forçar captura do canvas (ex.: ao marcar anexar). */
  capturaToken?: number;
};

type Ferramenta = "lapis" | "linha" | "borracha";

type SimboloDef = {
  id: string;
  label: string;
  src: string;
};

const CANVAS_W = 920;
const CANVAS_H = 1100;
const MAPA_SRC = "/mmii-mapa/mapa-base.png";

const CORES_LINHA = [
  { id: "vermelho", hex: "#c62828", label: "Vermelho" },
  { id: "azul", hex: "#1565c0", label: "Azul" },
  { id: "preto", hex: "#212121", label: "Preto" },
  { id: "verde", hex: "#2e7d32", label: "Verde" },
  { id: "roxo", hex: "#6a1b9a", label: "Roxo" },
  { id: "laranja", hex: "#ef6c00", label: "Laranja" },
] as const;

/** Imagens = traço contínuo (figuras paralelas juntas). */
const SIMBOLOS: SimboloDef[] = [
  {
    id: "azul",
    label: "Bolinha + ovoide reto (azul)",
    src: "/mmii-mapa/simbolos-azul.png",
  },
  {
    id: "vermelho",
    label: "Traço reto + ondulado (vermelho)",
    src: "/mmii-mapa/simbolos-vermelho.png",
  },
  {
    id: "preto-golfo",
    label: "Bolinha + ovoide ondulado",
    src: "/mmii-mapa/simbolos-preto-golfo.png",
  },
  {
    id: "parede",
    label: "Parede espessada (paralelas)",
    src: "/mmii-mapa/simbolo-parede.png",
  },
  {
    id: "sinequias",
    label: "Sinéquias (X)",
    src: "/mmii-mapa/simbolo-sinequias.png",
  },
];

/** Torna fundo transparente, corta margens e estende tinta até as bordas
 *  laterais — na junta, o fim de um bloco encontra o início do próximo. */
function prepararBlocoLapis(
  img: HTMLImageElement,
  alturaMax: number,
): HTMLCanvasElement {
  const tmp = document.createElement("canvas");
  tmp.width = img.width;
  tmp.height = img.height;
  const tg = tmp.getContext("2d")!;
  tg.drawImage(img, 0, 0);
  const data = tg.getImageData(0, 0, tmp.width, tmp.height);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    if (r > 210 && g > 210 && b > 210) {
      px[i + 3] = 0;
      continue;
    }
    if (px[i + 3] > 40 && r < 100 && g < 100 && b < 100) {
      px[i + 3] = 255;
    }
  }
  tg.putImageData(data, 0, 0);

  let minX = tmp.width;
  let minY = tmp.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < tmp.height; y++) {
    for (let x = 0; x < tmp.width; x++) {
      const a = px[(y * tmp.width + x) * 4 + 3];
      if (a > 40) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX) {
    minX = 0;
    minY = 0;
    maxX = tmp.width - 1;
    maxY = tmp.height - 1;
  }

  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const cropped = document.createElement("canvas");
  cropped.width = cw;
  cropped.height = ch;
  const cg = cropped.getContext("2d")!;
  cg.drawImage(tmp, minX, minY, cw, ch, 0, 0, cw, ch);

  const cd = cg.getImageData(0, 0, cw, ch);
  const cp = cd.data;
  for (let y = 0; y < ch; y++) {
    let x0 = cw;
    let x1 = -1;
    let sr = 0;
    let sg = 0;
    let sb = 0;
    for (let x = 0; x < cw; x++) {
      const i = (y * cw + x) * 4;
      if (cp[i + 3] > 40 && cp[i] < 120) {
        if (x < x0) {
          x0 = x;
          sr = cp[i];
          sg = cp[i + 1];
          sb = cp[i + 2];
        }
        if (x > x1) x1 = x;
      }
    }
    const span = x1 - x0 + 1;
    if (x1 >= x0 && span >= cw * 0.35) {
      for (let x = 0; x < cw; x++) {
        const i = (y * cw + x) * 4;
        cp[i] = sr;
        cp[i + 1] = sg;
        cp[i + 2] = sb;
        cp[i + 3] = 255;
      }
    }
  }
  cg.putImageData(cd, 0, 0);

  const h = Math.max(8, Math.round(alturaMax));
  const w = Math.max(8, Math.round(h * (cw / Math.max(1, ch))));
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const og = out.getContext("2d")!;
  og.imageSmoothingEnabled = false;
  og.drawImage(cropped, 0, 0, w, h);
  return out;
}

export default function MarcadorImagemMmii({
  valor,
  onChange,
  disabled,
  capturaToken = 0,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const desenhoRef = useRef(false);
  const ultimoPontoRef = useRef<{ x: number; y: number } | null>(null);
  const offsetNoBlocoRef = useRef(0);
  const ondaFaseRef = useRef(0);
  const sinequiaFaseRef = useRef(0);
  const historicoRef = useRef<ImageData[]>([]);
  const baseRef = useRef<HTMLImageElement | null>(null);
  const simbolosImgRef = useRef<Record<string, HTMLImageElement>>({});
  const blocoRef = useRef<HTMLCanvasElement | null>(null);

  const [simboloId, setSimboloId] = useState(SIMBOLOS[0].id);
  const [ferramenta, setFerramenta] = useState<Ferramenta>("lapis");
  const [pronto, setPronto] = useState(false);
  const [espessura, setEspessura] = useState(36);
  const [espessuraLinha, setEspessuraLinha] = useState(6);
  const [corLinha, setCorLinha] = useState("#c62828");
  const [tamanhoBorracha, setTamanhoBorracha] = useState(28);
  const [lupaSrc, setLupaSrc] = useState<string | null>(null);

  function desenharBase(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    const base = baseRef.current;
    if (!base) return;
    const scale = Math.min(CANVAS_W / base.width, CANVAS_H / base.height);
    const dw = base.width * scale;
    const dh = base.height * scale;
    ctx.drawImage(base, (CANVAS_W - dw) / 2, (CANVAS_H - dh) / 2, dw, dh);
  }

  function renovarBloco() {
    if (ferramenta !== "lapis") {
      blocoRef.current = null;
      return;
    }
    const img = simbolosImgRef.current[simboloId];
    if (!img) {
      blocoRef.current = null;
      return;
    }
    blocoRef.current = prepararBlocoLapis(img, espessura);
  }

  function snapshot() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    historicoRef.current.push(
      ctx.getImageData(0, 0, canvas.width, canvas.height),
    );
    if (historicoRef.current.length > 40) historicoRef.current.shift();
  }

  function emitir() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL("image/png"));
  }

  function desenharFatia(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angulo: number,
    sx: number,
    sw: number,
  ) {
    const bloco = blocoRef.current;
    if (!bloco || sw <= 0.5) return;
    const h = bloco.height;
    // 1px de emenda só para fechar fresta de anti-alias na junta
    const sx2 = Math.max(0, sx);
    const sw2 = Math.min(bloco.width - sx2, sw + 1);
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.translate(x, y);
    ctx.rotate(angulo);
    ctx.drawImage(bloco, sx2, 0, sw2, h, 0, -h / 2, sw2, h);
    ctx.restore();
  }

  function strokeLinha(
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) {
    ctx.save();
    ctx.strokeStyle = corLinha;
    ctx.lineWidth = espessuraLinha;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  }

  /**
   * Parede espessada: duas linhas paralelas 100% contínuas.
   * Não altera a distância entre as paralelas — só remove os vãos ao longo do traço.
   */
  function strokeParedeParalelas(
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    const angulo = dist < 0.01 ? 0 : Math.atan2(dy, dx);
    const nx = -Math.sin(angulo);
    const ny = Math.cos(angulo);
    // metade da distância entre os eixos das duas paralelas (mantém o espaçamento)
    const meio = Math.max(4, espessura * 0.22);
    const lw = Math.max(2.5, espessura * 0.2);
    ctx.save();
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const s of [-1, 1] as const) {
      const ox = nx * meio * s;
      const oy = ny * meio * s;
      ctx.beginPath();
      ctx.moveTo(from.x + ox, from.y + oy);
      if (dist < 0.01) {
        ctx.lineTo(from.x + ox + 0.01, from.y + oy);
      } else {
        ctx.lineTo(to.x + ox, to.y + oy);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  /**
   * Vermelho: traço reto + ondulado contínuos (sem espaços).
   * Mantém a distância entre as duas paralelas; só fecha os vãos ao longo do traço.
   */
  function strokeVermelhoRetoOndulado(
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    const angulo = dist < 0.01 ? 0 : Math.atan2(dy, dx);
    const nx = -Math.sin(angulo);
    const ny = Math.cos(angulo);
    const meio = Math.max(5, espessura * 0.28);
    const lw = Math.max(2.2, espessura * 0.16);
    const amp = Math.max(2.5, espessura * 0.16);
    const wavelength = Math.max(14, espessura * 0.85);

    ctx.save();
    ctx.strokeStyle = "#c62828";
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Linha contínua (paralela superior)
    const oxR = nx * -meio;
    const oyR = ny * -meio;
    ctx.beginPath();
    ctx.moveTo(from.x + oxR, from.y + oyR);
    if (dist < 0.01) {
      ctx.lineTo(from.x + oxR + 0.01, from.y + oyR);
    } else {
      ctx.lineTo(to.x + oxR, to.y + oyR);
    }
    ctx.stroke();

    // Linha ondulada contínua (paralela inferior)
    const fase0 = ondaFaseRef.current;
    const len = Math.max(dist, 0.01);
    const steps = Math.max(2, Math.ceil(len / 1.5));
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = from.x + dx * t;
      const py = from.y + dy * t;
      const along = fase0 + len * t;
      const wave = Math.sin((along / wavelength) * Math.PI * 2) * amp;
      const ox = nx * (meio + wave);
      const oy = ny * (meio + wave);
      if (i === 0) ctx.moveTo(px + ox, py + oy);
      else ctx.lineTo(px + ox, py + oy);
    }
    ctx.stroke();
    ctx.restore();

    if (dist >= 0.01) ondaFaseRef.current = fase0 + dist;
  }

  /**
   * Sinéquias: duas paralelas com X contínuos no meio (como o símbolo).
   */
  function strokeSinequias(
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    const angulo = dist < 0.01 ? 0 : Math.atan2(dy, dx);
    const ux = Math.cos(angulo);
    const uy = Math.sin(angulo);
    const nx = -uy;
    const ny = ux;
    const meio = Math.max(6, espessura * 0.34);
    const lw = Math.max(2, espessura * 0.13);
    const passo = Math.max(10, meio * 1.85);

    ctx.save();
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const s of [-1, 1] as const) {
      const ox = nx * meio * s;
      const oy = ny * meio * s;
      ctx.beginPath();
      ctx.moveTo(from.x + ox, from.y + oy);
      if (dist < 0.01) {
        ctx.lineTo(from.x + ox + 0.01, from.y + oy);
      } else {
        ctx.lineTo(to.x + ox, to.y + oy);
      }
      ctx.stroke();
    }

    if (dist >= 0.01) {
      const fase0 = sinequiaFaseRef.current;
      const half = passo / 2;
      // um X por “célula”, desenhado só quando o centro entra neste segmento
      let alongAbs = Math.floor(fase0 / passo) * passo + half;
      if (alongAbs < fase0) alongAbs += passo;
      for (; alongAbs < fase0 + dist; alongAbs += passo) {
        const d = alongAbs - fase0;
        const px = from.x + ux * d;
        const py = from.y + uy * d;
        const tlx = px - ux * half + nx * meio;
        const tly = py - uy * half + ny * meio;
        const brx = px + ux * half - nx * meio;
        const bry = py + uy * half - ny * meio;
        const blx = px - ux * half - nx * meio;
        const bly = py - uy * half - ny * meio;
        const trx = px + ux * half + nx * meio;
        const tryY = py + uy * half + ny * meio;
        ctx.beginPath();
        ctx.moveTo(tlx, tly);
        ctx.lineTo(brx, bry);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(blx, bly);
        ctx.lineTo(trx, tryY);
        ctx.stroke();
      }
      sinequiaFaseRef.current = fase0 + dist;
    }
    ctx.restore();
  }

  useEffect(() => {
    let cancelado = false;
    const base = new Image();
    base.onload = () => {
      if (cancelado) return;
      baseRef.current = base;
      void Promise.all(
        SIMBOLOS.map(
          (s) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => {
                simbolosImgRef.current[s.id] = img;
                resolve();
              };
              img.onerror = () => resolve();
              img.src = s.src;
            }),
        ),
      ).then(() => {
        if (cancelado) return;
        renovarBloco();
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        if (valor) {
          const salva = new Image();
          salva.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(salva, 0, 0, canvas.width, canvas.height);
            setPronto(true);
            onChange(canvas.toDataURL("image/png"));
          };
          salva.onerror = () => {
            desenharBase(ctx);
            setPronto(true);
            onChange(canvas.toDataURL("image/png"));
          };
          salva.src = valor;
        } else {
          desenharBase(ctx);
          setPronto(true);
          onChange(canvas.toDataURL("image/png"));
        }
      });
    };
    base.src = MAPA_SRC;
    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pronto) return;
    renovarBloco();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simboloId, espessura, ferramenta, pronto]);

  useEffect(() => {
    if (!pronto || !capturaToken) return;
    emitir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturaToken, pronto]);

  function pos(ev: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const r = canvas.getBoundingClientRect();
    return {
      x: ((ev.clientX - r.left) / r.width) * canvas.width,
      y: ((ev.clientY - r.top) / r.height) * canvas.height,
    };
  }

  /**
   * Linha contínua: fatias da imagem coladas ponta a ponta.
   * Onde uma termina, a próxima começa imediatamente (sem gap e sem sobrepor).
   */
  function pintarContinuo(
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) {
    const bloco = blocoRef.current;
    if (!bloco) return;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let restante = Math.hypot(dx, dy);
    if (restante < 0.1) return;

    const angulo = Math.atan2(dy, dx);
    const ux = dx / restante;
    const uy = dy / restante;
    let x = from.x;
    let y = from.y;
    let offset = offsetNoBlocoRef.current;
    const bw = bloco.width;

    while (restante > 0.1) {
      const cabem = bw - offset;
      const sw = Math.min(cabem, restante);
      desenharFatia(ctx, x, y, angulo, offset, sw);
      x += ux * sw;
      y += uy * sw;
      restante -= sw;
      offset += sw;
      if (offset >= bw - 0.001) offset = 0;
    }
    offsetNoBlocoRef.current = offset;
  }

  function onDown(ev: PointerEvent<HTMLCanvasElement>) {
    if (disabled || !pronto) return;
    ev.currentTarget.setPointerCapture(ev.pointerId);
    snapshot();
    desenhoRef.current = true;
    const p = pos(ev);
    ultimoPontoRef.current = p;
    offsetNoBlocoRef.current = 0;
    ondaFaseRef.current = 0;
    sinequiaFaseRef.current = 0;
    const ctx = canvasRef.current!.getContext("2d")!;

    if (ferramenta === "borracha") {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(p.x, p.y, tamanhoBorracha / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (ferramenta === "linha") {
      strokeLinha(ctx, p, p);
      return;
    }

    if (simboloId === "parede") {
      strokeParedeParalelas(ctx, p, p);
      return;
    }

    if (simboloId === "vermelho") {
      strokeVermelhoRetoOndulado(ctx, p, p);
      return;
    }

    if (simboloId === "sinequias") {
      strokeSinequias(ctx, p, p);
      return;
    }

    const bloco = blocoRef.current;
    if (bloco) {
      desenharFatia(ctx, p.x, p.y, 0, 0, Math.min(2, bloco.width));
      offsetNoBlocoRef.current = Math.min(2, bloco.width);
    }
  }

  function onMove(ev: PointerEvent<HTMLCanvasElement>) {
    if (!desenhoRef.current || disabled) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(ev);
    const prev = ultimoPontoRef.current;
    if (!prev) {
      ultimoPontoRef.current = p;
      return;
    }
    const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
    if (dist < 0.25) return;

    if (ferramenta === "borracha") {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = tamanhoBorracha;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.restore();
      ultimoPontoRef.current = p;
      return;
    }

    if (ferramenta === "linha") {
      strokeLinha(ctx, prev, p);
      ultimoPontoRef.current = p;
      return;
    }

    if (simboloId === "parede") {
      strokeParedeParalelas(ctx, prev, p);
      ultimoPontoRef.current = p;
      return;
    }

    if (simboloId === "vermelho") {
      strokeVermelhoRetoOndulado(ctx, prev, p);
      ultimoPontoRef.current = p;
      return;
    }

    if (simboloId === "sinequias") {
      strokeSinequias(ctx, prev, p);
      ultimoPontoRef.current = p;
      return;
    }

    pintarContinuo(ctx, prev, p);
    ultimoPontoRef.current = p;
  }

  function onUp() {
    if (!desenhoRef.current) return;
    desenhoRef.current = false;
    ultimoPontoRef.current = null;
    offsetNoBlocoRef.current = 0;
    ondaFaseRef.current = 0;
    sinequiaFaseRef.current = 0;
    emitir();
  }

  function desfazer() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const prev = historicoRef.current.pop();
    if (!prev) {
      desenharBase(ctx);
      emitir();
      return;
    }
    ctx.putImageData(prev, 0, 0);
    emitir();
  }

  function limpar() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    snapshot();
    desenharBase(ctx);
    emitir();
  }

  const linhaAtiva = ferramenta === "linha";

  return (
    <div className="mmii-marcador">
      <div
        className="mmii-simbolos-paleta"
        role="listbox"
        aria-label="Traços de caneta"
      >
        {SIMBOLOS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="option"
            aria-selected={ferramenta === "lapis" && simboloId === s.id}
            className={`mmii-simbolo-btn${
              ferramenta === "lapis" && simboloId === s.id ? " on" : ""
            }`}
            disabled={disabled}
            title={s.label}
            onClick={() => {
              setFerramenta("lapis");
              setSimboloId(s.id);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.label} />
            <span>{s.label}</span>
          </button>
        ))}

        <button
          type="button"
          role="option"
          aria-selected={linhaAtiva}
          className={`mmii-simbolo-btn${linhaAtiva ? " on" : ""}`}
          disabled={disabled}
          title="Linha reta contínua"
          onClick={() => setFerramenta("linha")}
        >
          <span
            className="mmii-linha-preview"
            style={{ background: corLinha }}
            aria-hidden
          />
          <span>Linha reta</span>
        </button>
      </div>

      <div className="mmii-marcador-toolbar">
        {linhaAtiva ? (
          <>
            <label>
              Espessura
              <input
                type="range"
                min={2}
                max={20}
                value={espessuraLinha}
                disabled={disabled}
                onChange={(e) => setEspessuraLinha(Number(e.target.value))}
              />
            </label>
            <div className="mmii-cores-linha" role="group" aria-label="Cor da linha">
              {CORES_LINHA.map((c) => (
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
          </>
        ) : (
          <label>
            Espessura
            <input
              type="range"
              min={18}
              max={72}
              value={espessura}
              disabled={disabled || ferramenta === "borracha"}
              onChange={(e) => setEspessura(Number(e.target.value))}
            />
          </label>
        )}
        <button
          type="button"
          className={`btn small ${ferramenta === "borracha" ? "primary" : "ghost"}`}
          disabled={disabled}
          onClick={() => setFerramenta("borracha")}
        >
          Borracha
        </button>
        {ferramenta === "borracha" ? (
          <label>
            Tamanho
            <input
              type="range"
              min={12}
              max={64}
              value={tamanhoBorracha}
              disabled={disabled}
              onChange={(e) => setTamanhoBorracha(Number(e.target.value))}
            />
          </label>
        ) : null}
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

      <div className="mmii-marcador-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="mmii-marcador-canvas mmii-marcador-canvas-wide"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
        />
        <button
          type="button"
          className="laudo-lupa-btn mmii-lupa-btn"
          disabled={!pronto}
          aria-label="Ampliar cartografia"
          title="Ampliar cartografia"
          onClick={() => {
            const c = canvasRef.current;
            if (!c) return;
            setLupaSrc(c.toDataURL("image/png"));
          }}
        >
          <IconeLupa />
        </button>
      </div>
      <LupaAmpliar src={lupaSrc} alt="Cartografia ampliada" onClose={() => setLupaSrc(null)} />
    </div>
  );
}
