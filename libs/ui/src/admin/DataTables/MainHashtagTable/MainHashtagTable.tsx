import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import {
  useDeleteMainhashtag,
  useGetMentions,
  usePublishModel,
  useUnpublishModel,
  useUpdateHashtagMutation,
} from '@wsvvrijheid/services'
import { Hashtag, Mention } from '@wsvvrijheid/types'

import { WConfirm, WConfirmProps } from '../../../components'
import { MainHashtagDetailModal } from '../../MainHashtagDetailModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type MainHashtagTableProps = Omit<DataTableProps<Hashtag>, 'columns'> & {
  queryKey?: QueryKey
}

export const MainHashtagTable: FC<MainHashtagTableProps> = ({
  data: mainHashtag,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
  queryKey,
}) => {
  const mainhashtagDisclosure = useDisclosure()
  const confirmDisclosure = useDisclosure()
  const [confirmState, setConfirmState] =
    useState<Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>>()

  const [selectedIndex, setSelectedIndex] = useState<number>()
  const handleClickRow = (index: number, id: number) => {
    setSelectedIndex(index)
    mainhashtagDisclosure.onOpen()
  }
  const selectedMainHashtag =
    typeof selectedIndex === 'number' ? mainHashtag?.[selectedIndex] : null
  const currentMentions = useGetMentions()
  const updateField = useUpdateHashtagMutation(queryKey)
  const deleteMainhashtag = useDeleteMainhashtag(queryKey)
  const publishMainhashtagMutation = usePublishModel('api/hashtags', queryKey)
  const unpublishMainhashtagMutation = useUnpublishModel(
    'api/hashtags',
    queryKey,
  )
  //delete mainhashtag =================
  const handleDelete = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      isWarning: true,
      title: 'Delete Mainhashtag',
      description: 'Are you sure you want to delete this mainhashtag?',
      buttonText: 'Delete',
      onConfirm: async () => {
        await deleteMainhashtag.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }

  const onPublish = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Publish Mainhashtag',
      description: `Are you sure you want to publish this mainhashtag ?`,
      buttonText: 'Publish',
      onConfirm: async () => {
        await publishMainhashtagMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const onUnPublish = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Un Publish Mainhashtag',
      description: `Are you sure you want to unpublish this mainhashtag ?`,
      buttonText: 'Unpublish',
      onConfirm: async () => {
        await unpublishMainhashtagMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const onSave = async (id: number, newData: Hashtag, text: string) => {
    updateField.mutate(
      { id, [text]: newData },
      {
        onSuccess: res => {
          console.log('response in table', res)
        },
        onError: error => console.log('error in table', error),
      },
    )
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
      {/* Mainhashtag detail modal ================ */}
      {selectedMainHashtag && (
        <MainHashtagDetailModal
          mainhashtagId={selectedMainHashtag.id}
          mainhashtagTitle={selectedMainHashtag.title}
          mainhashtagDescription={selectedMainHashtag.description}
          mainhashtagContent={selectedMainHashtag.content}
          mainhashtagDate={selectedMainHashtag.date}
          mainhashtagHashtag={selectedMainHashtag.hashtag}
          mainhashtagPublishedAt={selectedMainHashtag.publishedAt}
          mainhashtagHashtagExtra={selectedMainHashtag?.hashtagExtra as string}
          mentions={currentMentions?.data as Mention[]}
          mainhashtagMentions={selectedMainHashtag?.mentions as Mention[]}
          mainhashtagImage={selectedMainHashtag?.image as unknown as Blob[]}
          isOpen={mainhashtagDisclosure.isOpen}
          onDelete={handleDelete}
          onClose={mainhashtagDisclosure.onClose}
          onPublish={onPublish}
          unPublish={onUnPublish}
          onSave={onSave}
          posts={selectedMainHashtag?.posts}
        />
      )}
      <DataTable
        data={mainHashtag}
        columns={columns}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={onSort}
        onClickRow={handleClickRow}
      />
    </>
  )
}
