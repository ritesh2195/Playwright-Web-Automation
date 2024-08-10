import { type Page } from '@playwright/test';
import { HeaderPage } from './header-page';
import { BasePage } from './base-page';
const configData = JSON.parse(JSON.stringify(require('../../config.json')))
export class HomePage extends BasePage{

    private readonly headerPage: HeaderPage
    
    constructor(page: Page){

        super(page);
        
        this.page = page

        this.headerPage = new HeaderPage(page)
    }

    async launchURL(){

        await this.page.goto(configData.env.url)
    }

    getHeaaderPage():HeaderPage{

        return this.headerPage;
    }
}