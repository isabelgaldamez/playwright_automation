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
export async function proceedToCheckout(page: Page){
    const checkoutPage = new CheckoutPage(page);
    checkoutPage.proceedToCheckoutBtn.click();
}
export async function fillOutContactInformation(page: Page, firstName: string, lastName: string, email: string){
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.firstNameInput.fill(firstName);
    await checkoutPage.lastNameInput.fill(lastName);
    await checkoutPage.emailInput.fill(email);
}
export async function fillOutAddressInformation(page: Page, address: string, city: string, zipCode: string){
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.addressInput.fill(address);
    await checkoutPage.cityInput.fill(city);
    await checkoutPage.zipCodeInput.fill(zipCode);
}
export async function fillOutCardInformation(page: Page, nameOnCard : string,  cardNumber : string, expDate: string, cvc : string){
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.nameOnCardInput.fill(nameOnCard);
    await checkoutPage.cardNumberInput.fill(cardNumber);
    await checkoutPage.expirationDateInput.fill(expDate);
    await checkoutPage.cvcInput.fill(cvc);
}
export async function placeOrderBtn(page: Page){
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.placeOrderBtn.click();
}
export async function verifyOrderConfirmation(page: Page){
    const checkoutPage = new CheckoutPage(page)
    const orderConfirmationHeader = await checkoutPage.orderConfirmationHeader.innerText();
    const orderConfirmationMessage = await checkoutPage.orderConfirmationMessage.innerText();
    return {
        orderConfirmationHeader,
        orderConfirmationMessage

    }
}

export async function getOrderId(page : Page){
    const checkoutPage = new CheckoutPage(page)
    const orderId = await checkoutPage.orderId.innerText();
    return orderId;
}

export async function trackOrder(page: Page){
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.trackOrderLink.click();
}