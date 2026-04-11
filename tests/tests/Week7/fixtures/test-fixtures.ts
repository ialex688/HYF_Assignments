// Step A: Import the base test and your Page Objects
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

// Step B: Define the types for your fixtures
// This tells TypeScript what fixtures are available
type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  productsPage: ProductsPage;
};

// Step C: Extend the base test with your fixtures
export const test = base.extend<MyFixtures>({

  // Each fixture is a function that receives { page } and 'use'
  loginPage: async ({ page }, use) => {
    // SETUP: create the page object and navigate
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // PROVIDE: pass it to the test via 'use'
    await use(loginPage);

    // CLEANUP: anything after 'use' runs after the test
    // (optional — useful for logging out, clearing data, etc.)
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductCards();
    await use(productsPage);
  }
});

// Re-export expect so tests only need one import
export { expect } from '@playwright/test';