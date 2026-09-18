import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, acceptTermsOfService, clickCheckout } from '../helpers/cart';
import {
  startGuestCheckout,
  fillBillingAddress,
  continueFromBillingAddress,
  continueFromShippingAddress,
  continueFromShippingMethod,
} from '../helpers/checkout';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC27 (positive) - Accepting the pre-selected shipping method and
 * clicking "Continue" advances the checkout wizard to the payment
 * method step.
 */
export async function TC27(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);
  await acceptTermsOfService(page);
  await clickCheckout(page);
  await startGuestCheckout(page);

  await fillBillingAddress(page, {
    firstName: 'Shipping',
    lastName: 'MethodTest',
    email: `shipping.method.${Date.now()}@example.com`,
    country: 'United States',
    city: 'New York',
    address1: '123 Test Street',
    zipPostalCode: '10001',
    phoneNumber: '5551234567',
  });
  await continueFromBillingAddress(page);
  await continueFromShippingAddress(page);
  await continueFromShippingMethod(page);

  await expect(page.locator('#payment-method-buttons-container')).toBeVisible();
}
