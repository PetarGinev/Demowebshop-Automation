import { test } from '@playwright/test';
import { TC34 } from './testCases/TC34';
import { TC35 } from './testCases/TC35';
import { TC36 } from './testCases/TC36';
import { TC57 } from './testCases/TC57';
import { TC58 } from './testCases/TC58';

test.describe('Account info test suite', () => {
  test('TC34 - My account shows the correct pre-filled email and first name', async ({ page }) => {
    await TC34(page);
  });

  test('TC35 - Updating the last name persists and shows a success message', async ({ page }) => {
    await TC35(page);
  });

  test('TC36 - An invalid email format is rejected and the real email is preserved', async ({ page }) => {
    await TC36(page);
  });

  test('TC57 - Changing password with the wrong old password is rejected', async ({ page }) => {
    await TC57(page);
  });

  test('TC58 - Changing password with the correct old password succeeds and can be used to log in', async ({ page }) => {
    await TC58(page);
  });
});
