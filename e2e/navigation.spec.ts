import { test, expect } from '@playwright/test';

test('can navigate to portfolio', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Portofolio');
  await expect(page).toHaveURL(/.*\/portfolio/);
});
