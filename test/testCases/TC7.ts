import { Page, expect } from '@playwright/test';
import { login, getLoginErrors, STANDARD_EMAIL, HEADER_ACCOUNT_LINK, HEADER_LOGIN_LINK, LOGIN_VALIDATION_SUMMARY } from '../helpers/login';

/**
 * TC7 (negative) - Logging in with a valid, registered email but the
 * wrong password fails: a validation error is shown, the user remains
 * on the login page, no authenticated session is created, and a
 * subsequent retry with the correct password still succeeds (proving the
 * failed attempt didn't lock or corrupt the account).
 */
export async function TC7(page: Page) {
  await login(page, STANDARD_EMAIL, 'ThisIsDefinitelyWrong123!');

  const errors = await getLoginErrors(page);
  expect(errors.length).toBeGreaterThan(0);
  await expect(page.locator(LOGIN_VALIDATION_SUMMARY)).toBeVisible();
  expect(errors).toContain('The credentials provided are incorrect');

  await expect(page).toHaveURL(/login/);
  await expect(page.locator(HEADER_LOGIN_LINK)).toBeVisible();
  await expect(page.locator(HEADER_ACCOUNT_LINK)).toHaveCount(0);

  // The account itself should be unaffected: logging in again with the
  // correct password should still work.
  const standardPassword = process.env.STANDARD_PASSWORD!;
  await login(page, STANDARD_EMAIL, standardPassword);
  await expect(page.locator(HEADER_ACCOUNT_LINK)).toBeVisible();
}
