import { Page, expect } from '@playwright/test';
import { goToLoginPage, login, getLoginErrors, HEADER_LOGIN_LINK } from '../helpers/login';

/**
 * TC9 (negative) - Submitting the login form with both email and password
 * left empty is rejected. This is checked for both fields empty and for
 * each field empty individually, since email-only or password-only
 * omissions can be validated differently by the form.
 */
export async function TC9(page: Page) {
  await goToLoginPage(page);
  await login(page, '', '');
  let errors = await getLoginErrors(page);
  expect(errors.length).toBeGreaterThan(0);
  await expect(page).toHaveURL(/login/);
  await expect(page.locator(HEADER_LOGIN_LINK)).toBeVisible();

  await goToLoginPage(page);
  await login(page, 'someone@example.com', '');
  errors = await getLoginErrors(page);
  expect(errors.length).toBeGreaterThan(0);
  await expect(page).toHaveURL(/login/);

  await goToLoginPage(page);
  await login(page, '', 'SomePassword123!');
  errors = await getLoginErrors(page);
  expect(errors.length).toBeGreaterThan(0);
  await expect(page).toHaveURL(/login/);
}
