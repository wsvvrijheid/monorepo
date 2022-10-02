import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import {
  AdminLayout,
  ArtAddToCollectionGrid,
  ArtAddToCollectionModal,
  CollectionEdit,
} from '@wsvvrijheid/ui'
import { useCollectionById } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { IoMdAdd } from 'react-icons/io'

const CollectionPage = () => {
  const { query } = useRouter()

  const id = Number(query.id as string)
  const { data, isLoading } = useCollectionById(id)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <AdminLayout title="Collection" isLoading={isLoading}>
      <ArtAddToCollectionModal
        isOpen={isOpen}
        onClose={onClose}
        collection={data}
      />
      <Stack spacing={6}>
        <Box p={6} rounded="md" bg="white" shadow="md">
          {data && <CollectionEdit collection={data} />}
        </Box>

        <Box p={6} rounded="md" bg="white" shadow="md">
          {data && (
            <Stack spacing={6}>
              <HStack justify="space-between">
                <Text fontWeight="bold" fontSize="xl" noOfLines={1}>
                  Collection Arts
                </Text>

                <Button
                  colorScheme="primary"
                  leftIcon={<IoMdAdd />}
                  onClick={onOpen}
                >
                  Add arts to collection
                </Button>
              </HStack>
              {data.arts && (
                <ArtAddToCollectionGrid
                  collection={data}
                  arts={data.arts.map(art => ({ ...art, data }))}
                />
              )}
            </Stack>
          )}
        </Box>
      </Stack>
    </AdminLayout>
  )
}

export default CollectionPage
