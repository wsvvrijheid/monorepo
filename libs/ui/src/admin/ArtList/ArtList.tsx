import { FC, useState } from 'react'

import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Art } from '@wsvvrijheid/types'

import { FormattedDate } from '../../components'
import { useAuth } from '../../hooks'
import { ArtApprovalModal } from '../ArtApprovalModal'

export type ArtListProps = {
  arts: Art
  handleClick?: () => void
  handleApprove?: () => void
  handleDelete?: () => void
  handleReject?: () => void
  isOpen: boolean
  onClose: () => void
}

export const ArtList: FC<ArtListProps> = ({
  arts,
  isOpen,
  handleClick,
  handleApprove,
  handleDelete,
  onClose,
  handleReject,
}) => {
  const { user } = useAuth()
  const [art, setArt] = useState()
  console.log('arts in ArtList', arts, 'editor user', user)
  const onSave = (data: string) => {
    alert(`${data} saved`)
  }
  const handleTrClick = art => {
    console.log('handle click tr >>>>>>>>>>>>>>>>>>>>>>>', art)
    setArt(art)
    handleClick()
  }
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>author</Th>
            <Th>description</Th>
            <Th>date</Th>
            <Th>status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {arts?.map(art => (
            <Tr onClick={() => handleTrClick(art)}>
              <Td>{art.title}</Td>
              <Td>{art.artist.username}</Td>
              <Td>{art.description}</Td>
              <Td>
                <FormattedDate date={art.publishedAt as string} />
              </Td>
              <Td>{art.approvalStatus}</Td>
            </Tr>
          ))}
          <Box>
            <ArtApprovalModal
              artId={art?.id}
              artTitle={art?.title}
              artDescription={art?.description}
              artImages={art?.images}
              editorId={user?.id}
              editorAvatar={user?.avatar}
              editorName={user?.username}
              isOpen={isOpen}
              onApprove={handleApprove}
              onDelete={handleDelete}
              onReject={handleReject}
              onClose={onClose}
              artistName={art?.artist.username}
              artistAvatar={art?.artist.avatar}
              onSave={onSave}
            />
          </Box>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
