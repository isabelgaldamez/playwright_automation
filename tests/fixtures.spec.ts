import {test, chromium} from '@playwright/test';

test.skip('Close cookies banner', async ({page}) => {
    await page.goto('https://www.udemy.com/');
    await page.getByRole('button', { name: 'OK ', exact: true }).click();
});

// test('Close cookies banner', async ({page}) => {
//     await page.goto('https://www.udemy.com/');
//     await page.pause();
// });


test('Browser fixture', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.udemy.com/');

    await context.close();
    await browser.close();
});

test('create page manually', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.udemy.com/');

    await context.close();
    await browser.close();
});