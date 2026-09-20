import { Page, expect } from '@playwright/test';
import {
  goToRegisterPage,
  registerNewAccount,
  getRegistrationResultMessage,
  generateUniqueEmail,
} from '../helpers/registration';

/**
 * TC1 (positive) - Registering a new account with valid data (male) succeeds
 * and shows the registration confirmation message.
 */
export async function TC1(page: Page) {
  await goToRegisterPage(page);

  await registerNewAccount(page, {
    gender: 'male',
    firstName: 'John',
    lastName: 'Doe',
    email: generateUniqueEmail('john.doe'),
    password: 'Password123!',
    confirmPassword: 'Password123!',
  });

  const message = await getRegistrationResultMessage(page);
  expect(message).toContain('Your registration completed');
}
