import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, acceptTermsOfService, clickCheckout } from '../helpers/cart';
import { completeGuestCheckout, getOrderCompletedMessage, getOrderNumberText } from '../helpers/checkout';
import { PRODUCT_NAME_LAPTOP, PRODUCT_SEARCH_LAPTOP } from '../helpers/product';

/**
 * TC53 (positive) - A guest checkout using an alternate payment method
 * ("Check / Money Order" instead of "Cash On Delivery") still completes
 * successfully, ending on the order confirmation page with a visible
 * order number — confirming the flow isn't hardcoded to one method.
 */
export async function TC53(page: Page) {
  await page.goto('/');
  await searchForProduct(page, PRODUCT_SEARCH_LAPTOP);
  await addProductToCartFromGrid(page, PRODUCT_NAME_LAPTOP);
  await goToCartPage(page);
  await acceptTermsOfService(page);
  await clickCheckout(page);

  await completeGuestCheckout(
    page,
    {
      firstName: 'Alt',
      lastName: 'PaymentMethod',
      email: `alt.payment.${Date.now()}@example.com`,
      country: 'United States',
      city: 'New York',
      address1: '123 Test Street',
      zipPostalCode: '10001',
      phoneNumber: '5551234567',
    },
    'Check / Money Order'
  );

  const message = await getOrderCompletedMessage(page);
  expect(message).toContain('successfully processed');

  const orderNumberText = await getOrderNumberText(page);
  expect(orderNumberText).toContain('Order number');
}
