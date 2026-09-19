import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, getCartItemNames } from '../helpers/cart';
import { PRODUCT_NAME_LAPTOP, PRODUCT_SEARCH_LAPTOP } from '../helpers/product';

/**
 * TC16 (positive) - After adding a product from a grid view, the cart
 * page correctly lists that product by name.
 */
export async function TC16(page: Page) {
  await page.goto('/');
  await searchForProduct(page, PRODUCT_SEARCH_LAPTOP);
  await addProductToCartFromGrid(page, PRODUCT_NAME_LAPTOP);

  await goToCartPage(page);

  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames.some((name) => name.includes(PRODUCT_NAME_LAPTOP))).toBe(true);
}
