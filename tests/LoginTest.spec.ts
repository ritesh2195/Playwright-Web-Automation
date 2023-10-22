import { ExcelReader } from '../src/utilities/ExcelReader';
import test, { expect } from '../src/utilities/Fixtures'

const configData = JSON.parse(
  JSON.stringify(require("../src/test-data/config.json"))
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

   const reader:ExcelReader = new ExcelReader("src\\test-data\\login.xlsx");

   await reader.initialize();

  await loginPage.enterEmailAndContinue(
    reader.getCellData("Sheet1", "Email", 2)
  );

  const { isAlrtIconDisplayed, isAlertHeaderDisplayed, isAlertMessage } =
    await loginPage.verifyOnUnSuccessfulLoginAlert();

  expect(isAlrtIconDisplayed).toBeTruthy();

  expect(isAlertHeaderDisplayed).toBeTruthy();

  expect(isAlertMessage).toBeTruthy();
});
