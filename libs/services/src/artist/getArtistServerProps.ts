import { StrapiLocale } from '@wsvvrijheid/types'
import { GetServerSidePropsContext } from 'next/types'

import { getArtistById } from './getById'
import { getArtByArtist } from '../art/getByArtist'

export const getArtistServerProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const id = context.params?.['id'] as string

  const artist = await getArtistById(locale, id)
  const arts = artist ? await getArtByArtist(locale, artist.id) : []

  return { artist, arts }
}
