import { ElementHandle, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class YourAddressPage extends BasePage{

    private readonly addAddressLink:Locator
    private readonly removeButton:Locator
    private readonly userFullName:Promise<ElementHandle<SVGElement | HTMLElement>[]>;
    private readonly yesButton:Locator
    private readonly confirmationMessage:Locator

    constructor(page:Page){

        super(page)

        this.page = page

        this.addAddressLink = page.locator("//h2[contains(text(),'Add address')]")

        this.removeButton = page.locator("//div[contains(@id,'edit-address')]//a[text()='Remove']")

        this.userFullName = page.$$("//div[contains(@class,'a-section address-section')]//span[@id='address-ui-widgets-FullName']")

        this.yesButton = page.locator("id=deleteAddressModal-1-submit-btn")

        this.confirmationMessage = page.locator("//h4[@class='a-alert-heading']")
    }

    async clickAddAddressLink(){

        await this.addAddressLink.click()

        await this.page.waitForLoadState('load')
    }

    async deleteAddress(fullName: string) {

        const userFullNames: ElementHandle<SVGElement | HTMLElement>[] = await this.userFullName;

        for(let i=0;i<userFullNames.length; i++){

          const name: string = await userFullNames[i].textContent() || '';

            if (name.includes(fullName)) {

              await this.removeButton.nth(i).click();

              await this.yesButton.click();

              await this.page.waitForLoadState('load')

              break;
          
        }
      }
      
    }

    async getConfirmationMessage():Promise<string>{

      return await this.confirmationMessage.textContent() || ''
  }
  }