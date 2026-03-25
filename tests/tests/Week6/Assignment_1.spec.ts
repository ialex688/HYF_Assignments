import { test, expect } from '@playwright/test';

test('valid login', async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    await page.getByLabel("Login name").fill("aguspe");
    await page.getByLabel("Password").fill("12341234");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/account/);
    await expect(page.locator("body > main > div > div.account-welcome > p")).toHaveText("Welcome to your account dashboard. From here you can manage your orders and account details.");
})



test('invalid password', async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    await page.getByLabel("Login name").fill("aguspe");
    await page.getByLabel("Password").fill("fghjk");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText("Error: Incorrect login or password provided.")).toBeVisible();
})


test('empty username', async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel("Password").fill("12341234");
    await expect(page.locator('#loginFrm_loginname')).toHaveAttribute('required', '');
})



test('empty password', async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel("Login name").fill("aguspe");
    await expect(page.locator('#loginFrm_password')).toHaveAttribute('required', '');
   
})