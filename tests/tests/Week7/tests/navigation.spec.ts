import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


test.describe('Navigation Tests', () => {
    
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);
            await homePage.goto();
        });
    ///after checking Angels solution from week 6 I decided to also use an object for the navigation categories
    const categories = [
        {
            nav_name:'Home', 
            heading:'Featured Products', 
            url:'/'
        }, 
        {
            nav_name:'Apparel', 
            heading:'Apparel', 
            url:'/?category=Apparel'}, 
        {
            nav_name:'Makeup', 
            heading:'Makeup', 
            url:'/?category=Makeup'}, 
        {
            nav_name:'Skincare', 
            heading:'Skincare', 
            url:'/?category=Skincare'}, 
        {
            nav_name:'Fragrance',
            heading:'Fragrance', 
            url:'/?category=Fragrance'}, 
        {
            nav_name:'Men', 
            heading:'Men', 
            url:'/?category=Men'}, 
        {
            nav_name:'Hair Care', 
            heading:'Hair Care', 
            url:'/?category=Hair%20Care'}, 
        {
            nav_name:'Books', 
            heading:'Books', 
            url:'/?category=Books'}
    ]
    
            
    // Loop through the categories and perform the test actions.
    for (const category of categories) {
        test(`Navigates to "${category.nav_name}"`, async ({page}) => {
            await homePage.goto();
            await homePage.clickNavLink(category.nav_name);
            await expect(page).toHaveURL(category.url);
            await expect(homePage.heading(category.heading)).toBeVisible();
        })
        
    }

    test.afterEach(async ({ page }, testInfo) => {
        console.log(testInfo.title)
    });

})