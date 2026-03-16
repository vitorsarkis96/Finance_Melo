// api/asaas.js — Vercel Serverless Function
// A chave fica aqui no servidor, nunca exposta no navegador

const BASE = "https://api.asaas.com/api/v3";

async function asaas(path, apiKey) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "access_token": apiKey,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Asaas error ${res.status}: ${path}`);
  return res.json();
}

async function fetchAll(path, apiKey, limit = 100) {
  let offset = 0;
  let all = [];
  while (true) {
    const sep = path.includes("?") ? "&" : "?";
    const data = await asaas(`${path}${sep}limit=${limit}&offset=${offset}`, apiKey);
    all = all.concat(data.data || []);
    if (!data.hasMore) break;
    offset += limit;
  }
  return all;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ASAAS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ASAAS_API_KEY nao configurada nas variaveis de ambiente da Vercel." });
  }

  try {
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split("T")[0];
    const fimMes    = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().split("T")[0];

    const [
      pagamentosRecebidos,
      pagamentosVencidos,
      clientes,
      assinaturas,
    ] = await Promise.all([
      fetchAll(`/payments?status=RECEIVED&paymentDate[ge]=${inicioMes}&paymentDate[le]=${fimMes}`, apiKey),
      fetchAll(`/payments?status=OVERDUE`, apiKey),
      fetchAll(`/customers?isDeleted=false`, apiKey),
      fetchAll(`/subscriptions?status=ACTIVE`, apiKey),
    ]);

    // RECEITAS
    const receitas = pagamentosRecebidos.map(p => ({
      id:   p.id,
      desc: p.description || "Cobranca Asaas",
      tipo: assinaturas.some(s => s.customer === p.customer) ? "recorrente" : "pontual",
      val:  p.value,
      data: p.paymentDate,
      origem: "asaas",
    }));

    // MRR
    const mrr = assinaturas.reduce((acc, s) => {
      let val = s.value || 0;
      if (s.cycle === "WEEKLY")       val = val * 4.33;
      if (s.cycle === "BIWEEKLY")     val = val * 2.17;
      if (s.cycle === "QUARTERLY")    val = val / 3;
      if (s.cycle === "SEMIANNUALLY") val = val / 6;
      if (s.cycle === "YEARLY")       val = val / 12;
      return acc + val;
    }, 0);

    // CLIENTES
    const clientesComAssinatura = new Set(assinaturas.map(s => s.customer));
    const clientesComPagamento  = new Set(pagamentosRecebidos.map(p => p.customer));
    const trintaDiasAtras = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const inadimplentes = new Set(
      pagamentosVencidos
        .filter(p => p.dueDate < trintaDiasAtras)
        .map(p => p.customer)
    );

    const clientesMapeados = clientes
      .filter(c => clientesComAssinatura.has(c.id) || clientesComPagamento.has(c.id))
      .map(c => {
        const subs = assinaturas.filter(s => s.customer === c.id);
        const mrrCliente = subs.reduce((acc, s) => acc + (s.value || 0), 0);
        return {
          id:    c.id,
          nome:  c.name,
          email: c.email || "",
          mrr:   mrrCliente,
          meses: 0,
          ativo: !inadimplentes.has(c.id),
          origem: "asaas",
        };
      });

    return res.status(200).json({
      receitas,
      clientes: clientesMapeados,
      mrr: Math.round(mrr * 100) / 100,
      inadimplentes: inadimplentes.size,
      totalRecebidoMes: receitas.reduce((a, r) => a + r.val, 0),
      assinaturasAtivas: assinaturas.length,
      syncedAt: new Date().toISOString(),
    });

  } catch (err) {
    console.error("Asaas error:", err);
    return res.status(500).json({ error: err.message });
  }
}
