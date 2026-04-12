// ── frontend/src/components/KpiCard.jsx ──────────────────────
import { C } from "../constants/theme";

export default function KpiCard({ label, value, sub, accent, bg }) {
  return (
    <div style={{ background:bg||C.accentLight, border:`1px solid ${C.border}`, borderTop:`3px solid ${accent||C.accent}`, borderRadius:12, padding:"18px 20px" }}>
      <div style={{ fontSize:11, color:C.textMuted, textTransform:"uppercase", letterSpacing:1.1, marginBottom:8, fontWeight:600 }}>{label}</div>
      <div style={{ fontSize:25, fontWeight:700, color:accent||C.accent }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:C.textMuted, marginTop:5 }}>{sub}</div>}
    </div>
  );
}