import { test, expect } from '@playwright/test';

test('product_detail_test', async ({ page }) => {
  await page.goto('/');

  const productCards = page.locator('.product-card');
  const count = await productCards.count();
  console.log(count);

  for (let i = 0; i < count; i++) {
    const card = productCards.nth(i);

    const name = await card.locator('h3').innerText();
    const category = await card.locator('.product-category').innerText();
    const price = await card.locator('.product-price').innerText();
    const href = await card.locator('a').getAttribute('href');
    

    await card.locator('a').click();
///// Testing if the product detail page opens.
    await expect(page).toHaveURL(href!);

///// Testing if the product detail page shows the correct information as the product page.
    await expect(page.locator('.product-detail-info h1')).toHaveText(name);
    await expect(page.locator('.product-detail-info span')).toHaveText(category);
    await expect(page.locator('.product-detail-price')).toHaveText(price);

    await page.goBack();
    await expect(page).toHaveURL('/');
  }
});
       
