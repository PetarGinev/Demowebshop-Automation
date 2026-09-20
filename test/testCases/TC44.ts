import { Page, expect } from '@playwright/test';
import { goToRegisterPage, registerNewAccount, getRegistrationResultMessage, generateUniqueEmail } from '../helpers/registration';
import { HEADER_ACCOUNT_LINK, HEADER_LOGIN_LINK } from '../helpers/login';

/**
 * TC44 (positive) - Completing registration automatically logs the new
 * user in: right after the success message, the header already shows
 * the authenticated account link rather than "Log in".
 */
export async function TC44(page: Page) {
  await goToRegisterPage(page);

  await registerNewAccount(page, {
    gender: 'female',
    firstName: 'AutoLogin',
    lastName: 'Check',
    email: generateUniqueEmail('auto.login'),
    password: 'Password123!',
    confirmPassword: 'Password123!',
  });

  const message = await getRegistrationResultMessage(page);
  expect(message).toContain('Your registration completed');

  await expect(page.locator(HEADER_ACCOUNT_LINK).first()).toBeVisible();
  await expect(page.locator(HEADER_LOGIN_LINK)).toHaveCount(0);
}
