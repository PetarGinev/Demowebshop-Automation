import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, acceptTermsOfService, clickCheckout } from '../helpers/cart';
import {
  startGuestCheckout,
  fillBillingAddress,
  continueFromBillingAddress,
  FIELD_VALIDATION_ERROR,
} from '../helpers/checkout';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC26 (negative) - Submitting the billing address form with an empty
 * required "Zip / postal code" field shows a field validation error and
 * keeps the user on the billing address step.
 */
export async function TC26(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);
  await acceptTermsOfService(page);
  await clickCheckout(page);
  await startGuestCheckout(page);

  await fillBillingAddress(page, {
    firstName: 'Missing',
    lastName: 'Zip',
    email: `missing.zip.${Date.now()}@example.com`,
    country: 'United States',
    city: 'New York',
    address1: '123 Test Street',
    zipPostalCode: '',
    phoneNumber: '5551234567',
  });
  await continueFromBillingAddress(page);

  const fieldValidationErrorLocator = page.locator(FIELD_VALIDATION_ERROR);
  await fieldValidationErrorLocator.waitFor({ state: 'visible' });
  const errors = await fieldValidationErrorLocator.allTextContents();
  expect(errors).toContain('Zip / postal code is required');
}
