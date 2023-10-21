import test, { expect } from '../src/utilities/Fixtures'

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

    const{totalQuantity,cartIconCount} = await detailsPage.addProductToCart()

    expect(totalQuantity).toContain(cartIconCount)

    const cartPage = await detailsPage.navigateToCartPage()

    let{name:productNameInCart, price:priceInCart} = await cartPage.getCartPageProductDetails()

    console.log(detilsPageProductPrice)

    console.log(detilsPageProductPrice, priceInCart)

    console.log("total quantity is "+totalQuantity)

    expect(detilsPageProductPrice*totalQuantity).toEqual(priceInCart)
});