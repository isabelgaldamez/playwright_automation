import { test } from '@playwright/test'

// use blocks for different requests
test('Block resources', async({page})=>{
    // ** matches all the routes from the request
    await page.route('**/*', (route)=>{
        // if we have images, block the route
        if(route.request().resourceType() === 'image'){
            return route.abort()  // aborts the request
        }
        return route.continue()
    });
    await page.goto('https://valentinos-magic-beans.click/products')
    await page.waitForLoadState('networkidle');

})