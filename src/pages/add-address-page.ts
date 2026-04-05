import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class AddAddressPage extends BasePage{

    private readonly countryDropDown:Locator;
    private readonly fullName:Locator;
    private readonly mobileNumber:Locator;
    private readonly pinCode:Locator;
    private readonly flatHouse:Locator;
    private readonly streetAddress:Locator;
    private readonly townCity:Locator;
    private readonly addAddressButton:Locator;
    private readonly reviewAddressText:Locator

    constructor(page:Page){

        super(page)

        this.countryDropDown = page.locator('select[id*="countryCode-dropdown"]')

        this.fullName = page.locator('#address-ui-widgets-enterAddressFullName')

        this.mobileNumber = page.locator('#address-ui-widgets-enterAddressPhoneNumber')

        this.pinCode = page.locator('#address-ui-widgets-enterAddressPostalCode')

        this.flatHouse = page.locator('#address-ui-widgets-enterAddressLine1')

        this.streetAddress = page.locator('#address-ui-widgets-enterAddressLine2')

        this.townCity = page.locator('#address-ui-widgets-enterAddressCity')

        this.addAddressButton = page.getByRole('button', { name: 'Add address' })

        this.reviewAddressText = page.getByText('Review your address')
    }

    async enterFullName(name:string){

        await this.fullName.fill(name)
    }

    async selectCountry(country:string){

        await this.countryDropDown.selectOption(country)
    }

    async enterMobileNumber(mobile:string){

        await this.mobileNumber.fill(mobile)
    }

    async enterPinCode(zipCode:string){

        await this.pinCode.fill(zipCode)
    }

    async enterHouseNo(houseNo:string){

        await this.flatHouse.fill(houseNo)
    }

    async enterStreetAddress(address:string){

        await this.streetAddress.fill(address)
    }

    async getCityName():Promise<string>{

        return await this.townCity.inputValue()
    }

    async getStateName():Promise<string>{

        const stateDropdown = this.page.locator('#address-ui-widgets-enterAddressStateOrRegion-dropdown-nativeId')

        return await stateDropdown.inputValue()
    }

    async clickAddAddressButton(){

        await this.addAddressButton.click()

        if(await this.reviewAddressText.isVisible()){

            await this.addAddressButton.click()
        }
    }
}