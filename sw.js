const CACHE_NAME = 'kasir-kedai-v1';

const ASSETS_LOKAL = [
    './',
    './kasir.html',
    './kasir.css',
    './kasir.js'
];

const ASSETS_CDN = [
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap'
];

// Saat pertama kali aktif: cache semua aset
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            await cache.addAll(ASSETS_LOKAL);
            // CDN dicoba satu per satu, gagal tidak masalah
            for (const url of ASSETS_CDN) {
                try { await cache.add(url); } catch (_) {}
            }
        })
    );
    self.skipWaiting();
});

// Bersihkan cache versi lama
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// Strategi: cache-first, fallback ke network
self.addEventListener('fetch', (e) => {
    // Hanya tangani GET
    if (e.request.method !== 'GET') return;

    e.respondWith(
        caches.match(e.request).then(cached => {
            if (cached) return cached;
            return fetch(e.request).then(response => {
                // Simpan respons segar ke cache
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                }
                return response;
            }).catch(() => cached); // Jika offline dan tidak ada cache, kembalikan apa yang ada
        })
    );
});
