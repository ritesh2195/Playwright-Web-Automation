import test, { expect } from "../src/fixtures/page-fixtures";

const searchData = require("../src/test-data/search-product.json");

test.describe('Search Product Tests', () => {

  test("search product functionality", async function ({homePage, headerPage, resultPage}) {

      await homePage.launchURL()

      await headerPage.searchProduct(searchData.searchInput)

      const allAutoPopulatedList = await headerPage.getAllAutoPopulatedList()

      for(const populatedList of allAutoPopulatedList){

          expect(populatedList).toContain('badminton')
      }

      await headerPage.selectProduct(searchData.productToSelect)

      const{name:resultPageProductName,price:resultPagePrice} = await resultPage.getFirstProductDetails()

      const detailsPage = await resultPage.clickOnFirstProduct()

      const {name:detilsPageProductName,price:detilsPageProductPrice} = await detailsPage.getProductDetailsOnDetailsPage()

      expect(detilsPageProductName).toContain(resultPageProductName)

      expect(resultPagePrice).toEqual(detilsPageProductPrice)

      const cartIconCount = await detailsPage.addProductToCart(searchData.quantity)

      expect(searchData.quantity.toString()).toContain(cartIconCount.toString())

      const cartPage = await detailsPage.navigateToCartPage()

      let{name:productNameInCart, price:priceInCart} = await cartPage.getCartPageProductDetails()

      expect(detilsPageProductPrice*searchData.quantity).toEqual(priceInCart)

      expect(productNameInCart.trim()).toContain(detilsPageProductName.trim())
  });
});