"use client";

import { useRef, useState } from "react";
import {
  compactarAssinaturaJpg,
  type TipoAssinatura,
} from "@/lib/auth";

type Props = {
  locaisTrabalho: string[];
  localAtivo: string;
  assinaturaJpg: string;
  certificadoNome: string;
  tipoAssinatura: TipoAssinatura;
  onChange: (patch: {
    locaisTrabalho?: string[];
    localAtivo?: string;
    assinaturaJpg?: string;
    certificadoNome?: string;
    tipoAssinatura?: TipoAssinatura;
  }) => void;
};

export default function PerfilAssinaturaLocais({
  locaisTrabalho,
  localAtivo,
  assinaturaJpg,
  certificadoNome,
  tipoAssinatura,
  onChange,
}: Props) {
  const [novoLocal, setNovoLocal] = useState("");
  const [erroLocal, setErroLocal] = useState("");
  const [erroAssinatura, setErroAssinatura] = useState("");
  const jpgRef = useRef<HTMLInputElement>(null);
  const certRef = useRef<HTMLInputElement>(null);

  function salvarLocal() {
    const nome = novoLocal.trim();
    if (!nome) {
      setErroLocal("Digite o nome do local.");
      return;
    }
    if (locaisTrabalho.some((l) => l.toLowerCase() === nome.toLowerCase())) {
      setErroLocal("Este local já está na lista.");
      return;
    }
    const locais = [...locaisTrabalho, nome];
    onChange({
      locaisTrabalho: locais,
      localAtivo: localAtivo || nome,
    });
    setNovoLocal("");
    setErroLocal("");
  }

  function apagarLocal(nome: string) {
    const locais = locaisTrabalho.filter((l) => l !== nome);
    const ativo =
      localAtivo === nome ? (locais[0] ?? "") : localAtivo;
    onChange({ locaisTrabalho: locais, localAtivo: ativo });
  }

  async function onJpg(file: File | undefined) {
    if (!file) return;
    setErroAssinatura("");
    try {
      const dataUrl = await compactarAssinaturaJpg(file);
      onChange({
        assinaturaJpg: dataUrl,
        tipoAssinatura: "jpg",
      });
    } catch (err) {
      setErroAssinatura(
        err instanceof Error ? err.message : "Falha ao carregar a assinatura.",
      );
    }
  }

  function onCert(file: File | undefined) {
    if (!file) return;
    onChange({
      certificadoNome: file.name,
      tipoAssinatura: "certificado",
    });
  }

  return (
    <div className="perfil-extra full">
      <fieldset className="endereco-field full">
        <legend>Local de realização dos exames</legend>
        <p className="auth-hint">
          Grave o nome do local onde realiza os exames. Ele aparece à direita
          no rodapé do laudo (em itálico). Use o X para apagar.
        </p>
        <div className="local-add-row">
          <input
            value={novoLocal}
            onChange={(ev) => setNovoLocal(ev.target.value)}
            placeholder="Nome do local / clínica"
          />
          <button type="button" className="btn secondary small" onClick={salvarLocal}>
            Salvar local
          </button>
        </div>
        {erroLocal ? <p className="auth-error">{erroLocal}</p> : null}
        <div className="locais-chips">
          {locaisTrabalho.length === 0 ? (
            <span className="muted">Nenhum local salvo ainda.</span>
          ) : (
            locaisTrabalho.map((local) => (
              <label
                key={local}
                className={`local-chip ${localAtivo === local ? "on" : ""}`}
              >
                <input
                  type="radio"
                  name="local-ativo"
                  checked={localAtivo === local}
                  onChange={() => onChange({ localAtivo: local })}
                />
                <span>{local}</span>
                <button
                  type="button"
                  className="local-x"
                  aria-label={`Apagar ${local}`}
                  onClick={() => apagarLocal(local)}
                >
                  ×
                </button>
              </label>
            ))
          )}
        </div>
      </fieldset>

      <fieldset className="endereco-field full">
        <legend>Assinatura digital</legend>
        <p className="auth-hint">
          Envie uma assinatura em JPG para o rodapé do laudo, ou selecione um
          certificado digital (.pfx / .p12 / .cer) para identificação no perfil.
        </p>

        <div className="assinatura-grid">
          <div className="assinatura-box">
            <strong>Assinatura JPG</strong>
            <input
              ref={jpgRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              hidden
              onChange={(ev) => void onJpg(ev.target.files?.[0])}
            />
            <button
              type="button"
              className="btn secondary small"
              onClick={() => jpgRef.current?.click()}
            >
              Enviar JPG
            </button>
            {assinaturaJpg ? (
              <div className="assinatura-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assinaturaJpg} alt="Prévia da assinatura" />
                <button
                  type="button"
                  className="btn ghost small"
                  onClick={() =>
                    onChange({
                      assinaturaJpg: "",
                      tipoAssinatura:
                        tipoAssinatura === "jpg" ? "" : tipoAssinatura,
                    })
                  }
                >
                  Remover imagem
                </button>
              </div>
            ) : (
              <p className="muted">Nenhuma assinatura JPG enviada.</p>
            )}
          </div>

          <div className="assinatura-box">
            <strong>Certificado digital</strong>
            <input
              ref={certRef}
              type="file"
              accept=".pfx,.p12,.cer,.crt,.pem"
              hidden
              onChange={(ev) => onCert(ev.target.files?.[0])}
            />
            <button
              type="button"
              className="btn secondary small"
              onClick={() => certRef.current?.click()}
            >
              Usar certificado
            </button>
            {certificadoNome ? (
              <p className="cert-nome">
                Certificado: <strong>{certificadoNome}</strong>
                <button
                  type="button"
                  className="local-x"
                  aria-label="Remover certificado"
                  onClick={() =>
                    onChange({
                      certificadoNome: "",
                      tipoAssinatura:
                        tipoAssinatura === "certificado" ? "" : tipoAssinatura,
                    })
                  }
                >
                  ×
                </button>
              </p>
            ) : (
              <p className="muted">Nenhum certificado selecionado.</p>
            )}
            <p className="auth-hint">
              O certificado fica vinculado ao perfil. A imagem JPG é a que
              aparece no rodapé do laudo.
            </p>
          </div>
        </div>
        {erroAssinatura ? <p className="auth-error">{erroAssinatura}</p> : null}
      </fieldset>
    </div>
  );
}
