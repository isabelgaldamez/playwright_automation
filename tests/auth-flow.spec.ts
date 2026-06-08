import {test, expect} from '@playwright/test';
import { describe } from 'node:test';
import { EmailUtils } from '../helpers/utils/emailUtils';
import * as signUpPage from '../helpers/signUp';
import * as loginPage from '../helpers/login';
import {join, resolve } from 'path'
import { writeFileSync, existsSync, mkdirSync } from 'fs';

require('dotenv').config({path: '.env'});

const run_sign_up = process.env.run_sign_up

describe('Email - auth validations', async (page) => {
    const emailUtils = new EmailUtils()
    
    test('As a new user, I sign up to the portal', async ({page})=>{
        // test.skip(run_sign_up != 'true', 'Skipping sign up test')
        const inbox = await emailUtils.createInbox();
        
        await page.goto('https://valentinos-magic-beans.click/signup');
        await signUpPage.signUpToPortal(page, 'Mercedes', 'de Leon', inbox.emailAddress,`${process.env.TEST_USER_PASSWORD}`)
        const email = await emailUtils.waitForLatestEmail(inbox.id)
        const verificationCode = /([0-9]{6})$/.exec(email?.body!)![1];
        await signUpPage.addConfirmationCode(page, verificationCode)

        await loginPage.login(page, inbox.emailAddress, `${process.env.TEST_USER_PASSWORD}`)
        // await loginPage.verifySuccessfulLogin(page)
        //persist login data:
        const loginData = {
            email : inbox.emailAddress,
            password : process.env.TEST_USER_PASSWORD
        }

        const authDir = resolve(__dirname, '../playwright/.auth')

        // verify if auth directory exists if not create one
        if(!existsSync(authDir)){
            mkdirSync(authDir, {recursive: true})
        }
        writeFileSync(
            // if exists (directory), call it and read the data from the file
            join(authDir, 'loginData.json'),
            JSON.stringify(loginData, null, 2)
        )
    });
});
