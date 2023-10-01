import { FC, useEffect, useState } from 'react'

import { Box, Heading, useDisclosure } from '@chakra-ui/react'
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
  HashtagReturnType,
  Post,
  Sort,
  StrapiCollectionEndpoint,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
} from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  FilterMenu,
  ModelEditModal,
  ModelFiltersBar,
  PageHeader,
  PostSentenceForm,
  WTableProps,
  useColumns,
} from '@wsvvrijheid/ui'

import { I18nNamespaces } from '../@types/i18next'

type ModelPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ModelPage: FC<ModelPageProps> = ({ endpoint }) => {
  const { t } = useTranslation()
  const { roles, profile } = useAuthContext()
  const [parentIds, setParentIds] = useState<number[]>([])

  const parentKeys: Partial<
    Record<
      StrapiCollectionEndpoint,
      { endpoint: StrapiCollectionEndpoint; key: string }
    >
  > = {
    posts: {
      endpoint: 'hashtags',
      key: 'hashtag',
    },
    courses: {
      endpoint: 'platforms',
      key: 'platform',
    },
    blogs: {
      endpoint: 'profiles',
      key: 'author',
    },
    profiles: {
      endpoint: 'platforms',
      key: 'platforms',
    },
  }

  const parentRelation = parentKeys[endpoint as StrapiCollectionEndpoint]

  const title = t(endpoint as keyof I18nNamespaces['common'])

  const isBlogAuthor =
    roles?.length === 1 && roles[0] === 'author' && endpoint === 'blogs'

  const { isOpen, onClose, onOpen } = useDisclosure()

  const { locale, query, push } = useRouter()

  const status = query.status as ApprovalStatus | 'all'
  const sort = query.sort as Sort
  const currentPage = query.page ? parseInt(query.page as string) : 1
  const selectedId = query.id ? parseInt(query.id as string) : undefined
  const published = (query.published as string) || 'all'
  const q = query.q as string
  const pageSize = query.pageSize ? parseInt(query.pageSize as string) : 20

  const columns = useColumns()

  const changeRoute = (
    key: 'id' | 'page' | 'sort' | 'status' | 'published' | 'q' | 'pageSize',
    value?: string | number | Sort | ApprovalStatus,
  ) => {
    if (
      !value ||
      (key === 'page' && value === 1) ||
      (key === 'status' && value === 'all') ||
      (key === 'published' && value === 'all') ||
      (key === 'pageSize' && value === 20)
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
  const setPageSize = (size?: number) => changeRoute('pageSize', size)
  const setSort = (sort?: Sort) => changeRoute('sort', sort)
  const setStatus = (status?: ApprovalStatus) => changeRoute('status', status)
  const setPublished = (state?: string) => changeRoute('published', state)
  const setQ = (q?: string) => {
    changeRoute('q', q)
  }

  const titleKey = endpointsWithLocalizedTitle.includes(endpoint)
    ? `title_${locale}`
    : endpoint === 'users'
    ? 'email'
    : endpoint === 'profiles'
    ? 'username'
    : 'title'

  const hasApprovalStatus = endpointsWithApprovalStatus.includes(endpoint)
  const hasPublicationState = endpointsWithPublicationState.includes(endpoint)

  const endpointQuery = useStrapiRequest<StrapiModel>({
    endpoint,
    page: currentPage || 1,
    filters: {
      ...(parentIds.length > 0 &&
        parentRelation && {
          [parentRelation.key]: { id: { $eq: parentIds } },
        }),
      ...(isBlogAuthor && profile && { author: { id: { $eq: profile.id } } }),
      ...(q && { [titleKey]: { $eq: q } }),
      ...(published === 'false' && { publishedAt: { $null: true } }),
      approvalStatus:
        status && status !== 'all'
          ? { $eq: status }
          : { $in: ['approved', 'pending', 'rejected'] },
    },
    ...(endpoint === 'profiles' && {
      populate: ['user.role', 'platforms'],
    }),
    pageSize,
    includeDrafts: published !== 'true',
    sort,
    locale,
  })

  const models = endpointQuery?.data?.data
  const pageCount = endpointQuery?.data?.meta?.pagination?.pageCount
  const totalCount = endpointQuery?.data?.meta?.pagination?.total

  const mappedModels = models?.map(m => ({
    ...m,
    translates:
      (m as StrapiTranslatableModel)?.localizations?.map(l => l.locale) || [],
  })) as StrapiModel[]

  const selectedModel = mappedModels?.find(m => m.id === selectedId)

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
      <PageHeader
        onSearch={setQ}
        {...(parentRelation && {
          filterMenu: (
            <FilterMenu
              endpoint={parentRelation.endpoint}
              ids={parentIds}
              setIds={setParentIds}
              {...(endpoint === 'blogs' && {
                filters: {
                  ownedBlogs: { id: { $gt: 0 } },
                },
              })}
            />
          ),
        })}
      />
      {selectedId && (
        <ModelEditModal<StrapiModel>
          endpoint={endpoint}
          id={selectedId}
          isOpen={isOpen}
          onClose={handleClose}
          title={`Edit ${endpoint}`}
          onSuccess={endpointQuery.refetch}
        >
          {endpoint === 'posts' && selectedModel && (
            <Box p={4} rounded="md" bg="white" shadow="md">
              <Heading p={4}>{t('sentences')}</Heading>
              <PostSentenceForm
                id={selectedModel.id}
                hashtag={(selectedModel as Post).hashtag as HashtagReturnType}
              />
            </Box>
          )}
        </ModelEditModal>
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
        pageCount={pageCount as number}
        totalCount={totalCount as number}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
        pageSize={pageSize}
        setPageSize={setPageSize}
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
      ...(await ssrTranslations(locale)),
    },
  }
}

export default ModelPage
