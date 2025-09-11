import { test, expect } from '@playwright/test';
import { ProductsApi, Configuration } from './clients/server';
import { user } from './user/user';

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

test('clicking a product card goes to product details', async ({ page }) => {
  const tester = user(page);
  const products = await getProducts();
  const product = products[Math.floor(Math.random() * products.length)]

  await page.goto('');
  await tester(`click the card for the product named ${product.name}`);

  expect(page.url()).toContain(product.id);
  await expect(page.getByText(product.name, { exact: true })).toBeVisible();
});

test('entering a product search query goes to the search page', async ({ page }) => {
  const searchQuery = "bumble bee broach";
  const tester = user(page);

  await page.goto('');
  await tester(`focus on the "search" bar, then type "${searchQuery}", then press the Enter key`);

  await expect(page.getByText(searchQuery)).toBeVisible();
});