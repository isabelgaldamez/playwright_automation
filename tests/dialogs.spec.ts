import {test, expect} from '@playwright/test';
import { describe } from 'node:test';
require('dotenv').config({path: '.env'});

describe('Dialogs - Handle pop up dialogs with Playwright', async (page) => {
    
    test.beforeEach(async ({page}) => {
        await page.goto('login');
        await page.locator('#email').fill(`${process.env.TEST_USER_EMAIL}`);
        await page.locator('#password').fill(`${process.env.TEST_USER_PASSWORD}`);
        await page.getByRole('button', {name: 'Sign In'}).click();
        let itemCenter = await page.getByTestId('nav-bookings').first();
        await itemCenter.click();

    });

    test('Dialogs (Pop ups - Accept) - As a user, I click on the `Clear all bookings` when I have no booking made', async ({page}) => {
        // Event listener, should be done before visiting the page.
        page.on('dialog', async dialog =>{
            await dialog.accept(); // Click on the "OK" button of the pop up dialog.
        })
        await page.locator('#nav-bookings').click({timeout: 3000});
    });

    test('Dialogs (Pop ups - Reject) - As a user, I click on the `Clear all bookings` when I have no booking made', async ({page}) => {
        // Event listener, should be done before visiting the page.
        page.on('dialog', async dialog =>{
            if(dialog.message().includes('Clear all your bookings?')){
                await dialog.dismiss(); // Click on the "Cancel" button of the pop up dialog.
                return;
            }
        })
        await page.locator('#nav-bookings').click({timeout: 3000});
        
    });

    test('Dialogs (Console) - Check for errors inside the browser console', async ({page}) => {
        // event listener, should be done before visiting the page.
        page.on('console', msg => {
          expect.soft(msg.type(), `Received error log: ${msg.text()}}`).not.toBe('error'); // Check that there are no error messages in the console.
        });
        await page.locator('#nav-bookings').click({timeout: 3000});

    });
    test('Request (Console) - Check for errors inside the browser console', async ({page}) => {
        // event listener, should be done before visiting the page.
        page.on('console', msg => {
          expect.soft(msg.type(), `Received error log: ${msg.text()}}`).not.toBe('error'); // Check that there are no error messages in the console.
        });
        await page.locator('#nav-bookings').click({timeout: 3000});

    });

});