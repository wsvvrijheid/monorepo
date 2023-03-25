import { FC, useEffect, useState } from 'react'

import { MenuItem } from '@chakra-ui/react'
import { useSearchModel } from '@wsvvrijheid/services'
import { ApprovalStatus, Art, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, ArtsTable, PageHeader } from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { useUpdateEffect } from 'react-use'

import i18nConfig from '../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const ArtsPage: FC<PageProps> = ({ seo }) => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()

  // Client side query params (?status=pending)
  const status = query.status as ApprovalStatus

  const [sort, setSort] = useState<Sort>()

  const { locale } = useRouter()

  const artsQuery = useSearchModel<Art>({
    url: 'api/arts',
    populate: [
      'artist.user.avatar',
      'categories',
      'image',
      'likers',
      'localizations',
    ],
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: [status],
  })

  useEffect(() => setCurrentPage(1), [status])
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    artsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const arts = artsQuery?.data?.data
  const totalCount = artsQuery?.data?.meta?.pagination?.pageCount

  const mappedArts = arts?.map(art => {
    const translates = []

    if (art.title_en) translates.push('en')
    if (art.title_tr) translates.push('tr')
    if (art.title_nl) translates.push('nl')

    return {
      ...art,
      translates,
    }
  })

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search arts by title or artist'}
        sortMenu={[
          <MenuItem key="asc" icon={<FaArrowUp />}>
            Name Asc
          </MenuItem>,
          <MenuItem key="desc" icon={<FaArrowDown />}>
            Name Desc
          </MenuItem>,
        ]}
      />
      <ArtsTable
        data={mappedArts}
        onSuccess={artsQuery.refetch}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Arts',
    tr: 'Eserler',
    nl: 'Arts',
  }

  const seo = {
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

export default ArtsPage
