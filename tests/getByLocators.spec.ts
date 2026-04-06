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
});