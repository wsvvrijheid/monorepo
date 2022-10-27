import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useCollectionById } from '@wsvvrijheid/services'
import {
  AdminLayout,
  ArtAddToCollectionGrid,
  ArtAddToCollectionModal,
  CollectionEdit,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { IoMdAdd } from 'react-icons/io'

const CollectionPage = () => {
  const { query } = useRouter()

  const id = Number(query.id as string)
  const { data: collection, isLoading } = useCollectionById(id)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <AdminLayout title="Collection" isLoading={isLoading}>
      <ArtAddToCollectionModal
        isOpen={isOpen}
        onClose={onClose}
        collection={collection}
      />
      <Stack spacing={6}>
        <Box p={6} rounded="md" bg="white" shadow="md">
          {collection && <CollectionEdit collection={collection} />}
        </Box>

        <Box p={6} rounded="md" bg="white" shadow="md">
          {collection && (
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
              {collection.arts && (
                <ArtAddToCollectionGrid
                  collection={collection}
                  arts={collection.arts.map(art => ({
                    ...art,
                    collection: collection,
                  }))}
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
