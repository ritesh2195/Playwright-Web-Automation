import { Locator, Page } from "@playwright/test";

export class AccountPage{

    readonly page:Page;
    readonly addressLink:Locator;

    constructor(page:Page){

        this.page = page;

        this.addressLink = page.locator("//h2[contains(text(),'Your Addresses')]")

    }

    async navigateToAddressPage(){

        await this.addressLink.click()
    }
}