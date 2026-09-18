import { Page, expect } from '@playwright/test';
import { goToCartPage, isCartEmpty, getCartItemNames, getCartQuantityBadge } from '../helpers/cart';

/**
 * TC28 (negative) - Visiting the cart page with nothing in it shows the
 * "Your Shopping Cart is empty!" message rather than a populated table,
 * the header badge shows no count, and there are no line items to check
 * out — checkout cannot meaningfully proceed on an empty cart.
 */
export async function TC28(page: Page) {
  await goToCartPage(page);

  expect(await isCartEmpty(page)).toBe(true);

  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames).toHaveLength(0);

  expect(await getCartQuantityBadge(page)).toBe(0);

  // Re-visiting the cart page directly (as if returning later) should
  // consistently show the same empty state, not stale cached content.
  await page.reload();
  expect(await isCartEmpty(page)).toBe(true);
}
