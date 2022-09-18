import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { Art, SessionUser } from '@wsvvrijheid/types'

import { Container, Pagination } from '../../components'
import { WTable } from '../../components/WTable/WTable'
import { ArtApprovalModal } from '../ArtApprovalModal'

export type ArtListProps = {
  arts: Art[]
  user: SessionUser
  totalCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

export const ArtList: FC<ArtListProps> = ({
  arts,
  user,
  totalCount,
  currentPage,
  setCurrentPage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedIndex, setSelectedIndex] = useState<number>()
  const artsData = {
    data: arts,
    columns: {
      images: {
        type: 'images',
      },
      title: {},
      artist: {
        transform: value => (value as artist).username,
        sortable: true,
      },
      approvalStatus: {
        type: 'badge',
        componentProps: value => {
          const colorScheme = {
            approved: 'green',
            pending: 'yellow',
            rejected: 'red',
          }
          return {
            variant: 'outline',
            colorScheme: colorScheme[value as string],
          }
        },
      },
      publishedAt: {
        type: 'date',
        componentProps: {
          format: 'dd MMMM',
        },
        sortable: true,
      },
    },
  }
  const selectedArt = !isNaN(selectedIndex) ? arts?.[selectedIndex] : null
  const handleClick = (index: number) => {
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
    <Container>
      {arts?.length > 0 && (
        <WTable
          data={arts}
          columns={artsData.columns}
          onClickRow={handleClick}
        />
      )}
      {selectedArt && user && (
        <ArtApprovalModal
          artId={selectedArt.id}
          artTitle={selectedArt.title}
          artDescription={selectedArt.description}
          artImages={selectedArt.images}
          editorId={user.id as number}
          editorAvatar={user.avatar as string}
          editorName={user.username as string}
          isOpen={isOpen}
          onApprove={handleApprove}
          onDelete={handleDelete}
          onReject={handleReject}
          onClose={onClose}
          artistName={selectedArt.artist.username}
          artistAvatar={selectedArt.artist?.avatar?.url}
          onSave={onSave}
        />
      )}
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Container>
  )
}
