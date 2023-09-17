import { Box, Spacer, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { StrapiModel } from '@wsvvrijheid/types'

import { DataTableProps } from './types'
import { Pagination, WTable } from '../../components'

export const DataTable = <T extends StrapiModel>({
  currentPage,
  setCurrentPage,
  totalCount,
  children,
  ...tableProps
}: DataTableProps<T>) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={4} h={`calc(100vh - 180px)`}>
      <Box bg="white" shadow="base" p={4} overflow="auto">
        {tableProps.data?.length > 0 ? (
          <WTable {...tableProps} />
        ) : (
          <Box>{t('no-data')}</Box>
        )}
      </Box>
      {tableProps.data.length > 0 && children}
      <Spacer />
      <Box alignSelf="center">
        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Box>
    </Stack>
  )
}
