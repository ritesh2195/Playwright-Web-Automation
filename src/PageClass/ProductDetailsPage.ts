import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NamePrice } from "./ObjectInterface";
import { CartPage } from "./CartPage";

export class ProductDetailsPage extends BasePage{

    private readonly productNameOnDetailsPage:Locator
    private readonly productPriceOnDetailsPage:Locator
    private readonly addToCartButton:Locator
    private readonly buyNowButton:Locator
    private readonly quantityDropDown:Locator
    private readonly cartLink:Locator
    private readonly productCountInCartIcon:Locator

    constructor(page: Page){

        super(page)

        this.page = page

        this.productNameOnDetailsPage = page.locator("//span[@id='productTitle']")

        this.productPriceOnDetailsPage = page.locator("//div[@id='corePriceDisplay_desktop_feature_div']//span[contains(@class,'a-price-whole')]").nth(0)

        this.addToCartButton = page.locator('id=add-to-cart-button')

        this.buyNowButton = page.locator('id=buy-now-button')

        this.quantityDropDown = page.locator('id=quantity')

        this.cartLink = page.locator('id=nav-cart-count-container')

        this.productCountInCartIcon = page.locator("(//div[@id='nav-cart-count-container']//span)[1]")
        
    }

    async getProductDetailsOnDetailsPage():Promise<NamePrice>{

        let productPrice:string = await this.productPriceOnDetailsPage.textContent() || ''

        const productName:string = await this.productNameOnDetailsPage.textContent() || ''

        if(productPrice.length>3){

            productPrice = productPrice.replace(',','')
        }

        const productDetails:NamePrice = {

            price:parseInt(productPrice),
            name: productName
        }

        return productDetails;
    }

    async addProductToCart(quantitySelected:number):Promise<number>{

        try{

            await this.quantityDropDown.selectOption(quantitySelected.toString(),{timeout:5000})

        } catch(error){

            quantitySelected = 1
        }

        await this.page.pause()

        await this.addToCartButton.click()

        await this.productCountInCartIcon.waitFor({timeout:6000})

        const countInCardIcon:string = await this.productCountInCartIcon.textContent() || ''

        return parseInt(countInCardIcon);
    }

    async navigateToCartPage(){

        await this.cartLink.click()

        return new CartPage(this.page)
    }
}