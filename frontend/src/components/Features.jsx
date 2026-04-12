


// ── frontend/src/components/Features.jsx ─────────────────────
import { C } from "../constants/theme";

const FEATS = [
  { icon:"📊", title:"KPI Dashboard",        desc:"View Total Bookings, Revenue, Cancellation Rate, and ADR at a glance." },
  { icon:"📈", title:"Interactive Charts",    desc:"Revenue trends, booking distribution, cancellations, and ADR comparisons." },
  { icon:"🤖", title:"AI-Generated Insights", desc:"Gemini AI reads your dataset and writes 6 specific plain-English insights." },
  { icon:"🔍", title:"Smart Filtering",       desc:"Filter the entire dashboard by hotel type with one click." },
  { icon:"🧹", title:"Auto Data Cleaning",    desc:"Missing values and type mismatches handled automatically before analysis." },
  { icon:"⬇️", title:"Export Everything",     desc:"Download cleaned CSV and a full AI insights report." },
];

export default function Features() {
  return (
    <section id="features" style={{ padding:"80px 24px", maxWidth:980, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <div style={{ fontSize:12, color:C.accent, letterSpacing:2, textTransform:"uppercase", marginBottom:10, fontWeight:600 }}>Platform Features</div>
        <h2 style={{ fontSize:"clamp(22px,4vw,32px)", fontWeight:700, color:C.navy }}>Everything you need to understand your data</h2>
      </div>
      <div className="feat-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:18 }}>
        {FEATS.map(f => (
          <div key={f.title} className="card" style={{ padding:"26px 24px", transition:"box-shadow 0.2s,border-color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow="0 4px 24px rgba(79,110,247,0.13)"; e.currentTarget.style.borderColor=C.accentMid; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow="0 2px 16px rgba(79,110,247,0.07)"; e.currentTarget.style.borderColor=C.border; }}>
            <div style={{ fontSize:28, marginBottom:14 }}>{f.icon}</div>
            <div style={{ fontSize:15, fontWeight:600, color:C.navy, marginBottom:8 }}>{f.title}</div>
            <div style={{ fontSize:13, color:C.textMid, lineHeight:1.72 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}