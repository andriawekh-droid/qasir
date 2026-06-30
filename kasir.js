// Database Bawaan Menu Awal Kedai
        const menuBawaan = [
            { id: 101, nama: "Nasi Goreng Premium", harga: 22000, kategori: "Makanan" },
            { id: 102, nama: "Mie Goreng Spesial", harga: 18000, kategori: "Makanan" },
            { id: 103, nama: "Es Kopi Susu Aren", harga: 15000, kategori: "Minuman" },
            { id: 104, nama: "Es Teh Manis Segar", harga: 5000, kategori: "Minuman" },
            { id: 105, nama: "Kentang Goreng Keju", harga: 12000, kategori: "Snack" }
        ];

        // Memuat database lokal & memproteksi dari error forEach data lama
        let dbTransaksi = [];
        try {
            let rawTrx = localStorage.getItem('kedai_transaksi');
            if (rawTrx) {
                let parsed = JSON.parse(rawTrx);
                if (Array.isArray(parsed)) {
                    // Cek apakah data transaksi rusak atau kompatibel
                    let validasi = parsed.every(trx => trx && (Array.isArray(trx.items) || Array.isArray(trx.item)));
                    if (validasi) {
                        dbTransaksi = parsed.map(trx => {
                            if (trx.item && !trx.items) trx.items = trx.item;
                            if (!Array.isArray(trx.items)) trx.items = [];
                            return trx;
                        });
                    } else {
                        console.warn("Format data transaksi lama tidak valid, mengosongkan riwayat.");
                        localStorage.setItem('kedai_transaksi', JSON.stringify([]));
                    }
                }
            }
        } catch(e) {
            console.error("Gagal membaca memori transaksi:", e);
            localStorage.setItem('kedai_transaksi', JSON.stringify([]));
        }

        // Global State Variabel
        let dbMenu = JSON.parse(localStorage.getItem('kedai_menu')) || menuBawaan;
        let keranjang = [];
        let metodePembayaranAktif = 'Tunai';
        let tipePesananAktif = 'Makan Di Tempat';
        let kategoriFilterAktif = 'Semua';
        let halamanKatalogAktif = 1;
        const ITEM_PER_HALAMAN = 10;
        let halamanKasirAktif = 1;
        const ITEM_PER_HALAMAN_KASIR = 12;

        // Pengaturan Kedai
        let namaKedai    = localStorage.getItem('kedai_nama')   || 'Kedai Kita';
        let logoKedai    = localStorage.getItem('kedai_logo')   || null;
        let pinKedai     = localStorage.getItem('kedai_pin')    || '1234';
        let pinBuffer    = '';

        // Terapkan nama & logo saat halaman dimuat
        function terapkanIdentitasKedai() {
            // Header nama
            const elNama = document.getElementById('headerNamaKedai');
            if (elNama) elNama.textContent = namaKedai;

            // PIN screen nama
            const elPinNama = document.getElementById('pinNamaKedai');
            if (elPinNama) elPinNama.textContent = namaKedai;

            // Header logo
            const elHeaderLogo = document.getElementById('headerLogo');
            if (elHeaderLogo) {
                if (logoKedai) {
                    elHeaderLogo.innerHTML = `<img src="${logoKedai}" class="w-full h-full object-cover" alt="Logo">`;
                } else {
                    elHeaderLogo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`;
                }
            }

            // PIN screen logo
            const elPinLogo = document.getElementById('pinLogo');
            if (elPinLogo) {
                if (logoKedai) {
                    elPinLogo.innerHTML = `<img src="${logoKedai}" class="w-full h-full object-cover" alt="Logo">`;
                    elPinLogo.className = 'w-16 h-16 rounded-2xl overflow-hidden';
                } else {
                    elPinLogo.className = 'w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF6B00] to-[#00D1FF] flex items-center justify-center text-white overflow-hidden';
                }
            }

            // Preview logo di panel pengaturan
            terapkanPreviewLogo();

            // Input nama di pengaturan
            const elInput = document.getElementById('inputNamaKedai');
            if (elInput) elInput.value = namaKedai;
        }

        function terapkanPreviewLogo() {
            const elPreview = document.getElementById('previewLogo');
            if (!elPreview) return;
            if (logoKedai) {
                elPreview.innerHTML = `<img src="${logoKedai}" class="w-full h-full object-cover" alt="Logo">`;
                elPreview.className = 'w-9 h-9 rounded-lg overflow-hidden shrink-0';
            } else {
                elPreview.className = 'w-9 h-9 rounded-lg bg-gradient-to-tr from-[#FF6B00] to-[#00D1FF] flex items-center justify-center text-white overflow-hidden shrink-0';
                elPreview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`;
            }
        }

        function pratinjauLogo(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                logoKedai = ev.target.result;
                terapkanPreviewLogo();
                const btnLabel = document.querySelector('button[onclick*="inputFileLogo"]');
                if (btnLabel) btnLabel.textContent = file.name;
            };
            reader.readAsDataURL(file);
        }

        function simpanPengaturan() {
            const inputNama = document.getElementById('inputNamaKedai');
            const inputPin  = document.getElementById('inputPinBaru');

            // Nama kedai
            const namaBaru = inputNama ? inputNama.value.trim() : '';
            if (namaBaru) {
                namaKedai = namaBaru;
                localStorage.setItem('kedai_nama', namaKedai);
            }

            // Logo (sudah tersimpan di logoKedai lewat pratinjauLogo)
            if (logoKedai) localStorage.setItem('kedai_logo', logoKedai);

            // PIN baru
            if (inputPin && inputPin.value) {
                if (/^\d{4}$/.test(inputPin.value)) {
                    pinKedai = inputPin.value;
                    localStorage.setItem('kedai_pin', pinKedai);
                    inputPin.value = '';
                } else {
                    tunjukkanToast('PIN harus 4 digit angka.', 'error');
                    return;
                }
            }

            terapkanIdentitasKedai();
            tunjukkanToast('Pengaturan berhasil disimpan!', 'success');
        }

        // ─── SISTEM PIN ───
        function pinInput(angka) {
            if (pinBuffer.length >= 4) return;
            pinBuffer += angka;
            updateDotPin();
            if (pinBuffer.length === 4) {
                setTimeout(periksaPin, 150);
            }
        }

        function pinHapus() {
            pinBuffer = pinBuffer.slice(0, -1);
            updateDotPin();
        }

        function updateDotPin() {
            for (let i = 0; i < 4; i++) {
                const dot = document.getElementById(`dot-${i}`);
                if (!dot) continue;
                dot.className = 'w-3 h-3 rounded-full border-2 ' +
                    (i < pinBuffer.length ? 'pin-dot-filled border-[#FF6B00] bg-[#FF6B00]' : 'border-[#3A3A3D]');
            }
        }

        function periksaPin() {
            if (pinBuffer === pinKedai) {
                // Benar — tampilkan app
                document.getElementById('layarPin').style.display = 'none';
                const app = document.getElementById('appUtama');
                app.style.removeProperty('display');
                app.classList.remove('hidden');
            } else {
                // Salah — animasi error
                document.getElementById('pinError').classList.remove('hidden');
                for (let i = 0; i < 4; i++) {
                    const dot = document.getElementById(`dot-${i}`);
                    if (dot) dot.className = 'w-3 h-3 rounded-full border-2 pin-dot-error';
                }
                setTimeout(() => {
                    pinBuffer = '';
                    updateDotPin();
                    document.getElementById('pinError').classList.add('hidden');
                }, 900);
            }
        }

        if (!localStorage.getItem('kedai_menu')) {
            localStorage.setItem('kedai_menu', JSON.stringify(dbMenu));
        }

        // --- CUSTOM TOAST NOTIFICATION ---
        function tunjukkanToast(pesan, tipe = 'success') {
            const container = document.getElementById('toastContainer');
            if (!container) return;

            const toast = document.createElement('div');
            let badgeBg = 'bg-emerald-500';
            if (tipe === 'error') badgeBg = 'bg-red-500';
            if (tipe === 'warning') badgeBg = 'bg-amber-500';

            toast.className = "flex items-center gap-3 p-3 bg-[#2D2D30] border border-[#3A3A3D] rounded-2xl shadow-lg pointer-events-auto min-w-[270px] transition-all duration-300 transform translate-y-5 opacity-0";
            toast.innerHTML = `
                <div class="w-7 h-7 rounded-lg ${badgeBg} flex items-center justify-center text-white text-xs font-black">!</div>
                <div><p class="text-xs font-bold text-white">${pesan}</p></div>
            `;

            container.appendChild(toast);
            setTimeout(() => { toast.classList.remove('translate-y-5', 'opacity-0'); }, 50);
            setTimeout(() => {
                toast.classList.add('translate-y-5', 'opacity-0');
                setTimeout(() => { toast.remove(); }, 300);
            }, 2500);
        }

        // --- SISTEM CUSTOM MODAL ---
        let aksiCallbackModal = null;

        function bukaModalKonfirmasi(judul, deskripsi, callback) {
            document.getElementById('modalTitle').innerText = judul;
            document.getElementById('modalDescription').innerText = deskripsi;
            aksiCallbackModal = callback;

            const modal = document.getElementById('customModal');
            const box = document.getElementById('modalBox');

            modal.classList.remove('hidden');
            modal.classList.add('flex');

            setTimeout(() => {
                box.classList.remove('scale-95', 'opacity-0');
                box.classList.add('scale-100', 'opacity-100');
            }, 50);
        }

        function tutupModal(setuju) {
            const modal = document.getElementById('customModal');
            const box = document.getElementById('modalBox');

            box.classList.remove('scale-100', 'opacity-100');
            box.classList.add('scale-95', 'opacity-0');

            setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                if (setuju && aksiCallbackModal) {
                    aksiCallbackModal();
                }
                aksiCallbackModal = null;
            }, 200);
        }

        // --- SISTEM NAVIGASI TAB ---
        function switchTab(target) {
            const sections = {
                kasir: document.getElementById('tabKasirSection'),
                menu: document.getElementById('tabMenuSection'),
                laporan: document.getElementById('tabLaporanSection')
            };
            const navs = {
                kasir: document.getElementById('navKasir'),
                menu: document.getElementById('navMenu'),
                laporan: document.getElementById('navLaporan')
            };

            Object.keys(sections).forEach(key => {
                if (sections[key]) sections[key].classList.add('hidden');
                if (navs[key]) navs[key].className = "flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs transition duration-200 text-[#888888] hover:text-white";
            });

            if (sections[target]) sections[target].classList.remove('hidden');
            if (navs[target]) navs[target].className = "flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs transition duration-200 bg-[#1A1A1D] text-[#FF6B00] shadow-sm";

            if (target === 'kasir') renderMenuKasir();
            else if (target === 'menu') renderTabelKatalogMenu();
            else if (target === 'laporan') refreshDashboardLaporan();
        }

        // --- TAB 1: OPERASIONAL KASIR ---
        function filterKategori(kategori) {
            kategoriFilterAktif = kategori;
            halamanKasirAktif = 1;
            const buttons = ['Semua', 'Makanan', 'Minuman', 'Snack', 'Dessert', 'Lainnya'];
            buttons.forEach(btn => {
                const el = document.getElementById(`filterBtn-${btn}`);
                if (el) {
                    el.className = (btn === kategori) 
                        ? "px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-[#FF6B00] text-white shadow-sm"
                        : "px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-[#252528] text-[#888888] hover:bg-[#333336]";
                }
            });
            renderMenuKasir();
        }

        function renderMenuKasir() {
            const grid = document.getElementById('gridMenuKasir');
            if (!grid) return;
            grid.innerHTML = '';

            const menuTersaring = dbMenu.filter(item => {
                if (kategoriFilterAktif === 'Semua') return true;
                return item.kategori === kategoriFilterAktif;
            });

            if (menuTersaring.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-16">
                        <p class="text-xs font-bold text-[#888888]">Belum ada menu di kategori ini</p>
                    </div>
                `;
                renderPaginasiKasir(0);
                return;
            }

            const totalItem = menuTersaring.length;
            const totalHalaman = Math.ceil(totalItem / ITEM_PER_HALAMAN_KASIR);
            if (halamanKasirAktif > totalHalaman) halamanKasirAktif = totalHalaman;

            const mulaiIndex = (halamanKasirAktif - 1) * ITEM_PER_HALAMAN_KASIR;
            const itemHalaman = menuTersaring.slice(mulaiIndex, mulaiIndex + ITEM_PER_HALAMAN_KASIR);

            itemHalaman.forEach(item => {
                grid.innerHTML += `
                    <button onclick="masukkanKeKeranjang(${item.id})" class="p-4 bg-[#252528] border border-[#3A3A3D] rounded-2xl text-left hover:border-[#FF6B00] hover:bg-[rgba(255,107,0,0.06)] active:scale-95 transition flex flex-col justify-between h-28 relative group">
                        <span class="absolute top-2 right-2 px-2 py-0.5 bg-[rgba(255,255,255,0.06)] rounded-lg text-[9px] font-bold text-[#888888] uppercase tracking-wide">${item.kategori}</span>
                        <span class="font-extrabold text-white text-xs sm:text-sm leading-snug line-clamp-2 pr-4 mt-2">${item.nama}</span>
                        <span class="text-xs font-black text-[#FF6B00]">Rp ${item.harga.toLocaleString('id-ID')}</span>
                    </button>
                `;
            });

            renderPaginasiKasir(totalItem);
        }

        function renderPaginasiKasir(totalItem) {
            const container = document.getElementById('paginasiKasir');
            if (!container) return;
            container.innerHTML = '';

            if (totalItem === 0) return;

            const totalHalaman = Math.ceil(totalItem / ITEM_PER_HALAMAN_KASIR);
            const mulai = (halamanKasirAktif - 1) * ITEM_PER_HALAMAN_KASIR + 1;
            const akhir = Math.min(halamanKasirAktif * ITEM_PER_HALAMAN_KASIR, totalItem);

            const info = document.createElement('span');
            info.className = 'text-[11px] text-[#888888] font-medium';
            info.innerText = `${mulai}–${akhir} dari ${totalItem} menu`;
            container.appendChild(info);

            if (totalHalaman <= 1) return;

            const nav = document.createElement('div');
            nav.className = 'flex items-center gap-1';

            const btnPrev = document.createElement('button');
            btnPrev.innerHTML = '&#8592;';
            btnPrev.className = 'w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ' +
                (halamanKasirAktif === 1
                    ? 'bg-[#1A1A1D] text-[#444] cursor-not-allowed'
                    : 'bg-[#252528] text-[#CCCCCC] hover:bg-[#333336]');
            btnPrev.disabled = halamanKasirAktif === 1;
            btnPrev.onclick = () => { halamanKasirAktif--; renderMenuKasir(); };
            nav.appendChild(btnPrev);

            for (let i = 1; i <= totalHalaman; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                btn.className = 'w-7 h-7 rounded-lg text-xs font-bold transition ' +
                    (i === halamanKasirAktif
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-[#252528] text-[#CCCCCC] hover:bg-[#333336]');
                btn.onclick = ((hal) => () => { halamanKasirAktif = hal; renderMenuKasir(); })(i);
                nav.appendChild(btn);
            }

            const btnNext = document.createElement('button');
            btnNext.innerHTML = '&#8594;';
            btnNext.className = 'w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ' +
                (halamanKasirAktif === totalHalaman
                    ? 'bg-[#1A1A1D] text-[#444] cursor-not-allowed'
                    : 'bg-[#252528] text-[#CCCCCC] hover:bg-[#333336]');
            btnNext.disabled = halamanKasirAktif === totalHalaman;
            btnNext.onclick = () => { halamanKasirAktif++; renderMenuKasir(); };
            nav.appendChild(btnNext);

            container.appendChild(nav);
        }

        function masukkanKeKeranjang(id) {
            const menu = dbMenu.find(item => item.id === id);
            const itemExist = keranjang.find(item => item.id === id);

            if (itemExist) {
                itemExist.qty++;
            } else {
                keranjang.push({ ...menu, qty: 1 });
            }
            updateKeranjangDisplay();
            tunjukkanToast(`Masuk keranjang: ${menu.nama}`);
        }

        function updateKeranjangDisplay() {
            const container = document.getElementById('listKeranjang');
            if (!container) return;
            container.innerHTML = '';
            let totalVal = 0;

            if (keranjang.length === 0) {
                container.innerHTML = `<div class="text-center py-12"><p class="text-xs font-semibold text-[#888888]">Keranjang masih kosong</p></div>`;
                document.getElementById('labelTotal').innerText = "Rp 0";
                document.getElementById('labelKembalian').innerText = "Rp 0";
                return;
            }

            keranjang.forEach((item, index) => {
                totalVal += item.harga * item.qty;
                container.innerHTML += `
                    <div class="flex justify-between items-center bg-[#252528] border border-[#3A3A3D] p-2.5 rounded-xl text-xs">
                        <div class="max-w-[55%]">
                            <p class="font-bold text-white truncate">${item.nama}</p>
                            <p class="text-[#888888] font-semibold">Rp ${item.harga.toLocaleString('id-ID')}</p>
                        </div>
                        <div class="flex items-center gap-1.5 bg-[#1A1A1D] border border-[#3A3A3D] rounded-lg p-1">
                            <button onclick="ubahKuantitasKeranjang(${index}, -1)" class="w-5 h-5 flex items-center justify-center bg-[#333336] rounded font-bold text-white">-</button>
                            <span class="w-6 text-center font-bold text-white">${item.qty}</span>
                            <button onclick="ubahKuantitasKeranjang(${index}, 1)" class="w-5 h-5 flex items-center justify-center bg-[#333336] rounded font-bold text-white">+</button>
                        </div>
                    </div>
                `;
            });

            document.getElementById('labelTotal').innerText = `Rp ${totalVal.toLocaleString('id-ID')}`;
            hitungSisaKembalian();
        }

        function ubahKuantitasKeranjang(index, delta) {
            keranjang[index].qty += delta;
            if (keranjang[index].qty <= 0) {
                tunjukkanToast(`Dihapus: ${keranjang[index].nama}`, 'warning');
                keranjang.splice(index, 1);
            }
            updateKeranjangDisplay();
        }

        function pemicuResetKeranjang() {
            if (keranjang.length === 0) return;
            bukaModalKonfirmasi("Kosongkan Keranjang", "Menghapus semua pesanan saat ini?", () => {
                keranjang = [];
                updateKeranjangDisplay();
                tunjukkanToast("Keranjang dibersihkan", "warning");
            });
        }

        function setTipePesanan(tipe) {
            tipePesananAktif = tipe;
            const btnDineIn = document.getElementById('btnTipeDineIn');
            const btnTakeAway = document.getElementById('btnTipeTakeAway');

            if (tipe === 'Makan Di Tempat') {
                btnDineIn.className = "py-2 rounded-lg text-xs font-bold transition-all bg-[#1A1A1D] text-[#FF6B00] shadow-sm";
                btnTakeAway.className = "py-2 rounded-lg text-xs font-bold transition-all text-[#888888] hover:text-white";
            } else {
                btnTakeAway.className = "py-2 rounded-lg text-xs font-bold transition-all bg-[#1A1A1D] text-[#FF6B00] shadow-sm";
                btnDineIn.className = "py-2 rounded-lg text-xs font-bold transition-all text-[#888888] hover:text-white";
            }
            tunjukkanToast(`Layanan diubah: ${tipe}`);
        }

        function setMetodePembayaran(metode) {
            metodePembayaranAktif = metode;
            const btnTunai = document.getElementById('btnMetodeTunai');
            const btnQRIS = document.getElementById('btnMetodeQRIS');
            const tContainer = document.getElementById('formTunaiContainer');
            const qContainer = document.getElementById('formQRISContainer');

            if (metode === 'Tunai') {
                if (btnTunai) btnTunai.className = "py-2.5 rounded-xl text-xs font-bold transition bg-[#FF6B00] text-white shadow-sm flex items-center justify-center gap-1.5";
                if (btnQRIS) btnQRIS.className = "py-2.5 rounded-xl text-xs font-bold transition bg-[#252528] text-[#888888] hover:bg-[#333336] flex items-center justify-center gap-1.5";
                if (tContainer) tContainer.classList.remove('hidden');
                if (qContainer) qContainer.classList.add('hidden');
            } else {
                if (btnQRIS) btnQRIS.className = "py-2.5 rounded-xl text-xs font-bold transition bg-[#FF6B00] text-white shadow-sm flex items-center justify-center gap-1.5";
                if (btnTunai) btnTunai.className = "py-2.5 rounded-xl text-xs font-bold transition bg-[#252528] text-[#888888] hover:bg-[#333336] flex items-center justify-center gap-1.5";
                if (tContainer) tContainer.classList.add('hidden');
                if (qContainer) qContainer.classList.remove('hidden');
            }
            hitungSisaKembalian();
        }

        function hitungSisaKembalian() {
            const total = keranjang.reduce((sum, item) => sum + (item.harga * item.qty), 0);
            const inputBayar = parseFloat(document.getElementById('inputBayar').value) || 0;
            const kembali = inputBayar - total;

            const label = document.getElementById('labelKembalian');
            if (!label) return;
            if (inputBayar === 0) {
                label.innerText = "Rp 0";
                label.className = "text-white font-bold";
            } else if (kembali >= 0) {
                label.innerText = `Rp ${kembali.toLocaleString('id-ID')}`;
                label.className = "text-[#00D1FF] font-bold text-sm";
            } else {
                label.innerText = "Uang Kurang";
                label.className = "text-red-500 font-bold";
            }
        }

        function prosesBayar() {
            const total = keranjang.reduce((sum, item) => sum + (item.harga * item.qty), 0);
            const namaPelanggan = document.getElementById('namaPelanggan').value.trim() || 'Umum';
            const inputBayar = parseFloat(document.getElementById('inputBayar').value) || 0;

            if (keranjang.length === 0) return tunjukkanToast("Keranjang Anda masih kosong!", "error");
            if (metodePembayaranAktif === 'Tunai' && inputBayar < total) return tunjukkanToast("Uang tunai pelanggan tidak mencukupi!", "error");

            bukaModalKonfirmasi("Proses Transaksi", `Proses pembayaran senilai Rp ${total.toLocaleString('id-ID')}?`, () => {
                eksekusiTransaksi(total, namaPelanggan, inputBayar);
            });
        }

        function eksekusiTransaksi(total, namaPelanggan, inputBayar) {
            const dateObj = new Date();
            const formatTgl = dateObj.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const formatWaktu = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

            const transaksiBaru = {
                id: 'TRX-' + Date.now(),
                timestamp: Date.now(),
                tanggal: formatTgl,
                waktu: formatWaktu,
                pelanggan: namaPelanggan,
                tipe: tipePesananAktif,
                items: [...keranjang],
                total: total,
                metode: metodePembayaranAktif,
                bayar: metodePembayaranAktif === 'Tunai' ? inputBayar : total,
                kembali: metodePembayaranAktif === 'Tunai' ? (inputBayar - total) : 0
            };

            dbTransaksi.push(transaksiBaru);
            localStorage.setItem('kedai_transaksi', JSON.stringify(dbTransaksi));

            // Siapkan Elemen Struk Cetak Fisik
            document.getElementById('strukTgl').innerText = formatTgl;
            document.getElementById('strukWaktu').innerText = formatWaktu;
            document.getElementById('strukNamaPelanggan').innerText = namaPelanggan;
            document.getElementById('strukTipePesanan').innerText = tipePesananAktif;
            
            const strukItemBelanja = document.getElementById('strukItemBelanja');
            strukItemBelanja.innerHTML = '';
            keranjang.forEach(item => {
                strukItemBelanja.innerHTML += `
                    <div style="display: flex; justify-content: space-between;">
                        <span style="max-width: 65%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.nama}</span>
                        <span>${item.qty} x ${item.harga.toLocaleString('id-ID')}</span>
                    </div>
                `;
            });

            document.getElementById('strukSubtotal').innerText = `Rp ${total.toLocaleString('id-ID')}`;
            document.getElementById('strukMetode').innerText = metodePembayaranAktif;

            const tunaiSection = document.getElementById('strukTunaiSection');
            if (metodePembayaranAktif === 'Tunai') {
                if (tunaiSection) tunaiSection.classList.remove('hidden');
                document.getElementById('strukBayarTunai').innerText = `Rp ${inputBayar.toLocaleString('id-ID')}`;
                document.getElementById('strukKembaliTunai').innerText = `Rp ${(inputBayar - total).toLocaleString('id-ID')}`;
            } else {
                if (tunaiSection) tunaiSection.classList.add('hidden');
            }

            // Pemicu Printer native browser
            tunjukkanToast("Sedang mencetak struk...", "warning");
            setTimeout(() => {
                window.print();
                
                // Reset setelah print dialog ditutup/proses selesai
                keranjang = [];
                document.getElementById('namaPelanggan').value = '';
                document.getElementById('inputBayar').value = '';
                updateKeranjangDisplay();
                tunjukkanToast("Transaksi Berhasil!", "success");
            }, 300);
        }

        // --- TAB 2: MANAJEMEN MENU KATALOG ---
        function renderTabelKatalogMenu(resetHalaman = false) {
            if (resetHalaman) halamanKatalogAktif = 1;

            const tbody = document.getElementById('tabelDaftarMenu');
            if (!tbody) return;
            tbody.innerHTML = '';

            if (dbMenu.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" class="text-center py-10 text-[#888888] font-bold uppercase tracking-wider text-[10px]">Katalog Kosong</td></tr>`;
                renderPaginasiKatalog(0);
                return;
            }

            const totalItem = dbMenu.length;
            const totalHalaman = Math.ceil(totalItem / ITEM_PER_HALAMAN);
            if (halamanKatalogAktif > totalHalaman) halamanKatalogAktif = totalHalaman;

            const mulaiIndex = (halamanKatalogAktif - 1) * ITEM_PER_HALAMAN;
            const itemHalaman = dbMenu.slice(mulaiIndex, mulaiIndex + ITEM_PER_HALAMAN);

            itemHalaman.forEach(item => {
                tbody.innerHTML += `
                    <tr class="hover:bg-[#333336] border-b border-[#3A3A3D] transition duration-150">
                        <td class="py-3.5 pl-2 font-bold text-white">${item.nama}</td>
                        <td class="py-3.5"><span class="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[rgba(255,107,0,0.12)] text-[#FF6B00] uppercase tracking-widest">${item.kategori}</span></td>
                        <td class="py-3.5 text-right font-semibold text-[#CCCCCC]">Rp ${item.harga.toLocaleString('id-ID')}</td>
                        <td class="py-3.5 text-center">
                            <div class="flex justify-center gap-2">
                                <button onclick="pilihEditMenu(${item.id})" class="text-[10px] font-bold bg-[rgba(245,158,11,0.12)] text-amber-400 border border-[rgba(245,158,11,0.25)] px-3 py-1.5 rounded-xl hover:bg-[rgba(245,158,11,0.2)] transition">Ubah</button>
                                <button onclick="pemicuHapusMenu(${item.id})" class="text-[10px] font-bold bg-[rgba(239,68,68,0.12)] text-red-400 border border-[rgba(239,68,68,0.25)] px-3 py-1.5 rounded-xl hover:bg-[rgba(239,68,68,0.2)] transition">Hapus</button>
                            </div>
                        </td>
                    </tr>
                `;
            });

            renderPaginasiKatalog(totalItem);
        }

        function renderPaginasiKatalog(totalItem) {
            const container = document.getElementById('paginasiKatalog');
            if (!container) return;
            container.innerHTML = '';

            if (totalItem === 0) return;

            const totalHalaman = Math.ceil(totalItem / ITEM_PER_HALAMAN);
            const mulai = (halamanKatalogAktif - 1) * ITEM_PER_HALAMAN + 1;
            const akhir = Math.min(halamanKatalogAktif * ITEM_PER_HALAMAN, totalItem);

            // Info
            const info = document.createElement('span');
            info.className = 'text-[11px] text-[#888888] font-medium';
            info.innerText = `Menampilkan ${mulai}–${akhir} dari ${totalItem} menu`;
            container.appendChild(info);

            if (totalHalaman <= 1) return;

            // Tombol navigasi
            const nav = document.createElement('div');
            nav.className = 'flex items-center gap-1';

            const btnPrev = document.createElement('button');
            btnPrev.innerHTML = '&#8592;';
            btnPrev.className = 'w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center ' +
                (halamanKatalogAktif === 1
                    ? 'bg-[#1A1A1D] text-[#444] cursor-not-allowed'
                    : 'bg-[#252528] text-[#CCCCCC] hover:bg-[#333336]');
            btnPrev.disabled = halamanKatalogAktif === 1;
            btnPrev.onclick = () => { halamanKatalogAktif--; renderTabelKatalogMenu(); };
            nav.appendChild(btnPrev);

            // Nomor halaman
            for (let i = 1; i <= totalHalaman; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                btn.className = 'w-8 h-8 rounded-lg text-xs font-bold transition ' +
                    (i === halamanKatalogAktif
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-[#252528] text-[#CCCCCC] hover:bg-[#333336]');
                btn.onclick = ((hal) => () => { halamanKatalogAktif = hal; renderTabelKatalogMenu(); })(i);
                nav.appendChild(btn);
            }

            const btnNext = document.createElement('button');
            btnNext.innerHTML = '&#8594;';
            btnNext.className = 'w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center ' +
                (halamanKatalogAktif === totalHalaman
                    ? 'bg-[#1A1A1D] text-[#444] cursor-not-allowed'
                    : 'bg-[#252528] text-[#CCCCCC] hover:bg-[#333336]');
            btnNext.disabled = halamanKatalogAktif === totalHalaman;
            btnNext.onclick = () => { halamanKatalogAktif++; renderTabelKatalogMenu(); };
            nav.appendChild(btnNext);

            container.appendChild(nav);
        }

        function handleSimpanMenu(e) {
            e.preventDefault();
            const idInput = document.getElementById('formMenuId').value;
            const nama = document.getElementById('formNama').value.trim();
            const kategori = document.getElementById('formKategori').value;
            const harga = parseFloat(document.getElementById('formHarga').value) || 0;

            if (idInput) {
                const index = dbMenu.findIndex(item => item.id == idInput);
                if (index !== -1) {
                    dbMenu[index] = { id: parseInt(idInput), nama, kategori, harga };
                    tunjukkanToast("Menu diperbarui!");
                }
            } else {
                dbMenu.push({ id: Date.now(), nama, kategori, harga });
                tunjukkanToast("Menu baru ditambahkan!");
            }

            localStorage.setItem('kedai_menu', JSON.stringify(dbMenu));
            resetFormMenu();
            renderTabelKatalogMenu(true);
        }

        function pilihEditMenu(id) {
            const menu = dbMenu.find(item => item.id === id);
            if (!menu) return;

            document.getElementById('formMenuId').value = menu.id;
            document.getElementById('formNama').value = menu.nama;
            document.getElementById('formKategori').value = menu.kategori;
            document.getElementById('formHarga').value = menu.harga;

            document.getElementById('formMenuHeader').innerText = `✏️ Ubah Data Menu`;
            document.getElementById('btnBatalEditMenu').classList.remove('hidden');
        }

        function pemicuHapusMenu(id) {
            const menu = dbMenu.find(item => item.id === id);
            if (!menu) return;

            bukaModalKonfirmasi("Hapus Menu", `Apakah Anda yakin ingin menghapus '${menu.nama}'?`, () => {
                dbMenu = dbMenu.filter(item => item.id !== id);
                localStorage.setItem('kedai_menu', JSON.stringify(dbMenu));
                renderTabelKatalogMenu(true);
                tunjukkanToast("Menu dihapus", "warning");
            });
        }

        function resetFormMenu() {
            document.getElementById('formInputMenu').reset();
            document.getElementById('formMenuId').value = '';
            document.getElementById('formMenuHeader').innerText = `➕ Tambah Menu Baru`;
            document.getElementById('btnBatalEditMenu').classList.add('hidden');
        }

        // --- TAB 3: DASHBOARD LAPORAN & REKAP ---
        function refreshDashboardLaporan() {
            const hariIniLokal = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const trxHariIni = dbTransaksi.filter(trx => trx.tanggal === hariIniLokal);
            
            const totalPendapatanHariIni = trxHariIni.reduce((sum, t) => sum + t.total, 0);
            document.getElementById('dashboardHariIni').innerText = `Rp ${totalPendapatanHariIni.toLocaleString('id-ID')}`;
            document.getElementById('dashboardTrxHariIni').innerText = trxHariIni.length;

            let tunaiCount = 0, qrisCount = 0;
            trxHariIni.forEach(t => {
                if (t.metode === 'Tunai') tunaiCount++;
                else if (t.metode === 'QRIS') qrisCount++;
            });
            document.getElementById('dashboardMetodePopuler').innerText = (tunaiCount > 0 || qrisCount > 0) 
                ? (tunaiCount >= qrisCount ? `Tunai (${tunaiCount})` : `QRIS (${qrisCount})`) 
                : '-';

            const frekuensiProduk = {};
            dbTransaksi.forEach(t => {
                if (Array.isArray(t.items)) {
                    t.items.forEach(item => {
                        frekuensiProduk[item.nama] = (frekuensiProduk[item.nama] || 0) + item.qty;
                    });
                }
            });

            let produkTerlaris = "Belum Ada Data", qtyTerlaris = 0;
            Object.keys(frekuensiProduk).forEach(nama => {
                if (frekuensiProduk[nama] > qtyTerlaris) {
                    produkTerlaris = nama;
                    qtyTerlaris = frekuensiProduk[nama];
                }
            });

            document.getElementById('dashboardMenuTerlaris').innerText = produkTerlaris;
            document.getElementById('dashboardMenuTerlarisQty').innerText = `${qtyTerlaris} pcs`;

            renderRiwayatList();
            renderGrafikHarian();
        }

        function renderRiwayatList() {
            const container = document.getElementById('listRiwayatTransaksi');
            if (!container) return;
            container.innerHTML = '';

            const hariIniLokal = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const trxHariIni = dbTransaksi.filter(trx => trx.tanggal === hariIniLokal);

            if (trxHariIni.length === 0) {
                container.innerHTML = `<div class="text-center py-10 text-[#888888] text-xs font-bold uppercase tracking-wider">Belum Ada Transaksi Hari Ini</div>`;
                return;
            }

            const listDibalik = [...trxHariIni].reverse().slice(0, 15);
            listDibalik.forEach(t => {
                const badgeMetode = t.metode === 'Tunai' 
                    ? '<span class="px-2 py-0.5 bg-[rgba(16,185,129,0.12)] text-emerald-400 text-[9px] font-black rounded border border-[rgba(16,185,129,0.25)]">TUNAI</span>'
                    : '<span class="px-2 py-0.5 bg-[rgba(255,107,0,0.12)] text-[#FF6B00] text-[9px] font-black rounded border border-[rgba(255,107,0,0.2)]">QRIS</span>';

                const badgeTipe = t.tipe === 'Makan Di Tempat'
                    ? '<span class="px-2 py-0.5 bg-[rgba(59,130,246,0.12)] text-blue-400 text-[9px] font-bold rounded">Dine In</span>'
                    : '<span class="px-2 py-0.5 bg-[rgba(249,115,22,0.12)] text-orange-400 text-[9px] font-bold rounded">Take Away</span>';

                const totalItems = Array.isArray(t.items) ? t.items.length : 0;

                container.innerHTML += `
                    <div class="p-3.5 bg-[#252528] border border-[#3A3A3D] rounded-2xl flex justify-between items-center text-xs">
                        <div>
                            <div class="flex items-center gap-1.5 flex-wrap">
                                <span class="font-extrabold text-white">${t.pelanggan || 'Umum'}</span>
                                ${badgeMetode}
                                ${badgeTipe}
                            </div>
                            <span class="text-[10px] text-[#888888] font-bold block mt-1">${t.tanggal} - ${t.waktu}</span>
                        </div>
                        <div class="text-right">
                            <p class="font-black text-white">Rp ${t.total.toLocaleString('id-ID')}</p>
                            <p class="text-[9px] text-[#888888] font-semibold">${totalItems} menu pesanan</p>
                        </div>
                    </div>
                `;
            });
        }

        function renderGrafikHarian() {
            const grafik = document.getElementById('grafikRekapMingguan');
            if (!grafik) return;
            grafik.innerHTML = '';

            const daftarHari = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const stringTgl = d.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
                const namaHari = d.toLocaleDateString('id-ID', { weekday: 'short' });
                daftarHari.push({ tanggal: stringTgl, label: namaHari, totalOmzet: 0 });
            }

            let nilaiMaksimum = 50000; 
            daftarHari.forEach(hari => {
                const trxHariIni = dbTransaksi.filter(t => t.tanggal === hari.tanggal);
                hari.totalOmzet = trxHariIni.reduce((sum, item) => sum + item.total, 0);
                if (hari.totalOmzet > nilaiMaksimum) nilaiMaksimum = hari.totalOmzet;
            });

            daftarHari.forEach(hari => {
                const persentaseTinggi = (hari.totalOmzet / nilaiMaksimum) * 100;
                grafik.innerHTML += `
                    <div class="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer relative">
                        <span class="absolute bottom-full mb-1 bg-[#111113] border border-[#3A3A3D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10 pointer-events-none">
                            Rp ${hari.totalOmzet.toLocaleString('id-ID')}
                        </span>
                        <div style="height: ${persentaseTinggi}%;" class="w-7 sm:w-10 bg-[#FF6B00] rounded-t-md group-hover:bg-[#00D1FF] transition duration-200"></div>
                        <span class="text-[10px] font-black text-[#888888] mt-2">${hari.label}</span>
                    </div>
                `;
            });
        }

        // --- SISTEM EKSPOR LAPORAN CSV HARIAN ---
        function eksporLaporanHarian() {
            const hariIniLokal = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const trxHariIni = dbTransaksi.filter(trx => trx.tanggal === hariIniLokal);

            if (trxHariIni.length === 0) {
                return tunjukkanToast("Belum ada data transaksi dicatat hari ini!", "error");
            }

            bukaModalKonfirmasi("Ekspor Laporan harian", `Unduh data penjualan hari ini (${hariIniLokal})?`, () => {
                eksekusiDownloadCSV(trxHariIni, hariIniLokal);
            });
        }

        function eksekusiDownloadCSV(transaksi, tanggal) {
            let csvContent = "ID TRANSAKSI,WAKTU,PELANGGAN,TIPE LAYANAN,DETAIL BELANJA,TOTAL BELANJA,METODE\n";

            transaksi.forEach(trx => {
                let detailItems = trx.items.map(i => `${i.nama} (x${i.qty})`).join('; ');
                let pelangganAman = trx.pelanggan.replace(/,/g, ' ');
                let detailItemsAman = detailItems.replace(/,/g, ' ');
                let tipeAman = trx.tipe || 'Makan Di Tempat';

                csvContent += `${trx.id},${trx.waktu},${pelangganAman},${tipeAman},"${detailItemsAman}",${trx.total},${trx.metode}\n`;
            });

            try {
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                
                link.setAttribute("href", url);
                link.setAttribute("download", `Laporan_Kedai_${tanggal.replace(/\//g, '-')}.csv`);
                link.style.visibility = 'hidden';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                tunjukkanToast("File laporan (.csv) berhasil diunduh!", "success");
            } catch (err) {
                console.error("Gagal ekspor CSV:", err);
                tunjukkanToast("Gagal mengunduh file.", "error");
            }
        }

        // --- BACKUP & LOAD DATABASE ---
        function backupDatabase() {
            const tglSekarang = new Date();
            const labelTgl = tglSekarang.toLocaleDateString('id-ID', {
                year: 'numeric', month: '2-digit', day: '2-digit'
            }).replace(/\//g, '-');
            const labelWaktu = tglSekarang.toLocaleTimeString('id-ID', {
                hour: '2-digit', minute: '2-digit'
            }).replace(':', '');

            const payload = {
                versi: '1.0',
                aplikasi: 'Kasir Kedai',
                tanggalBackup: tglSekarang.toISOString(),
                menu: dbMenu,
                transaksi: dbTransaksi
            };

            try {
                const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Backup_Kedai_${labelTgl}_${labelWaktu}.json`;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                tunjukkanToast(`Backup berhasil disimpan!`, 'success');
            } catch (err) {
                console.error('Gagal backup:', err);
                tunjukkanToast('Gagal membuat file backup.', 'error');
            }
        }

        function loadDatabase() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.style.display = 'none';

            input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const data = JSON.parse(ev.target.result);

                        if (!Array.isArray(data.menu) || !Array.isArray(data.transaksi)) {
                            throw new Error('Struktur file tidak valid');
                        }

                        const tglBackup = data.tanggalBackup
                            ? new Date(data.tanggalBackup).toLocaleDateString('id-ID', {
                                day: '2-digit', month: 'long', year: 'numeric',
                                hour: '2-digit', minute: '2-digit'
                              })
                            : 'tidak diketahui';

                        bukaModalKonfirmasi(
                            'Muat Database',
                            `Restore dari backup tanggal ${tglBackup}? Berisi ${data.menu.length} menu dan ${data.transaksi.length} transaksi. Data saat ini akan digantikan.`,
                            () => {
                                dbMenu = data.menu;
                                dbTransaksi = data.transaksi;
                                localStorage.setItem('kedai_menu', JSON.stringify(dbMenu));
                                localStorage.setItem('kedai_transaksi', JSON.stringify(dbTransaksi));
                                renderMenuKasir();
                                renderTabelKatalogMenu(true);
                                refreshDashboardLaporan();
                                tunjukkanToast(`Database berhasil dimuat! ${data.menu.length} menu, ${data.transaksi.length} transaksi.`, 'success');
                            }
                        );
                    } catch (err) {
                        console.error('Gagal load database:', err);
                        tunjukkanToast('File tidak valid atau bukan file backup yang benar.', 'error');
                    }
                };
                reader.readAsText(file);
            };

            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);
        }

        function pemicuResetTransaksi() {
            bukaModalKonfirmasi("Hapus Semua Riwayat", "Ingin mengosongkan seluruh database riwayat transaksi lokal secara permanen?", () => {
                dbTransaksi = [];
                localStorage.setItem('kedai_transaksi', JSON.stringify([]));
                refreshDashboardLaporan();
                tunjukkanToast("Seluruh riwayat dibersihkan", "warning");
            });
        }

        // Jalankan render awal
        window.onload = function() {
            terapkanIdentitasKedai();
            renderMenuKasir();
        };