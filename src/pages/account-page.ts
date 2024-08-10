import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class AccountPage extends BasePage{

    private readonly addressLink:Locator;

    constructor(page:Page){

        super(page)

        this.page = page;

        this.addressLink = page.locator("//h2[contains(text(),'Your Addresses')]")

    }

    async navigateToAddressPage(){

        await this.addressLink.click()

        await this.page.waitForLoadState('load')
    }
}