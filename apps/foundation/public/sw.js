if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1051b61c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/OZ3kAgktJ2VmGhIVZgOOg/_buildManifest.js",revision:"41f1f8b1e9732de91ac32bb3cbc09739"},{url:"/_next/static/OZ3kAgktJ2VmGhIVZgOOg/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/02935b41-b0fbb693f46505ce.js",revision:"b0fbb693f46505ce"},{url:"/_next/static/chunks/065a3ddb-9a3e19691bae7625.js",revision:"9a3e19691bae7625"},{url:"/_next/static/chunks/1176.198e7ad9705a7789.js",revision:"198e7ad9705a7789"},{url:"/_next/static/chunks/2272ea81-8c297dd1c09054c2.js",revision:"8c297dd1c09054c2"},{url:"/_next/static/chunks/2899-d815bdfb8e8a5a6d.js",revision:"d815bdfb8e8a5a6d"},{url:"/_next/static/chunks/3364.b19244d4c4eab5d3.js",revision:"b19244d4c4eab5d3"},{url:"/_next/static/chunks/4658.d0238c3c56033686.js",revision:"d0238c3c56033686"},{url:"/_next/static/chunks/4842-c43a31bf549b572d.js",revision:"c43a31bf549b572d"},{url:"/_next/static/chunks/4874-f75fca07df14e72b.js",revision:"f75fca07df14e72b"},{url:"/_next/static/chunks/4a5bdccf-2272413b236b8cdb.js",revision:"2272413b236b8cdb"},{url:"/_next/static/chunks/59b4e022-64ca508092ba6c53.js",revision:"64ca508092ba6c53"},{url:"/_next/static/chunks/5c4819dd-f875ae31ccf68f27.js",revision:"f875ae31ccf68f27"},{url:"/_next/static/chunks/69bd6bf3-ab37b93bdb46521b.js",revision:"ab37b93bdb46521b"},{url:"/_next/static/chunks/72585f70-ee72c0c3ad5b06ef.js",revision:"ee72c0c3ad5b06ef"},{url:"/_next/static/chunks/7442.7ed6978479a7bcf0.js",revision:"7ed6978479a7bcf0"},{url:"/_next/static/chunks/7468.94a01ac3eef1c6e3.js",revision:"94a01ac3eef1c6e3"},{url:"/_next/static/chunks/8252.42c4d7633e22145a.js",revision:"42c4d7633e22145a"},{url:"/_next/static/chunks/839.3a399a96fc14e1d6.js",revision:"3a399a96fc14e1d6"},{url:"/_next/static/chunks/8eec4907-b3fc9f2f34eaaeed.js",revision:"b3fc9f2f34eaaeed"},{url:"/_next/static/chunks/9264-444117af0d35b121.js",revision:"444117af0d35b121"},{url:"/_next/static/chunks/9709.e52cb99ce779bcfb.js",revision:"e52cb99ce779bcfb"},{url:"/_next/static/chunks/9814d858-bef8e8a7858ccf3b.js",revision:"bef8e8a7858ccf3b"},{url:"/_next/static/chunks/b586706e-26b70be37b0227e0.js",revision:"26b70be37b0227e0"},{url:"/_next/static/chunks/c8eae200-a3c862bf02342d41.js",revision:"a3c862bf02342d41"},{url:"/_next/static/chunks/d50d312a-788d1c0768e1464a.js",revision:"788d1c0768e1464a"},{url:"/_next/static/chunks/e893f787-bf609c43df41a308.js",revision:"bf609c43df41a308"},{url:"/_next/static/chunks/f36c6662-43f89ad06b12a02c.js",revision:"43f89ad06b12a02c"},{url:"/_next/static/chunks/framework-f29e48ae95cae5a3.js",revision:"f29e48ae95cae5a3"},{url:"/_next/static/chunks/main-090566e07096bbb9.js",revision:"090566e07096bbb9"},{url:"/_next/static/chunks/pages/_app-f6d4973423d262bc.js",revision:"f6d4973423d262bc"},{url:"/_next/static/chunks/pages/_error-10174e80ad0c0cf2.js",revision:"10174e80ad0c0cf2"},{url:"/_next/static/chunks/pages/about-us-af891721e610653d.js",revision:"af891721e610653d"},{url:"/_next/static/chunks/pages/activities-cfdf3cb7103f5375.js",revision:"cfdf3cb7103f5375"},{url:"/_next/static/chunks/pages/activities/%5Bslug%5D-9241a048522bd845.js",revision:"9241a048522bd845"},{url:"/_next/static/chunks/pages/blog-525ce37b99faa5db.js",revision:"525ce37b99faa5db"},{url:"/_next/static/chunks/pages/blog/%5Bslug%5D-de9ba3eb3ad00283.js",revision:"de9ba3eb3ad00283"},{url:"/_next/static/chunks/pages/club-00c7149ba3ee09a6.js",revision:"00c7149ba3ee09a6"},{url:"/_next/static/chunks/pages/club/artist/%5Bid%5D-315273f45d23c9dc.js",revision:"315273f45d23c9dc"},{url:"/_next/static/chunks/pages/club/arts/%5Bslug%5D-c96b298606c7fa52.js",revision:"c96b298606c7fa52"},{url:"/_next/static/chunks/pages/club/collections/%5Bslug%5D-f5c1de3973906786.js",revision:"f5c1de3973906786"},{url:"/_next/static/chunks/pages/contact-856602acab196eb3.js",revision:"856602acab196eb3"},{url:"/_next/static/chunks/pages/courses-01dedd397442941f.js",revision:"01dedd397442941f"},{url:"/_next/static/chunks/pages/courses/%5Bslug%5D-4e32cd7e1e26dfec.js",revision:"4e32cd7e1e26dfec"},{url:"/_next/static/chunks/pages/donation-d1005c31d4bd162b.js",revision:"d1005c31d4bd162b"},{url:"/_next/static/chunks/pages/donation/complete-1514d7b56c02f173.js",revision:"1514d7b56c02f173"},{url:"/_next/static/chunks/pages/index-b67080e1184fdac6.js",revision:"b67080e1184fdac6"},{url:"/_next/static/chunks/pages/join-6ee61d11eade5fe0.js",revision:"6ee61d11eade5fe0"},{url:"/_next/static/chunks/pages/login-90cb58f7dd3a35fc.js",revision:"90cb58f7dd3a35fc"},{url:"/_next/static/chunks/pages/platforms-68c9be59f21f4b27.js",revision:"68c9be59f21f4b27"},{url:"/_next/static/chunks/pages/platforms/%5Bslug%5D-f21686cda690fbe5.js",revision:"f21686cda690fbe5"},{url:"/_next/static/chunks/pages/platforms/academy/software-7126687a2ae1f61a.js",revision:"7126687a2ae1f61a"},{url:"/_next/static/chunks/pages/privacy-ce53a088447e5b59.js",revision:"ce53a088447e5b59"},{url:"/_next/static/chunks/pages/profile-51e7548015b9e826.js",revision:"51e7548015b9e826"},{url:"/_next/static/chunks/pages/register-a5194341f0a6f092.js",revision:"a5194341f0a6f092"},{url:"/_next/static/chunks/pages/terms-fdbb8f2901b09e4c.js",revision:"fdbb8f2901b09e4c"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-a67b807da27786b8.js",revision:"a67b807da27786b8"},{url:"/_next/static/css/f8429da5ef27ec0f.css",revision:"f8429da5ef27ec0f"},{url:"/_next/static/media/1d166d1f895c8030-s.p.woff2",revision:"05d4b37d3e4d5205b96e499b70b00abe"},{url:"/_next/static/media/20b8b8f6f47c1e10-s.woff2",revision:"7def222d1a45cb1cb7d8c3ae675dbdcc"},{url:"/_next/static/media/370d1cc320ec5619-s.woff2",revision:"a6ff41d10fa89e7f8fec937c243d7428"},{url:"/_next/static/media/51051a7edfeea436-s.woff2",revision:"f1b74fe764967ea8636858297f750d66"},{url:"/_next/static/media/58b5ff29cb83dc98-s.woff2",revision:"e891db69d4cac7a240f3adaf8fb8e0c6"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7777133e901cd5ed-s.p.woff2",revision:"a09f2fccfee35b7247b08a1a266f0328"},{url:"/_next/static/media/839135d04a097cea-s.woff2",revision:"79e6e81d255edac7e8627c7e16baccf5"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/90c38b6482a4a18d-s.woff2",revision:"b3d5a5e5e3585bedcbcb0b5459306756"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/9a881e2ac07d406b-s.p.woff2",revision:"25b0e113ca7cce3770d542736db26368"},{url:"/_next/static/media/9b44cfc48addbfc9-s.woff2",revision:"b8f12782fb372c92a5c8e3380f926e17"},{url:"/_next/static/media/bd427f25ac24d036-s.p.woff2",revision:"5426bf50c8455aab7a3e89d1138eb969"},{url:"/_next/static/media/f93b79c1ea023ab6-s.woff2",revision:"96b6d54684daa94742f7bfd72a981213"},{url:"/android-chrome-192x192.png",revision:"6a5fd1384c3ce12fda273158d1daeb41"},{url:"/android-chrome-512x512.png",revision:"9026784245f99fe45ecd3c4187bbee75"},{url:"/apple-touch-icon.png",revision:"4be94ba2112a4507c7db905ae1562a74"},{url:"/favicon-16x16.png",revision:"26c1f74f1150f34c0abaf7ed6291d5b4"},{url:"/favicon-32x32.png",revision:"7553609d706aa163c12dc57aa22656f6"},{url:"/favicon.ico",revision:"bab42aab11042d97032f0344795e592d"},{url:"/images/academy-logo-svg.svg",revision:"26064bd5a0bf4bc13c63c1ffd6024866"},{url:"/images/announcement.png",revision:"bdb3a4122994baab9c03847e0d978b26"},{url:"/images/blog-bg.jpeg",revision:"3177d12bc3ad30af2d46bc30b5e8c1ae"},{url:"/images/ideal-logo.svg",revision:"96c53048d6c8367f664db15140b3f6a0"},{url:"/images/mission.svg",revision:"00d9d8e42d6c844f2859af303e7e8845"},{url:"/images/no-blog.svg",revision:"56535dae8cab6fa4887c061f0e3a91fa"},{url:"/images/samen-logo.svg",revision:"7ef0805f64aae90b2bfc473fa76258f2"},{url:"/images/visa-master-logo.svg",revision:"76c687a0cbcd1c86bd548bc091c11e9b"},{url:"/images/vision.svg",revision:"87db1445d1674db6ee0bbedcfc0f6ea4"},{url:"/images/who-we-are.svg",revision:"b1eb00f396c1d8699c2babbd689ab886"},{url:"/images/wsvvrijheid-logo.svg",revision:"28055fc09ebc407c0d21bafab9c9a414"},{url:"/locales/en/admin.json",revision:"097f612a7d34902fa79c18623675720f"},{url:"/locales/en/common.json",revision:"3783ed9fea00454f932910906fbd0ea7"},{url:"/locales/nl/admin.json",revision:"70d113185314a78ea7c870991067e832"},{url:"/locales/nl/common.json",revision:"a95d687ce8e6339176dd30daa68bb9b9"},{url:"/locales/tr/admin.json",revision:"a55285a9ab6087cb4f78e70ff9af4fd9"},{url:"/locales/tr/common.json",revision:"2ebfd29733ac042031f6dcf850e7ae55"},{url:"/site.webmanifest",revision:"fb3179444b0a4a9b3fcd72e651d7488c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));