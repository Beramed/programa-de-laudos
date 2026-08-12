import {
  excluirMedicoSolicitante,
  listarMedicosSolicitantes,
  mesclarMedicosSolicitantes,
  upsertMedicoSolicitante,
} from "@/lib/medicosSolicitantesStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const lista = await listarMedicosSolicitantes();
  return Response.json({ medicos: lista });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      nome?: string;
      crm?: string;
      uf?: string;
      id?: string;
      /** Sync em lote a partir do cliente */
      medicos?: Array<{ nome: string; crm?: string; uf?: string; id?: string }>;
    };

    if (Array.isArray(body.medicos)) {
      const lista = await mesclarMedicosSolicitantes(body.medicos);
      return Response.json({ medicos: lista });
    }

    if (!body.nome?.trim()) {
      return Response.json({ erro: "Nome obrigatório." }, { status: 400 });
    }

    const medico = await upsertMedicoSolicitante({
      nome: body.nome,
      crm: body.crm,
      uf: body.uf,
      id: body.id,
    });
    const lista = await listarMedicosSolicitantes();
    return Response.json({ medico, medicos: lista });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erro ao salvar.";
    return Response.json({ erro: msg }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ erro: "id obrigatório." }, { status: 400 });
  }
  const ok = await excluirMedicoSolicitante(id);
  if (!ok) {
    return Response.json({ erro: "Médico não encontrado." }, { status: 404 });
  }
  const lista = await listarMedicosSolicitantes();
  return Response.json({ medicos: lista });
}
