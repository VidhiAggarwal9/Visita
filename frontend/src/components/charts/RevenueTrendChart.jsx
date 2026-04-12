// ── frontend/src/components/charts/RevenueTrendChart.jsx ─────
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../../constants/theme";
const tt = { background:C.white, border:`1px solid ${C.border}`, color:C.text, borderRadius:10, fontSize:12 };

export default function RevenueTrendChart({ data }) {
  return (
    <div className="card" style={{ padding:18 }}>
      <div style={{ color:C.navy, fontSize:13, fontWeight:600, marginBottom:14 }}>Revenue Trend</div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
          <XAxis dataKey="month" tick={{ fill:C.textMuted, fontSize:11 }} />
          <YAxis tick={{ fill:C.textMuted, fontSize:11 }} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`} />
          <Tooltip contentStyle={tt} formatter={v=>[`$${v.toLocaleString()}`,"Revenue"]} />
          <Line type="monotone" dataKey="revenue" stroke={C.accent} strokeWidth={2.5} dot={{ fill:C.accent, r:3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}