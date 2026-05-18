import {type Page } from '@playwright/test';
import { CheckoutPage } from '../locators/checkout';
// export class CheckoutHelper {
//     readonly page : Page;
//     // const checkoutPage = new CheckoutPage(page);

//     constructor (page : Page){
//         this.page = page;
//         const checkoutPage = new CheckoutPage(page);

//         async function addItemToCart(page){
//             const productName = await checkoutPage.productName.innerText()
//             const productPrice = await page.locator('[data-test-id="product-card-504"] span').innerText()
//             await page.click("[data-test-id='product-card-add-to-cart-button-504']");
        
//             return {
//                 productName,
//                 productPrice
//             }
//     }
// }


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

// export async function itemsQtyAddedToCart(page : Page){
//     const itemsQtyAddedToCart = await 

// }