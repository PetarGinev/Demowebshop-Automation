import { Page, expect } from '@playwright/test';
import { subscribeToNewsletter, getNewsletterResultMessage } from '../helpers/newsletter';

/**
 * TC60 (positive) - Subscribing with the same email address twice in a
 * row keeps the user on the same page both times (no navigation away,
 * consistent with an AJAX-style subscribe widget) and never shows an
 * error message on either attempt.
 */
export async function TC60(page: Page) {
  const email = `newsletter.repeat.${Date.now()}@example.com`;

  await page.goto('/');
  const urlBeforeFirstSubscribe = page.url();
  await subscribeToNewsletter(page, email);

  const firstMessage = await getNewsletterResultMessage(page);
  expect(firstMessage?.toLowerCase()).not.toMatch(/wrong|invalid|error/);
  expect(page.url()).toBe(urlBeforeFirstSubscribe);

  await page.reload();

  await subscribeToNewsletter(page, email);
  const secondMessage = await getNewsletterResultMessage(page);
  expect(secondMessage?.toLowerCase()).not.toMatch(/wrong|invalid|error/);
  expect(page.url()).toBe(urlBeforeFirstSubscribe);
}
