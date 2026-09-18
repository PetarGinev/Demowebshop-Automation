import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, acceptTermsOfService, clickCheckout } from '../helpers/cart';
import { completeGuestCheckout, getOrderCompletedMessage, getOrderNumberText } from '../helpers/checkout';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC24 (positive) - A full guest checkout, from adding a product to
 * confirming the order with "Cash On Delivery", ends on the order
 * confirmation page with a visible order number.
 */
export async function TC24(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);
  await acceptTermsOfService(page);
  await clickCheckout(page);

  await completeGuestCheckout(page, {
    firstName: 'Guest',
    lastName: 'FullOrder',
    email: `guest.fullorder.${Date.now()}@example.com`,
    country: 'United States',
    city: 'New York',
    address1: '123 Test Street',
    zipPostalCode: '10001',
    phoneNumber: '5551234567',
  });

  const message = await getOrderCompletedMessage(page);
  expect(message).toContain('successfully processed');

  const orderNumberText = await getOrderNumberText(page);
  expect(orderNumberText).toContain('Order number');
}
