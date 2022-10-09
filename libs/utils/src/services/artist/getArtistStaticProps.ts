import { QueryClient } from '@tanstack/react-query'
import { StrapiLocale, User } from '@wsvvrijheid/types'
import { GetStaticPropsContext } from 'next/types'

import { getArtistByUsername } from './getByUsername'
export const getArtistStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient()
  const locale = context.locale as StrapiLocale
  const username = context.params?.['username'] as string

  await queryClient.prefetchQuery({
    queryKey: ['artist', locale, username],
    queryFn: () => getArtistByUsername(locale, username),
  })

  const artist = queryClient.getQueryData<User>(['artist', locale, username])

  return artist
}
