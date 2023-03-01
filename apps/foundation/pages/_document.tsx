import { ColorModeScript } from '@chakra-ui/react'
import { GA_MEASUREMENT_ID } from '@wsvvrijheid/config'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            type="image/x-icon"
            href="https://api.wsvvrijheid.nl/uploads/favicon_001ff88401.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://api.wsvvrijheid.nl/uploads/apple_touch_icon_6b2107d2e2.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://api.wsvvrijheid.nl/uploads/favicon_32x32_82a4db2159.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://api.wsvvrijheid.nl/uploads/favicon_16x16_228fb20951.png"
          />
          <link
            rel="manifest"
            href="https://api.wsvvrijheid.nl/uploads/site_a26582cda2.webmanifest"
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
