import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useAuthContext } from '@wsvvrijheid/context'
import { Art } from '@wsvvrijheid/types'

import { WTableProps } from '../../../components'
import { useColumns } from '../../../data'
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
  const { user } = useAuthContext()
  const [selectedIndex, setSelectedIndex] = useState<number>()

  const columns = useColumns()

  const selectedArt =
    typeof selectedIndex === 'number' ? arts?.[selectedIndex] : null
  const approvalDisclosure = useDisclosure()

  const handleClickRow = (index: number) => {
    setSelectedIndex(index)
    approvalDisclosure.onOpen()
  }

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
      <DataTable<Art>
        data={arts}
        columns={columns.arts as WTableProps<Art>['columns']}
        onClickRow={handleClickRow}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={onSort}
      />
    </>
  )
}
