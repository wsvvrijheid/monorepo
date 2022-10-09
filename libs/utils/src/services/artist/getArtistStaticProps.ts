import { QueryClient } from '@tanstack/react-query'
import { StrapiLocale, User } from '@wsvvrijheid/types'
import { GetStaticPropsContext } from 'next/types'

import { getArtistById } from './getById'
export const getArtistStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient()
  const locale = context.locale as StrapiLocale
  const id = context.params?.['id'] as string

  await queryClient.prefetchQuery({
    queryKey: ['artist', locale, id],
    queryFn: () => getArtistById(locale, id),
  })

  const artist = queryClient.getQueryData<User>(['artist', locale, id])

  return artist
}
