if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const d=e=>a(e,n),f={module:{uri:n},exports:t,require:d};s[n]=Promise.all(c.map((e=>f[e]||d(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1051b61c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/02935b41-be42c619d2b6fa61.js",revision:"be42c619d2b6fa61"},{url:"/_next/static/chunks/065a3ddb-2e059cfda8b71b58.js",revision:"2e059cfda8b71b58"},{url:"/_next/static/chunks/143-04f7f7e7c85833ad.js",revision:"04f7f7e7c85833ad"},{url:"/_next/static/chunks/176.54d54d675f950ebd.js",revision:"54d54d675f950ebd"},{url:"/_next/static/chunks/2272ea81-3afcc0e88622b2e4.js",revision:"3afcc0e88622b2e4"},{url:"/_next/static/chunks/384.75f17be6209c045f.js",revision:"75f17be6209c045f"},{url:"/_next/static/chunks/442.e522d2c6d29e4735.js",revision:"e522d2c6d29e4735"},{url:"/_next/static/chunks/447.16d12e689f2b1d26.js",revision:"16d12e689f2b1d26"},{url:"/_next/static/chunks/468.5d7ad830cb0cc74a.js",revision:"5d7ad830cb0cc74a"},{url:"/_next/static/chunks/4a5bdccf-b3b2f76ee731b8a4.js",revision:"b3b2f76ee731b8a4"},{url:"/_next/static/chunks/59b4e022-73cdebc3ee97512c.js",revision:"73cdebc3ee97512c"},{url:"/_next/static/chunks/658.ec24151b39613bd0.js",revision:"ec24151b39613bd0"},{url:"/_next/static/chunks/69bd6bf3-1668dab5c893b29e.js",revision:"1668dab5c893b29e"},{url:"/_next/static/chunks/709.2d6cfe630b57df1a.js",revision:"2d6cfe630b57df1a"},{url:"/_next/static/chunks/72585f70-ef0fe16734abef36.js",revision:"ef0fe16734abef36"},{url:"/_next/static/chunks/80ecdbd0-008f5c9b09a06061.js",revision:"008f5c9b09a06061"},{url:"/_next/static/chunks/839.3a399a96fc14e1d6.js",revision:"3a399a96fc14e1d6"},{url:"/_next/static/chunks/842-8186cc76833b43d3.js",revision:"8186cc76833b43d3"},{url:"/_next/static/chunks/960.61de6a9092a25d46.js",revision:"61de6a9092a25d46"},{url:"/_next/static/chunks/9814d858-f293f0713f0f0db2.js",revision:"f293f0713f0f0db2"},{url:"/_next/static/chunks/b586706e-ad1ec9e35647bfdc.js",revision:"ad1ec9e35647bfdc"},{url:"/_next/static/chunks/c8eae200-0852bcb1187566ef.js",revision:"0852bcb1187566ef"},{url:"/_next/static/chunks/d50d312a-2e039d273189dd24.js",revision:"2e039d273189dd24"},{url:"/_next/static/chunks/e893f787-2daa58f7b9b8f1db.js",revision:"2daa58f7b9b8f1db"},{url:"/_next/static/chunks/f36c6662-01ec584cc867839e.js",revision:"01ec584cc867839e"},{url:"/_next/static/chunks/framework-82e56b5bc7f38c7c.js",revision:"82e56b5bc7f38c7c"},{url:"/_next/static/chunks/main-e738b920d447d3a1.js",revision:"e738b920d447d3a1"},{url:"/_next/static/chunks/pages/_app-cbea9d3537cc223c.js",revision:"cbea9d3537cc223c"},{url:"/_next/static/chunks/pages/_error-538d45aa2e76147a.js",revision:"538d45aa2e76147a"},{url:"/_next/static/chunks/pages/about-us-817c5fba1e907e4d.js",revision:"817c5fba1e907e4d"},{url:"/_next/static/chunks/pages/club/artist/%5Bid%5D-9b86b53e35e81abb.js",revision:"9b86b53e35e81abb"},{url:"/_next/static/chunks/pages/club/arts-0d21d81be6d798a1.js",revision:"0d21d81be6d798a1"},{url:"/_next/static/chunks/pages/club/arts/%5Bslug%5D-d529827066dcb226.js",revision:"d529827066dcb226"},{url:"/_next/static/chunks/pages/club/collections-5bc43d5e66528944.js",revision:"5bc43d5e66528944"},{url:"/_next/static/chunks/pages/club/collections/%5Bslug%5D-4b168dca7881e37f.js",revision:"4b168dca7881e37f"},{url:"/_next/static/chunks/pages/contact-a74f6defdfd0f4bd.js",revision:"a74f6defdfd0f4bd"},{url:"/_next/static/chunks/pages/donation-252449bfcbbc146f.js",revision:"252449bfcbbc146f"},{url:"/_next/static/chunks/pages/donation/complete-02ad3e72be9248ad.js",revision:"02ad3e72be9248ad"},{url:"/_next/static/chunks/pages/forgot-password-eef6d87fb410b8e2.js",revision:"eef6d87fb410b8e2"},{url:"/_next/static/chunks/pages/index-8abfa6c13dddd883.js",revision:"8abfa6c13dddd883"},{url:"/_next/static/chunks/pages/login-06edb99905a7b399.js",revision:"06edb99905a7b399"},{url:"/_next/static/chunks/pages/privacy-b54a8c2002473bf1.js",revision:"b54a8c2002473bf1"},{url:"/_next/static/chunks/pages/profile-374c471b51c39ea1.js",revision:"374c471b51c39ea1"},{url:"/_next/static/chunks/pages/register-32568fa1548ae184.js",revision:"32568fa1548ae184"},{url:"/_next/static/chunks/pages/reset-password-60a65f07f4df24a8.js",revision:"60a65f07f4df24a8"},{url:"/_next/static/chunks/pages/terms-86d3d74dae0e6b33.js",revision:"86d3d74dae0e6b33"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-85ef411bcde630c6.js",revision:"85ef411bcde630c6"},{url:"/_next/static/css/1f5ee95fffd43a71.css",revision:"1f5ee95fffd43a71"},{url:"/_next/static/css/3aa1367d1e46f5fa.css",revision:"3aa1367d1e46f5fa"},{url:"/_next/static/css/c809dfe5a6f3ef64.css",revision:"c809dfe5a6f3ef64"},{url:"/_next/static/media/0fe63eb24e4119b1-s.p.woff2",revision:"e9e98be76a19778242bc807ffcdd9012"},{url:"/_next/static/media/1d166d1f895c8030-s.p.woff2",revision:"05d4b37d3e4d5205b96e499b70b00abe"},{url:"/_next/static/media/20b8b8f6f47c1e10-s.woff2",revision:"7def222d1a45cb1cb7d8c3ae675dbdcc"},{url:"/_next/static/media/370d1cc320ec5619-s.woff2",revision:"a6ff41d10fa89e7f8fec937c243d7428"},{url:"/_next/static/media/51051a7edfeea436-s.woff2",revision:"f1b74fe764967ea8636858297f750d66"},{url:"/_next/static/media/58b5ff29cb83dc98-s.woff2",revision:"e891db69d4cac7a240f3adaf8fb8e0c6"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7777133e901cd5ed-s.p.woff2",revision:"a09f2fccfee35b7247b08a1a266f0328"},{url:"/_next/static/media/839135d04a097cea-s.woff2",revision:"79e6e81d255edac7e8627c7e16baccf5"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/90c38b6482a4a18d-s.woff2",revision:"b3d5a5e5e3585bedcbcb0b5459306756"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/9a881e2ac07d406b-s.p.woff2",revision:"25b0e113ca7cce3770d542736db26368"},{url:"/_next/static/media/9b44cfc48addbfc9-s.woff2",revision:"b8f12782fb372c92a5c8e3380f926e17"},{url:"/_next/static/media/bd427f25ac24d036-s.p.woff2",revision:"5426bf50c8455aab7a3e89d1138eb969"},{url:"/_next/static/media/f93b79c1ea023ab6-s.woff2",revision:"96b6d54684daa94742f7bfd72a981213"},{url:"/_next/static/qjRGkXNU0LCo1wrf8ingr/_buildManifest.js",revision:"f72f242fc8cfdce781cb0895c298dfa3"},{url:"/_next/static/qjRGkXNU0LCo1wrf8ingr/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"0212984cd00845afcb2fd34c492ed3c8"},{url:"/android-chrome-512x512.png",revision:"7ff96091fd3f6e0e4c0e6bde063a7fb3"},{url:"/apple-touch-icon.png",revision:"9e4ab6ee9778bba8dc41024e91bd5c51"},{url:"/favicon-16x16.png",revision:"a4fa8d080f5f4b1fda9101dffd83a47a"},{url:"/favicon-32x32.png",revision:"f40d2f80a25f7afd050b96eb6921208f"},{url:"/favicon.ico",revision:"6012241afeb56a690863f502475f521b"},{url:"/images/academy-logo-svg.svg",revision:"26064bd5a0bf4bc13c63c1ffd6024866"},{url:"/images/announcement.png",revision:"bdb3a4122994baab9c03847e0d978b26"},{url:"/images/blog-bg.jpeg",revision:"3177d12bc3ad30af2d46bc30b5e8c1ae"},{url:"/images/courses.png",revision:"abb58f0eb74596f70fb66e39df9b6c67"},{url:"/images/human_rights.webp",revision:"a686ee579a27e8eb8f2ec1ffc08895f5"},{url:"/images/ideal-logo.svg",revision:"96c53048d6c8367f664db15140b3f6a0"},{url:"/images/kunsthalte-home.jpeg",revision:"ffc4d4687fa4fe65462d2115b2db780c"},{url:"/images/kunsthalte-logo.svg",revision:"6d47e40f4bdbb98488efe66ba49b789d"},{url:"/images/mission.svg",revision:"00d9d8e42d6c844f2859af303e7e8845"},{url:"/images/no-blog.svg",revision:"56535dae8cab6fa4887c061f0e3a91fa"},{url:"/images/samen-logo.svg",revision:"7ef0805f64aae90b2bfc473fa76258f2"},{url:"/images/seminar.jpeg",revision:"8d0c9fd65a1f0eadec5d4e766cf224fe"},{url:"/images/software-card.jpeg",revision:"86d061bf00b96d4810c9c94f50c93d3c"},{url:"/images/visa-master-logo.svg",revision:"76c687a0cbcd1c86bd548bc091c11e9b"},{url:"/images/vision.svg",revision:"87db1445d1674db6ee0bbedcfc0f6ea4"},{url:"/images/who-we-are.svg",revision:"b1eb00f396c1d8699c2babbd689ab886"},{url:"/images/wsvvrijheid-logo.svg",revision:"28055fc09ebc407c0d21bafab9c9a414"},{url:"/locales/en/admin.json",revision:"097f612a7d34902fa79c18623675720f"},{url:"/locales/en/common.json",revision:"b612d86d3318d18be2e4d8efadbbb127"},{url:"/locales/nl/admin.json",revision:"70d113185314a78ea7c870991067e832"},{url:"/locales/nl/common.json",revision:"5d5d38b86904500c4bd1ee9168b97591"},{url:"/locales/tr/admin.json",revision:"a55285a9ab6087cb4f78e70ff9af4fd9"},{url:"/locales/tr/common.json",revision:"3a12d8686b5fce70a7318ab08268f9a2"},{url:"/site.webmanifest",revision:"a138d1df5ccb5e0ff6742f3d21974c18"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
