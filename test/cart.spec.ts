import { test } from '@playwright/test';
import { TC15 } from './testCases/TC15';
import { TC16 } from './testCases/TC16';
import { TC17 } from './testCases/TC17';
import { TC18 } from './testCases/TC18';
import { TC19 } from './testCases/TC19';
import { TC39 } from './testCases/TC39';
import { TC40 } from './testCases/TC40';
import { TC49 } from './testCases/TC49';
import { TC50 } from './testCases/TC50';

test.describe('Shopping Cart test suite', () => {
  test('TC15 - Adding a product from a grid updates the badge and cart page', async ({ page }) => {
    await TC15(page);
  });

  test('TC16 - Cart page displays the added product', async ({ page }) => {
    await TC16(page);
  });

  test('TC17 - Updating quantity recalculates the line subtotal', async ({ page }) => {
    await TC17(page);
  });

  test('TC18 - Removing items one at a time eventually empties the cart', async ({ page }) => {
    await TC18(page);
  });

  test('TC19 - Checkout is blocked without Terms of Service, then allowed after accepting', async ({ page }) => {
    await TC19(page);
  });

  test('TC39 - Cart totals correctly reflect multiple line items', async ({ page }) => {
    await TC39(page);
  });

  test('TC40 - An invalid discount coupon code is rejected', async ({ page }) => {
    await TC40(page);
  });

  test('TC49 - Adding the same product twice merges into one line with quantity 2', async ({ page }) => {
    await TC49(page);
  });

  test('TC50 - A negative quantity does not leave the cart in an invalid state', async ({ page }) => {
    await TC50(page);
  });
});
