import { Page, expect } from '@playwright/test';
import { loginAsStandardUser, STANDARD_EMAIL } from '../helpers/login';
import { goToAccountInfoPage, updateEmail, getAccountFieldValidationErrors, getAccountEmailValue } from '../helpers/account';

/**
 * TC36 (negative) - Submitting the account info form with an invalid
 * email format shows a field validation error and does not overwrite
 * the account's real, previously-saved email address.
 */
export async function TC36(page: Page) {
  await loginAsStandardUser(page);
  await goToAccountInfoPage(page);

  await updateEmail(page, 'not-a-valid-email');

  const errors = await getAccountFieldValidationErrors(page);
  expect(errors.some((e) => e.toLowerCase().includes('wrong email'))).toBe(true);

  // The invalid value was rejected server-side, so a fresh load of the
  // page should still show the account's real, previously-saved email.
  await page.reload();
  const emailAfterReload = await getAccountEmailValue(page);
  expect(emailAfterReload.toLowerCase()).toBe(STANDARD_EMAIL.toLowerCase());
}
