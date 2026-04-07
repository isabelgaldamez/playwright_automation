import { test,expect } from '@playwright/test';
import { describe } from 'node:test';

describe('Locators - Use locators to find elements', async (page) => {
    
    test.beforeEach(async ({page}) => {
        await page.goto('register');
    });

    test('Locators - As a visitor, I see the `Explore courses`, `Explore Skills` and `API Documentation` are visible in register page', async ({page}) => {
        const exploreCoursesBtn = await page.locator('a').first().innerText();
        const exploreSkillsBtn = await page.locator('a').nth(1).innerText();
        const apiDocLink = await page.locator('div > a').nth(2).innerText();

        expect(exploreCoursesBtn).toBe('Explore all courses at RahulShettyAcademy.com');
        expect(exploreSkillsBtn).toBe('Explore Skill Assessments — QA Job Hiring Platform');
        expect(apiDocLink).toBe('API Documentation (Swagger)');

    });

    test('Locators - As a visitor, I want to read the page features using list elements', async ({page}) => {
        const list = [
            'Live REST APIs — test real endpoints, not mocks',
            'Isolated sandbox — your data, your tests, no conflicts',
            'Auth, CRUD, bookings — flows you\'ll face on the job',
        ]
        const featuresList = await page.locator('ul > li.items-start').all()
        expect(featuresList.length).toBeGreaterThan(0)
        for(let i = 0; i < featuresList.length - 1; i++) {
           let listDisplayed = await featuresList[i].innerText()
            expect(listDisplayed).toContain(list[i])
        }

    });

    test('Locators - As a visitor, I want to view API page', async ({page, context}) => {
        // Focuses on a new page that opens when the API Documentation link is clicked. 
        // We use waitForEvent to wait for the new page to open and then we can interact with it.
        
        const apiPagePromise = context.waitForEvent('page', {timeout: 5000});


        const apiLink = await page.locator('div > a').last();
        expect(apiLink).toContainText('API Documentation (Swagger)');
        await apiLink.click();

        const newPage = await apiPagePromise;
        const swaggerHeader = await newPage.locator('div.renderedMarkdown > p').first().innerText();
        await expect(swaggerHeader).toBe('REST API for the EventHub ticket booking platform.');
    });

});