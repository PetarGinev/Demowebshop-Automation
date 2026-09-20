import { Page, expect } from '@playwright/test';
import { subscribeToNewsletter, getNewsletterResultMessage, NEWSLETTER_RESULT_BLOCK } from '../helpers/newsletter';

/**
 * TC37 (positive) - Subscribing to the footer newsletter with a valid,
 * unique email address shows a success confirmation message, and
 * attempting to subscribe that same email a second time is still handled
 * gracefully (no error/crash), reflecting the site's actual behavior for
 * repeat subscriptions.
 */
export async function TC37(page: Page) {
  const email = `newsletter.${Date.now()}@example.com`;

  await page.goto('/');
  await subscribeToNewsletter(page, email);

  const message = await getNewsletterResultMessage(page);
  await expect(page.locator(NEWSLETTER_RESULT_BLOCK)).toBeVisible();
  expect(message).toContain('Thank you for signing up! A verification email has been sent. We appreciate your interest.');

  // Re-subscribing the same email shouldn't cause an error page.
  await page.goto('/');
  await subscribeToNewsletter(page, email);
  await expect(page.locator('body')).not.toContainText('Server Error');
}
