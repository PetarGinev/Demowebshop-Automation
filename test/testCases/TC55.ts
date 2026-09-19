import { Page, expect } from '@playwright/test';
import { goToCategory, openProductFromCategory, clickBreadcrumbLink, CATEGORY_PAGE_TITLE, PRODUCT_NAME_FICTION } from '../helpers/product';

const CATEGORY_NAME = 'Books';

/**
 * TC55 (positive) - From a product's details page, clicking the
 * category's breadcrumb link navigates back to that category's listing
 * page, confirming the breadcrumb trail stays accurate through
 * navigation rather than just being decorative text.
 */
export async function TC55(page: Page) {
  await goToCategory(page, CATEGORY_NAME);
  await openProductFromCategory(page, PRODUCT_NAME_FICTION);

  await clickBreadcrumbLink(page, CATEGORY_NAME);

  await expect(page).toHaveURL(/books/i);
  await expect(page.locator(CATEGORY_PAGE_TITLE)).toHaveText(CATEGORY_NAME);
}
