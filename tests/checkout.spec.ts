import {expect, test} from '@playwright/test';
import { describe,beforeEach } from 'node:test';
import {productsLocators} from '../locators/products'
import * as checkout from '../helpers/checkout';
import * as products from '../helpers/products';
import * as summary from '../helpers/summary';
test.use({
  baseURL: 'https://valentinos-magic-beans.click/',
});

describe('Practice checkout for Valentino\'s Magic Beans', async() => {
    let prodLoc;
    
    test.beforeEach(async ({ page })=>{
        prodLoc = new productsLocators(page);

        await page.goto('/products');
        
    }); 

    test('As a visitor, I add an item to my shopping cart', async({page}) => {
        const items = await checkout.addItemToCart(page);
        const messages = await products.verifySuccessMessage(page);
        // expect(messages.itemsQtyAddedToCart).toEqual('1');
        expect(messages.addedToCartMessage).toEqual('Added to Cart');
        expect(messages.productNameMessage).toEqual(items.productName + ' is now in your cart.');
    });

    test('As a visitor, I verify the summary page for the item added', async({page}) => {
        const prodLoc = new productsLocators(page);
        const items = await checkout.addItemToCart(page);
        const qtyItems = await products.verifyQtyAddedToCart(page);
        
       const cartBtn =  await prodLoc.cartButton()
       await cartBtn.click();

        // Order Summary
        const summaryInfo = await summary.verifySummaryInformation(page);
        expect(summaryInfo.orderSummaryName).toContain(items.productName);
        expect(summaryInfo.orderSummaryPrice).toContain(items.productPrice);
        expect(summaryInfo.orderSummaryQty).toContain(qtyItems.itemsQtyAddedToCart);

        const orderTotal = await summary.orderTotalPrice(page);

        const subTotal = await page.getByText('Subtotal').locator('..').locator('.font-semibold');
        const shipping = await page.locator('span').filter({ hasText: '$5.99'}).isVisible();
        const totalPrice = await page.locator('[data-test-id="total-price"]').innerText();

        expect(orderTotal.subTotal).toEqual(items.productPrice);
        expect(shipping).toBeTruthy();
        expect(totalPrice).toEqual("$28.98");

    });
})