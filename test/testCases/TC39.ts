import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import {
  addProductToCartFromGrid,
  goToCartPage,
  getCartItemSubtotalValue,
  getOrderTotalsText,
} from '../helpers/cart';

const PRODUCT_ONE = '14.1-inch Laptop';
const PRODUCT_TWO = 'Build your own expensive computer';

/**
 * TC39 (positive) - Adding two different products to the cart produces
 * per-line subtotals that are both individually positive, and the cart's
 * overall totals section renders a "Sub-Total" line whose value is at
 * least as large as the sum of the two visible line subtotals (shipping/
 * tax may add to it, so it should never be smaller).
 */
export async function TC39(page: Page) {
  await page.goto('/');
  await searchForProduct(page, PRODUCT_ONE);
  await addProductToCartFromGrid(page, PRODUCT_ONE);

  await page.goto('/');
  await searchForProduct(page, PRODUCT_TWO);
  await addProductToCartFromGrid(page, PRODUCT_TWO);

  await goToCartPage(page);

  const subtotalOne = await getCartItemSubtotalValue(page, PRODUCT_ONE);
  const subtotalTwo = await getCartItemSubtotalValue(page, PRODUCT_TWO);
  expect(subtotalOne).toBeGreaterThan(0);
  expect(subtotalTwo).toBeGreaterThan(0);

  const totalsText = await getOrderTotalsText(page);
  const subTotalLine = totalsText.split('\n').find((line) => /sub-total/i.test(line));
  expect(subTotalLine).toBeTruthy();

  const subTotalValueMatch = subTotalLine?.replace(/,/g, '').match(/[\d.]+/);
  const subTotalValue = subTotalValueMatch ? parseFloat(subTotalValueMatch[0]) : NaN;
  expect(subTotalValue).toBeGreaterThanOrEqual(subtotalOne + subtotalTwo - 0.01);
}
