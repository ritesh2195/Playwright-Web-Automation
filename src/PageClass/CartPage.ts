import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NamePrice } from "./ObjectInterface";

export class CartPage extends BasePage{

    private readonly cartTotalPrice:Locator
    private readonly cartPageProductName:Locator

    constructor(page:Page){

        super(page)

        this.page = page

        this.cartTotalPrice = page.locator("//span[@id='sc-subtotal-amount-buybox']//span").nth(0)

        this.cartPageProductName = page.locator("//span[contains(@class,'a-truncate-cut')]")
    }

    async getCartPageProductDetails():Promise<NamePrice>{

        const details:NamePrice = {

            name:await this.cartPageProductName.textContent() || '',
            price: await this.cartPageProductName.textContent() || ''
        }

        return details;
    }

}