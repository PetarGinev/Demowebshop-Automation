import { Page } from '@playwright/test';

// Constants - selectors
export const URL_ACCOUNT_INFO = '/customer/info';
export const ACCOUNT_EMAIL_INPUT = '#Email';
export const ACCOUNT_FIRST_NAME_INPUT = '#FirstName';
export const ACCOUNT_LAST_NAME_INPUT = '#LastName';
export const BTN_SAVE_ACCOUNT_INFO_TEXT = 'Save';
export const ACCOUNT_INFO_RESULT = '.result';
export const FIELD_VALIDATION_ERROR = '.field-validation-error';

// Change password page
export const URL_CHANGE_PASSWORD = '/customer/changepassword';
export const OLD_PASSWORD_INPUT = '#OldPassword';
export const NEW_PASSWORD_INPUT = '#NewPassword';
export const CONFIRM_NEW_PASSWORD_INPUT = '#ConfirmNewPassword';
export const BTN_CHANGE_PASSWORD_TEXT = 'Change password';
export const CHANGE_PASSWORD_RESULT = '.result';
export const CHANGE_PASSWORD_ERROR = '.message-error'; 

export interface ChangePasswordInfo {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

/** Navigates to the "Change password" page (requires an active login session). */
export async function goToChangePasswordPage(page: Page) {
  await page.goto(URL_CHANGE_PASSWORD);
}

/** Fills in and submits the change-password form. */
export async function changePassword(page: Page, info: ChangePasswordInfo) {
  await page.locator(OLD_PASSWORD_INPUT).fill(info.oldPassword);
  await page.locator(NEW_PASSWORD_INPUT).fill(info.newPassword);
  await page.locator(CONFIRM_NEW_PASSWORD_INPUT).fill(info.confirmNewPassword);
  await page.getByRole('button', { name: BTN_CHANGE_PASSWORD_TEXT }).click();
}

/** Returns the result/message shown after attempting to change the password. */
export async function getChangePasswordResultMessage(page: Page) {
  if (await page.locator(CHANGE_PASSWORD_RESULT).isVisible()) {
    return page.locator(CHANGE_PASSWORD_RESULT).textContent();
  }

  return page.locator(CHANGE_PASSWORD_ERROR).textContent();
}

/** Navigates to the "My account" / customer info page (requires an active login session). */
export async function goToAccountInfoPage(page: Page) {
  await page.goto(URL_ACCOUNT_INFO);
}

/** Returns the value currently populated in the account's email field. */
export async function getAccountEmailValue(page: Page) {
  return page.locator(ACCOUNT_EMAIL_INPUT).inputValue();
}

/** Returns the value currently populated in the account's first name field. */
export async function getAccountFirstNameValue(page: Page) {
  return page.locator(ACCOUNT_FIRST_NAME_INPUT).inputValue();
}

/** Clears and refills the last name field, then clicks "Save". */
export async function updateLastName(page: Page, newLastName: string) {
  await page.locator(ACCOUNT_LAST_NAME_INPUT).fill(newLastName);
  await page.getByRole('button', { name: BTN_SAVE_ACCOUNT_INFO_TEXT }).click();
}

/** Clears the email field, fills it with a new value, then clicks "Save". */
export async function updateEmail(page: Page, newEmail: string) {
  await page.locator(ACCOUNT_EMAIL_INPUT).fill(newEmail);
  await page.getByRole('button', { name: BTN_SAVE_ACCOUNT_INFO_TEXT }).click();
}

/** Returns the success/result message shown after saving account info. */
export async function getAccountUpdateResultMessage(page: Page) {
  return page.locator(ACCOUNT_INFO_RESULT).textContent();
}

/** Returns all inline field-level validation error messages on the account info page. */
export async function getAccountFieldValidationErrors(page: Page) {
  return page.locator(FIELD_VALIDATION_ERROR).allTextContents();
}
