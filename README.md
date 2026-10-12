# Portofolio Pribadi — Dian Wildan Primantara Putra

Website portofolio statis pribadi yang dibangun menggunakan HTML5, CSS3, dan JavaScript (Vanilla/ES Modules).

---

## 1. Struktur Folder

```
portfolio/
├── index.html          # Halaman utama portofolio
├── print.html          # Halaman cetak ramah A4 untuk pratinjau & ekspor PDF
├── css/
│   ├── style.css       # Desain web utama (editorial minimalis, responsif)
│   └── print.css       # Penataan gaya cetak A4 & pembagi halaman cetak
├── js/
│   ├── main.js         # Entry point & inisialisasi interaksi web
│   ├── render.js       # Logika render data/content.js ke index.html
│   └── print-render.js # Logika render data/content.js ke print.html
├── data/
│   └── content.js      # Sumber data utama (profil, kontak, keahlian, project)
├── assets/
│   ├── img/            # Foto profil (foto.jpg) & screenshot project
│   └── files/          # File CV (CV-...) & Portofolio PDF hasil generate
├── scripts/
│   └── make-pdf.js     # Skrip generator PDF A4 otomatis via Puppeteer
├── package.json
└── README.md
```

---

## 2. Cara Menjalankan Secara Lokal

Karena proyek ini menggunakan modul JavaScript ES (`type="module"`), buka folder ini menggunakan server lokal:

**Opsi 1: Menggunakan Node.js / npx serve**
```bash
npx serve .
```

**Opsi 2: Menggunakan Python**
```bash
python -m http.server 8080
```
Buka browser di `http://localhost:8080`.

---

## 3. Cara Memperbarui Data & Foto

1. **Memperbarui Data Teks**:
   Buka file `data/content.js`. Ubah profil, biografi, kontak, keahlian, atau tambahkan proyek baru pada array `projects`.
2. **Memperbarui Foto & CV**:
   - Ganti `assets/img/foto.jpg` dengan foto profil Anda.
   - Ganti `assets/img/project-1.jpg`, `project-2.jpg`, dst. dengan gambar proyek asli.
   - Simpan file CV Anda di `assets/files/CV-DianWildanPrimantaraPutra.pdf`.

---

## 4. Cara Membuat Ulang File PDF Portofolio & Pilihan Layout

Proyek ini menyediakan **2 versi layout dokumen portofolio download (A4 Landscape)**:
- **Versi 2 (Human Editorial Monograph — Aktif Secara Default)**:
  - Struktur pembuka (*Cover & Slide 2*) yang dirancang khusus dengan gaya editorial human-crafted (editorial masthead, executive dossier index/daftar isi terstruktur, kartu kuratorial profil dengan koordinat & stempel monogram DWP, serta tata letak 3-kolom arsitektural untuk kepemimpinan, prestasi nasional, dan matriks keahlian).
  - Tampilan jauh lebih berbobot, otentik, dan tidak tampak seperti template AI generik.
- **Versi 1 (Awal / Klasik)**:
  - Struktur asli 2-kolom sebelumnya tetap disimpan 100% utuh di `print-v1-original.html` dan dapat dialihkan kapan saja.

### Cara Generate PDF:

**Untuk Versi 2 (Human Editorial):**
```bash
npm run build:pdf
```
*Menghasilkan file:* `assets/files/Portofolio-DianWildanPrimantaraPutra.pdf`

**Untuk Versi 1 (Original / Klasik):**
```bash
npm run build:pdf:v1
```
*Menghasilkan file:* `assets/files/Portofolio-DianWildanPrimantaraPutra-v1-original.pdf`

### Cara Beralih Antar Versi di Browser:
1. Jalankan `npm run serve` atau server lokal.
2. Buka `print.html` di browser.
3. Di floating topbar bagian atas terdapat tombol switcher:
   - Klik **✨ Versi 2 (Human Editorial)** untuk melihat desain baru.
   - Klik **📄 Versi 1 (Awal / Klasik)** untuk langsung beralih ke desain lama secara realtime.
4. Jika ingin kembali permanen ke versi awal kapan saja, Anda cukup menyalin file `print-v1-original.html` menjadi `print.html`, atau menggunakan git commit awal.

---

## 5. Cara Deploy ke Layanan Hosting

Karena web ini 100% statis (HTML, CSS, JS), Anda dapat langsung mengunggahnya ke berbagai platform gratis:

* **Vercel / Netlify**: Cukup hubungkan repositori GitHub Anda atau drag-and-drop folder `portfolio`.
* **GitHub Pages**:
  1. Masuk ke tab **Settings** di repository GitHub Anda.
  2. Buka menu **Pages** di sebelah kiri.
  3. Pada opsi **Source**, pilih branch `main` dan folder `/ (root)`.
  4. Simpan, dan web Anda akan aktif secara online.
