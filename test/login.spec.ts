import { test } from '@playwright/test';
import { TC6 } from './testCases/TC6';
import { TC7 } from './testCases/TC7';
import { TC8 } from './testCases/TC8';
import { TC9 } from './testCases/TC9';
import { TC10 } from './testCases/TC10';
import { TC45 } from './testCases/TC45';
import { TC46 } from './testCases/TC46';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Login page test suite', () => {
  test('TC6 - Login with valid credentials succeeds', async ({ page }) => {
    await TC6(page);
  });

  test('TC7 - Login with a wrong password shows a validation error', async ({ page }) => {
    await TC7(page); 
  });

  test('TC8 - Login with an unregistered email shows a validation error', async ({ page }) => {
    await TC8(page);
  });

  test('TC9 - Login with empty/partial email or password shows a validation error', async ({ page }) => {
    await TC9(page);
  });

  test('TC10 - Logout returns the header to its logged-out state', async ({ page }) => {
    await TC10(page);
  });

  test('TC45 - "Register" link on the login page navigates to registration', async ({ page }) => {
    await TC45(page);
  });

  test('TC46 - Login is case-insensitive for the email address', async ({ page }) => {
    await TC46(page);
  });
});
