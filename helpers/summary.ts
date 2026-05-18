import {type Page } from '@playwright/test';
import { summaryLocators } from '../locators/summary';

export async function verifySummaryInformation(page: Page){
    const summary = new summaryLocators(page);
    await summary.orderSummaryName.isVisible();
    const orderSummaryName = await summary.orderSummaryName.innerText();
    const orderSummaryPrice = await summary.orderSummaryPrice.innerText();
    const orderSummaryQty = await summary.orderSummaryQty.innerText();

    return {
        orderSummaryName,
        orderSummaryPrice,
        orderSummaryQty
    }
}

export async function orderTotalPrice(page : Page){
    const summary = new summaryLocators(page);

    const subTotal = await summary.subTotal.innerText();
    return {
        subTotal
    }
}
