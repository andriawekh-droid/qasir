# 📖 Tutorial Penggunaan — Kasir Kedai

Panduan lengkap cara menggunakan aplikasi **Kasir Kedai** dari awal hingga akhir transaksi.

---

## Daftar Isi

1. [Masuk dengan PIN](#1-masuk-dengan-pin)
2. [Mengelola Menu (Katalog)](#2-mengelola-menu-katalog)
3. [Melayani Transaksi (Kasir)](#3-melayani-transaksi-kasir)
4. [Melihat Laporan & Pengaturan Admin](#4-melihat-laporan--pengaturan-admin)
5. [Backup & Pemulihan Data](#5-backup--pemulihan-data)
6. [Mengganti Nama Kedai, Logo, dan PIN](#6-mengganti-nama-kedai-logo-dan-pin)

---

## 1. Masuk dengan PIN

![Layar PIN](screenshot/tutorial_01_layar-pin.png)

Setiap kali aplikasi dibuka, pengguna akan disambut layar PIN. Ini mencegah siapapun mengakses aplikasi tanpa izin.

**Langkah:**
1. Ketuk angka-angka PIN satu per satu menggunakan numpad
2. PIN terdiri dari **4 digit** — aplikasi langsung memproses setelah digit ke-4 dimasukkan
3. Jika PIN benar → aplikasi terbuka
4. Jika PIN salah → dot indikator berubah merah, lalu otomatis reset. Coba lagi.

> **PIN default:** `1234`  
> Cara mengganti PIN ada di [bagian 6](#6-mengganti-nama-kedai-logo-dan-pin).

---

## 2. Mengelola Menu (Katalog)

![Halaman Katalog](screenshot/tutorial_03_halaman-katalog.png)

Sebelum mulai melayani pembeli, pastikan daftar menu sudah diisi terlebih dahulu. Klik tab **📋 Katalog** di navigasi atas.

### Menambah Menu Baru

1. Di panel kiri, isi **Nama Menu** — contoh: *Nasi Goreng Rumah*
2. Pilih **Kategori**: Makanan, Minuman, atau Snack
3. Isi **Harga (Rp)** — tanpa titik atau koma, angka saja
4. Klik tombol **Simpan Menu**
5. Menu baru langsung muncul di tabel sebelah kanan

### Mengubah Menu

1. Di tabel daftar menu, cari menu yang ingin diubah
2. Klik tombol **Ubah** (warna kuning) di kolom Aksi
3. Data menu otomatis terisi ke form di sebelah kiri
4. Lakukan perubahan yang diperlukan
5. Klik **Simpan Menu** untuk menyimpan perubahan

### Menghapus Menu

1. Klik tombol **Hapus** (warna merah) di samping menu yang ingin dihapus
2. Muncul jendela konfirmasi — klik **Ya, Setuju** untuk menghapus
3. Menu langsung terhapus dari daftar

### Navigasi Halaman (Pagination)

Jika menu lebih dari 10 item, tabel akan terbagi ke beberapa halaman:
- Gunakan tombol angka **1, 2, 3...** di bawah tabel untuk berpindah halaman
- Tombol **←** dan **→** untuk maju/mundur satu halaman
- Info "Menampilkan 1–10 dari N menu" di pojok kiri bawah

---

## 3. Melayani Transaksi (Kasir)

![Halaman Kasir](screenshot/tutorial_02_halaman-kasir.png)

Ini adalah halaman utama yang dipakai kasir sehari-hari. Klik tab **🛒 Kasir**.

### Alur Transaksi Lengkap

#### Langkah 1 — Catat Identitas Pembeli
- Isi kolom **Nama Pelanggan / No Meja** di panel kanan
- Contoh: *Meja 3*, *Pak Budi*, *Takeaway 1*
- Boleh dikosongkan jika tidak diperlukan

#### Langkah 2 — Pilih Tipe Pelayanan
- **Dine In** → makan di tempat
- **Take Away** → dibungkus / dibawa pulang

#### Langkah 3 — Pilih Menu
- Gunakan tombol filter **Semua / Makanan / Minuman / Snack** untuk menyaring menu
- Jika menu banyak, gunakan **tombol halaman** di bawah grid
- Ketuk/klik kartu menu untuk memasukkan ke keranjang
- Muncul notifikasi kecil di pojok kanan atas setiap menu berhasil ditambahkan

#### Langkah 4 — Periksa Keranjang
- Di panel kanan bawah, periksa daftar pesanan
- Ketuk **+** atau **−** untuk menambah/mengurangi jumlah item
- Klik **Hapus Semua** jika ingin mengulang dari awal
- **Total Tagihan** diperbarui otomatis

#### Langkah 5 — Pilih Metode Pembayaran
- **Tunai** → isi nominal uang yang diterima dari pembeli, sisa kembalian dihitung otomatis
- **QRIS** → tampil instruksi pembayaran via QRIS

#### Langkah 6 — Proses & Cetak
- Klik **🎉 Proses Bayar & Cetak**
- Browser akan membuka jendela cetak untuk struk thermal
- Sesuaikan pengaturan printer jika perlu (kertas A4 atau 58mm)
- Transaksi otomatis tercatat di riwayat dan laporan

---

## 4. Melihat Laporan & Pengaturan Admin

![Halaman Laporan](screenshot/tutorial_04_halaman-laporan.png)

Klik tab **📊 Laporan** untuk mengakses data penjualan dan pengaturan aplikasi.

### Statistik Utama (3 kartu di atas)

| Kartu | Informasi |
|---|---|
| 🟢 Pendapatan Hari Ini | Total omzet hari ini dalam Rupiah |
| 🟠 Total Transaksi | Jumlah transaksi hari ini + metode pembayaran terpopuler |
| ⚫ Menu Terlaris | Nama menu yang paling banyak terjual + jumlah porsi |

### Grafik 7 Hari Terakhir

- Menampilkan batang volume penjualan harian selama seminggu terakhir
- Arahkan kursor ke batang untuk melihat nominal tepat hari tersebut
- Batang hari tertinggi otomatis berwarna berbeda saat di-hover

### Ekspor Laporan CSV

1. Klik tombol **📥 Ekspor Laporan Hari Ini (.csv)**
2. File `.csv` otomatis terunduh ke perangkat
3. File bisa dibuka dengan Microsoft Excel, Google Sheets, atau aplikasi spreadsheet lain
4. Isi file: nomor transaksi, waktu, nama pelanggan, item pesanan, total, metode bayar

### Riwayat Transaksi Hari Ini

- Daftar semua transaksi yang sudah diproses hari ini
- Tiap baris menampilkan: nama pelanggan, waktu, metode bayar, tipe pelayanan, dan total
- Klik **Reset Riwayat** untuk menghapus semua riwayat hari ini (ada konfirmasi terlebih dahulu)

---

## 5. Backup & Pemulihan Data

Panel ini ada di bagian paling atas halaman **Laporan**.

### Backup Database

> Disarankan dilakukan setiap akhir hari atau setelah sesi ramai.

1. Klik tombol **💾 Backup Database**
2. File `.json` langsung terunduh dengan nama otomatis, contoh: `Backup_Kedai_24-06-2026_1430.json`
3. Simpan file ini di tempat aman — Google Drive, WhatsApp ke diri sendiri, atau flashdisk

File backup berisi:
- Seluruh data menu (nama, kategori, harga)
- Seluruh riwayat transaksi

### Muat Database (Restore)

Digunakan saat ganti perangkat, atau data hilang karena cache dibersihkan.

1. Klik tombol **📂 Muat Database**
2. Pilih file `.json` backup yang sudah disimpan sebelumnya
3. Muncul jendela konfirmasi dengan informasi tanggal backup dan jumlah data
4. Klik **Ya, Setuju** untuk memulihkan
5. Semua halaman (Kasir, Katalog, Laporan) langsung diperbarui dengan data dari backup

> ⚠️ **Perhatian:** Memuat database akan **menggantikan** semua data yang ada saat ini. Pastikan sudah backup data terbaru sebelum melakukan restore.

---

## 6. Mengganti Nama Kedai, Logo, dan PIN

Panel **⚙️ Pengaturan Kedai** ada di halaman Laporan, tepat di bawah panel Backup.

### Mengganti Nama Kedai

1. Hapus teks di kolom **Nama Kedai**
2. Ketik nama kedai yang baru — contoh: *Warung Pak Eko*
3. Klik **💾 Simpan Pengaturan**
4. Nama baru langsung tampil di header dan layar PIN

### Mengganti Logo

1. Klik tombol **Pilih gambar…** di kolom Logo Kedai
2. Pilih file gambar dari perangkat (format JPG, PNG, atau WebP disarankan)
3. Preview logo kecil langsung muncul di samping tombol
4. Klik **💾 Simpan Pengaturan**
5. Logo baru langsung tampil di header dan layar PIN

> **Tips logo:** Gunakan gambar berbentuk kotak (1:1) dengan ukuran minimal 200×200 piksel agar tampil proporsional.

### Mengganti PIN

1. Isi kolom **PIN Baru (4 angka)** dengan PIN yang diinginkan
2. PIN harus tepat **4 digit angka** (contoh: `5678`, `0000`, `9123`)
3. Klik **💾 Simpan Pengaturan**
4. PIN baru langsung aktif — catat di tempat yang aman

> ⚠️ Jika PIN lupa, data tidak bisa diakses lewat aplikasi. Hubungi pembuat aplikasi untuk reset manual via `localStorage` di browser.

---

## Tips Penggunaan Harian

- **Mulai hari** dengan membuka tab Kasir langsung — tidak perlu buka Katalog dulu jika menu tidak berubah
- **Akhir hari** selalu lakukan Backup Database dan Ekspor CSV untuk arsip
- **Ganti PIN** secara berkala untuk keamanan, terutama jika ada pergantian kasir
- **Tambah menu** baru lewat tab Katalog kapanpun, tanpa perlu restart aplikasi

---

*Panduan ini bagian dari dokumentasi [Kasir Kedai](../README.md) — dibuat oleh [@awekh](https://qata.my.id/awekh)*
