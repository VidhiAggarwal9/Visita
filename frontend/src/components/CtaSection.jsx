// ── frontend/src/components/CtaSection.jsx ───────────────────
import { C } from "../constants/theme";

export default function CtaSection({ onUpload, onSample }) {
  return (
    <div style={{ background:`linear-gradient(135deg,${C.accentLight},${C.tealLight})`, borderTop:`1px solid ${C.border}`, padding:"72px 24px", textAlign:"center" }}>
      <h2 style={{ fontSize:"clamp(20px,4vw,30px)", fontWeight:700, color:C.navy, marginBottom:12 }}>Ready to analyze your hotel data?</h2>
      <p style={{ color:C.textMid, fontSize:15, marginBottom:34 }}>Upload your dataset and get a full analytics report in under 10 seconds.</p>
      <div className="hero-btns" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
        <button className="btn-primary" onClick={onUpload}>Upload Dataset →</button>
        <button className="btn-outline" onClick={onSample}>Try Sample Data</button>
      </div>
    </div>
  );
}
