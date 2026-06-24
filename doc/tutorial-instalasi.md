# 📦 Tutorial Instalasi — Kasir Kedai

Panduan ini menjelaskan cara memasang dan menjalankan **Kasir Kedai** di berbagai perangkat. Tidak diperlukan keahlian teknis khusus.

---

## Daftar Isi

- [Persiapan](#persiapan)
- [Instalasi di PC / Laptop](#instalasi-di-pc--laptop)
- [Instalasi di HP / Tablet Android](#instalasi-di-hp--tablet-android)
- [Instalasi di iPhone / iPad](#instalasi-di-iphone--ipad)
- [Pertama Kali Buka Aplikasi](#pertama-kali-buka-aplikasi)
- [Agar Bisa Dipakai Offline](#agar-bisa-dipakai-offline)
- [Pertanyaan Umum](#pertanyaan-umum)

---

## Persiapan

Sebelum mulai, pastikan sudah memiliki:

- File aplikasi: `kasir.html`, `kasir.css`, `kasir.js`, `sw.js` (semua dalam **satu folder yang sama**)
- Browser modern: **Google Chrome** (paling disarankan), Microsoft Edge, atau Firefox
- Koneksi internet — hanya diperlukan **satu kali** saat pertama membuka aplikasi

> ⚠️ **Penting:** Keempat file harus selalu berada dalam satu folder. Jangan pindahkan salah satu file saja.

---

## Instalasi di PC / Laptop

### Windows

1. **Unduh semua file** dari GitHub:
   - Klik tombol hijau **`Code`** → pilih **`Download ZIP`**
   - Ekstrak file ZIP ke folder pilihan (misalnya: `D:\KasirKedai\`)

2. **Buka folder** hasil ekstrak, pastikan ada 4 file:
   ```
   kasir.html
   kasir.css
   kasir.js
   sw.js
   ```

3. **Klik dua kali** file `kasir.html`
   - Secara otomatis akan terbuka di browser default

4. Jika browser meminta izin — klik **Izinkan** atau **Allow**

5. Masukkan PIN: **`1234`** (PIN dapat diganti setelah masuk)

#### Cara Pasang sebagai Aplikasi (Disarankan)

Agar lebih mudah dibuka tanpa harus mencari file setiap hari:

1. Buka `kasir.html` di **Google Chrome**
2. Klik ikon **⋮** (tiga titik) di pojok kanan atas browser
3. Pilih **"Pasang Kasir Kedai…"** atau **"Instal Kasir Kedai"**
4. Klik **Instal**
5. Aplikasi akan muncul di Desktop dan bisa dibuka seperti program biasa

---

### macOS

1. Unduh dan ekstrak ZIP dari GitHub
2. Pindahkan folder ke **Applications** atau lokasi yang mudah diakses
3. Klik dua kali `kasir.html` — akan terbuka di Safari atau Chrome
4. **Disarankan pakai Chrome:** klik kanan `kasir.html` → **Buka Dengan** → **Google Chrome**
5. Masukkan PIN: **`1234`**

---

### Linux

1. Unduh dan ekstrak ZIP dari GitHub
2. Buka Terminal, masuk ke folder:
   ```bash
   cd /path/ke/folder/kasir-kedai
   ```
3. Buka file dengan browser:
   ```bash
   google-chrome kasir.html
   # atau
   firefox kasir.html
   ```
4. Masukkan PIN: **`1234`**

---

## Instalasi di HP / Tablet Android

### Metode 1 — Via File Manager (Tanpa Internet)

Cocok jika sudah punya file aplikasi di perangkat lain.

1. **Transfer file** ke HP menggunakan kabel USB, Bluetooth, atau WhatsApp
   - Pindahkan semua 4 file ke satu folder, misalnya: `Unduhan/KasirKedai/`

2. Buka aplikasi **File Manager** (Pengelola File) di HP

3. Cari folder `KasirKedai` → ketuk file **`kasir.html`**

4. Pilih **"Buka dengan Chrome"** (atau browser lain yang tersedia)

5. Masukkan PIN: **`1234`**

### Metode 2 — Via GitHub (Dengan Internet)

1. Buka **Chrome** di HP Android
2. Buka halaman GitHub repository ini
3. Ketuk **`Code`** → **`Download ZIP`**
4. Setelah unduhan selesai, ketuk notifikasi unduhan → pilih **Ekstrak**
5. Buka folder hasil ekstrak → ketuk `kasir.html` → pilih **Buka dengan Chrome**
6. Masukkan PIN: **`1234`**

### Cara Pasang ke Layar Utama (Home Screen)

Agar bisa dibuka seperti aplikasi tanpa buka file manager:

1. Setelah `kasir.html` terbuka di Chrome
2. Ketuk ikon **⋮** (tiga titik) di pojok kanan atas
3. Pilih **"Tambahkan ke Layar Utama"** atau **"Install App"**
4. Ketuk **Tambahkan**
5. Ikon Kasir Kedai akan muncul di layar utama HP

---

## Instalasi di iPhone / iPad

1. Buka aplikasi **Files** (Berkas) di iPhone/iPad

2. Pindahkan 4 file aplikasi ke folder di iCloud Drive atau "Di iPhone Ini"

3. Ketuk file `kasir.html`

4. Pilih **"Buka di Safari"**

5. Masukkan PIN: **`1234`**

### Cara Pasang ke Home Screen

1. Setelah aplikasi terbuka di Safari
2. Ketuk ikon **⎙** (Bagikan / Share) di bagian bawah layar
3. Gulir ke bawah → pilih **"Tambahkan ke Layar Utama"** (Add to Home Screen)
4. Beri nama: `Kasir Kedai` → ketuk **Tambahkan**
5. Ikon akan muncul di Home Screen iPad/iPhone

---

## Pertama Kali Buka Aplikasi

Saat pertama kali membuka aplikasi dengan koneksi internet aktif:

1. Browser akan **mengunduh dan menyimpan** semua aset (Tailwind CSS, font Inter) ke dalam cache
2. Proses ini berlangsung otomatis di latar belakang, biasanya kurang dari 10 detik
3. Setelah selesai, aplikasi **sudah bisa dipakai offline** untuk seterusnya

> Jika muncul pesan "Izinkan notifikasi" atau "Izinkan penyimpanan" dari browser — pilih **Izinkan**.

---

## Agar Bisa Dipakai Offline

Kasir Kedai menggunakan teknologi **Service Worker** yang menyimpan aplikasi di perangkat secara otomatis.

**Syaratnya sederhana:**
- Buka aplikasi **minimal satu kali** saat ada koneksi internet
- Setelah itu, aplikasi bisa dipakai meski internet mati total

**Yang tetap butuh internet:**
- Pertama kali membuka (untuk mengunduh cache)
- Jika browser-nya dibersihkan/cache dihapus (perlu online sekali lagi)

---

## Pertanyaan Umum

**T: Apakah data saya aman?**  
J: Data tersimpan di browser perangkat Anda sendiri, tidak dikirim ke server manapun. Namun ini juga berarti data tidak otomatis tersinkronisasi ke perangkat lain. Gunakan fitur **Backup Database** di halaman Laporan secara rutin.

**T: Bagaimana jika HP-nya ganti baru?**  
J: Sebelum ganti HP, lakukan **Backup Database** dari halaman Laporan, simpan file `.json`-nya. Di HP baru, buka aplikasi lalu gunakan **Muat Database** untuk memulihkan semua data.

**T: Browser apa yang paling baik?**  
J: Google Chrome paling disarankan karena mendukung fitur PWA (pasang ke layar utama) dan Service Worker paling stabil.

**T: Apakah bisa dipakai di beberapa perangkat sekaligus?**  
J: Bisa diinstal di banyak perangkat, namun data tidak otomatis tersinkronisasi. Tiap perangkat punya data sendiri. Untuk multi-kasir yang tersinkronisasi, diperlukan pengembangan lanjutan dengan database server.

**T: File instalasi hilang, apakah data transaksi ikut hilang?**  
J: Tidak. Data tersimpan di `localStorage` browser, terpisah dari file aplikasi. Selama browser-nya sama dan cache tidak dihapus, data tetap ada. Untuk memastikan, tetap lakukan backup rutin.

---

*Panduan ini bagian dari dokumentasi [Kasir Kedai](../README.md) — dibuat oleh [@awekh](https://qata.my.id/awekh)*
