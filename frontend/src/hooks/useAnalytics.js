// ── frontend/src/hooks/useAnalytics.js ───────────────────────
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as Papa from "papaparse";
import * as XLSX from "xlsx";
import { cleanData, computeAnalytics } from "../utils/dataProcessing";
import { uploadFile, submitRows } from "../services/api";
import { generateSampleData } from "../constants/sampleData";

export function useAnalytics() {
  const navigate   = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // Store everything in sessionStorage so Dashboard can read it
  const persist = (rows, name, insights) => {
    sessionStorage.setItem("visita_rows",     JSON.stringify(rows));
    sessionStorage.setItem("visita_filename", name);
    sessionStorage.setItem("visita_insights", JSON.stringify(insights || []));
  };

  const processFile = useCallback(async (file) => {
    setLoading(true); setError(null);
    try {
      const res = await uploadFile(file);           // backend cleans + generates insights
      persist(res.data, res.filename, res.insights);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const processParsedRows = useCallback(async (rows, name) => {
    setLoading(true); setError(null);
    try {
      const res = await submitRows(rows);           // backend generates insights
      persist(rows, name, res.insights);
      navigate("/dashboard");
    } catch (e) {
      // Fallback — navigate without AI insights
      persist(rows, name, []);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleFile = useCallback((file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "csv") {
      Papa.parse(file, {
        header: true, skipEmptyLines: true,
        complete: r => processParsedRows(r.data, file.name),
      });
    } else if (["xlsx","xls"].includes(ext)) {
      const reader = new FileReader();
      reader.onload = e => {
        const wb   = XLSX.read(e.target.result, { type: "array" });
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });
        processParsedRows(rows, file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [processParsedRows]);

  const handleSample = useCallback(() => {
    const rows = generateSampleData();
    processParsedRows(rows, "sample_hotel_data.csv");
  }, [processParsedRows]);

  return { loading, error, handleFile, handleSample };
}