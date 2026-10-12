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

## 4. Cara Membuat Ulang File PDF Portofolio

Jalankan perintah berikut di terminal:

```bash
npm run build:pdf
```

Skrip ini secara otomatis akan:
1. Membuka `print.html` menggunakan browser headless (Puppeteer).
2. Memastikan font dan layout cetak termuat sempurna.
3. Menyimpan hasil cetak A4 beresolusi tinggi ke `assets/files/Portofolio-DianWildanPrimantaraPutra.pdf`.

*Catatan:* Pengunjung juga dapat mengklik tombol **Cetak / Simpan PDF** pada `print.html` melalui dialog cetak browser (`Ctrl+P` / `Cmd+P`).

---

## 5. Cara Deploy ke Layanan Hosting

Karena web ini 100% statis (HTML, CSS, JS), Anda dapat langsung mengunggahnya ke berbagai platform gratis:

* **Vercel / Netlify**: Cukup hubungkan repositori GitHub Anda atau drag-and-drop folder `portfolio`.
* **GitHub Pages**:
  1. Masuk ke tab **Settings** di repository GitHub Anda.
  2. Buka menu **Pages** di sebelah kiri.
  3. Pada opsi **Source**, pilih branch `main` dan folder `/ (root)`.
  4. Simpan, dan web Anda akan aktif secara online.
