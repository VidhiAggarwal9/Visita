import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Upload a real CSV/Excel file — returns { uploadId, data[], insights[] }
export async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// Submit sample/parsed rows — returns { uploadId, kpis, insights[] }
export async function submitRows(rows) {
  const { data } = await api.post("/analytics/sample", { rows });
  return data;
}

export default api;