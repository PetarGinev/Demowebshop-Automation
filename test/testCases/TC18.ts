import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import {
  addProductToCartFromGrid,
  goToCartPage,
  removeCartItem,
  isCartEmpty,
  getCartQuantityBadge,
  getCartItemNames,
} from '../helpers/cart';

const PRODUCT_ONE = '14.1-inch Laptop';
const PRODUCT_TWO = 'Build your own expensive computer';

/**
 * TC18 (positive) - Removing one of two items from the cart page leaves
 * only the other item behind (both the row and the badge count update
 * correctly); removing that remaining item then fully empties the cart.
 */
export async function TC18(page: Page) {
  await page.goto('/');

  await searchForProduct(page, PRODUCT_ONE);
  await addProductToCartFromGrid(page, PRODUCT_ONE);

  await page.goto('/');
  await searchForProduct(page, PRODUCT_TWO);
  await addProductToCartFromGrid(page, PRODUCT_TWO);

  expect(await getCartQuantityBadge(page)).toBe(2);

  await goToCartPage(page);
  await removeCartItem(page, PRODUCT_ONE);

  let cartItemNames = await getCartItemNames(page);
  expect(cartItemNames.some((name) => name.includes(PRODUCT_ONE))).toBe(false);
  expect(cartItemNames.some((name) => name.includes(PRODUCT_TWO))).toBe(true);
  expect(await getCartQuantityBadge(page)).toBe(1);

  await removeCartItem(page, PRODUCT_TWO);

  cartItemNames = await getCartItemNames(page);
  expect(cartItemNames).toHaveLength(0);
  expect(await isCartEmpty(page)).toBe(true);
  expect(await getCartQuantityBadge(page)).toBe(0);
}
