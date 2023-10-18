import { BrowserContext, Locator, Page } from "@playwright/test";

export class BasePage{

    protected page:Page
    
    constructor(page:Page){

        this.page = page
    }

    async getPageTilt(): Promise<string>{

        return await this.page.title() || ''
    }

    async switchToChildWindow(locator:Locator){

        const [newWindow] = await Promise.all([

            this.page.waitForEvent('popup'),

            locator.click()
        ])

        await newWindow.waitForLoadState('domcontentloaded')

        return newWindow;
    }

    async closeBrowser(){

        await this.page.close();
    }
}