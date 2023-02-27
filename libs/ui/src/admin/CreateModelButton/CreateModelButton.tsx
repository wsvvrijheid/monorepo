import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  Activity,
  Blog,
  Collection,
  Hashtag,
  Post,
  RecommendedTopic,
  RecommendedTweet,
} from '@wsvvrijheid/types'
import { BsCollection } from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { FaPlus } from 'react-icons/fa'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { TbActivity, TbBrandTwitter, TbWriting } from 'react-icons/tb'

import {
  activityFields,
  activitySchema,
  blogFields,
  blogSchema,
  collectionFields,
  collectionSchema,
  mainHashtagFields,
  mainHashtagSchema,
  postFields,
  postSchema,
  recommendedTweetFields,
  recommendedTweetSchema,
  topicFields,
  topicSchema,
} from '../../data'
import { ModelCreateModal } from '../ModelForm'

export const CreateModelButton = () => {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          colorScheme={'primary'}
          fontWeight={'bold'}
          rounded={'full'}
          aria-label="create"
          leftIcon={<FaPlus />}
          iconSpacing={{ base: 0, lg: 2 }}
          px={{ base: 2, lg: 4 }}
        >
          <Text display={{ base: 'none', lg: 'block' }}>Create</Text>
        </Button>
      </PopoverTrigger>
      <Portal>
        <Box pos={'relative'} zIndex={'popover'}>
          <PopoverContent>
            <PopoverArrow />

            <PopoverBody>
              <Stack>
                <ModelCreateModal<Activity>
                  title="Create Activity"
                  url="api/activities"
                  schema={activitySchema}
                  fields={activityFields}
                  buttonProps={{ variant: 'outline', leftIcon: <TbActivity /> }}
                >
                  Create Activity
                </ModelCreateModal>
                <ModelCreateModal<Blog>
                  title="Create Blog"
                  url="api/blogs"
                  schema={blogSchema}
                  fields={blogFields}
                  buttonProps={{ variant: 'outline', leftIcon: <TbWriting /> }}
                >
                  Create Blog
                </ModelCreateModal>
                <ModelCreateModal<Collection>
                  title="Create Collection"
                  url="api/collections"
                  schema={collectionSchema}
                  fields={collectionFields}
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <BsCollection />,
                  }}
                >
                  Create Collection
                </ModelCreateModal>
                <ModelCreateModal<Hashtag>
                  title="Create Hashtag"
                  url="api/hashtags"
                  schema={mainHashtagSchema}
                  fields={mainHashtagFields}
                  buttonProps={{ variant: 'outline', leftIcon: <CgHashtag /> }}
                >
                  Create Hashtag
                </ModelCreateModal>
                <ModelCreateModal<Post>
                  title="Create Post"
                  url="api/posts"
                  schema={postSchema}
                  fields={postFields}
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <TbBrandTwitter />,
                  }}
                >
                  Create Post
                </ModelCreateModal>
                <ModelCreateModal<RecommendedTopic>
                  title="Create News"
                  url="api/recommended-topics"
                  schema={topicSchema}
                  fields={topicFields}
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <HiOutlineNewspaper />,
                  }}
                >
                  Create News
                </ModelCreateModal>
                <ModelCreateModal<RecommendedTweet>
                  title="Create Recommended Tweet"
                  url="api/recommended-tweets"
                  schema={recommendedTweetSchema}
                  fields={recommendedTweetFields}
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <TbBrandTwitter />,
                  }}
                >
                  Create Recommended Tweet
                </ModelCreateModal>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Box>
      </Portal>
    </Popover>
  )
}
