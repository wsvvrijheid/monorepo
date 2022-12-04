import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Progress,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Divider,
  HStack,
} from '@chakra-ui/react'
import { FiArrowUpRight } from 'react-icons/fi'
import { GrFormClose } from 'react-icons/gr'
import stringSimilarity from 'string-similarity'

import { FilePicker } from '../FilePicker'
import { CreateTweetFormProps } from './types'

export const CreateTweetForm: React.FC<CreateTweetFormProps> = ({
  onSubmit,
  isOpen,
  onClose,
  originalTweet,
}) => {
  const [text, setText] = useState('')
  const [similarityCount, setSimilarityCount] = useState(0)
  const [media, setMedia] = useState<File>()

  const handleFiles = (files: File[]) => {
    if (Array.isArray(files) && files.length > 0) {
      setMedia(files[0])
    } else {
      setMedia(files as unknown as File)
    }
  }

  useEffect(() => {
    const similarity =
      stringSimilarity.compareTwoStrings(text, originalTweet.text) * 100
    setSimilarityCount(similarity)
  }, [text, originalTweet.text])

  const onSubmitHandler = () => {
    onSubmit(text, originalTweet, media)
  }
  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="95vw" h="full" p={{ base: 2, lg: 8 }}>
          <ModalCloseButton />
          <ModalHeader>
            <Text color={'primary.500'} fontWeight={'bold'} w={'full'}>
              Create Tweet
            </Text>
          </ModalHeader>
          <ModalBody>
            <SimpleGrid columns={{ base: 1, lg: 1 }} spacing={4} h="full">
              <Stack>
                <Text color={'black'} fontWeight={'bold'} w={'full'}>
                  Original Tweet
                </Text>
                <Stack>
                  <Text w={'full'}>{originalTweet.text}</Text>
                </Stack>
                <Text color={'black'} fontWeight={'bold'} w={'full'}>
                  Edited Tweet
                </Text>
                <Stack w={'full'}>
                  {/* text area*/}
                  <Textarea
                    isRequired
                    onChange={e => setText(e.target.value)}
                    placeholder={'Tweet content'}
                  ></Textarea>
                </Stack>
                {/* TODO 
                ADD MENTION
                ADD HASHTAG
                */}
                {/* plagiarism ................*/}
                <Stack>
                  <HStack>
                    <Text
                      fontSize="md"
                      color={'black'}
                      fontWeight={'bold'}
                      w={'full'}
                    >
                      Plagiarism
                    </Text>
                    <Text color={text?.length > 279 ? 'red' : 'black'}>
                      {text?.length}/280
                    </Text>
                  </HStack>

                  <Progress
                    colorScheme={similarityCount > 60 ? 'red' : 'green'}
                    size="lg"
                    value={similarityCount}
                  />
                  <Text fontSize="xs" colorScheme={'gray.500'} w={'full'}>
                    *The Lower is better
                  </Text>
                </Stack>
                <Divider />
                <Stack>
                  <Text color={'black'} fontWeight={'bold'} w={'full'}>
                    Add Image(s)
                  </Text>
                  <FilePicker setFiles={handleFiles} />
                </Stack>
              </Stack>
              {/* Button group ................*/}
              <Stack alignSelf="end">
                <ButtonGroup alignSelf="end">
                  <Button
                    bg={'transparent'}
                    mr={3}
                    leftIcon={<GrFormClose />}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="primary"
                    leftIcon={<FiArrowUpRight />}
                    onClick={onSubmitHandler}
                  >
                    Recommend
                  </Button>
                </ButtonGroup>
              </Stack>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
