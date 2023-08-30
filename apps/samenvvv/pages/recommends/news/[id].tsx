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
    url: 'api/recommended-topics',
    id: Number(id),
  })

  const news = response.data
console.log("news", news)
  if (!news) {
    return { notFound: true }
  }

  const destination = `/${locale}/recommmends/news/?id=${news.id}`

  
  return {
    redirect: {
      destination,
    },
  }
}
