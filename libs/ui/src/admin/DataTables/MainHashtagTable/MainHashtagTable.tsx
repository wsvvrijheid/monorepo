import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import { useGetMentions } from '@wsvvrijheid/services'
import { Hashtag, Mention } from '@wsvvrijheid/types'

import { MainHashtagDetailModal } from '../../MainHashtagDetailModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type MainHashtagTableProps = Omit<DataTableProps<Hashtag>, 'columns'> & {
  queryKey?: QueryKey
  onClose: () => void
  onDelete: (maninhashtagId: number) => void
  onSave: (
    mainhashtagId: number,
    data: string,
    updateValue:
      | 'title'
      | 'content'
      | 'description'
      | 'hashtag'
      | 'hashtagExtra'
      | 'date'
      | 'image'
      | 'mentions',
  ) => void
  onPublish: (mainhashtagId: number) => void
  unPublish: (mainhashtagId: number) => void
}

export const MainHashtagTable: FC<MainHashtagTableProps> = ({
  data: mainHashtag,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
  onDelete,
  onPublish,
  unPublish,
  onSave,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const mainhashtagDisclosure = useDisclosure()
  const handleClickRow = (index: number, id: number) => {
    setSelectedIndex(index)
    mainhashtagDisclosure.onOpen()
  }
  const selectedMainHashtag =
    typeof selectedIndex === 'number' ? mainHashtag?.[selectedIndex] : null
  const currentMentions = useGetMentions()

  return (
    <>
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
          onClose={mainhashtagDisclosure.onClose}
          onDelete={onDelete}
          onPublish={onPublish}
          unPublish={unPublish}
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
