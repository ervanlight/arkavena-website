# Batch 10A — simulation register

Three illustrative simulations are used across the P3 guide cluster. All use
index-based (not currency) values, are explicitly labeled "Simulasi
ilustratif — bukan data proyek Arkavena", and are excluded from
`dataAsOf`/structured-data as factual data (see each guide's `article.dataAsOf:
null`).

## 1. Value engineering alternative comparison

**Route:** `/panduan/value-engineering-untuk-mengendalikan-biaya`
**Purpose:** Illustrate how multiple criteria (initial cost, maintenance cost,
constructability) are weighed together when evaluating design alternatives —
not to demonstrate a real material comparison.
**Variables:** Three hypothetical facade material alternatives (A, B, C),
scored 1–5 on three criteria.
**Values:** A = {3, 4, 4}, B = {5, 2, 3}, C = {2, 3, 5} (cost/maintenance/
constructability index).
**Calculation:** No aggregation formula applied — the guide deliberately
avoids computing a single "winner" score, since the point is that weighting
priorities determine the outcome, not the guide.
**Illustrative label:** "Simulasi ilustratif — bukan data proyek Arkavena",
plus a footnote clarifying the indices don't represent any real cost or
project condition.
**Factual source used:** None — the scoring scale itself is not attributed
to an external source, only the general value-engineering methodology
(SAVE International) informing why these three criteria are the ones
considered.
**Risk of misinterpretation:** A reader could mistake the illustrative
scores for a real material recommendation. Mitigated by the disclaimer
Callout placed immediately before the table and the explicit statement that
"mana yang terbaik" depends on the reader's own priority weighting, not a
computed answer in the guide.

## 2. Cost baseline/committed/actual/variance table

**Route:** `/panduan/pengendalian-biaya-proyek`
**Purpose:** Illustrate how variance is read across multiple work packages
and rolled up to a project total — not to demonstrate real project cost
performance.
**Variables:** Three hypothetical work packages (A, B, C) with baseline,
committed, and actual cost.
**Values:** Baseline totals to index 100 (A=40, B=35, C=25); committed
totals to 101; actual totals to 90.
**Calculation:** Variance = committed − baseline per package, and a total
row summing all three columns. Consistent arithmetic (40+35+25=100,
42+33+26=101, 38+30+22=90) — checked.
**Illustrative label:** "Simulasi ilustratif — bukan data proyek Arkavena",
plus a footnote noting the index total is hypothetical and not a currency
value.
**Factual source used:** None — the baseline/committed/actual/variance
terminology is grounded in PMI's PMBOK Guide cost-management vocabulary,
but the numbers themselves are invented for illustration only.
**Risk of misinterpretation:** A reader could read "index 100" as a real
budget figure. Mitigated by the explicit "bukan nominal mata uang" label and
framing the whole table as a monitoring-method illustration, not a report.

## 3. Time-phased cashflow (planned vs. actual, cumulative)

**Route:** `/panduan/pengendalian-cashflow-proyek`
**Purpose:** Illustrate the difference between period-by-period and
cumulative cashflow tracking (the S-curve concept referenced generally,
without naming or showing an actual S-curve chart) — not to demonstrate a
real project's disbursement pattern.
**Variables:** Six hypothetical periods, each with a planned and (for the
first four) actual disbursement value, plus running cumulative totals.
**Values:** Planned per period: 10, 15, 20, 20, 20, 15 (sums to 100).
Actual per period (periods 1–4 only, 5–6 not yet "occurred" in the
scenario): 8, 14, 22, 18. Cumulative planned: 10, 25, 45, 65, 85, 100.
Cumulative actual: 8, 22, 44, 62.
**Calculation:** Straight running sums — checked (10+15=25, 25+20=45,
45+20=65; 8+14=22, 22+22=44, 44+18=62).
**Illustrative label:** "Simulasi ilustratif — bukan data proyek Arkavena",
plus a footnote noting the index total is hypothetical and not a currency
value.
**Factual source used:** None — time-phased funding as a concept is
grounded in PMI's PMBOK Guide, but the values are invented for illustration.
**Risk of misinterpretation:** A reader could read the "10–100 index" as a
real project's funding schedule, or infer that Periode 3 exceeding plan
means something diagnostic. Mitigated by the disclaimer and by explicitly
stating the pattern shown is common and not itself a red flag.

## Confirmation

- All simulations carry a visible illustrative label immediately before the
  data.
- No simulation is presented as an industry benchmark.
- No simulation uses client or project data.
- All calculations were checked for internal arithmetic consistency.
- No simulation numbers appear in any guide's frontmatter (`dataAsOf`
  remains `null` on all 9 P3 guides — none of them carry factual,
  time-sensitive data).
