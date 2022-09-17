import { FC } from 'react'

import {
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

export type ArtListProps = {
  arts: Art[]
  handleClick: (index: number) => void
}

export const ArtList: FC<ArtListProps> = ({ arts, handleClick }) => {
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
          {arts?.map((art, index) => (
            <Tr
              onClick={() => handleClick(index)}
              _hover={{ bg: 'blackAlpha.100', cursor: 'pointer' }}
            >
              <Td>{art.title}</Td>
              <Td>{art?.artist?.username}</Td>
              <Td>{art.description}</Td>
              <Td>
                <FormattedDate date={art.publishedAt as string} />
              </Td>
              <Td>{art.approvalStatus}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
