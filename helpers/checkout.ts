import {type Page } from '@playwright/test';
import { CheckoutPage } from '../locators/checkout';

export async function addItemToCart(page : Page){
    const checkoutPage = new CheckoutPage(page);
    const productName = await checkoutPage.productName.innerText()
    const productPrice = await checkoutPage.productPrice.innerText()
    await page.click("[data-test-id='product-card-add-to-cart-button-504']");

    return {
        productName,
        productPrice
    }
}
