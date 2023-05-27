// @ts-check
const withPWA = require("next-pwa");
const { i18n } = require("./next-i18next.config");

 
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  i18n,
  images: {
    deviceSizes: [320, 480, 720, 1080],
    imageSizes: [150],
    domains: [
      'aktifhaber.com',
      'www.turkishminute.com',
      'api.samenvvv.nl',
      'pbs.twimg.com',
      'api.wsvvrijheid.nl',
      'admin.wsvvrijheid.nl',
      'localhost',
      'amnesty.imgix.net',
      'boldmedya.com',
      'dekanttekening.nl',
      'cdn.nos.nl',
      'www.rtlnieuws.nl',
      'image.writeclouds.com',
      'www.tr724.com',
      'images0.persgroep.net',
      'image.shaber3.com',
      'ipa.news',
      'static.wixstatic.com',
      'www.amnesty.org',
    ],
  },
  modularizeImports: {
    "date-fns": { transform: "date-fns/{{member}}" },
    lodash: { transform: "lodash/{{member}}" },
  },
  outputFileTracing: true, 
};

module.exports = withPWA({
  dest: "public",
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  disable: process.env.NODE_ENV === "development",
})(nextConfig);

