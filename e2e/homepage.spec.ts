import { test, expect } from '@playwright/test';

test('has title and main sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ARKAVENA/);
  await expect(page.locator('text=Hubungi Kami')).toBeVisible();
});
