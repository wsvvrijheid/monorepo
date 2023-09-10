import { FC, useEffect } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  endpointsWithApprovalStatus,
  endpointsWithLocalizedTitle,
  endpointsWithPublicationState,
} from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import {
  ApprovalStatus,
  Sort,
  StrapiCollectionEndpoint,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
} from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  ModelEditModal,
  ModelFiltersBar,
  PageHeader,
  WTableProps,
  useColumns,
  useFields,
  useSchema,
} from '@wsvvrijheid/ui'

import { I18nNamespaces } from '../@types/i18next'

type ModelPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ModelPage: FC<ModelPageProps> = ({ endpoint }) => {
  const { t } = useTranslation()
  const { t: tModel } = useTranslation('model')
  const { roles, user } = useAuthContext()

  const title = tModel(endpoint as keyof I18nNamespaces['model'])

  const isOnlyAuthor = roles?.length === 1 && roles[0] === 'author'

  const { isOpen, onClose, onOpen } = useDisclosure()

  const { locale, query, push } = useRouter()

  const status = query.status as ApprovalStatus | 'all'
  const sort = query.sort as Sort
  const currentPage = query.page ? parseInt(query.page as string) : 1
  const selectedId = query.id ? parseInt(query.id as string) : undefined
  const published = (query.published as string) || 'all'
  const q = query.q as string

  const columns = useColumns()
  const fields = useFields()
  const schemas = useSchema()

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

  const titleKey = endpointsWithLocalizedTitle.includes(endpoint)
    ? `title_${locale}`
    : 'title'

  const hasApprovalStatus = endpointsWithApprovalStatus.includes(endpoint)
  const hasPublicationState = endpointsWithPublicationState.includes(endpoint)

  const endpointQuery = useStrapiRequest<StrapiModel>({
    endpoint,
    page: currentPage || 1,
    pageSize: 10,
    filters: {
      ...(isOnlyAuthor && user && { author: { id: { $eq: user.id } } }),
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

  const models = endpointQuery?.data?.data
  const totalCount = endpointQuery?.data?.meta?.pagination?.pageCount

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

  return (
    <AdminLayout seo={{ title }}>
      <PageHeader onSearch={setQ} searchPlaceHolder={t('search-placeholder')} />
      {selectedId && (
        <ModelEditModal<StrapiModel>
          endpoint={endpoint}
          id={selectedId}
          isOpen={isOpen}
          onClose={handleClose}
          fields={fields[endpoint]!}
          schema={schemas[endpoint]!}
          title={'Edit Model'}
        />
      )}

      <ModelFiltersBar
        status={status}
        setStatus={setStatus}
        published={published}
        setPublished={setPublished}
        showApprovalStatus={hasApprovalStatus}
        showPublicationState={hasPublicationState}
      />

      <DataTable
        columns={columns[endpoint] as WTableProps<StrapiModel>['columns']}
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
  const endpoint = (context.params as any).endpoint as StrapiCollectionEndpoint

  return {
    props: {
      endpoint,
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default ModelPage
