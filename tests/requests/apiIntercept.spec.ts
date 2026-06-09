import { test, expect } from '@playwright/test'
import { request } from 'node:http';
import { describe } from 'node:test'
import {productsLocators} from '../../locators/products'
import * as products from '../../helpers/products';
import * as summary from '../../helpers/summary';
import * as checkout from '../../helpers/checkout';




describe('API intercepts', async() => {
    test('API call to : /products', async ({page}) => {
        // print request: Listen to the events (request)
        // request is an event that happens on a page, first register the event before goin
        // to the page
        page.on(
            'request', request => console.log(request.method(), request.url())
        )
        await page.goto('https://valentinos-magic-beans.click/products')

    })
    test('API call to : /products - wait for all events to complete', async ({page}) => {
        // print request: Listen to the events (request)
        // request is an event that happens on a page, first register the event before goin
        // to the page
        page.on(
            'request', request => console.log(request.method(), request.url())
        )
        await page.goto('https://valentinos-magic-beans.click/products')
        await page.waitForLoadState('networkidle'); // wait for the page until network doesn't do any more requests
    });

    test('API call to : /products - use route to the api', async ({page}) => {
        const prodLoc = new productsLocators(page);
        
       
        //Sample data
       const someProducts ={
        success: true,
        source: 'dynamodb',
        data: [
            {
                name: 'Mocha Coffe',
                price: 10.99,
                id: '0'
            },
            {
                name: 'Java Cool',
                price: 5.99,
                id: '1'
            }
        ]
       }
        // Intercept the calls to the /product address
        // It returns back a route object
        page.route('https://api.valentinos-magic-beans.click/products', (route)=>{
            // fulfill helps us to mock data
            route.fulfill({
                status : 200,
                contentType: 'application/json',
                body: JSON.stringify(someProducts)
            })
        })
        await page.goto('https://valentinos-magic-beans.click/products')
        await page.waitForLoadState('networkidle');
        await page.locator('[data-test-id="product-card-add-to-cart-button-0"]').click()
        
        //assert product name
        const firstProductName = page.getByRole('heading', {
            name: someProducts.data[0].name
        })
        await expect(firstProductName).toBeVisible()
    })
});
