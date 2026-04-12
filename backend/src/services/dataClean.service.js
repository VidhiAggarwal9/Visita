
export function normaliseRow(r) {
  return {
    hotel:              r.hotel || r.Hotel || r["hotel type"] || "Unknown",
    is_canceled:        r.is_canceled  !== undefined ? +r.is_canceled
                      : r.canceled     !== undefined ? +r.canceled : 0,
    adr:                +(r.adr || r.ADR || r.average_daily_rate || 0),
    arrival_date_month: r.arrival_date_month || r.month || r.Month || "",
    arrival_date_year:  r.arrival_date_year  || r.year  || r.Year  || "",
    revenue:            +(r.revenue || r.Revenue
                        || (+(r.adr || 0)) * (+(r.nights || r.stays_in_week_nights || 1))),
    nights:             +(r.nights || r.stays_in_week_nights || 1),
  };
}

export function cleanRows(rows) {
  return rows.map(normaliseRow).filter(r => r.hotel && r.hotel !== "Unknown");
}