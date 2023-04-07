import { FC, useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Art, StrapiLocale } from '@wsvvrijheid/types'

import { ArtFeedbackForm } from './ArtFeedbackForm'
import { ArtApprovalTypes } from './types'
import { WImage } from '../../components'
import { artFields, artSchema } from '../../data'
import { ModelEditForm } from '../ModelForm'

export const ArtApprovalModal: FC<ArtApprovalTypes> = ({
  art,
  artist,
  isOpen,
  onClose,
  onSuccess,
  editor,
}) => {
  const router = useRouter()
  const locale = router.locale as StrapiLocale
  const [isEditing, setIsEditing] = useState(false)

  const [language, setLanguage] = useState<StrapiLocale>(locale)

  const titleKey = `title_${language}` as const
  const descriptionKey = `description_${language}` as const

  const title = art[titleKey]
  const description = art[descriptionKey]

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="95vw" h="full" p={0} overflow="hidden">
          <ModalCloseButton />
          <ModalBody p={0}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} h="full">
              <WImage src={art.image} alt={title} hasZoom={true} />
              {!isEditing && (
                <Stack overflowY={'auto'}>
                  <Stack spacing={4} p={{ base: 4, lg: 8 }} flex={1}>
                    <ButtonGroup isAttached>
                      {['en', 'nl', 'tr'].map(lang => (
                        <Button
                          textTransform={'uppercase'}
                          variant={language === lang ? 'solid' : 'outline'}
                          onClick={() => setLanguage(lang as StrapiLocale)}
                        >
                          {lang}
                        </Button>
                      ))}
                    </ButtonGroup>
                    <HStack spacing={4}>
                      <Heading color={'primary.500'} fontWeight={700}>
                        {title}
                      </Heading>
                      <Tag
                        size={'lg'}
                        colorScheme={
                          art.approvalStatus === 'approved'
                            ? 'green'
                            : art.approvalStatus === 'rejected'
                            ? 'red'
                            : 'yellow'
                        }
                      >
                        {art.approvalStatus === 'approved'
                          ? 'Approved'
                          : art.approvalStatus === 'rejected'
                          ? 'Rejected'
                          : 'Pending'}
                      </Tag>
                    </HStack>
                    {artist && (
                      <HStack spacing={3} w={'full'}>
                        <Avatar
                          size="md"
                          src={artist.avatar?.url}
                          name={artist.name || artist.username}
                        />
                        <Box>
                          <Text fontWeight={700}>{artist.name}</Text>
                          <Text>{artist.username}</Text>
                        </Box>
                      </HStack>
                    )}
                    <Stack flex={1} h={'full'}>
                      <Text color={'black'} fontWeight={700}>
                        Description
                      </Text>
                      <Text overflowY={'auto'} h={'full'}>
                        {description || 'No description'}
                      </Text>
                    </Stack>
                  </Stack>
                  <Box
                    pos={'sticky'}
                    bottom={0}
                    bg={'white'}
                    p={{ base: 4, lg: 8 }}
                    borderBottomWidth={1}
                  >
                    <ArtFeedbackForm
                      art={art}
                      editor={editor}
                      onClose={onClose}
                      onSuccess={onSuccess}
                      setIsEditing={setIsEditing}
                    />
                  </Box>
                </Stack>
              )}
              {isEditing && (
                <Stack spacing={4} p={{ base: 4, lg: 8 }} overflowY={'auto'}>
                  <HStack justify={'space-between'}>
                    <Heading color={'primary.500'} fontWeight={700}>
                      Edit
                    </Heading>
                    <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                  </HStack>
                  <ModelEditForm<Art>
                    noColumns
                    fields={artFields}
                    schema={artSchema}
                    url={'api/arts'}
                    model={art}
                    onSuccess={() => setIsEditing(false)}
                  />
                </Stack>
              )}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
