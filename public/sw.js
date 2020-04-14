self.addEventListener('install', event => {
  event.waitUntil( //"event.waitUntil takes a promise to define the length & success of the install. If the promise rejects, the installation is considered a failure and this ServiceWorker will be abandoned" Source: developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook
    caches.open('dnidomatury').then(cache => {
      cache.addAll([ //"We're not passing the cache.addAll promise for levels 11-20 back to event.waitUntil, so even if it fails, the game will still be available offline." Same source as above.
        '/miesiące',
        '/godziny',
        '/minuty',
        '/img/social/github.svg',
        '/img/social/instagram.svg',
        '/img/social/linkedin.svg',
      ])
      return cache.addAll([
        '/',
        '/css/style.css',
        '/js/countdown.js',
        '/js/rendertime.js'
      ])
    })
  )
})
/*
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.filter(cacheName => {
        return true
      })).map(cacheName => {
        return caches.delete(cacheName)
      })
    })
  )
})*/

self.addEventListener('fetch', event => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request)
    )
  } else {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request)
      })
    )
  }
})