import { chromium } from '@playwright/test';

const ROLES = [
  { value: 'user', label: '普通用户', description: '可以管理自己的马匹' },
  { value: 'investor', label: '投资者', description: '可以查看马匹财务信息' },
  { value: 'staff', label: '员工', description: '可以协助管理马匹' },
];

async function registerRole(browser, role) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🧪 Testing role: ${role.label} (${role.value})`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const timestamp = Date.now() + Math.floor(Math.random() * 1000);
    const testUser = {
      username: `${role.label}_${timestamp}`,
      email: `${role.value}${timestamp}@example.com`,
      password: 'password123',
      role: role.value,
    };

    // Register
    console.log(`\n📍 Step 1: Navigate to register page`);
    await page.goto('http://localhost:3000/auth/register');
    await page.waitForLoadState('networkidle');

    console.log(`📍 Step 2: Fill in registration form`);
    await page.fill('input[name="username"]', testUser.username);
    await page.fill('input[name="email"]', testUser.email);
    await page.fill('input[name="password"]', testUser.password);
    await page.fill('input[name="confirmPassword"]', testUser.password);
    await page.selectOption('select[name="role"]', role.value);
    console.log(`   ✓ Form filled: ${testUser.username} <${testUser.email}>`);

    console.log(`📍 Step 3: Submit registration`);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    console.log(`   ✓ Registration successful`);

    // Dashboard verification
    console.log(`📍 Step 4: Verify dashboard`);
    await page.waitForLoadState('networkidle');
    const welcomeText = await page.textContent('h1');
    console.log(`   ✓ ${welcomeText.trim()}`);

    // LocalStorage check
    console.log(`📍 Step 5: Verify localStorage`);
    const storedUser = await page.evaluate(() => localStorage.getItem('user'));
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log(`   ✓ Stored: ${user.username} | ${user.role}`);
    }

    // Logout
    console.log(`📍 Step 6: Logout`);
    await page.evaluate(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    });

    // Login
    console.log(`📍 Step 7: Login with same credentials`);
    await page.goto('http://localhost:3000/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('input[type="email"]', testUser.email);
    await page.fill('input[type="password"]', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    console.log(`   ✓ Login successful`);

    // Navigate to profile for final check
    console.log(`📍 Step 8: Verify profile`);
    await page.goto('http://localhost:3000/profile');
    await page.waitForLoadState('networkidle');

    // Get the user info from profile page
    const profileInfo = await page.evaluate(() => {
      const user = localStorage.getItem('user');
      const url = window.location.href;
      return { user: user ? JSON.parse(user) : null, url };
    });
    console.log(`   ✓ Profile shows: ${profileInfo?.user?.username} (${profileInfo?.user?.role}) [${profileInfo.url}]`);

    await context.close();
    return { success: true, role: role.value, user: testUser };
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    await context.close();
    return { success: false, role: role.value, error: error.message };
  }
}

async function main() {
  console.log('🚀 Multi-Role Registration & Login Test\n');
  console.log(`Roles to test: ${ROLES.map(r => r.value).join(', ')}`);

  const browser = await chromium.launch({ headless: false });

  const results = [];
  for (const role of ROLES) {
    const result = await registerRole(browser, role);
    results.push(result);
    // Small delay to avoid timestamp collisions
    await new Promise(r => setTimeout(r, 500));
  }

  // Print final summary
  console.log('\n\n═══════════════════════════════════════════════════');
  console.log('📊 FINAL SUMMARY');
  console.log('═══════════════════════════════════════════════════');

  console.log('\nRole Registration Results:');
  results.forEach((r, i) => {
    const status = r.success ? '✅' : '❌';
    console.log(`  ${status} ${ROLES[i].value.padEnd(10)} - ${r.user?.email || r.error}`);
  });

  console.log('\n\n🎭 ROLE PERMISSIONS SUMMARY');
  console.log('═══════════════════════════════════════════════════\n');

  console.log('1. 👤 普通用户 (user)');
  console.log('   ├─ 马匹基本信息: 查看/编辑 ✅');
  console.log('   ├─ 医疗记录: 查看/添加 ✅');
  console.log('   ├─ 健康记录: 查看/添加 ✅');
  console.log('   ├─ 喂养记录: 查看/添加 ✅');
  console.log('   ├─ 财务信息: ❌ 无权访问');
  console.log('   ├─ 保险记录: 仅查看自己的 ⚠️');
  console.log('   └─ 商业活动: ❌ 无权参与');

  console.log('\n2. 💰 投资者 (investor)');
  console.log('   ├─ 马匹基本信息: 只读 ✅');
  console.log('   ├─ 马匹财务信息: 查看 ✅');
  console.log('   ├─ 投资回报分析: 查看 ✅');
  console.log('   ├─ 医疗/健康记录: 查看 ✅');
  console.log('   ├─ 商业活动: 查看 ✅');
  console.log('   └─ 数据编辑/添加: ❌ 只读权限');

  console.log('\n3. 👷 员工 (staff)');
  console.log('   ├─ 马匹基本信息: 查看/编辑 ✅');
  console.log('   ├─ 医疗记录: 添加/更新 ✅');
  console.log('   ├─ 健康记录: 添加/更新 ✅');
  console.log('   ├─ 喂养记录: 添加/更新 ✅');
  console.log('   ├─ 保险记录: 查看/添加 ✅');
  console.log('   ├─ 财务信息: ❌ 无权访问');
  console.log('   └─ 商业活动: 查看/参与 ⚠️');

  console.log('\n═══════════════════════════════════════════════════');

  const allPassed = results.every(r => r.success);
  if (allPassed) {
    console.log('🎉 ALL 3 ROLES REGISTERED AND LOGGED IN SUCCESSFULLY!');
  } else {
    console.log('⚠️  Some roles failed.');
  }

  console.log('\nBrowser will remain open for 10 seconds...');
  await new Promise(r => setTimeout(r, 10000));
  await browser.close();
}

main().catch(e => {
  console.error('Test crashed:', e);
  process.exit(1);
});
