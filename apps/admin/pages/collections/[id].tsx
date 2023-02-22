import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useModelById } from '@wsvvrijheid/services'
import { Collection } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ArtAddToCollectionGrid,
  ArtAddToCollectionModal,
  CollectionEdit,
  Navigate,
  PageHeader,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { IoMdAdd } from 'react-icons/io'

const CollectionPage = () => {
  const { query } = useRouter()

  const id = Number(query.id as string)
  const {
    data: collection,
    isLoading,
    refetch,
  } = useModelById<Collection>({
    url: 'api/collections',
    id,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <AdminLayout title="Collection" isLoading={isLoading} hasBackButton>
      <PageHeader>
        <ButtonGroup>
          {collection?.localizations?.map(l => (
            <Navigate key={l.id} href={`/collections/${l.id}`}>
              <Button textTransform={'uppercase'}>{l.locale}</Button>
            </Navigate>
          ))}
        </ButtonGroup>
      </PageHeader>
      <ArtAddToCollectionModal
        isOpen={isOpen}
        onClose={onClose}
        collection={collection}
      />
      <Stack spacing={6}>
        <Box p={6} rounded="md" bg="white" shadow="md">
          {collection && (
            <CollectionEdit collection={collection} onSuccess={refetch} />
          )}
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
                  arts={collection.arts.map(art => ({ ...art, collection }))}
                  onSuccess={refetch}
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
