import { test } from '@playwright/test';
import { TC1 } from './testCases/TC1';
import { TC2 } from './testCases/TC2';
import { TC3 } from './testCases/TC3';
import { TC4 } from './testCases/TC4';
import { TC5 } from './testCases/TC5';
import { TC43 } from './testCases/TC43';
import { TC44 } from './testCases/TC44';

test.describe('Registration test suite', () => {
  test('TC1 - Register a new account with valid data (male)', async ({ page }) => {
    await TC1(page);
  });

  test('TC2 - Register a new account with valid data (female)', async ({ page }) => {
    await TC2(page);
  });

  test('TC3 - Registering with an existing email shows a validation error', async ({ page }) => {
    await TC3(page);
  });

  test('TC4 - Mismatched password/confirm password shows a validation error', async ({ page }) => {
    await TC4(page); 
  });

  test('TC5 - Missing required First name shows a validation error', async ({ page }) => {
    await TC5(page); 
  });

  test('TC43 - Malformed email shows a validation error', async ({ page }) => { 
    await TC43(page);
  });

  test('TC44 - Registration automatically logs the new user in', async ({ page }) => {
    await TC44(page);
  });
});
