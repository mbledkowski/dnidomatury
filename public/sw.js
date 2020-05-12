self.addEventListener('install', event => {
  event.waitUntil( //"event.waitUntil takes a promise to define the length & success of the install. If the promise rejects, the installation is considered a failure and this ServiceWorker will be abandoned" Source: developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook
    caches.open('dnidomatury').then(cache => {
      cache.addAll([ //"We're not passing the cache.addAll promise [...] back to event.waitUntil, so even if it fails, the game will still be available offline." Same source as above.
        'favicon-32x32.png',
        '/miesiące',
        '/godziny',
        '/minuty',
        '/2021',
        '/miesiące/2021',
        '/godziny/2021',
        '/minuty/2021',
        '/2022',
        '/miesiące/2022',
        '/godziny/2022',
        '/minuty/2022',
        '/2023',
        '/miesiące/2023',
        '/godziny/2023',
        '/minuty/2023',
        '/2024',
        '/miesiące/2024',
        '/godziny/2024',
        '/minuty/2024',
        '/img/social/github.svg',
        '/img/social/instagram.svg',
        '/img/social/linkedin.svg'
      ])
      return cache.addAll([
        '/',
        '/css/main.css',
        '/css/320andless.css',
        '/js/countdown-min.js',
        '/js/rendertime-min.js'
      ])
    })
  )
})

let cachingDuration = 18 * 3600000 //18 hours
let expirationDate = 0
self.addEventListener('fetch', event => {
  if (!navigator.onLine || (expirationDate > Date.now())) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    )
  } else {
    expirationDate = new Date(Date.now() + cachingDuration).getTime()
    caches.keys().then((names) => {
      for (let name of names) { caches.delete(name) }
    })
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request)
      })
    )
  }
})
