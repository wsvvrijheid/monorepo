import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { Art, SessionUser, UploadFile } from '@wsvvrijheid/types'

import { ArtApprovalModal } from '../../ArtApprovalModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type ArtsTableProps = Omit<DataTableProps<Art>, 'columns'> & {
  user: SessionUser
}

export const ArtsTable: FC<ArtsTableProps> = ({
  data: arts,
  user,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedIndex, setSelectedIndex] = useState<number>()

  const selectedArt =
    typeof selectedIndex === 'number' ? arts?.[selectedIndex] : null

  const handleClickRow = (index: number) => {
    setSelectedIndex(index)
    onOpen()
  }
  // functions //////////////////////////
  const handleReject = (artId: number, editorId: number, feedback: string) => {
    alert(feedback)
    onClose()
  }
  const handleApprove = (artId: number, editorId: number, feedback: string) => {
    alert(feedback)
    onClose()
  }
  const handleDelete = (id: number) => {
    alert(`${id} is deleted`)
    onClose()
  }
  const onSave = (data: string) => {
    alert(`${data} saved`)
  }

  return (
    <>
      {selectedArt && user && (
        <ArtApprovalModal
          artId={selectedArt.id}
          artTitle={selectedArt.title}
          artDescription={selectedArt.description}
          artImages={selectedArt.images as UploadFile[]}
          editorId={user.id as number}
          editorAvatar={user.avatar as string}
          editorName={user.username as string}
          isOpen={isOpen}
          onApprove={handleApprove}
          onDelete={handleDelete}
          onReject={handleReject}
          onClose={onClose}
          artistName={selectedArt.artist?.username as string}
          artistAvatar={selectedArt.artist?.avatar?.url as string}
          onSave={onSave}
        />
      )}
      <DataTable
        data={arts}
        columns={columns}
        onClickRow={handleClickRow}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={onSort}
      />
    </>
  )
}
