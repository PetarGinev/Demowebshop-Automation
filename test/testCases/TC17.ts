import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, updateCartItemQuantity, getCartItemSubtotal } from '../helpers/cart';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC17 (positive) - Updating a cart line item's quantity and clicking
 * "Update shopping cart" recalculates that line's subtotal.
 */
export async function TC17(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);

  const subtotalForOne = await getCartItemSubtotal(page, PRODUCT_NAME);

  await updateCartItemQuantity(page, PRODUCT_NAME, 3);

  const subtotalForThree = await getCartItemSubtotal(page, PRODUCT_NAME);
  expect(subtotalForThree).not.toBe(subtotalForOne);
}
