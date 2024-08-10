import { ExcelReaderUtil } from "../src/utilities/excel-reader-util";
import test, { expect } from "../src/utilities/fixture-util";


const configData = JSON.parse(
  JSON.stringify(require("../src/test-data/login.json"))
);

test.beforeEach(async function({homePage,page}){
  await homePage.launchURL();

  await homePage.getHeaaderPage().navigateToLoginPage();
})

test("Login Test with valid credential", async function ({loginPage,homePage}) {

  await loginPage.enterEmailAndContinue(configData.email);

  await loginPage.enterPasswordAndSignIn(configData.password);

  expect(await homePage.getHeaaderPage().getUserName()).toEqual(
    `Hello, ${configData.name}`
  );
});

test("Login with invalid email id", async function ({loginPage}) {

  await loginPage.enterEmailAndContinue('ajbsdhidsh@email.com');

  const { isAlrtIconDisplayed, isAlertHeaderDisplayed, isAlertMessage } =
    await loginPage.verifyOnUnSuccessfulLoginAlert();

  expect(isAlrtIconDisplayed).toBeTruthy();

  expect(isAlertHeaderDisplayed).toBeTruthy();

  expect(isAlertMessage).toBeTruthy();
});
