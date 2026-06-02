import {type Page } from '@playwright/test';
import { TrackingPage } from '../locators/tracking';

export async function trackingInfo(page : Page, orderId: string, email: string){
    const trackingPage = new TrackingPage(page);
    await trackingPage.orderIdInput.fill(orderId);
    await trackingPage.emailAddressInput.fill(email);
}

export async function clickTrackOrderBtn(page: Page){
    const trackingPage = new TrackingPage(page);
    await trackingPage.trackOrderBtn.click();
}

export async function orderDetailHeader(page: Page, trackingId : string){
    const trackingPage = new TrackingPage(page);
    const getOrderHeader = (await trackingPage.orderDetailHeader(trackingId)).innerText();
    return getOrderHeader;
}
export async function orderedItem(page: Page, trackingId : string){
    const trackingPage = new TrackingPage(page);
    const getOrderedItem = (await trackingPage.orderedItem(trackingId)).innerText();
    return getOrderedItem;
}
export async function itemPrice(page: Page, trackingId : string){
    const trackingPage = new TrackingPage(page);
    const itemPrice = (await trackingPage.itemPrice(trackingId)).innerText();
    return itemPrice;
}
export async function customerName(page: Page, trackingId : string){
    const trackingPage = new TrackingPage(page);
    const customerName = (await trackingPage.customerName(trackingId)).innerText();
    return customerName;
}
export async function customeEmail(page: Page, trackingId : string){
    const trackingPage = new TrackingPage(page);
    const customerEmail = (await trackingPage.customerEmail(trackingId)).innerText();
    return customerEmail;
}