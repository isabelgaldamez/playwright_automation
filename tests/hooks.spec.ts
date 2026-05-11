import {test, expect} from '@playwright/test';
import { before, describe } from 'node:test';
require('dotenv').config({path: '.env'});

describe('Hooks - Use hooks to set up and tear down tests', async (page) => {
    test.beforeAll(async () => {
        console.log('This will run before all tests in this describe block');
        console.log('Normally is used to set up database connections, initialize test data, etc.');

    });
    test.beforeEach(async ({page}) => {
        console.log('This will run before each test in this describe block');
    });
    test('Test 1', async ({page}) => {
        console.log('This is test DB1');
    });
    test.afterEach(async () => {
        console.log('Used to clean DB after each test, close connections, etc.');
    });
    test.afterAll(async () => {
        console.log('Close DB connections, clean up test data, etc.');
    });
});