import { useEffect, useState } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import {
  Activity,
  ApprovalStatus,
  Sort,
  StrapiCollectionEndpoint,
  StrapiLocale,
  StrapiModel,
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

const ActivitiesTranslatePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>()
  const { t } = useTranslation()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { query, locale, push } = useRouter()

  const id = Number(query.id as string)

  const modelFields = useFields()
  const modelSchemas = useSchema()

  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sort, setSort] = useState<Sort>()

  const status = query.status as ApprovalStatus
  const slug = query.slug as Partial<StrapiCollectionEndpoint>
  const translateKey = slug as any

  const columns = useColumns()

  useEffect(() => setCurrentPage(1), [status])

  useUpdateEffect(() => {
    dataQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const dataQuery = useStrapiRequest<Activity>({
    endpoint: slug,
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

  const mappedModels =
    items?.map(item => ({
      ...item,
      translates: item.localizations?.map(l => l.locale),
    })) || []

  const handleClick = (index: number, id: number) => {
    onOpen()
    push({ query: { ...query, id } })
  }

  const handleClose = () => {
    onClose()
    if (query.id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...q } = query
      push({ query: q }, undefined, { shallow: true })
    }
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
    <AdminLayout seo={{ title: t(translateKey || 'translates') }}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
      />

      <DataTable<StrapiModel>
        columns={columns[slug] as WTableProps<StrapiModel>['columns']}
        currentPage={currentPage}
        totalCount={totalCount}
        data={mappedModels}
        setCurrentPage={setCurrentPage}
        onClickRow={handleClick}
        onSort={setSort}
      />
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={handleClose}
        size={'full'}
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0} h={'80vh'}>
            <ModelEditTranslate
              id={id}
              endpoint={slug}
              translatedFields={fields?.map(f => f.name) || []}
              schema={schema!}
              fields={fields!}
            >
              <Button onClick={handleClose} colorScheme={'gray'}>
                {t('dismiss')}
              </Button>
            </ModelEditTranslate>
          </ModalBody>
        </ModalContent>
      </Modal>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default ActivitiesTranslatePage
