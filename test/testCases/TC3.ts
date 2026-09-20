import { Page, expect } from '@playwright/test';
import {
  goToRegisterPage,
  registerNewAccount,
  getValidationSummaryErrors,
  generateUniqueEmail,
} from '../helpers/registration';

/**
 * TC3 (negative) - Registering with an email that is already in use shows
 * the "The specified email already exists" validation error, and the
 * account is not created a second time.
 */
export async function TC3(page: Page) {
  const email = generateUniqueEmail('duplicate.user');
  const accountInfo = {
    gender: 'male' as const,
    firstName: 'Dupe',
    lastName: 'User',
    email,
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  // First registration should succeed.
  await goToRegisterPage(page);
  await registerNewAccount(page, accountInfo);
  await expect(page.locator('.result')).toContainText('Your registration completed');

  // Second registration with the same email should fail.
  await goToRegisterPage(page);
  await registerNewAccount(page, accountInfo);

  const errors = await getValidationSummaryErrors(page);
  expect(errors.some((e) => e.includes('already exists'))).toBe(true);
}
