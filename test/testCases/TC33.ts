import { Page, expect } from '@playwright/test';
import {
  goToCategory,
  openProductFromCategory,
  setProductQuantity,
  addToCartFromDetailsPage,
  getAddToCartWarning,
  PRODUCT_NAME_FICTION
} from '../helpers/product';
import { getCartQuantityBadge } from '../helpers/cart';

const CATEGORY_NAME = 'Books';

/**
 * TC33 (negative) - Setting a quantity of 0 on a product's details page
 * and clicking "Add to cart" is rejected: the product is not added to
 * the cart (badge count stays unchanged) and a validation/warning
 * message is shown instead.
 */
export async function TC33(page: Page) {
  await goToCategory(page, CATEGORY_NAME);
  await openProductFromCategory(page, PRODUCT_NAME_FICTION);

  const badgeBefore = await getCartQuantityBadge(page);

  await setProductQuantity(page, 0);
  await addToCartFromDetailsPage(page);

  const badgeAfter = await getCartQuantityBadge(page);
  expect(badgeAfter).toBe(badgeBefore);

  const warning = await getAddToCartWarning(page);
  expect(warning).toContain('Quantity should be positive'.trim());
}
