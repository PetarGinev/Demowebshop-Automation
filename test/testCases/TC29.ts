import { Page, expect } from '@playwright/test';
import { goToCategory, getCategoryProductNames, getBreadcrumbText } from '../helpers/product';

const CATEGORY_NAME = 'Books';

/**
 * TC29 (positive) - Navigating to a top-level category from the header
 * menu shows a non-empty list of products, all belonging to a page whose
 * breadcrumb confirms the correct category, and the page title matches
 * the clicked category name.
 */
export async function TC29(page: Page) {
  await goToCategory(page, CATEGORY_NAME);

  await expect(page).toHaveURL(/books/i);
  await expect(page.locator('.page-title h1')).toHaveText(CATEGORY_NAME);

  const productNames = await getCategoryProductNames(page);
  expect(productNames.length).toBeGreaterThan(0);

  const breadcrumb = await getBreadcrumbText(page);
  expect(breadcrumb).toContain(CATEGORY_NAME);
}
