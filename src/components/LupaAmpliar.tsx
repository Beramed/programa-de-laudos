"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

type Props = {
  src: string | null;
  alt?: string;
  onClose: () => void;
};

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 10;
const ZOOM_STEP = 1.25;

export function IconeLupa({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15.5 15.5L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Overlay com zoom e pan para ler cartografia / tabelas. */
export default function LupaAmpliar({ src, alt = "Ampliação", onClose }: Props) {
  const [scale, setScale] = useState(2);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const arrastandoRef = useRef<{
    id: number;
    x: number;
    y: number;
    tx: number;
    ty: number;
  } | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!src) return;
    setScale(2);
    setTx(0);
    setTy(0);
  }, [src]);

  useEffect(() => {
    if (!src) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setScale((s) => Math.min(ZOOM_MAX, s * ZOOM_STEP));
      }
      if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        setScale((s) => Math.max(ZOOM_MIN, s / ZOOM_STEP));
      }
      if (e.key === "0") {
        e.preventDefault();
        setScale(2);
        setTx(0);
        setTy(0);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [src, onClose]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || !src) return;
    function onWheelNative(e: WheelEvent) {
      e.preventDefault();
      const fator = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      const cx = e.clientX;
      const cy = e.clientY;
      setScale((s) => {
        const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, s * fator));
        if (vp && next !== s) {
          const r = vp.getBoundingClientRect();
          const px = cx - r.left - r.width / 2;
          const py = cy - r.top - r.height / 2;
          const k = next / s;
          setTx((t) => px - (px - t) * k);
          setTy((t) => py - (py - t) * k);
        }
        return next;
      });
    }
    vp.addEventListener("wheel", onWheelNative, { passive: false });
    return () => vp.removeEventListener("wheel", onWheelNative);
  }, [src]);

  if (!src) return null;

  function zoomEm(fator: number, cx?: number, cy?: number) {
    setScale((s) => {
      const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, s * fator));
      const vp = viewportRef.current;
      if (vp && cx != null && cy != null && next !== s) {
        const r = vp.getBoundingClientRect();
        const px = cx - r.left - r.width / 2;
        const py = cy - r.top - r.height / 2;
        const k = next / s;
        setTx((t) => px - (px - t) * k);
        setTy((t) => py - (py - t) * k);
      }
      return next;
    });
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    arrastandoRef.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      tx,
      ty,
    };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = arrastandoRef.current;
    if (!d || d.id !== e.pointerId) return;
    setTx(d.tx + (e.clientX - d.x));
    setTy(d.ty + (e.clientY - d.y));
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    if (arrastandoRef.current?.id === e.pointerId) {
      arrastandoRef.current = null;
    }
  }

  return (
    <div
      className="lupa-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Ampliar imagem para leitura"
      onClick={onClose}
    >
      <div
        className="lupa-toolbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lupa-toolbar-btn"
          onClick={() => zoomEm(1 / ZOOM_STEP)}
          aria-label="Diminuir zoom"
          title="Diminuir (−)"
        >
          −
        </button>
        <span className="lupa-toolbar-pct" aria-live="polite">
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          className="lupa-toolbar-btn"
          onClick={() => zoomEm(ZOOM_STEP)}
          aria-label="Aumentar zoom"
          title="Aumentar (+)"
        >
          +
        </button>
        <button
          type="button"
          className="lupa-toolbar-btn"
          onClick={() => {
            setScale(2);
            setTx(0);
            setTy(0);
          }}
          aria-label="Resetar zoom"
          title="Resetar (0)"
        >
          100%
        </button>
        <button
          type="button"
          className="lupa-toolbar-btn lupa-toolbar-fechar"
          onClick={onClose}
          aria-label="Fechar"
        >
          Fechar
        </button>
      </div>

      <div
        ref={viewportRef}
        className="lupa-viewport"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="lupa-overlay-img"
          draggable={false}
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          }}
        />
      </div>

      <p className="lupa-hint" onClick={(e) => e.stopPropagation()}>
        Scroll para zoom · arraste para mover · +/− no teclado
      </p>
    </div>
  );
}
