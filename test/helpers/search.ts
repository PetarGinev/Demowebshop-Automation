import { Page } from '@playwright/test';

// Constants - selectors (header quick-search box)
export const ID_SEARCH_BOX = '#small-searchterms';
export const BTN_SEARCH = 'input.search-box-button';
export const SEARCH_PAGE_TITLE = '.page-title h1';
export const PRODUCT_ITEM = '.product-item';
export const PRODUCT_ITEM_TITLE = '.product-title a';
export const NO_RESULTS_TEXT = 'No products were found that matched your criteria';

// Constants - the dedicated /search page (supports advanced/category search)
export const URL_SEARCH_PAGE = '/search';
export const SEARCH_PAGE_TERM_INPUT = '#q';
export const ADVANCED_SEARCH_CHECKBOX = '#chk_advanced_search';
export const CATEGORY_FILTER_DROPDOWN = '#CategoryId';
export const BTN_SEARCH_PAGE_SUBMIT = 'input.search-button';

/** Types a term into the header search box and submits it. */
export async function searchForProduct(page: Page, term: string) {
  await page.locator(ID_SEARCH_BOX).fill(term);
  await page.locator(BTN_SEARCH).click();
}

/** Returns the product names shown on the search results page. */
export async function getSearchResultTitles(page: Page) {
  return page.locator(PRODUCT_ITEM_TITLE).allTextContents();
}

/** Returns how many product results were returned. */
export async function getSearchResultCount(page: Page) {
  return page.locator(PRODUCT_ITEM).count();
}

/** Navigates directly to the dedicated search page (supports advanced search options). */
export async function goToSearchPage(page: Page) {
  await page.goto(URL_SEARCH_PAGE);
}

/**
 * Performs a search from the /search page with the "Advanced search"
 * category filter enabled, restricting results to a single category.
 */
export async function searchWithCategoryFilter(page: Page, term: string, categoryLabel: string) {
  await goToSearchPage(page);
  await page.locator(SEARCH_PAGE_TERM_INPUT).fill(term);
  await page.locator(ADVANCED_SEARCH_CHECKBOX).check();
  await page.locator(CATEGORY_FILTER_DROPDOWN).selectOption({ label: categoryLabel });
  await page.locator(BTN_SEARCH_PAGE_SUBMIT).click();
}
