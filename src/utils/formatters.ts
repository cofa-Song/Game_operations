/**
 * Shared date/number formatters used across management views.
 * Import from here instead of re-defining in each view.
 */

/** ISO → `zh-TW` date string, e.g. "2026/4/23". Returns "—" when falsy. */
export const fmtDate = (iso?: string | null): string =>
  iso ? new Date(iso).toLocaleDateString('zh-TW') : '—'

/** ISO → `MM/DD HH:mm`, e.g. "04/23 16:30". Returns "—" when falsy. */
export const fmtDateTime = (iso?: string | null): string => {
  if (!iso) return '—'
  const d = new Date(iso)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const HH = String(d.getHours()).padStart(2, '0')
  const MM = String(d.getMinutes()).padStart(2, '0')
  return `${mm}/${dd} ${HH}:${MM}`
}

/** Number → locale string with thousand separators, e.g. 12345 → "12,345". */
export const fmtNum = (n: number): string => n.toLocaleString()
