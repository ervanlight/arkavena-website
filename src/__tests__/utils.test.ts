import { describe, it, expect } from 'vitest';

export function normalizePhone(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) return '62' + cleaned.substring(1);
  return cleaned;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

describe('Utils', () => {
  it('normalizes phone number', () => {
    expect(normalizePhone('081234567890')).toBe('6281234567890');
    expect(normalizePhone('+62 812-3456-7890')).toBe('6281234567890');
  });

  it('formats currency', () => {
    // Note: The exact string returned by Intl.NumberFormat depends on the node version,
    // so we're just checking that it contains the number formatted nicely
    expect(formatCurrency(1000000)).toMatch(/1\.000\.000/);
  });
});
