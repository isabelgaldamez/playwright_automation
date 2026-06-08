import {type Page } from '@playwright/test';
import { SignUpPageLocators } from '../locators/signUp';

export async function signUpToPortal(page : Page, firstName : string,lastName : string,email : string, password : string){
    const signUpPage = new SignUpPageLocators(page);
    await signUpPage.firstNameInput.fill(firstName);
    await signUpPage.lastNameInput.fill(lastName);
    await signUpPage.emailInput.fill(email);
    await signUpPage.passwordInput.fill(password);
    await signUpPage.createAccountButton.click()
}

export async function addConfirmationCode(page: Page, confirmationCode : string){
    const signUpPage = new SignUpPageLocators(page);
    await signUpPage.confirmationCodeInput.fill(confirmationCode)
    await signUpPage.confirmAccountButton.click()

}
