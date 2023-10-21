import test, { expect } from '../src/utilities/Fixtures'
import { ExcelReader } from "../Utilities/ExcelReader";

const configData = JSON.parse(
  JSON.stringify(require("../TestData/config.json"))
);

test("Login Test with valid credential", async function ({loginPage,homePage}) {

  const reader:ExcelReader = new ExcelReader("TestData\\login.xlsx");

  await reader.initialize();

  await homePage.launchURL();

  await homePage.getHeaaderPage().navigateToLoginPage();

  await loginPage.enterEmailAndContinue(configData.email);

  await loginPage.enterPasswordAndSignIn(configData.password);

  expect(await homePage.getHeaaderPage().getUserName()).toEqual(
    `Hello, ${configData.name}`
  );
});

test.only("Login with invalid email id", async function ({loginPage,homePage}) {

  const reader:ExcelReader = new ExcelReader("TestData\\login.xlsx");

  await reader.initialize();

  homePage.launchURL()

  await homePage.getHeaaderPage().navigateToLoginPage();

  await loginPage.enterEmailAndContinue(
    reader.getCellData("Sheet1", "Email", 2)
  );

  const { isAlrtIconDisplayed, isAlertHeaderDisplayed, isAlertMessage } =
    await loginPage.verifyOnUnSuccessfulLoginAlert();

  expect(isAlrtIconDisplayed).toBeTruthy();

  expect(isAlertHeaderDisplayed).toBeTruthy();

  expect(isAlertMessage).toBeTruthy();
});
