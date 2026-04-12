
// ── backend/src/models/Upload.model.js ──────────────────────
import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  filename:  { type: String, required: true },
  rowCount:  { type: Number, default: 0 },
  columns:   [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Upload", uploadSchema);