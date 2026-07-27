/**
 * Content validation gate.
 *
 * Fails the build on: schema violations, duplicate IDs / slugs / routes /
 * published keywords, filename-slug mismatch, collection-type mismatch,
 * unresolved relationships on published pages, orphaned published pages,
 * disallowed MDX constructs, and sitemap contract violations.
 */

import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "../src/lib/content/loaders";
import { buildLinkGraph, inboundCounts } from "../src/lib/content/link-graph";
import {
  validateOrphans,
  validateRelationships,
  validateUniqueness,
  type ValidationIssue,
} from "../src/lib/content/validators";
import { ALLOWED_MDX_COMPONENTS } from "../src/config/mdx-allowlist";

const PROHIBITED_PATTERNS: { pattern: RegExp; message: string }[] = [
  { pattern: /<script\b/i, message: "Tag <script> tidak diizinkan di MDX" },
  { pattern: /<iframe\b/i, message: "Tag <iframe> tidak diizinkan di MDX" },
  { pattern: /<style\b/i, message: "Tag <style> tidak diizinkan di MDX" },
  { pattern: /\bstyle=\s*[{"']/, message: "Inline CSS tidak diizinkan di MDX" },
  { pattern: /javascript:/i, message: "URL javascript: tidak diizinkan" },
  {
    pattern: /application\/ld\+json/i,
    message: "JSON-LD manual tidak diizinkan — gunakan schema builders",
  },
  {
    pattern: /dangerouslySetInnerHTML/,
    message: "dangerouslySetInnerHTML tidak diizinkan di MDX",
  },
  {
    pattern: /\bfetch\s*\(/,
    message: "Data fetching langsung di MDX tidak diizinkan",
  },
];

const JSX_COMPONENT = /<([A-Z][A-Za-z0-9]*)/g;

function validateBodies(sourcePaths: string[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const allowed = new Set<string>(ALLOWED_MDX_COMPONENTS);

  for (const sourcePath of sourcePaths) {
    const body = fs.readFileSync(path.join(process.cwd(), sourcePath), "utf8");

    for (const { pattern, message } of PROHIBITED_PATTERNS) {
      if (pattern.test(body)) {
        issues.push({
          severity: "error",
          rule: "mdx-allowlist",
          file: sourcePath,
          message,
        });
      }
    }

    for (const match of body.matchAll(JSX_COMPONENT)) {
      const component = match[1];
      if (!allowed.has(component)) {
        issues.push({
          severity: "error",
          rule: "mdx-allowlist",
          file: sourcePath,
          message: `Komponen "${component}" tidak ada dalam allowlist MDX`,
        });
      }
    }
  }

  return issues;
}

function report(issues: ValidationIssue[]): number {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  for (const issue of warnings) {
    console.warn(`  ⚠ [${issue.rule}] ${issue.file}\n      ${issue.message}`);
  }
  for (const issue of errors) {
    console.error(`  ✖ [${issue.rule}] ${issue.file}\n      ${issue.message}`);
  }

  console.log(
    `\n${errors.length} error, ${warnings.length} warning pada validasi konten.`
  );
  return errors.length;
}

function main() {
  const { items, issues: loadIssues } = loadAllContent();

  const issues: ValidationIssue[] = loadIssues.map((issue) => ({
    severity: "error",
    rule: "frontmatter",
    file: issue.file,
    message: `${issue.field}: ${issue.message}`,
  }));

  issues.push(...validateUniqueness(items));
  issues.push(...validateRelationships(items));
  issues.push(...validateBodies(items.map((item) => item.sourcePath)));

  const graph = buildLinkGraph(items);
  issues.push(...validateOrphans(items, inboundCounts(graph)));

  console.log(`Memvalidasi ${items.length} file MDX...\n`);
  const errorCount = report(issues);

  if (errorCount > 0) process.exit(1);
  console.log("✔ Validasi konten lolos.");
}

main();
