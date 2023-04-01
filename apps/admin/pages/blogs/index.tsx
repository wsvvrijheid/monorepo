import { FC, useEffect, useState } from 'react'

import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useUpdateEffect } from 'react-use'

import { useSearchModel } from '@wsvvrijheid/services'
import { Activity, Blog, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  blogColumns,
  blogFields,
  blogSchema,
  DataTable,
  ModelCreateModal,
  PageHeader,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogsPage: FC<PageProps> = ({ seo }) => {
  const [currentPage, setCurrentPage] = useState<number>()

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const blogsQuery = useSearchModel<Activity>({
    url: 'api/blogs',
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: ['approved'],
    publicationState: 'preview',
  })

  useEffect(() => setCurrentPage(1), [])
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    blogsQuery.refetch()
  }, [locale, searchTerm, sort])

  const blogs = blogsQuery?.data?.data
  const totalCount = blogsQuery?.data?.meta?.pagination?.pageCount

  const handleClick = (index: number, id: number) => {
    push(`/blogs/${id}`)
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
      >
        <ModelCreateModal<Blog>
          title="Create Blog"
          url="api/blogs"
          schema={blogSchema}
          fields={blogFields}
          onSuccess={() => blogsQuery.refetch()}
          buttonProps={{ mb: 4 }}
        >
          New Blog
        </ModelCreateModal>
      </PageHeader>

      <DataTable
        columns={blogColumns}
        data={blogs}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Blogs',
    tr: 'Bloglar',
    nl: 'Blogs',
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

export default BlogsPage
