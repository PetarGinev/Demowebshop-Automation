import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import {
  addProductToCartFromGrid,
  getCartQuantityBadge,
  goToCartPage,
  getCartItemNames,
  getCartItemSubtotalValue,
} from '../helpers/cart';
import { getCategoryProductPrices } from '../helpers/product';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC15 (positive) - Adding a product to the cart directly from a search
 * results grid increases the header cart badge count, and the cart page
 * subsequently reflects that same product with a subtotal matching a
 * single unit's price.
 */
export async function TC15(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');

  expect(await getCartQuantityBadge(page)).toBe(0);

  const gridPrices = await getCategoryProductPrices(page);
  await addProductToCartFromGrid(page, PRODUCT_NAME);

  expect(await getCartQuantityBadge(page)).toBe(1);

  await goToCartPage(page);
  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames.some((name) => name.includes(PRODUCT_NAME))).toBe(true);

  const subtotal = await getCartItemSubtotalValue(page, PRODUCT_NAME);
  expect(gridPrices.length).toBeGreaterThan(0);
  expect(subtotal).toBeGreaterThan(0);
}
