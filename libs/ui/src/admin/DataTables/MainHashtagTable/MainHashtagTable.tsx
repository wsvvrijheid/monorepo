import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import { Hashtag } from '@wsvvrijheid/types'

import { MainHashtagDetailModal } from '../../MainHashtagDetailModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type MainHashtagTableProps = Omit<DataTableProps<Hashtag>, 'columns'> & {
  queryKey?: QueryKey
  onClose: () => void
  onDelete: (maninhashtagId: number) => void
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
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const mainhashtagDisclosure = useDisclosure()
  const handleClickRow = (index: number, id: number) => {
    setSelectedIndex(index)
    mainhashtagDisclosure.onOpen()
  }
  const selectedMainHashtag =
    typeof selectedIndex === 'number' ? mainHashtag?.[selectedIndex] : null

  return (
    <>
      {/* Mainhashtag detail modal ================ */}
      {selectedMainHashtag && mainhashtagDisclosure.isOpen && (
        <MainHashtagDetailModal
          // TODO: Create a generic function to generate localizations from a given model
          localizeHashtag={{
            tr: selectedMainHashtag,
            en: selectedMainHashtag,
            nl: selectedMainHashtag,
          }}
          isOpen={mainhashtagDisclosure.isOpen}
          onClose={mainhashtagDisclosure.onClose}
          onDelete={onDelete}
          onPublish={onPublish}
          unPublish={unPublish}
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
