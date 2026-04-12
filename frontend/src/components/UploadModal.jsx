// ── frontend/src/components/UploadModal.jsx ──────────────────
import { useState, useRef } from "react";
import { C } from "../constants/theme";

export default function UploadModal({ onFile, onSample, onClose }) {
  const [drag, setDrag] = useState(false);
  const ref = useRef();
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(30,42,74,0.35)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(4px)" }}>
      <div className="card" style={{ padding:"36px 32px", maxWidth:440, width:"100%", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:18, background:"transparent", border:"none", color:C.textMuted, fontSize:20, cursor:"pointer" }}>✕</button>
        <div style={{ color:C.navy, fontWeight:700, fontSize:18, marginBottom:4 }}>Upload Dataset</div>
        <div style={{ color:C.textMuted, fontSize:13, marginBottom:24 }}>Supports CSV and Excel (.xlsx, .xls)</div>
        <div className={`upload-zone${drag?" drag":""}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files[0]); }}
          onClick={() => ref.current.click()}>
          <div style={{ fontSize:34, marginBottom:10 }}>📂</div>
          <div style={{ color:C.navy, fontSize:14, fontWeight:500, marginBottom:4 }}>Drag & drop your file here</div>
          <div style={{ color:C.textMuted, fontSize:12 }}>or click to browse</div>
          <input ref={ref} type="file" accept=".csv,.xlsx,.xls" style={{ display:"none" }} onChange={e => onFile(e.target.files[0])} />
        </div>
        <div style={{ textAlign:"center", color:C.textMuted, fontSize:12, margin:"16px 0 14px" }}>— or try with demo data —</div>
        <button className="btn-outline" style={{ width:"100%", padding:11 }} onClick={onSample}>Load Sample Hotel Dataset</button>
        <div style={{ marginTop:16, color:C.textMuted, fontSize:11, textAlign:"center" }}>Best columns: <span style={{ color:C.accent }}>hotel, is_canceled, adr, arrival_date_month, revenue, nights</span></div>
      </div>
    </div>
  );
}