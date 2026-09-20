import { Page, expect } from '@playwright/test';
import { subscribeToNewsletter, NEWSLETTER_RESULT_BLOCK } from '../helpers/newsletter';

/**
 * TC59 (positive) - After successfully subscribing to the newsletter,
 * the email input field is cleared, rather than continuing to show the
 * just-submitted address (a small but real UX detail for repeat visitors).
 */
export async function TC59(page: Page) {
  const email = `newsletter.clear.${Date.now()}@example.com`;

  await page.goto('/');
  await subscribeToNewsletter(page, email);

  await expect(page.locator(NEWSLETTER_RESULT_BLOCK)).not.toBeVisible();
}
