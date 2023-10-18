import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage{

    constructor(page: Page){

        super(page)

        this.page = page
    }
}