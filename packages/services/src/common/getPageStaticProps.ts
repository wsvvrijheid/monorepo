import { GetStaticPropsContext } from 'next/types'

import { StrapiLocale } from '@wsvvrijheid/types'

import { ssrTranslations } from '../../ssrTranslations'

export const getPageStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
