
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateInsights(data, kpis) {
  const summary = {
    totalBookings: kpis.total,
    cancelRate:    kpis.cancelRate.toFixed(1) + "%",
    avgAdr:        "$" + kpis.avgAdr.toFixed(2),
    totalRevenue:  "$" + kpis.totalRevenue.toFixed(0),
    hotelTypes:    [...new Set(data.map(r => r.hotel))],
    cancelByHotel: kpis.cancelChart,
    adrByHotel:    kpis.adrChart,
    revenueTrend:  kpis.revenueTrend,
  };

  const prompt = `You are a hotel analytics expert. Based on this hotel booking dataset summary, generate exactly 6 concise, specific insights (1-2 sentences each). Focus on actionable patterns, comparisons, trends, and anomalies. Return ONLY a JSON array of strings, no markdown, no extra text.

Dataset summary:
${JSON.stringify(summary, null, 2)}

Return format: ["insight 1", "insight 2", ...]`;

  try {
    const genAI  = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model  = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text   = result.response.text();
    const clean  = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error("Gemini error:", err.message);
    return ruleBasedInsights(kpis);
  }
}

function ruleBasedInsights(kpis) {
  const highCancel = [...kpis.cancelChart].sort((a, b) => b.rate - a.rate)[0];
  const highAdr    = [...kpis.adrChart].sort((a, b) => b.adr - a.adr)[0];
  const lowAdr     = [...kpis.adrChart].sort((a, b) => a.adr - b.adr)[0];
  const peak       = [...kpis.revenueTrend].sort((a, b) => b.revenue - a.revenue)[0];
  return [
    highCancel ? `${highCancel.hotel} has the highest cancellation rate at ${highCancel.rate}%, suggesting pricing or booking policy issues.` : "Cancellation data unavailable.",
    highAdr    ? `${highAdr.hotel} commands the highest ADR at $${highAdr.adr}, indicating stronger market positioning.` : "ADR data unavailable.",
    peak       ? `Revenue peaks in ${peak.month} at $${peak.revenue.toLocaleString()}, reflecting clear seasonal demand patterns.` : "Revenue trend data unavailable.",
    lowAdr && highAdr && lowAdr.hotel !== highAdr.hotel
               ? `ADR gap of $${(highAdr.adr - lowAdr.adr).toFixed(2)} between ${highAdr.hotel} and ${lowAdr.hotel} — review competitive positioning.`
               : "Single hotel type detected in dataset.",
    `Overall cancellation rate of ${kpis.cancelRate.toFixed(1)}% across ${kpis.total.toLocaleString()} bookings represents significant revenue risk.`,
    `Confirmed revenue of $${kpis.totalRevenue.toLocaleString()} excludes cancellations — stricter cancellation policies could recover losses.`,
  ];
}