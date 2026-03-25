import { test, expect } from '@playwright/test';

test('nav_tests', async ({page}) => {
    await page.goto('/');
    await page.locator('body > header > nav > div > ul > li:nth-child(1) > a').click();
    
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Featured Products', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Apparel & Accessories' }).click();
    await expect.soft(page).toHaveURL('/?category=Apparel');
    await expect.soft((page).getByRole('heading', { name: 'Apparel', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Makeup' }).click();
    await expect.soft(page).toHaveURL('/?category=Makeup');
    await expect.soft((page).getByRole('heading', { name: 'Makeup', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Skincare' }).click();
    await expect.soft(page).toHaveURL('/?category=Skincare');
    await expect.soft((page).getByRole('heading', { name: 'Skincare', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Fragrance' }).click();
    await expect.soft(page).toHaveURL('/?category=Fragrance');
    await expect.soft((page).getByRole('heading', { name: 'Fragrance', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Men' }).click();
    await expect.soft(page).toHaveURL('/?category=Men');
    await expect.soft((page).getByRole('heading', { name: 'Men', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Hair Care' }).click();
    await expect.soft(page).toHaveURL('/?category=Hair%20Care');
    await expect.soft((page).getByRole('heading', { name: 'Hair Care', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Books' }).click();
    await expect.soft(page).toHaveURL('/?category=Books');
    await expect.soft((page).getByRole('heading', { name: 'Books', exact: true })).toBeVisible();

    
})



test('nav_tests_loop', async ({page}) => {
    await page.goto('/');

    const categories = [
        {
            nav_name:'Home', 
            heading:'Featured Products', 
            link:'/'
        }, 
        {
            nav_name:'Apparel', 
            heading:'Apparel', 
            link:'/?category=Apparel'}, 
        {
            nav_name:'Makeup', 
            heading:'Makeup', 
            link:'/?category=Makeup'}, 
        {
            nav_name:'Skincare', 
            heading:'Skincare', 
            link:'/?category=Skincare'}, 
        {
            nav_name:'Fragrance',
             heading:'Fragrance', 
             link:'/?category=Fragrance'}, 
        {
            nav_name:'Men', 
            heading:'Men', 
            link:'/?category=Men'}, 
        {
            nav_name:'Hair Care', 
            heading:'Hair Care', 
            link:'/?category=Hair%20Care'}, 
        {
            nav_name:'Books', 
            heading:'Books', 
            link:'/?category=Books'}
    ];
   
         
    for (const category of categories) {
        await page.getByRole('navigation').getByRole('link', { name: category.nav_name }).click();
        await expect.soft(page).toHaveURL(category.link);
        await expect.soft((page).getByRole('heading', { name: category.heading, exact: true })).toBeVisible();
    } 
    
})

