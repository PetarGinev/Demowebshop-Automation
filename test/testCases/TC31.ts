import { Page, expect } from '@playwright/test';
import { goToCategory, sortCategoryProductsBy, getCategoryProductPrices } from '../helpers/product';

const CATEGORY_NAME = 'Books';

/**
 * TC31 (positive) - Sorting a category's products by "Price: Low to
 * High" and then by "Price: High to Low" reorders the listed products
 * into ascending, then descending, price order respectively.
 */
export async function TC31(page: Page) {
  await goToCategory(page, CATEGORY_NAME);

  await sortCategoryProductsBy(page, 'Price: Low to High');
  const ascendingPrices = await getCategoryProductPrices(page);
  expect(ascendingPrices).toEqual([...ascendingPrices].sort((a, b) => a - b));

  await sortCategoryProductsBy(page, 'Price: High to Low');
  const descendingPrices = await getCategoryProductPrices(page);
  expect(descendingPrices).toEqual([...descendingPrices].sort((a, b) => b - a));
}
