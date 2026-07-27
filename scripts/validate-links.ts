/**
 * Internal-link validation.
 *
 * Fails on links that point at routes which do not exist and on any reference
 * to a domain the site has migrated away from (ARCHITECTURE.md §7.2, §13).
 */

import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "../src/lib/content/loaders";
import {
  knownRoutes,
  validateInternalLinks,
  validateLegacyDomainLinks,
  validateRedirects,
  type ValidationIssue,
} from "../src/lib/content/validators";
import { redirects } from "../src/config/redirects";

function readBodies(sourcePaths: string[]): Map<string, string> {
  return new Map(
    sourcePaths.map((sourcePath) => [
      sourcePath,
      fs.readFileSync(path.join(process.cwd(), sourcePath), "utf8"),
    ])
  );
}

function main() {
  const { items } = loadAllContent();
  const routes = knownRoutes(items);

  const issues: ValidationIssue[] = [
    ...validateInternalLinks(items),
    ...validateLegacyDomainLinks(items, readBodies(items.map((i) => i.sourcePath))),
    ...validateRedirects(redirects, routes),
  ];

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  const linkCount = items.reduce(
    (total, item) => total + item.internalLinks.length,
    0
  );
  console.log(
    `Memeriksa ${linkCount} tautan internal dan ${redirects.length} redirect...\n`
  );

  for (const issue of warnings) {
    console.warn(`  ⚠ [${issue.rule}] ${issue.file}\n      ${issue.message}`);
  }
  for (const issue of errors) {
    console.error(`  ✖ [${issue.rule}] ${issue.file}\n      ${issue.message}`);
  }

  if (errors.length > 0) {
    console.error(`\n${errors.length} error pada validasi tautan.`);
    process.exit(1);
  }

  console.log(
    `✔ Validasi tautan lolos${warnings.length > 0 ? ` (${warnings.length} warning)` : ""}.`
  );
}

main();
