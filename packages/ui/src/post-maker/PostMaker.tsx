import { FC } from 'react'

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
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useTour } from '@reactour/tour'
import { useTranslation } from 'next-i18next'
import { FaQuestionCircle } from 'react-icons/fa'

import { useHashtag } from '@wsvvrijheid/services'

import { useHashtagContext } from './HashtagProvider'
import { HashtagStats } from './HashtagStats'
import { MentionList } from './Mention'
import { PostMakerTweetList } from './PostMakerTweetCard'
import { TimelineTrendsTabs } from './TimelineTrendsTabs'
import { TrendListTabs } from './Trends'

type PostMakerProps = {
  isAdminMode?: boolean
  isIosSafari?: boolean
}

export const PostMaker: FC<PostMakerProps> = ({ isAdminMode, isIosSafari }) => {
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? true

  const { mentionsDisclosure, trendsDisclosure } = useHashtagContext()

  const hashtag = useHashtag()

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
        gap={2}
        gridTemplateColumns={{ base: '1fr', lg: '300px 1fr 300px' }}
        h={{ base: 'auto', lg: 'calc(100vh - 130px)' }}
        alignItems="stretch"
      >
        <Box order={{ base: 1, lg: 0 }} h="inherit">
          <HashtagStats />
        </Box>
        {/* TODO: Skeleton */}
        {hashtag.posts ? (
          <Box order={{ base: 0, lg: 1 }} h={'inherit'} overflowY={'auto'}>
            <PostMakerTweetList
              posts={hashtag.posts}
              isAdminMode={isAdminMode}
              isIosSafari={isIosSafari}
            />
          </Box>
        ) : (
          <Skeleton />
        )}

        <Box order={{ base: 2, lg: 2 }} h={'inherit'} overflowY={'auto'}>
          <TimelineTrendsTabs />
        </Box>
      </Grid>
    </>
  )
}
