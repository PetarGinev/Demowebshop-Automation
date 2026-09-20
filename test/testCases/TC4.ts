import { Page, expect } from '@playwright/test';
import {
  goToRegisterPage,
  registerNewAccount,
  getFieldValidationErrors,
  generateUniqueEmail,
} from '../helpers/registration';

/**
 * TC4 (negative) - Registering with a "Confirm password" that does not
 * match "Password" shows a field validation error and does not create
 * the account.
 */
export async function TC4(page: Page) {
  await goToRegisterPage(page);

  await registerNewAccount(page, {
    gender: 'male',
    firstName: 'Mismatch',
    lastName: 'Password',
    email: generateUniqueEmail('mismatch.password'),
    password: 'Password123!',
    confirmPassword: 'DifferentPassword456!',
  });

  const errors = await getFieldValidationErrors(page);
  expect(errors.some((e) => e.toLowerCase().includes('password'))).toBe(true);
  await expect(page).toHaveURL(/register/);
}
