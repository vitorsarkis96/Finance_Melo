import { useState, useCallback, useMemo } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');`;

const G = `
${GFONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F5F6FA;--s1:#FFFFFF;--s2:#F0F2F8;--s3:#E8EBF4;
  --border:#E2E6F0;--border2:#D0D5E8;
  --lime:#7BC24A;--lime-dim:#7BC24A15;--lime-dim2:#7BC24A35;
  --ink:#1A1D2E;--ink2:#6B7280;--ink3:#9CA3AF;
  --red:#EF4444;--red-dim:#EF444410;
  --amber:#F59E0B;--amber-dim:#F59E0B10;
  --blue:#3B82F6;--blue-dim:#3B82F610;
  --body:'Poppins',sans-serif;--radius:12px;
}
html,body{background:var(--bg);color:var(--ink);font-family:var(--body);min-height:100vh}
input,select,button{font-family:var(--body)}
input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
.wrap{max-width:1320px;margin:0 auto;padding:24px}
.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid var(--border)}
.tabs{display:flex;gap:2px;background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:4px;margin-bottom:24px;overflow-x:auto;box-shadow:0 1px 4px #0000000a}
.tab{padding:9px 20px;border-radius:11px;border:none;background:transparent;color:var(--ink2);cursor:pointer;font-family:var(--body);font-size:13px;font-weight:500;white-space:nowrap;transition:all .18s}
.tab:hover{color:var(--ink)}
.tab.on{background:var(--ink);color:#fff;font-weight:600}
.period-bar{display:flex;align-items:center;gap:10px;background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:12px 18px;margin-bottom:20px;box-shadow:0 1px 4px #0000000a;flex-wrap:wrap}
.period-label{font-size:11px;font-weight:600;color:var(--ink3);letter-spacing:1px;text-transform:uppercase;margin-right:4px}
.period-btn{padding:7px 14px;border-radius:8px;border:1px solid var(--border2);background:var(--s2);color:var(--ink2);font-family:var(--body);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s}
.period-btn:hover{border-color:var(--ink);color:var(--ink)}
.period-btn.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.period-nav{display:flex;align-items:center;gap:6px}
.nav-btn{width:30px;height:30px;border-radius:7px;border:1px solid var(--border2);background:var(--s2);color:var(--ink2);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
.nav-btn:hover{border-color:var(--ink);color:var(--ink)}
.cur-period{font-size:14px;font-weight:700;color:var(--ink);min-width:120px;text-align:center}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:14px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:14px}
.card{background:var(--s1);border:1px solid var(--border);border-radius:var(--radius);padding:22px;box-shadow:0 1px 4px #0000000a}
.card-sm{background:var(--s1);border:1px solid var(--border);border-radius:var(--radius);padding:18px 20px;box-shadow:0 1px 4px #0000000a}
.kpi-label{font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:var(--ink3);margin-bottom:8px;font-weight:600}
.kpi-val{font-size:26px;font-weight:700;line-height:1.1;color:var(--ink)}
.kpi-sub{font-size:11px;color:var(--ink3);margin-top:5px;font-weight:400}
.sh{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink3);font-weight:600;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--border)}
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
.btn-dark{background:var(--ink);color:#fff}
.btn-dark:hover{background:#374151}
.btn-del{background:transparent;color:var(--ink3);border:none;cursor:pointer;font-size:18px;line-height:1;padding:4px 6px;border-radius:4px;transition:color .15s}
.btn-del:hover{color:var(--red)}
.badge{display:inline-block;padding:2px 9px;border-radius:20px;font-size:10px;letter-spacing:.5px;font-weight:600}
.b-lime{background:var(--lime-dim);color:#4a8a28}
.b-red{background:var(--red-dim);color:var(--red)}
.b-amber{background:var(--amber-dim);color:#B45309}
.b-blue{background:var(--blue-dim);color:var(--blue)}
.bar-wrap{display:flex;flex-direction:column;gap:10px}
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
.add-row{background:var(--s2);border:1px dashed var(--border2);border-radius:10px;padding:16px;margin-top:12px}
.add-grid{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end}
.add-grid>div{min-width:80px}
.ring-wrap{display:flex;align-items:center;gap:24px}
.ring{width:100px;height:100px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.ring-inner{background:var(--s1);width:72px;height:72px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 2px 8px #00000012}
/* Chart */
.chart-wrap{display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 4px}
.chart-col{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1}
.chart-bar-group{display:flex;align-items:flex-end;gap:2px;height:130px}
.chart-bar{border-radius:4px 4px 0 0;min-width:10px;transition:height .4s}
.chart-month{font-size:9px;color:var(--ink3);font-weight:600;letter-spacing:.5px}
.chart-legend{display:flex;gap:14px;margin-top:12px;justify-content:center}
.legend-item{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink2)}
.legend-dot{width:8px;height:8px;border-radius:2px}
.empty{text-align:center;padding:32px;color:var(--ink3);font-size:13px}

/* LOGIN */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg)}
.login-box{background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:40px;width:100%;max-width:380px;box-shadow:0 4px 24px #0000000f}
.login-logo{font-size:24px;font-weight:700;letter-spacing:3px;color:var(--ink);margin-bottom:4px}
.login-logo span{color:var(--lime)}
.login-sub{font-size:12px;color:var(--ink3);margin-bottom:32px}
.login-field{margin-bottom:16px}
.login-err{background:var(--red-dim);border:1px solid #EF444425;color:#B91C1C;padding:10px 14px;border-radius:8px;font-size:12px;margin-bottom:14px}
@media(max-width:900px){.g4{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.g4,.g3,.g2{grid-template-columns:1fr}.tabs{flex-wrap:wrap}}
`;

const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const MONTHS_FULL = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const R = (v: any) => isNaN(v) || v === null ? "—" : `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const P = (v: any) => (!isFinite(v) || isNaN(v)) ? "—" : `${v.toFixed(1)}%`;
let uid = 500;
const nid = () => ++uid;

const COST_CATS = [
  { key: "equipe",      label: "Equipe",                  icon: "👥", color: "var(--blue)"  },
  { key: "programas",   label: "Programas & Ferramentas", icon: "🖥️", color: "var(--lime)"  },
  { key: "impostos",    label: "Impostos & Tributos",     icon: "📋", color: "var(--amber)" },
  { key: "alimentacao", label: "Alimentação",             icon: "🍽️", color: "#FF8C69"      },
  { key: "limpeza",     label: "Limpeza & Manutenção",    icon: "🧹", color: "#9B8EFF"      },
  { key: "marketing",   label: "Marketing & Vendas",      icon: "📣", color: "#FF6B9D"      },
  { key: "infra",       label: "Infraestrutura",          icon: "🏢", color: "#4ECDC4"      },
  { key: "outros",      label: "Outros",                  icon: "📦", color: "var(--ink2)"  },
];

const emptyMonth = () => ({
  receitas: [] as any[],
  custos: {
    equipe: [], programas: [], impostos: [], alimentacao: [],
    limpeza: [], marketing: [], infra: [], outros: []
  } as any
});

const INIT_CLIENTES = [
  { id: 100, nome: "KHS Advogados", mrr: 5000, meses: 14, ativo: true },
  { id: 101, nome: "4Research",     mrr: 3500, meses:  8, ativo: true },
  { id: 102, nome: "Aromatici",     mrr: 2800, meses:  5, ativo: true },
  { id: 103, nome: "IPVM",          mrr: 3200, meses:  3, ativo: true },
  { id: 104, nome: "REDCap",        mrr: 2500, meses:  6, ativo: true },
];

function mkKey(y: number, m: number) { return `${y}-${String(m+1).padStart(2,"0")}`; }

function useStore() {
  const [data, setData] = useState<any>(() => {
    try {
      const s = localStorage.getItem("melo_health_v2");
      return s ? JSON.parse(s) : { months: {}, clientes: INIT_CLIENTES };
    } catch { return { months: {}, clientes: INIT_CLIENTES }; }
  });

  const save = useCallback((fn: any) => setData((p: any) => {
    const n = fn(p);
    try { localStorage.setItem("melo_health_v2", JSON.stringify(n)); } catch {}
    return n;
  }), []);

  return [data, save] as const;
}

function getMonth(data: any, key: string) {
  return data.months[key] || emptyMonth();
}


const PWD = "Mv102353!";

function Login({ onLogin }: { onLogin: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  const submit = () => {
    if (val === PWD) {
      sessionStorage.setItem("melo_auth", "1");
      onLogin();
    } else {
      setErr(true);
      setVal("");
    }
  };

  return (
    <>
      <style>{G}</style>
      <div className="login-wrap">
        <div className="login-box">
          <div className="login-logo">MELO <span>HEALTH</span></div>
          <div className="login-sub">Saúde financeira em tempo real</div>
          {err && <div className="login-err">Senha incorreta. Tente novamente.</div>}
          <div className="login-field">
            <div className="field-label">Senha de acesso</div>
            <input
              type="password"
              value={val}
              placeholder="••••••••"
              onChange={e => { setVal(e.target.value); setErr(false); }}
              onKeyDown={e => e.key === "Enter" && submit()}
              autoFocus
            />
          </div>
          <button className="btn btn-dark" style={{ width: "100%", marginTop: 8, padding: "12px" }} onClick={submit}>
            Entrar
          </button>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem("melo_auth") === "1");
  const today = new Date();
  const [data, save] = useStore();
  const [tab, setTab] = useState("dashboard");
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [view, setView] = useState<"mes"|"ano">("mes");
  const [nw, setNw] = useState<any>({});
  const [openCat, setOpenCat] = useState<string|null>(null);

  const key = mkKey(year, month);
  const md = getMonth(data, key);

  // Computed mensal
  const totalRec = md.receitas.reduce((a: number, r: any) => a + +r.val, 0);
  const mrr = md.receitas.filter((r: any) => r.tipo === "recorrente").reduce((a: number, r: any) => a + +r.val, 0);
  const catTotals: any = {};
  COST_CATS.forEach(c => { catTotals[c.key] = (md.custos[c.key]||[]).reduce((a: number, x: any) => a + +x.val, 0); });
  const totalCustos = Object.values(catTotals).reduce((a: any, v: any) => a + v, 0) as number;
  const lucro = totalRec - totalCustos;
  const mLiq = totalRec > 0 ? (lucro / totalRec) * 100 : 0;
  const mBruta = totalRec > 0 ? ((totalRec - catTotals.equipe - catTotals.programas) / totalRec) * 100 : 0;

  // Clientes
  const ativos = data.clientes.filter((c: any) => c.ativo);
  const churned = data.clientes.filter((c: any) => !c.ativo).length;
  const churnRate = data.clientes.length > 0 ? (churned / data.clientes.length) * 100 : 0;
  const avgMRR = ativos.length > 0 ? ativos.reduce((a: number, c: any) => a + +c.mrr, 0) / ativos.length : 0;
  const ltv = churnRate > 0 ? avgMRR / (churnRate / 100) : avgMRR * 24;

  // Score
  let health = 50;
  if (mLiq > 20) health += 20; else if (mLiq > 0) health += 10; else if (totalRec > 0) health -= 25;
  if (churnRate < 5) health += 15; else if (churnRate < 15) health += 5; else health -= 15;
  if (mrr > 10000) health += 10; else if (mrr > 5000) health += 5;
  if (ativos.length >= 5) health += 5;
  health = Math.max(0, Math.min(100, health));
  const hColor = health >= 70 ? "var(--lime)" : health >= 40 ? "var(--amber)" : "var(--red)";
  const hLabel = health >= 70 ? "SAUDÁVEL" : health >= 40 ? "ATENÇÃO" : "CRÍTICO";

  // Anual
  const yearData = useMemo(() => {
    return MONTHS.map((label, mi) => {
      const k = mkKey(year, mi);
      const m = getMonth(data, k);
      const rec = m.receitas.reduce((a: number, r: any) => a + +r.val, 0);
      const costs: any = {};
      COST_CATS.forEach(c => { costs[c.key] = (m.custos[c.key]||[]).reduce((a: number, x: any) => a + +x.val, 0); });
      const cst = Object.values(costs).reduce((a: any, v: any) => a + v, 0) as number;
      return { label, rec, cst, lucro: rec - cst, month: mi };
    });
  }, [data, year]);

  const totalAnualRec = yearData.reduce((a, m) => a + m.rec, 0);
  const totalAnualCst = yearData.reduce((a, m) => a + m.cst, 0);
  const totalAnualLucro = totalAnualRec - totalAnualCst;

  // Mutations
  const addRec = (o: any) => save((p: any) => {
    const m = getMonth(p, key);
    return { ...p, months: { ...p.months, [key]: { ...m, receitas: [...m.receitas, { ...o, id: nid() }] } } };
  });
  const delRec = (id: number) => save((p: any) => {
    const m = getMonth(p, key);
    return { ...p, months: { ...p.months, [key]: { ...m, receitas: m.receitas.filter((x: any) => x.id !== id) } } };
  });
  const updRec = (id: number, f: string, v: any) => save((p: any) => {
    const m = getMonth(p, key);
    return { ...p, months: { ...p.months, [key]: { ...m, receitas: m.receitas.map((x: any) => x.id === id ? { ...x, [f]: v } : x) } } };
  });

  const addCost = (cat: string, o: any) => save((p: any) => {
    const m = getMonth(p, key);
    return { ...p, months: { ...p.months, [key]: { ...m, custos: { ...m.custos, [cat]: [...(m.custos[cat]||[]), { ...o, id: nid() }] } } } };
  });
  const delCost = (cat: string, id: number) => save((p: any) => {
    const m = getMonth(p, key);
    return { ...p, months: { ...p.months, [key]: { ...m, custos: { ...m.custos, [cat]: m.custos[cat].filter((x: any) => x.id !== id) } } } };
  });
  const updCost = (cat: string, id: number, f: string, v: any) => save((p: any) => {
    const m = getMonth(p, key);
    return { ...p, months: { ...p.months, [key]: { ...m, custos: { ...m.custos, [cat]: m.custos[cat].map((x: any) => x.id === id ? { ...x, [f]: v } : x) } } } };
  });

  const addCli = (o: any) => save((p: any) => ({ ...p, clientes: [...p.clientes, { ...o, id: nid() }] }));
  const delCli = (id: number) => save((p: any) => ({ ...p, clientes: p.clientes.filter((x: any) => x.id !== id) }));
  const updCli = (id: number, f: string, v: any) => save((p: any) => ({ ...p, clientes: p.clientes.map((x: any) => x.id === id ? { ...x, [f]: v } : x) }));

  const nwSet = (k: string, f: string, v: any) => setNw((p: any) => ({ ...p, [k]: { ...p[k], [f]: v } }));
  const nwGet = (k: string) => nw[k] || {};
  const nwClr = (k: string) => setNw((p: any) => ({ ...p, [k]: {} }));

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); };

  const maxBar = Math.max(...yearData.map(m => Math.max(m.rec, m.cst)), 1);

  if (!auth) return <Login onLogin={() => setAuth(true)} />;

  return (
    <>
      <style>{G}</style>
      <div className="wrap">
        {/* TOPBAR */}
        <div className="topbar">
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 3, color: "var(--ink)", lineHeight: 1 }}>
              MELO <span style={{ color: "var(--lime)" }}>HEALTH</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--ink2)", marginTop: 4, letterSpacing: ".5px" }}>Saúde financeira em tempo real</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 500, color: "var(--ink2)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--lime)", boxShadow: "0 0 7px var(--lime)", display: "inline-block" }} />
            AO VIVO
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          {[["dashboard","Dashboard"],["receitas","Receitas"],["custos","Custos"],["clientes","Clientes"],["anual","Visão Anual"],["alertas","Alertas"]].map(([k,l]) => (
            <button key={k} className={`tab${tab===k?" on":""}`} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>

        {/* PERIOD BAR — não aparece na visão anual e clientes */}
        {tab !== "anual" && tab !== "clientes" && (
          <div className="period-bar">
            <span className="period-label">Período</span>
            <div className="period-nav">
              <button className="nav-btn" onClick={prevMonth}>‹</button>
              <div className="cur-period">{MONTHS_FULL[month]} {year}</div>
              <button className="nav-btn" onClick={nextMonth}>›</button>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {[2025,2026,2027].map(y => (
                <button key={y} className={`period-btn${year===y?" on":""}`} onClick={()=>setYear(y)}>{y}</button>
              ))}
            </div>
          </div>
        )}

        {tab === "dashboard" && (
          <Dashboard
            totalRec={totalRec} totalCustos={totalCustos} lucro={lucro}
            mLiq={mLiq} mBruta={mBruta} mrr={mrr} catTotals={catTotals}
            ativos={ativos} churnRate={churnRate} avgMRR={avgMRR} ltv={ltv}
            health={health} hColor={hColor} hLabel={hLabel}
            month={month} year={year} totalRec2={totalRec}
          />
        )}
        {tab === "receitas" && (
          <Receitas md={md} mrr={mrr} totalRec={totalRec}
            addRec={addRec} delRec={delRec} updRec={updRec}
            nwGet={nwGet} nwSet={nwSet} nwClr={nwClr} />
        )}
        {tab === "custos" && (
          <Custos md={md} catTotals={catTotals} totalCustos={totalCustos}
            addCost={addCost} delCost={delCost} updCost={updCost}
            openCat={openCat} setOpenCat={setOpenCat}
            nwGet={nwGet} nwSet={nwSet} nwClr={nwClr} />
        )}
        {tab === "clientes" && (
          <Clientes clientes={data.clientes} ltv={ltv} avgMRR={avgMRR}
            ativos={ativos} churnRate={churnRate}
            addCli={addCli} delCli={delCli} updCli={updCli}
            nwGet={nwGet} nwSet={nwSet} nwClr={nwClr} />
        )}
        {tab === "anual" && (
          <Anual yearData={yearData} year={year} setYear={setYear}
            totalAnualRec={totalAnualRec} totalAnualCst={totalAnualCst}
            totalAnualLucro={totalAnualLucro} maxBar={maxBar}
            setTab={setTab} setMonth={setMonth} />
        )}
        {tab === "alertas" && (
          <Alertas lucro={lucro} mLiq={mLiq} churnRate={churnRate}
            mrr={mrr} totalRec={totalRec} ativos={ativos}
            catTotals={catTotals} yearData={yearData} />
        )}
      </div>
    </>
  );
}

function KPI({label,value,sub,color="var(--ink)"}:any){
  return (
    <div className="card-sm">
      <div className="kpi-label">{label}</div>
      <div className="kpi-val" style={{color}}>{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  );
}

function Dashboard({totalRec,totalCustos,lucro,mLiq,mBruta,mrr,catTotals,ativos,churnRate,avgMRR,ltv,health,hColor,hLabel,month,year}:any){
  const isEmpty = totalRec === 0 && totalCustos === 0;
  return (
    <div>
      {isEmpty && (
        <div className="alert al-amber" style={{marginBottom:16}}>
          Nenhum lançamento em {["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][month]} {year}. Vá em Receitas ou Custos para começar.
        </div>
      )}
      <div className="g4">
        <KPI label="Receita Mensal"  value={R(totalRec)}    sub="total de entradas"        color="var(--ink)"/>
        <KPI label="Custo Total"     value={R(totalCustos)} sub="todas as categorias"      color="var(--red)"/>
        <KPI label="Resultado"       value={R(lucro)}       sub={`margem ${P(mLiq)}`}      color={lucro>=0?"var(--lime)":"var(--red)"}/>
        <KPI label="MRR"             value={R(mrr)}         sub="receita recorrente"       color="var(--lime)"/>
      </div>
      <div className="g4">
        <KPI label="LTV Médio"       value={R(ltv)}         sub="por cliente"              color="var(--amber)"/>
        <KPI label="Churn Rate"      value={P(churnRate)}   sub={`${ativos.length} ativos`} color={churnRate<5?"var(--lime)":churnRate<15?"var(--amber)":"var(--red)"}/>
        <KPI label="Ticket Médio"    value={R(avgMRR)}      sub="MRR/cliente"              color="var(--blue)"/>
        <KPI label="Margem Bruta"    value={P(mBruta)}      sub="excl. equipe/programas"   color="var(--ink)"/>
      </div>
      <div className="g2">
        <div className="card">
          <div className="sh">Score de Saúde</div>
          <div className="ring-wrap">
            <div className="ring" style={{background:`conic-gradient(${hColor} ${health}%, var(--s3) 0)`,boxShadow:`0 0 20px ${hColor}33`}}>
              <div className="ring-inner">
                <div style={{fontSize:26,fontWeight:700,color:hColor,lineHeight:1}}>{health}</div>
                <div style={{fontSize:9,color:"var(--ink2)",letterSpacing:1}}>/100</div>
              </div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:18,fontWeight:700,color:hColor,marginBottom:12}}>{hLabel}</div>
              {[
                {l:"Margem Líquida",v:Math.max(0,mLiq),max:40},
                {l:"Recorrência",v:totalRec>0?Math.min(100,(mrr/totalRec)*100):0,max:100},
                {l:"Retenção",v:Math.max(0,100-churnRate*4),max:100},
              ].map(m=>(
                <div key={m.l} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--ink2)",marginBottom:3}}>
                    <span>{m.l}</span><span style={{color:"var(--ink)"}}>{P(m.v)}</span>
                  </div>
                  <div className="prog-track"><div className="prog-fill" style={{width:`${Math.min(100,(m.v/m.max)*100)}%`,background:hColor}}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="sh">Custos por Categoria</div>
          <div className="bar-wrap">
            {COST_CATS.filter(c=>catTotals[c.key]>0).sort((a,b)=>catTotals[b.key]-catTotals[a.key]).map(c=>(
              <div key={c.key} className="bar-row">
                <div className="bar-name">{c.icon} {c.label}</div>
                <div className="bar-track"><div className="bar-fill" style={{width:`${totalCustos>0?(catTotals[c.key]/totalCustos)*100:0}%`,background:c.color}}/></div>
                <div className="bar-val">{R(catTotals[c.key])}</div>
              </div>
            ))}
            {totalCustos===0 && <div className="empty">Nenhum custo lançado</div>}
          </div>
          <hr className="div"/>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div><div className="kpi-label">Total Custos</div><div style={{fontSize:20,fontWeight:700,color:"var(--red)"}}>{R(totalCustos)}</div></div>
            <div style={{textAlign:"right"}}><div className="kpi-label">Resultado</div><div style={{fontSize:20,fontWeight:700,color:lucro>=0?"var(--lime)":"var(--red)"}}>{R(lucro)}</div></div>
          </div>
        </div>
      </div>
      {ativos.length>0&&(
        <div className="card">
          <div className="sh">Clientes Ativos</div>
          <table className="tbl">
            <thead><tr><th>Cliente</th><th>MRR</th><th>LTV Est.</th><th>% Receita</th><th>Status</th></tr></thead>
            <tbody>
              {[...ativos].sort((a:any,b:any)=>b.mrr-a.mrr).map((c:any)=>{
                const cr=churnRate>0?churnRate/100:1/24;
                return <tr key={c.id}>
                  <td style={{fontWeight:500}}>{c.nome}</td>
                  <td style={{color:"var(--lime)"}}>{R(c.mrr)}</td>
                  <td style={{color:"var(--amber)"}}>{R(c.mrr/cr)}</td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:3,background:"var(--s3)",borderRadius:2,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${totalRec>0?(c.mrr/totalRec)*100:0}%`,background:"var(--lime)",borderRadius:2}}/>
                      </div>
                      <span style={{fontSize:11,color:"var(--ink2)",width:36}}>{P(totalRec>0?(c.mrr/totalRec)*100:0)}</span>
                    </div>
                  </td>
                  <td><span className="badge b-lime">ATIVO</span></td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Receitas({md,mrr,totalRec,addRec,delRec,updRec,nwGet,nwSet,nwClr}:any){
  const n=nwGet("rec");
  return (
    <div>
      <div className="g3">
        <KPI label="Receita Total"  value={R(totalRec)}       sub="entradas do mês"  color="var(--ink)"/>
        <KPI label="MRR"            value={R(mrr)}            sub="recorrente"       color="var(--lime)"/>
        <KPI label="One-Time"       value={R(totalRec-mrr)}   sub="pontual/projeto"  color="var(--amber)"/>
      </div>
      <div className="card">
        <div className="sh">Entradas do Mês</div>
        {md.receitas.length>0?(
          <table className="tbl" style={{marginBottom:14}}>
            <thead><tr><th>Descrição</th><th>Tipo</th><th>Valor (R$)</th><th/></tr></thead>
            <tbody>{md.receitas.map((r:any)=>(
              <tr key={r.id}>
                <td><input type="text" value={r.desc} onChange={e=>updRec(r.id,"desc",e.target.value)}/></td>
                <td><select value={r.tipo} onChange={e=>updRec(r.id,"tipo",e.target.value)} style={{width:"auto"}}>
                  <option value="recorrente">Recorrente (MRR)</option>
                  <option value="pontual">Pontual</option>
                  <option value="projeto">Projeto</option>
                </select></td>
                <td><input type="number" value={r.val} onChange={e=>updRec(r.id,"val",+e.target.value||0)} style={{width:130}}/></td>
                <td><button className="btn-del" onClick={()=>delRec(r.id)}>×</button></td>
              </tr>
            ))}</tbody>
          </table>
        ):<div className="empty">Nenhuma entrada lançada</div>}
        <div className="add-row">
          <div style={{fontSize:10,color:"var(--ink3)",letterSpacing:1,marginBottom:10,fontWeight:600}}>+ NOVA ENTRADA</div>
          <div className="add-grid">
            <div style={{flex:3,minWidth:160}}><div className="field-label">Descrição</div><input type="text" value={n.desc||""} placeholder="Ex: Retainer cliente" onChange={e=>nwSet("rec","desc",e.target.value)}/></div>
            <div style={{flex:2,minWidth:120}}><div className="field-label">Tipo</div>
              <select value={n.tipo||"recorrente"} onChange={e=>nwSet("rec","tipo",e.target.value)}>
                <option value="recorrente">Recorrente (MRR)</option>
                <option value="pontual">Pontual</option>
                <option value="projeto">Projeto</option>
              </select>
            </div>
            <div style={{flex:1,minWidth:100}}><div className="field-label">Valor (R$)</div><input type="number" value={n.val||""} placeholder="0,00" onChange={e=>nwSet("rec","val",+e.target.value||0)}/></div>
            <button className="btn btn-dark" style={{alignSelf:"flex-end"}} onClick={()=>{if(n.desc){addRec({desc:n.desc,tipo:n.tipo||"recorrente",val:n.val||0});nwClr("rec");}}}>Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Custos({md,catTotals,totalCustos,addCost,delCost,updCost,openCat,setOpenCat,nwGet,nwSet,nwClr}:any){
  return (
    <div>
      <div className="g4" style={{marginBottom:14}}>
        <KPI label="Total Custos" value={R(totalCustos)} color="var(--red)"/>
        {COST_CATS.slice(0,3).map(c=><KPI key={c.key} label={c.label} value={R(catTotals[c.key])} color={c.color}/>)}
      </div>
      <div className="g4" style={{marginBottom:20}}>
        {COST_CATS.slice(3,7).map(c=><KPI key={c.key} label={c.label} value={R(catTotals[c.key])} color={c.color}/>)}
        <KPI label="Outros" value={R(catTotals.outros)} color="var(--ink2)"/>
      </div>
      {COST_CATS.map(cat=>{
        const items=md.custos[cat.key]||[];
        const total=catTotals[cat.key]||0;
        const isOpen=openCat===cat.key;
        const n=nwGet(`cost_${cat.key}`);
        return (
          <div key={cat.key} className="card" style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}} onClick={()=>setOpenCat(isOpen?null:cat.key)}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:18}}>{cat.icon}</span>
                <div style={{fontWeight:600,fontSize:14}}>{cat.label}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:18,fontWeight:700,color:cat.color}}>{R(total)}</div>
                  <div style={{fontSize:10,color:"var(--ink3)",letterSpacing:1}}>{items.length} item{items.length!==1?"s":""}</div>
                </div>
                <div style={{color:"var(--ink2)",fontSize:18,transform:isOpen?"rotate(180deg)":"none",transition:"transform .2s"}}>›</div>
              </div>
            </div>
            {isOpen&&(
              <div style={{marginTop:14}}>
                <hr className="div" style={{margin:"0 0 12px"}}/>
                {items.length>0&&(
                  <table className="tbl" style={{marginBottom:12}}>
                    <thead><tr><th>Descrição</th><th>Valor (R$)</th><th/></tr></thead>
                    <tbody>{items.map((x:any)=>(
                      <tr key={x.id}>
                        <td><input type="text" value={x.desc} onChange={e=>updCost(cat.key,x.id,"desc",e.target.value)}/></td>
                        <td><input type="number" value={x.val} onChange={e=>updCost(cat.key,x.id,"val",+e.target.value||0)} style={{width:130}}/></td>
                        <td><button className="btn-del" onClick={()=>delCost(cat.key,x.id)}>×</button></td>
                      </tr>
                    ))}</tbody>
                  </table>
                )}
                <div className="add-row" style={{marginTop:0}}>
                  <div style={{fontSize:10,color:"var(--ink3)",letterSpacing:1,marginBottom:10,fontWeight:600}}>+ NOVO ITEM</div>
                  <div className="add-grid">
                    <div style={{flex:3,minWidth:140}}><div className="field-label">Descrição</div><input type="text" value={n.desc||""} placeholder={`Ex: ${cat.label}`} onChange={e=>nwSet(`cost_${cat.key}`,"desc",e.target.value)}/></div>
                    <div style={{flex:1,minWidth:100}}><div className="field-label">Valor (R$)</div><input type="number" value={n.val||""} placeholder="0,00" onChange={e=>nwSet(`cost_${cat.key}`,"val",+e.target.value||0)}/></div>
                    <button className="btn btn-dark" style={{alignSelf:"flex-end"}} onClick={()=>{if(n.desc){addCost(cat.key,{desc:n.desc,val:n.val||0});nwClr(`cost_${cat.key}`)}}}>Adicionar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Clientes({clientes,ltv,avgMRR,ativos,churnRate,addCli,delCli,updCli,nwGet,nwSet,nwClr}:any){
  const n=nwGet("cli");
  const cr=churnRate>0?churnRate/100:1/24;
  return (
    <div>
      <div style={{fontSize:11,color:"var(--ink3)",marginBottom:16,background:"var(--s2)",padding:"10px 14px",borderRadius:8,border:"1px solid var(--border)"}}>
        Clientes são globais — não variam por mês. O MRR deles é usado no cálculo de saúde.
      </div>
      <div className="g4">
        <KPI label="Clientes Ativos"    value={ativos.length}  sub="na carteira"        color="var(--lime)"/>
        <KPI label="LTV Médio"          value={R(ltv)}         sub="lifetime value"     color="var(--amber)"/>
        <KPI label="Ticket Médio (MRR)" value={R(avgMRR)}      sub="por cliente ativo"  color="var(--blue)"/>
        <KPI label="Churn Rate"         value={P(churnRate)}   sub="% perdidos"         color={churnRate<5?"var(--lime)":churnRate<15?"var(--amber)":"var(--red)"}/>
      </div>
      <div className="card">
        <div className="sh">Base de Clientes</div>
        {clientes.length>0?(
          <table className="tbl" style={{marginBottom:14}}>
            <thead><tr><th>Nome</th><th>MRR</th><th>Meses Ativo</th><th>LTV Est.</th><th>Status</th><th/></tr></thead>
            <tbody>{clientes.map((c:any)=>(
              <tr key={c.id}>
                <td><input type="text" value={c.nome} onChange={e=>updCli(c.id,"nome",e.target.value)} style={{width:160}}/></td>
                <td><input type="number" value={c.mrr} onChange={e=>updCli(c.id,"mrr",+e.target.value||0)} style={{width:100}}/></td>
                <td><input type="number" value={c.meses} onChange={e=>updCli(c.id,"meses",+e.target.value||0)} style={{width:70}}/></td>
                <td style={{color:"var(--amber)"}}>{R(c.mrr/cr)}</td>
                <td><select value={c.ativo?"ativo":"churned"} onChange={e=>updCli(c.id,"ativo",e.target.value==="ativo")} style={{width:"auto"}}>
                  <option value="ativo">Ativo</option>
                  <option value="churned">Churned</option>
                </select></td>
                <td><button className="btn-del" onClick={()=>delCli(c.id)}>×</button></td>
              </tr>
            ))}</tbody>
          </table>
        ):<div className="empty">Nenhum cliente cadastrado</div>}
        <div className="add-row">
          <div style={{fontSize:10,color:"var(--ink3)",letterSpacing:1,marginBottom:10,fontWeight:600}}>+ NOVO CLIENTE</div>
          <div className="add-grid">
            {[{k:"nome",l:"Nome",t:"text",f:3,ph:"Nome do cliente"},{k:"mrr",l:"MRR (R$)",t:"number",f:2,ph:"0"},{k:"meses",l:"Meses Ativo",t:"number",f:1,ph:"0"}].map((f:any)=>(
              <div key={f.k} style={{flex:f.f,minWidth:80}}><div className="field-label">{f.l}</div><input type={f.t} value={n[f.k]||""} placeholder={f.ph} onChange={e=>nwSet("cli",f.k,f.t==="number"?+e.target.value||0:e.target.value)}/></div>
            ))}
            <button className="btn btn-dark" style={{alignSelf:"flex-end"}} onClick={()=>{if(n.nome){addCli({nome:n.nome,mrr:n.mrr||0,meses:n.meses||0,ativo:true});nwClr("cli");}}}>Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Anual({yearData,year,setYear,totalAnualRec,totalAnualCst,totalAnualLucro,maxBar,setTab,setMonth}:any){
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <div style={{fontSize:20,fontWeight:700,color:"var(--ink)"}}>Visão Anual</div>
        <div style={{marginLeft:"auto",display:"flex",gap:6}}>
          {[2025,2026,2027].map(y=>(
            <button key={y} className={`period-btn${year===y?" on":""}`} onClick={()=>setYear(y)}>{y}</button>
          ))}
        </div>
      </div>

      {/* KPIs anuais */}
      <div className="g3">
        <KPI label="Receita Total Anual"  value={R(totalAnualRec)}   sub={`${year}`}               color="var(--ink)"/>
        <KPI label="Custos Totais Anuais" value={R(totalAnualCst)}   sub={`${year}`}               color="var(--red)"/>
        <KPI label="Resultado Anual"      value={R(totalAnualLucro)} sub={`margem ${P(totalAnualRec>0?(totalAnualLucro/totalAnualRec)*100:0)}`} color={totalAnualLucro>=0?"var(--lime)":"var(--red)"}/>
      </div>

      {/* Gráfico de barras */}
      <div className="card" style={{marginBottom:14}}>
        <div className="sh">Receita × Custo × Resultado — {year}</div>
        <div className="chart-wrap">
          {yearData.map((m:any)=>(
            <div key={m.label} className="chart-col" onClick={()=>{setMonth(m.month);setTab("dashboard");}}>
              <div className="chart-bar-group" style={{cursor:"pointer"}}>
                <div className="chart-bar" style={{height:`${(m.rec/maxBar)*120}px`,width:16,background:"var(--lime)",opacity:.85,borderRadius:"4px 4px 0 0"}} title={`Receita: ${R(m.rec)}`}/>
                <div className="chart-bar" style={{height:`${(m.cst/maxBar)*120}px`,width:16,background:"var(--red)",opacity:.7,borderRadius:"4px 4px 0 0"}} title={`Custo: ${R(m.cst)}`}/>
              </div>
              <div className="chart-month">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <div className="legend-item"><div className="legend-dot" style={{background:"var(--lime)"}}/> Receita</div>
          <div className="legend-item"><div className="legend-dot" style={{background:"var(--red)"}}/> Custo</div>
        </div>
      </div>

      {/* Tabela comparativa */}
      <div className="card">
        <div className="sh">Comparativo Mensal — {year}</div>
        <table className="tbl">
          <thead>
            <tr><th>Mês</th><th>Receita</th><th>Custos</th><th>Resultado</th><th>Margem</th></tr>
          </thead>
          <tbody>
            {yearData.map((m:any)=>{
              const mg = m.rec>0?(m.lucro/m.rec)*100:0;
              const hasData = m.rec>0||m.cst>0;
              return (
                <tr key={m.label} style={{opacity:hasData?1:.4,cursor:"pointer"}} onClick={()=>{setMonth(m.month);setTab("dashboard");}}>
                  <td style={{fontWeight:600}}>{m.label}</td>
                  <td style={{color:"var(--lime)"}}>{hasData?R(m.rec):"—"}</td>
                  <td style={{color:"var(--red)"}}>{hasData?R(m.cst):"—"}</td>
                  <td style={{color:m.lucro>=0?"var(--lime)":"var(--red)",fontWeight:600}}>{hasData?R(m.lucro):"—"}</td>
                  <td>
                    {hasData?(
                      <span className={`badge ${mg>=20?"b-lime":mg>=0?"b-amber":"b-red"}`}>{P(mg)}</span>
                    ):"—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{fontWeight:700,borderTop:"2px solid var(--border)"}}>
              <td style={{padding:"12px",fontWeight:700}}>TOTAL</td>
              <td style={{padding:"12px",color:"var(--lime)",fontWeight:700}}>{R(totalAnualRec)}</td>
              <td style={{padding:"12px",color:"var(--red)",fontWeight:700}}>{R(totalAnualCst)}</td>
              <td style={{padding:"12px",color:totalAnualLucro>=0?"var(--lime)":"var(--red)",fontWeight:700}}>{R(totalAnualLucro)}</td>
              <td style={{padding:"12px"}}><span className={`badge ${totalAnualRec>0&&(totalAnualLucro/totalAnualRec)>=0.2?"b-lime":totalAnualLucro>=0?"b-amber":"b-red"}`}>{P(totalAnualRec>0?(totalAnualLucro/totalAnualRec)*100:0)}</span></td>
            </tr>
          </tfoot>
        </table>
        <div style={{fontSize:11,color:"var(--ink3)",marginTop:12}}>Clique em qualquer mês para abrir o dashboard daquele período.</div>
      </div>
    </div>
  );
}

function Alertas({lucro,mLiq,churnRate,mrr,totalRec,ativos,catTotals,yearData}:any){
  const alerts:any[]=[];
  if(totalRec===0) alerts.push({t:"amber",m:"Nenhuma receita lançada neste mês. Adicione as entradas na aba Receitas."});
  else {
    if(lucro<0) alerts.push({t:"red",m:`Operação no prejuízo de ${R(Math.abs(lucro))}. Custos superam receitas em ${P(Math.abs(mLiq))}.`});
    if(mLiq<15&&mLiq>=0) alerts.push({t:"amber",m:`Margem líquida em ${P(mLiq)} — abaixo dos 20% recomendados para agências.`});
  }
  if(churnRate>10) alerts.push({t:"red",m:`Churn crítico: ${P(churnRate)}. Revise a carteira de clientes.`});
  else if(churnRate>5) alerts.push({t:"amber",m:`Churn moderado: ${P(churnRate)}. Monitore satisfação e entrega.`});
  if(mrr<totalRec*0.5&&totalRec>0) alerts.push({t:"amber",m:`Apenas ${P((mrr/totalRec)*100)} da receita é recorrente. Priorize retainers.`});
  if(ativos.length<4) alerts.push({t:"amber",m:`${ativos.length} clientes ativos — concentração de risco alta.`});
  const equipeRatio=totalRec>0?(catTotals.equipe/totalRec)*100:0;
  if(equipeRatio>50) alerts.push({t:"amber",m:`Custo de equipe representa ${P(equipeRatio)} da receita — acima do ideal de 40%.`});
  if(alerts.length===0) alerts.push({t:"lime",m:"Todos os indicadores dentro dos parâmetros saudáveis."});

  const cls:any={red:"al-red",amber:"al-amber",lime:"al-lime"};
  const mesesComLucro = yearData.filter((m:any)=>m.lucro>0).length;

  return (
    <div>
      <div className="g2">
        <div>
          <div className="card" style={{marginBottom:14}}>
            <div className="sh">Alertas do Mês</div>
            {alerts.map((a:any,i:number)=><div key={i} className={`alert ${cls[a.t]}`}>{a.m}</div>)}
          </div>
        </div>
        <div>
          <div className="card">
            <div className="sh">Benchmarks para Agências</div>
            <table className="tbl">
              <thead><tr><th>Métrica</th><th>Atual</th><th>Meta</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  {l:"Margem Líquida",   v:P(mLiq),       meta:"> 25%", ok:mLiq>25},
                  {l:"Churn Rate",       v:P(churnRate),  meta:"< 3%",  ok:churnRate<3},
                  {l:"Clientes Ativos",  v:ativos.length, meta:"≥ 6",   ok:ativos.length>=6},
                  {l:"% Recorrente",     v:P(totalRec>0?(mrr/totalRec)*100:0), meta:"> 70%", ok:totalRec>0&&(mrr/totalRec)>0.7},
                  {l:"Meses Lucrativos", v:`${mesesComLucro}/12`, meta:"≥ 10", ok:mesesComLucro>=10},
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
          </div>
        </div>
      </div>
      <div className="card">
        <div className="sh">Como usar o Melo Health</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[
            "Abra o app todo mês e lance as entradas em Receitas",
            "Lance todos os custos por categoria em Custos",
            "Acompanhe o resultado no Dashboard daquele mês",
            "Use Visão Anual para comparar todos os meses do ano",
            "Atualize os clientes quando tiver entrada ou saída na carteira",
            "Consulte Alertas para saber o que precisa de atenção",
          ].map((t,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"10px 14px",background:"var(--s2)",borderRadius:8,border:"1px solid var(--border)"}}>
              <span style={{color:"var(--lime)",fontWeight:700,flexShrink:0}}>→</span>
              <span style={{fontSize:12,color:"var(--ink2)",lineHeight:1.5}}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
