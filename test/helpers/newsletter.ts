import { Page } from '@playwright/test';

// Constants - selectors
export const NEWSLETTER_EMAIL_INPUT = '#newsletter-email';
export const BTN_NEWSLETTER_SUBSCRIBE = '#newsletter-subscribe-button';
export const NEWSLETTER_RESULT_BLOCK = '#newsletter-result-block';

/** Fills the footer newsletter email field and clicks "Subscribe". */
export async function subscribeToNewsletter(page: Page, email: string) {
  await page.locator(NEWSLETTER_EMAIL_INPUT).fill(email);
  await page.locator(BTN_NEWSLETTER_SUBSCRIBE).click();
}

/** Returns the result message shown after attempting to subscribe. */
export async function getNewsletterResultMessage(page: Page) {
  await page.locator(NEWSLETTER_RESULT_BLOCK).waitFor();
  return page.locator(NEWSLETTER_RESULT_BLOCK).textContent();
}

/** Returns the current value of the newsletter email input. */
export async function getNewsletterEmailValue(page: Page) {
  return page.locator(NEWSLETTER_EMAIL_INPUT).inputValue();
}
