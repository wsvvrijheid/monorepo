import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import { Art, SessionUser, UploadFile } from '@wsvvrijheid/types'
import { useArtFeedbackMutation, useDeleteArt } from '@wsvvrijheid/utils'

import { ArtApprovalModal } from '../../ArtApprovalModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type ArtsTableProps = Omit<DataTableProps<Art>, 'columns'> & {
  user: SessionUser
  queryKey?: QueryKey
}

export const ArtsTable: FC<ArtsTableProps> = ({
  queryKey,
  data: arts,
  user,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescription] = useState<string>('')
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const feedbackMutation = useArtFeedbackMutation(queryKey)
  const deleteArtMutation = useDeleteArt(queryKey)
  const selectedArt =
    typeof selectedIndex === 'number' ? arts?.[selectedIndex] : null

  const handleClickRow = (index: number) => {
    setSelectedIndex(index)
    onOpen()
  }
  // functions //////////////////////////

  const handleReject = (artId: number, editorId: number, feedback: string) => {
    if (window.confirm('Are you sure you want to reject this art')) {
      feedbackMutation.mutate({
        art: artId,
        editor: editorId,
        message: feedback,
        status: 'reject',
        point: 10,
        description,
      })
      onClose()
    }
  }
  const handleApprove = (artId: number, editorId: number, feedback: string) => {
    if (window.confirm('Are you sure you want to approve this art')) {
      feedbackMutation.mutate({
        art: artId,
        editor: editorId,
        message: feedback,
        status: 'approve',
        point: 10,
        description,
      })
      onClose()
    }
  }
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to deete this art')) {
      deleteArtMutation.mutate({ id })
      onClose()
    }
  }
  const onSave = (data: string) => {
    setDescription(data)
    alert(`${data} saved`)
  }
  console.log('arts table >>>>>>', arts)
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
