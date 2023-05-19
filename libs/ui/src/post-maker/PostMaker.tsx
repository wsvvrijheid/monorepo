import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Grid,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useTour } from '@reactour/tour'
import { useTranslation } from 'next-i18next'
import { FaQuestionCircle } from 'react-icons/fa'

import { useHashtagContext } from '@wsvvrijheid/context'

import { MentionList } from './Mention'
import { TrendListTabs } from './Trends'
import { TweetWidget } from './TweetWidget'
import { PostMakerTweetList } from '../components/PostMakerTweetCard'

export const PostMaker = () => {
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? true

  const {
    data: hashtag,
    mentionsDisclosure,
    trendsDisclosure,
  } = useHashtagContext()

  const { setIsOpen } = useTour()

  if (!hashtag) return null

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        isOpen={!isMobile && mentionsDisclosure.isOpen}
        onClose={mentionsDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <MentionList />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={true}
        isOpen={!isMobile && trendsDisclosure.isOpen}
        onClose={trendsDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <TrendListTabs />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={isMobile && mentionsDisclosure.isOpen}
        onClose={mentionsDisclosure.onClose}
        placement={'bottom'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <MentionList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isMobile && trendsDisclosure.isOpen}
        onClose={trendsDisclosure.onClose}
        placement={'bottom'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <TrendListTabs />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button
        display={{ base: 'none', lg: 'flex' }}
        zIndex="sticky"
        pos="fixed"
        right={4}
        bottom={4}
        leftIcon={<FaQuestionCircle />}
        onClick={() => setIsOpen(true)}
      >
        {t('post.help')}
      </Button>
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        zIndex="sticky"
        pos="fixed"
        size="lg"
        right={2}
        bottom={2}
        rounded="full"
        aria-label="help"
        shadow="base"
        icon={<FaQuestionCircle />}
        onClick={() => setIsOpen(true)}
      />
      <Grid
        gap={4}
        gridTemplateColumns={{ base: '1fr', lg: '300px 1fr 300px' }}
        h={{ base: 'auto', lg: 'calc(100vh - 130px)' }}
        alignItems="stretch"
      >
        <Box display={{ base: 'none', lg: 'block' }} h="inherit"></Box>
        {/* TODO: Skeleton */}
        {hashtag.posts && (
          <Box h={'inherit'} overflowY={'auto'}>
            <PostMakerTweetList posts={hashtag.posts} />
          </Box>
        )}
        <Box h={'inherit'} overflowY={'auto'}>
          <TweetWidget
            title={t('post.latest-tweets-label')}
            tweets={hashtag?.tweets}
          />
        </Box>
      </Grid>
    </>
  )
}
