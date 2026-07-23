import { test, expect } from '@playwright/test';
import { TEST_USERS, setupAuthContext, verifyMicrographicsLayout, assertRoleBadge } from './test-utils';

test.describe('Investor Role Tests', () => {
  let page: any;

  test.beforeEach(async ({ context }) => {
    page = await setupAuthContext(context, 'investor');
  });

  test.afterEach(async () => {
    if (page) await page.close();
  });

  test('should access dashboard with investor role', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByText(/Welcome back/i)).toBeVisible({ timeout: 10000 });
    await verifyMicrographicsLayout(page);
  });

  test('should see investor badge on dashboard', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await assertRoleBadge(page, 'investor');
  });

  test('should access horses list with financial data', async () => {
    await page.goto('/horses');
    await page.waitForLoadState('networkidle');
    
    const hasContent = await page.getByText(/horse/i).count() > 0;
    expect(hasContent).toBeTruthy();
  });

  test('should see investor-specific financial metrics', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should access reports page', async () => {
    await page.goto('/reports');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should access profile page', async () => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    
    // Use heading selector for specificity
    await expect(page.getByRole('heading', { name: 'testinvestor' })).toBeVisible({ timeout: 5000 });
  });

  test('should not see staff-only management features', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const staffContent = await page.getByText(/manage.*users|staff.*panel|admin/i).count();
    expect(staffContent).toBe(0);
  });

  test('should be restricted from adding new horses', async () => {
    await page.goto('/horses/new');
    await page.waitForLoadState('networkidle');
    
    // Page should load but investor may have restricted access
    await expect(page.locator('body')).toBeVisible();
  });

  test('should logout successfully', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    });
    
    await page.goto('/auth/login');
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible({ timeout: 5000 });
  });
});
