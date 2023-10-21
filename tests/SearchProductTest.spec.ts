import test, { expect } from '../src/utilities/Fixtures'
import { HomePage } from "../src/PageClass/HomePage";
import { LoginPage } from "../src/PageClass/LoginPage";
import { SearchResultPage } from "../src/PageClass/SearchResultPage";
import { ProductDetailsPage } from "../src/PageClass/ProductDetailsPage";

test.only("search product functionality", async function ({homePage,resultPage}) {

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