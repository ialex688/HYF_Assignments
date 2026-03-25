import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Products Tests', () => {
    let productsPage: ProductsPage;
    
    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        await productsPage.goto();
    });


    for (let i = 0; i < 8; i++) {
        test(`tests correct details for product ${i + 1}`, async ({ page }) => {
            ////Getting the product info from the product card.
            const name = await productsPage.getProductName(i);
            const category = await productsPage.getProductCategory(i);
            const price = await productsPage.getProductPrice(i);
            const href = await productsPage.getProductUrl(i);
             ///// Checking that I ´retrieved the correct data.
            console.log(`\n--- Product ${i + 1} ---`);
            console.log('listing name:', name);
            console.log('listing category:', category);
            console.log('listing price:', price);
            console.log('listing href:', href);

            

            //// Testing if the product detail page opens.
            expect(href).not.toBeNull();
            await productsPage.clickProduct(i);
            console.log('current url after click:', page.url());
            await expect(page).toHaveURL(href!);

            ///// Checking that I got the correct data from the product detail page.
            const detailName = await productsPage.productDetailsName.innerText();
            const detailCategory = await productsPage.productDetailsCategory.innerText();
            const detailPrice = await productsPage.productDetailsPrice.innerText();

            console.log('detail name:', detailName);
            console.log('detail category:', detailCategory);
            console.log('detail price:', detailPrice);


           ///// Testing if the product detail page shows the same information as the product page.
            
            await expect(productsPage.productDetailsName).toHaveText(name);
            await expect(productsPage.productDetailsCategory).toHaveText(category);
            await expect(productsPage.productDetailsPrice).toHaveText(price);
            
            
        });
    } 

    test.afterEach(async ({ page }, testInfo) => {
        console.log(testInfo.title)
    });
    
});