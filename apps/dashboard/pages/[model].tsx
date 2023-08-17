import { FC, useEffect } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'
import { ObjectSchema } from 'yup'

import { urlsWithLocalizedTitle } from '@wsvvrijheid/config'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import {
  ApprovalStatus,
  Localize,
  Sort,
  StrapiCollectionEndpoint,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
} from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  FormFields,
  ModelEditModal,
  ModelFiltersBar,
  PageHeader,
  WTableProps,
  activityColumns,
  activityFields,
  activitySchema,
  blogColumns,
  blogFields,
  blogSchema,
  collectionColumns,
  collectionFields,
  collectionSchema,
  mainHashtagColumns,
  mainHashtagFields,
  mainHashtagSchema,
  userFeedbackFields,
  userFeedbackSchema,
  userFeedbacksColumns,
  userFields,
  userSchema,
  usersColumns,
  volunteerColumns,
  volunteerFields,
  volunteerSchema,
} from '@wsvvrijheid/ui'

const schemas: { [x in StrapiCollectionEndpoint]?: unknown } = {
  activities: activitySchema,
  blogs: blogSchema,
  hashtags: mainHashtagSchema,
  collections: collectionSchema,
  users: userSchema,
  volunteers: volunteerSchema,
  'user-feedbacks': userFeedbackSchema,
}

const fields: { [x in StrapiCollectionEndpoint]?: unknown } = {
  activities: activityFields,
  blogs: blogFields,
  collections: collectionFields,
  hashtags: mainHashtagFields,
  users: userFields,
  volunteers: volunteerFields,
  'user-feedbacks': userFeedbackFields,
}

const columns: {
  [x in StrapiCollectionEndpoint]?: WTableProps<StrapiModel>['columns']
} = {
  activities: activityColumns,
  blogs: blogColumns,
  collections: collectionColumns,
  hashtags: mainHashtagColumns,
  users: usersColumns,
  volunteers: volunteerColumns,
  'user-feedbacks': userFeedbacksColumns,
}

type ModelPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ModelPage: FC<ModelPageProps> = ({ seo, model }) => {
  const { t } = useTranslation()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const { locale, query, push } = useRouter()

  const status = query.status as ApprovalStatus | 'all'
  const sort = query.sort as Sort
  const currentPage = query.page ? parseInt(query.page as string) : 1
  const selectedId = query.id ? parseInt(query.id as string) : undefined
  const published = (query.published as string) || 'all'
  const q = query.q as string

  const changeRoute = (
    key: 'id' | 'page' | 'sort' | 'status' | 'published' | 'q',
    value?: string | number | Sort | ApprovalStatus,
  ) => {
    if (
      !value ||
      (key === 'page' && value === 1) ||
      (key === 'status' && value === 'all') ||
      (key === 'published' && value === 'all')
    ) {
      const _query = { ...query }
      delete _query[key]
      push({ query: _query }, undefined, { shallow: true })

      return
    }

    // Shallow allows us to change the query without calling getServerSideProps
    // Because we do fetch the data on the client side
    push({ query: { ...query, [key]: value } }, undefined, { shallow: true })
  }

  const setSelectedId = (id?: number) => changeRoute('id', id)
  const setCurrentPage = (page?: number) => changeRoute('page', page)
  const setSort = (sort?: Sort) => changeRoute('sort', sort)
  const setStatus = (status?: ApprovalStatus) => changeRoute('status', status)
  const setPublished = (state?: string) => changeRoute('published', state)
  const setQ = (q?: string) => {
    if (q?.length) changeRoute('q', q)
  }

  const titleKey = urlsWithLocalizedTitle.includes(`api/${model}`)
    ? `title_${locale}`
    : 'title'

  const modelQuery = useStrapiRequest<StrapiModel>({
    url: `api/${model}`,
    page: currentPage || 1,
    pageSize: 10,
    filters: {
      ...(q && { [titleKey]: { $eq: q } }),
      ...(published === 'false' && { publishedAt: { $null: true } }),
      approvalStatus:
        status && status !== 'all'
          ? { $eq: status }
          : { $in: ['approved', 'pending', 'rejected'] },
    },
    includeDrafts: published !== 'true',
    sort,
    locale,
  })

  const models = modelQuery?.data?.data
  const totalCount = modelQuery?.data?.meta?.pagination?.pageCount

  const mappedModels = models?.map(m => ({
    ...m,
    translates:
      (m as StrapiTranslatableModel)?.localizations?.map(l => l.locale) || [],
  })) as StrapiModel[]

  const handleClick = (index: number, id: number) => {
    setSelectedId(id)
  }

  const handleClose = () => {
    setSelectedId(undefined)
    onClose()
  }

  useEffect(() => setCurrentPage(1), [])

  useEffect(() => {
    if (selectedId) {
      onOpen()
    }
  }, [selectedId])

  const hideFilters = model === 'users' || model === 'volunteers'

  return (
    <AdminLayout seo={seo}>
      <PageHeader onSearch={setQ} searchPlaceHolder={t('search-placeholder')} />
      {selectedId && (
        <ModelEditModal<StrapiModel>
          url={`api/${model}`}
          id={selectedId}
          isOpen={isOpen}
          onClose={handleClose}
          fields={fields[model] as FormFields<StrapiModel>}
          schema={schemas[model] as ObjectSchema<StrapiModel>}
          title={'Edit Model'}
        />
      )}
      {!hideFilters && (
        <ModelFiltersBar
          status={status}
          setStatus={setStatus}
          published={published}
          setPublished={setPublished}
        />
      )}
      <DataTable
        columns={columns[model] as WTableProps<StrapiModel>['columns']}
        data={mappedModels}
        totalCount={totalCount as number}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const model = (context.params as any).model as StrapiCollectionEndpoint
 
  const title: Localize<{ [x in StrapiCollectionEndpoint]?: string }> = {
    en: {
      activities: 'Activities',
      blogs: 'Blogs',
      hashtags: 'Hashtags',
      collections: 'Collections',
      users: 'Users',
      volunteers: 'Volunteers',
      'user-feedbacks': 'User Feedbacks',
    },
    tr: {
      activities: 'Aktiviteler',
      blogs: 'Bloglar',
      hashtags: 'Hashtagler',
      collections: 'Koleksiyonlar',
      users: 'Kullanicilar',
      volunteers: 'Gönüllüler',
      'user-feedbacks': 'Kullanıcı Geri Bildirimleri',
    },
    nl: {
      activities: 'Activiteiten',
      blogs: 'Blogs',
      hashtags: 'Hashtags',
      collections: 'Collecties',
      users: 'Gebruikers',
      volunteers: 'Vrijwilligers',
      'user-feedbacks': 'Gebruiker Feedbacks',
    },
  }

  const seo: NextSeoProps = {
    title: title[locale][model] || 'Dashboard',
  }

  return {
    props: {
      model,
      seo,
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default ModelPage
