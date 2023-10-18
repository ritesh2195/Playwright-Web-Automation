import test, { expect } from "@playwright/test";
import { HomePage } from "../PageClass/HomePage";
import { LoginPage } from "../PageClass/LoginPage";

let homePage: HomePage;

test.beforeEach(async function({page}){

    homePage = new HomePage(page)
})

test.only("search product functionality", async function () {

    await homePage.launchURL()

    await homePage.getHeaaderPage().searchProduct('badminton')

    const allAutoPopulatedList = await homePage.getHeaaderPage().getAllAutoPopulatedList()

    for(const populatedList of allAutoPopulatedList){

        expect(populatedList).toContain('badminton')
    }

    await homePage.getHeaaderPage().selectProduct('badminton rackets')
    
});

test.afterEach(async function(){

    await homePage.closeBrowser()
})