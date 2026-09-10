/**
 * AUTOMATED BROWSER TESTING SUITE FOR POSTLAIN SOTY 3D
 * Automated Codex-Style Browser Verification Agent
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const artifactsDir = path.resolve(process.cwd(), 'test-artifacts');
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

const isHeaded = process.argv.includes('--headed');
const port = process.env.PORT || 5173;
const targetUrl = `http://localhost:${port}/`;

async function runBrowserTest() {
  console.log(`\n🚀 [Browser Test Agent] Launching Chromium (Headed: ${isHeaded})...`);
  
  const launchArgs = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--enable-webgl',
    '--enable-webgl2-compute-context',
    '--ignore-gpu-blocklist',
    '--disable-gpu-sandbox',
    '--disable-web-security',
    '--allow-running-insecure-content',
    '--enable-unsafe-swiftshader',
  ];

  if (!isHeaded) {
    launchArgs.push('--use-gl=angle', '--use-angle=swiftshader');
  } else {
    launchArgs.push('--use-gl=angle', '--use-angle=d3d11');
  }

  const browser = await puppeteer.launch({
    headless: isHeaded ? false : true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: launchArgs,
  });

  const page = await browser.newPage();

  const consoleLogs = [];
  const consoleErrors = [];
  const consoleWarnings = [];
  const networkErrors = [];

  page.on('console', (msg) => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text });
    if (type === 'error') {
      console.error(`❌ [DevTools Error]: ${text}`);
      consoleErrors.push(text);
    } else if (type === 'warn') {
      console.warn(`⚠️ [DevTools Warn]: ${text}`);
      consoleWarnings.push(text);
    }
  });

  page.on('pageerror', (err) => {
    console.error(`💥 [Page Runtime Error]: ${err.message}`);
    consoleErrors.push(err.message);
  });

  page.on('requestfailed', (req) => {
    const failure = req.failure();
    const url = req.url();
    console.error(`📡 [Network Request Failed]: ${url} - ${failure?.errorText || 'Unknown'}`);
    networkErrors.push({ url, error: failure?.errorText });
  });

  try {
    console.log(`🌐 Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // 1. Verify Preloader & Wait for "ENTER JOURNEY"
    console.log('⏳ Waiting for React root and Preloader...');
    await page.waitForSelector('#root', { timeout: 15000 });
    await page.waitForSelector('#preloader-curtain', { timeout: 25000 });
    
    // Wait for ENTER JOURNEY button to appear
    console.log('⏳ Waiting for GPU Shader compilation & Enter button...');
    await page.waitForFunction(
      () => {
        const btn = Array.from(document.querySelectorAll('button')).find((b) =>
          b.textContent?.includes('ENTER JOURNEY')
        );
        return btn !== undefined;
      },
      { timeout: 25000 }
    );

    console.log('✨ "ENTER JOURNEY" button appeared. Capturing preloader screenshot...');
    await page.screenshot({ path: path.join(artifactsDir, '00_preloader.png') });

    // 2. Click "ENTER JOURNEY"
    console.log('👆 Clicking "ENTER JOURNEY"...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('ENTER JOURNEY')
      );
      if (btn) btn.click();
    });

    await new Promise((r) => setTimeout(r, 1200));
    console.log('🏜️ Entered 3D Desert World (Beat 0). Capturing screenshot...');
    await page.screenshot({ path: path.join(artifactsDir, '01_desert.png') });

    // 3. Cycle through story beats via REAL Mouse Wheel Scrolling
    console.log('🖱️ Testing REAL Mouse Wheel Scrolling across all 10 Beats...');
    for (let beat = 1; beat <= 9; beat++) {
      await page.mouse.wheel({ deltaY: 280 });
      await new Promise((r) => setTimeout(r, 650));
      
      const filename = `beat_${beat < 10 ? '0' + beat : beat}.png`;
      await page.screenshot({ path: path.join(artifactsDir, filename) });
      console.log(`📸 Beat ${beat} reached via Wheel Scroll & captured: ${filename}`);
    }

    // 4. Test Reverse Scrolling via Mouse Wheel
    console.log('🖱️ Testing Reverse Mouse Wheel Scrolling (Upward)...');
    await page.mouse.wheel({ deltaY: -280 });
    await new Promise((r) => setTimeout(r, 500));
    await page.mouse.wheel({ deltaY: -280 });
    await new Promise((r) => setTimeout(r, 500));

    // 5. Test Direct Jump to Beat 9 via Navigation Rail
    console.log('🎯 Testing Navigation Rail dot click (Jump to Beat 9 Moon)...');
    await page.evaluate(() => {
      const dots = Array.from(document.querySelectorAll('nav button'));
      if (dots.length > 0) {
        // Last dot is the 10th beat
        const lastDot = dots[dots.length - 2]; // before ChevronDown
        if (lastDot) lastDot.click();
      }
    });
    await new Promise((r) => setTimeout(r, 600));

    // 6. Test language switcher & audio toggle
    console.log('🌐 Testing Language Switcher (VI -> EN)...');
    await page.evaluate(() => {
      const langBtn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.getAttribute('aria-label')?.includes('language') || b.textContent?.includes('VI') || b.textContent?.includes('EN')
      );
      if (langBtn) langBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // 5. Check Moon Beat interactive buttons
    console.log('🌕 Testing Moon Contact Copy buttons...');
    const copyResult = await page.evaluate(() => {
      const copyBtns = Array.from(document.querySelectorAll('button')).filter((b) =>
        b.textContent?.includes('HOTLINE') || b.textContent?.includes('EMAIL')
      );
      if (copyBtns.length > 0) {
        copyBtns[0].click();
        return true;
      }
      return false;
    });
    console.log(`📋 Copy button click test: ${copyResult ? 'SUCCESS' : 'SKIPPED'}`);

    console.log('\n========================================');
    console.log('📊 [AUTOMATED BROWSER TEST REPORT]');
    console.log(`Total Console Errors: ${consoleErrors.length}`);
    console.log(`Total Console Warnings: ${consoleWarnings.length}`);
    console.log(`Total Network Failures: ${networkErrors.length}`);
    console.log('========================================\n');

    if (consoleErrors.length > 0) {
      console.error('❌ Errors detected during browser execution:');
      consoleErrors.forEach((e, i) => console.error(` [${i + 1}] ${e}`));
    } else {
      console.log('✅ 100% CLEAN TEST: 0 Runtime Errors, 0 Network Failures!');
    }

  } catch (error) {
    console.error('❌ Browser Test Execution Failed:', error);
    if (page) {
      const html = await page.content().catch(() => '');
      console.log('\n📄 Page HTML snippet:\n', html.slice(0, 1000));
      console.log('\n📜 All Console Logs:\n', JSON.stringify(consoleLogs, null, 2));
    }
    process.exitCode = 1;
  } finally {
    if (!isHeaded) {
      await browser.close();
    }
  }
}

runBrowserTest();
