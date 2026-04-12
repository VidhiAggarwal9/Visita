// ── frontend/src/components/HowItWorks.jsx ───────────────────
import { C } from "../constants/theme";

const STEPS = [
  { n:"01", title:"Upload your file",    desc:"Drag & drop CSV or Excel, or load our sample dataset to explore instantly." },
  { n:"02", title:"Auto-clean & process", desc:"Engine cleans data, detects columns, computes all KPIs in milliseconds." },
  { n:"03", title:"Explore dashboard",   desc:"Browse KPIs, hover charts, and filter by hotel type with one click." },
  { n:"04", title:"Read AI insights",    desc:"Gemini AI analyzes your data and writes 6 actionable insights tailored to it." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background:C.bg2, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"80px 24px" }}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <div style={{ fontSize:12, color:C.accent, letterSpacing:2, textTransform:"uppercase", marginBottom:10, fontWeight:600 }}>How It Works</div>
        <h2 style={{ fontSize:"clamp(22px,4vw,32px)", fontWeight:700, color:C.navy }}>Four steps to full analytics</h2>
      </div>
      <div className="steps-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20, maxWidth:980, margin:"0 auto" }}>
        {STEPS.map(s => (
          <div key={s.n} className="card" style={{ padding:"28px 24px" }}>
            <div style={{ fontSize:36, fontWeight:800, marginBottom:14, background:`linear-gradient(135deg,${C.accent},${C.teal})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.n}</div>
            <div style={{ fontSize:15, fontWeight:600, color:C.navy, marginBottom:8 }}>{s.title}</div>
            <div style={{ fontSize:13, color:C.textMid, lineHeight:1.72 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}