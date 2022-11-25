import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import {
  useDeletePost,
  useApproveMutation,
  usePublishModel,
  useUnpublishModel,
} from '@wsvvrijheid/services'
import { Post } from '@wsvvrijheid/types'

import { WConfirm, WConfirmProps } from '../../../components'
import { PostDetailModal } from '../../PostDetailModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type PostsTableProps = Omit<DataTableProps<Post>, 'columns'> & {
  queryKey?: QueryKey
}

export const PostsTable: FC<PostsTableProps> = ({
  queryKey,
  data: posts,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const confirmDisclosure = useDisclosure()
  const selectedPost =
    typeof selectedIndex === 'number' ? posts?.[selectedIndex] : null
  const openEditModal = useDisclosure()
  const [confirmState, setConfirmState] =
    useState<Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>>()

  const handleClickRow = (index: number, id: number) => {
    setSelectedIndex(index)
    openEditModal.onOpen()
  }

  const deletepost = useDeletePost(queryKey)
  const approveMutation = useApproveMutation(queryKey)
  const publishPostMutation = usePublishModel('api/posts', queryKey)
  const unpublishPostMutation = useUnpublishModel('api/posts', queryKey)
  //delete post =================
  const handleDelete = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      isWarning: true,
      title: 'Delete post',
      description: 'Are you sure you want to delete this post?',
      buttonText: 'Delete',
      onConfirm: async () => {
        await deletepost.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const handleApprove = (id: number) => {
    confirmDisclosure.onOpen()

    setConfirmState({
      title: 'Approve post',
      description: 'Are you sure you want to approve this post?',
      buttonText: 'Approve',
      onConfirm: async () => {
        await approveMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const onPublish = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Publish post',
      description: `Are you sure you want to publish this post ?`,
      buttonText: 'Publish',
      onConfirm: async () => {
        await publishPostMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }

  const onUnPublish = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Un Publish Post',
      description: `Are you sure you want to unpublish this post ?`,
      buttonText: 'Unpublish',
      onConfirm: async () => {
        await unpublishPostMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  return (
    <>
      {confirmState && (
        <WConfirm
          isOpen={confirmDisclosure.isOpen}
          onClose={confirmDisclosure.onClose}
          {...confirmState}
        />
      )}
      {selectedPost && openEditModal.isOpen && confirmState && (
        <PostDetailModal
          localizePost={{
            tr: selectedPost,
            en: selectedPost,
            nl: selectedPost,
          }}
          isOpen={openEditModal.isOpen}
          onClose={openEditModal.onClose}
          onDelete={handleDelete}
          onPublish={onPublish}
          onApprove={handleApprove}
          unPublish={onUnPublish}
          confirmState={confirmState}
        />
      )}
      <DataTable
        data={posts}
        columns={columns}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={onSort}
        onClickRow={handleClickRow}
      />{' '}
    </>
  )
}
