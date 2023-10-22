import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddAddressPage extends BasePage{

    private readonly countryDropDown:Locator;
    private readonly fullName:Locator;
    private readonly mobileNumber:Locator;
    private readonly pinCode:Locator;
    private readonly flatHouse:Locator;
    private readonly streetAddress:Locator;
    private readonly townCity:Locator;
    private readonly stateDropDown:Locator;
    private readonly addAddressButton:Locator;
    private readonly confirmationMessage:Locator;
    private readonly yesButton:Locator;
    private readonly removeButton:Locator
    private readonly reviewAddressText:Locator

    constructor(page:Page){

        super(page)

        this.countryDropDown = page.locator("//select[contains(@id,'countryCode-dropdown')]")

        this.fullName = page.locator("id=address-ui-widgets-enterAddressFullName")

        this.mobileNumber = page.locator("id=address-ui-widgets-enterAddressPhoneNumber")

        this.pinCode = page.locator("id=address-ui-widgets-enterAddressPostalCode")

        this.flatHouse = page.locator("id=address-ui-widgets-enterAddressLine1")

        this.streetAddress = page.locator("id=address-ui-widgets-enterAddressLine2")

        this.townCity = page.locator("//input[@id='address-ui-widgets-enterAddressCity']")

        this.stateDropDown = page.locator("//select[contains(@id,'address-ui-widgets-enterAddressStateOrRegion')]")

        this.addAddressButton = page.locator("//span[text()='Add address']//preceding-sibling::input")

        this.confirmationMessage = page.locator("//h4[@class='a-alert-heading']")

        this.yesButton = page.locator("id=deleteAddressModal-2-submit-btn")

        this.removeButton = page.locator("//div[contains(@id,'edit-address')]//a[text()='Remove']")

        this.reviewAddressText = page.locator('"Review your address"')
    }

    async enterFullName(name:string){

        await this.fullName.fill(name)

        await this.fullName.fill(name)
    }

    async selectCountry(country:string){

        await this.countryDropDown.selectOption(country)
    }

    async enterMobileNumber(mobile:string){

        await this.mobileNumber.fill(mobile)

        await this.mobileNumber.fill(mobile)
    }

    async enterPinCode(zipCode:string){

        this.sleep(3000)

        await this.pinCode.fill(zipCode)

        await this.pinCode.fill(zipCode)
    }

    async enterHouseNo(houseNo:string){

        await this.flatHouse.fill(houseNo)

        await this.flatHouse.fill(houseNo)
    }

    async enterStreetAddress(address:string){

        await this.streetAddress.fill(address)

        await this.streetAddress.fill(address)
    }

    async getCityName():Promise<string>{

        const cityValue = await this.page.evaluate(() =>{

            const cityElement = document.getElementById('address-ui-widgets-enterAddressCity') as HTMLInputElement

            return cityElement ? cityElement.value : '';
        })

        return cityValue;
    }

    async getStateName():Promise<string>{

        const stateValue = await this.page.evaluate(() =>{

            const stateElement = document.getElementById('address-ui-widgets-enterAddressStateOrRegion-dropdown-nativeId') as HTMLInputElement

            return stateElement ? stateElement.value : '';
        })

        return stateValue;
    }

    async clickAddAddressButton(){

        await this.addAddressButton.click()

        if(await this.reviewAddressText.isVisible()){

            await this.addAddressButton.click()
        }
    }

    async getConfirmationMessage():Promise<string>{

        return await this.confirmationMessage.textContent() || ''
    }
}