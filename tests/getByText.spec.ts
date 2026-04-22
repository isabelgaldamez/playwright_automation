import {test, expect} from '@playwright/test';
import { describe } from 'node:test';
import { RegisterPageLocators as reg} from '../locators/register.spec.ts';   


describe('GetByText - Use getByText locators', async (page) => {

    test.beforeEach(async ({page}) => {
        await page.goto('register');
    });
    // GetByText can be used for dynamic text in the application.
    test('GetByText - As a visitor, I want to read the heading text of Registration page', async ({page}) => {
        const titleText = page.getByText('Create your account');
        expect(titleText).toBeVisible({timeout: 3000});
    });
    test('GetByText, validate error message at username input',async ({page}) => {
        await page.click('[data-testid="register-btn"]')
        const emailErrorMessage = page.getByText('Enter a valid email');
        const passwordErrorMessage = page.getByText('Password does not meet the requirements below');
        expect(emailErrorMessage).toBeVisible();
        expect(passwordErrorMessage).toBeVisible();
    });

    test('GetByText, validate error message at password input',async ({page}) => {
        const emailInput = await page.getByRole('textbox', {name: 'Email'});
        await emailInput.fill('username@test.com')
        const passwordInput = await page.getByTestId('register-password');
        await passwordInput.fill('Test');
        const confirmPasswordInput = page.getByRole('textbox', { name: 'Password'});
        await confirmPasswordInput.fill('Test');
        await page.click('[data-testid="register-btn"]')
        const passwordErrorMessage = await page.getByText('Password does not meet the requirements below');
        expect(passwordErrorMessage).toBeVisible();
    });
});
