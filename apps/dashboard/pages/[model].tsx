import { FC, useEffect, useState } from 'react'

import {
  Divider,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { ObjectSchema } from 'yup'

import { i18nConfig, urlsWithLocalizedTitle } from '@wsvvrijheid/config'
import { useSearchModel } from '@wsvvrijheid/services'
import {
  ApprovalStatus,
  Localize,
  Sort,
  StrapiCollectionUrl,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
} from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  FormFields,
  ModelEditModal,
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
} from '@wsvvrijheid/ui'

const schemas: { [x in StrapiCollectionUrl]?: unknown } = {
  activities: activitySchema,
  blogs: blogSchema,
  hashtags: mainHashtagSchema,
  collections: collectionSchema,
}

const fields: { [x in StrapiCollectionUrl]?: unknown } = {
  activities: activityFields,
  blogs: blogFields,
  collections: collectionFields,
  hashtags: mainHashtagFields,
}

const columns: {
  [x in StrapiCollectionUrl]?: WTableProps<StrapiModel>['columns']
} = {
  activities: activityColumns,
  blogs: blogColumns,
  collections: collectionColumns,
  hashtags: mainHashtagColumns,
}

type ModelPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ModelPage: FC<ModelPageProps> = ({ seo, model }) => {
  const { t } = useTranslation()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, query, push } = useRouter()

  const status = query.status as ApprovalStatus | 'all'
  const sort = query.sort as Sort
  const currentPage = query.page ? parseInt(query.page as string) : 1
  const selectedId = query.id ? parseInt(query.id as string) : undefined
  const published = (query.published as string) || 'all'

  const setRouteQuery = (
    key: 'id' | 'page' | 'sort' | 'status' | 'published',
    value?: string | number | Sort | ApprovalStatus,
  ) => {
    if (
      !value ||
      (key === 'page' && value === 1) ||
      (key === 'status' && value === 'all') ||
      (key === 'published' && value === 'all')
    ) {
      const q = { ...query }
      delete q[key]
      push({ query: q })

      return
    }

    push({ query: { ...query, [key]: value } })
  }

  const setSelectedId = (id?: number) => setRouteQuery('id', id)
  const setCurrentPage = (page?: number) => setRouteQuery('page', page)
  const setSort = (sort?: Sort) => setRouteQuery('sort', sort)
  const setStatus = (status?: ApprovalStatus) => setRouteQuery('status', status)
  const setPublished = (state?: string) => setRouteQuery('published', state)

  const titleKey = urlsWithLocalizedTitle.includes(model)
    ? `title_${locale}`
    : 'title'

  const modelQuery = useSearchModel<StrapiModel>({
    url: `api/${model}`,
    page: currentPage || 1,
    pageSize: 10,
    filters: {
      ...(searchTerm && { [titleKey]: { $eq: searchTerm } }),
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

  const handleSearch = (search?: string | null) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useEffect(() => setCurrentPage(1), [])

  useEffect(() => {
    if (selectedId) {
      onOpen()
    }
  }, [selectedId])

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={t('search-placeholder')}
      />
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
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        p={2}
        bg={'white'}
        rounded={'sm'}
        shadow={'sm'}
        overflowX={'auto'}
      >
        <RadioGroup
          as={HStack}
          spacing={4}
          colorScheme={'primary'}
          value={status || 'all'}
          onChange={val => setStatus(val as ApprovalStatus)}
        >
          <Radio value={'all'}>All</Radio>
          <Radio value={'approved'}>Approved</Radio>
          <Radio value={'pending'}>Pending</Radio>
          <Radio value={'rejected'}>Rejected</Radio>
        </RadioGroup>

        <Divider
          display={{ base: 'none', lg: 'block' }}
          mx={8}
          orientation="vertical"
        />
        <Divider display={{ base: 'block', lg: 'none' }} />

        <RadioGroup
          colorScheme={'primary'}
          as={HStack}
          spacing={4}
          value={published || 'true'}
          onChange={val => setPublished(val)}
        >
          <Radio value={'all'}>All</Radio>
          <Radio value={'true'}>Live</Radio>
          <Radio value={'false'}>Draft</Radio>
        </RadioGroup>
      </Stack>
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
  const model = (context.params as any).model as StrapiCollectionUrl

  const title: Localize<{ [x in StrapiCollectionUrl]?: string }> = {
    en: {
      activities: 'Activities',
      blogs: 'Blogs',
      hashtags: 'Hashtags',
      collections: 'Collections',
    },
    tr: {
      activities: 'Aktiviteler',
      blogs: 'Bloglar',
      hashtags: 'Hashtagler',
      collections: 'Koleksiyonlar',
    },
    nl: {
      activities: 'Activiteiten',
      blogs: 'Blogs',
      hashtags: 'Hashtags',
      collections: 'Collecties',
    },
  }

  const seo: NextSeoProps = {
    title: title[locale][model],
  }

  return {
    props: {
      model,
      seo,
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default ModelPage
