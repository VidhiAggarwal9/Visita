// ── SAVE AS: frontend/src/components/StatsBanner.jsx ─────────
import { C } from "../constants/theme";

export default function StatsBanner({ stats }) {
  const items = [
    { val:`${Number(stats.bookings).toLocaleString()}+`, label:"Bookings Analyzed" },
    { val:`${stats.cancelRate}%`,                        label:"Avg Cancellation Rate" },
    { val:"6",                                           label:"AI Insights Per Report" },
    { val:"< 5s",                                        label:"Processing Time" },
  ];
  return (
    <div style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, background:"rgba(255,255,255,0.7)", padding:"30px 24px" }}>
      <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, maxWidth:860, margin:"0 auto", textAlign:"center" }}>
        {items.map(({ val, label }) => (
          <div key={label}>
            <div style={{ fontSize:27, fontWeight:800, background:C.gradText, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{val}</div>
            <div style={{ fontSize:12, color:C.textMuted, marginTop:5 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
