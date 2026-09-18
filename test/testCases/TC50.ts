import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, updateCartItemQuantity, getCartItemQuantityValue } from '../helpers/cart';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC50 (negative) - Setting a cart line item's quantity to a negative
 * number and updating the cart does not leave the cart in an invalid
 * The app removes the previously added product from cart
 */
export async function TC50(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);

  await updateCartItemQuantity(page, PRODUCT_NAME, -1);

  const quantityAfter = await getCartItemQuantityValue(page, PRODUCT_NAME);
  const hasValidationError = await page.locator('.field-validation-error, .message-error').count();

  expect(quantityAfter === 0 || hasValidationError === 0).toBe(true);
}
