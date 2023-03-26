import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { useAuthSelector } from '@wsvvrijheid/store'
import { Art } from '@wsvvrijheid/types'

import { artColumns } from '../../../data'
import { ArtApprovalModal } from '../../ArtApprovalModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'

type ArtsTableProps = Omit<DataTableProps<Art>, 'columns'> & {
  onSuccess?: () => void
}

export const ArtsTable: FC<ArtsTableProps> = ({
  onSuccess,
  data: arts,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  const { user } = useAuthSelector()

  const approvalDisclosure = useDisclosure()

  const handleClickRow = (index: number) => {
    setSelectedIndex(index)
    approvalDisclosure.onOpen()
  }

  const [selectedIndex, setSelectedIndex] = useState<number>()

  const selectedArt =
    typeof selectedIndex === 'number' ? arts?.[selectedIndex] : null

  return (
    <>
      {selectedArt && user && (
        <ArtApprovalModal
          art={selectedArt}
          editor={user}
          isOpen={approvalDisclosure.isOpen}
          onClose={approvalDisclosure.onClose}
          artist={selectedArt.artist}
          onSuccess={onSuccess}
        />
      )}
      <DataTable
        data={arts}
        columns={artColumns}
        onClickRow={handleClickRow}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={onSort}
      />
    </>
  )
}
