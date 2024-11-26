//service worker
const VERSION = "v1";
const CACHE_NAME = "cache_" + VERSION;
const APP_STATIC_RESOURCES = [
	"/pwa-presentation/",
	"/pwa-presentation/index.html",
	"/pwa-presentation/app.js",
	"/pwa-presentation/icon-512x512.png",
];

//cache static resources
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(APP_STATIC_RESOURCES);
		})
	);
});

//delete old cache when new service worker is activated
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
