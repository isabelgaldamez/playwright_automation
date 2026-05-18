import {type Locator, type Page } from '@playwright/test'

export class summaryLocators {
    readonly page: Page;
    readonly orderSummaryName : Locator
    readonly orderSummaryPrice : Locator
    readonly orderSummaryQty : Locator
    readonly subTotal : Locator
    readonly shipping : Locator

    constructor(page : Page){
        this.page = page;
        this.orderSummaryName = page.locator('[data-test-id="cart-item"] h3');
        this.orderSummaryPrice = page.locator('[data-test-id="cart-item"] p:nth-child(3)');
        this.orderSummaryQty = page.locator('[data-test-id="quantity-504"]');
        this.subTotal = page.getByText('Subtotal').locator('..').locator('.font-semibold');
    }
}