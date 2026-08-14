"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  autenticar,
  cadastrarMedico,
  formatarCep,
  getMasterSessao,
  getSessao,
  type Genero,
  type TipoAssinatura,
  validarSenha,
} from "@/lib/auth";
import { buscarCep } from "@/lib/cep";
import PerfilAssinaturaLocais from "@/components/PerfilAssinaturaLocais";

export default function CadastroForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [rqe, setRqe] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [genero, setGenero] = useState<Genero>("Dr.");
  const [locaisTrabalho, setLocaisTrabalho] = useState<string[]>([]);
  const [localAtivo, setLocalAtivo] = useState("");
  const [assinaturaJpg, setAssinaturaJpg] = useState("");
  const [certificadoNome, setCertificadoNome] = useState("");
  const [tipoAssinatura, setTipoAssinatura] = useState<TipoAssinatura>("");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [msgCep, setMsgCep] = useState("");

  useEffect(() => {
    if (getMasterSessao()) {
      router.replace("/admin");
      return;
    }
    if (getSessao()) router.replace("/exames");
  }, [router]);

  async function onCepChange(valor: string) {
    const formatado = formatarCep(valor);
    setCep(formatado);
    setMsgCep("");

    const digitos = formatado.replace(/\D/g, "");
    if (digitos.length !== 8) return;

    setBuscandoCep(true);
    try {
      const dados = await buscarCep(digitos);
      setCep(formatarCep(dados.cep));
      setLogradouro(dados.logradouro);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setMsgCep("Endereço preenchido pelo CEP.");
    } catch (err) {
      setMsgCep(
        err instanceof Error ? err.message : "Não foi possível buscar o CEP.",
      );
    } finally {
      setBuscandoCep(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");
    setOk("");

    const falhaSenha = validarSenha(senha);
    if (falhaSenha) {
      setErro(falhaSenha);
      return;
    }
    if (senha !== confirmar) {
      setErro("A confirmação de senha não confere.");
      return;
    }

    const falha = cadastrarMedico({
      nome,
      crm,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      especialidade,
      rqe,
      senha,
      genero,
      locaisTrabalho,
      localAtivo,
      assinaturaJpg,
      certificadoNome,
      tipoAssinatura,
    });
    if (falha) {
      setErro(falha);
      return;
    }

    autenticar(crm, senha);
    setOk("Cadastro realizado com sucesso.");
    router.push("/exames");
  }

  return (
    <main className="auth-page">
      <div className="auth-card auth-card-wide">
        <div className="auth-logo-wrap compact">
          <Image
            src="/beramed-logo.png"
            alt="BeraMed Laudos"
            width={180}
            height={180}
            priority
            className="auth-logo"
          />
        </div>

        <h1 className="auth-title">Cadastro do médico</h1>
        <p className="auth-subtitle">
          O login de acesso será o número do CRM. Digite o CEP para preencher
          automaticamente o endereço.
        </p>

        <form className="auth-form register-grid" onSubmit={onSubmit} noValidate>
          <fieldset className="genero-field">
            <legend>Gênero</legend>
            <label className={`genero-option ${genero === "Dr." ? "on" : ""}`}>
              <input
                type="radio"
                name="genero"
                value="Dr."
                checked={genero === "Dr."}
                onChange={() => setGenero("Dr.")}
              />
              Dr.
            </label>
            <label className={`genero-option ${genero === "Dra." ? "on" : ""}`}>
              <input
                type="radio"
                name="genero"
                value="Dra."
                checked={genero === "Dra."}
                onChange={() => setGenero("Dra.")}
              />
              Dra.
            </label>
          </fieldset>

          <label className="field">
            <span>Nome do médico</span>
            <input
              value={nome}
              onChange={(ev) => setNome(ev.target.value)}
              placeholder="Nome completo"
              required
            />
          </label>

          <label className="field">
            <span>CRM (será o login)</span>
            <input
              value={crm}
              onChange={(ev) => setCrm(ev.target.value)}
              placeholder="Ex.: 123456/SP"
              required
            />
          </label>

          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="email@exemplo.com"
              required
            />
          </label>

          <label className="field">
            <span>Telefone</span>
            <input
              type="tel"
              value={telefone}
              onChange={(ev) => setTelefone(ev.target.value)}
              placeholder="(00) 00000-0000"
              required
            />
          </label>

          <label className="field">
            <span>Especialidade médica (opcional)</span>
            <input
              value={especialidade}
              onChange={(ev) => setEspecialidade(ev.target.value)}
              placeholder="Ex.: Radiologia / Ultrassonografia"
            />
          </label>

          <label className="field">
            <span>RQE (opcional)</span>
            <input
              value={rqe}
              onChange={(ev) => setRqe(ev.target.value)}
              placeholder="Número do RQE, se houver"
            />
          </label>

          <fieldset className="endereco-field full">
            <legend>Endereço</legend>

            <div className="register-grid endereco-grid">
              <label className="field">
                <span>CEP</span>
                <input
                  value={cep}
                  onChange={(ev) => void onCepChange(ev.target.value)}
                  placeholder="00000-000"
                  inputMode="numeric"
                  required
                />
              </label>

              <label className="field">
                <span>Número</span>
                <input
                  value={numero}
                  onChange={(ev) => setNumero(ev.target.value)}
                  placeholder="Nº"
                  required
                />
              </label>

              <label className="field full">
                <span>Logradouro</span>
                <input
                  value={logradouro}
                  onChange={(ev) => setLogradouro(ev.target.value)}
                  placeholder="Rua / Avenida"
                  required
                />
              </label>

              <label className="field full">
                <span>Complemento (opcional)</span>
                <input
                  value={complemento}
                  onChange={(ev) => setComplemento(ev.target.value)}
                  placeholder="Apto, sala, bloco…"
                />
              </label>

              <label className="field">
                <span>Bairro</span>
                <input
                  value={bairro}
                  onChange={(ev) => setBairro(ev.target.value)}
                  placeholder="Bairro"
                  required
                />
              </label>

              <label className="field">
                <span>Cidade</span>
                <input
                  value={cidade}
                  onChange={(ev) => setCidade(ev.target.value)}
                  placeholder="Cidade"
                  required
                />
              </label>

              <label className="field">
                <span>Estado (UF)</span>
                <input
                  value={estado}
                  onChange={(ev) =>
                    setEstado(ev.target.value.toUpperCase().slice(0, 2))
                  }
                  placeholder="UF"
                  maxLength={2}
                  required
                />
              </label>
            </div>

            {buscandoCep ? (
              <p className="auth-hint">Buscando CEP…</p>
            ) : msgCep ? (
              <p className="auth-hint">{msgCep}</p>
            ) : (
              <p className="auth-hint">
                Ao digitar o CEP completo, logradouro, bairro, cidade e estado
                são preenchidos automaticamente. O complemento é digitado
                manualmente.
              </p>
            )}
          </fieldset>

          <PerfilAssinaturaLocais
            locaisTrabalho={locaisTrabalho}
            localAtivo={localAtivo}
            assinaturaJpg={assinaturaJpg}
            certificadoNome={certificadoNome}
            tipoAssinatura={tipoAssinatura}
            onChange={(patch) => {
              if (patch.locaisTrabalho !== undefined)
                setLocaisTrabalho(patch.locaisTrabalho);
              if (patch.localAtivo !== undefined) setLocalAtivo(patch.localAtivo);
              if (patch.assinaturaJpg !== undefined)
                setAssinaturaJpg(patch.assinaturaJpg);
              if (patch.certificadoNome !== undefined)
                setCertificadoNome(patch.certificadoNome);
              if (patch.tipoAssinatura !== undefined)
                setTipoAssinatura(patch.tipoAssinatura);
            }}
          />

          <label className="field field-senha">
            <span>Senha de acesso</span>
            <div className="senha-input-wrap">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(ev) => setSenha(ev.target.value)}
                placeholder="6–18 caracteres"
                minLength={6}
                maxLength={18}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="senha-eye"
                onClick={() => setMostrarSenha((v) => !v)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A9.8 9.8 0 0 1 12 4.8c5 0 9.3 3.3 10.5 7.7a11 11 0 0 1-1.7 3.3M6.1 6.1A11 11 0 0 0 1.5 12.5C2.7 16.9 7 20.2 12 20.2c1.7 0 3.3-.4 4.7-1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
                    <path
                      d="M1.5 12.5C2.7 8.1 7 4.8 12 4.8s9.3 3.3 10.5 7.7C21.3 16.9 17 20.2 12 20.2S2.7 16.9 1.5 12.5z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          <label className="field field-senha">
            <span>Confirmar senha</span>
            <div className="senha-input-wrap">
              <input
                type={mostrarConfirmar ? "text" : "password"}
                value={confirmar}
                onChange={(ev) => setConfirmar(ev.target.value)}
                placeholder="Repita a senha"
                minLength={6}
                maxLength={18}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="senha-eye"
                onClick={() => setMostrarConfirmar((v) => !v)}
                aria-label={
                  mostrarConfirmar ? "Ocultar confirmação" : "Mostrar confirmação"
                }
                title={
                  mostrarConfirmar ? "Ocultar confirmação" : "Mostrar confirmação"
                }
              >
                {mostrarConfirmar ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A9.8 9.8 0 0 1 12 4.8c5 0 9.3 3.3 10.5 7.7a11 11 0 0 1-1.7 3.3M6.1 6.1A11 11 0 0 0 1.5 12.5C2.7 16.9 7 20.2 12 20.2c1.7 0 3.3-.4 4.7-1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
                    <path
                      d="M1.5 12.5C2.7 8.1 7 4.8 12 4.8s9.3 3.3 10.5 7.7C21.3 16.9 17 20.2 12 20.2S2.7 16.9 1.5 12.5z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          <p className="auth-hint full">
            A senha deve ter no mínimo 6 e no máximo 18 dígitos, com ao menos
            uma letra maiúscula, uma minúscula e um número. O RQE só entra no
            laudo se for preenchido.
          </p>

          {erro ? <p className="auth-error full">{erro}</p> : null}
          {ok ? <p className="auth-ok full">{ok}</p> : null}

          <button type="submit" className="btn primary auth-submit full">
            Cadastrar e entrar
          </button>
        </form>

        <p className="auth-switch">
          Já possui cadastro? <Link href="/">Fazer login</Link>
        </p>
      </div>
    </main>
  );
}
