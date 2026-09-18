import { Page, expect } from '@playwright/test';

// Constants - selectors
export const BTN_CHECKOUT_AS_GUEST = 'input[class*="checkout-as-guest-button"]';

// Billing address step
export const BILLING_FIRST_NAME = '#BillingNewAddress_FirstName';
export const BILLING_LAST_NAME = '#BillingNewAddress_LastName';
export const BILLING_EMAIL = '#BillingNewAddress_Email';
export const BILLING_COUNTRY = '#BillingNewAddress_CountryId';
export const BILLING_CITY = '#BillingNewAddress_City';
export const BILLING_ADDRESS1 = '#BillingNewAddress_Address1';
export const BILLING_ZIP = '#BillingNewAddress_ZipPostalCode';
export const BILLING_PHONE = '#BillingNewAddress_PhoneNumber';
export const BTN_BILLING_CONTINUE = '#billing-buttons-container .new-address-next-step-button';

// Shipping address / shipping method / payment steps
export const BTN_SHIPPING_CONTINUE = '#shipping-buttons-container .new-address-next-step-button';
export const BTN_SHIPPING_METHOD_CONTINUE = '#shipping-method-buttons-container .shipping-method-next-step-button';
export const BTN_PAYMENT_METHOD_CONTINUE = '#payment-method-buttons-container .payment-method-next-step-button';
export const BTN_PAYMENT_INFO_CONTINUE = '#payment-info-buttons-container .payment-info-next-step-button';
export const BTN_CONFIRM_ORDER = '#confirm-order-buttons-container .confirm-order-next-step-button';

// Confirmation page
export const ORDER_COMPLETED_TITLE = '.section.order-completed .title';
export const ORDER_COMPLETED_DETAILS = '.section.order-completed .details li';

// Validation
export const FIELD_VALIDATION_ERROR = '.field-validation-error';

export interface BillingAddressInfo {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address1: string;
  zipPostalCode: string;
  phoneNumber: string;
}

export const EXISTING_ADDRESS_SELECT = '#billing-address-select';

/**
 * Handles the billing address step for a logged-in user, who may be shown
 * a dropdown of previously-saved addresses (with a "New Address" option)
 * instead of jumping straight to the guest checkout's blank form. Falls
 * back to the plain new-address form if no such dropdown is present.
 */
export async function selectOrFillBillingAddress(page: Page, billing: BillingAddressInfo) {
  
  const existingAddressSelect = page.locator(EXISTING_ADDRESS_SELECT);
  await existingAddressSelect.waitFor({ state: 'visible' });

  if ((await existingAddressSelect.count()) > 0) {
    const hasNewAddressOption = (await existingAddressSelect.locator('option', { hasText: 'New Address' }).count()) > 0;
    if (hasNewAddressOption) {
      await existingAddressSelect.selectOption({ label: 'New Address' });
    }
  }

  await fillBillingAddress(page, billing);
}

/** Clicks "Checkout" on the cart page's guest checkout button, for unauthenticated users. */
export async function startGuestCheckout(page: Page) {
  await page.pause()
  await page.locator(BTN_CHECKOUT_AS_GUEST).click();
}

/** Fills in the billing address form. Leave a field as '' to test validation. */
export async function fillBillingAddress(page: Page, info: BillingAddressInfo) {
  await page.locator(BILLING_FIRST_NAME).fill(info.firstName);
  await page.locator(BILLING_LAST_NAME).fill(info.lastName);
  await page.locator(BILLING_EMAIL).fill(info.email);
  if (info.country) {
    await page.locator(BILLING_COUNTRY).selectOption({ label: info.country });
  }
  await page.locator(BILLING_CITY).fill(info.city);
  await page.locator(BILLING_ADDRESS1).fill(info.address1);
  await page.locator(BILLING_ZIP).fill(info.zipPostalCode);
  await page.locator(BILLING_PHONE).fill(info.phoneNumber);
}

/** Clicks "Continue" on the billing address step. */
export async function continueFromBillingAddress(page: Page) {
  await page.locator(BTN_BILLING_CONTINUE).click();
}

/** Clicks "Continue" on the shipping address step (defaults to "same as billing"). */
export async function continueFromShippingAddress(page: Page) {
  await page.locator(BTN_SHIPPING_CONTINUE).click();
}

/** Clicks "Continue" on the shipping method step, accepting the pre-selected method. */
export async function continueFromShippingMethod(page: Page) {
  await page.locator(BTN_SHIPPING_METHOD_CONTINUE).click();
}

/** Selects a payment method (radio button, matched by its visible label) and continues. */
export async function selectPaymentMethod(page: Page, methodLabel = 'Cash On Delivery') {
  await page.getByLabel(methodLabel).check();
  await page.locator(BTN_PAYMENT_METHOD_CONTINUE).click();
}

/** Continues past the payment info step (no extra fields for methods like Cash On Delivery). */
export async function continueFromPaymentInfo(page: Page) {
  await page.locator(BTN_PAYMENT_INFO_CONTINUE).click();
}

/** Clicks "Confirm" on the final order review step and waits for the confirmation page. */
export async function confirmOrder(page: Page) {
  await page.locator(BTN_CONFIRM_ORDER).click();
  await expect(page.locator(ORDER_COMPLETED_TITLE)).toBeVisible();
}

/** Returns the confirmation message shown after a successfully completed order. */
export async function getOrderCompletedMessage(page: Page) {
  return page.locator(ORDER_COMPLETED_TITLE).textContent();
}

/** Returns the order number line shown on the confirmation page. */
export async function getOrderNumberText(page: Page) {
  const detailLines = await page.locator(ORDER_COMPLETED_DETAILS).allTextContents();
  return detailLines.find((line) => line.includes('Order number')) ?? null;
}

/** Runs the full guest checkout happy path from the cart page through to order confirmation. */
export async function completeGuestCheckout(page: Page, billing: BillingAddressInfo, paymentMethodLabel = 'Cash On Delivery') {
  await startGuestCheckout(page);
  await fillBillingAddress(page, billing);
  await continueFromBillingAddress(page);
  await continueFromShippingAddress(page);
  await continueFromShippingMethod(page);
  await selectPaymentMethod(page, paymentMethodLabel);
  await continueFromPaymentInfo(page);
  await confirmOrder(page);
}
