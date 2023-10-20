import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { NamePrice } from "./ObjectInterface";

export class SearchResultPage extends BasePage{

    private readonly productName:Locator
    private readonly productPrice:Locator

    constructor(page:Page){

        super(page)

        this.page = page;

        this.productName = page.locator("//span[contains(@class,'a-size-base-plus')]")

        this.productPrice = page.locator("//span[@class='a-price']//child::span//child::span[2]")
    }

    async getFirstProductDetails():Promise<NamePrice>{

        const firstProductName:string = await this.productName.nth(0).textContent() || ''

        const firstProductPrice:string = await this.productPrice.nth(0).textContent() || ''

        const firstProductDetails:NamePrice = {

            name:firstProductName,
            price:firstProductPrice
        }

        return firstProductDetails;
    }

    async clickOnFirstProduct():Promise<ProductDetailsPage>{

        const newPage:Page = await this.switchToChildWindow(this.productName.nth(0))

        return new ProductDetailsPage(newPage)
    }

}