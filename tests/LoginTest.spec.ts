import test, { expect } from "@playwright/test";
import { HomePage } from "../PageClass/HomePage";
import { LoginPage } from "../PageClass/LoginPage";
import { ExcelReader } from "../Utilities/ExcelReader";
const configData = JSON.parse(
  JSON.stringify(require("../TestData/config.json"))
);

let homePage: HomePage;
let loginPage: LoginPage;
let reader: ExcelReader;

test.beforeEach(async function ({ page }) {
  reader = new ExcelReader("TestData\\login.xlsx");

  await reader.initialize();

  homePage = new HomePage(page);

  loginPage = new LoginPage(page);

  await homePage.launchURL();
});

test("Login Test with valid credential", async function () {

  await homePage.getHeaaderPage().navigateToLoginPage();

  await loginPage.enterEmailAndContinue(configData.email);

  await loginPage.enterPasswordAndSignIn(configData.password);

  expect(await homePage.getHeaaderPage().getUserName()).toEqual(
    `Hello, ${configData.name}`
  );
});

test("Login with invalid email id", async function () {

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
