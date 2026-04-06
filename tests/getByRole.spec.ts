import {test, expect} from '@playwright/test';
import { before, beforeEach, describe } from 'node:test';

const baseURL = 'https://eventhub.rahulshettyacademy.com';
describe('GetByRole(Locators) - Use getByRole locators', async (page) => {
  
    test.beforeEach(async ({page}) => {
        await page.goto(baseURL + '/login');
    });

    test('As a visitor, I want to read the heading text to sign in', async ({page}) => {
        const signInHeader =  page.getByRole('heading', {name:'Sign in to EventHub'});
        await expect(signInHeader).toBeVisible();
    });

    test('GetByRole(Lists) - As a visitor, I need to read the task I can do in this website ', async ({page}) => {

        const listedTasks = page.getByRole('list');
        await expect(listedTasks).toBeVisible();

        const tasks = listedTasks.getByRole('listitem');
        await expect(tasks).toHaveCount(4);

        let tasksEvents = {
            0: 'Live REST APIs — test real endpoints, not mocks',
            1: 'Isolated sandbox — your data, your tests, no conflicts',
            2: 'Auth, CRUD, bookings — flows you\'ll face on the job',
            3: 'Build for Selenium, Playwright, RestAssured, and more',
        };
        await expect(tasks.first()).toContainText(tasksEvents[0]);
        await expect(tasks.nth(1)).toContainText(tasksEvents[1]);
        await expect(tasks.nth(2)).toContainText(tasksEvents[2]);
        await expect(tasks.nth(3)).toContainText(tasksEvents[3]);
    });

    test('GetByRole(Buttons) - As a visitor, I see error messages when I click on Sign In button', async ({page}) => {

        await page.getByRole('button', {name: 'Sign in'}).click();

        const errorMessagesEmail = await page.locator('#email + p').innerText();
        const errorMessagesPassword = await page.locator('#password + p').innerText();
        
        await expect(errorMessagesEmail).toContain('Enter a valid email');
        await expect(errorMessagesPassword).toContain('Password must be at least 6 characters');

    });

    test('GetByRole(Links) - As a visitor, I click on the "Register" link', async ({page}) => {

        await page.getByRole('link', {name: 'Register'}).click();

        await expect(page).toHaveURL(baseURL + '/register');
        await expect(page.getByRole('heading', {name: 'Create your account'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Create Account'})).toBeVisible();

    });

});