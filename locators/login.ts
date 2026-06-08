import {type Locator, type Page } from '@playwright/test'
export class loginPageLocators {
    readonly page: Page;
    readonly emailInput : Locator
    readonly passwordInput : Locator
    readonly loginButton : Locator

    constructor(page: Page){
        this.page = page
        this.emailInput = page.locator('[data-test-id="login-email-input"]')
        this.passwordInput = page.locator('[data-test-id="login-password-input"]')
        this.loginButton = page.locator('[data-test-id="login-submit-button"]')
    }
}