import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useAuthContext } from '@wsvvrijheid/context'
import { Art, StrapiLocale } from '@wsvvrijheid/types'

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
  const { user } = useAuthContext()

  const { locale } = useRouter()

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
        columns={artColumns(locale as StrapiLocale)}
        onClickRow={handleClickRow}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={onSort}
      />
    </>
  )
}
