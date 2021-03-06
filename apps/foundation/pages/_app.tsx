import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { pageview } from '@wsvvrijheid/utils';
import { defaultSeo, themes } from '@wsvvrijheid/config';
import '@splidejs/react-splide/css';
import i18nConfig from '../next-i18next.config';

const { ToastContainer } = createStandaloneToast();

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const { locale } = useRouter();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => pageview(url);

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={themes.wsvvrijheid}>
          <DefaultSeo {...defaultSeo.wsvvrijheid[locale]} />
          <Component {...pageProps} />
          <ToastContainer />
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp, i18nConfig);
