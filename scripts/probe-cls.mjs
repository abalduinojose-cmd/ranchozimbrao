import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'shell' });
const page = await browser.newPage();
await page.setViewport({ width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true });

await page.evaluateOnNewDocument(() => {
  window.__shifts = [];
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.hadRecentInput) continue;
      window.__shifts.push({
        value: entry.value,
        time: Math.round(entry.startTime),
        sources: (entry.sources || []).map((s) => ({
          tag: s.node?.tagName,
          cls: (s.node?.className || '').toString().slice(0, 70),
          prev: s.previousRect && { y: Math.round(s.previousRect.y), h: Math.round(s.previousRect.height) },
          curr: s.currentRect && { y: Math.round(s.currentRect.y), h: Math.round(s.currentRect.height) },
        })),
      });
    }
  }).observe({ type: 'layout-shift', buffered: true });
});

const client = await page.target().createCDPSession();
await client.send('Network.enable');
await client.send('Network.emulateNetworkConditions', {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
});
await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

await page.goto(process.argv[2] ?? 'http://localhost:5206', { waitUntil: 'load', timeout: 90000 });
await new Promise((r) => setTimeout(r, 6000));

const shifts = await page.evaluate(() => window.__shifts);
console.log(JSON.stringify(shifts, null, 2));
await browser.close();
