import { Locator, Page } from '@playwright/test';

export class BasePage {
	readonly main: Locator;

	constructor(private readonly page: Page) {
		this.main = this.page.getByText('OPSTACK - NEXT');
	}
}
