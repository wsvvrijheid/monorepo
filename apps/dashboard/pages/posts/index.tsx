import { FC, useEffect, useMemo, useState } from 'react'

import {
  MenuItemOption,
  MenuOptionGroup,
  useUpdateEffect,
} from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Hashtag, Post, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, DataTable, PageHeader, useColumns } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const PostsPage: FC<PageProps> = ({ seo }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

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
  const totalCount = postsQuery?.data?.meta?.pagination?.pageCount || 0

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
      title="Hastags"
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
    <AdminLayout seo={seo}>
      <PageHeader
        filterMenu={filterMenu}
        filterMenuCloseOnSelect={false}
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
      />
      {posts && (
        <DataTable<Post>
          columns={columns.posts!}
          data={posts}
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onSort={setSort}
          onClickRow={handleClick}
        />
      )}
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Posts',
    tr: 'Posts',
    nl: 'Posts',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default PostsPage
