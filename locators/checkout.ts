import {type Locator, type Page } from '@playwright/test'

export class CheckoutPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-test-id="product-card-504"] h3')
        this.productPrice = page.locator('[data-test-id="product-card-504"] span')
    }
}