import { test } from '@playwright/test';
import { TC37 } from './testCases/TC37';
import { TC38 } from './testCases/TC38';
import { TC59 } from './testCases/TC59';
import { TC60 } from './testCases/TC60';

test.describe('Newsletter test suite', () => {
  test('TC37 - Subscribing with a valid email shows a success message', async ({ page }) => {
    await TC37(page);
  });

  test('TC38 - Subscribing with an invalid email shows a validation message', async ({ page }) => {
    await TC38(page);
  });

  test('TC59 - The email field clears after a successful subscription', async ({ page }) => {
    await TC59(page);
  });

  test('TC60 - Repeated subscription attempts stay on the same page without errors', async ({ page }) => {
    await TC60(page);
  });
});
