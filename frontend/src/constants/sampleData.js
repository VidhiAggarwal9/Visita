// ── frontend/src/constants/sampleData.js ────────────────────
const HOTELS = ["City Hotel", "Resort Hotel"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export function generateSampleData() {
  return Array.from({ length: 300 }, () => {
    const hotel    = HOTELS[Math.floor(Math.random() * 2)];
    const month    = MONTHS[Math.floor(Math.random() * 12)];
    const canceled = Math.random() < (hotel === "City Hotel" ? 0.42 : 0.28) ? 1 : 0;
    const adr      = hotel === "Resort Hotel"
      ? 110 + Math.random() * 80
      : 80  + Math.random() * 60;
    const nights   = Math.ceil(Math.random() * 7);
    return {
      hotel,
      arrival_date_year:  2023,
      arrival_date_month: month,
      is_canceled:        canceled,
      adr:                +adr.toFixed(2),
      nights,
      revenue:            canceled ? 0 : +(adr * nights).toFixed(2),
    };
  });
}