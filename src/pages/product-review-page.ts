import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProductReviewPage extends BasePage{

    private readonly reviewHeadline:Locator
    private readonly reviewBody:Locator
    private readonly submitReviewButton:Locator
    private readonly reviewFormTitle:Locator

    constructor(page: Page){

        super(page)

        this.reviewHeadline = page.getByPlaceholder('What\'s most important to know?')

        this.reviewBody = page.getByPlaceholder('What did you like or dislike? What did you use this product for?')

        this.submitReviewButton = page.getByRole('button', { name: 'Submit' })

        this.reviewFormTitle = page.getByRole('heading', { name: 'Create Review' })
    }

    async isReviewFormDisplayed():Promise<boolean>{

        return await this.reviewFormTitle.isVisible()
    }

    async enterReviewHeadline(headline: string){

        await this.reviewHeadline.fill(headline)
    }

    async enterReviewBody(body: string){

        await this.reviewBody.fill(body)
    }

    async submitReview(){

        await this.submitReviewButton.click()
    }

    async writeReview(headline: string, body: string){

        await this.enterReviewHeadline(headline)

        await this.enterReviewBody(body)

        await this.submitReview()
    }
}
