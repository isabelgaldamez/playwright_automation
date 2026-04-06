import {expect, test} from '@playwright/test';
import { describe } from 'node:test';

describe('GetByLabel - Use getByLabel locators', async (page) => {

    test.beforeEach(async ({page}) => {
        await page.goto('register');
    });

    test('GetByLabel [forms] - As a visitor, I want register as a new user', async ({page}) => {
        const emailLabel = await page.getByLabel('Email').all;
        await page.getByTestId('register-email').fill('email@email.com')
        const passwordLabel = await page.getByLabel('Password');
        await page.getByTestId('register-password').fill('password@1')
        const confirmPasswordLabel = await page.getByLabel('Password');
        await page.getByPlaceholder('Repeat your password').fill('password@1')
    });
});