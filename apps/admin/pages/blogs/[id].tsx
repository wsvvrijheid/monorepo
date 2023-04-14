import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useModelById } from '@wsvvrijheid/services'
import { Blog } from '@wsvvrijheid/types'
import {
  AdminLayout,
  blogFields,
  blogSchema,
  FormLocaleSwitcher,
  ModelEditForm,
  PageHeader,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const BlogPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: blog,
    isLoading,
    refetch,
  } = useModelById<Blog>({ url: 'api/blogs', id })
  // TODO: Unpublished blogs doesn't coming

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <PageHeader>
        <FormLocaleSwitcher models={blog?.localizations} slug={'collections'} />
      </PageHeader>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {blog && (
          <ModelEditForm<Blog>
            url="api/blogs"
            model={blog}
            translatedFields={['title', 'description', 'content']}
            schema={blogSchema}
            fields={blogFields}
            onSuccess={refetch}
            approveRoles={['contentmanager', 'translator']}
            editRoles={['contentmanager', 'translator']}
            publishRoles={['contentmanager']}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

  const title = {
    en: 'Blog Translate',
    tr: 'Blog Çeviri',
    nl: 'Blog Vertalen',
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

export default BlogPage
