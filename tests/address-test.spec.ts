import test, { expect } from "../src/fixtures/page-fixtures";
import { credentials } from "../src/config/env";

const addressData = require("../src/test-data/address.json");

test.describe('Address Tests', () => {

  test.beforeEach(async function({homePage, headerPage, loginPage, accountPage}){

    await homePage.launchURL()

    await headerPage.navigateToLoginPage()

    await loginPage.enterEmailAndContinue(credentials.email)

    await loginPage.enterPasswordAndSignIn(credentials.password)

    await headerPage.navigateToAccountPage()

    await accountPage.navigateToAddressPage()

  })  

  test('Address functionality validation', async function({yourAddress,addAddressPage}){

      await yourAddress.clickAddAddressLink()

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

    const countBefore = await yourAddress.getAddressCount()

    await yourAddress.deleteAddress(addressData.fullName)

    expect(await yourAddress.getConfirmationMessage()).toContain('Address deleted')

    const countAfter = await yourAddress.getAddressCount()

    expect(countAfter).toBeLessThan(countBefore)

  })
});