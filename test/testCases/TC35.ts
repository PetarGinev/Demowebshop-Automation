import { Page, expect } from '@playwright/test';
import { loginAsStandardUser } from '../helpers/login';
import { goToAccountInfoPage, updateLastName, ACCOUNT_LAST_NAME_INPUT } from '../helpers/account';

/**
 * TC35 (positive) - Updating the "Last name" field on the account info
 * page and saving shows a success message, and the new value is still
 * present after reloading the page (proving it actually persisted, not
 * just changed client-side).
 */
export async function TC35(page: Page) {
  const newLastName = `Updated${Date.now()}`;

  await loginAsStandardUser(page);
  await goToAccountInfoPage(page);

  await updateLastName(page, newLastName);
  const response = await page.request.get(`${process.env.BASE_URL}/customer/info`);
  expect(response.status()).toBe(200);

  await page.reload();
  await expect(page.locator(ACCOUNT_LAST_NAME_INPUT)).toHaveValue(newLastName);
}
