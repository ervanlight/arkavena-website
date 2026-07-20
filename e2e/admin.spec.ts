import { test, expect } from '@playwright/test';

test('admin redirects to login if not authenticated', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/.*\/login/);
});
