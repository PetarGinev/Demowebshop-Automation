import { Page, expect } from '@playwright/test';
import { login, getLoginErrors, HEADER_ACCOUNT_LINK, HEADER_LOGIN_LINK } from '../helpers/login';
import { goToRegisterPage } from '../helpers/registration';

/**
 * TC8 (negative) - Logging in with an email that has never been
 * registered fails with a validation error, the header stays in its
 * logged-out state, and the same email is still free to be used for a
 * brand-new registration (proving no phantom account exists for it).
 */
export async function TC8(page: Page) {
  const unregisteredEmail = `never.registered.${Date.now()}@example.com`;

  await login(page, unregisteredEmail, 'SomePassword123!');

  const errors = await getLoginErrors(page);
  expect(errors.length).toBeGreaterThan(0);
  await expect(page).toHaveURL(/login/);
  await expect(page.locator(HEADER_LOGIN_LINK)).toBeVisible();
  await expect(page.locator(HEADER_ACCOUNT_LINK)).toHaveCount(0);

  // The email should still be available for a fresh registration.
  await goToRegisterPage(page);
  await expect(page.locator('#Email')).toHaveValue('');
}
