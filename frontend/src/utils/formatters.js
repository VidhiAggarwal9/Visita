// ── frontend/src/utils/formatters.js ────────────────────────
export const fmtMoney = n =>
  n >= 1_000_000 ? `$${(n/1_000_000).toFixed(1)}M`
  : n >= 1_000   ? `$${(n/1_000).toFixed(1)}K`
  : `$${n.toFixed(0)}`;

export const fmtNum = n => n.toLocaleString();