import { Page, expect } from '@playwright/test';
import { searchForProduct } from '../helpers/search';
import {
  addProductToCartFromGrid,
  goToCartPage,
  clickCheckout,
  acceptTermsOfService,
  CART_TERMS_ERROR,
} from '../helpers/cart';

const PRODUCT_NAME = '14.1-inch Laptop';

/**
 * TC19 (negative then positive) - Attempting to check out without
 * accepting the "Terms of Service" checkbox is blocked, with the user
 * kept on the cart page and shown a validation warning; checking the box
 * afterwards and retrying then allows checkout to proceed as expected.
 */
export async function TC19(page: Page) {
  await page.goto('/');
  await searchForProduct(page, 'laptop');
  await addProductToCartFromGrid(page, PRODUCT_NAME);
  await goToCartPage(page);

  // Deliberately skip acceptTermsOfService(page) here.
  await clickCheckout(page);

  await expect(page).toHaveURL(/cart/);
  await expect(page.locator(CART_TERMS_ERROR)).toBeVisible();

  // Now accept the terms and retry: checkout should be allowed to proceed.
  await acceptTermsOfService(page);
  await clickCheckout(page);

  await expect(page).not.toHaveURL(/\/cart$/);
}
