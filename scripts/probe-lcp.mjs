import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'shell' });
const page = await browser.newPage();
await page.setViewport({ width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true });

await page.evaluateOnNewDocument(() => {
  window.__lcp = [];
  window.__paint = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      window.__lcp.push({
        t: Math.round(e.startTime),
        renderTime: Math.round(e.renderTime),
        loadTime: Math.round(e.loadTime),
        size: e.size,
        tag: e.element?.tagName,
        cls: (e.element?.className || '').toString().slice(0, 60),
      });
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__paint.push({ name: e.name, t: Math.round(e.startTime) });
  }).observe({ type: 'paint', buffered: true });
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
await new Promise((r) => setTimeout(r, 7000));

const data = await page.evaluate(() => ({ paint: window.__paint, lcp: window.__lcp }));
console.log(JSON.stringify(data, null, 2));
await browser.close();
