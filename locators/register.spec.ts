import {Locator, Page} from '@playwright/test'; 

export class RegisterPageLocators {

    readonly page: Page;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerButton = page.locator('[data-testid="register-btn"]');
        
    } 
    async getRegisterButton() {
       return this.registerButton;
    }
}