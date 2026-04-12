
// ── frontend/src/components/Navbar.jsx ───────────────────────
import { C } from "../constants/theme";

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
      <div style={{ width:32, height:32, background:`linear-gradient(135deg,${C.accent},${C.teal})`, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:15 }}>V</div>
      <span style={{ color:C.navy, fontWeight:800, fontSize:17 }}>Visita</span>
    </div>
  );
}

export default function Navbar({ onUpload }) {
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(247,248,252,0.95)", borderBottom:`1px solid ${C.border}`, backdropFilter:"blur(12px)", padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", height:62 }}>
      <Logo />
      <div className="nav-links" style={{ display:"flex", gap:28 }}>
        {[["Features","features"],["How it Works","how-it-works"],["Demo","demo"]].map(([l,id]) => (
          <span key={id} onClick={() => scrollTo(id)} style={{ cursor:"pointer", color:C.textMid, fontSize:14, transition:"color 0.2s" }}
            onMouseEnter={e => e.target.style.color=C.accent}
            onMouseLeave={e => e.target.style.color=C.textMid}>{l}</span>
        ))}
      </div>
      <button className="btn-primary" style={{ padding:"8px 20px", fontSize:13 }} onClick={onUpload}>Get Started →</button>
    </nav>
  );
}