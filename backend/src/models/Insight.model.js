
// ─────────────────────────────────────────────────────────────
// ── SAVE THIS AS: backend/src/models/Insight.model.js ────────
// (This is a SEPARATE file — do not put both in one file)
import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  uploadId:  { type: String, required: true },
  insights:  [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Insight", insightSchema);