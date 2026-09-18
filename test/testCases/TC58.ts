import { Page, expect } from '@playwright/test';
import { goToRegisterPage, registerNewAccount, generateUniqueEmail } from '../helpers/registration';
import { logout, login, HEADER_ACCOUNT_LINK } from '../helpers/login';
import { goToChangePasswordPage, changePassword, getChangePasswordResultMessage } from '../helpers/account';

/**
 * TC58 (positive) - Changing the password with the correct old password
 * succeeds, and the new password can then be used to log back in.
 *
 * Uses a disposable, freshly-registered throwaway account (not the shared
 * STANDARD_EMAIL user from .env) so this test never mutates credentials
 * that other tests in this suite depend on.
 */
export async function TC58(page: Page) {
  const email = generateUniqueEmail('change.password');
  const originalPassword = 'OriginalPassword123!';
  const newPassword = 'BrandNewPassword456!';

  await goToRegisterPage(page);
  await registerNewAccount(page, {
    gender: 'male',
    firstName: 'Change',
    lastName: 'Password',
    email,
    password: originalPassword,
    confirmPassword: originalPassword,
  });
  // Registration logs the new account in automatically.

  await goToChangePasswordPage(page);
  await changePassword(page, {
    oldPassword: originalPassword,
    newPassword,
    confirmNewPassword: newPassword,
  });

  const resultMessage = await getChangePasswordResultMessage(page);
  expect(resultMessage).toContain('Password was changed');

  await logout(page);
  await login(page, email, newPassword);

  await expect(page.locator(HEADER_ACCOUNT_LINK).first()).toBeVisible();
}
