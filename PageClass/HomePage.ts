import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
const configData = JSON.parse(JSON.stringify(require('../TestData/config.json')))
export class HomePage{

    readonly headerPage: HeaderPage
    readonly page:Page

    constructor(page: Page){

        this.page = page

        this.headerPage = new HeaderPage(page)
    }

    delay(ms: number) {

        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async launchURL(){

        await this.page.goto(configData.url)

        //await this.delay(2000)

        await this.page.goto('https://amazon.in')
    }

    getHeaaderPage():HeaderPage{

        return this.headerPage;
    }
}