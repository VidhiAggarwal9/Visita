
import { cleanRows }        from "../services/dataClean.service.js";
import { computeKPIs }      from "../services/analytics.service.js";
import { generateInsights } from "../services/insights.service.js";
import InsightModel         from "../models/Insight.model.js";

export async function sampleAnalytics(req, res, next) {
  try {
    const rows     = req.body.rows || [];
    const cleaned  = cleanRows(rows);
    const kpis     = computeKPIs(cleaned);
    const insights = await generateInsights(cleaned, kpis);

    const sampleId = "sample-" + Date.now();
    await InsightModel.create({ uploadId: sampleId, insights });

    res.json({ success: true, uploadId: sampleId, kpis, insights });
  } catch (err) {
    next(err);
  }
}


