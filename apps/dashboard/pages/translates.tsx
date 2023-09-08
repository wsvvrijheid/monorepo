import { FC, useEffect, useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import {
  Activity,
  ApprovalStatus,
  PartialStrapiEndpointMap,
  RoleType,
  Sort,
  StrapiCollectionEndpoint,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
} from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  ModelEditTranslate,
  PageHeader,
  WTableProps,
  useColumns,
  useFields,
  useSchema,
} from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const approverRoles: PartialStrapiEndpointMap<RoleType[]> = {
  activities: ['translator'],
  arts: ['translator'],
  collections: ['translator'],
  hashtags: ['translator'],
  posts: ['translator'],
}

const editRoles: PartialStrapiEndpointMap<RoleType[]> = {
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
  const slug = query.slug as Partial<StrapiCollectionEndpoint>

  const columns = useColumns()

  useEffect(() => setCurrentPage(1), [status])

  useUpdateEffect(() => {
    dataQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const dataQuery = useStrapiRequest<Activity>({
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
    <DataTable<StrapiModel>
      columns={columns[slug] as WTableProps<StrapiModel>['columns']}
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
  const slug = query.slug as StrapiCollectionEndpoint

  const modelFields = useFields()
  const modelSchemas = useSchema()

  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const fields =
    slug === 'posts'
      ? modelFields['translate-post-model']
      : modelFields['translate-model']
  const schema =
    slug === 'posts'
      ? modelSchemas['translate-post-model']
      : modelSchemas['translate-model']

  return (
    <AdminLayout seo={seo}>
      {id ? (
        <ModelEditTranslate<StrapiTranslatableModel>
          id={id}
          url={`api/${slug}`}
          translatedFields={fields?.map(f => f.name) || []}
          fields={fields as any}
          schema={schema!}
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
    en: 'Translates',
    tr: 'Ceviriler',
    nl: 'Vertalingen',
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

export default ActivitiesTranslatePage
