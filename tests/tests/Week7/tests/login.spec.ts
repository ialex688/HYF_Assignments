///--------------LOGIN TESTS WITH FIXTURES-----------------/////

//import { test, expect } from '@playwright/test';
//import { LoginPage } from '../pages/LoginPage';
import { test, expect } from '../fixtures/test-fixtures';

test.describe('Login Tests', () => {
    /* let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    }); */


    test('valid login', async ({page, loginPage}) => {
        await loginPage.login('aguspe', '12341234');
        //await expect(page).toHaveURL('/index.php?rt=account/account');
        await expect(page).toHaveURL(/account/);
        await expect(loginPage.validLoginMessage).toBeVisible();
    })


    test('invalid_login', async ({loginPage}) => {
        await loginPage.login('yianna', '12341234');
        await expect(loginPage.invalidLoginMessage).toBeVisible();        
    })

    test('empty username', async ({loginPage}) => {
        await loginPage.login('', '12341234');
        await expect(loginPage.usernameInput).toHaveAttribute('required', '');
    })
    
    
    
    test('empty password', async ({loginPage}) => {
        await loginPage.login('aguspe', '');        
        await expect(loginPage.passwordInput).toHaveAttribute('required', '');
       
    })


    test.afterEach(async ({}, testInfo) => {
        console.log(testInfo.title)
    });
})