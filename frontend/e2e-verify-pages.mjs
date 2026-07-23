import { chromium } from '@playwright/test';

const PAGES = [
  { url: 'http://localhost:3000/horses/1/edit', name: 'Edit Horse', expect: ['编辑马匹', '基本信息'] },
  { url: 'http://localhost:3000/horses/1/medical', name: 'Horse Medical', expect: ['医疗记录'] },
  { url: 'http://localhost:3000/medical/new', name: 'New Medical', expect: ['新增医疗记录', '医疗记录详情'] },
  { url: 'http://localhost:3000/health/new', name: 'New Health', expect: ['新增健康数据', '健康测量数据'] },
  { url: 'http://localhost:3000/feeding/new', name: 'New Feeding', expect: ['新增喂养记录', '喂养详情'] },
  { url: 'http://localhost:3000/activities/new', name: 'New Activity', expect: ['新增商业活动', '活动信息'] },
  { url: 'http://localhost:3000/insurance/new', name: 'New Insurance', expect: ['新增保险', '保单信息'] },
  { url: 'http://localhost:3000/reports', name: 'Reports', expect: ['报告中心'] },
];

async function main() {
  console.log('🚀 Page Render Verification\n');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const results = [];
  for (const p of PAGES) {
    const page = await context.newPage();
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 15000 });
      const body = await page.textContent('body');
      const found = p.expect.every((kw) => body?.includes(kw));
      const h1 = await page.textContent('h1').catch(() => '');
      results.push({ name: p.name, url: p.url, ok: found, h1: h1?.trim() });
      console.log(`${found ? '✅' : '❌'} ${p.name.padEnd(20)} — ${h1?.trim()}`);
    } catch (err) {
      results.push({ name: p.name, url: p.url, ok: false, error: err.message });
      console.log(`❌ ${p.name.padEnd(20)} — ${err.message.split('\n')[0]}`);
    }
    await page.close();
  }

  await browser.close();

  console.log('\n══════════════════════════════════════════════');
  const passed = results.filter((r) => r.ok).length;
  console.log(`📊 ${passed}/${results.length} pages rendered correctly`);
  console.log('══════════════════════════════════════════════');

  if (passed !== results.length) process.exit(1);
}

main().catch((e) => {
  console.error('Crashed:', e);
  process.exit(1);
});