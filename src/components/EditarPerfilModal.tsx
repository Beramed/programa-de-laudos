"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  atualizarMedico,
  formatarCep,
  type Genero,
  type SessaoMedico,
} from "@/lib/auth";
import { buscarCep } from "@/lib/cep";

type Props = {
  medico: SessaoMedico;
  aberto: boolean;
  onFechar: () => void;
  onSalvo: (medico: SessaoMedico) => void;
};

export default function EditarPerfilModal({
  medico,
  aberto,
  onFechar,
  onSalvo,
}: Props) {
  const [nome, setNome] = useState(medico.nome);
  const [email, setEmail] = useState(medico.email);
  const [telefone, setTelefone] = useState(medico.telefone);
  const [cep, setCep] = useState(medico.cep);
  const [logradouro, setLogradouro] = useState(medico.logradouro);
  const [numero, setNumero] = useState(medico.numero);
  const [complemento, setComplemento] = useState(medico.complemento);
  const [bairro, setBairro] = useState(medico.bairro);
  const [cidade, setCidade] = useState(medico.cidade);
  const [estado, setEstado] = useState(medico.estado);
  const [especialidade, setEspecialidade] = useState(medico.especialidade);
  const [rqe, setRqe] = useState(medico.rqe);
  const [genero, setGenero] = useState<Genero>(medico.genero);
  const [senhaNova, setSenhaNova] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [msgCep, setMsgCep] = useState("");

  useEffect(() => {
    if (!aberto) return;
    setNome(medico.nome);
    setEmail(medico.email);
    setTelefone(medico.telefone);
    setCep(medico.cep);
    setLogradouro(medico.logradouro);
    setNumero(medico.numero);
    setComplemento(medico.complemento);
    setBairro(medico.bairro);
    setCidade(medico.cidade);
    setEstado(medico.estado);
    setEspecialidade(medico.especialidade);
    setRqe(medico.rqe);
    setGenero(medico.genero);
    setSenhaNova("");
    setConfirmar("");
    setErro("");
    setMsgCep("");
  }, [aberto, medico]);

  if (!aberto) return null;

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

    if (senhaNova || confirmar) {
      if (senhaNova !== confirmar) {
        setErro("A confirmação de senha não confere.");
        return;
      }
    }

    const falha = atualizarMedico(medico.crm, {
      nome,
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
      genero,
      senhaNova: senhaNova.trim() || undefined,
    });

    if (falha) {
      setErro(falha);
      return;
    }

    onSalvo({
      ...medico,
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.trim(),
      cep: formatarCep(cep),
      logradouro: logradouro.trim(),
      numero: numero.trim(),
      complemento: complemento.trim(),
      bairro: bairro.trim(),
      cidade: cidade.trim(),
      estado: estado.trim().toUpperCase(),
      especialidade: especialidade.trim(),
      rqe: rqe.trim(),
      genero,
    });
    onFechar();
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onFechar}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editar-perfil-titulo"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="editar-perfil-titulo">Editar meus dados</h2>
          <button type="button" className="btn ghost small" onClick={onFechar}>
            Fechar
          </button>
        </div>

        <form className="auth-form register-grid" onSubmit={onSubmit} noValidate>
          <fieldset className="genero-field">
            <legend>Gênero</legend>
            <label className={`genero-option ${genero === "Dr." ? "on" : ""}`}>
              <input
                type="radio"
                name="genero-edit"
                checked={genero === "Dr."}
                onChange={() => setGenero("Dr.")}
              />
              Dr.
            </label>
            <label className={`genero-option ${genero === "Dra." ? "on" : ""}`}>
              <input
                type="radio"
                name="genero-edit"
                checked={genero === "Dra."}
                onChange={() => setGenero("Dra.")}
              />
              Dra.
            </label>
          </fieldset>

          <label className="field">
            <span>Nome</span>
            <input value={nome} onChange={(ev) => setNome(ev.target.value)} required />
          </label>

          <label className="field">
            <span>CRM (login)</span>
            <input value={medico.crm} disabled />
          </label>

          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>Telefone</span>
            <input
              type="tel"
              value={telefone}
              onChange={(ev) => setTelefone(ev.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>Especialidade</span>
            <input
              value={especialidade}
              onChange={(ev) => setEspecialidade(ev.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>RQE (opcional)</span>
            <input value={rqe} onChange={(ev) => setRqe(ev.target.value)} />
          </label>

          <fieldset className="endereco-field full">
            <legend>Endereço</legend>
            <div className="register-grid endereco-grid">
              <label className="field">
                <span>CEP</span>
                <input
                  value={cep}
                  onChange={(ev) => void onCepChange(ev.target.value)}
                  inputMode="numeric"
                  required
                />
              </label>
              <label className="field">
                <span>Número</span>
                <input
                  value={numero}
                  onChange={(ev) => setNumero(ev.target.value)}
                  required
                />
              </label>
              <label className="field full">
                <span>Logradouro</span>
                <input
                  value={logradouro}
                  onChange={(ev) => setLogradouro(ev.target.value)}
                  required
                />
              </label>
              <label className="field full">
                <span>Complemento</span>
                <input
                  value={complemento}
                  onChange={(ev) => setComplemento(ev.target.value)}
                />
              </label>
              <label className="field">
                <span>Bairro</span>
                <input
                  value={bairro}
                  onChange={(ev) => setBairro(ev.target.value)}
                  required
                />
              </label>
              <label className="field">
                <span>Cidade</span>
                <input
                  value={cidade}
                  onChange={(ev) => setCidade(ev.target.value)}
                  required
                />
              </label>
              <label className="field">
                <span>UF</span>
                <input
                  value={estado}
                  onChange={(ev) =>
                    setEstado(ev.target.value.toUpperCase().slice(0, 2))
                  }
                  maxLength={2}
                  required
                />
              </label>
            </div>
            {buscandoCep ? (
              <p className="auth-hint">Buscando CEP…</p>
            ) : msgCep ? (
              <p className="auth-hint">{msgCep}</p>
            ) : null}
          </fieldset>

          <label className="field">
            <span>Nova senha (opcional)</span>
            <input
              type="password"
              value={senhaNova}
              onChange={(ev) => setSenhaNova(ev.target.value)}
              placeholder="Deixe em branco para manter"
              maxLength={18}
            />
          </label>

          <label className="field">
            <span>Confirmar nova senha</span>
            <input
              type="password"
              value={confirmar}
              onChange={(ev) => setConfirmar(ev.target.value)}
              maxLength={18}
            />
          </label>

          {erro ? <p className="auth-error full">{erro}</p> : null}

          <div className="modal-actions full">
            <button type="button" className="btn ghost" onClick={onFechar}>
              Cancelar
            </button>
            <button type="submit" className="btn primary">
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
