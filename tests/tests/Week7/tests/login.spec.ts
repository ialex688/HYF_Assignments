import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
//import { test, expect } from '../fixtures/test-fixtures';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });


    test('valid login', async ({page}) => {
        await loginPage.login('aguspe', '12341234');
        await expect(page).toHaveURL(/account/);
        await expect(loginPage.validLoginMessage).toBeVisible();
    })


    test('invalid_login', async ({page}) => {
        await loginPage.login('yianna', '12341234');
        await expect(loginPage.invalidLoginMessage).toBeVisible();

    })


    test.afterEach(async ({ page }, testInfo) => {
        console.log(testInfo.title)
    });
})