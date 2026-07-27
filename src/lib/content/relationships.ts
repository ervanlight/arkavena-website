// =========================================
// ARKAVENA — Taxonomy-driven Related Content
// =========================================
// Scoring table is fixed by ARCHITECTURE.md §11.2. Changing a weight changes
// the site's internal-link topology, so weights live in one exported constant.

import type { ContentItem } from "@/schemas/content-types";
import type { ContentType } from "@/config/collections";

export const RELATION_SCORES = {
  pinned: 100,
  sameCluster: 20,
  referencesCurrentService: 14,
  sharedService: 12,
  sharedSector: 10,
  sharedLocation: 8,
  articleToMoneyPage: 8,
  moneyPageToArticle: 7,
  projectToMoneyPage: 7,
  sameSearchIntent: 2,
  samePageType: 1,
  disqualified: -1000,
} as const;

const MONEY_PAGE_TYPES: ContentType[] = ["service", "sector", "location"];

const isMoneyPage = (item: ContentItem) => MONEY_PAGE_TYPES.includes(item.type);

function intersects(a: string[], b: string[]): boolean {
  return a.some((value) => b.includes(value));
}

export interface ScoredRelation {
  item: ContentItem;
  score: number;
  /** Index in pinnedRelated, or -1. Used as the first tie-breaker. */
  pinnedIndex: number;
}

/**
 * Score one candidate against the current page. A score of `disqualified`
 * or lower means the candidate must never be rendered.
 */
export function scoreCandidate(
  current: ContentItem,
  candidate: ContentItem
): number {
  if (candidate.id === current.id) return RELATION_SCORES.disqualified;
  if (current.relationships.excludedRelated.includes(candidate.id)) {
    return RELATION_SCORES.disqualified;
  }
  if (!candidate.isIndexable) return RELATION_SCORES.disqualified;

  let score = 0;

  if (current.relationships.pinnedRelated.includes(candidate.id)) {
    score += RELATION_SCORES.pinned;
  }

  if (current.cluster === candidate.cluster) {
    score += RELATION_SCORES.sameCluster;
  }

  if (
    current.type === "service" &&
    candidate.relationships.services.includes(current.id)
  ) {
    score += RELATION_SCORES.referencesCurrentService;
  }

  if (
    intersects(current.relationships.services, candidate.relationships.services)
  ) {
    score += RELATION_SCORES.sharedService;
  }
  if (
    intersects(current.relationships.sectors, candidate.relationships.sectors)
  ) {
    score += RELATION_SCORES.sharedSector;
  }
  if (
    intersects(current.relationships.locations, candidate.relationships.locations)
  ) {
    score += RELATION_SCORES.sharedLocation;
  }

  if (current.type === "guide" && isMoneyPage(candidate)) {
    score += RELATION_SCORES.articleToMoneyPage;
  }
  if (isMoneyPage(current) && candidate.type === "guide") {
    score += RELATION_SCORES.moneyPageToArticle;
  }
  if (current.type === "project" && isMoneyPage(candidate)) {
    score += RELATION_SCORES.projectToMoneyPage;
  }

  if (current.searchIntent === candidate.searchIntent) {
    score += RELATION_SCORES.sameSearchIntent;
  }
  if (current.type === candidate.type) {
    score += RELATION_SCORES.samePageType;
  }

  return score;
}

/** Deterministic ordering: pinned first, then score, then recency, then slug. */
function compareRelations(a: ScoredRelation, b: ScoredRelation): number {
  if (a.pinnedIndex !== b.pinnedIndex) {
    if (a.pinnedIndex === -1) return 1;
    if (b.pinnedIndex === -1) return -1;
    return a.pinnedIndex - b.pinnedIndex;
  }

  if (b.score !== a.score) return b.score - a.score;

  const aReviewed = a.item.lastReviewedAt ?? "";
  const bReviewed = b.item.lastReviewedAt ?? "";
  if (aReviewed !== bReviewed) return bReviewed.localeCompare(aReviewed);

  return a.item.slug.localeCompare(b.item.slug);
}

export function scoreRelations(
  current: ContentItem,
  candidates: ContentItem[]
): ScoredRelation[] {
  return candidates
    .map((candidate) => ({
      item: candidate,
      score: scoreCandidate(current, candidate),
      pinnedIndex: current.relationships.pinnedRelated.indexOf(candidate.id),
    }))
    .filter((relation) => relation.score > 0)
    .sort(compareRelations);
}

export function getRelatedContent(
  current: ContentItem,
  candidates: ContentItem[],
  limit = 4
): ContentItem[] {
  return scoreRelations(current, candidates)
    .slice(0, limit)
    .map((relation) => relation.item);
}
