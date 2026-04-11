///--------------NAVIGATION TESTS WITH FIXTURES-----------------/////

//import { test, expect } from '@playwright/test';
//import { HomePage } from '../pages/HomePage';
import { test, expect } from '../fixtures/test-fixtures';
import { nav_categories } from '../test-data/navigation';

test.describe('Navigation Tests', () => {
        
            
    // Loop through the categories and perform the test actions.
    for (const category of nav_categories) {
        test(`Navigates to "${category.name}"`, async ({page, homePage}) => {
            await homePage.goto();
            await homePage.clickNavLink(category.name);
            await expect.soft(page).toHaveURL(category.url);
            await expect.soft(homePage.heading(category.heading)).toBeVisible();
        })
        
    }

    test.afterEach(async ({}, testInfo) => {
        console.log(testInfo.title)
    });

})