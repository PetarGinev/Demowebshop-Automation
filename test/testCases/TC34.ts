import { Page, expect } from '@playwright/test';
import { loginAsStandardUser, STANDARD_EMAIL } from '../helpers/login';
import { goToAccountInfoPage, getAccountEmailValue, getAccountFirstNameValue } from '../helpers/account';

/**
 * TC34 (positive) - After logging in, a registered user can open "My
 * account" and sees the account info form pre-filled with their real
 * email and a non-empty first name, confirming the session is tied to
 * the correct customer record.
 */
export async function TC34(page: Page) {
  await loginAsStandardUser(page);

  await goToAccountInfoPage(page);

  const email = await getAccountEmailValue(page);
  expect(email.toLowerCase()).toBe(STANDARD_EMAIL.toLowerCase());

  const firstName = await getAccountFirstNameValue(page);
  expect(firstName.trim().length).toBeGreaterThan(0);

  await expect(page).toHaveURL(/customer\/info/);
}
