


// ── SAVE AS: frontend/src/pages/Dashboard.jsx ────────────────
import { useState, useEffect }    from "react";
import { useNavigate }            from "react-router-dom";

import DashboardHeader   from "../components/dashboard/DashboardHeader";
import InsightsPanel     from "../components/dashboard/InsightsPanel";
import DataPreviewTable  from "../components/dashboard/DataPreviewTable";
import KpiCard           from "../components/KpiCard";
import RevenueTrendChart from "../components/charts/RevenueTrendChart";
import BookingDistChart  from "../components/charts/BookingDistChart";
import CancellationChart from "../components/charts/CancellationChart";
import AdrChart          from "../components/charts/AdrChart";
import Footer            from "../components/Footer";

import { cleanData, computeAnalytics } from "../utils/dataProcessing";
import { fmtMoney, fmtNum }            from "../utils/formatters";
import { C }                           from "../constants/theme";

export default function Dashboard() {
  const navigate = useNavigate();

  const [allData,     setAllData]     = useState([]);
  const [analytics,   setAnalytics]   = useState(null);
  const [insights,    setInsights]    = useState([]);
  const [fileName,    setFileName]    = useState("");
  const [filterHotel, setFilterHotel] = useState("All");

  useEffect(() => {
    const raw      = sessionStorage.getItem("visita_rows");
    const name     = sessionStorage.getItem("visita_filename") || "dataset.csv";
    const savedIns = sessionStorage.getItem("visita_insights");

    if (!raw) { navigate("/"); return; }

    const cleaned = cleanData(JSON.parse(raw));
    setAllData(cleaned);
    setFileName(name);
    setAnalytics(computeAnalytics(cleaned));

    // Parse saved insights — this is what fixes the blank insights panel
    try {
      const parsed = JSON.parse(savedIns || "[]");
      setInsights(Array.isArray(parsed) ? parsed : []);
    } catch {
      setInsights([]);
    }
  }, [navigate]);

  if (!analytics) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:C.bg, color:C.textMid, fontSize:15 }}>
        Loading dashboard...
      </div>
    );
  }

  const filtered = filterHotel === "All" ? allData : allData.filter(r => r.hotel === filterHotel);
  const A        = filterHotel === "All" ? analytics : computeAnalytics(filtered);
  const hotels   = ["All", ...new Set(allData.map(r => r.hotel))];

  // ── Download CSV (no external lib needed) ───────────────────
  const downloadCSV = () => {
    const keys   = Object.keys(allData[0] || {});
    const header = keys.join(",");
    const rows   = allData.map(r =>
      keys.map(k => {
        const v = String(r[k] ?? "");
        return v.includes(",") ? `"${v}"` : v;
      }).join(",")
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const a    = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "visita_cleaned.csv" });
    a.click(); URL.revokeObjectURL(a.href);
  };

  // ── Download Insights ────────────────────────────────────────
  const downloadInsights = () => {
    if (!insights.length) { alert("No insights available yet."); return; }
    const body = insights.map((ins, i) => `${i + 1}. ${ins}`).join("\n\n");
    const text = `Visita — AI Insights Report\n${"=".repeat(40)}\nFile: ${fileName}\nGenerated: ${new Date().toLocaleString()}\n\n${body}`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
    const a    = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "visita_insights.txt" });
    a.click(); URL.revokeObjectURL(a.href);
  };

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", minHeight:"100vh", background:C.bg }}>
      <DashboardHeader
        fileName={fileName}
        filterHotel={filterHotel}
        hotels={hotels}
        onFilterChange={setFilterHotel}
        onDownloadCSV={downloadCSV}
        onDownloadInsights={downloadInsights}
      />

      <div style={{ padding:"22px 20px", maxWidth:1100, margin:"0 auto" }}>

        {/* KPI Cards */}
        <div className="kpi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
          <KpiCard label="Total Bookings"    value={fmtNum(A.total)}               sub={`${A.canceled} cancelled`}     accent={C.accent}  bg={C.accentLight} />
          <KpiCard label="Total Revenue"     value={fmtMoney(A.totalRevenue)}      sub="confirmed bookings"            accent={C.teal}    bg={C.tealLight}   />
          <KpiCard label="Cancellation Rate" value={`${A.cancelRate.toFixed(1)}%`} sub={`${A.canceled} of ${A.total}`} accent={C.rose}    bg={C.roseLight}   />
          <KpiCard label="Avg Daily Rate"    value={`$${A.avgAdr.toFixed(2)}`}     sub="per night"                     accent={C.amber}   bg={C.amberLight}  />
        </div>

        {/* Charts Row 1 */}
        <div className="charts-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <RevenueTrendChart data={A.revenueTrend} />
          <BookingDistChart  data={A.bookingDist}  />
        </div>

        {/* Charts Row 2 */}
        <div className="charts-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:18 }}>
          <CancellationChart data={A.cancelChart} />
          <AdrChart          data={A.adrChart}    />
        </div>

        {/* Insights — reads from sessionStorage, never blank */}
        <InsightsPanel insights={insights} loading={false} />

        {/* Data Table */}
        <DataPreviewTable data={filtered} />
      </div>

      <Footer />
    </div>
  );
}