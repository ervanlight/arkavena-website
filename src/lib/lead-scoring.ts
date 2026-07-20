import { Lead, LeadQualification } from './types';

export const SCORING_FACTORS = {
  hasBudget: 20,
  hasTimeline: 10,
  isCorporate: 15,
  comprehensiveDescription: 10,
  validPhone: 5,
};

export function scoreLead(lead: Partial<Lead>): { score: number; qualification: LeadQualification } {
  let score = 0;

  if (lead.budget && lead.budget > 100000000) score += SCORING_FACTORS.hasBudget; // e.g. > 100jt
  if (lead.timeline) score += SCORING_FACTORS.hasTimeline;
  if (lead.company) score += SCORING_FACTORS.isCorporate;
  if (lead.description && lead.description.length > 50) score += SCORING_FACTORS.comprehensiveDescription;
  if (lead.phone && lead.phone.length >= 10) score += SCORING_FACTORS.validPhone;

  let qualification = LeadQualification.REVIEW;
  if (score >= 50) {
    qualification = LeadQualification.PRIORITY;
  } else if (score >= 35) {
    qualification = LeadQualification.QUALIFIED;
  } else if (score >= 20) {
    qualification = LeadQualification.NURTURE;
  } else if (score < 10) {
    qualification = LeadQualification.NOT_SUITABLE;
  }

  return { score, qualification };
}
