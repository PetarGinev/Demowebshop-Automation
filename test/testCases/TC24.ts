import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, acceptTermsOfService, clickCheckout } from '../helpers/cart';
import { completeGuestCheckout, getOrderCompletedMessage, getOrderNumberText } from '../helpers/checkout';
import { PRODUCT_NAME_LAPTOP, PRODUCT_SEARCH_LAPTOP } from '../helpers/product';

/**
 * TC24 (positive) - A full guest checkout, from adding a product to
 * confirming the order with "Cash On Delivery", ends on the order
 * confirmation page with a visible order number.
 */
export async function TC24(page: Page) {
  await page.goto('/');
  await searchForProduct(page, PRODUCT_SEARCH_LAPTOP);
  await addProductToCartFromGrid(page, PRODUCT_NAME_LAPTOP);
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
