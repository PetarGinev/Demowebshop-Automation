import { Page, Locator, expect } from '@playwright/test';

// Constants - selectors
export const TOP_MENU_LINK = '.top-menu a';
export const CATEGORY_PAGE_TITLE = '.page-title h1';
export const BREADCRUMB = '.breadcrumb';
export const PRODUCT_ITEM = '.product-item';
export const PRODUCT_ITEM_TITLE = '.product-title a';
export const PRODUCT_ITEM_PRICE = '.product-item .price.actual-price';
export const SORT_DROPDOWN = '#products-orderby';
export const PAGE_SIZE_DROPDOWN = '#products-pagesize';

export const PRODUCT_DETAILS_NAME = '.product-name h1';
export const PRODUCT_DETAILS_PRICE = '.product-price';
export const PRODUCT_DETAILS_QTY_INPUT = '.add-to-cart .qty-input';
export const PRODUCT_DETAILS_ADD_TO_CART_BUTTON = '.add-to-cart-button';
export const ADD_TO_CART_WARNING = '#bar-notification';
export const BAR_NOTIFICATION_SUCCESS = '.bar-notification.success';
export const PRODUCT_DETAILS_CONTAINER = 'div[class*="product-details-page"]';

export const PRODUCT_NAME_FICTION = 'Fiction';
export const PRODUCT_NAME_LAPTOP = '14.1-inch Laptop';
export const PRODUCT_SEARCH_LAPTOP = 'laptop';

/** Navigates home, then clicks a top-level category link by its visible name (e.g. "Books"). */
export async function goToCategory(page: Page, categoryName: string) {
  await page.goto('/');
  await page.locator(TOP_MENU_LINK).filter({ hasText: categoryName }).first().click();
  await expect(page.locator(CATEGORY_PAGE_TITLE)).toBeVisible();
}

/** Returns all product names currently shown on a category or search-results page. */
export async function getCategoryProductNames(page: Page) {
  await page.locator(PRODUCT_ITEM_TITLE).first().waitFor({ state: 'visible' });
  return page.locator(PRODUCT_ITEM_TITLE).allTextContents();
}

/** Returns all product prices (as numbers) currently shown on a category page. */
export async function getCategoryProductPrices(page: Page) {
  await page.locator(PRODUCT_ITEM_PRICE).first().waitFor({ state: 'visible' });
  const priceTexts = await page.locator(PRODUCT_ITEM_PRICE).allTextContents();
  return priceTexts
    .map((text) => text.replace(/,/g, '').match(/[\d.]+/)?.[0])
    .filter((v): v is string => Boolean(v))
    .map(Number);
}

/** Selects a sort option from the category page's "Sort by" dropdown, matched by visible label. */
export async function sortCategoryProductsBy(page: Page, optionLabel: string) {
  await page.locator(SORT_DROPDOWN).selectOption({ label: optionLabel });
}

/** Selects a page size from the category page's "Display" dropdown, matched by visible label. */
export async function setCategoryPageSize(page: Page, optionLabel: string) {
  await page.locator(PAGE_SIZE_DROPDOWN).selectOption({ label: optionLabel });
}

/** Returns the visible breadcrumb trail text (e.g. "Home / Books"). */
export async function getBreadcrumbText(page: Page) {
  return page.locator(BREADCRUMB).textContent();
}

/** Clicks a link within the breadcrumb trail matching the given visible text. */
export async function clickBreadcrumbLink(page: Page, linkText: string) {
  await page.locator(BREADCRUMB).getByRole('link', { name: linkText }).click();
}

/** Returns the product-item card locator for a given product name in a listing view. */
function getProductItem(page: Page, productName: string): Locator {
  return page.locator(PRODUCT_ITEM).filter({ hasText: productName });
}

/** Clicks a product's title on a category/search listing page, opening its details page. */
export async function openProductFromCategory(page: Page, productName: string) {
  await getProductItem(page, productName).locator(PRODUCT_ITEM_TITLE).first().click();
  await expect(page.locator(PRODUCT_DETAILS_NAME)).toBeVisible();
}

/** Returns the product title shown on the product details page. */
export async function getProductDetailsName(page: Page) {
  return page.locator(PRODUCT_DETAILS_NAME).textContent();
}

/** Returns the price text shown on the product details page. */
export async function getProductDetailsPrice(page: Page) {
  return page.locator(PRODUCT_DETAILS_PRICE).first().textContent();
}

/** Sets the quantity field on a product's details page (the "Add to cart" quantity box). */
export async function setProductQuantity(page: Page, quantity: number | string) {
  await page.locator(PRODUCT_DETAILS_QTY_INPUT).fill(String(quantity));
}

/** Clicks "Add to cart" on the product's own details page. */
export async function addToCartFromDetailsPage(page: Page) {
  await page.locator(PRODUCT_DETAILS_ADD_TO_CART_BUTTON).click();
}

/** Returns any add-to-cart validation/warning message shown on the product details page. */
export async function getAddToCartWarning(page: Page) {
  await expect(page.locator(ADD_TO_CART_WARNING)).toBeVisible();
  return page.locator(ADD_TO_CART_WARNING).textContent();
}
