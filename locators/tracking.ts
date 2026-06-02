import {Selectors, type Locator, type Page } from '@playwright/test'
export class TrackingPage {
    readonly page: Page;
    readonly trackOrderHeader : Locator;
    readonly orderIdInput : Locator;
    readonly emailAddressInput : Locator;
    readonly trackOrderBtn : Locator

    constructor(page: Page) {
        this.page = page;
        this.trackOrderHeader = page.locator('div.grid > div:nth-child(2) h3.tracking-tight:nth-child(1)')
        this.orderIdInput = page.locator("[data-test-id='contact-order-id-input']")
        this.emailAddressInput = page.locator("[data-test-id='contact-email-input']")
        this.trackOrderBtn = page.locator("[data-test-id='contact-track-order-button']")  
    }
    async orderDetailHeader(trackingId : string){
        return this.page.locator(`[data-test-id='order-detail-page-${trackingId}'] h3:nth-child(1)`)
    }
    async orderedItem(trackingId : string){
        return this.page.locator(`[data-test-id='order-detail-page-${trackingId}'] div.justify-between p:nth-child(1)`)
    }
    async itemPrice(trackingId : string ){
        return this.page.locator(`[data-test-id='order-detail-page-${trackingId}'] div.justify-between > p`)
    }
    async customerName(trackingId: string){
        return this.page.locator(`[data-test-id='order-detail-page-${trackingId}'] h3:nth-child(4) + div > p:nth-child(1)`)
    }
    async customerEmail(trackingId: string){
        return this.page.locator(`[data-test-id='order-detail-page-${trackingId}'] h3:nth-child(4) + div > p:nth-child(2)`)
    }
    
}