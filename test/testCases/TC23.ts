import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, acceptTermsOfService, clickCheckout } from '../helpers/cart';
import { startGuestCheckout, fillBillingAddress, continueFromBillingAddress } from '../helpers/checkout';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC23 (positive) - As a guest, filling in a valid billing address and
 * clicking "Continue" advances the checkout wizard to the next
 * (shipping address) step.
 */
export async function TC23(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);
  await acceptTermsOfService(page);
  await clickCheckout(page);
  await startGuestCheckout(page);

  await fillBillingAddress(page, {
    firstName: 'Guest',
    lastName: 'Checkout',
    email: `guest.checkout.${Date.now()}@example.com`,
    country: 'United States',
    city: 'New York',
    address1: '123 Test Street',
    zipPostalCode: '10001',
    phoneNumber: '5551234567',
  });
  await continueFromBillingAddress(page);

  await expect(page.locator('#shipping-buttons-container')).toBeVisible();
}
