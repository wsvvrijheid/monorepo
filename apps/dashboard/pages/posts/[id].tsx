import { Box, Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { HashtagReturnType, Post, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  FormLocaleSwitcher,
  ModelEditForm,
  PageHeader,
  PostSentenceForm,
  useFields,
  useSchema,
} from '@wsvvrijheid/ui'

const PostPage = () => {
  const router = useRouter()
  const { query } = router

  const { t } = useTranslation()

  const fields = useFields<Post>()
  const schemas = useSchema()

  const id = Number(query.id as string)
  const { data, isLoading, refetch } = useStrapiRequest<Post>({
    endpoint: 'posts',
    id,
  })

  const post = data?.data

  return (
    <AdminLayout
      seo={{ title: t('posts') }}
      isLoading={isLoading}
      hasBackButton
    >
      <PageHeader>
        {(post?.localizations?.length || 0) > 0 && (
          <FormLocaleSwitcher<Post> model={post!} />
        )}
      </PageHeader>
      <Stack spacing={4}>
        {post && (
          <Box p={4} rounded="md" bg="white" shadow="md">
            <ModelEditForm<Post>
              endpoint="posts"
              model={post}
              schema={schemas.posts!}
              translatedFields={['description', 'content']}
              fields={fields.posts!}
              onSuccess={refetch}
            />
          </Box>
        )}
        {post?.hashtag && (
          <Box p={4} rounded="md" bg="white" shadow="md">
            <PostSentenceForm
              id={id}
              hashtag={post.hashtag as HashtagReturnType}
            />
          </Box>
        )}
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default PostPage
