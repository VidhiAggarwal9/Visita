
import fs   from "fs";
import path from "path";
import Papa from "papaparse";
import XLSX from "xlsx";
import UploadModel  from "../models/Upload.model.js";
import InsightModel from "../models/Insight.model.js";
import { cleanRows }        from "../services/dataClean.service.js";
import { computeKPIs }      from "../services/analytics.service.js";
import { generateInsights } from "../services/insights.service.js";

export async function handleUpload(req, res, next) {
  try {
    if (!req.file) {
      const err = new Error("No file uploaded");
      err.status = 400;
      throw err;
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    let rawRows = [];

    if (ext === ".csv") {
      const content = fs.readFileSync(req.file.path, "utf8");
      rawRows = Papa.parse(content, { header: true, skipEmptyLines: true }).data;
    } else {
      const wb = XLSX.readFile(req.file.path);
      rawRows  = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });
    }

    // Remove temp file
    fs.unlinkSync(req.file.path);

    const cleaned  = cleanRows(rawRows);
    const doc      = await UploadModel.create({
      filename: req.file.originalname,
      rowCount: cleaned.length,
      columns:  cleaned.length ? Object.keys(cleaned[0]) : [],
    });

    const kpis     = computeKPIs(cleaned);
    const insights = await generateInsights(cleaned, kpis);
    await InsightModel.create({ uploadId: doc._id.toString(), insights });

    res.json({ success: true, uploadId: doc._id, filename: doc.filename, data: cleaned, insights });
  } catch (err) {
    next(err);
  }
}