import { GetServerSidePropsContext } from 'next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { RecommendedTweet, StrapiLocale } from '@wsvvrijheid/types'

const Page = () => null

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const id = context.params?.id as string

  const response = await strapiRequest<RecommendedTweet>({
    url: 'api/recommended-tweets',
    id: Number(id),
  })

  const tweet = response.data
  console.log('tweet', tweet)
  if (!tweet) {
    return { notFound: true }
  }

  const destination = `/${locale}/recommmends/tweets/?id=${tweet.id}`

  return {
    redirect: {
      destination,
    },
  }
}
