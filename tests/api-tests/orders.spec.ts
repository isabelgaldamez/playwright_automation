import { test, expect } from '@playwright/test'
import { describe } from 'node:test'

const orderPayload = {
    "customerDetails": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "address": "1234 Main St.",
        "city": "Rhyolite",
        "zipCode": "89003",
        "country": "United States"
    },
    "items": [
        {
            "productId": "504",
            "quantity": 1
        }
    ]
}

describe('Orders API testing', async() => {
    test('POST - Validate place an order as a guest user', async({ request }) =>{
        const orderResponse = await request.post('/orders', {
            data: orderPayload
        })

        // Check status code
        expect(orderResponse.status()).toBe(201)
        const orderBody = await orderResponse.json();

        // Validate order response
        expect(orderBody).toHaveProperty('success', true)
        expect(orderBody).toHaveProperty('data')

    })
})