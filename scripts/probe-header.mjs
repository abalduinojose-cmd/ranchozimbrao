import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'shell' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(process.argv[2] ?? 'http://localhost:5204', { waitUntil: 'networkidle2' });

const result = await page.evaluate(async () => {
  const out = [];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const header = () => document.querySelector('header[data-theme]');

  out.push({ step: 'mount', theme: header()?.dataset.theme, sections: document.querySelectorAll('main > [data-theme]').length });

  // Observer paralelo, igual ao do hook, para conferir se dispara
  const seen = [];
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) seen.push({ id: e.target.id || e.target.tagName, hit: e.isIntersecting });
    },
    { rootMargin: `0px 0px -${window.innerHeight - 72}px 0px`, threshold: 0 },
  );
  document.querySelectorAll('main > [data-theme]').forEach((s) => io.observe(s));

  for (const id of ['#sobre', '#plantel', '#galeria']) {
    const el = document.querySelector(id);
    window.scrollTo({ top: el.offsetTop + 300, behavior: 'instant' });
    await wait(500);
    out.push({ step: id, y: window.scrollY, theme: header()?.dataset.theme, bg: getComputedStyle(header()).backgroundColor });
  }

  return { out, seenTail: seen.slice(-8) };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
