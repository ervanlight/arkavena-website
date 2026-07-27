/**
 * Redirect report generator.
 *
 * Reads config/redirects.ts, validates it against real production routes, and
 * writes a human-readable report next to the migration redirect map.
 */

import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "../src/lib/content/loaders";
import { knownRoutes, validateRedirects } from "../src/lib/content/validators";
import { redirects } from "../src/config/redirects";

const MIGRATION_DIR = path.join(process.cwd(), "migration");
const REPORT_PATH = path.join(MIGRATION_DIR, "redirect-report.md");

function main() {
  const { items } = loadAllContent();
  const routes = knownRoutes(items);
  const issues = validateRedirects(redirects, routes);

  fs.mkdirSync(MIGRATION_DIR, { recursive: true });

  const rows =
    redirects.length === 0
      ? "_Belum ada redirect terdaftar._"
      : [
          "| Source | Destination | Status | Alasan |",
          "|---|---|---|---|",
          ...redirects.map(
            (entry) =>
              `| \`${entry.source}\` | \`${entry.destination}\` | ${
                entry.permanent ? "301" : "302"
              } | ${entry.reason} |`
          ),
        ].join("\n");

  const problems =
    issues.length === 0
      ? "Tidak ada loop, chain, atau destination tidak valid."
      : issues.map((issue) => `- **${issue.rule}** — ${issue.message}`).join("\n");

  const report = `# Redirect report

Dibuat otomatis oleh \`scripts/generate-redirect-report.ts\`. Jangan diedit manual.

- Total redirect: ${redirects.length}
- Route produksi yang dikenal: ${routes.size}

## Daftar redirect

${rows}

## Temuan

${problems}
`;

  fs.writeFileSync(REPORT_PATH, report, "utf8");
  console.log(`✔ Report ditulis ke ${path.relative(process.cwd(), REPORT_PATH)}`);

  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(`  ✖ [${issue.rule}] ${issue.message}`);
    }
    process.exit(1);
  }
}

main();
