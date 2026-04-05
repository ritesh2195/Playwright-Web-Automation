import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { BasePage } from "../pages/base-page";
import { HomePage } from "../pages/home-page";
import { HeaderPage } from "../pages/header-page";
import { AccountPage } from "../pages/account-page";
import { YourAddressPage } from "../pages/your-address-page";
import { SearchResultPage } from "../pages/search-result-page";
import { ProductDetailsPage } from "../pages/product-details-page";
import { AddAddressPage } from "../pages/add-address-page";
import { ProductReviewPage } from "../pages/product-review-page";


const test = baseTest.extend<{
    loginPage:LoginPage
    accountPage:AccountPage
    addAddressPage:AddAddressPage
    basePage:BasePage
    homePage:HomePage
    headerPage:HeaderPage
    detailsPage:ProductDetailsPage
    resultPage:SearchResultPage
    yourAddress:YourAddressPage
    reviewPage:ProductReviewPage
}>({
    
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    headerPage: async ({ page }, use) => {
        await use(new HeaderPage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    addAddressPage: async ({ page }, use) => {
        await use(new AddAddressPage(page));
    },
    detailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
    resultPage: async ({ page }, use) => {
        await use(new SearchResultPage(page));
    },
    yourAddress:async ({page}, use)=>{
        await use(new YourAddressPage(page));
    },
    reviewPage: async ({ page }, use) => {
        await use(new ProductReviewPage(page));
    }
})

export default test;
export const expect = test.expect;
