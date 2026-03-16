import { useState, useCallback, useEffect } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');`;

const G = `
${GFONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F5F6FA;--s1:#FFFFFF;--s2:#F0F2F8;--s3:#E8EBF4;
  --border:#E2E6F0;--border2:#D0D5E8;
  --lime:#7BC24A;--lime-dim:#7BC24A15;--lime-dim2:#7BC24A35;
  --ink:#1A1D2E;--ink2:#6B7280;--ink3:#9CA3AF;--accent:#111827;
  --red:#EF4444;--red-dim:#EF444410;
  --amber:#F59E0B;--amber-dim:#F59E0B10;
  --blue:#3B82F6;--blue-dim:#3B82F610;
  --body:'Poppins',sans-serif;--radius:12px;
}
html,body{background:var(--bg);color:var(--ink);font-family:var(--body);min-height:100vh}
input,select,button{font-family:var(--body)}
input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
.wrap{max-width:1320px;margin:0 auto;padding:28px 24px}
.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--border)}
.live-dot{display:flex;align-items:center;gap:7px;font-size:11px;font-weight:500;color:var(--ink2);letter-spacing:.5px}
.live-dot::before{content:'';display:block;width:7px;height:7px;border-radius:50%;background:var(--lime);box-shadow:0 0 7px var(--lime);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.tabs{display:flex;gap:2px;background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:4px;margin-bottom:28px;overflow-x:auto;box-shadow:0 1px 4px #0000000a}
.tab{padding:9px 22px;border-radius:11px;border:none;background:transparent;color:var(--ink2);cursor:pointer;font-family:var(--body);font-size:13px;font-weight:500;white-space:nowrap;transition:all .18s}
.tab:hover{color:var(--ink)}
.tab.on{background:var(--ink);color:#fff;font-weight:600;box-shadow:0 2px 8px #0000001a}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:14px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:14px}
.card{background:var(--s1);border:1px solid var(--border);border-radius:var(--radius);padding:22px;box-shadow:0 1px 4px #0000000a}
.card-sm{background:var(--s1);border:1px solid var(--border);border-radius:var(--radius);padding:18px 20px;box-shadow:0 1px 4px #0000000a}
.kpi-label{font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:var(--ink3);margin-bottom:8px;font-weight:600}
.kpi-val{font-size:28px;font-weight:700;line-height:1.1;color:var(--ink)}
.kpi-sub{font-size:11px;color:var(--ink3);margin-top:5px;font-weight:400}
.kpi-dot{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:5px;vertical-align:middle}
.sh{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink3);font-weight:600;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--border)}
.tbl{width:100%;border-collapse:collapse;font-size:13px}
.tbl th{text-align:left;padding:9px 12px;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--ink3);border-bottom:1px solid var(--border);font-weight:600}
.tbl td{padding:10px 12px;border-bottom:1px solid var(--border);vertical-align:middle;color:var(--ink)}
.tbl tr:last-child td{border-bottom:none}
.tbl tr:hover td{background:var(--s2)}
.field-label{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--ink3);margin-bottom:6px;font-weight:600}
input[type=text],input[type=number],select{background:var(--s2);border:1px solid var(--border2);color:var(--ink);padding:9px 12px;border-radius:8px;font-size:13px;width:100%;outline:none;transition:border .15s;font-weight:400}
input:focus,select:focus{border-color:var(--ink);background:var(--s1)}
select option{background:var(--s1);color:var(--ink)}
.btn{padding:9px 18px;border-radius:9px;border:none;cursor:pointer;font-size:13px;font-weight:600;transition:all .15s;line-height:1;font-family:var(--body)}
.btn-lime{background:var(--ink);color:#fff}
.btn-lime:hover{background:#374151}
.btn-del{background:transparent;color:var(--ink3);border:none;cursor:pointer;font-size:18px;line-height:1;padding:4px 6px;border-radius:4px;transition:color .15s}
.btn-del:hover{color:var(--red)}
.badge{display:inline-block;padding:2px 9px;border-radius:20px;font-size:10px;letter-spacing:.5px;font-weight:600}
.b-lime{background:var(--lime-dim);color:#4a8a28}
.b-red{background:var(--red-dim);color:var(--red)}
.b-amber{background:var(--amber-dim);color:#B45309}
.b-blue{background:var(--blue-dim);color:var(--blue)}
.b-grey{background:var(--s3);color:var(--ink2)}
.bar-wrap{display:flex;flex-direction:column;gap:11px}
.bar-row{display:flex;align-items:center;gap:10px}
.bar-name{font-size:12px;color:var(--ink2);width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}
.bar-track{flex:1;height:6px;background:var(--s3);border-radius:3px;overflow:hidden}
.bar-fill{height:100%;border-radius:3px;transition:width .4s}
.bar-val{font-size:12px;color:var(--ink);width:110px;text-align:right;font-weight:600}
.prog-track{height:5px;background:var(--s3);border-radius:3px;overflow:hidden;margin-top:7px}
.prog-fill{height:100%;border-radius:3px;transition:width .5s}
.div{border:none;border-top:1px solid var(--border);margin:16px 0}
.alert{padding:12px 16px;border-radius:9px;font-size:12px;font-weight:500;margin-bottom:8px;line-height:1.6}
.al-lime{background:var(--lime-dim);border:1px solid var(--lime-dim2);color:#3a6b1f}
.al-red{background:var(--red-dim);border:1px solid #EF444425;color:#B91C1C}
.al-amber{background:var(--amber-dim);border:1px solid #F59E0B25;color:#92400E}
.al-blue{background:var(--blue-dim);border:1px solid #3B82F625;color:#1D4ED8}
.add-row{background:var(--s2);border:1px dashed var(--border2);border-radius:10px;padding:16px;margin-top:12px}
.add-grid{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end}
.add-grid>div{min-width:80px}
.ring-wrap{display:flex;align-items:center;gap:28px}
.ring{width:110px;height:110px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.ring-inner{background:var(--s1);width:80px;height:80px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 2px 8px #00000012}
.sync-bar{display:flex;align-items:center;justify-content:space-between;background:var(--s1);border:1px solid var(--border);border-radius:10px;padding:12px 18px;margin-bottom:20px;box-shadow:0 1px 4px #0000000a}
.sync-info{font-size:11px;color:var(--ink3);font-weight:400}
.sync-info strong{color:var(--ink2);font-weight:600}
.btn-sync{display:flex;align-items:center;gap:7px;padding:8px 16px;border-radius:8px;border:none;background:var(--ink);color:#fff;font-family:var(--body);font-size:12px;font-weight:600;cursor:pointer;transition:all .15s}
.btn-sync:hover{background:#374151}
.btn-sync:disabled{opacity:.5;cursor:not-allowed}
.spin{animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.asaas-badge{display:inline-flex;align-items:center;gap:5px;background:#00AEF0;color:#fff;border-radius:6px;padding:2px 8px;font-size:10px;font-weight:700;letter-spacing:.5px}
@media(max-width:900px){.g4{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.g4,.g3,.g2{grid-template-columns:1fr}.tabs{flex-wrap:wrap}}
`;

const R = (v: any, p = "R$") => isNaN(v) || v === null ? "—" : `${p} ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const P = (v: any) => (!isFinite(v) || isNaN(v)) ? "—" : `${v.toFixed(1)}%`;
let uid = 200;
const nid = () => ++uid;

const COST_CATS = [
  { key: "equipe",      label: "Equipe",                  icon: "👥", color: "var(--blue)",  desc: "Salários, pró-labore, benefícios, freelancers" },
  { key: "programas",   label: "Programas & Ferramentas", icon: "🖥️", color: "var(--lime)",  desc: "Adobe, ClickUp, Figma, Google Workspace..." },
  { key: "impostos",    label: "Impostos & Tributos",     icon: "📋", color: "var(--amber)", desc: "Simples Nacional, DAS, INSS, FGTS..." },
  { key: "alimentacao", label: "Alimentação",             icon: "🍽️", color: "#FF8C69",      desc: "Almoços, lanches, coffee da equipe" },
  { key: "limpeza",     label: "Limpeza & Manutenção",    icon: "🧹", color: "#9B8EFF",      desc: "Material de limpeza, manutenção do espaço" },
  { key: "marketing",   label: "Marketing & Vendas",      icon: "📣", color: "#FF6B9D",      desc: "Anúncios, materiais, eventos, viagens" },
  { key: "infra",       label: "Infraestrutura",          icon: "🏢", color: "#4ECDC4",      desc: "Aluguel, coworking, internet, energia" },
  { key: "outros",      label: "Outros",                  icon: "📦", color: "var(--ink2)",  desc: "Despesas diversas não categorizadas" },
];

const INIT: any = {
  receitas: [
    { id: 1, desc: "Retainer KHS Advogados", tipo: "recorrente", val: 5000 },
    { id: 2, desc: "Retainer 4Research",     tipo: "recorrente", val: 3500 },
    { id: 3, desc: "Retainer Aromatici",     tipo: "recorrente", val: 2800 },
  ],
  custos: {
    equipe:      [{ id: 10, desc: "Pró-labore Vitor", val: 4000 }, { id: 11, desc: "Freelancer Sofia", val: 1200 }],
    programas:   [{ id: 20, desc: "Adobe Creative Cloud", val: 360 }, { id: 21, desc: "ClickUp Business", val: 120 }, { id: 22, desc: "Figma", val: 80 }],
    impostos:    [{ id: 30, desc: "Simples Nacional (DAS)", val: 720 }],
    alimentacao: [{ id: 40, desc: "Almoços equipe", val: 480 }],
    limpeza:     [{ id: 50, desc: "Material de limpeza", val: 120 }],
    marketing:   [{ id: 60, desc: "Tráfego pago LinkedIn", val: 500 }],
    infra:       [{ id: 70, desc: "Coworking mensal", val: 900 }],
    outros:      [],
  },
  clientes: [
    { id: 100, nome: "KHS Advogados", mrr: 5000, meses: 14, ativo: true },
    { id: 101, nome: "4Research",     mrr: 3500, meses:  8, ativo: true },
    { id: 102, nome: "Aromatici",     mrr: 2800, meses:  5, ativo: true },
    { id: 103, nome: "IPVM",          mrr: 3200, meses:  3, ativo: true },
    { id: 104, nome: "REDCap",        mrr: 2500, meses:  6, ativo: true },
    { id: 105, nome: "Brain4Care",    mrr: 1800, meses:  2, ativo: false },
  ],
};

function useStore() {
  const [d, setD] = useState(() => {
    try { const s = localStorage.getItem("melo_health"); return s ? JSON.parse(s) : INIT; } catch { return INIT; }
  });
  const set = useCallback((fn: any) => setD((p: any) => {
    const n = fn(p);
    try { localStorage.setItem("melo_health", JSON.stringify(n)); } catch {}
    return n;
  }), []);
  return [d, set] as const;
}

export default function App() {
  const [d, set] = useStore();
  const [tab, setTab] = useState("dashboard");
  const [nw, setNw] = useState<any>({});
  const [syncing, setSyncing] = useState(false);
  const [syncInfo, setSyncInfo] = useState<any>(() => {
    try { const s = localStorage.getItem("melo_sync"); return s ? JSON.parse(s) : null; } catch { return null; }
  });
  const [syncError, setSyncError] = useState<string | null>(null);

  const totalRec = d.receitas.reduce((a: number, r: any) => a + +r.val, 0);
  const mrr = d.receitas.filter((r: any) => r.tipo === "recorrente").reduce((a: number, r: any) => a + +r.val, 0);
  const arr = mrr * 12;
  const catTotals: any = {};
  COST_CATS.forEach(c => { catTotals[c.key] = (d.custos[c.key] || []).reduce((a: number, x: any) => a + +x.val, 0); });
  const totalCustos = Object.values(catTotals).reduce((a: any, v: any) => a + v, 0) as number;
  const lucro = totalRec - totalCustos;
  const mBruta = totalRec > 0 ? ((totalRec - catTotals.equipe - catTotals.programas) / totalRec) * 100 : 0;
  const mLiq = totalRec > 0 ? (lucro / totalRec) * 100 : 0;
  const ativos = d.clientes.filter((c: any) => c.ativo);
  const churned = d.clientes.filter((c: any) => !c.ativo).length;
  const churnRate = d.clientes.length > 0 ? (churned / d.clientes.length) * 100 : 0;
  const avgMRR = ativos.length > 0 ? ativos.reduce((a: number, c: any) => a + +c.mrr, 0) / ativos.length : 0;
  const ltv = churnRate > 0 ? avgMRR / (churnRate / 100) : avgMRR * 24;
  let health = 50;
  if (mLiq > 20) health += 20; else if (mLiq > 0) health += 10; else health -= 25;
  if (churnRate < 5) health += 15; else if (churnRate < 15) health += 5; else health -= 15;
  if (mrr > 10000) health += 10; else if (mrr > 5000) health += 5;
  if (ativos.length >= 5) health += 5;
  health = Math.max(0, Math.min(100, health));
  const hColor = health >= 70 ? "var(--lime)" : health >= 40 ? "var(--amber)" : "var(--red)";
  const hLabel = health >= 70 ? "SAUDÁVEL" : health >= 40 ? "ATENÇÃO" : "CRÍTICO";

  const addRec = (o: any) => set((p: any) => ({ ...p, receitas: [...p.receitas, { ...o, id: nid() }] }));
  const delRec = (i: number) => set((p: any) => ({ ...p, receitas: p.receitas.filter((x: any) => x.id !== i) }));
  const updRec = (i: number, f: string, v: any) => set((p: any) => ({ ...p, receitas: p.receitas.map((x: any) => x.id === i ? { ...x, [f]: v } : x) }));
  const addCost = (cat: string, o: any) => set((p: any) => ({ ...p, custos: { ...p.custos, [cat]: [...(p.custos[cat] || []), { ...o, id: nid() }] } }));
  const delCost = (cat: string, i: number) => set((p: any) => ({ ...p, custos: { ...p.custos, [cat]: p.custos[cat].filter((x: any) => x.id !== i) } }));
  const updCost = (cat: string, i: number, f: string, v: any) => set((p: any) => ({ ...p, custos: { ...p.custos, [cat]: p.custos[cat].map((x: any) => x.id === i ? { ...x, [f]: v } : x) } }));
  const addCli = (o: any) => set((p: any) => ({ ...p, clientes: [...p.clientes, { ...o, id: nid() }] }));
  const delCli = (i: number) => set((p: any) => ({ ...p, clientes: p.clientes.filter((x: any) => x.id !== i) }));
  const updCli = (i: number, f: string, v: any) => set((p: any) => ({ ...p, clientes: p.clientes.map((x: any) => x.id === i ? { ...x, [f]: v } : x) }));
  const nwSet = (k: string, f: string, v: any) => setNw((p: any) => ({ ...p, [k]: { ...p[k], [f]: v } }));
  const nwGet = (k: string) => nw[k] || {};
  const nwClr = (k: string) => setNw((p: any) => ({ ...p, [k]: {} }));

  const syncAsaas = useCallback(async () => {
    setSyncing(true); setSyncError(null);
    try {
      const res = await fetch("/api/asaas");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao sincronizar");
      set((p: any) => {
        const manuais = p.receitas.filter((r: any) => r.origem !== "asaas");
        const asaasRec = (data.receitas || []).map((r: any, i: number) => ({ ...r, id: 9000 + i }));
        const clientesManuais = p.clientes.filter((c: any) => c.origem !== "asaas");
        const asaasCli = (data.clientes || []).map((c: any, i: number) => ({ ...c, id: c.id || (8000 + i), meses: c.meses || 0 }));
        return { ...p, receitas: [...manuais, ...asaasRec], clientes: [...clientesManuais, ...asaasCli] };
      });
      const info = { at: data.syncedAt, total: data.totalRecebidoMes };
      setSyncInfo(info);
      localStorage.setItem("melo_sync", JSON.stringify(info));
    } catch (err: any) { setSyncError(err.message); }
    finally { setSyncing(false); }
  }, [set]);

  const ctx = { d, mrr, arr, totalRec, totalCustos, catTotals, lucro, mBruta, mLiq, ativos, churnRate, avgMRR, ltv, health, hColor, hLabel, addRec, delRec, updRec, addCost, delCost, updCost, addCli, delCli, updCli, nwSet, nwGet, nwClr };

  return (
    <>
      <style>{G}</style>
      <div className="wrap">
        <div className="topbar">
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 3, color: "var(--ink)", lineHeight: 1 }}>MELO <span style={{ color: "var(--lime)" }}>HEALTH</span></div>
            <div style={{ fontSize: 10, color: "var(--ink2)", marginTop: 4, letterSpacing: ".5px" }}>Saúde financeira em tempo real</div>
          </div>
          <div className="live-dot">AO VIVO</div>
        </div>
        <div className="tabs">
          {[["dashboard","Dashboard"],["receitas","Receitas"],["custos","Custos"],["clientes","Clientes"],["alertas","Alertas"]].map(([k,l]) => (
            <button key={k} className={`tab${tab===k?" on":""}`} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>
        <div className="sync-bar">
          <div>
            <span className="asaas-badge">ASAAS</span>{" "}
            {syncError && <span style={{fontSize:11,color:"var(--red)",marginLeft:8}}>{syncError}</span>}
            {!syncError && syncInfo && <span className="sync-info" style={{marginLeft:8}}>Última sync: <strong>{new Date(syncInfo.at).toLocaleString("pt-BR")}</strong>{" · "}Recebido no mês: <strong style={{color:"var(--lime)"}}>R$ {Number(syncInfo.total).toLocaleString("pt-BR",{minimumFractionDigits:2})}</strong></span>}
            {!syncError && !syncInfo && <span className="sync-info" style={{marginLeft:8}}>Clique para importar dados do Asaas</span>}
          </div>
          <button className="btn-sync" disabled={syncing} onClick={syncAsaas}>
            <span style={{display:"inline-block"}} className={syncing?"spin":""}>⟳</span>
            {syncing?"Sincronizando...":"Sincronizar Asaas"}
          </button>
        </div>
        {tab==="dashboard" && <TabDash {...ctx} />}
        {tab==="receitas"  && <TabRec  {...ctx} />}
        {tab==="custos"    && <TabCost {...ctx} />}
        {tab==="clientes"  && <TabCli  {...ctx} />}
        {tab==="alertas"   && <TabAlerts {...ctx} />}
      </div>
    </>
  );
}

function KPI({label,value,sub,color="var(--ink)",dot}:any){
  return <div className="card-sm"><div className="kpi-label">{label}</div><div className="kpi-val" style={{color}}>{value}</div>{sub&&<div className="kpi-sub">{dot&&<span className="kpi-dot" style={{background:color}}/>}{sub}</div>}</div>;
}

function TabDash({d,mrr,arr,totalRec,totalCustos,catTotals,lucro,mBruta,mLiq,ativos,churnRate,avgMRR,ltv,health,hColor,hLabel}:any){
  return <div>
    <div className="g4">
      <KPI label="Receita Mensal" value={R(totalRec)} sub="total de entradas" color="var(--ink)"/>
      <KPI label="Custo Total" value={R(totalCustos)} sub="todas as categorias" color="var(--red)"/>
      <KPI label="Resultado" value={R(lucro)} sub={`margem ${P(mLiq)}`} color={lucro>=0?"var(--lime)":"var(--red)"}/>
      <KPI label="MRR" value={R(mrr)} sub={`ARR ${R(arr)}`} color="var(--lime)"/>
    </div>
    <div className="g4">
      <KPI label="LTV Médio" value={R(ltv)} sub="por cliente" color="var(--amber)"/>
      <KPI label="Churn Rate" value={P(churnRate)} sub={`${ativos.length} ativos`} color={churnRate<5?"var(--lime)":churnRate<15?"var(--amber)":"var(--red)"}/>
      <KPI label="Ticket Médio" value={R(avgMRR)} sub="MRR/cliente" color="var(--blue)"/>
      <KPI label="Margem Bruta" value={P(mBruta)} sub="excl. equipe e programas" color="var(--ink)"/>
    </div>
    <div className="g2">
      <div className="card">
        <div className="sh">Score de Saúde</div>
        <div className="ring-wrap">
          <div className="ring" style={{background:`conic-gradient(${hColor} ${health}%, var(--s3) 0)`,boxShadow:`0 0 24px ${hColor}33`}}>
            <div className="ring-inner">
              <div style={{fontSize:28,fontWeight:700,color:hColor,lineHeight:1}}>{health}</div>
              <div style={{fontSize:9,color:"var(--ink2)",letterSpacing:1}}>/ 100</div>
            </div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:20,fontWeight:700,color:hColor,marginBottom:14}}>{hLabel}</div>
            {[{l:"Margem Líquida",v:Math.max(0,mLiq),max:40},{l:"Recorrência",v:totalRec>0?Math.min(100,(mrr/totalRec)*100):0,max:100},{l:"Retenção",v:Math.max(0,100-churnRate*4),max:100}].map(m=>(
              <div key={m.l} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"va
