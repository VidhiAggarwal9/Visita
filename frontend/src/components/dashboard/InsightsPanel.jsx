


// ── frontend/src/components/dashboard/InsightsPanel.jsx ──────
import { C } from "../../constants/theme";

export default function InsightsPanel({ insights, loading }) {
  return (
    <div className="card" style={{ padding:22, marginBottom:18 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
        <span>🤖</span>
        <span style={{ color:C.navy, fontSize:14, fontWeight:700 }}>AI-Generated Insights</span>
        {loading && <span style={{ color:C.textMuted, fontSize:12 }}>Analyzing...</span>}
      </div>
      {loading
        ? <div style={{ color:C.textMuted, fontSize:13, padding:"16px 0" }}>⏳ Gemini AI is generating insights from your dataset...</div>
        : <div className="insight-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:12 }}>
            {insights.map((ins, i) => (
              <div key={i} style={{ background:C.accentLight, border:`1px solid ${C.accentMid}`, borderLeft:`3px solid ${C.accent}`, borderRadius:10, padding:"14px 16px", fontSize:13, color:C.text, lineHeight:1.7 }}>
                <span style={{ color:C.accent, fontWeight:700, marginRight:6 }}>{i+1}.</span>{ins}
              </div>
            ))}
          </div>
      }
    </div>
  );
}