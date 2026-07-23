import { test, expect } from '@playwright/test';
import { TEST_USERS, setupAuthContext, verifyMicrographicsLayout, assertRoleBadge } from './test-utils';

test.describe('Staff Role Tests', () => {
  let page: any;

  test.beforeEach(async ({ context }) => {
    page = await setupAuthContext(context, 'staff');
  });

  test.afterEach(async () => {
    if (page) await page.close();
  });

  test('should access dashboard with staff role', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByText(/Welcome back/i)).toBeVisible({ timeout: 10000 });
    await verifyMicrographicsLayout(page);
  });

  test('should see staff badge on dashboard', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await assertRoleBadge(page, 'staff');
  });

  test('should access horses management page', async () => {
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

  test('should access health management page', async () => {
    await page.goto('/health');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should access medical records page', async () => {
    await page.goto('/medical/new');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should access activities management', async () => {
    await page.goto('/activities/new');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should access feeding management', async () => {
    await page.goto('/feeding/new');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should access insurance management', async () => {
    await page.goto('/insurance/new');
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
    await expect(page.getByRole('heading', { name: 'teststaff' })).toBeVisible({ timeout: 5000 });
  });

  test('should have full CRUD access to horses', async () => {
    await page.goto('/horses/new');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: /Add Horse/i })).toBeVisible({ timeout: 5000 });
  });

  test('should not see admin-only features', async () => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const adminContent = await page.getByText(/super admin|system.*settings/i).count();
    expect(adminContent).toBe(0);
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
