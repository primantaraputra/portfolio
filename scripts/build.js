import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('[build] Menyiapkan direktori dist untuk deployment...');

// 1. Bersihkan dist lama jika ada
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Daftar file root yang perlu disalin
const rootFiles = [
  'index.html',
  'print.html',
  'print-v1-original.html'
];

for (const file of rootFiles) {
  const src = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
    console.log(`[build] File disalin: ${file}`);
  }
}

// 3. Daftar folder yang perlu disalin rekursif
const folders = ['assets', 'css', 'data', 'js'];

for (const folder of folders) {
  const src = path.join(rootDir, folder);
  const dest = path.join(distDir, folder);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`[build] Folder disalin: ${folder}/`);
  }
}

console.log('[build] Sukses! Direktori dist siap dideploy ke Vercel/Hosting.');
