import {test, expect} from '@playwright/test';

let playwrightPage = 'https://playwright.dev/';
test('Verify heading has the correct text', async ({page}) => {
    await page.goto(playwrightPage);
    await page.click("a[href='/docs/intro']")
    let header = await page.locator('h2').first().innerText();

    await expect(header).toContain("Introduction");
})