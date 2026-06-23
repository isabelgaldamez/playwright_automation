import {APIRequestContext, expect, test} from '@playwright/test';
import { describe,beforeEach } from 'node:test';
import * as tracking from '../helpers/tracking';


const orderPayload = {
    customerDetails: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        address: "1234 Main St.",
        city: "Rhyolite",
        zipCode: "89003",
        country: "United States"
    },
    items: [
        {
            productId: "501",
            quantity: 1
        }
    ]
}
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

test('Place an order via api, and continue via e2e', async({page}) =>{
    // Make HTTP request (precondition) - create new order
    const newOrdersResponse = await apiContext.post('/orders', {
        data: orderPayload
    })
    // Check status code
    expect(newOrdersResponse.status()).toBe(201)
    const orderBody = await newOrdersResponse.json()
    const orderId = orderBody.data.orderId
    console.log(orderId)

    // Write UI tests
    await page.goto('https://valentinos-magic-beans.click/contact')
    await tracking.trackingInfo(page, orderId, orderPayload.customerDetails.email)
    await tracking.clickTrackOrderBtn(page);

    
    
    const userName = await tracking.customerName(page, orderId);
    expect(userName).toContain(orderPayload.customerDetails.firstName + ' ' + orderPayload.customerDetails.lastName)
    
    const  userEmail = await tracking.customeEmail(page, orderId);
    expect(userEmail).toContain(orderPayload.customerDetails.email)

    // Make HTTP request (postcondition)
    const lookupPayload = {
            email : orderPayload.customerDetails.email,
            orderId : orderId
    } 
    const orderLookUpResponse = await apiContext.post('/orders/lookup', {
            data: lookupPayload
        })
    
    // to verify information that is available via api but not in the UI
    expect(orderLookUpResponse.status()).toBe(200)
    const lookupBody = await orderLookUpResponse.json()
    expect(lookupBody.data.items[0].productName).toBe("Ethiopian Highlands")
    

})

// Once used, we need to destroy the context
test.afterAll(async({})=>{
    await apiContext.dispose();
});