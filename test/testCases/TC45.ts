import { Page, expect } from '@playwright/test';
import { goToLoginPage, HEADER_REGISTER_LINK } from '../helpers/login';

/**
 * TC45 (positive) - From the login page, clicking the header's
 * "Register" link navigates to the registration page, giving users
 * without an account an obvious way out of the login form.
 */
export async function TC45(page: Page) {
  await goToLoginPage(page);

  await page.locator(HEADER_REGISTER_LINK).click();

  await expect(page).toHaveURL(/register/);
  await expect(page.locator('#FirstName')).toBeVisible();
}
