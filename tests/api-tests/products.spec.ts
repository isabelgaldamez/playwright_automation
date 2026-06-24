import { test, expect } from '@playwright/test'
import { describe } from 'node:test'



describe('API testing', async() => {
    test('GET - Should get all products', async({ request }) => {
        // Make HTTP request
        const response = await request.get('https://api.valentinos-magic-beans.click/products')

        // Check status code
        expect(await response.status()).toBe(200)

        // check headers
        expect(response.headers()['content-type']).toBe('application/json')

        // Parse JSON response
        const responseBody = await response.json()

        // Response structure validation
        expect(responseBody).toHaveProperty('success', true);
        expect(responseBody).toHaveProperty('data');
        expect(Array.isArray(responseBody.data)).toBe(true);
        expect(responseBody.data.length).toBeGreaterThan(0);
    })
    
})
