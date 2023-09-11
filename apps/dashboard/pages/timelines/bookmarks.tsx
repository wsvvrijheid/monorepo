import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { useLocalStorage } from 'usehooks-ts'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale, Tweet } from '@wsvvrijheid/types'
import { AdminLayout, Container, MasonryGrid, TweetCard } from '@wsvvrijheid/ui'

const TweetBookmarkedPage = () => {
  const [storageTweets] = useLocalStorage<Tweet[]>('bookmarked-tweets', [])

  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('bookmarked-tweets') }}>
      <Container>
        <MasonryGrid cols={[1, 1, 1, 2, 3]}>
          {storageTweets.map((tweet, key) => (
            <TweetCard tweet={tweet} key={key} editable />
          ))}
        </MasonryGrid>
      </Container>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default TweetBookmarkedPage
