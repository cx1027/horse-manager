import { test, expect } from '@playwright/test';
import { TEST_USERS, setupAuthContext, verifyMicrographicsLayout, assertRoleBadge } from './test-utils';

test.describe('Regular User Role Tests', () => {
  let page: any;

  test.beforeEach(async ({ context }) => {
    page = await setupAuthContext(context, 'user');
  });

  test.afterEach(async () => {
    if (page) await page.close();
  });

  test('should access dashboard with user role', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByText(/Welcome back/i)).toBeVisible({ timeout: 10000 });
    await verifyMicrographicsLayout(page);
  });

  test('should see user badge on dashboard', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await assertRoleBadge(page, 'user');
  });

  test('should access horses list', async () => {
    await page.goto('/horses');
    await page.waitForLoadState('networkidle');
    
    const hasContent = await page.getByText(/horse/i).count() > 0;
    expect(hasContent).toBeTruthy();
  });

  test('should access add horse form', async () => {
    await page.goto('/horses/new');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByRole('heading', { name: /Add Horse/i })).toBeVisible({ timeout: 5000 });
  });

  test('should access health page', async () => {
    await page.goto('/health');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should access profile page', async () => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    
    // Use heading selector for specificity
    await expect(page.getByRole('heading', { name: 'testuser' })).toBeVisible({ timeout: 5000 });
  });

  test('should not see investor-only financial data', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const financialContent = await page.getByText(/investment|roi|financial/i).count();
    expect(financialContent).toBe(0);
  });

  test('should not see staff-only management features', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const staffContent = await page.getByText(/manage.*users|staff.*panel|admin/i).count();
    expect(staffContent).toBe(0);
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
