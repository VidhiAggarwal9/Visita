
// ── SAVE AS: frontend/src/components/Hero.jsx ─────────────────
import { C } from "../constants/theme";

export default function Hero({ onUpload, onSample }) {
  return (
    <div style={{ textAlign:"center", padding:"90px 24px 72px", maxWidth:760, margin:"0 auto", position:"relative" }}>
      {/* Warm glow orb */}
      <div style={{ position:"absolute", top:40, left:"50%", transform:"translateX(-50%)", width:600, height:360, background:"radial-gradient(ellipse,rgba(181,114,42,0.12) 0%,transparent 68%)", pointerEvents:"none" }} />

      {/* Badge */}
      <div style={{ display:"inline-block", background:C.accentLight, border:`1px solid ${C.accentMid}`, borderRadius:20, padding:"5px 18px", fontSize:12, color:C.accent, marginBottom:24, letterSpacing:1.2, textTransform:"uppercase", fontWeight:600 }}>
        Hotel Analytics Platform
      </div>

      <h1 className="hero-title" style={{ fontSize:"clamp(30px,6vw,52px)", fontWeight:800, color:C.text, margin:"0 0 20px", lineHeight:1.1 }}>
        Hotel Data That<br />
        <span style={{ background:C.gradText, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Speaks for Itself
        </span>
      </h1>

      <p style={{ color:C.textMid, fontSize:16, lineHeight:1.8, margin:"0 auto 38px", maxWidth:520 }}>
        Upload your booking dataset and instantly get KPI dashboards, interactive charts, and AI-written insights. No code. No setup.
      </p>

      <div className="hero-btns" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
        <button className="btn-primary" onClick={onUpload}>Upload Your Dataset →</button>
        <button className="btn-outline" onClick={onSample}>Try Sample Data</button>
      </div>
      <div style={{ marginTop:18, fontSize:12, color:C.textMuted }}>Supports CSV & Excel · No signup · Free to use</div>
    </div>
  );
}