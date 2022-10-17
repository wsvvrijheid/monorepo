import { StrapiLocale } from '@wsvvrijheid/types'
import { GetServerSidePropsContext } from 'next/types'

import { getArtistById } from './getById'

export const getArtistServerProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const id = context.params?.['id'] as string

  const artist = getArtistById(locale, id)

  return artist
}
