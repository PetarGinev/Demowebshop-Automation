import { Page, expect } from '@playwright/test';

// Constants - selectors
export const URL_REGISTER = '/register';
export const ID_GENDER_MALE = '#gender-male';
export const ID_GENDER_FEMALE = '#gender-female';
export const ID_FIRST_NAME = '#FirstName';
export const ID_LAST_NAME = '#LastName';
export const ID_EMAIL = '#Email';
export const ID_PASSWORD = '#Password';
export const ID_CONFIRM_PASSWORD = '#ConfirmPassword';
export const BTN_REGISTER = '#register-button';
export const REGISTRATION_RESULT = '.result';
export const FIELD_VALIDATION_ERROR = '.field-validation-error';
export const VALIDATION_SUMMARY_ERRORS = '.validation-summary-errors';

export interface RegistrationInfo {
  gender?: 'male' | 'female';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/** Navigates to the registration page. */
export async function goToRegisterPage(page: Page) {
  await page.goto(URL_REGISTER);
}

/** Fills in and submits the registration form with the given details. */
export async function registerNewAccount(page: Page, info: RegistrationInfo) {
  if (info.gender === 'female') {
    await page.locator(ID_GENDER_FEMALE).check();
  } else if (info.gender === 'male') {
    await page.locator(ID_GENDER_MALE).check();
  }

  await page.locator(ID_FIRST_NAME).fill(info.firstName);
  await page.locator(ID_LAST_NAME).fill(info.lastName);
  await page.locator(ID_EMAIL).fill(info.email);
  await page.locator(ID_PASSWORD).fill(info.password);
  await page.locator(ID_CONFIRM_PASSWORD).fill(info.confirmPassword);
  await page.locator(BTN_REGISTER).click();
}

/** Returns the success message shown after a successful registration. */
export async function getRegistrationResultMessage(page: Page) {
  return page.locator(REGISTRATION_RESULT).textContent();
}

/** Returns all inline field-level validation error messages on the page. */
export async function getFieldValidationErrors(page: Page) {
  return page.locator(FIELD_VALIDATION_ERROR).allTextContents();
}

/** Returns all top-of-form validation summary error messages, if any. */
export async function getValidationSummaryErrors(page: Page) {
  return page.locator(`${VALIDATION_SUMMARY_ERRORS} li`).allTextContents();
}

/** Generates a unique email address, useful for repeatable positive registration tests. */
export function generateUniqueEmail(prefix = 'qa.automation'): string {
  return `${prefix}.${Date.now()}@example.com`;
}
