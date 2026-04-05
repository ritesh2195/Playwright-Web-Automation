import { Locator, Page } from "@playwright/test";
import { NamePrice } from "../types";
import { BasePage } from "./base-page";

export class CartPage extends BasePage{

    private readonly cartTotalPrice:Locator
    private readonly cartPageProductName:Locator

    constructor(page:Page){

        super(page)

        this.cartTotalPrice = page.locator('#sc-subtotal-amount-buybox span').nth(0)

        this.cartPageProductName = page.locator('span.a-truncate-cut')
    }

    async getCartPageProductDetails():Promise<NamePrice>{

        const cartProductName:string = await this.cartPageProductName.textContent() || ''

        let cartProductPrice:string = await this.cartTotalPrice.textContent() || ''

        if(cartProductPrice.length>3){

            cartProductPrice = cartProductPrice.replace(',','')
        }

        const details:NamePrice = {

            name:cartProductName,
            price: parseInt(cartProductPrice)
        }

        return details;
    }

}