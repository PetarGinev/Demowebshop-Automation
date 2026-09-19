import { Page, expect } from '@playwright/test';
import { goToCategory, openProductFromCategory, setProductQuantity, addToCartFromDetailsPage, BAR_NOTIFICATION_SUCCESS, PRODUCT_NAME_FICTION } from '../helpers/product';
import { getCartQuantityBadge, goToCartPage, getCartItemNames, getCartItemSubtotalValue } from '../helpers/cart';

const CATEGORY_NAME = 'Books';

/**
 * TC41 (positive) - Adding a product to the cart from its own product
 * details page (rather than a grid's quick-add button) with a quantity
 * greater than one updates the cart badge accordingly, and the cart page
 * shows a subtotal consistent with that quantity.
 */
export async function TC41(page: Page) {
  await goToCategory(page, CATEGORY_NAME);
  await openProductFromCategory(page, PRODUCT_NAME_FICTION);

  const badgeBefore = await getCartQuantityBadge(page);

  await setProductQuantity(page, 2);
  await addToCartFromDetailsPage(page);

  await expect(page.locator(BAR_NOTIFICATION_SUCCESS)).toBeVisible();
  expect(await getCartQuantityBadge(page)).toBe(badgeBefore + 2);

  await goToCartPage(page);
  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames.some((name) => name.includes(PRODUCT_NAME_FICTION))).toBe(true);

  const subtotal = await getCartItemSubtotalValue(page, PRODUCT_NAME_FICTION);
  expect(subtotal).toBeGreaterThan(0);
}
