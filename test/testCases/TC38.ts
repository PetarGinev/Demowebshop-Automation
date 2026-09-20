import { Page, expect } from '@playwright/test';
import { subscribeToNewsletter, getNewsletterResultMessage, NEWSLETTER_RESULT_BLOCK } from '../helpers/newsletter';

/**
 * TC38 (negative) - Subscribing to the newsletter with a malformed email
 * address (missing the "@" entirely) shows a validation message rather
 * than a success confirmation.
 */
export async function TC38(page: Page) {
  await page.goto('/');
  await subscribeToNewsletter(page, 'not-an-email-address');

  const message = await getNewsletterResultMessage(page);
  await expect(page.locator(NEWSLETTER_RESULT_BLOCK)).toBeVisible();
  expect(message).not.toContain('Thank you for signing up');
  expect(message).toContain('Enter valid email');
}
