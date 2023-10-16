import { BrowserContext, Locator, Page } from "@playwright/test";

export class BasePage{

    public page:Page
    readonly context:BrowserContext
    
    constructor(page:Page){

        this.page = page
    }

    async getPageTilt(): Promise<string>{

        return await this.page.title() || ''
    }

    async switchToChildWindow(locator:Locator){

        this.page = await this.context.newPage()

        const [newPage] = await Promise.all([

            this.context.waitForEvent('page'),

            locator.click()
        ])
    }
}