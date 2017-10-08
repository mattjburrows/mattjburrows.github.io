const CACHE_VERSION = 2;
const CACHE_NAME = `MJB::${CACHE_VERSION}`;
const CACHE_FILES = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css?family=Merriweather:300,700',
  'css/screen.css',
  '/js/vendor/modernizr.custom.min.js',
  '/js/global.min.js',
  '/images/profile-photo.jpg'
];

importScripts('/js/lib/cache-polyfill.js');

self.addEventListener('install', installListener);
self.addEventListener('fetch', fetchListener);
self.addEventListener('activate', activateListener);

function installListener(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
  );
}

function fetchListener(event) {
  const request = event.request;

  event.respondWith(
    caches.open(CACHE_NAME)
      .then(getFileFromCacheOrFetch(request))
      .catch((err) => {
        console.error(`FETCH ERROR: err`);

        throw err;
      })
  );
}

function getFileFromCacheOrFetch(request) {
  const clonedRequest = request.clone();

  return (cache) => {
    return cache.match(clonedRequest).then((response) => {
      if (response) return response;

      return fetchFile(cache, clonedRequest);
    });
  }
}

function fetchFile(cache, request) {
  return fetch(request).then((response) => {
    if (isFontFile(response)) cache.put(request, response.clone());

    return response;
  });
}

function isFontFile(response) {
  return (
    (response.status < 400) &&
    (
      response.headers.has('content-type') &&
      response.headers.get('content-type').match(/^font\//i)
    )
  );
}

function activateListener(event) {
  caches.keys().then(deleteUnusedCaches);

  return self.clients.claim();
}

function deleteUnusedCaches(cacheNames) {
  return Promise.all(
    cacheNames.map((cache) => {
      if (cache.indexOf(CACHE_NAME) === -1) return caches.delete(cache);

      return Promise.resolve(`${CACHE_NAME} in use`);
    })
  );
}
