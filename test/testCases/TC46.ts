import { Page, expect } from '@playwright/test';
import { login, STANDARD_EMAIL, STANDARD_PASSWORD, HEADER_ACCOUNT_LINK } from '../helpers/login';

/**
 * TC46 (positive) - Logging in with the registered email typed in a
 * different letter case (e.g. all uppercase) still succeeds, since email
 * addresses are conventionally treated as case-insensitive for login.
 */
export async function TC46(page: Page) {
  await login(page, STANDARD_EMAIL.toUpperCase(), STANDARD_PASSWORD);

  await expect(page.locator(HEADER_ACCOUNT_LINK)).toBeVisible();
}
