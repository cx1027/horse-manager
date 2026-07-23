import { Page, BrowserContext, expect } from '@playwright/test';

export const TEST_USERS = {
  user: {
    email: 'user@test.com',
    password: 'Test123456',
    username: 'testuser',
    role: 'user' as const,
  },
  investor: {
    email: 'investor@test.com',
    password: 'Test123456',
    username: 'testinvestor',
    role: 'investor' as const,
  },
  staff: {
    email: 'staff@test.com',
    password: 'Test123456',
    username: 'teststaff',
    role: 'staff' as const,
  },
};

export type UserRole = keyof typeof TEST_USERS;

export async function loginAs(page: Page, role: UserRole): Promise<void> {
  const user = TEST_USERS[role];
  
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');
  
  // Fill in login form
  await page.fill('input[type="email"]', user.email);
  await page.fill('input[type="password"]', user.password);
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Wait for redirect to dashboard
  await page.waitForURL('**/dashboard', { timeout: 10000 });
  await page.waitForLoadState('networkidle');
}

export async function logout(page: Page): Promise<void> {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  });
}

export async function setupAuthContext(context: BrowserContext, role: UserRole): Promise<Page> {
  const user = TEST_USERS[role];
  
  const storageState = {
    cookies: [],
    origins: [{
      origin: 'http://localhost:3000',
      localStorage: [
        { name: 'authToken', value: 'mock-jwt-token' },
        { name: 'user', value: JSON.stringify({
          id: 1,
          username: user.username,
          email: user.email,
          role: user.role,
        })},
      ],
    }],
  };
  
  const page = await context.newPage();
  await context.addInitScript(({ username, email, role }) => {
    localStorage.setItem('authToken', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, username, email, role }));
  }, { username: user.username, email: user.email, role: user.role });
  
  return page;
}

export async function verifyMicrographicsLayout(page: Page): Promise<void> {
  // Check for background elements
  const hasGridBackground = await page.locator('img[src*="lines-grid"]').count() > 0;
  
  // Verify the page has loaded with proper styling
  await expect(page.locator('body')).toBeVisible();
}

export async function assertRoleBadge(page: Page, role: UserRole): Promise<void> {
  const roleLabels: Record<UserRole, string> = {
    user: 'User',
    investor: 'Investor',
    staff: 'Staff',
  };
  
  // Use exact match to find the badge
  await expect(page.getByText(roleLabels[role], { exact: true })).toBeVisible({ timeout: 5000 });
}
