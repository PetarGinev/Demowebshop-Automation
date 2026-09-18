import { Page, Locator, expect } from '@playwright/test';
import { PRODUCT_DETAILS_CONTAINER, PRODUCT_DETAILS_ADD_TO_CART_BUTTON } from './product';

// Constants - selectors
export const CART_QTY_BADGE = '.cart-qty';
export const URL_CART = '/cart';
export const CART_ROW = '.cart-item-row';
export const CART_ITEM_NAME = '.cart-item-row .product-name';
export const QTY_INPUT = '.qty-input';
export const BTN_UPDATE_CART = 'input[name="updatecart"]';
export const REMOVE_CHECKBOX = '.remove-from-cart';
export const PRODUCT_SUBTOTAL = '.product-subtotal';
export const TERMS_CHECKBOX = '#termsofservice';
export const BTN_CHECKOUT = '#checkout';
export const EMPTY_CART_TEXT = 'Your Shopping Cart is empty!';
export const CART_TERMS_ERROR = '#terms-of-service-warning-box';
export const CART_TOTALS_SECTION = '.cart-total';
export const DISCOUNT_COUPON_INPUT = '.discount-coupon-code';
export const BTN_APPLY_DISCOUNT_COUPON = 'input[name="applydiscountcouponcode"]';
export const DISCOUNT_COUPON_MESSAGE = '.message';

// Category / product-list grid selectors
export const ITEM_BOX = '.item-box';
export const ITEM_BOX_TITLE = '.product-title a';
export const ADD_TO_CART_GRID_BUTTON = '.product-box-add-to-cart-button';
export const ADD_TO_CART_SUCCESS_NOTIFICATION = '.bar-notification.success';

/** Returns the item-box card locator for a given product name in a grid/list view. */
function getItemBox(page: Page, productName: string): Locator {
  return page.locator(ITEM_BOX).filter({ hasText: productName });
}

/** Adds a product to the cart directly from a category or search-results grid. */
export async function addProductToCartFromGrid(page: Page, productName: string) {
  const productDetails = page.locator(PRODUCT_DETAILS_CONTAINER);
  await getItemBox(page, productName).locator(ADD_TO_CART_GRID_BUTTON).click();
  await page.waitForLoadState("networkidle");

  if (await productDetails.count() > 0) {
    await page.locator(PRODUCT_DETAILS_ADD_TO_CART_BUTTON).click();
  }

  await expect(page.locator(ADD_TO_CART_SUCCESS_NOTIFICATION)).toBeVisible();
}

/** Returns the current cart badge count shown in the header, or 0 if not rendered. */
export async function getCartQuantityBadge(page: Page) {
  const badgeText = await page.locator(CART_QTY_BADGE).textContent();
  const match = badgeText?.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

/** Navigates to the shopping cart page. */
export async function goToCartPage(page: Page) {
  await page.goto(URL_CART);
}

/** Returns the product names currently listed on the cart page. */
export async function getCartItemNames(page: Page) {
  return page.locator(CART_ITEM_NAME).allTextContents();
}

/** Returns the cart row locator for a given product name. */
function getCartRow(page: Page, productName: string): Locator {
  return page.locator(CART_ROW).filter({ hasText: productName });
}

/** Sets a new quantity for a cart line item and clicks "Update shopping cart". */
export async function updateCartItemQuantity(page: Page, productName: string, quantity: number | string) {
  await getCartRow(page, productName).locator(QTY_INPUT).fill(String(quantity));
  await page.locator(BTN_UPDATE_CART).click();
}

/** Returns the current numeric value of a cart line item's quantity input. */
export async function getCartItemQuantityValue(page: Page, productName: string) {
  let value = 0;

  if (await page.locator(CART_ROW).first().isVisible()) {
    value = Number(await getCartRow(page, productName).locator(QTY_INPUT).inputValue());
  }
  
  return value;
}

/** Returns the subtotal text for a given product's cart line item. */
export async function getCartItemSubtotal(page: Page, productName: string) {
  return getCartRow(page, productName).locator(PRODUCT_SUBTOTAL).textContent();
}

/** Checks the "remove" checkbox for a product and clicks "Update shopping cart" to remove it. */
export async function removeCartItem(page: Page, productName: string) {
  await getCartRow(page, productName).locator(`${REMOVE_CHECKBOX} input`).check();
  await page.locator(BTN_UPDATE_CART).click();
}

/** Returns true if the cart page is showing the "empty cart" message. */
export async function isCartEmpty(page: Page) {
  return page.getByText(EMPTY_CART_TEXT).isVisible();
}

/** Checks the Terms of Service checkbox on the cart page. */
export async function acceptTermsOfService(page: Page) {
  await page.locator(TERMS_CHECKBOX).check();
}

/** Clicks the "Checkout" button on the cart page. */
export async function clickCheckout(page: Page) {
  await page.locator(BTN_CHECKOUT).click();
}

/** Returns a cart line item's subtotal as a plain number (strips currency symbols). */
export async function getCartItemSubtotalValue(page: Page, productName: string) {
  const text = await getCartItemSubtotal(page, productName);
  const match = text?.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : NaN;
}

/** Returns the raw text of the whole totals section (Sub-Total / Shipping / Total rows). */
export async function getOrderTotalsText(page: Page) {
  return page.locator(CART_TOTALS_SECTION).innerText();
}

/** Extracts the grand total as a plain number from the totals section text. */
export async function getOrderTotalValue(page: Page) {
  const totalsText = await getOrderTotalsText(page);
  const totalLine = totalsText
    .split('\n')
    .find((line) => /^total\b/i.test(line.trim()));
  const match = totalLine?.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : NaN;
}

/** Fills in a discount coupon code and clicks "Apply coupon". */
export async function applyDiscountCoupon(page: Page, code: string) {
  await page.locator(DISCOUNT_COUPON_INPUT).fill(code);
  await page.locator(BTN_APPLY_DISCOUNT_COUPON).click();
}

/** Returns the message shown after attempting to apply a discount coupon. */
export async function getDiscountCouponMessage(page: Page) {
  return page.locator(DISCOUNT_COUPON_MESSAGE).first().textContent();
}
