import { Locator, Page } from "@playwright/test";

export class BasePage{

    protected page:Page
    
    constructor(page:Page){

        this.page = page
    }

    sleep(ms: number): Promise<void> {
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
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