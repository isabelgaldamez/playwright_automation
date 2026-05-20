import {Selectors, type Locator, type Page } from '@playwright/test'

export class productsLocators {
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly addedToCartMessage: Locator;
    readonly addedProductNameMessage : Locator;
    readonly itemsQtyAddedToCart : Locator
    readonly cartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-test-id="product-card-504"] h3')
        this.productPrice = page.locator('[data-test-id="product-card-504"] span')
        this.addToCartButton = page.locator("[data-test-id='product-card-add-to-cart-button-504']")
        this.addedToCartMessage = page.locator("#root li > div > div:nth-child(1)")
        this.addedProductNameMessage = page.locator("#root li > div div:nth-child(2)")
        this.cartBtn = page.locator('[data-test-id="header-cart-button"] button')
        this.itemsQtyAddedToCart = page.locator('[data-test-id="header-cart-button"] span')
    } 
    async cartButton(){
        return this.cartBtn
    } 
}
