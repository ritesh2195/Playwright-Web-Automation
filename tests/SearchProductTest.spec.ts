import test, { expect } from "@playwright/test";
import { HomePage } from "../PageClass/HomePage";
import { LoginPage } from "../PageClass/LoginPage";
import { SearchResultPage } from "../PageClass/SearchResultPage";
import { ProductDetailsPage } from "../PageClass/ProductDetailsPage";

let homePage: HomePage;
let resultPage:SearchResultPage

test.beforeEach(async function({page}){

    homePage = new HomePage(page)

    resultPage = new SearchResultPage(page)
})

test.only("search product functionality", async function () {

    await homePage.launchURL()

    await homePage.getHeaaderPage().searchProduct('badminton')

    const allAutoPopulatedList = await homePage.getHeaaderPage().getAllAutoPopulatedList()

    for(const populatedList of allAutoPopulatedList){

        expect(populatedList).toContain('badminton')
    }

    await homePage.getHeaaderPage().selectProduct('badminton rackets')

    const detailsPage = await resultPage.clickOnFirstProduct()

    console.log(await detailsPage.getPageTilt())

});

test.afterEach(async function(){

    await homePage.closeBrowser()
})