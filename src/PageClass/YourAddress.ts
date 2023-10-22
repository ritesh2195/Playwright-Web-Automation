import { ElementHandle, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class YourAddress extends BasePage{

    private readonly addAddressLink:Locator
    private readonly removeButton:Locator
    private readonly userFullName:Promise<ElementHandle<SVGElement | HTMLElement>[]>;
    private readonly yesButton:Locator

    constructor(page:Page){

        super(page)

        this.page = page

        this.addAddressLink = page.locator("//h2[contains(text(),'Add address')]")

        this.removeButton = page.locator("//div[contains(@id,'edit-address')]//a[text()='Remove']")

        this.userFullName = page.$$("//div[contains(@class,'a-section address-section')]//span[@id='address-ui-widgets-FullName']")

        this.yesButton = page.locator("id=deleteAddressModal-2-submit-btn")
    }

    async clickAddAddressLink(){

        await this.addAddressLink.click()

        await this.page.waitForLoadState('domcontentloaded')
    }

    async deleteAddress(fullName: string) {

        const userFullNames: ElementHandle<SVGElement | HTMLElement>[] = await this.userFullName;
      
        for (const element of userFullNames) {

          const name: string = await element.textContent() || '';
      
          if (name.includes(fullName)) {

            await this.removeButton.click();

            await this.yesButton.click();

            break;
          }
        }
      }
      
}