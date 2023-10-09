import { expect, type Locator, type Page } from '@playwright/test';

export class HeaderPage{

    readonly page: Page;
    readonly signInLink:Locator;
    readonly accountListLine1:Locator;
    readonly searchTextBox:Locator;
    readonly searchAutoListOption:Locator;

    constructor(page: Page){

        this.page = page

        this.signInLink = page.locator("id=nav-link-accountList");

        this.accountListLine1 = page.locator("id=nav-link-accountList-nav-line-1");

        this.searchTextBox = page.locator("//input[@placeholder='Search Amazon.in']");

        this.searchAutoListOption = page.locator("//div[@class='s-suggestion-container']//div");
    }

    async navigateToLoginPage(){

        await this.signInLink.click();
    }

    async navigateToAccountPage(){

        await this.accountListLine1.click();
    }

    async getUserName() :Promise<string>{

        return await this.accountListLine1.textContent() || ''
    }

    async searchProduct(product:string){

        await this.searchTextBox.fill(product)
    }

    async getAllAutoPopulatedList(){

        const productOptions:string[] = [];

        for(const productOption of await this.searchAutoListOption.all()){

            const textValue : string = await productOption.textContent() || ''

            productOptions.push(textValue)
        }

        return productOptions;
    }

    async selectProduct(productToSelect:string){

        const productOptions = await this.searchAutoListOption.all()

        for(const productOption of productOptions){

            const productName:string = await productOption.getAttribute("aria-label") || ''
            

            if (productName.toLowerCase().includes(productToSelect.toLowerCase())){

                productOption.click()

                break;
            }
        }

    }
}