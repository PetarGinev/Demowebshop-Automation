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
 * TC54 (negative) - Submitting the billing address form with an empty
 * required "Phone number" field shows a field validation error and keeps
 * the user on the billing address step.
 */
export async function TC54(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);
  await acceptTermsOfService(page);
  await clickCheckout(page);
  await startGuestCheckout(page);

  await fillBillingAddress(page, {
    firstName: 'Missing',
    lastName: 'Phone',
    email: `missing.phone.${Date.now()}@example.com`,
    country: 'United States',
    city: 'New York',
    address1: '123 Test Street',
    zipPostalCode: '10001',
    phoneNumber: '',
  });
  await continueFromBillingAddress(page);

  const fieldValidationErrorLocator = page.locator(FIELD_VALIDATION_ERROR);
  await fieldValidationErrorLocator.waitFor({ state: 'visible' });
  const errors = await fieldValidationErrorLocator.allTextContents();
  expect(errors).toContain('Phone is required');
}
