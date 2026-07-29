# Redirect report

Dibuat otomatis oleh `scripts/generate-redirect-report.ts`. Jangan diedit manual.

- Total redirect: 4
- Route produksi yang dikenal: 134

## Daftar redirect

| Source | Destination | Status | Alasan |
|---|---|---|---|
| `/residential` | `/layanan` | 301 | Legacy residential hub cut over to /layanan (audit finding I1, owner-approved 2026-07-29): duplicated the new services hub with no distinct content of its own. |
| `/residential/bangun-rumah-surabaya` | `/layanan/bangun-rumah` | 301 | Cannibalized /layanan/bangun-rumah in search results (audit finding I1, owner-approved 2026-07-29). No content lost: /layanan/bangun-rumah covers the same service with verified, current claims. |
| `/residential/renovasi-rumah-surabaya` | `/layanan/renovasi-rumah` | 301 | Cannibalized /layanan/renovasi-rumah in search results (audit finding I1, owner-approved 2026-07-29). |
| `/residential/tambah-lantai-rumah` | `/layanan/renovasi-rumah` | 301 | No dedicated 'add a floor' service page exists; svc-renovasi-rumah is the closest real equivalent and already covers this via guide-renovasi-rumah-satu-jadi-dua-lantai (owner-approved 2026-07-29). |

## Temuan

Tidak ada loop, chain, atau destination tidak valid.
