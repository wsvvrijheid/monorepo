import { useEffect, useMemo, useState } from 'react'

import {
  MenuItemOption,
  MenuOptionGroup,
  useUpdateEffect,
} from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Hashtag, Post, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, DataTable, PageHeader, useColumns } from '@wsvvrijheid/ui'

const PostsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

  const { t } = useTranslation()

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const [hashtagIds, setHashtagIds] = useState<number[]>([])

  const columns = useColumns<Post>()

  const postsQuery = useStrapiRequest<Post>({
    endpoint: 'posts',
    page: currentPage || 1,
    filters: {
      ...(hashtagIds.length > 0 && {
        hashtag: { id: { $eq: hashtagIds } },
      }),
      ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
      approvalStatus: { $eq: 'approved' },
    },
    sort,
    locale,
    includeDrafts: true,
  })

  const hashtagsQuery = useStrapiRequest<Hashtag>({
    endpoint: 'hashtags',
    locale,
    includeDrafts: true,
    fields: ['id', 'title'],
  })

  useEffect(() => setCurrentPage(1), [hashtagIds])

  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const postsData = postsQuery?.data?.data
  const pageCount = postsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = postsQuery?.data?.meta?.pagination?.total || 0

  const posts = useMemo(
    () =>
      postsData?.map(post => ({
        ...post,
        translates: post.localizations?.map(l => l.locale),
      })),
    [postsData],
  )

  useUpdateEffect(() => {
    postsQuery.refetch()
  }, [locale, searchTerm, sort, hashtagIds])

  const filterMenu = (
    <MenuOptionGroup
      title={t('hashtags')}
      type="checkbox"
      onChange={(value: string | string[]) =>
        setHashtagIds((value as string[]).map(v => +v))
      }
    >
      {hashtagsQuery.data?.data?.map(hashtag => (
        <MenuItemOption key={hashtag.id} value={`${hashtag.id}`}>
          {hashtag.title}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  )

  const handleClick = (index: number, id: number) => {
    push(`/posts/${id}`)
  }

  return (
    <AdminLayout seo={{ title: t('posts') }}>
      <PageHeader
        filterMenu={filterMenu}
        filterMenuCloseOnSelect={false}
        onSearch={handleSearch}
      />
      {posts && (
        <DataTable<Post>
          columns={columns.posts!}
          currentPage={currentPage}
          data={posts}
          onClickRow={handleClick}
          onSort={setSort}
          pageCount={pageCount}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          totalCount={totalCount as number}
        />
      )}
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default PostsPage
