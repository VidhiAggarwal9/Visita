// ── SAVE AS: backend/src/controllers/insights.controller.js ──

import InsightModel from "../models/Insight.model.js";

export async function getInsights(req, res, next) {
  try {
    const doc = await InsightModel
      .findOne({ uploadId: req.params.uploadId })
      .sort({ createdAt: -1 });

    if (!doc) return res.status(404).json({ message: "Insights not found." });
    res.json({ success: true, insights: doc.insights });
  } catch (err) {
    next(err);
  }
}