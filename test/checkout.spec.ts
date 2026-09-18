import { test } from '@playwright/test';
import { TC23 } from './testCases/TC23';
import { TC24 } from './testCases/TC24';
import { TC25 } from './testCases/TC25';
import { TC26 } from './testCases/TC26';
import { TC27 } from './testCases/TC27';
import { TC28 } from './testCases/TC28';
import { TC42 } from './testCases/TC42';
import { TC53 } from './testCases/TC53';
import { TC54 } from './testCases/TC54';

test.describe('Checkout page test suite', () => {
  test('TC23 - Valid billing address advances to the shipping address step', async ({ page }) => {
    await TC23(page);
  });

  test('TC24 - Full guest checkout completes with an order confirmation', async ({ page }) => {
    await TC24(page);
  });

  test('TC25 - Missing City on billing address shows a validation error', async ({ page }) => {
    await TC25(page);
  });

  test('TC26 - Missing Zip/postal code on billing address shows a validation error', async ({ page }) => {
    await TC26(page);
  });

  test('TC27 - Accepting the shipping method advances to the payment method step', async ({ page }) => {
    await TC27(page);
  });

  test('TC28 - An empty cart consistently shows the "cart is empty" message', async ({ page }) => {
    await TC28(page);
  });

  test('TC42 - A logged-in user completes checkout without the guest step', async ({ page }) => {
    await TC42(page);
  });

  test('TC53 - Checkout completes with an alternate payment method', async ({ page }) => {
    await TC53(page);
  });

  test('TC54 - Missing phone number on billing address shows a validation error', async ({ page }) => {
    await TC54(page);
  });
});
