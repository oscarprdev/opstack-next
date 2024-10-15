import { test } from './fixtures/base.fixture';
import { expect } from '@playwright/test';

test.describe('Base page', () => {
	test.beforeEach(async ({ navigateToApp }) => {
		await navigateToApp();
	});

	test('Should ...', async ({ basePage }) => {
		await expect(basePage.main).toBeVisible();
	});
});
