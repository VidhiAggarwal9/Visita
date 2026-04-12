
// ── frontend/src/components/charts/BookingDistChart.jsx ──────
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../../constants/theme";
const tt = { background:C.white, border:`1px solid ${C.border}`, color:C.text, borderRadius:10, fontSize:12 };

export default function BookingDistChart({ data }) {
  return (
    <div className="card" style={{ padding:18 }}>
      <div style={{ color:C.navy, fontSize:13, fontWeight:600, marginBottom:14 }}>Booking Distribution</div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75}
            label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
            labelLine={{ stroke:C.textMuted }} fontSize={11}>
            {data.map((_, i) => <Cell key={i} fill={C.PIE[i % C.PIE.length]} />)}
          </Pie>
          <Tooltip contentStyle={tt} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}