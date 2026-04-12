//── frontend/src/components/charts/AdrChart.jsx ──────────────
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../../constants/theme";
const tt = { background:C.white, border:`1px solid ${C.border}`, color:C.text, borderRadius:10, fontSize:12 };

export default function AdrChart({ data }) {
  return (
    <div className="card" style={{ padding:18 }}>
      <div style={{ color:C.navy, fontSize:13, fontWeight:600, marginBottom:14 }}>ADR Comparison by Hotel</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
          <XAxis dataKey="hotel" tick={{ fill:C.textMuted, fontSize:11 }} />
          <YAxis tick={{ fill:C.textMuted, fontSize:11 }} tickFormatter={v=>`$${v}`} />
          <Tooltip contentStyle={tt} formatter={v=>[`$${v}`,"ADR"]} />
          <Bar dataKey="adr" fill={C.accent} radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
