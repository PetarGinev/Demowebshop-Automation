import { Page, expect } from '@playwright/test';
import { loginAsStandardUser, logout, HEADER_LOGIN_LINK, HEADER_LOGOUT_LINK, HEADER_ACCOUNT_LINK } from '../helpers/login';
import { goToAccountInfoPage } from '../helpers/account';

/**
 * TC10 (positive) - Logging out after a successful login fully tears
 * down the session: the header returns to its logged-out state, and a
 * subsequent direct navigation to an account-only page (customer info)
 * redirects back to the login page rather than showing account data.
 */
export async function TC10(page: Page) {
  await loginAsStandardUser(page);
  await expect(page.locator(HEADER_ACCOUNT_LINK)).toBeVisible();

  await logout(page);

  await expect(page.locator(HEADER_LOGIN_LINK)).toBeVisible();
  await expect(page.locator(HEADER_LOGOUT_LINK)).toHaveCount(0);
  await expect(page.locator(HEADER_ACCOUNT_LINK)).toHaveCount(0);

  // An account-only page should no longer be reachable once logged out.
  await goToAccountInfoPage(page);
  await expect(page).toHaveURL(/login/);
}
