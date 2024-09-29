var APP_PREFIX = 'pivot_';
var VERSION = 'version_040';

// Detect the base path dynamically
var BASE_PATH = self.location.pathname.includes('/Pivot-App/') ? '/Pivot-App/' : '/';

const URLS = [
  `${BASE_PATH}`,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}css/styles.css`,
  `${BASE_PATH}js/app.js`,
  `${BASE_PATH}js/tasks.js`,
  `${BASE_PATH}js/auth.js`
];

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
});

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return Promise.all(
        URLS.map(function(url) {
          return cache.add(url).catch((error) => {
            console.error('Failed to cache ' + url + ':', error);
            // Handle the failed request here (e.g., retry later or skip it)
          });
        })
      );
    })
  );
});


self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
});