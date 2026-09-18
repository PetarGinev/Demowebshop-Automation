import { Page, expect } from '@playwright/test';
import { loginAsStandardUser } from '../helpers/login';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, acceptTermsOfService, clickCheckout } from '../helpers/cart';
import {
  selectOrFillBillingAddress,
  continueFromBillingAddress,
  continueFromShippingAddress,
  continueFromShippingMethod,
  selectPaymentMethod,
  continueFromPaymentInfo,
  confirmOrder,
  getOrderCompletedMessage,
  getOrderNumberText,
} from '../helpers/checkout';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC42 (positive) - A logged-in (registered) customer can complete
 * checkout end-to-end without ever seeing the "Checkout as Guest"
 * button, ending on the same order confirmation page with a visible
 * order number as the guest flow does.
 */
export async function TC42(page: Page) {
  await loginAsStandardUser(page);

  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);
  await acceptTermsOfService(page);
  await clickCheckout(page);

  // No "Checkout as Guest" step for an already-authenticated user.
  await expect(page.locator('#checkout-as-guest-button')).toHaveCount(0);

  await selectOrFillBillingAddress(page, {
    firstName: 'Logged',
    lastName: 'InUser',
    email: `logged.in.checkout.${Date.now()}@example.com`,
    country: 'United States',
    city: 'New York',
    address1: '123 Test Street',
    zipPostalCode: '10001',
    phoneNumber: '5551234567',
  });
  await continueFromBillingAddress(page);
  await continueFromShippingAddress(page);
  await continueFromShippingMethod(page);
  await selectPaymentMethod(page, 'Cash On Delivery');
  await continueFromPaymentInfo(page);
  await confirmOrder(page);

  const message = await getOrderCompletedMessage(page);
  expect(message).toContain('successfully processed');

  const orderNumberText = await getOrderNumberText(page);
  expect(orderNumberText).toContain('Order number');
}
