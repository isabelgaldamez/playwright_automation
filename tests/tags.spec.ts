import {test, expect, devices} from '@playwright/test';
import { describe } from 'node:test';
require('dotenv').config({path: '.env'});

const iphone = devices['iPhone 15'];

test.describe('Tags - Use tags to organize tests', () => {
    test.use({
        locale: 'it-IT',
    })
    test('Smoke Test - As a user, I need to see images loading on page',{tag: '@Smoke'}, async ({request}) => {
        const icons = await request.get('/_next/image?url=%2Fapp-preview.png&w=1920&q=75');
        await expect(icons).toBeOK();
        expect(icons.status()).toBe(200);
    });

    test('Smoke Test - As a user, I want to see the Sign In page',{
        tag: ['@smoke', '@regression'],
    }, async ({request}) => {
        const signInPage = await request.get('/login');
        await expect(signInPage).toBeOK();
        expect(signInPage.status()).toBe(200);
    });

    test('Setting options inside the test', async ({browser}) => {
        const context = await browser.newContext({
            locale: 'hi-IN'
        })
        const page = await context.newPage();
        await page.goto('http://www.google.com/');
    });
});

test.use({
    defaultBrowserType: 'firefox',
    viewport: {
        width: 800,
        height: 400
    }
})

test('Observe window size', async ({page}) =>{
    await page.goto('https://www.google.com')
});