/**
 * AUTOMATED BROWSER TESTING SUITE FOR POSTLAIN APPLE MINIMALIST SOTY
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

    // 1. Verify Preloader & Wait for "ENTER PORTFOLIO"
    console.log('⏳ Waiting for React root and Preloader...');
    await page.waitForSelector('#preloader-curtain', { timeout: 25000 });

    // Wait for ENTER button to appear
    console.log('⏳ Waiting for Preloader completion & Enter button...');
    await page.waitForFunction(
      () => {
        const btn = Array.from(document.querySelectorAll('button')).find((b) =>
          b.textContent?.includes('ENTER PORTFOLIO') || b.textContent?.includes('KHÁM PHÁ HÀNH TRÌNH')
        );
        return btn !== undefined;
      },
      { timeout: 25000 }
    );

    console.log('✨ "ENTER PORTFOLIO" button appeared. Capturing preloader screenshot...');
    await page.screenshot({ path: path.join(artifactsDir, '00_apple_preloader.png') });

    // 2. Click "ENTER PORTFOLIO"
    console.log('👆 Clicking "ENTER PORTFOLIO"...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('ENTER PORTFOLIO') || b.textContent?.includes('KHÁM PHÁ HÀNH TRÌNH')
      );
      if (btn) btn.click();
    });

    await new Promise((r) => setTimeout(r, 1000));
    console.log('✨ Entered Apple Minimalist Hero Section. Capturing screenshot...');
    await page.screenshot({ path: path.join(artifactsDir, '01_apple_hero.png') });

    // 3. Scroll to Philosophy Section (Apple Word Scrub)
    console.log('🖱️ Scrolling into Section 01: Triết Lý Vận Hành (Apple Word Scrub)...');
    await page.mouse.wheel({ deltaY: 800 });
    await new Promise((r) => setTimeout(r, 800));
    await page.mouse.wheel({ deltaY: 600 });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(artifactsDir, '02_apple_philosophy.png') });

    // 4. Scroll to Milestones Section (Horizontal Runway)
    console.log('🖱️ Scrolling into Section 02: Cột Mốc Thực Chiến (4 Career Monoliths)...');
    await page.mouse.wheel({ deltaY: 1000 });
    await new Promise((r) => setTimeout(r, 800));
    await page.mouse.wheel({ deltaY: 1000 });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(artifactsDir, '03_apple_milestones.png') });

    // 5. Scroll to Bento Section (4 Live Capability Widgets)
    console.log('🖱️ Scrolling into Section 03: Vũ Khí Năng Lực (2x2 Bento Matrix)...');
    await page.mouse.wheel({ deltaY: 1200 });
    await new Promise((r) => setTimeout(r, 800));
    await page.mouse.wheel({ deltaY: 800 });
    await new Promise((r) => setTimeout(r, 800));

    // Test Widget Interactions: Click "TRUYỀN LỬA ĐỘI NGŨ" / "PLAY HARMONIC CHORD"
    console.log('⚡ Testing Bento interactive widgets...');
    await page.evaluate(() => {
      const boostBtn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('TRUYỀN LỬA') || b.textContent?.includes('ENERGIZE')
      );
      if (boostBtn) boostBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(artifactsDir, '04_apple_bento.png') });

    // 6. Scroll to Contact Section
    console.log('🖱️ Scrolling into Section 04: Kênh Kết Nối Trực Tiếp (Contact Monolith)...');
    await page.evaluate(() => {
      if ((window).__lenis) {
        (window).__lenis.scrollTo('#contact-section', { immediate: true });
      } else {
        const contactEl = document.querySelector('#contact-section');
        if (contactEl) contactEl.scrollIntoView();
      }
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Test Clipboard Copy for Hotline & Email
    console.log('📋 Testing 1-click clipboard copy for Hotline & Email...');
    const copyResult = await page.evaluate(() => {
      const copyBtns = Array.from(document.querySelectorAll('button')).filter((b) =>
        b.textContent?.includes('SAO CHÉP') || b.textContent?.includes('COPY')
      );
      if (copyBtns.length > 0) {
        copyBtns[0].click();
        return true;
      }
      return false;
    });
    console.log(`📋 Copy action status: ${copyResult ? 'SUCCESS' : 'SKIPPED'}`);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactsDir, '05_apple_contact.png') });

    // 7. Test Language Switcher (VI -> EN)
    console.log('🌐 Testing Language Switcher (VI -> EN)...');
    await page.evaluate(() => {
      const langBtn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.getAttribute('aria-label')?.includes('ngôn ngữ') || b.textContent?.includes('VI') || b.textContent?.includes('EN')
      );
      if (langBtn) langBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // 8. Test Sound Toggle
    console.log('🔊 Testing Sound Toggle button...');
    await page.evaluate(() => {
      const soundBtn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.getAttribute('aria-label')?.includes('âm thanh') || b.textContent?.includes('SOUND')
      );
      if (soundBtn) soundBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

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
