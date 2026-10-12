import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (reqPath === '/') reqPath = '/print.html';
  const filePath = path.join(rootDir, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(content);
    }
  });
});

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 990, deviceScaleFactor: 2 });
  await page.goto(`http://127.0.0.1:${port}/print.html`, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Screenshot slide 1 & 2 Versi 1 (Default aktif sekarang)
  const slide1V1 = await page.$('#slide-1');
  if (slide1V1) {
    await slide1V1.screenshot({ path: path.join(rootDir, 'assets/img/preview-slide1-v1.png') });
    console.log('Slide 1 v1 screenshot saved');
  }

  const slide2V1 = await page.$('#slide-2');
  if (slide2V1) {
    await slide2V1.screenshot({ path: path.join(rootDir, 'assets/img/preview-slide2-v1.png') });
    console.log('Slide 2 v1 screenshot saved');
  }

  // Switch to Versi 3 and take screenshot
  await page.evaluate(() => switchVersion('v3'));
  await page.waitForTimeout ? await page.waitForTimeout(400) : await new Promise(r => setTimeout(r, 400));
  const slide1V3 = await page.$('#slide-1-v3');
  if (slide1V3) {
    await slide1V3.screenshot({ path: path.join(rootDir, 'assets/img/preview-slide1-v3.png') });
    console.log('Slide 1 v3 screenshot saved');
  }
  const slide2V3 = await page.$('#slide-2-v3');
  if (slide2V3) {
    await slide2V3.screenshot({ path: path.join(rootDir, 'assets/img/preview-slide2-v3.png') });
    console.log('Slide 2 v3 screenshot saved');
  }

  // Switch to Versi 2 and take screenshot
  await page.evaluate(() => switchVersion('v2'));
  await page.waitForTimeout ? await page.waitForTimeout(400) : await new Promise(r => setTimeout(r, 400));
  const slide1V2 = await page.$('#slide-1-v2');
  if (slide1V2) {
    await slide1V2.screenshot({ path: path.join(rootDir, 'assets/img/preview-slide1-v2.png') });
    console.log('Slide 1 v2 screenshot saved');
  }
  const slide2V2 = await page.$('#slide-2-v2');
  if (slide2V2) {
    await slide2V2.screenshot({ path: path.join(rootDir, 'assets/img/preview-slide2-v2.png') });
    console.log('Slide 2 v2 screenshot saved');
  }

  // Screenshot main web index.html
  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  await page.screenshot({ path: path.join(rootDir, 'assets/img/preview-web-index.png'), clip: { x: 0, y: 0, width: 1400, height: 900 } });
  console.log('Web index screenshot saved');

  await browser.close();
  server.close();
});
