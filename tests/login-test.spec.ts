import test, { expect } from "../src/fixtures/page-fixtures";
import { credentials } from "../src/config/env";


const loginData = require("../src/test-data/login.json");

test.describe('Login Tests', () => {

  test.beforeEach(async function({homePage, headerPage}){
    await homePage.launchURL();

    await headerPage.navigateToLoginPage();
  })

  test("Login Test with valid credential", async function ({loginPage, headerPage}) {

    await loginPage.enterEmailAndContinue(credentials.email);

    await loginPage.enterPasswordAndSignIn(credentials.password);

    expect(await headerPage.getUserName()).toEqual(
      `Hello, ${credentials.name}`
    );
  });

  test("Login with invalid email id", async function ({loginPage}) {

    await loginPage.enterEmailAndContinue(loginData.invalidEmail);

    const { isAlrtIconDisplayed, isAlertHeaderDisplayed, isAlertMessage } =
      await loginPage.verifyOnUnSuccessfulLoginAlert();

    expect(isAlrtIconDisplayed).toBeTruthy();

    expect(isAlertHeaderDisplayed).toBeTruthy();

    expect(isAlertMessage).toBeTruthy();
  });
});
