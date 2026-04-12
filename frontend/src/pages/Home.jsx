// ── SAVE AS: frontend/src/pages/Home.jsx ─────────────────────
import { useState } from "react";
import Navbar      from "../components/Navbar";
import Hero        from "../components/Hero";
import StatsBanner from "../components/StatsBanner";
import Features    from "../components/Features";
import HowItWorks  from "../components/HowItWorks";
import DemoSection from "../components/DemoSection";
import CtaSection  from "../components/CtaSection";
import Footer      from "../components/Footer";
import UploadModal from "../components/UploadModal";
import { useAnalytics } from "../hooks/useAnalytics";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { handleFile, handleSample, loading } = useAnalytics();

  return (
    <div className="page-bg">
      {showModal && (
        <UploadModal
          onFile={f  => { setShowModal(false); handleFile(f); }}
          onSample={() => { setShowModal(false); handleSample(); }}
          onClose={() => setShowModal(false)}
        />
      )}

      {loading && (
        <div style={{ position:"fixed", inset:0, background:"rgba(253,248,242,0.88)", zIndex:300, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16 }}>
          <div style={{ width:44, height:44, border:"4px solid #c8a882", borderTop:"4px solid #b5722a", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
          <div style={{ color:"#6b4226", fontSize:15, fontWeight:500 }}>Processing your dataset...</div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      <Navbar onUpload={() => setShowModal(true)} />
      <Hero    onUpload={() => setShowModal(true)} onSample={handleSample} />
      <StatsBanner stats={{ bookings: 119390, cancelRate: "37.0" }} />
      <Features />
      <HowItWorks />
      <DemoSection onUpload={() => setShowModal(true)} onSample={handleSample} />
      <CtaSection  onUpload={() => setShowModal(true)} onSample={handleSample} />
      <Footer />
    </div>
  );
}
