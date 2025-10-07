// Service Worker for Centro Médico Universal
// Enables offline functionality and improves mobile performance

const CACHE_NAME = 'cmu-v1.0.0';
const urlsToCache = [
  '/',
  '/login.html',
  '/dashboard-supabase.html',
  '/patients.html',
  '/appointments.html',
  '/schedule-management.html',
  '/change-password.html',
  '/css/mobile-responsive.css',
  '/js/security.js',
  '/js/mobile-enhancements.js',
  '/images/logo/cmu-logo-new.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-appointments') {
    event.waitUntil(syncAppointments());
  }
});

async function syncAppointments() {
  // Sync offline appointments when back online
  const cache = await caches.open(CACHE_NAME);
  // Implementation for syncing offline data
}

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/images/logo/cmu-logo-new.png',
    badge: '/images/logo/cmu-logo-new.png'
  };

  event.waitUntil(
    self.registration.showNotification('Centro Médico Universal', options)
  );
});
