import { useEffect } from 'react'

import {
  Box,
  Button,
  DrawerCloseButton,
  Grid,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { useTour } from '@reactour/tour'
import {
  checkSharedPosts,
  setRandomMentionUsername,
  togglePostModal,
  useAppDispatch,
  useAppSelector,
  useCurrentPost,
  useHashtag,
} from '@wsvvrijheid/utils'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { FaQuestionCircle } from 'react-icons/fa'

import { useGenerateRandomPostText } from '../hooks'
import { MentionAndTrends } from './MentionAndTrends'
import { PostContainer } from './PostContainer'
import { TweetWidget } from './TweetWidget'

export const PostMaker = () => {
  const { isPostModalOpen, sharedPosts } = useAppSelector(state => state.post)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const generateRandomPostText = useGenerateRandomPostText()

  const { data: hashtag } = useHashtag()
  const currentPost = useCurrentPost()

  const { setIsOpen } = useTour()

  useEffect(() => {
    const sharedStorage = localStorage.getItem(hashtag?.slug as string)
    if (sharedStorage) {
      dispatch(checkSharedPosts())
    }
  }, [hashtag, dispatch])

  useEffect(() => {
    const randomMention = _.sample(hashtag?.mentions)
    if (randomMention)
      dispatch(setRandomMentionUsername(randomMention?.username))
  }, [currentPost, hashtag?.mentions, dispatch])

  useEffect(() => {
    generateRandomPostText(currentPost)
  }, [currentPost, generateRandomPostText])

  return (
    <>
      <Button
        display={{ base: 'none', lg: 'flex' }}
        zIndex="sticky"
        pos="fixed"
        right={4}
        bottom={4}
        colorScheme="primary"
        leftIcon={<FaQuestionCircle />}
        onClick={() => setIsOpen(true)}
      >
        {t`post.help`}
      </Button>
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        zIndex="sticky"
        pos="fixed"
        size="lg"
        right={2}
        bottom={2}
        rounded="full"
        colorScheme="primary"
        aria-label="help"
        shadow="primary"
        icon={<FaQuestionCircle />}
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={isPostModalOpen}
        size="sm"
        onClose={() => dispatch(togglePostModal())}
        closeOnOverlayClick={false}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent py={4} h="100vh" pos="relative">
          <DrawerCloseButton />
          <ModalBody as={Stack} w={{ base: 'full', lg: 300 }}>
            <MentionAndTrends />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Grid
        gap={4}
        gridTemplateColumns={{ base: '1fr', lg: '300px 1fr 300px' }}
        h={{ base: 'auto', lg: 640 }}
        alignItems="stretch"
      >
        <Box display={{ base: 'none', lg: 'block' }} h="inherit">
          <MentionAndTrends />
        </Box>
        <PostContainer
          post={currentPost}
          sharedPosts={sharedPosts}
          posts={hashtag?.posts}
        />
        <Box>
          <TweetWidget
            title={t`post.latest-tweets-label`}
            tweets={hashtag?.tweets}
          />
        </Box>
      </Grid>
    </>
  )
}
