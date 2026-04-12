import { C } from "../constants/theme";
import { Logo } from "./Navbar";

export default function Footer() {
  return (
    <footer style={{ borderTop:`1px solid ${C.border}`, padding:"24px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, background:"rgba(255,255,255,0.6)" }}>
      <Logo />
      <span style={{ color:C.textMuted, fontSize:12 }}>© 2025 Vidhi Aggarwal. All rights reserved.</span>
    </footer>
  );
}