import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, getCartItemQuantityValue, getCartQuantityBadge, CART_ROW } from '../helpers/cart';
import { PRODUCT_NAME_LAPTOP, PRODUCT_SEARCH_LAPTOP } from '../helpers/product';

/**
 * TC49 (positive) - Adding the same product to the cart twice, from two
 * separate visits to the grid, merges into a single cart line with a
 * quantity of 2, rather than creating two separate rows for it.
 */
export async function TC49(page: Page) {
  await page.goto('/');
  await searchForProduct(page, PRODUCT_SEARCH_LAPTOP);
  await addProductToCartFromGrid(page, PRODUCT_NAME_LAPTOP);

  await page.goto('/');
  await searchForProduct(page, PRODUCT_SEARCH_LAPTOP);
  await addProductToCartFromGrid(page, PRODUCT_NAME_LAPTOP);

  expect(await getCartQuantityBadge(page)).toBe(2);

  await goToCartPage(page);

  const matchingRows = page.locator(CART_ROW).filter({ hasText: PRODUCT_NAME_LAPTOP });
  await expect(matchingRows).toHaveCount(1);

  const quantity = await getCartItemQuantityValue(page, PRODUCT_NAME_LAPTOP);
  expect(quantity).toBe(2);
}
