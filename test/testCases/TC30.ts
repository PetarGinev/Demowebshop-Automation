import { Page, expect } from '@playwright/test';
import {
  goToCategory,
  openProductFromCategory,
  getProductDetailsName,
  getProductDetailsPrice,
  getCategoryProductNames,
} from '../helpers/product';

const CATEGORY_NAME = 'Books';

/**
 * TC30 (positive) - Opening any product from a category listing page
 * navigates to that exact product's detail page, showing a matching
 * title and a non-empty price, with an "Add to cart" control present.
 */
export async function TC30(page: Page) {
  await goToCategory(page, CATEGORY_NAME);

  const productNames = await getCategoryProductNames(page);
  expect(productNames.length).toBeGreaterThan(0);
  const firstProduct = productNames[0];

  await openProductFromCategory(page, firstProduct);

  const detailsName = await getProductDetailsName(page);
  expect(detailsName?.trim()).toBe(firstProduct.trim());

  const detailsPrice = await getProductDetailsPrice(page);
  expect(detailsPrice).toBeTruthy();

  await expect(page.locator('.add-to-cart-button')).toBeVisible();
}
