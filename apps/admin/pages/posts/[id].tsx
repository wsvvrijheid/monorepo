import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { useModelById } from '@wsvvrijheid/services'
import { Post } from '@wsvvrijheid/types'
import {
  AdminLayout,
  FormLocaleSwitcher,
  ModelEditForm,
  PageHeader,
  postFields,
  postSchema,
} from '@wsvvrijheid/ui'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const PostPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: post,
    isLoading,
    refetch,
  } = useModelById<Post>({
    url: 'api/posts',
    id,
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton slug={'posts'}>
      <PageHeader>
        <FormLocaleSwitcher models={post?.localizations} slug={'posts'} />
      </PageHeader>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {post && (
          <ModelEditForm<Post>
            url="api/posts"
            model={post}
            schema={postSchema}
            translatedFields={['title', 'description', 'content']}
            fields={postFields}
            onSuccess={refetch}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

  const title = {
    en: 'Post',
    tr: 'Post',
    nl: 'Post',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default PostPage
