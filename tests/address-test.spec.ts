import test, { expect } from "../src/utilities/fixture-util";

const configData = JSON.parse(
    JSON.stringify(require("../src/test-data/login.json"))
  );

const addressData = JSON.parse(
    JSON.stringify(require("../src/test-data/address.json"))
  );

test.beforeEach(async function({homePage,loginPage,accountPage}){

  await homePage.launchURL()

  await homePage.getHeaaderPage().navigateToLoginPage()

  await loginPage.enterEmailAndContinue(configData.email)

  await loginPage.enterPasswordAndSignIn(configData.password)

  await homePage.getHeaaderPage().navigateToAccountPage()

  await accountPage.navigateToAddressPage()

})  

test('Address functionality validation', async function({yourAddress,addAddressPage}){

    await yourAddress.clickAddAddressLink()

    await addAddressPage.enterPinCode(addressData.pinCode);

    await addAddressPage.enterPinCode(addressData.pinCode)

    const city:string = await addAddressPage.getCityName()

    expect(city).toEqual(addressData.city)

    const state:string = await addAddressPage.getStateName()

    expect(state).toEqual(addressData.state)

    await addAddressPage.enterFullName(addressData.fullName)

    await addAddressPage.enterMobileNumber(addressData.mobile)

    await addAddressPage.enterHouseNo(addressData.house)

    await addAddressPage.enterStreetAddress(addressData.area)

    await addAddressPage.clickAddAddressButton()

    expect('Address saved').toEqual(await yourAddress.getConfirmationMessage())
})

test('Delete address validation',async function({yourAddress}){

  await yourAddress.deleteAddress(addressData.fullName)

  expect(await yourAddress.getConfirmationMessage()).toContain('Address deleted')

})