import { Page, expect } from '@playwright/test';

/**
 * TC56 (negative) - Navigating directly to a product URL that doesn't
 * exist is handled gracefully: the app responds with a 404-style "not
 * found" page rather than crashing with a raw server error.
 */
export async function TC56(page: Page) {
  const response = await page.goto('/this-product-definitely-does-not-exist-xyz123');

  if (response) {
    expect(response.status()).toBeGreaterThanOrEqual(400);
  }
  await expect(page.locator('body')).not.toContainText('Server Error');
}
