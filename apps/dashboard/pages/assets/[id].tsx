import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  MenuItem,
  Stack,
  Text,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Asset, StrapiLocale, AssetsTracking, Sort } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  ModelEditForm,
  ModelEditModal,
  PageHeader,
  useColumns,
} from '@wsvvrijheid/ui'

const AssetPage = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { locale, query } = useRouter()

  const columns = useColumns<AssetsTracking>()

  const [selectedAssetsTrackingId, setSelectedAssetsTrackingId] =
    useState<number>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [sort, setSort] = useState<Sort>()

  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }
  const id = Number(query.id as string)

  const assetsTrackingsQuery = useStrapiRequest<AssetsTracking>({
    endpoint: 'assets-trackings',
    filters: {
      asset: { id: { $eq: id } },
      },
    sort,
    page: currentPage || 1,
    pageSize: 100,
   locale,
  })
  useUpdateEffect(() => {
    assetsTrackingsQuery.refetch()
  }, [locale, searchTerm, sort])

  const assetsTrackings = assetsTrackingsQuery?.data?.data || []
  const pageCount = assetsTrackingsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = assetsTrackingsQuery?.data?.meta?.pagination?.total || 0

  const { data, isLoading, refetch } = useStrapiRequest<Asset>({
    endpoint: 'assets',
    id,
  })
  const asset = data?.data

  // assets trackings
 const handleRowClick = (index: number, id: number) => {
    setSelectedAssetsTrackingId(id)
  }

  useEffect(() => {
    if (selectedAssetsTrackingId) {
      onOpen()
    }
  }, [selectedAssetsTrackingId])

  const handleClose = () => {
    onClose()
    setSelectedAssetsTrackingId(undefined)
  }

  return (
    <AdminLayout
      seo={{ title: t('foundation.assets') }}
      isLoading={isLoading}
      hasBackButton
    >
      {selectedAssetsTrackingId && (
        <ModelEditModal<AssetsTracking>
          title={'Assets Trackings'}
          endpoint="assets-trackings"
          id={selectedAssetsTrackingId}
          isOpen={isOpen}
          onClose={handleClose}
          onSuccess={refetch}
          size={'5xl'}
        />
      )}
      <Stack spacing={8} p={6}>
        <Accordion
          size={'lg'}
          allowToggle
          allowMultiple={false}
          defaultIndex={0}
          borderColor="transparent"
          defaultValue={1}
        >
          <AccordionItem _notLast={{ mb: 2 }}>
            <AccordionButton
              justifyContent="space-between"
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
              shadow={'sm'}
            >
              <Text>{asset?.name}</Text>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>
            <AccordionPanel mt={4} bg={'white'} rounded={'md'}>
              {asset && (
                <ModelEditForm<Asset>
                  endpoint="assets"
                  model={asset}
                  onSuccess={refetch}
                />
              )}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              justifyContent="space-between"
              _activeStep={{ bg: 'gray.200' }}
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
              shadow={'sm'}
            >
              <Text>Asset Tracking</Text>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>
            <AccordionPanel mt={4} bg={'white'} rounded={'md'}>
              <PageHeader
                onSearch={handleSearch}
                sortMenu={[
                  <MenuItem key="asc" icon={<FaArrowUp />}>
                    Name Asc
                  </MenuItem>,
                  <MenuItem key="desc" icon={<FaArrowDown />}>
                    Name Desc
                  </MenuItem>,
                ]}
              />
              <DataTable<AssetsTracking>
                columns={columns['assets-trackings']!}
                currentPage={currentPage}
                data={assetsTrackings}
                onClickRow={handleRowClick}
                onSort={setSort}
                pageCount={pageCount}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                totalCount={totalCount}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default AssetPage
