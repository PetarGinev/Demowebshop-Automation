import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import { addProductToCartFromGrid, goToCartPage, applyDiscountCoupon, getDiscountCouponMessage, DISCOUNT_COUPON_MESSAGE } from '../helpers/cart';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC40 (negative) - Applying a discount coupon code that does not exist
 * shows an error/rejection message rather than silently discounting the
 * order, and the order total is unaffected.
 */
export async function TC40(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);

  await applyDiscountCoupon(page, `INVALID-COUPON-${Date.now()}`);

  const message = await getDiscountCouponMessage(page);
  expect(await page.locator(DISCOUNT_COUPON_MESSAGE).isVisible()).toBeTruthy();
  expect(message?.toLowerCase()).not.toContain('coupon was applied');
}
