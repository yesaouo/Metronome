let cacheName = "store-v1.2";
var assets = [
    '/Metronome/',
    '/Metronome/index.html',
    '/Metronome/img/minus.png',
    '/Metronome/img/music.png',
    '/Metronome/img/remove.png',
    '/Metronome/img/search.png',
    '/Metronome/music/1.mp3',
    '/Metronome/music/1_special.mp3',
    '/Metronome/music/alert.mp3'
];

self.addEventListener('install', (e) => {
    console.log("installing...");
    e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
});
self.addEventListener("activate", (e) => {
    console.log("ready to handle fetches!");
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== cacheName) {return caches.delete(key);}
                })
            );
        })
    );
});  
self.addEventListener('fetch', (e) => {
    console.log("fetch", e.request.url);
    e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});