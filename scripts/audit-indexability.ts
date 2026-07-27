/**
 * Indexability audit.
 *
 * Prints the robots directive and sitemap membership for every content route,
 * then fails if the sitemap contract is violated (ARCHITECTURE.md §12.3).
 */

import { loadAllContent } from "../src/lib/content/loaders";
import { validateSitemapEligibility } from "../src/lib/content/validators";

function main() {
  const { items } = loadAllContent();

  const eligible = items.filter(
    (item) => item.status === "published" && item.isIndexable && item.ownerVerified
  );
  const eligibleRoutes = eligible.map((item) => item.route);

  console.log("Audit indexability\n");
  console.log(
    ["ROUTE", "STATUS", "ROBOTS", "SITEMAP"].map((h) => h.padEnd(28)).join("")
  );
  console.log("-".repeat(112));

  for (const item of [...items].sort((a, b) => a.route.localeCompare(b.route))) {
    const robots = `${item.isIndexable ? "index" : "noindex"},${
      item.isFollowable ? "follow" : "nofollow"
    }`;
    const inSitemap = eligibleRoutes.includes(item.route) ? "ya" : "tidak";
    console.log(
      [item.route, item.status, robots, inSitemap]
        .map((value) => String(value).padEnd(28))
        .join("")
    );
  }

  const issues = validateSitemapEligibility(items, eligibleRoutes);

  console.log(
    `\n${items.length} halaman konten · ${eligible.length} masuk sitemap · ${
      items.length - eligible.length
    } noindex.`
  );

  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(`  ✖ [${issue.rule}] ${issue.file}\n      ${issue.message}`);
    }
    process.exit(1);
  }

  console.log("✔ Kontrak sitemap terpenuhi.");
}

main();
