if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const d=e=>a(e,n),f={module:{uri:n},exports:t,require:d};s[n]=Promise.all(c.map((e=>f[e]||d(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1051b61c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/CZFhK005iQqPolWO5l1Dx/_buildManifest.js",revision:"d85651977dff421fc3ebf837e8f782c5"},{url:"/_next/static/CZFhK005iQqPolWO5l1Dx/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/02935b41-88fc92e1579041fe.js",revision:"88fc92e1579041fe"},{url:"/_next/static/chunks/1176.ae561e78e253d3a6.js",revision:"ae561e78e253d3a6"},{url:"/_next/static/chunks/1447.e8537fe941a05b9a.js",revision:"e8537fe941a05b9a"},{url:"/_next/static/chunks/2060-f2a466f4aedf59a3.js",revision:"f2a466f4aedf59a3"},{url:"/_next/static/chunks/4658.6195d1efe569ad2d.js",revision:"6195d1efe569ad2d"},{url:"/_next/static/chunks/4a5bdccf-78fed05a94cd2e45.js",revision:"78fed05a94cd2e45"},{url:"/_next/static/chunks/59b4e022-86374dd32e8a14b6.js",revision:"86374dd32e8a14b6"},{url:"/_next/static/chunks/69bd6bf3-886551d6198b8d46.js",revision:"886551d6198b8d46"},{url:"/_next/static/chunks/72585f70-b8ce88d54edd8716.js",revision:"b8ce88d54edd8716"},{url:"/_next/static/chunks/7384.cd2ca985f0349d2b.js",revision:"cd2ca985f0349d2b"},{url:"/_next/static/chunks/7442.5b976f835d63559a.js",revision:"5b976f835d63559a"},{url:"/_next/static/chunks/7468.50bf88f416407735.js",revision:"50bf88f416407735"},{url:"/_next/static/chunks/80ecdbd0-c5a27f8d8e4e634c.js",revision:"c5a27f8d8e4e634c"},{url:"/_next/static/chunks/81ca6f2a-7c06a2c46b670ece.js",revision:"7c06a2c46b670ece"},{url:"/_next/static/chunks/839.bf11664f83e34312.js",revision:"bf11664f83e34312"},{url:"/_next/static/chunks/8eec4907-996ebe02e113f1ec.js",revision:"996ebe02e113f1ec"},{url:"/_next/static/chunks/9296490e-abfba37bb28b743a.js",revision:"abfba37bb28b743a"},{url:"/_next/static/chunks/9421-118b1b6851013cfd.js",revision:"118b1b6851013cfd"},{url:"/_next/static/chunks/960.ee5773b48b82a437.js",revision:"ee5773b48b82a437"},{url:"/_next/static/chunks/9709.ce57037a102ca46d.js",revision:"ce57037a102ca46d"},{url:"/_next/static/chunks/9814d858-58ccf6ec750ecc3f.js",revision:"58ccf6ec750ecc3f"},{url:"/_next/static/chunks/d50d312a-788d1c0768e1464a.js",revision:"788d1c0768e1464a"},{url:"/_next/static/chunks/e5e635f2-cf8cafb1d08b9338.js",revision:"cf8cafb1d08b9338"},{url:"/_next/static/chunks/f36c6662-4dd57919cbf4ca43.js",revision:"4dd57919cbf4ca43"},{url:"/_next/static/chunks/framework-e5b12c291073d220.js",revision:"e5b12c291073d220"},{url:"/_next/static/chunks/main-ab3230bdce3c6292.js",revision:"ab3230bdce3c6292"},{url:"/_next/static/chunks/pages/%5Bmodel%5D-00b42de6ae1400b7.js",revision:"00b42de6ae1400b7"},{url:"/_next/static/chunks/pages/404-f96d58a440153aee.js",revision:"f96d58a440153aee"},{url:"/_next/static/chunks/pages/_app-56eaabc9db1292fa.js",revision:"56eaabc9db1292fa"},{url:"/_next/static/chunks/pages/_error-10174e80ad0c0cf2.js",revision:"10174e80ad0c0cf2"},{url:"/_next/static/chunks/pages/accounts-59da71eadd1621dc.js",revision:"59da71eadd1621dc"},{url:"/_next/static/chunks/pages/arts-571bf4d2882796f1.js",revision:"571bf4d2882796f1"},{url:"/_next/static/chunks/pages/competitions-7d54d4bc60116f0b.js",revision:"7d54d4bc60116f0b"},{url:"/_next/static/chunks/pages/courses-8a7ad03e0f7583fc.js",revision:"8a7ad03e0f7583fc"},{url:"/_next/static/chunks/pages/courses/%5Bid%5D-513121020a30c1d2.js",revision:"513121020a30c1d2"},{url:"/_next/static/chunks/pages/donation-0751ad4fdc62cc54.js",revision:"0751ad4fdc62cc54"},{url:"/_next/static/chunks/pages/donation/complete-83e882f6ea4b353b.js",revision:"83e882f6ea4b353b"},{url:"/_next/static/chunks/pages/index-58c731dda8570a73.js",revision:"58c731dda8570a73"},{url:"/_next/static/chunks/pages/login-68c41c996f636a78.js",revision:"68c41c996f636a78"},{url:"/_next/static/chunks/pages/news-44069e1772d2ec34.js",revision:"44069e1772d2ec34"},{url:"/_next/static/chunks/pages/news/bookmarks-63f0d96c930a8dac.js",revision:"63f0d96c930a8dac"},{url:"/_next/static/chunks/pages/news/recommended-e6952f6544711fac.js",revision:"e6952f6544711fac"},{url:"/_next/static/chunks/pages/not-allowed-c6754be1cf8e3b93.js",revision:"c6754be1cf8e3b93"},{url:"/_next/static/chunks/pages/posts-fd4a5e90de9dc450.js",revision:"fd4a5e90de9dc450"},{url:"/_next/static/chunks/pages/posts/%5Bid%5D-72708b76265bee24.js",revision:"72708b76265bee24"},{url:"/_next/static/chunks/pages/timelines-d12daa7e3701704d.js",revision:"d12daa7e3701704d"},{url:"/_next/static/chunks/pages/timelines/bookmarks-35a91fd7d4ae0f25.js",revision:"35a91fd7d4ae0f25"},{url:"/_next/static/chunks/pages/timelines/recommended-1d5aee41b7d16fb9.js",revision:"1d5aee41b7d16fb9"},{url:"/_next/static/chunks/pages/translates-d469f5a7a58850e4.js",revision:"d469f5a7a58850e4"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-1823f68dda3c5300.js",revision:"1823f68dda3c5300"},{url:"/_next/static/css/1f5ee95fffd43a71.css",revision:"1f5ee95fffd43a71"},{url:"/_next/static/css/36fa2c0111b6959a.css",revision:"36fa2c0111b6959a"},{url:"/_next/static/css/f6d41ab79973d85b.css",revision:"f6d41ab79973d85b"},{url:"/_next/static/media/0fe63eb24e4119b1-s.p.woff2",revision:"e9e98be76a19778242bc807ffcdd9012"},{url:"/_next/static/media/1d166d1f895c8030-s.p.woff2",revision:"05d4b37d3e4d5205b96e499b70b00abe"},{url:"/_next/static/media/20b8b8f6f47c1e10-s.woff2",revision:"7def222d1a45cb1cb7d8c3ae675dbdcc"},{url:"/_next/static/media/370d1cc320ec5619-s.woff2",revision:"a6ff41d10fa89e7f8fec937c243d7428"},{url:"/_next/static/media/51051a7edfeea436-s.woff2",revision:"f1b74fe764967ea8636858297f750d66"},{url:"/_next/static/media/58b5ff29cb83dc98-s.woff2",revision:"e891db69d4cac7a240f3adaf8fb8e0c6"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7777133e901cd5ed-s.p.woff2",revision:"a09f2fccfee35b7247b08a1a266f0328"},{url:"/_next/static/media/839135d04a097cea-s.woff2",revision:"79e6e81d255edac7e8627c7e16baccf5"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/90c38b6482a4a18d-s.woff2",revision:"b3d5a5e5e3585bedcbcb0b5459306756"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/9a881e2ac07d406b-s.p.woff2",revision:"25b0e113ca7cce3770d542736db26368"},{url:"/_next/static/media/9b44cfc48addbfc9-s.woff2",revision:"b8f12782fb372c92a5c8e3380f926e17"},{url:"/_next/static/media/bd427f25ac24d036-s.p.woff2",revision:"5426bf50c8455aab7a3e89d1138eb969"},{url:"/_next/static/media/f93b79c1ea023ab6-s.woff2",revision:"96b6d54684daa94742f7bfd72a981213"},{url:"/android-chrome-192x192.png",revision:"6a5fd1384c3ce12fda273158d1daeb41"},{url:"/android-chrome-512x512.png",revision:"9026784245f99fe45ecd3c4187bbee75"},{url:"/apple-touch-icon.png",revision:"4be94ba2112a4507c7db905ae1562a74"},{url:"/favicon-16x16.png",revision:"26c1f74f1150f34c0abaf7ed6291d5b4"},{url:"/favicon-32x32.png",revision:"7553609d706aa163c12dc57aa22656f6"},{url:"/favicon.ico",revision:"bab42aab11042d97032f0344795e592d"},{url:"/images/academy-logo-svg.svg",revision:"26064bd5a0bf4bc13c63c1ffd6024866"},{url:"/images/announcement.png",revision:"bdb3a4122994baab9c03847e0d978b26"},{url:"/images/freedom-bird.jpeg",revision:"1632064279da750f0ce4e5a427ddf2af"},{url:"/images/ideal-logo.svg",revision:"96c53048d6c8367f664db15140b3f6a0"},{url:"/images/mission.svg",revision:"00d9d8e42d6c844f2859af303e7e8845"},{url:"/images/samen-logo.svg",revision:"7ef0805f64aae90b2bfc473fa76258f2"},{url:"/images/visa-master-logo.svg",revision:"76c687a0cbcd1c86bd548bc091c11e9b"},{url:"/images/vision.svg",revision:"87db1445d1674db6ee0bbedcfc0f6ea4"},{url:"/images/who-we-are.svg",revision:"b1eb00f396c1d8699c2babbd689ab886"},{url:"/images/wsvvrijheid-logo.svg",revision:"28055fc09ebc407c0d21bafab9c9a414"},{url:"/locales/en/admin.json",revision:"e523f81aadc382afddb3df0fd4fcef73"},{url:"/locales/en/common.json",revision:"f6997a724cbc70fa249368be3b8aa3e9"},{url:"/locales/nl/admin.json",revision:"f32312a4093e307df3c53c273bc91cb4"},{url:"/locales/nl/common.json",revision:"e1598bfe40e1f9b951bf7181ba409ce0"},{url:"/locales/tr/admin.json",revision:"5d77ee1dd1537930174a2d9d3d7de30f"},{url:"/locales/tr/common.json",revision:"0c08a47cc9e7d8e3f1676277aa0596ff"},{url:"/site.webmanifest",revision:"822ea12bcb1e18534efd93b39750fc4d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
