import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productDetailsName: Locator;
  readonly productDetailsCategory: Locator;
  readonly productDetailsPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDetailsName = page.locator('.product-detail-info h1');
    this.productDetailsCategory = page.locator('.product-detail-info span');
    this.productDetailsPrice = page.locator('.product-detail-price');
  }

  async goto() {
    await this.page.goto('/');
  }

  productCard(index: number): Locator {
    return this.page.locator('.product-card').nth(index);
  }

  productName(index: number): Locator {
    return this.productCard(index).locator('.product-name');
  }

  productCategory(index: number): Locator {
    return this.productCard(index).locator('.product-category');
  }

  productPrice(index: number): Locator {
    return this.productCard(index).locator('.product-price');
  }

  productLink(index: number): Locator {
    return this.productCard(index).locator('.product-link');
  }

  async getProductName(index: number): Promise<string> {
    return this.productName(index).innerText();
  }

  async getProductCategory(index: number): Promise<string> {
    return this.productCategory(index).innerText();
  }

  async getProductPrice(index: number): Promise<string> {
    return this.productPrice(index).innerText();
  }

  async getProductUrl(index: number): Promise<string | null> {
    return this.productLink(index).getAttribute('href');
  }

  async clickProduct(index: number) {
    await this.productLink(index).click();
  }
}