import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../../PageClass/LoginPage";
import { AccountPage } from "../../PageClass/AccountPage";
import { AddAddressPage } from "../../PageClass/AddAddressPage";
import { BasePage } from "../../PageClass/BasePage";
import { HomePage } from "../../PageClass/HomePage";
import { ProductDetailsPage } from "../../PageClass/ProductDetailsPage";
import { SearchResultPage } from "../../PageClass/SearchResultPage";

const test = baseTest.extend<{
    loginPage:LoginPage
    accountPage:AccountPage
    addAddressPage:AddAddressPage
    basePage:BasePage
    homePage:HomePage
    detailsPage:ProductDetailsPage
    resultPage:SearchResultPage
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
    }
})

export default test;
export const expect = test.expect;