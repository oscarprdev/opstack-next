import { BasePage } from '../pages/base.page';
import { test as base } from 'playwright/test';

interface BaseFixture {
	basePage: BasePage;
	navigateToApp(): Promise<void>;
}

export const test = base.extend<BaseFixture>({
	basePage: async ({ page }, use) => {
		await use(new BasePage(page));
	},
	navigateToApp: async ({ page }, use) => {
		await use(async (): Promise<void> => {
			await page.goto(`/`);
		});
	},
});
