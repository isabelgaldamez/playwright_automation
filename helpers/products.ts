import {type Page } from '@playwright/test';
import { productsLocators } from '../locators/products';


export async function addItemToCart(page : Page){
    const products = new productsLocators(page);
    const productName = await products.productName.innerText()
    const productPrice = await products.productPrice.innerText()
    await products.addToCartButton.click()

    return {
        productName,
        productPrice
    }
}
export async function verifySuccessMessage(page : Page){
    const products = new productsLocators(page);
    const addedToCartMessage = await products.addedToCartMessage.innerText();
    const productNameMessage = await products.addedProductNameMessage.innerText();
    // const addedToCartMessage = await page.locator("#root li > div > div:nth-child(1)").innerText();
    // const productNameMessage = await page.locator("#root li > div div:nth-child(2)").innerText();
    // const itemsQtyAddedToCart = await page.locator('[data-test-id="header-cart-button"] span').innerText();

    return {
        addedToCartMessage,
        productNameMessage,
        // itemsQtyAddedToCart
    }
}
export async function verifyQtyAddedToCart(page: Page){
    const products = new productsLocators(page);
    const itemsQtyAddedToCart = await products.itemsQtyAddedToCart.innerText();
    return {
        itemsQtyAddedToCart
    }
}

