import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, getCartItemNames } from '../helpers/cart';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC16 (positive) - After adding a product from a grid view, the cart
 * page correctly lists that product by name.
 */
export async function TC16(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);

  await goToCartPage(page);

  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames.some((name) => name.includes(PRODUCT_NAME))).toBe(true);
}
