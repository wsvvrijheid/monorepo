import { Box, Button, Grid, IconButton } from '@chakra-ui/react'
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

  const { data: hashtag } = useHashtagContext()

  const { setIsOpen } = useTour()

  if (!hashtag) return null

  return (
    <>
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
        h={{ base: 'auto', lg: 640 }}
        alignItems="stretch"
      >
        <Box display={{ base: 'none', lg: 'block' }} h="inherit">
          <MentionList />
          <TrendListTabs />
        </Box>
        {hashtag.posts && <PostMakerTweetList posts={hashtag.posts} />}
        <Box>
          <TweetWidget
            title={t('post.latest-tweets-label')}
            tweets={hashtag?.tweets}
          />
        </Box>
      </Grid>
    </>
  )
}
