import { test, expect } from '@playwright/test';
import { ProductsApi, Configuration } from './clients/server';

const getProducts = () => {
  const client = new ProductsApi(new Configuration({ basePath: process.env["services__server__https__0"] ?? 'https://localhost:7114' }));

  return client.apiProductsGet();
}

test('product cards are rendered', async ({ page }) => {
  await page.goto('');

  await expect(page).toHaveTitle("Dry Dry Dessert");
  for (const product of await getProducts()) {
    await expect(page.getByText(product.name, { exact: true })).toBeVisible();
  }
});