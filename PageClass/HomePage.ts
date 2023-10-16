import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import { BasePage } from './BasePage';
const configData = JSON.parse(JSON.stringify(require('../TestData/config.json')))
export class HomePage extends BasePage{

    readonly headerPage: HeaderPage
    //readonly page:Page

    constructor(page: Page){

        super(page);
        this.page = page

        this.headerPage = new HeaderPage(page)
    }

    async launchURL(){

        await this.page.goto(configData.env.url)

        await this.page.goto('https://amazon.in')
    }

    getHeaaderPage():HeaderPage{

        return this.headerPage;
    }
}