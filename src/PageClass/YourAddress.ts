import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class YourAddress extends BasePage{

    private readonly addAddressLink:Locator
    private readonly removeButton:Locator

    constructor(page:Page){

        super(page)

        this.page = page

        this.addAddressLink = page.locator("//h2[contains(text(),'Add address')]")

        this.removeButton = page.locator("//div[contains(@id,'edit-address')]//a[text()='Remove']")
    }

    async clickAddAddressLink(){

        await this.addAddressLink.click()

        await this.page.waitForLoadState('domcontentloaded')
    }

    async delteAdreess(){

        await this.removeButton.click()
    }
}