const CACHE_NAME = 'micorp-cache-v2'; // Incremented version for updates
const urlsToCache = [
  // HTML Pages (relative to sw.js in root)
  './pages/index.html',
  './pages/about.html',
  './pages/products.html',
  './pages/it-products.html',
  './pages/automobiles.html',
  './pages/why-choose-us.html',
  './pages/clients.html',
  './pages/contact.html',
  // CSS (relative to sw.js in root)
  './css/style.css',
  './css/animations.css',
  './css/clients.css',
  // JS (relative to sw.js in root)
  './js/main.js',
  './js/animations.js',
  './js/clients.js',
  // Key Assets (relative to sw.js in root)
  './assets/images/MiCORP_Logo.jpg',
  './assets/images/Home%20page%20Background.jpg', // URL encoded space
  './assets/images/About_us_office.avif',
  // PWA Icons (Ensure these paths are correct and files exist)
  './assets/images/icons/icon-192x192.png',
  './assets/images/icons/icon-512x512.png',
  // External resources (CDNs) - caching these improves offline capability and load speed
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', // Used on some pages
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
  // Consider adding more key images if they are crucial for the app shell
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Activate new service worker immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching core assets');
        // Use 'reload' to ensure fresh copies are fetched during install for app shell files
        const cachePromises = urlsToCache.map(urlToCache => {
            return cache.add(new Request(urlToCache, {cache: 'reload'})).catch(err => {
                console.warn(`Failed to cache ${urlToCache}:`, err);
            });
        });
        return Promise.all(cachePromises);
      })
      .catch(err => {
        console.error('Cache open/addAll failed during install:', err);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Let SW take control of open clients
  );
});

self.addEventListener('fetch', event => {
  // Let browser handle non-GET requests
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // For HTML navigation requests, use a Network Falling Back to Cache strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If response is good, cache it (optional for navigation, could fill cache quickly)
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request)
            .then(response => {
              return response; // || caches.match('./pages/offline.html'); // Optional offline page
            });
        })
    );
    return;
  }

  // For other assets (CSS, JS, images), use Cache Falling Back to Network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
            // Don't cache error responses or opaque responses unless strategic
            return networkResponse;
          }
          // Cache the new resource if it's not a chrome-extension or wa.me
          if (!event.request.url.startsWith('chrome-extension://') && !event.request.url.includes('wa.me')) {
            let responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return networkResponse;
        }).catch(error => {
            console.warn('Fetch failed for:', event.request.url, error);
            // Optionally return a placeholder for images or a generic offline response
        });
      })
  );
});