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
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--ink2)",marginBottom:4}}><span>{m.l}</span><span style={{color:"var(--ink)"}}>{P(m.v)}</span></div>
                <div className="prog-track"><div className="prog-fill" style={{width:`${Math.min(100,(m.v/m.max)*100)}%`,background:hColor}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="sh">Custos por Categoria</div>
        <div className="bar-wrap">
          {COST_CATS.filter((c:any)=>catTotals[c.key]>0).sort((a:any,b:any)=>catTotals[b.key]-catTotals[a.key]).map((c:any)=>(
            <div key={c.key} className="bar-row">
              <div className="bar-name">{c.icon} {c.label}</div>
              <div className="bar-track"><div className="bar-fill" style={{width:`${totalCustos>0?(catTotals[c.key]/totalCustos)*100:0}%`,background:c.color}}/></div>
              <div className="bar-val">{R(catTotals[c.key])}</div>
            </div>
          ))}
        </div>
        <hr className="div"/>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div><div className="kpi-label">Total Custos</div><div style={{fontSize:22,fontWeight:700,color:"var(--red)"}}>{R(totalCustos)}</div></div>
          <div style={{textAlign:"right"}}><div className="kpi-label">Resultado</div><div style={{fontSize:22,fontWeight:700,color:lucro>=0?"var(--lime)":"var(--red)"}}>{R(lucro)}</div></div>
        </div>
      </div>
    </div>
    {ativos.length>0&&<div className="card" style={{marginTop:14}}>
      <div className="sh">Clientes Ativos — Concentração de Receita</div>
      <table className="tbl">
        <thead><tr><th>Cliente</th><th>MRR</th><th>Meses</th><th>LTV Est.</th><th>% Receita</th><th>Status</th></tr></thead>
        <tbody>
          {[...ativos].sort((a:any,b:any)=>b.mrr-a.mrr).map((c:any)=>{
            const cr=churnRate>0?churnRate/100:1/24;
            return <tr key={c.id}>
              <td style={{fontWeight:500}}>{c.nome}</td>
              <td style={{color:"var(--lime)"}}>{R(c.mrr)}</td>
              <td style={{color:"var(--ink2)"}}>{c.meses}m</td>
              <td style={{color:"var(--amber)"}}>{R(c.mrr/cr)}</td>
              <td><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:3,background:"var(--s3)",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${totalRec>0?(c.mrr/totalRec)*100:0}%`,background:"var(--lime)",borderRadius:2}}/></div><span style={{fontSize:11,color:"var(--ink2)",width:36}}>{P(totalRec>0?(c.mrr/totalRec)*100:0)}</span></div></td>
              <td><span className="badge b-lime">ATIVO</span></td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>}
  </div>;
}

function TabRec({d,mrr,totalRec,addRec,delRec,updRec,nwSet,nwGet,nwClr}:any){
  const n=nwGet("rec");
  return <div>
    <div className="g3">
      <KPI label="Receita Total" value={R(totalRec)} sub="entradas do mês" color="var(--ink)"/>
      <KPI label="MRR" value={R(mrr)} sub="recorrente" color="var(--lime)"/>
      <KPI label="One-Time" value={R(totalRec-mrr)} sub="pontual/projeto" color="var(--amber)"/>
    </div>
    <div className="card">
      <div className="sh">Entradas do Mês</div>
      {d.receitas.length>0&&<table className="tbl" style={{marginBottom:16}}>
        <thead><tr><th>Descrição</th><th>Tipo</th><th>Valor</th><th/></tr></thead>
        <tbody>{d.receitas.map((r:any)=>(
          <tr key={r.id}>
            <td><input type="text" value={r.desc} onChange={e=>updRec(r.id,"desc",e.target.value)}/></td>
            <td><select value={r.tipo} onChange={e=>updRec(r.id,"tipo",e.target.value)} style={{width:"auto"}}><option value="recorrente">Recorrente (MRR)</option><option value="pontual">Pontual</option><option value="projeto">Projeto</option></select></td>
            <td><input type="number" value={r.val} onChange={e=>updRec(r.id,"val",+e.target.value||0)} style={{width:130}}/></td>
            <td><button className="btn-del" onClick={()=>delRec(r.id)}>×</button></td>
          </tr>
        ))}</tbody>
      </table>}
      <div className="add-row">
        <div style={{fontSize:10,color:"var(--ink2)",letterSpacing:1,marginBottom:10}}>+ NOVA ENTRADA</div>
        <div className="add-grid">
          <div style={{flex:3,minWidth:160}}><div className="field-label">Descrição</div><input type="text" value={n.desc||""} placeholder="Ex: Retainer cliente" onChange={e=>nwSet("rec","desc",e.target.value)}/></div>
          <div style={{flex:2,minWidth:120}}><div className="field-label">Tipo</div><select value={n.tipo||"recorrente"} onChange={e=>nwSet("rec","tipo",e.target.value)}><option value="recorrente">Recorrente (MRR)</option><option value="pontual">Pontual</option><option value="projeto">Projeto</option></select></div>
          <div style={{flex:1,minWidth:100}}><div className="field-label">Valor (R$)</div><input type="number" value={n.val||""} placeholder="0,00" onChange={e=>nwSet("rec","val",+e.target.value||0)}/></div>
          <button className="btn btn-lime" style={{alignSelf:"flex-end"}} onClick={()=>{if(n.desc){addRec({desc:n.desc,tipo:n.tipo||"recorrente",val:n.val||0});nwClr("rec");}}}>Adicionar</button>
        </div>
      </div>
    </div>
  </div>;
}

function TabCost({d,catTotals,totalCustos,addCost,delCost,updCost,nwSet,nwGet,nwClr}:any){
  const [openCat,setOpenCat]=useState<string|null>(null);
  return <div>
    <div className="g4" style={{marginBottom:16}}>
      <KPI label="Total Custos" value={R(totalCustos)} color="var(--red)"/>
      {COST_CATS.slice(0,3).map(c=><KPI key={c.key} label={c.label} value={R(catTotals[c.key])} color={c.color}/>)}
    </div>
    <div className="g4" style={{marginBottom:20}}>
      {COST_CATS.slice(3,7).map(c=><KPI key={c.key} label={c.label} value={R(catTotals[c.key])} color={c.color}/>)}
      <KPI label="Outros" value={R(catTotals.outros)} color="var(--ink2)"/>
    </div>
    {COST_CATS.map(cat=>{
      const items=d.custos[cat.key]||[];
      const total=catTotals[cat.key]||0;
      const isOpen=openCat===cat.key;
      const n=nwGet(`cost_${cat.key}`);
      return <div key={cat.key} className="card" style={{marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}} onClick={()=>setOpenCat(isOpen?null:cat.key)}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>{cat.icon}</span>
            <div><div style={{fontWeight:600,fontSize:14}}>{cat.label}</div><div style={{fontSize:11,color:"var(--ink2)",marginTop:1}}>{cat.desc}</div></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:700,color:cat.color}}>{R(total)}</div><div style={{fontSize:10,color:"var(--ink2)",letterSpacing:1}}>{items.length} item{items.length!==1?"s":""}</div></div>
            <div style={{color:"var(--ink2)",fontSize:18,transform:isOpen?"rotate(180deg)":"none",transition:"transform .2s"}}>›</div>
          </div>
        </div>
        {isOpen&&<div style={{marginTop:16}}>
          <hr className="div" style={{margin:"0 0 14px"}}/>
          {items.length>0&&<table className="tbl" style={{marginBottom:12}}>
            <thead><tr><th>Descrição</th><th>Valor (R$)</th><th/></tr></thead>
            <tbody>{items.map((x:any)=>(
              <tr key={x.id}>
                <td><input type="text" value={x.desc} onChange={e=>updCost(cat.key,x.id,"desc",e.target.value)}/></td>
                <td><input type="number" value={x.val} onChange={e=>updCost(cat.key,x.id,"val",+e.target.value||0)} style={{width:130}}/></td>
                <td><button className="btn-del" onClick={()=>delCost(cat.key,x.id)}>×</button></td>
              </tr>
            ))}</tbody>
          </table>}
          <div className="add-row" style={{marginTop:0}}>
            <div style={{fontSize:10,color:"var(--ink2)",letterSpacing:1,marginBottom:10}}>+ NOVO ITEM</div>
            <div className="add-grid">
              <div style={{flex:3,minWidth:140}}><div className="field-label">Descrição</div><input type="text" value={n.desc||""} placeholder={cat.desc.split(",")[0]} onChange={e=>nwSet(`cost_${cat.key}`,"desc",e.target.value)}/></div>
              <div style={{flex:1,minWidth:100}}><div className="field-label">Valor (R$)</div><input type="number" value={n.val||""} placeholder="0,00" onChange={e=>nwSet(`cost_${cat.key}`,"val",+e.target.value||0)}/></div>
              <button className="btn btn-lime" style={{alignSelf:"flex-end"}} onClick={()=>{if(n.desc){addCost(cat.key,{desc:n.desc,val:n.val||0});nwClr(`cost_${cat.key}`)}}}>Adicionar</button>
            </div>
          </div>
        </div>}
      </div>;
    })}
  </div>;
}

function TabCli({d,ltv,avgMRR,ativos,churnRate,totalRec,addCli,delCli,updCli,nwSet,nwGet,nwClr}:any){
  const n=nwGet("cli");
  const cr=churnRate>0?churnRate/100:1/24;
  return <div>
    <div className="g4">
      <KPI label="Clientes Ativos" value={ativos.length} sub="na carteira" color="var(--lime)"/>
      <KPI label="LTV Médio" value={R(ltv)} sub="lifetime value" color="var(--amber)"/>
      <KPI label="Ticket Médio (MRR)" value={R(avgMRR)} sub="por cliente ativo" color="var(--blue)"/>
      <KPI label="Churn Rate" value={P(churnRate)} sub="% perdidos" color={churnRate<5?"var(--lime)":churnRate<15?"var(--amber)":"var(--red)"}/>
    </div>
    <div className="card">
      <div className="sh">Base de Clientes</div>
      <table className="tbl" style={{marginBottom:14}}>
        <thead><tr><th>Nome</th><th>MRR</th><th>Meses</th><th>LTV Est.</th><th>% Rec.</th><th>Status</th><th/></tr></thead>
        <tbody>{d.clientes.map((c:any)=>(
          <tr key={c.id}>
            <td><input type="text" value={c.nome} onChange={e=>updCli(c.id,"nome",e.target.value)} style={{width:160}}/></td>
            <td><input type="number" value={c.mrr} onChange={e=>updCli(c.id,"mrr",+e.target.value||0)} style={{width:100}}/></td>
            <td><input type="number" value={c.meses} onChange={e=>updCli(c.id,"meses",+e.target.value||0)} style={{width:60}}/></td>
            <td style={{color:"var(--amber)"}}>{R(c.mrr/cr)}</td>
            <td style={{color:"var(--ink2)",fontSize:11}}>{P(totalRec>0?(c.mrr/totalRec)*100:0)}</td>
            <td><select value={c.ativo?"ativo":"churned"} onChange={e=>updCli(c.id,"ativo",e.target.value==="ativo")} style={{width:"auto"}}><option value="ativo">Ativo</option><option value="churned">Churned</option></select></td>
            <td><button className="btn-del" onClick={()=>delCli(c.id)}>×</button></td>
          </tr>
        ))}</tbody>
      </table>
      <div className="add-row">
        <div style={{fontSize:10,color:"var(--ink2)",letterSpacing:1,marginBottom:10}}>+ NOVO CLIENTE</div>
        <div className="add-grid">
          {[{k:"nome",l:"Nome",t:"text",f:3,ph:"Nome do cliente"},{k:"mrr",l:"MRR (R$)",t:"number",f:2,ph:"0"},{k:"meses",l:"Meses Ativo",t:"number",f:1,ph:"0"}].map((f:any)=>(
            <div key={f.k} style={{flex:f.f,minWidth:80}}><div className="field-label">{f.l}</div><input type={f.t} value={n[f.k]||""} placeholder={f.ph} onChange={e=>nwSet("cli",f.k,f.t==="number"?+e.target.value||0:e.target.value)}/></div>
          ))}
          <button className="btn btn-lime" style={{alignSelf:"flex-end"}} onClick={()=>{if(n.nome){addCli({nome:n.nome,mrr:n.mrr||0,meses:n.meses||0,ativo:true});nwClr("cli");}}}>Adicionar</button>
        </div>
      </div>
    </div>
  </div>;
}

function TabAlerts({lucro,mLiq,churnRate,mrr,totalRec,ativos,totalCustos,catTotals}:any){
  const alerts:any[]=[];
  if(lucro<0) alerts.push({t:"red",m:`Operação no prejuízo de ${R(Math.abs(lucro))}. Custos superam receitas em ${P(Math.abs(mLiq))}.`});
  if(mLiq<15&&mLiq>=0) alerts.push({t:"amber",m:`Margem líquida em ${P(mLiq)} — abaixo dos 20% recomendados para agências.`});
  if(churnRate>10) alerts.push({t:"red",m:`Churn crítico: ${P(churnRate)}. Você perde ${R(mrr/ativos.length||0)}/mês por cliente.`});
  else if(churnRate>5) alerts.push({t:"amber",m:`Churn moderado: ${P(churnRate)}. Monitore NPS e entrega de resultados.`});
  if(mrr<totalRec*0.5&&totalRec>0) alerts.push({t:"amber",m:`Apenas ${P((mrr/totalRec)*100)} da receita é recorrente. Priorize retainers.`});
  if(ativos.length<4) alerts.push({t:"amber",m:`${ativos.length} clientes ativos — concentração de risco alta.`});
  const equipeRatio=totalRec>0?(catTotals.equipe/totalRec)*100:0;
  if(equipeRatio>50) alerts.push({t:"amber",m:`Custo de equipe representa ${P(equipeRatio)} da receita — acima do ideal de 40%.`});
  if(alerts.length===0) alerts.push({t:"lime",m:"Todos os indicadores dentro dos parâmetros saudáveis."});
  const recs=[
    {text:`MRR atual ${R(mrr)} — próxima meta: ${R(mrr*1.2)} (+20%)`},
    {text:"Mínimo ideal: 6 clientes ativos para diluir risco de concentração"},
    {text:"Margem líquida alvo para agências: 25–35%"},
    {text:"Churn saudável: < 3% ao mês. Onboarding e entrega são a chave"},
    {text:"LTV:CAC alvo de 3:1. Calcule seu CAC por canal para validar"},
    {text:"Ferramentas e programas: manter abaixo de 5% da receita"},
  ];
  const cls:any={red:"al-red",amber:"al-amber",lime:"al-lime",blue:"al-blue"};
  return <div>
    <div className="g2">
      <div><div className="card" style={{marginBottom:14}}>
        <div className="sh">Alertas Ativos</div>
        {alerts.map((a,i)=><div key={i} className={`alert ${cls[a.t]}`}>{a.m}</div>)}
      </div></div>
      <div><div className="card">
        <div className="sh">Benchmarks para Agências</div>
        <table className="tbl">
          <thead><tr><th>Métrica</th><th>Atual</th><th>Meta</th><th>Status</th></tr></thead>
          <tbody>
            {[
              {l:"Margem Líquida",v:P(mLiq),meta:"> 25%",ok:mLiq>25},
              {l:"Churn Rate",v:P(churnRate),meta:"< 3%",ok:churnRate<3},
              {l:"Clientes Ativos",v:ativos.length,meta:"≥ 6",ok:ativos.length>=6},
              {l:"% Recorrente",v:P(totalRec>0?(mrr/totalRec)*100:0),meta:"> 70%",ok:totalRec>0&&(mrr/totalRec)>0.7},
              {l:"Custo Equipe/Rec",v:P(equipeRatio),meta:"< 40%",ok:equipeRatio<40},
            ].map((r:any)=>(
              <tr key={r.l}>
                <td style={{fontWeight:500}}>{r.l}</td>
                <td style={{color:r.ok?"var(--lime)":"var(--amber)"}}>{r.v}</td>
                <td style={{color:"var(--ink2)",fontSize:12}}>{r.meta}</td>
                <td><span className={`badge ${r.ok?"b-lime":"b-amber"}`}>{r.ok?"OK":"REVISAR"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></div>
    </div>
    <div className="card">
      <div className="sh">Recomendações Estratégicas</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {recs.map((r,i)=>(
          <div key={i} style={{display:"flex",gap:10,padding:"10px 14px",background:"var(--s2)",borderRadius:8,border:"1px solid var(--border)"}}>
            <span style={{color:"var(--lime)",fontWeight:700,flexShrink:0}}>→</span>
            <span style={{fontSize:12,color:"var(--ink2)",lineHeight:1.5}}>{r.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>;
}
