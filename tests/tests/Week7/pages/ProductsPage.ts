import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productDetailsName: Locator;
  readonly productDetailsCategory: Locator;
  readonly productDetailsPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backToStoreLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDetailsName = page.locator('.product-detail-info h1');
    this.productDetailsCategory = page.locator('.product-detail-info span');
    this.productDetailsPrice = page.locator('.product-detail-price');
    this.addToCartButton  = page.getByRole('button', { name: /add to cart/i });
    this.backToStoreLink  = page.getByRole('link', { name: /back to store/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  private productCard(index: number): Locator {
    return this.page.locator('.product-card').nth(index);
  }

  async getProductCount(): Promise<number> {
    return this.page.locator('.product-card').count();
  }

  async getProductName(index: number): Promise<string> {
    return this.productCard(index).locator('.product-name').innerText();
  }

  async getProductCategory(index: number): Promise<string> {
    return this.productCard(index).locator('.product-category').innerText();
  }

  async getProductPrice(index: number): Promise<string> {
    return this.productCard(index).locator('.product-price').innerText();
  }

  async getProductUrl(index: number): Promise<string | null> {
    return this.productCard(index).locator('.product-link').getAttribute('href');
    
  }

  async clickProduct(index: number) {
    await this.productCard(index).locator('.product-link').click();
  }

  async waitForProductCards(): Promise<void> {
    await this.page.locator('.product-card').first().waitFor({ state: 'visible' });
}
}