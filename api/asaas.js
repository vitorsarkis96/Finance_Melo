export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  const apiKey = process.env.ASAAS_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: "ASAAS_API_KEY não configurada" });
  }

  const BASE = "https://api.asaas.com/api/v3";
  
  async function get(path) {
    const r = await fetch(`${BASE}${path}`, {
      headers: { "access_token": apiKey }
    });
    if (!r.ok) throw new Error(`Asaas ${r.status}: ${path}`);
    return r.json();
  }

  async function getAll(path) {
    let all = [], offset = 0;
    while (true) {
      const sep = path.includes("?") ? "&" : "?";
      const d = await get(`${path}${sep}limit=100&offset=${offset}`);
      all = all.concat(d.data || []);
      if (!d.hasMore) break;
      offset += 100;
    }
    return all;
  }

  try {
    const trintaDias = new Date(Date.now() - 30*24*60*60*1000).toISOString().split("T")[0];

    const [pagos, vencidos, subs] = await Promise.all([
      getAll(`/payments?status=RECEIVED`),
      getAll(`/payments?status=OVERDUE&dueDate[le]=${trintaDias}`),
      getAll(`/subscriptions?status=ACTIVE`),
    ]);

    const inadimplentes = new Set(vencidos.map(p => p.customer));
    const subsClientes = new Set(subs.map(s => s.customer));

    const hoje = new Date();
    const ini = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split("T")[0];
    const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().split("T")[0];
    const pagosDoMes = pagos.filter(p => p.paymentDate >= ini && p.paymentDate <= fim);

    const receitas = pagosDoMes.map(p => ({
      id: p.id,
      desc: p.description || "Cobrança Asaas",
      tipo: subsClientes.has(p.customer) ? "recorrente" : "pontual",
      val: p.value,
      origem: "asaas"
    }));

    // Monta clientes a partir das assinaturas ativas
    const clientesMap = new Map();
    subs.forEach(s => {
      if (!clientesMap.has(s.customer)) {
        clientesMap.set(s.customer, {
          id: s.customer,
          nome: s.customer,
          mrr: 0,
          meses: 0,
          ativo: !inadimplentes.has(s.customer),
          origem: "asaas"
        });
      }
      clientesMap.get(s.customer).mrr += s.value || 0;
    });

    let mrr = 0;
    subs.forEach(s => {
      let v = s.value || 0;
      if (s.cycle === "WEEKLY") v *= 4.33;
      if (s.cycle === "QUARTERLY") v /= 3;
      if (s.cycle === "YEARLY") v /= 12;
      mrr += v;
    });

    return res.status(200).json({
      receitas,
      clientes: Array.from(clientesMap.values()),
      mrr: Math.round(mrr * 100) / 100,
      totalRecebidoMes: receitas.reduce((a, p) => a + p.val, 0),
      inadimplentes: inadimplentes.size,
      assinaturasAtivas: subs.length,
      syncedAt: new Date().toISOString()
    });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
