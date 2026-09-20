import { Page, expect } from '@playwright/test';
import {
  goToRegisterPage,
  registerNewAccount,
  getFieldValidationErrors,
  generateUniqueEmail,
} from '../helpers/registration';

/**
 * TC5 (negative) - Submitting the registration form with an empty
 * required field (First name) shows a field validation error and keeps
 * the user on the registration page.
 */
export async function TC5(page: Page) {
  await goToRegisterPage(page);

  await registerNewAccount(page, {
    gender: 'male',
    firstName: '',
    lastName: 'NoFirstName',
    email: generateUniqueEmail('no.first.name'),
    password: 'Password123!',
    confirmPassword: 'Password123!',
  });

  const errors = await getFieldValidationErrors(page);
  expect(errors.some((e) => e.toLowerCase().includes('first name'))).toBe(true);
  await expect(page).toHaveURL(/register/);
}
