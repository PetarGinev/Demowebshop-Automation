import { Page, expect } from '@playwright/test';
import {
  goToRegisterPage,
  registerNewAccount,
  getRegistrationResultMessage,
  generateUniqueEmail,
} from '../helpers/registration';

/**
 * TC2 (positive) - Registering a new account with valid data (female)
 * succeeds and shows the registration confirmation message.
 */
export async function TC2(page: Page) {
  await goToRegisterPage(page);

  await registerNewAccount(page, {
    gender: 'female',
    firstName: 'Jane',
    lastName: 'Smith',
    email: generateUniqueEmail('jane.smith'),
    password: 'Password123!',
    confirmPassword: 'Password123!',
  });

  const message = await getRegistrationResultMessage(page);
  expect(message).toContain('Your registration completed');
}
