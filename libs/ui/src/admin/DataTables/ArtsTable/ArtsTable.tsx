import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import {
  useArtFeedbackMutation,
  useDeleteModel,
  usePublishModel,
  useUnpublishModel,
  useUpdateArtMutation,
} from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { Art, UploadFile } from '@wsvvrijheid/types'

import { WConfirm, WConfirmProps } from '../../../components/WConfirm'
import { ArtApprovalModal } from '../../ArtApprovalModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type ArtsTableProps = Omit<DataTableProps<Art>, 'columns'> & {
  queryKey?: QueryKey
}

export const ArtsTable: FC<ArtsTableProps> = ({
  queryKey,
  data: arts,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  const { user } = useAuthSelector()
  const approvalDisclosure = useDisclosure()

  const [selectedIndex, setSelectedIndex] = useState<number>()
  const feedbackMutation = useArtFeedbackMutation(queryKey)
  const deleteArtMutation = useDeleteModel('api/arts', queryKey)
  const updateArtMutation = useUpdateArtMutation(queryKey)
  const publishArtMutation = usePublishModel('api/arts', queryKey)
  const unpublishArtMutation = useUnpublishModel('api/arts', queryKey)
  const selectedArt =
    typeof selectedIndex === 'number' ? arts?.[selectedIndex] : null
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const handleClickRow = (index: number) => {
    setSelectedIndex(index)
    approvalDisclosure.onOpen()
  }

  const handleReject = async (art: number, editor: number, message: string) => {
    setConfirmState({
      isWarning: true,
      title: 'Reject art',
      description: 'Are you sure you want to reject this art?',
      buttonText: 'Reject',
      onConfirm: async () => {
        await feedbackMutation.mutateAsync({
          art,
          editor,
          message,
          status: 'reject',
          point: 10,
        })

        setConfirmState(undefined)
        approvalDisclosure.onClose()
      },
    })
  }

  const handleApprove = (art: number, editor: number, message: string) => {
    setConfirmState({
      title: 'Approve art',
      description: 'Are you sure you want to approve this art?',
      buttonText: 'Approve',
      onConfirm: async () => {
        await feedbackMutation.mutateAsync({
          art,
          editor,
          message,
          status: 'approve',
          point: 10,
        })

        setConfirmState(undefined)
        approvalDisclosure.onClose()
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
        await deleteArtMutation.mutateAsync({ id })

        setConfirmState(undefined)
        approvalDisclosure.onClose()
      },
    })
  }

  const handlePublish = (id: number) => {
    setConfirmState({
      title: 'Publish art',
      description: 'Are you sure you want to publish this art?',
      buttonText: 'Publish',
      onConfirm: async () => {
        await publishArtMutation.mutateAsync({ id })

        setConfirmState(undefined)
        approvalDisclosure.onClose()
      },
    })
  }

  const handleUnPublish = (id: number) => {
    setConfirmState({
      title: 'Unpublish art',
      description: 'Are you sure you want to unpublish this art?',
      buttonText: 'Publish',
      onConfirm: async () => {
        await unpublishArtMutation.mutateAsync({ id })

        setConfirmState(undefined)
        approvalDisclosure.onClose()
      },
    })
  }

  const onSave = (
    artId: number,
    data: string,
    updateValue: 'content' | 'description',
  ) => {
    updateArtMutation.mutate({
      id: artId,
      [updateValue]: data,
    })
  }

  return (
    <>
      {confirmState && <WConfirm {...confirmState} />}
      {selectedArt && user && (
        <ArtApprovalModal
          artId={selectedArt.id}
          artTitle={selectedArt.title}
          artDescription={selectedArt.description || ''}
          artContent={selectedArt.content || ''}
          artApprovalStatus={selectedArt.approvalStatus}
          artPublishedAt={selectedArt.publishedAt}
          artImages={selectedArt.images as UploadFile[]}
          editorId={user.id as number}
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
