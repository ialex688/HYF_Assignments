import { type Locator, type Page } from '@playwright/test'; 

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginOrRegister: Locator;
    readonly validLoginMessage: Locator;
    readonly invalidLoginMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#loginFrm_loginname');
        this.passwordInput = page.locator('#loginFrm_password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginOrRegister = page.getByRole("link", { name: 'Login or register' });
        this.validLoginMessage = page.getByText("Welcome to your account dashboard. From here you can manage your orders and account details.");
        this.invalidLoginMessage = page.getByText('Error: Incorrect login or password provided.');
    }

    async goto() {
        await this.page.goto('/');
        await this.loginOrRegister.click();
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
