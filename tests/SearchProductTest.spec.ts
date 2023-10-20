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

    const{name:resultPageProductName,price:resultPagePrice} = await resultPage.getFirstProductDetails()

    const detailsPage = await resultPage.clickOnFirstProduct()

    const {name:detilsPageProductName,price:detilsPageProductPrice} = await detailsPage.getProductDetailsOnDetailsPage()

    expect(detilsPageProductName).toContain(resultPageProductName)

    expect(resultPagePrice).toEqual(detilsPageProductPrice)

    const{totalQuantity,cartIconCount} = await detailsPage.addProductToCard()

    console.log(totalQuantity)

    console.log("Cart count is "+cartIconCount)

    expect(totalQuantity).toContain(cartIconCount)

});

test.afterEach(async function(){

    await homePage.closeBrowser()
})