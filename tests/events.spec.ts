import {test, expect, Request} from '@playwright/test';
import { describe } from 'node:test';
require('dotenv').config({path: '.env'});

test.use({
    baseURL: ''
})

test('Request Events - Listen to request events', async ({page}) => {
    page.on('request', addRequest); // Listen to the "request" event, every time a request is made, the "addRequest" function will be called.

    const requests : Request[] = [] // array of requests of type Request array
    function addRequest(request: Request) {
        // every request made will be added to the array of requests
        requests.push(request);
    };
    await page.goto('https://playwright.dev/');

    requests.forEach(request => {
        console.log(`${request.resourceType()} : ${request.url()}`);
    });
    
});

test.skip('Check failed requests', async ({page}) => {
    page.on('requestfailed', request => {
        expect(request, 
            `failed request to ${request.url()} with error ${request.failure()?.errorText}`
        ).toBeUndefined(); // Check that there are no failed requests, if there are any failed requests, the test will fail and the request will be printed in the console.
    })
    await page.goto('https://playwright.dev/');
    const requestButton = page.getByRole('button', {name: 'Call wrong server'});
    await requestButton.click();

});
