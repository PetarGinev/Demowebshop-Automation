import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, updateCartItemQuantity, getCartItemSubtotal } from '../helpers/cart';
import { PRODUCT_NAME_LAPTOP, PRODUCT_SEARCH_LAPTOP } from '../helpers/product';

/**
 * TC17 (positive) - Updating a cart line item's quantity and clicking
 * "Update shopping cart" recalculates that line's subtotal.
 */
export async function TC17(page: Page) {
  await page.goto('/');
  await searchForProduct(page, PRODUCT_SEARCH_LAPTOP);
  await addProductToCartFromGrid(page, PRODUCT_NAME_LAPTOP);
  await goToCartPage(page);

  const subtotalForOne = await getCartItemSubtotal(page, PRODUCT_NAME_LAPTOP);

  await updateCartItemQuantity(page, PRODUCT_NAME_LAPTOP, 3);

  const subtotalForThree = await getCartItemSubtotal(page, PRODUCT_NAME_LAPTOP);
  expect(subtotalForThree).not.toBe(subtotalForOne);
}
