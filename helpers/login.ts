import {expect, type Page } from '@playwright/test';
import { loginPageLocators } from '../locators/login';

export async function login(page : Page, email : string, password : string){
    const loginPage = new loginPageLocators(page)
    await loginPage.emailInput.fill(email)
    await loginPage.passwordInput.fill(password)
    await loginPage.loginButton.click()
}

export async function verifySuccessfulLogin(page : Page){
    const loginPage = new loginPageLocators(page)
    await expect(page).toHaveURL('/')
}