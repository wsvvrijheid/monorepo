import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import {
  useArtFeedbackMutation,
  useDeleteModel,
  usePublishModel,
  useUnpublishModel,
  useUpdateModelMutation,
} from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { Art } from '@wsvvrijheid/types'

import { WConfirm, WConfirmProps } from '../../../components/WConfirm'
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

  const [selectedIndex, setSelectedIndex] = useState<number>()
  const feedbackMutation = useArtFeedbackMutation()
  const deleteArtMutation = useDeleteModel('api/arts')
  const updateArtMutation = useUpdateModelMutation('api/arts')
  const publishArtMutation = usePublishModel('api/arts')
  const unpublishArtMutation = useUnpublishModel('api/arts')
  const selectedArt =
    typeof selectedIndex === 'number' ? arts?.[selectedIndex] : null
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const handleClickRow = (index: number) => {
    setSelectedIndex(index)
    approvalDisclosure.onOpen()
  }

  const handleSuccess = () => {
    onSuccess?.()
    setConfirmState(undefined)
    approvalDisclosure.onClose()
  }

  const handleReject = async (art: number, message: string) => {
    setConfirmState({
      isWarning: true,
      title: 'Reject art',
      description: 'Are you sure you want to reject this art?',
      buttonText: 'Reject',
      onConfirm: async () => {
        feedbackMutation.mutate(
          {
            art,
            message,
            status: 'rejected',
            point: 10,
          },
          { onSuccess: handleSuccess },
        )
      },
    })
  }

  const handleApprove = (art: number, message: string) => {
    setConfirmState({
      title: 'Approve art',
      description: 'Are you sure you want to approve this art?',
      buttonText: 'Approve',
      onConfirm: async () => {
        feedbackMutation.mutate(
          {
            art,
            message,
            status: 'approved',
            point: 10,
          },
          { onSuccess: handleSuccess },
        )
      },
    })
  }

  const handleDelete = (id: number) => {
    setConfirmState({
      isWarning: true,
      title: 'Delete art',
      description: 'Are you sure you want to delete this art?',
      buttonText: 'Delete',
      onConfirm: async () => {
        deleteArtMutation.mutate({ id }, { onSuccess: handleSuccess })
      },
    })
  }

  const handlePublish = (id: number) => {
    setConfirmState({
      title: 'Publish art',
      description: 'Are you sure you want to publish this art?',
      buttonText: 'Publish',
      onConfirm: async () => {
        publishArtMutation.mutate({ id }, { onSuccess: handleSuccess })
      },
    })
  }

  const handleUnPublish = (id: number) => {
    setConfirmState({
      title: 'Unpublish art',
      description: 'Are you sure you want to unpublish this art?',
      buttonText: 'Publish',
      onConfirm: async () => {
        unpublishArtMutation.mutate({ id }, { onSuccess: handleSuccess })
      },
    })
  }

  const onSave = (
    artId: number,
    data: string,
    updateValue: 'content' | 'description' | 'title',
  ) => {
    updateArtMutation.mutate({
      id: artId,
      [updateValue]: data,
    })
  }

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      {selectedArt && user && (
        <ArtApprovalModal
          art={selectedArt}
          editorAvatar={user.avatar as string}
          editorName={user.username as string}
          isOpen={approvalDisclosure.isOpen}
          onApprove={handleApprove}
          onDelete={handleDelete}
          onReject={handleReject}
          onClose={approvalDisclosure.onClose}
          onPublish={handlePublish}
          unPublish={handleUnPublish}
          artistName={selectedArt.artist?.username as string}
          artistAvatar={selectedArt.artist?.avatar?.url as string}
          onSave={onSave}
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
