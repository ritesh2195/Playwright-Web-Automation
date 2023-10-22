import test, { expect } from '../src/utilities/Fixtures'

const configData = JSON.parse(
    JSON.stringify(require("../src/test-data/config.json"))
  );

const addressData = JSON.parse(
    JSON.stringify(require("../src/test-data/address.json"))
  );  

test('Address functionality validation', async function({page,homePage,loginPage,accountPage,yourAddress,addAddressPage}){

    await homePage.launchURL()

    await homePage.getHeaaderPage().navigateToLoginPage()

    await loginPage.enterEmailAndContinue(configData.email)

    await loginPage.enterPasswordAndSignIn(configData.password)

    await homePage.getHeaaderPage().navigateToAccountPage()

    await accountPage.navigateToAddressPage()

    await yourAddress.clickAddAddressLink()

    //await page.pause()

    await addAddressPage.enterPinCode(addressData.pinCode);

    await addAddressPage.enterPinCode(addressData.pinCode)

    const city:string = await addAddressPage.getCityName()

    expect(addressData.city).toEqual(city)

    const state:string = await addAddressPage.getStateName()

    expect(addressData.state).toEqual(state)

    await addAddressPage.enterFullName(addressData.fullName)

    await addAddressPage.enterMobileNumber(addressData.mobile)

    await addAddressPage.enterHouseNo(addressData.house)

    await addAddressPage.enterStreetAddress(addressData.area)

    await page.pause()

    await addAddressPage.clickAddAddressButton()

    expect('Address saved').toEqual(await addAddressPage.getConfirmationMessage())
})