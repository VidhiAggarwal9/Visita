


// ── frontend/src/components/dashboard/DashboardHeader.jsx ────
import { useNavigate } from "react-router-dom";
import { C } from "../../constants/theme";
import { Logo } from "../Navbar";

export default function DashboardHeader({ fileName, filterHotel, hotels, onFilterChange, onDownloadCSV, onDownloadInsights }) {
  const navigate = useNavigate();
  return (
    <div style={{ position:"sticky", top:0, zIndex:50, background:"rgba(247,248,252,0.96)", borderBottom:`1px solid ${C.border}`, backdropFilter:"blur(12px)", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0 }}>
        <button className="btn-sm" onClick={() => navigate("/")}>← Home</button>
        <Logo />
        <span style={{ color:C.textMuted, fontSize:11, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:150 }}>{fileName}</span>
      </div>
      <div className="dash-actions" style={{ display:"flex", gap:8, alignItems:"center" }}>
        <select value={filterHotel} onChange={e => onFilterChange(e.target.value)}
          style={{ background:C.white, color:C.text, border:`1px solid ${C.border}`, borderRadius:7, padding:"6px 10px", fontSize:13 }}>
          {hotels.map(h => <option key={h}>{h}</option>)}
        </select>
        <button className="btn-sm" onClick={onDownloadCSV}>⬇ CSV</button>
        <button className="btn-sm" onClick={onDownloadInsights}>⬇ Insights</button>
      </div>
    </div>
  );
}