// packages
import { expect, test } from '@playwright/test';

test.describe('without session', () => {
	test('navigation smoke test @pages', async ({ page }) => {
		// start at the home page
		await Promise.all([
			await page.goto('/'),
			await expect(page).toHaveTitle(/Home/),
		]);
	});
	test('navigation smoke test @legal', async ({ page }) => {
		// navigate to privacy
		await Promise.all([
			await page.goto('/privacy'),
			await expect(page).toHaveTitle(/Privacy Policy/),
		]);

		// navigate to terms
		await Promise.all([
			await page.goto('/terms'),
			await expect(page).toHaveTitle(/Terms of Service/),
		]);
	});
	test('navigation smoke test @misc', async ({ page }) => {
		// navigate to sitemap
		await page.goto('/sitemap.xml');

		// navigate to rss
		await page.goto('/rss.xml');
	});
	test('navigation smoke test @landing-pages', async ({ page }) => {});
	test('guards on protected routes', async ({ page }) => {});
	test('redirects', async ({ page }) => {});
});
