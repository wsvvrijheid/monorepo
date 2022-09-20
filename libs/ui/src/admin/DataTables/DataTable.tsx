import React from 'react'

import { Box, Spacer, Stack } from '@chakra-ui/react'
import { StrapiModel } from '@wsvvrijheid/types'

import { Pagination, WTable } from '../../components'
import { DataTableProps } from './types'

export const DataTable = <T extends StrapiModel>({
  currentPage,
  setCurrentPage,
  totalCount,
  ...tableProps
}: DataTableProps<T>) => {
  return (
    <Stack spacing={4} h={`calc(100vh - 200px)`}>
      <Box bg="white" shadow="md" p={4} overflow="auto">
        {tableProps.data?.length > 0 ? (
          <WTable {...tableProps} />
        ) : (
          <Box>No data found!</Box>
        )}
      </Box>
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
