if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1051b61c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/PaF30h3efxoTSuQWC3e14/_buildManifest.js",revision:"651fb9bd66c423b7e5654543eb034785"},{url:"/_next/static/PaF30h3efxoTSuQWC3e14/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/02935b41-7c2bce024715024a.js",revision:"7c2bce024715024a"},{url:"/_next/static/chunks/065a3ddb-9a3e19691bae7625.js",revision:"9a3e19691bae7625"},{url:"/_next/static/chunks/1176.e9d9961d1f78761d.js",revision:"e9d9961d1f78761d"},{url:"/_next/static/chunks/1587.fe8640a742103602.js",revision:"fe8640a742103602"},{url:"/_next/static/chunks/2272ea81-dd489c5c1d8ecdf7.js",revision:"dd489c5c1d8ecdf7"},{url:"/_next/static/chunks/2721-fc0ac33f50348cd8.js",revision:"fc0ac33f50348cd8"},{url:"/_next/static/chunks/4658.dff06576f373af36.js",revision:"dff06576f373af36"},{url:"/_next/static/chunks/4a5bdccf-78fed05a94cd2e45.js",revision:"78fed05a94cd2e45"},{url:"/_next/static/chunks/59b4e022-30bd2bbb730246b2.js",revision:"30bd2bbb730246b2"},{url:"/_next/static/chunks/6310-ad451fca952b9bc1.js",revision:"ad451fca952b9bc1"},{url:"/_next/static/chunks/69bd6bf3-9f2d4ad232253c92.js",revision:"9f2d4ad232253c92"},{url:"/_next/static/chunks/72585f70-b8ce88d54edd8716.js",revision:"b8ce88d54edd8716"},{url:"/_next/static/chunks/7442.7ed6978479a7bcf0.js",revision:"7ed6978479a7bcf0"},{url:"/_next/static/chunks/7468.94a01ac3eef1c6e3.js",revision:"94a01ac3eef1c6e3"},{url:"/_next/static/chunks/81ca6f2a-7c06a2c46b670ece.js",revision:"7c06a2c46b670ece"},{url:"/_next/static/chunks/8252.7e8f8e418ed8af6f.js",revision:"7e8f8e418ed8af6f"},{url:"/_next/static/chunks/839.3a399a96fc14e1d6.js",revision:"3a399a96fc14e1d6"},{url:"/_next/static/chunks/9296490e-abfba37bb28b743a.js",revision:"abfba37bb28b743a"},{url:"/_next/static/chunks/9709.e52cb99ce779bcfb.js",revision:"e52cb99ce779bcfb"},{url:"/_next/static/chunks/9814d858-eaa5f1cef6407f7a.js",revision:"eaa5f1cef6407f7a"},{url:"/_next/static/chunks/b586706e-26b70be37b0227e0.js",revision:"26b70be37b0227e0"},{url:"/_next/static/chunks/d50d312a-788d1c0768e1464a.js",revision:"788d1c0768e1464a"},{url:"/_next/static/chunks/e5e635f2-cf8cafb1d08b9338.js",revision:"cf8cafb1d08b9338"},{url:"/_next/static/chunks/e893f787-bf609c43df41a308.js",revision:"bf609c43df41a308"},{url:"/_next/static/chunks/f36c6662-d5c298b701d8dfef.js",revision:"d5c298b701d8dfef"},{url:"/_next/static/chunks/framework-f29e48ae95cae5a3.js",revision:"f29e48ae95cae5a3"},{url:"/_next/static/chunks/main-c194d484aee0a39b.js",revision:"c194d484aee0a39b"},{url:"/_next/static/chunks/pages/404-56aad7fd26d469ff.js",revision:"56aad7fd26d469ff"},{url:"/_next/static/chunks/pages/_app-c8e503b6631fb15e.js",revision:"c8e503b6631fb15e"},{url:"/_next/static/chunks/pages/_error-10174e80ad0c0cf2.js",revision:"10174e80ad0c0cf2"},{url:"/_next/static/chunks/pages/accounts-de6094875a497972.js",revision:"de6094875a497972"},{url:"/_next/static/chunks/pages/activities-ac511d513e936eb1.js",revision:"ac511d513e936eb1"},{url:"/_next/static/chunks/pages/arts-3281cc387de3d828.js",revision:"3281cc387de3d828"},{url:"/_next/static/chunks/pages/blogs-8bcb978c3bb2297e.js",revision:"8bcb978c3bb2297e"},{url:"/_next/static/chunks/pages/caps-maker-cb01bc113022eac2.js",revision:"cb01bc113022eac2"},{url:"/_next/static/chunks/pages/collections-5ac0cbbc4fb5c776.js",revision:"5ac0cbbc4fb5c776"},{url:"/_next/static/chunks/pages/competitions-b14208304bddb40c.js",revision:"b14208304bddb40c"},{url:"/_next/static/chunks/pages/courses-c9476ebf3d99eaf3.js",revision:"c9476ebf3d99eaf3"},{url:"/_next/static/chunks/pages/courses/%5Bid%5D-797f55d5085b946a.js",revision:"797f55d5085b946a"},{url:"/_next/static/chunks/pages/donation-405aa3ce9822e821.js",revision:"405aa3ce9822e821"},{url:"/_next/static/chunks/pages/donation/complete-e3f722648b5d876a.js",revision:"e3f722648b5d876a"},{url:"/_next/static/chunks/pages/hashtags-8166ac6a58a00b8c.js",revision:"8166ac6a58a00b8c"},{url:"/_next/static/chunks/pages/index-5a8048e0431d3710.js",revision:"5a8048e0431d3710"},{url:"/_next/static/chunks/pages/login-6b68f3151e3625ba.js",revision:"6b68f3151e3625ba"},{url:"/_next/static/chunks/pages/news-465fbf84aaa4be57.js",revision:"465fbf84aaa4be57"},{url:"/_next/static/chunks/pages/news/bookmarks-c66bd8b453141db8.js",revision:"c66bd8b453141db8"},{url:"/_next/static/chunks/pages/news/recommended-7e337430da58fd6c.js",revision:"7e337430da58fd6c"},{url:"/_next/static/chunks/pages/not-allowed-3a1c43d34b6a5b3b.js",revision:"3a1c43d34b6a5b3b"},{url:"/_next/static/chunks/pages/posts-610cf3dfaed59262.js",revision:"610cf3dfaed59262"},{url:"/_next/static/chunks/pages/posts/%5Bid%5D-85ef92287d5d069b.js",revision:"85ef92287d5d069b"},{url:"/_next/static/chunks/pages/timelines-53f3237ae429a547.js",revision:"53f3237ae429a547"},{url:"/_next/static/chunks/pages/timelines/bookmarks-024298686e46f04c.js",revision:"024298686e46f04c"},{url:"/_next/static/chunks/pages/timelines/recommended-10b2a9c1db4758b4.js",revision:"10b2a9c1db4758b4"},{url:"/_next/static/chunks/pages/translates/activities-8c2a1af4531af536.js",revision:"8c2a1af4531af536"},{url:"/_next/static/chunks/pages/translates/activities/%5Bid%5D-ba147de18fe61008.js",revision:"ba147de18fe61008"},{url:"/_next/static/chunks/pages/translates/announcements-ec06894d034b893b.js",revision:"ec06894d034b893b"},{url:"/_next/static/chunks/pages/translates/arts-ce7a6310f0247f50.js",revision:"ce7a6310f0247f50"},{url:"/_next/static/chunks/pages/translates/arts/%5Bid%5D-4fa8e483c7be5f4e.js",revision:"4fa8e483c7be5f4e"},{url:"/_next/static/chunks/pages/translates/blogs-03242a02fa9f5bab.js",revision:"03242a02fa9f5bab"},{url:"/_next/static/chunks/pages/translates/collections-080ab45f82bd18ba.js",revision:"080ab45f82bd18ba"},{url:"/_next/static/chunks/pages/translates/collections/%5Bid%5D-0ba214fa3121f34c.js",revision:"0ba214fa3121f34c"},{url:"/_next/static/chunks/pages/translates/hashtags-c1d9bf3c3a2dce56.js",revision:"c1d9bf3c3a2dce56"},{url:"/_next/static/chunks/pages/translates/hashtags/%5Bid%5D-35673ca9c9f64264.js",revision:"35673ca9c9f64264"},{url:"/_next/static/chunks/pages/translates/posts-776a12024f3d0fe7.js",revision:"776a12024f3d0fe7"},{url:"/_next/static/chunks/pages/translates/posts/%5Bid%5D-ddcbbdc185e0a8eb.js",revision:"ddcbbdc185e0a8eb"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-eff88e790db60332.js",revision:"eff88e790db60332"},{url:"/_next/static/css/48978cf4cb499554.css",revision:"48978cf4cb499554"},{url:"/_next/static/media/1d166d1f895c8030-s.p.woff2",revision:"05d4b37d3e4d5205b96e499b70b00abe"},{url:"/_next/static/media/20b8b8f6f47c1e10-s.woff2",revision:"7def222d1a45cb1cb7d8c3ae675dbdcc"},{url:"/_next/static/media/370d1cc320ec5619-s.woff2",revision:"a6ff41d10fa89e7f8fec937c243d7428"},{url:"/_next/static/media/51051a7edfeea436-s.woff2",revision:"f1b74fe764967ea8636858297f750d66"},{url:"/_next/static/media/58b5ff29cb83dc98-s.woff2",revision:"e891db69d4cac7a240f3adaf8fb8e0c6"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7777133e901cd5ed-s.p.woff2",revision:"a09f2fccfee35b7247b08a1a266f0328"},{url:"/_next/static/media/839135d04a097cea-s.woff2",revision:"79e6e81d255edac7e8627c7e16baccf5"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/90c38b6482a4a18d-s.woff2",revision:"b3d5a5e5e3585bedcbcb0b5459306756"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/9a881e2ac07d406b-s.p.woff2",revision:"25b0e113ca7cce3770d542736db26368"},{url:"/_next/static/media/9b44cfc48addbfc9-s.woff2",revision:"b8f12782fb372c92a5c8e3380f926e17"},{url:"/_next/static/media/bd427f25ac24d036-s.p.woff2",revision:"5426bf50c8455aab7a3e89d1138eb969"},{url:"/_next/static/media/f93b79c1ea023ab6-s.woff2",revision:"96b6d54684daa94742f7bfd72a981213"},{url:"/android-chrome-192x192.png",revision:"6a5fd1384c3ce12fda273158d1daeb41"},{url:"/android-chrome-512x512.png",revision:"9026784245f99fe45ecd3c4187bbee75"},{url:"/apple-touch-icon.png",revision:"4be94ba2112a4507c7db905ae1562a74"},{url:"/favicon-16x16.png",revision:"26c1f74f1150f34c0abaf7ed6291d5b4"},{url:"/favicon-32x32.png",revision:"7553609d706aa163c12dc57aa22656f6"},{url:"/favicon.ico",revision:"bab42aab11042d97032f0344795e592d"},{url:"/images/academy-logo-svg.svg",revision:"26064bd5a0bf4bc13c63c1ffd6024866"},{url:"/images/announcement.png",revision:"bdb3a4122994baab9c03847e0d978b26"},{url:"/images/freedom-bird.jpeg",revision:"1632064279da750f0ce4e5a427ddf2af"},{url:"/images/ideal-logo.svg",revision:"96c53048d6c8367f664db15140b3f6a0"},{url:"/images/mission.svg",revision:"00d9d8e42d6c844f2859af303e7e8845"},{url:"/images/samen-logo.svg",revision:"7ef0805f64aae90b2bfc473fa76258f2"},{url:"/images/visa-master-logo.svg",revision:"76c687a0cbcd1c86bd548bc091c11e9b"},{url:"/images/vision.svg",revision:"87db1445d1674db6ee0bbedcfc0f6ea4"},{url:"/images/who-we-are.svg",revision:"b1eb00f396c1d8699c2babbd689ab886"},{url:"/images/wsvvrijheid-logo.svg",revision:"28055fc09ebc407c0d21bafab9c9a414"},{url:"/locales/en/admin.json",revision:"097f612a7d34902fa79c18623675720f"},{url:"/locales/en/common.json",revision:"3783ed9fea00454f932910906fbd0ea7"},{url:"/locales/nl/admin.json",revision:"70d113185314a78ea7c870991067e832"},{url:"/locales/nl/common.json",revision:"a95d687ce8e6339176dd30daa68bb9b9"},{url:"/locales/tr/admin.json",revision:"a55285a9ab6087cb4f78e70ff9af4fd9"},{url:"/locales/tr/common.json",revision:"2ebfd29733ac042031f6dcf850e7ae55"},{url:"/site.webmanifest",revision:"822ea12bcb1e18534efd93b39750fc4d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
