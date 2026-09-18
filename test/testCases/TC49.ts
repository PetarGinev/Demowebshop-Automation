import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, getCartItemQuantityValue, getCartQuantityBadge, CART_ROW } from '../helpers/cart';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC49 (positive) - Adding the same product to the cart twice, from two
 * separate visits to the grid, merges into a single cart line with a
 * quantity of 2, rather than creating two separate rows for it.
 */
export async function TC49(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);

  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);

  expect(await getCartQuantityBadge(page)).toBe(2);

  await goToCartPage(page);

  const matchingRows = page.locator(CART_ROW).filter({ hasText: PRODUCT_NAME });
  await expect(matchingRows).toHaveCount(1);

  const quantity = await getCartItemQuantityValue(page, PRODUCT_NAME);
  expect(quantity).toBe(2);
}
