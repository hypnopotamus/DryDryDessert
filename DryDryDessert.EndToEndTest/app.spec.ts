import { test, expect } from '@playwright/test';

test('weather reports are rendered', async ({ page }) => {
  await page.goto('');

  await expect(page).toHaveTitle("Dry Dry Dessert");
  await expect(page.getByText('Weather forecast')).toBeInViewport();
});