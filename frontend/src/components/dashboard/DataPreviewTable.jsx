


// ── frontend/src/components/dashboard/DataPreviewTable.jsx ───
import { C } from "../../constants/theme";

export default function DataPreviewTable({ data }) {
  if (!data || data.length === 0) return null;
  const cols = Object.keys(data[0]).slice(0, 8);
  return (
    <div className="card" style={{ padding:20 }}>
      <div style={{ color:C.navy, fontSize:13, fontWeight:600, marginBottom:14 }}>
        Dataset Preview <span style={{ color:C.textMuted, fontWeight:400, fontSize:12 }}>— first 10 rows · {data.length.toLocaleString()} total</span>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr>{cols.map(k => (
              <th key={k} style={{ padding:"8px 14px", textAlign:"left", color:C.accent, borderBottom:`1px solid ${C.border}`, fontWeight:600, whiteSpace:"nowrap", background:C.accentLight }}>{k}</th>
            ))}</tr>
          </thead>
          <tbody>
            {data.slice(0,10).map((row, i) => (
              <tr key={i} style={{ borderBottom:`1px solid ${C.bg2}`, background:i%2===0?C.white:C.bg }}>
                {cols.map((k, j) => (
                  <td key={j} style={{ padding:"8px 14px", color:C.textMid, whiteSpace:"nowrap" }}>{String(row[k])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}