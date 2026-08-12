export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ crm: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { crm: crmRaw } = await params;
  const crm = crmRaw.replace(/\D/g, "");
  if (!crm || crm.length < 3) {
    return Response.json(
      { erro: "Informe um CRM válido (apenas números)." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      `https://api.cremesp.org.br/guia-medico/medico-info/${crm}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );

    if (res.status === 404) {
      return Response.json(
        { erro: "CRM não encontrado no CREMESP." },
        { status: 404 },
      );
    }

    if (!res.ok) {
      return Response.json(
        {
          erro: "Serviço CREMESP temporariamente indisponível. Tente novamente.",
        },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      crm?: number | string;
      nome?: string;
      nomeLimpo?: string;
      situacao?: string;
      tipoInscricao?: string;
    };

    const nome = (data.nomeLimpo || data.nome || "").trim();
    if (!nome) {
      return Response.json(
        { erro: "CRM não encontrado no CREMESP." },
        { status: 404 },
      );
    }

    return Response.json({
      crm: String(data.crm ?? crm),
      nome,
      situacao: data.situacao ?? "",
      tipoInscricao: data.tipoInscricao ?? "",
      uf: "SP",
      fonte: "cremesp",
    });
  } catch {
    return Response.json(
      {
        erro: "Falha ao consultar o Guia Médico CREMESP.",
      },
      { status: 502 },
    );
  }
}
