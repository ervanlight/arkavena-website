import { describe, it, expect } from 'vitest';

export function calculateLeadScore(lead: any): number {
  let score = 0;
  if (lead.phone) score += 10;
  if (lead.email) score += 10;
  if (lead.estimated_budget > 100000000) score += 20;
  if (lead.timeline === 'immediate') score += 20;
  return score;
}

describe('Lead Scoring', () => {
  it('should calculate base score correctly', () => {
    const lead = { phone: '081234567890', email: 'test@test.com' };
    expect(calculateLeadScore(lead)).toBe(20);
  });
});
