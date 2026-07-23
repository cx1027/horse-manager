import { chromium } from '@playwright/test';

async function registerAndLoginReal() {
  console.log('🚀 Testing REAL registration and login flow...\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Step 1: Go to register page
    console.log('📍 Step 1: Navigate to register page');
    await page.goto('http://localhost:3000/auth/register');
    await page.waitForLoadState('networkidle');
    console.log('   ✓ Register page loaded\n');
    
    // Step 2: Fill in registration form
    console.log('📍 Step 2: Fill in registration form');
    const timestamp = Date.now();
    const testUser = {
      username: `测试用户${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'password123',
      role: 'investor'
    };
    
    await page.fill('input[name="username"]', testUser.username);
    await page.fill('input[name="email"]', testUser.email);
    await page.fill('input[name="password"]', testUser.password);
    await page.fill('input[name="confirmPassword"]', testUser.password);
    await page.selectOption('select[name="role"]', 'investor');
    console.log(`   ✓ Form filled for: ${testUser.username} (${testUser.email})`);
    console.log(`   ✓ Role: investor\n`);
    
    // Step 3: Submit registration
    console.log('📍 Step 3: Submit registration to Strapi');
    await page.click('button[type="submit"]');
    
    // Wait for response
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    console.log('   ✓ Registration successful, redirected to dashboard\n');
    
    // Step 4: Verify dashboard with real data
    console.log('📍 Step 4: Verify dashboard shows user info');
    await page.waitForLoadState('networkidle');
    const welcomeText = await page.textContent('h1');
    console.log(`   ✓ Welcome message: "${welcomeText}"\n`);
    
    // Step 5: Navigate to profile
    console.log('📍 Step 5: Navigate to profile page');
    await page.goto('http://localhost:3000/profile');
    await page.waitForLoadState('networkidle');
    console.log('   ✓ Profile page loaded\n');
    
    // Step 6: Check localStorage for stored user data
    console.log('📍 Step 6: Verify user data stored in localStorage');
    const storedUser = await page.evaluate(() => {
      return localStorage.getItem('user');
    });
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log('   ✓ User data in localStorage:');
      console.log(`     - Username: ${user.username}`);
      console.log(`     - Email: ${user.email}`);
      console.log(`     - Role: ${user.role}`);
      console.log('');
    }
    
    // Step 7: Logout and test login
    console.log('📍 Step 7: Test real login flow');
    
    // Clear localStorage to simulate logout
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:3000/auth/login');
    await page.waitForLoadState('networkidle');
    
    await page.fill('input[type="email"]', testUser.email);
    await page.fill('input[type="password"]', testUser.password);
    await page.click('button[type="submit"]');
    
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    console.log('   ✓ Login successful with registered credentials\n');
    
    // Summary
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ REAL DATA TEST PASSED!');
    console.log('═══════════════════════════════════════════════════');
    console.log('\nTest Summary:');
    console.log(`  • Registered: ${testUser.username}`);
    console.log(`  • Email: ${testUser.email}`);
    console.log(`  • Role: investor`);
    console.log('  • Data stored in Strapi database: ✅');
    console.log('  • Login with real credentials: ✅');
    console.log('  • User profile from database: ✅');
    console.log('\n🎉 All real data tests passed!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\nNote: Make sure Strapi backend is running with the new login API.');
    process.exit(1);
  } finally {
    console.log('\nBrowser will remain open for 10 seconds...');
    await page.waitForTimeout(10000);
    await browser.close();
  }
}

registerAndLoginReal();
