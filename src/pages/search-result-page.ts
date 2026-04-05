import { Locator, Page } from "@playwright/test";
import { NamePrice } from "../types";
import { BasePage } from "./base-page";
import { ProductDetailsPage } from "./product-details-page";

export class SearchResultPage extends BasePage{

    private readonly productName:Locator
    private readonly productPrice:Locator

    constructor(page:Page){

        super(page)

        this.productName = page.locator('span.a-size-base-plus')

        this.productPrice = page.locator('span.a-price span span:nth-child(2)')
    }

    async getFirstProductDetails():Promise<NamePrice>{

        const firstProductName:string = await this.productName.nth(0).textContent() || ''

        let firstProductPrice:string = await this.productPrice.nth(0).textContent() || ''

        if(firstProductPrice.length>3){

            firstProductPrice = firstProductPrice.replace(',','')
        }

        const firstProductDetails:NamePrice = {

            name:firstProductName,
            price:parseInt(firstProductPrice)
        }

        return firstProductDetails;
    }

    async clickOnFirstProduct():Promise<ProductDetailsPage>{

        const newPage:Page = await this.switchToChildWindow(this.productName.nth(0))

        return new ProductDetailsPage(newPage)
    }

}