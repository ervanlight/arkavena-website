import { test, expect } from '@playwright/test';

test('can open assessment form', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Estimasi Biaya');
  await expect(page.locator('text=Kalkulator')).toBeVisible();
});
