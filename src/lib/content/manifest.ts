// =========================================
// ARKAVENA — Manifest Access
// =========================================
// The only entry point the Next.js app uses to reach content. Nothing in
// app/ may read the filesystem or import MDX directly.

import { contentManifest } from "@/generated/content-manifest.generated";
import linkGraphData from "@/generated/link-graph.generated.json";
import type { ContentItem, LinkGraph } from "@/schemas/content-types";

export function getManifest(): ContentItem[] {
  return contentManifest;
}

export function getLinkGraph(): LinkGraph {
  return linkGraphData as LinkGraph;
}

export function getInboundIds(id: string): string[] {
  return getLinkGraph().nodes[id]?.inbound ?? [];
}
