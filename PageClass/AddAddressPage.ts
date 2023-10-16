import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddAddressPage extends BasePage{

    readonly addAddressLink:Locator
    readonly countryDropDown:Locator;
    readonly fullName:Locator;
    readonly mobileNumber:Locator;
    readonly pinCode:Locator;
    readonly flatHouse:Locator;
    readonly streetAddress:Locator;
    readonly townCity:Locator;
    readonly stateDropDown:Locator;
    readonly addAddressButton:Locator;
    readonly confirmationMessage:Locator;
    readonly yesButton:Locator;

    constructor(page:Page){

        super(page)

        this.addAddressLink = page.locator("//h2[contains(text(),'Add address')]")

        this.countryDropDown = page.locator("//select[contains(@id,'countryCode-dropdown')]")

        this.fullName = page.locator("id=address-ui-widgets-enterAddressFullName")

        this.mobileNumber = page.locator("id=address-ui-widgets-enterAddressPhoneNumber")

        this.pinCode = page.locator("id=address-ui-widgets-enterAddressPostalCode")

        this.flatHouse = page.locator("id=address-ui-widgets-enterAddressLine1")

        this.streetAddress = page.locator("id=address-ui-widgets-enterAddressLine2")

        this.townCity = page.locator("id=address-ui-widgets-enterAddressCity")

        this.stateDropDown = page.locator("//select[contains(@id,'address-ui-widgets-enterAddressStateOrRegion')]")

        this.addAddressButton = page.locator("//span[text()='Add address']//preceding-sibling::input")

        this.confirmationMessage = page.locator("//h4[@class='a-alert-heading']")

        this.yesButton = page.locator("id=deleteAddressModal-2-submit-btn")
    }

    async clickAddAddressLink(){

        await this.addAddressLink.click()
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

    async enterCityName(city:string){

        await this.townCity.fill(city)
    }

    async selectState(state:string){

        await this.stateDropDown.selectOption(state)
    }

    async clickAddAddressButton(){

        await this.addAddressButton.click()
    }

    async verifyConfirmationMessage():Promise<string>{

        return await this.confirmationMessage.textContent() || ''
    }
}