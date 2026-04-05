import { Locator, Page } from "@playwright/test";
import { NamePrice } from "../types";
import { BasePage } from "./base-page";
import { CartPage } from "./cart-page";
import { ProductReviewPage } from "./product-review-page";

export class ProductDetailsPage extends BasePage{

    private readonly productNameOnDetailsPage:Locator
    private readonly productPriceOnDetailsPage:Locator
    private readonly addToCartButton:Locator
    private readonly buyNowButton:Locator
    private readonly quantityDropDown:Locator
    private readonly cartLink:Locator
    private readonly productCountInCartIcon:Locator
    private readonly starRatingOnPDP:Locator

    constructor(page: Page){

        super(page)

        this.productNameOnDetailsPage = page.locator('#productTitle')

        this.productPriceOnDetailsPage = page.locator('#corePriceDisplay_desktop_feature_div span.a-price-whole').nth(0)

        this.addToCartButton = page.locator('#add-to-cart-button')

        this.buyNowButton = page.locator('#buy-now-button')

        this.quantityDropDown = page.locator('#quantity')

        this.cartLink = page.locator('#nav-cart-count-container')

        this.productCountInCartIcon = page.locator('#nav-cart-count-container span').first()

        this.starRatingOnPDP = page.locator('#cm-cr-dp-review-rating-section i.a-icon-star')
        
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

        await this.quantityDropDown.selectOption(quantitySelected.toString(),{timeout:5000})

        await this.addToCartButton.click()

        await this.page.waitForLoadState('load')

        await this.productCountInCartIcon.waitFor({timeout:6000})

        const countInCardIcon:string = await this.productCountInCartIcon.textContent() || ''

        return parseInt(countInCardIcon);
    }

    async navigateToCartPage(){

        await this.cartLink.click()

        return new CartPage(this.page)
    }

    async selectRatingAndWriteReview(rating: number):Promise<ProductReviewPage>{

        await this.starRatingOnPDP.nth(rating - 1).click()

        await this.page.waitForLoadState('load')

        return new ProductReviewPage(this.page)
    }
}