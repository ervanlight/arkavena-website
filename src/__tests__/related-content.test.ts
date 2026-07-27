import { describe, expect, it } from "vitest";
import {
  RELATION_SCORES,
  getRelatedContent,
  scoreCandidate,
} from "@/lib/content/relationships";
import { buildLinkGraph } from "@/lib/content/link-graph";
import {
  asContentItem,
  baseFrontmatter,
  publishedFrontmatter,
} from "./fixtures/content";

const service = (id: string, slug: string, overrides = {}) =>
  asContentItem(publishedFrontmatter({ id, slug, primaryKeyword: id, ...overrides }));

const guide = (id: string, slug: string, overrides = {}) =>
  asContentItem(
    publishedFrontmatter({
      id,
      slug,
      type: "guide",
      primaryKeyword: id,
      searchIntent: "informational",
      service: undefined,
      article: {
        articleType: "explainer",
        pillar: null,
        dataAsOf: null,
        answerFirst: true,
        hasCalculator: false,
      },
      ...overrides,
    })
  );

describe("related content scoring", () => {
  const current = service("svc-current", "current");

  it("halaman itu sendiri tidak pernah muncul", () => {
    expect(scoreCandidate(current, current)).toBe(RELATION_SCORES.disqualified);
    expect(getRelatedContent(current, [current])).toHaveLength(0);
  });

  it("halaman yang dikecualikan tidak muncul", () => {
    const excluded = service("svc-excluded", "excluded");
    const withExclusion = service("svc-current-2", "current-2", {
      relationships: {
        services: [],
        sectors: [],
        locations: [],
        guides: [],
        projects: [],
        pinnedRelated: [],
        excludedRelated: ["svc-excluded"],
      },
    });
    expect(getRelatedContent(withExclusion, [excluded])).toHaveLength(0);
  });

  it("draft dan halaman non-indexable tidak muncul", () => {
    const draft = asContentItem(baseFrontmatter({ id: "svc-draft", slug: "draft" }));
    expect(scoreCandidate(current, draft)).toBe(RELATION_SCORES.disqualified);
  });

  it("halaman pinned berada di urutan teratas", () => {
    const pinned = guide("guide-pinned", "pinned");
    const other = guide("guide-other", "other");
    const withPin = service("svc-pinner", "pinner", {
      relationships: {
        services: [],
        sectors: [],
        locations: [],
        guides: [],
        projects: [],
        pinnedRelated: ["guide-pinned"],
        excludedRelated: [],
      },
    });

    const related = getRelatedContent(withPin, [other, pinned]);
    expect(related[0].id).toBe("guide-pinned");
  });

  it("skor mengikuti tabel ARCHITECTURE §11.2", () => {
    const sameClusterGuide = guide("guide-sama", "sama");
    // same cluster (20) + money page → article (7) + same page type? no (berbeda tipe)
    // + same search intent? no (transactional vs informational)
    expect(scoreCandidate(current, sameClusterGuide)).toBe(
      RELATION_SCORES.sameCluster + RELATION_SCORES.moneyPageToArticle
    );
  });

  it("skor bersifat deterministik untuk input yang sama", () => {
    const candidates = [guide("guide-a", "a"), guide("guide-b", "b")];
    const first = getRelatedContent(current, candidates).map((item) => item.id);
    const second = getRelatedContent(current, [...candidates].reverse()).map(
      (item) => item.id
    );
    expect(first).toEqual(second);
  });

  it("link graph mencatat inbound dari modul related", () => {
    const a = service("svc-a", "a");
    const b = guide("guide-b", "b");
    const graph = buildLinkGraph([a, b]);
    expect(graph.nodes["guide-b"].inbound).toContain("svc-a");
    expect(graph.nodes["svc-a"].related.map((r) => r.id)).toContain("guide-b");
  });
});
