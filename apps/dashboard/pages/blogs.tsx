import { FC, useEffect, useState } from 'react'

import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { i18nConfig } from '@wsvvrijheid/config'
import { useSearchModel } from '@wsvvrijheid/services'
import { Blog, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  ModelEditModal,
  PageHeader,
  blogColumns,
  blogFields,
  blogSchema,
} from '@wsvvrijheid/ui'

type BlogsPageProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogsPage: FC<BlogsPageProps> = ({ seo }) => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedId, setSelectedId] = useState<number>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const blogsQuery = useSearchModel<Blog>({
    url: 'api/blogs',
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: ['approved', 'pending'],
    publicationState: 'preview',
  })

  useEffect(() => setCurrentPage(1), [])
  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    blogsQuery.refetch()
  }, [locale, searchTerm, sort])

  const blogs = blogsQuery?.data?.data
  const totalCount = blogsQuery?.data?.meta?.pagination?.pageCount || 0

  const mappedBlogs =
    blogs?.map(blog => ({
      ...blog,
      translates: blog.localizations?.map(l => l.locale),
    })) || []

  const handleClick = (index: number, id: number) => {
    setSelectedId(id)
  }

  const handleClose = () => {
    setSelectedId(undefined)
    onClose()
  }

  useEffect(() => {
    if (selectedId) {
      onOpen()
    }
  }, [selectedId])

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={t('search-placeholder')}
      />
      {selectedId && (
        <ModelEditModal<Blog>
          url={'api/blogs'}
          id={selectedId}
          isOpen={isOpen}
          onClose={handleClose}
          fields={blogFields}
          schema={blogSchema}
          title={'Edit Blog'}
        />
      )}
      <DataTable<Blog>
        columns={blogColumns}
        data={mappedBlogs}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

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
