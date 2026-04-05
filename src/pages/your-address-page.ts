import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class YourAddressPage extends BasePage{

    private readonly addAddressLink:Locator
    private readonly removeButton:Locator
    private readonly userFullName:Locator
    private readonly yesButton:Locator
    private readonly confirmationMessage:Locator

    constructor(page:Page){

        super(page)

        this.addAddressLink = page.getByRole('heading', { name: 'Add address' })

        this.removeButton = page.locator('div[id*="edit-address"] a').filter({ hasText: 'Remove' })

        this.userFullName = page.locator('div.a-section.address-section span#address-ui-widgets-FullName')

        this.yesButton = page.locator('div[id*="deleteAddressModal"] input[type="submit"]')

        this.confirmationMessage = page.locator('h4.a-alert-heading')
    }

    async clickAddAddressLink(){

        await this.addAddressLink.click()

        await this.page.waitForLoadState('load')
    }

    async deleteAddress(fullName: string) {

        const count = await this.userFullName.count();

        for(let i = 0; i < count; i++){

          const name: string = await this.userFullName.nth(i).textContent() || '';

            if (name.includes(fullName)) {

              await this.removeButton.nth(i).click();

              await this.yesButton.waitFor({ state: 'visible' });

              await this.yesButton.click();

              await this.page.waitForLoadState('load')

              break;
          
        }
      }
      
    }

    async getAddressCount(): Promise<number> {

        return await this.userFullName.count();
    }

    async getConfirmationMessage():Promise<string>{

      return await this.confirmationMessage.textContent() || ''
  }
  }