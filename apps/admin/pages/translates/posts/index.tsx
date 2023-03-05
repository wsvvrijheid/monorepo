import { FC, useEffect, useMemo, useState } from 'react'

import { MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import { useSearchModel } from '@wsvvrijheid/services'
import {
  ApprovalStatus,
  Hashtag,
  Post,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  PageHeader,
  postColumns,
} from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useUpdateEffect } from 'react-use'

import i18nConfig from '../../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const PostsTranslatesPage: FC<PageProps> = ({ seo }) => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const status = query.status as ApprovalStatus

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const [hashtagsFilter, setHashtagsFilter] = useState<number[]>([])

  const postsQuery = useSearchModel<Post>({
    url: 'api/posts',
    page: currentPage || 1,
    searchTerm,
    relationFilter: {
      parent: 'hashtag',
      ids: hashtagsFilter,
    },
    sort,
    locale: locale as StrapiLocale,
    statuses: ['pending'],
    publicationState: 'preview',
  })

  const hashtagsQuery = useSearchModel<Hashtag>({
    url: 'api/hashtags',
    locale: locale as StrapiLocale,
    publicationState: 'preview',
    fields: ['id', 'title'],
  })

  useEffect(() => setCurrentPage(1), [status, hashtagsFilter])

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const postsData = postsQuery?.data?.data
  const totalCount = postsQuery?.data?.meta?.pagination?.pageCount

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
  }, [locale, searchTerm, sort, status, hashtagsFilter])

  const filterMenu = (
    <MenuOptionGroup
      title="Hastags"
      type="checkbox"
      onChange={(value: string[]) => setHashtagsFilter(value.map(v => +v))}
    >
      {hashtagsQuery.data?.data?.map(hashtag => (
        <MenuItemOption key={hashtag.id} value={`${hashtag.id}`}>
          {hashtag.title}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  )

  const handleClick = (index: number, id: number) => {
    push(`/translates/posts/${id}`)
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        filterMenu={filterMenu}
        filterMenuCloseOnSelect={false}
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
      ></PageHeader>

      <DataTable<Post>
        columns={postColumns}
        data={posts}
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
    en: 'Posts',
    tr: 'Postlar',
    nl: 'Posts',
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

export default PostsTranslatesPage
