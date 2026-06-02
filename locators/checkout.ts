import {type Locator, type Page } from '@playwright/test'

export class CheckoutPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly proceedToCheckoutBtn: Locator;
    readonly firstNameInput : Locator;
    readonly lastNameInput : Locator;
    readonly emailInput : Locator;
    readonly addressInput : Locator;
    readonly cityInput : Locator;
    readonly zipCodeInput : Locator;
    readonly nameOnCardInput : Locator;
    readonly cardNumberInput : Locator;
    readonly expirationDateInput : Locator;
    readonly cvcInput : Locator;
    readonly placeOrderBtn : Locator;
    readonly orderConfirmationHeader : Locator;
    readonly orderConfirmationMessage : Locator;
    readonly orderId : Locator;
    readonly trackOrderLink : Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-test-id="product-card-504"] h3')
        this.productPrice = page.locator('[data-test-id="product-card-504"] span')
        this.proceedToCheckoutBtn = page.locator('[data-test-id="proceed-to-checkout"]')
        this.firstNameInput = page.locator('[data-test-id="checkout-firstname-input"]')
        this.lastNameInput = page.locator('[data-test-id="checkout-lastname-input"]')
        this.emailInput = page.locator('[data-test-id="checkout-email-input"]')
        this.addressInput = page.locator('[data-test-id="checkout-address-input"]')
        this.cityInput = page.locator('[data-test-id="checkout-city-input"]')
        this.zipCodeInput = page.locator('[data-test-id="checkout-zipcode-input"]')
        this.nameOnCardInput = page.locator('[data-test-id = "checkout-cardname-input"]')
        this.cardNumberInput = page.locator('[data-test-id="checkout-cardnumber-input"]')
        this.expirationDateInput = page.locator('[data-test-id="checkout-cardexpiry-input"]')
        this.cvcInput = page.locator('[data-test-id="checkout-cardcvc-input"]')
        this.placeOrderBtn = page.locator('[data-test-id="place-order-button"]')
        this.orderConfirmationHeader = page.locator('h3.tracking-tight')
        this.orderConfirmationMessage = page.locator("div.p-8 > p:nth-child(1)")
        this.orderId = page.locator("p.tracking-wider")
        this.trackOrderLink = page.locator('a[href="/contact"] button')
    }
}