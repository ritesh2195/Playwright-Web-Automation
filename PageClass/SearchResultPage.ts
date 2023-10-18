import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductDetailsPage } from "./ProductDetailsPage";

export class SearchResultPage extends BasePage{

    private readonly productName:Locator
    private readonly productPrice:Locator

    constructor(page:Page){

        super(page)

        this.page = page;

        this.productName = page.locator("//span[contains(@class,'a-size-base-plus')]")

        this.productPrice = page.locator("//span[@class='a-price']//child::span//child::span[2]")
    }

    async clickOnFirstProduct():Promise<ProductDetailsPage>{

        const firstProductName:string |null = await this.productName.nth(0).textContent()

        const firstProductPrice:string | null = await this.productPrice.nth(0).textContent()

        const newPage:Page = await this.switchToChildWindow(this.productName.nth(0))

        return new ProductDetailsPage(newPage)
    }

}