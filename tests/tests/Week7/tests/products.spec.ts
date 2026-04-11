//import { test, expect } from '@playwright/test';
//import { ProductsPage } from '../pages/ProductsPage';
import { test, expect } from '../fixtures/test-fixtures';
import expectedProducts from '../test-data/product-data.json';

test.describe('Products Tests', () => {
  //let productsPage: ProductsPage;

  /* test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  }); */

  test('product count matches generated data', async ({productsPage}) => {
    const count = await productsPage.getProductCount();
    expect(count).toBe(expectedProducts.length);
  });

  for (const [index, expectedProduct] of expectedProducts.entries()) {
    test(`product ${index + 1} has matching listing and detail information`, async ({productsPage}) => {
      expect(await productsPage.getProductName(index)).toBe(expectedProduct.name);
      expect(await productsPage.getProductCategory(index)).toBe(expectedProduct.category);
      expect(await productsPage.getProductPrice(index)).toBe(expectedProduct.price);

      await productsPage.clickProduct(index);
      await expect(productsPage.addToCartButton).toBeVisible();
      await expect(productsPage.backToStoreLink).toBeVisible();
      await expect(productsPage.productDetailsName).toHaveText(expectedProduct.name);
      await expect(productsPage.productDetailsCategory).toHaveText(expectedProduct.category);
      await expect(productsPage.productDetailsPrice).toHaveText(expectedProduct.price);
    });
  }

  test.afterEach(async ({}, testInfo) => {
        console.log(testInfo.title)
  });

});