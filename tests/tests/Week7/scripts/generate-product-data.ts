import { type Page } from '@playwright/test';
import { chromium } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';

type ProductData = {
  name: string;
  category: string;
  price: string;
};

async function generateProductData() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
        
    await page.goto('https://raider-test-site.onrender.com/');

    const productCards = page.locator('.product-card');
    const productCount = await productCards.count();

    const products: ProductData[] = [];

    for (let i = 0; i < productCount; i++) {
        const card = productCards.nth(i);

        const name = (await card.locator('.product-name').textContent())?.trim() ?? '';
        const category = (await card.locator('.product-category').textContent())?.trim() ?? '';
        const price = (await card.locator('.product-price').textContent())?.trim() ?? '';

        products.push({ name, category, price });
    }

    const outputPath = path.join(
        process.cwd(),
        'tests',
        'Week7',
        'test-data',
        'product-data.json'
    );

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf-8');

    await browser.close();
    console.log(`Saved ${products.length} products to ${outputPath}`);
}

generateProductData().catch((error) => {
    console.error('Failed to generate product data:', error);
    process.exit(1);
});