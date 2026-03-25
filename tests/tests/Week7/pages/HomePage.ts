import { type Locator, type Page} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    

    constructor(page: Page) {
        this.page = page;
    }
    
    
    navLink(name: string) {
        return this.page.getByRole('navigation').getByRole('link', { name });
    }

    heading(name: string) {
        return this.page.getByRole('heading', { name, exact: true });
    }

    async goto() {
        await this.page.goto('/');
    }

    async clickNavLink(name: string) {
        await this.navLink(name).click();
    }
}