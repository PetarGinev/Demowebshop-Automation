import { Page, expect } from '@playwright/test';
import { goToCategory, setCategoryPageSize, getCategoryProductNames, PRODUCT_ITEM } from '../helpers/product';

const CATEGORY_NAME = 'Books';

/**
 * TC32 (positive) - Changing the category page's "Display" (page size)
 * dropdown to a smaller value reduces the number of product tiles shown,
 * without changing which category is being viewed.
 */
export async function TC32(page: Page) {
  await goToCategory(page, CATEGORY_NAME);

  await setCategoryPageSize(page, '4');
  const namesForFour = await getCategoryProductNames(page);
  const countForFour = await page.locator(PRODUCT_ITEM).count();
  expect(countForFour).toBeLessThanOrEqual(4);
  expect(namesForFour.length).toBe(countForFour);

  await setCategoryPageSize(page, '8');
  await page.waitForLoadState('networkidle');
  const countForEight = await page.locator(PRODUCT_ITEM).count();
  expect(countForEight).toBeGreaterThanOrEqual(countForFour);

  await expect(page).toHaveURL(/books/i);
}
