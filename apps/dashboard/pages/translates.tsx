import { FC, useEffect, useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { i18nConfig } from '@wsvvrijheid/config'
import { useSearchModel } from '@wsvvrijheid/services'
import {
  Activity,
  ApprovalStatus,
  RoleType,
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

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const dataColumns = {
  activities: activityColumns,
  arts: artColumns,
  collections: collectionColumns,
  hashtags: mainHashtagColumns,
  posts: postColumns,
}

const approverRoles: { [x in StrapiCollectionUrl]?: RoleType[] } = {
  activities: ['translator'],
  arts: ['translator'],
  collections: ['translator'],
  hashtags: ['translator'],
  posts: ['translator'],
}

const editRoles: { [x in StrapiCollectionUrl]?: RoleType[] } = {
  activities: ['translator'],
  arts: ['translator'],
  collections: ['translator'],
  hashtags: ['translator'],
  posts: ['translator'],
}

type TranslateDataTableProps = {
  searchTerm?: string
}

const TranslateDataTable: FC<TranslateDataTableProps> = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sort, setSort] = useState<Sort>()

  const { query, locale, push } = useRouter()
  const status = query.status as ApprovalStatus
  const slug = query.slug as Partial<StrapiCollectionUrl>

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const columns = dataColumns[slug]

  useEffect(() => setCurrentPage(1), [status])

  useUpdateEffect(() => {
    dataQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const dataQuery = useSearchModel<Activity>({
    url: `api/${slug}`,
    page: currentPage || 1,
    pageSize: 10,
    filters: {
      ...(searchTerm && {
        $or: [
          { title: { $containsi: searchTerm } },
          { description: { $containsi: searchTerm } },
        ],
      }),
      approvalStatus: { $eq: 'pending' },
    },
    sort,
    locale,
    includeDrafts: true,
  })

  const items = dataQuery?.data?.data
  const totalCount = dataQuery?.data?.meta?.pagination?.pageCount || 0

  const handleClick = (index: number, id: number) => {
    push({ query: { ...query, id } })
  }

  const mappedActivities =
    items?.map(item => ({
      ...item,
      translates: item.localizations?.map(l => l.locale),
    })) || []

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

  const { query } = useRouter()
  const id = Number(query.id as string)
  const slug = query.slug as StrapiCollectionUrl

  const handleSearch = (search?: string) => {
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
          editorRoles={editRoles[slug] as RoleType[]}
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

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
