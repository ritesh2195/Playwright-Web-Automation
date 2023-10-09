import test, { expect } from "@playwright/test";
import { HomePage } from "../PageClass/HomePage";
import { LoginPage } from "../PageClass/LoginPage";

let homePage: HomePage;
let loginPage:LoginPage;

test.beforeEach(async function({page}){

    homePage = new HomePage(page)

    loginPage = new LoginPage(page)
})

test('Login Test with valid credential', async function(){

    await homePage.launchURL()

    await homePage.getHeaaderPage().navigateToLoginPage()

    await loginPage.enterEmailAndContinue('')

    await loginPage.enterPasswordAndSignIn('')

    expect(await homePage.getHeaaderPage().getUserName()).toEqual('Hello, ritesh')

})

test.only('Login with invalid email id', async function(){

    await homePage.launchURL()

    await homePage.getHeaaderPage().navigateToLoginPage()

    await loginPage.enterEmailAndContinue('abcjsjs@gmail.com')

    const {isAlrtIconDisplayed,isAlertHeaderDisplayed,isAlertMessage} = await loginPage.verifyOnUnSuccessfulLoginAlert()

    expect(isAlrtIconDisplayed).toBeTruthy()

    expect(isAlertHeaderDisplayed).toBeTruthy()

    expect(isAlertMessage).toBeTruthy()
})