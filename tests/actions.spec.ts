import {test, expect} from '@playwright/test';
import { describe } from 'node:test';
require('dotenv').config({path: '.env'});


describe('Actions - Use actions to interact with elements', async (page) => {
    
    test.beforeEach(async ({page}) => {
        await page.goto('login');
        await page.locator('#email').fill(`${process.env.TEST_USER_EMAIL}`);
        await page.locator('#password').fill(`${process.env.TEST_USER_PASSWORD}`);
        await page.getByRole('button', {name: 'Sign In'}).click();
        let itemCenter = await page.locator('div.items-center.gap-1 > a').first();
        await expect(itemCenter).toBeVisible();
    });

    test('Actions - As a user, I see the header menu', async ({page}) => { 
        const menuItems = ['Home', 'Events', 'My Bookings', 'API Docs']
        const itemCenter = await page.locator('div.items-center.gap-1 > a').all();
        for (let i = 0 ; i < itemCenter.length; i++) {
            const menuItem = await itemCenter[i].innerText();
            expect(menuItem).toContain(menuItems[i]);
        }
    });

    test('Actions (Fill/Dropdown/Click/Calendar)- As a user, create a new event', async ({page}) => { 
        
        let categoryItems = ['Conference', 'Concert', 'Sports', 'Workshop', 'Festival'];
        await page.click("a:has-text('Events')");
        await expect(page.locator('h1')).toHaveText('Upcoming Events');
        await page.click("a:has-text('Add New Event')")
        await expect(page.locator('h2').first()).toHaveText('+ New Event');

        let eventTitle = await page.getByTestId('event-title-input');
        await eventTitle.fill('Automation Practice Event');
        await page.locator('textarea').fill('Automation practice event for new and old students')

        await page.click('#category');
        let categoryList = await page.locator('#category > option').allInnerTexts();
        for (let i = 0; i < categoryList.length; i++) {
            await expect(categoryList[i]).toContain(categoryItems[i]);
        }
        await page.locator('#category').selectOption('Workshop') // Click on the "Workshop" option from dropdown
        await page.locator('#city').fill('San Francisco Bay Area');
        await page.locator('#venue').fill('San Francisco State University, Computer Science Building, Room 205');
        
        await page.getByLabel('Price ($)').fill('1.00');
        await page.locator('#total-seats').fill('150');
        
        await page.locator('[type="datetime-local"]').fill('2027-12-16T12:30');

        await page.getByRole('button', {name: '+ Add Event'}).click();
        await expect(page.locator('div.pointer-events-auto p')).toHaveText('Event created!', {timeout: 5000});
        await page.waitForTimeout(2000); // Wait for the event to be added to the list
        
        const createdEventTitle = await page.locator('tbody > tr:last-child td:nth-child(1) > span').innerText();
        const categoryType = await page.locator('tbody > tr:last-child td:nth-child(2) > span').innerText();
        const city = await page.locator('tbody > tr:last-child td:nth-child(3)').innerText();
        const eventDate = await page.locator('tbody > tr:last-child td:nth-child(4)').innerText();

        await expect(createdEventTitle).toContain('Automation Practice Event');
        await expect(categoryType).toContain('Workshop');
        await expect(city).toContain('San Francisco Bay Area');
        await expect(eventDate).toContain('16 Dec 2027');

        // Pop up will appear to confirm deletion of the event, if the event is created successfully, then delete the event
        let isEventCreated = await page.getByTestId('delete-event-btn').isVisible({timeout: 3000});  
        if (isEventCreated) {
            await page.getByTestId('delete-event-btn').click();
            await page.getByTestId('confirm-dialog-yes').click();
        }
    });


});