import { Page, expect } from '@playwright/test';
import { goToRegisterPage, registerNewAccount, getFieldValidationErrors } from '../helpers/registration';

/**
 * TC43 (negative) - Registering with a malformed email address (missing
 * the "@") shows a field validation error and does not create an account.
 */
export async function TC43(page: Page) {
  await goToRegisterPage(page);

  await registerNewAccount(page, {
    gender: 'male',
    firstName: 'Bad',
    lastName: 'Email',
    email: 'not-a-valid-email',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  });

  const errors = await getFieldValidationErrors(page);
  expect(errors.some((e) => e.toLowerCase().includes('wrong email'))).toBe(true);
  await expect(page).toHaveURL(/register/);
}
