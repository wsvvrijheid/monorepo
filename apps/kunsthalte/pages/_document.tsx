import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import { GA_MEASUREMENT_ID } from '@wsvvrijheid/config'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            type="image/x-icon"
            href="https://api.wsvvrijheid.nl/uploads/favicon_f7d105a38c.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://api.wsvvrijheid.nl/uploads/apple_touch_icon_3cf0e4ea2c.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://api.wsvvrijheid.nl/uploads/favicon_32x32_5df5918930.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://api.wsvvrijheid.nl/uploads/favicon_16x16_734c34cebf.png"
          />
          <link
            rel="manifest"
            href="https://api.wsvvrijheid.nl/uploads/site_406faca58d.webmanifest"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lemonada:wght@400;600;900&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
          `,
            }}
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
