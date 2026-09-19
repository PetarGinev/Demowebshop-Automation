import { Page, expect } from '@playwright/test';
import {
  loginAsStandardUser,
  HEADER_ACCOUNT_LINK,
  HEADER_LOGOUT_LINK,
  HEADER_LOGIN_LINK,
  STANDARD_EMAIL,
} from '../helpers/login';
import { goToAccountInfoPage, getAccountEmailValue } from '../helpers/account';

/**
 * TC6 (positive) - Logging in with valid, already-registered credentials
 * succeeds: the header switches from its logged-out state to its
 * logged-in state, and the session is honored across a subsequent
 * navigation to the account info page.
 */
export async function TC6(page: Page) {
  // Before logging in, the page should show the logged-out header state.
  await page.goto('/');
  await expect(page.locator(HEADER_LOGIN_LINK)).toBeVisible();
  await expect(page.locator(HEADER_LOGOUT_LINK)).toHaveCount(0);

  await loginAsStandardUser(page);

  // Immediately after login, the header should reflect the logged-in state.
  await expect(page.locator(HEADER_ACCOUNT_LINK)).toBeVisible();
  await expect(page.locator(HEADER_LOGOUT_LINK)).toBeVisible();
  await expect(page.locator(HEADER_LOGIN_LINK)).toHaveCount(0);

  // The session should persist across a fresh navigation, and the
  // account page should show the same email used to log in.
  await goToAccountInfoPage(page);
  const emailOnAccountPage = await getAccountEmailValue(page);
  expect(emailOnAccountPage.toLowerCase()).toBe(STANDARD_EMAIL.toLowerCase());
  await expect(page.locator(HEADER_ACCOUNT_LINK)).toBeVisible();
}
