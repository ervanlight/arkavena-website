// =========================================
// ARKAVENA — Internal Link Graph
// =========================================
// The graph is what makes orphan detection and inbound-link auditing possible.
// It is generated, never hand-edited (ARCHITECTURE.md §11).

import type { ContentItem, LinkGraph, LinkGraphNode } from "@/schemas/content-types";
import { scoreRelations } from "@/lib/content/relationships";

export const RELATED_MODULE_SIZE = 4;

function relationshipTargets(item: ContentItem): string[] {
  const { services, sectors, locations, guides, projects, pinnedRelated } =
    item.relationships;
  return [...services, ...sectors, ...locations, ...guides, ...projects, ...pinnedRelated];
}

export function buildLinkGraph(items: ContentItem[]): LinkGraph {
  const byRoute = new Map(items.map((item) => [item.route, item]));
  const knownIds = new Set(items.map((item) => item.id));
  const nodes: Record<string, LinkGraphNode> = {};

  for (const item of items) {
    const outbound = new Set<string>();

    for (const id of relationshipTargets(item)) {
      if (knownIds.has(id) && id !== item.id) outbound.add(id);
    }

    for (const link of item.internalLinks) {
      const target = byRoute.get(link.replace(/\/$/, "") || "/");
      if (target && target.id !== item.id) outbound.add(target.id);
    }

    const related = scoreRelations(item, items)
      .slice(0, RELATED_MODULE_SIZE)
      .map((relation) => ({ id: relation.item.id, score: relation.score }));

    // The related-content module renders real crawlable anchors, so those
    // edges are part of the link graph, not a presentation detail.
    for (const relation of related) outbound.add(relation.id);

    nodes[item.id] = {
      id: item.id,
      route: item.route,
      type: item.type,
      outbound: [...outbound].sort(),
      inbound: [],
      related,
    };
  }

  for (const node of Object.values(nodes)) {
    for (const targetId of node.outbound) {
      nodes[targetId]?.inbound.push(node.id);
    }
  }

  for (const node of Object.values(nodes)) node.inbound.sort();

  return { generatedAt: new Date().toISOString(), nodes };
}

export function inboundCounts(graph: LinkGraph): Map<string, number> {
  return new Map(
    Object.values(graph.nodes).map((node) => [node.id, node.inbound.length])
  );
}
