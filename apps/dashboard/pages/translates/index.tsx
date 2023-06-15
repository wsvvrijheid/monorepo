import { FC, useEffect, useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useSearchModel } from '@wsvvrijheid/services'
import {
  Activity,
  ApprovalStatus,
  Sort,
  StrapiCollectionUrl,
  StrapiLocale,
  StrapiTranslatableModel,
} from '@wsvvrijheid/types'
import {
  activityColumns,
  AdminLayout,
  artColumns,
  collectionColumns,
  DataTable,
  mainHashtagColumns,
  ModelEditTranslate,
  PageHeader,
  postColumns,
  translateModelFields,
  translateModelSchema,
  translatePostModelFields,
  translatePostModelSchema,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const dataColumns = {
  activities: activityColumns,
  arts: artColumns,
  collections: collectionColumns,
  hashtags: mainHashtagColumns,
  posts: postColumns,
}

const approverRoles = {
  activities: ['translator'],
  arts: ['translator'],
  collections: ['translator'],
  hashtags: ['translator'],
  posts: ['translator'],
}

const editRoles = {
  activities: ['translator'],
  arts: ['translator'],
  collections: ['translator'],
  hashtags: ['translator'],
  posts: ['translator'],
}

const TranslateDataTable = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState<number>()
  const [sort, setSort] = useState<Sort>()

  const { query, locale, push } = useRouter()
  const status = query.status as ApprovalStatus
  const slug = query.slug as StrapiCollectionUrl

  const columns = dataColumns[slug]

  useEffect(() => setCurrentPage(1), [status])

  useUpdateEffect(() => {
    dataQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const dataQuery = useSearchModel<Activity>({
    url: `api/${slug}`,
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: ['pending'],
    publicationState: 'preview',
  })

  const items = dataQuery?.data?.data
  const totalCount = dataQuery?.data?.meta?.pagination?.pageCount

  const handleClick = (index: number, id: number) => {
    push({ query: { ...query, id } })
  }

  const mappedActivities = items?.map(item => ({
    ...item,
    translates: item.localizations?.map(l => l.locale),
  }))

  return (
    <DataTable
      columns={columns}
      data={mappedActivities}
      totalCount={totalCount}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSort={setSort}
      onClickRow={handleClick}
    />
  )
}

const ActivitiesTranslatePage: FC<PageProps> = ({ seo }) => {
  const [searchTerm, setSearchTerm] = useState<string>()

  const { query, locale, push } = useRouter()
  const id = Number(query.id as string)
  const slug = query.slug as StrapiCollectionUrl

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const fields =
    slug === 'posts' ? translatePostModelFields : translateModelFields
  const schema =
    slug === 'posts' ? translatePostModelSchema : translateModelSchema

  return (
    <AdminLayout seo={seo}>
      {id ? (
        <ModelEditTranslate<StrapiTranslatableModel>
          id={id}
          url={`api/${slug}`}
          translatedFields={fields.map(f => f.name)}
          fields={fields as any}
          schema={schema}
          approverRoles={approverRoles[slug]}
          editorRoles={editRoles[slug]}
        />
      ) : (
        <>
          <PageHeader
            onSearch={handleSearch}
            searchPlaceHolder={'Search by title or description'}
          />

          <TranslateDataTable searchTerm={searchTerm} />
        </>
      )}
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Activities',
    tr: 'Aktiviteler',
    nl: 'Activiteiten',
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

export default ActivitiesTranslatePage
