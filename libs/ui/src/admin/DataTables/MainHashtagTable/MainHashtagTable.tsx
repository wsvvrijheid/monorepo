import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import { useUpdateHashtagMutation } from '@wsvvrijheid/services'
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
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const handleClickRow = (index: number, id: number) => {
    // router.push(`/hashtags/${id}`)
    setSelectedIndex(index)
    mainhashtagDisclosure.onOpen()
  }
  const selectedMainHashtag =
    typeof selectedIndex === 'number' ? mainHashtag?.[selectedIndex] : null
  const [confirmProps] =
    useState<Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>>() //setConfirmProps
  const updateField = useUpdateHashtagMutation(queryKey)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleDelete = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handlePublish = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleUnPublish = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function

  const onSave = async (id: number, newData: any, text: string) => {
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
      {confirmProps && (
        <WConfirm
          isOpen={confirmDisclosure.isOpen}
          onClose={confirmDisclosure.onClose}
          {...confirmProps}
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
          mentions={selectedMainHashtag?.mentions as Mention[]}
          mainhashtagImage={selectedMainHashtag?.image as unknown as Blob[]}
          isOpen={mainhashtagDisclosure.isOpen}
          onDelete={handleDelete}
          onClose={mainhashtagDisclosure.onClose}
          onPublish={handlePublish}
          unPublish={handleUnPublish}
          onSave={onSave}
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
