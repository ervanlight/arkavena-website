import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
});

describe('Validation Schemas', () => {
  it('validates lead form data', () => {
    const validData = { name: 'Budi', phone: '081234567890' };
    expect(leadSchema.safeParse(validData).success).toBe(true);
    
    const invalidData = { name: 'Bu', phone: '123' };
    expect(leadSchema.safeParse(invalidData).success).toBe(false);
  });
});
