import { test, expect } from '@playwright/test';

test('shows portfolio listing', async ({ page }) => {
  await page.goto('/portfolio');
  await expect(page.locator('h1')).toContainText('Portofolio');
});
