import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { profile, files } from '../data/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// MIME types untuk static server internal
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2'
};

/**
 * Server lokal sementara agar Puppeteer dapat memuat file HTML & ES Module
 */
function createStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const parsedUrl = new URL(req.url, 'http://localhost');
      let reqPath = decodeURIComponent(parsedUrl.pathname);
      if (reqPath === '/') reqPath = '/print.html';

      const filePath = path.join(rootDir, reqPath);
      const ext = path.extname(filePath).toLowerCase();

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File tidak ditemukan');
        } else {
          res.writeHead(200, {
            'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(content);
        }
      });
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function generatePDF() {
  console.log('1. Memulai server lokal sementara...');
  const { server, port } = await createStaticServer();
  const printUrl = `http://127.0.0.1:${port}/print.html`;

  // Tentukan path output
  const outputPath = path.resolve(rootDir, files.portfolio || 'assets/files/Portofolio.pdf');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`2. Membuka browser Puppeteer ke ${printUrl}...`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Buka halaman cetak
    await page.goto(printUrl, { waitUntil: 'networkidle0', timeout: 30000 });

    // Tunggu font Google selesai dimuat
    await page.evaluateHandle('document.fonts.ready');

    console.log('3. Melakukan render ke format dokumen A4 Landscape (PPT Style)...');
    await page.pdf({
      path: outputPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      preferCSSPageSize: true
    });

    const stats = fs.statSync(outputPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`✓ Berhasil membuat PDF: ${outputPath} (${sizeInMB} MB)`);

  } catch (error) {
    console.error('Terjadi kesalahan saat generate PDF:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
    console.log('Selesai.');
  }
}

generatePDF();
