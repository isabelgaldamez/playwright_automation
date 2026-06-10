import {test, expect} from '@playwright/test';
import * as loginPage from '../../helpers/login';
// import the above in order to read our node.js utilities
import path from 'path'
import fs from 'fs'

// reference for our auth session file, save it into a user.json file
    // const authSessionFile = path.resolve(__dirname, '../../playwright/.auth/user.json');
// Read the login data json file
    // const loginDataFile = path.resolve(__dirname, '../../playwright/.auth/loginData.json')
    // const loginData = JSON.parse(fs.readFileSync(loginDataFile, 'utf-8')) as {
    //     email : string,
    //     password : string
    // }

// test.skip('Authenticate', async({page}) => {
//     await page.goto('https://valentinos-magic-beans.click/login')
//     await loginPage.login(page, loginData.email, loginData.password)
//     await expect(page).toHaveURL('https://valentinos-magic-beans.click/')
//     // await loginPage.verifySuccessfulLogin(page)

//     // save the state of the browser page state inside the application persistance
//     await page.context().storageState({ path: authSessionFile})
// })


