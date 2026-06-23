import {APIRequestContext, expect, test} from '@playwright/test';
import { describe,beforeEach } from 'node:test';

// Note: Use api's on an e2e tests 

// Request context
let apiContext : APIRequestContext;

// Before ALL initialize this apiContext, specify the baseURL, headers
// This will be our request object
test.beforeAll(async({playwright}) => {
    apiContext = await playwright.request.newContext({
        baseURL : 'https://api.valentinos-magic-beans.click',
        extraHTTPHeaders: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        },
    });
});

test.skip('Place an order via api, and continue via e2e', async({page}) =>{
    // Make HTTP request (precondition) - create new order
    const newOrdersResponse = await apiContext.post('/orders')

    // Write UI tests

    // Make HTTP request (postcondition)
    const orderLookUpResponse = await apiContext.post('/orders/lookup')
    // to verify information that is available via api but not in the UI
})

// Once used, we need to destroy the context
test.afterAll(async({})=>{
    await apiContext.dispose();
});