import { Page, expect } from '@playwright/test';

// Constants - selectors
export const URL_LOGIN = '/login';
export const ID_LOGIN_EMAIL = '#Email';
export const ID_LOGIN_PASSWORD = '#Password';
export const ID_REMEMBER_ME = '#RememberMe';
export const BTN_LOGIN = '.login-button';
export const LOGIN_VALIDATION_SUMMARY = '.validation-summary-errors';

export const HEADER_LOGIN_LINK = '.ico-login';
export const HEADER_LOGOUT_LINK = '.ico-logout';
export const HEADER_ACCOUNT_LINK = '.account';
export const HEADER_REGISTER_LINK = '.ico-register';
export const FORGOT_PASSWORD_LINK = '.forgot-password a';

export const URL_PASSWORD_RECOVERY = '/passwordrecovery';
export const PASSWORD_RECOVERY_EMAIL_INPUT = '#Email';
export const BTN_PASSWORD_RECOVERY = 'button:has-text("Recover")';
export const PASSWORD_RECOVERY_RESULT = '.result';

// Standard already-registered account used across most non-registration tests.
export const STANDARD_EMAIL = process.env.STANDARD_EMAIL!;
export const STANDARD_PASSWORD = process.env.STANDARD_PASSWORD!;

/** Navigates to the login page. */
export async function goToLoginPage(page: Page) {
  await page.goto(URL_LOGIN);
}

/** Fills in and submits the login form with the given credentials. */
export async function login(page: Page, email: string, password: string) {
  await goToLoginPage(page);
  await page.locator(ID_LOGIN_EMAIL).fill(email);
  await page.locator(ID_LOGIN_PASSWORD).fill(password);
  await page.locator(BTN_LOGIN).click();
}

/** Logs in with the standard, already-registered account from .env. */
export async function loginAsStandardUser(page: Page) {
  await login(page, STANDARD_EMAIL, STANDARD_PASSWORD);
  await expect(page.locator(HEADER_ACCOUNT_LINK).first()).toBeVisible();
}

/** Logs the current user out via the header "Log out" link. */
export async function logout(page: Page) {
  await page.locator(HEADER_LOGOUT_LINK).click();
  await expect(page.locator(HEADER_LOGIN_LINK)).toBeVisible();
}

/** Returns true if the header shows an authenticated account link. */
export async function isLoggedIn(page: Page) {
  return page.locator(HEADER_ACCOUNT_LINK).isVisible();
}

/** Returns the validation summary error messages shown on the login page, if any. */
export async function getLoginErrors(page: Page) {
  return page.locator(`${LOGIN_VALIDATION_SUMMARY} li`).allTextContents();
}
