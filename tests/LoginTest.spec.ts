import test, { expect } from "@playwright/test";
import { HomePage } from "../PageClass/HomePage";
import { LoginPage } from "../PageClass/LoginPage";
const configData = JSON.parse(JSON.stringify(require('../TestData/config.json')))

let homePage: HomePage;
let loginPage:LoginPage;

test.beforeEach(async function({page}){

    homePage = new HomePage(page)

    loginPage = new LoginPage(page)
})

test.only('Login Test with valid credential', async function(){

    await homePage.launchURL()

    await homePage.getHeaaderPage().navigateToLoginPage()

    await loginPage.enterEmailAndContinue(configData.email)

    await loginPage.enterPasswordAndSignIn(configData.password)

    expect(await homePage.getHeaaderPage().getUserName()).toEqual('Hello, ritesh')

})

test('Login with invalid email id', async function(){

    await homePage.launchURL()

    await homePage.getHeaaderPage().navigateToLoginPage()

    await loginPage.enterEmailAndContinue('abcjsjs@gmail.com')

    const {isAlrtIconDisplayed,isAlertHeaderDisplayed,isAlertMessage} = await loginPage.verifyOnUnSuccessfulLoginAlert()

    expect(isAlrtIconDisplayed).toBeTruthy()

    expect(isAlertHeaderDisplayed).toBeTruthy()

    expect(isAlertMessage).toBeTruthy()
})