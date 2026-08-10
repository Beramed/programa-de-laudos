"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  apagarMedico,
  getMasterSessao,
  listarMedicos,
  logout,
  type SessaoMedico,
} from "@/lib/auth";

export default function AdminPanel() {
  const router = useRouter();
  const [pronto, setPronto] = useState(false);
  const [medicos, setMedicos] = useState<SessaoMedico[]>([]);
  const [msg, setMsg] = useState("");

  function recarregar() {
    setMedicos(listarMedicos());
  }

  useEffect(() => {
    if (!getMasterSessao()) {
      router.replace("/");
      return;
    }
    recarregar();
    setPronto(true);
  }, [router]);

  function sair() {
    logout();
    router.replace("/");
  }

  function remover(crm: string, nome: string) {
    const ok = window.confirm(
      `Apagar o cadastro de ${nome} (CRM ${crm})? Esta ação não pode ser desfeita.`,
    );
    if (!ok) return;
    if (apagarMedico(crm)) {
      setMsg(`Cadastro de ${nome} removido.`);
      recarregar();
    } else {
      setMsg("Não foi possível apagar este cadastro.");
    }
  }

  if (!pronto) {
    return (
      <main className="auth-page">
        <p className="auth-loading">Carregando painel master…</p>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Acesso master</p>
          <h1>Bera — gestão de médicos</h1>
          <p className="admin-sub">
            {medicos.length === 0
              ? "Nenhum médico cadastrado no momento."
              : `${medicos.length} médico(s) cadastrado(s).`}
          </p>
        </div>
        <button type="button" className="btn ghost" onClick={sair}>
          Sair
        </button>
      </header>

      {msg ? <p className="auth-ok">{msg}</p> : null}

      <section className="admin-table-wrap">
        {medicos.length === 0 ? (
          <p className="admin-empty">
            Quando houver cadastros, eles aparecerão aqui para consulta e
            exclusão.
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Médico</th>
                <th>CRM</th>
                <th>Especialidade / RQE</th>
                <th>Contato</th>
                <th>Endereço</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {medicos.map((m) => (
                <tr key={m.crm}>
                  <td>
                    <strong>
                      {m.genero} {m.nome}
                    </strong>
                  </td>
                  <td>{m.crm}</td>
                  <td>
                    {m.especialidade || "—"}
                    {m.rqe ? (
                      <>
                        <br />
                        <span className="muted">RQE {m.rqe}</span>
                      </>
                    ) : null}
                  </td>
                  <td>
                    {m.telefone || "—"}
                    <br />
                    <span className="muted">{m.email}</span>
                  </td>
                  <td>{m.endereco || "—"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn danger small"
                      onClick={() => remover(m.crm, m.nome)}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
