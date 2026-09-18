import { test } from '@playwright/test';
import { TC29 } from './testCases/TC29';
import { TC30 } from './testCases/TC30';
import { TC31 } from './testCases/TC31';
import { TC32 } from './testCases/TC32';
import { TC33 } from './testCases/TC33';
import { TC41 } from './testCases/TC41';
import { TC55 } from './testCases/TC55';
import { TC56 } from './testCases/TC56';

test.describe('Category & Product Pages', () => {
  test('TC29 - Navigating to a category shows its products and breadcrumb', async ({ page }) => { await TC29(page); });
  test('TC30 - Opening a product from a category page shows matching details', async ({ page }) => { await TC30(page); });
  test('TC31 - Sorting by price (low-high / high-low) reorders category products', async ({ page }) => { await TC31(page); });
  test('TC32 - Changing the page size changes the number of visible products', async ({ page }) => { await TC32(page); });
  test('TC33 - Adding a product with quantity 0 is rejected with a warning', async ({ page }) => { await TC33(page); });
  test('TC41 - Adding a product from its own details page with quantity 2', async ({ page }) => { await TC41(page); });
  test('TC55 - Breadcrumb link on a product page navigates back to its category', async ({ page }) => { await TC55(page); });
  test('TC56 - A nonexistent product URL is handled gracefully', async ({ page }) => { await TC56(page); });
});
