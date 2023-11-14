import test, { expect } from '../src/utilities/Fixtures'
const searchData = JSON.parse(
    JSON.stringify(require("../src/test-data/searchproduct.json"))
  );
  

test("search product functionality", async function ({homePage,resultPage}) {

    await homePage.launchURL()

    await homePage.getHeaaderPage().searchProduct(searchData.searchInput)

    const allAutoPopulatedList = await homePage.getHeaaderPage().getAllAutoPopulatedList()

    for(const populatedList of allAutoPopulatedList){

        expect(populatedList).toContain('badminton')
    }

    await homePage.getHeaaderPage().selectProduct(searchData.productToSelect)

    const{name:resultPageProductName,price:resultPagePrice} = await resultPage.getFirstProductDetails()

    const detailsPage = await resultPage.clickOnFirstProduct()

    const {name:detilsPageProductName,price:detilsPageProductPrice} = await detailsPage.getProductDetailsOnDetailsPage()

    expect(detilsPageProductName).toContain(resultPageProductName)

    expect(resultPagePrice).toEqual(detilsPageProductPrice)

    const cartIconCount = await detailsPage.addProductToCart(searchData.quantity)

    expect(searchData.quantity).toContain(cartIconCount)

    const cartPage = await detailsPage.navigateToCartPage()

    let{name:productNameInCart, price:priceInCart} = await cartPage.getCartPageProductDetails()

    expect(detilsPageProductPrice*searchData.quantity).toEqual(priceInCart)

    expect(productNameInCart.trim()).toContain(detilsPageProductName.trim())
});