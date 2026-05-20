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
    
    return {
        addedToCartMessage,
        productNameMessage
    }
}
export async function verifyQtyAddedToCart(page: Page){
    const products = new productsLocators(page);
    const itemsQtyAddedToCart = await products.itemsQtyAddedToCart.innerText();
    return {
        itemsQtyAddedToCart
    }
}

