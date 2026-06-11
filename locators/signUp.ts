import {Locator, Page} from '@playwright/test'; 

export class SignUpPageLocators {

    readonly page: Page;
    readonly firstNameInput : Locator;
    readonly lastNameInput : Locator;
    readonly emailInput : Locator
    readonly passwordInput : Locator;
    readonly createAccountButton : Locator;
    readonly confirmationCodeInput : Locator;
    readonly confirmAccountButton : Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test-id="signup-firstname-input"]')
        this.lastNameInput = page.locator('[data-test-id="signup-lastname-input"]')
        this.emailInput = page.locator('[data-test-id="signup-email-input"]')
        this.passwordInput = page.locator('[data-test-id="signup-password-input"]')
        this.createAccountButton = page.locator('[data-test-id="signup-submit-button"]')
        this.confirmationCodeInput = page.locator('input[inputmode="numeric"]')
        this.confirmAccountButton = page.locator('[data-test-id="confirm-signup-submit-button"]')
    } 
}