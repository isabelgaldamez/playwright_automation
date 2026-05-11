import {test, devices} from '@playwright/test';
// const iphone = devices['iPhone 13 Pro'];

// test.use({
//     baseURL: '',
//     ...iphone,
// })
const latestIphoenSize = {
    width: 1024,
    height: 600
}
test.use({ 
    ...devices['Galaxy A55'],
    geolocation: {
        latitude: -15.79374,
        longitude : -47.88477
    },
    permissions : ['geolocation'],
    // viewport: latestIphoenSize,
 });

test('Mobile : Observe window size', async ({page}) =>{
    await page.goto('https://www.google.com')
    page.pause();
});
test('Location Test', async ({page}) =>{
    await page.goto('https://www.openstreetmap.org')
    page.pause();
});