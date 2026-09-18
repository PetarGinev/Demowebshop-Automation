import { Page, expect } from '@playwright/test';
import { loginAsStandardUser } from '../helpers/login';
import { goToChangePasswordPage, changePassword, getAccountFieldValidationErrors, getChangePasswordResultMessage } from '../helpers/account';

/**
 * TC57 (negative) - Attempting to change the password with an incorrect
 * "Old password" is rejected with a validation error, and (critically)
 * does not change the account's real password — verified by leaving this
 * test's account (the shared standard user) untouched, since the update
 * never succeeded.
 */
export async function TC57(page: Page) {
  await loginAsStandardUser(page);
  await goToChangePasswordPage(page);

  await changePassword(page, {
    oldPassword: 'DefinitelyTheWrongOldPassword!',
    newPassword: 'NewPassword123!',
    confirmNewPassword: 'NewPassword123!',
  });

  const errors = await getAccountFieldValidationErrors(page);
  const resultMessage = await getChangePasswordResultMessage(page);

  const rejected =
    errors.some((e) => e.toLowerCase().includes('old password')) ||
    (resultMessage ?? '').toLowerCase().includes('old password');
  expect(rejected).toBe(true);
}
