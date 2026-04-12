// ── frontend/src/utils/dataProcessing.js ────────────────────
export const MONTH_ORDER = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export function cleanData(rows) {
  return rows.map(r => ({
    hotel:              r.hotel || r.Hotel || r["hotel type"] || "Unknown",
    is_canceled:        r.is_canceled !== undefined ? +r.is_canceled
                      : r.canceled   !== undefined ? +r.canceled : 0,
    adr:                +(r.adr || r.ADR || r.average_daily_rate || 0),
    arrival_date_month: r.arrival_date_month || r.month || r.Month || "",
    arrival_date_year:  r.arrival_date_year  || r.year  || r.Year  || "",
    revenue:            +(r.revenue || r.Revenue
                        || (+(r.adr||0)) * (+(r.nights || r.stays_in_week_nights || 1))),
    nights:             +(r.nights || r.stays_in_week_nights || 1),
  })).filter(r => r.hotel && r.hotel !== "Unknown");
}

export function computeAnalytics(data) {
  const total        = data.length;
  const canceled     = data.filter(r => +r.is_canceled === 1).length;
  const totalRevenue = data.reduce((s, r) => s + (+r.revenue || 0), 0);
  const adrs         = data.filter(r => +r.adr > 0).map(r => +r.adr);
  const avgAdr       = adrs.length ? adrs.reduce((a, b) => a + b, 0) / adrs.length : 0;
  const cancelRate   = total ? (canceled / total) * 100 : 0;

  const revByMonth = {};
  MONTH_ORDER.forEach(m => { revByMonth[m] = 0; });
  data.forEach(r => {
    if (r.arrival_date_month && revByMonth[r.arrival_date_month] !== undefined)
      revByMonth[r.arrival_date_month] += +r.revenue || 0;
  });
  const revenueTrend = MONTH_ORDER
    .filter(m => revByMonth[m] > 0)
    .map(m => ({ month: m.slice(0,3), revenue: Math.round(revByMonth[m]) }));

  const hotelCounts={}, hotelCancel={}, hotelTotal={}, hotelAdr={}, hotelAdrCnt={};
  data.forEach(r => {
    hotelCounts[r.hotel]  = (hotelCounts[r.hotel]  || 0) + 1;
    hotelTotal[r.hotel]   = (hotelTotal[r.hotel]   || 0) + 1;
    if (+r.is_canceled === 1) hotelCancel[r.hotel] = (hotelCancel[r.hotel] || 0) + 1;
    if (+r.adr > 0) {
      hotelAdr[r.hotel]    = (hotelAdr[r.hotel]    || 0) + +r.adr;
      hotelAdrCnt[r.hotel] = (hotelAdrCnt[r.hotel] || 0) + 1;
    }
  });

  return {
    total, canceled, totalRevenue, avgAdr, cancelRate, revenueTrend,
    bookingDist: Object.entries(hotelCounts).map(([name,value]) => ({ name, value })),
    cancelChart: Object.keys(hotelTotal).map(h => ({
      hotel: h, rate: +(((hotelCancel[h]||0)/hotelTotal[h])*100).toFixed(1),
    })),
    adrChart: Object.keys(hotelAdr).map(h => ({
      hotel: h, adr: +(hotelAdr[h]/hotelAdrCnt[h]).toFixed(2),
    })),
  };
}
