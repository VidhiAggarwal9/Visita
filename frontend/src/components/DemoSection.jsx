


// ── frontend/src/components/DemoSection.jsx ──────────────────
import { C } from "../constants/theme";

export default function DemoSection({ onUpload, onSample }) {
  return (
    <section id="demo" style={{ padding:"80px 24px", maxWidth:680, margin:"0 auto", textAlign:"center" }}>
      <div style={{ fontSize:12, color:C.accent, letterSpacing:2, textTransform:"uppercase", marginBottom:10, fontWeight:600 }}>Live Demo</div>
      <h2 style={{ fontSize:"clamp(22px,4vw,32px)", fontWeight:700, color:C.navy, marginBottom:14 }}>See it in action</h2>
      <p style={{ color:C.textMid, fontSize:15, lineHeight:1.75, marginBottom:36 }}>No account needed. Load the sample dataset or upload your own file and explore the dashboard right now.</p>
      <div className="card" style={{ padding:"36px 32px" }}>
        <div className="demo-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <button className="btn-primary" style={{ padding:14 }} onClick={onSample}>Load Sample Dataset</button>
          <button className="btn-outline" style={{ padding:14 }} onClick={onUpload}>Upload My Data</button>
        </div>
        <div style={{ marginTop:16, fontSize:12, color:C.textMuted }}>Sample: 300 bookings · City Hotel & Resort Hotel · 2023</div>
      </div>
    </section>
  );
}