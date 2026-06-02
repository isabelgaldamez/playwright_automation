import {expect, test} from '@playwright/test';
import { describe,beforeEach } from 'node:test';
import {productsLocators} from '../locators/products'
import * as checkout from '../helpers/checkout';
import * as products from '../helpers/products';
import * as summary from '../helpers/summary';
import * as tracking from '../helpers/tracking';
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

    test('As a visitor, I fill out my checkout order info', async({page}) => {
        const prodLoc = new productsLocators(page);
        const items = await checkout.addItemToCart(page);
        const qtyItems = await products.verifyQtyAddedToCart(page);
        
       const cartBtn =  await prodLoc.cartButton()
       await cartBtn.click();

       // Proceed to checkout
        await checkout.proceedToCheckout(page)
       // Fill out contact informaion
       await checkout.fillOutContactInformation(page, 'Mercedes', 'de Leon', 'mercedes@gmail.com')

       // Shipping Address
       await checkout.fillOutAddressInformation(page, '123 Main St', 'San Francisco', '94087')
   
       //Payment Information
       await checkout.fillOutCardInformation(page,'Mercedes de Leon', '4238 2849 2190 8632', '12/30', '000')
    
       await checkout.placeOrderBtn(page)

        //Place order confirmation
        await page.waitForURL('/order-confirmation')
        const confirmationMessage = await checkout.verifyOrderConfirmation(page);
        expect(confirmationMessage.orderConfirmationHeader).toEqual('Order Confirmed!')
        expect(confirmationMessage.orderConfirmationMessage).toEqual('Thank you for your purchase. Your order has been placed successfully.')
        const orderId = await checkout.getOrderId(page);
        expect(orderId).toMatch(/[a-zA-Z0-9]{8}$/)
    });

    test('As a visitor, I track my order info', async({page}) => {
        const prodLoc = new productsLocators(page);
        const items = await checkout.addItemToCart(page);
        
        const cartBtn =  await prodLoc.cartButton()
        await cartBtn.click();

        // Proceed to checkout
        await checkout.proceedToCheckout(page)
        // Fill out contact informaion
        await checkout.fillOutContactInformation(page, 'Mercedes', 'de Leon', 'mercedes@gmail.com')

        // Shipping Address
        await checkout.fillOutAddressInformation(page, '123 Main St', 'San Francisco', '94087')
   
        //Payment Information
        await checkout.fillOutCardInformation(page,'Mercedes de Leon', '4238 2849 2190 8632', '12/30', '000')
    
        await checkout.placeOrderBtn(page)

        //Place order confirmation
        await page.waitForURL('/order-confirmation')
        const getTrackingId = await checkout.getOrderId(page);

        await checkout.trackOrder(page);

        await tracking.trackingInfo(page, getTrackingId, 'mercedes@gmail.com')
        await tracking.clickTrackOrderBtn(page);

        // Verify order tracking information
        await page.waitForURL('/order/' + getTrackingId)
        
        // Verify user information is in tracking receipt
        const getItemName = await tracking.orderedItem(page, getTrackingId);
        expect(getItemName).toContain(items.productName);

        const itemPrice = await tracking.itemPrice(page, getTrackingId);
        expect(itemPrice).toContain(items.productPrice);

        const userName = await tracking.customerName(page, getTrackingId);
        expect(userName).toContain('Mercedes de Leon')

        const  userEmail = await tracking.customeEmail(page, getTrackingId);
        expect(userEmail).toContain('mercedes@gmail.com')
    });
})