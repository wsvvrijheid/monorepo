import {
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
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
    <Box
      pos={'fixed'}
      bottom={{ base: 4, lg: 8 }}
      right={{ base: 4, lg: 8 }}
      zIndex={'modal'}
    >
      <Popover placement="top-start">
        <PopoverTrigger>
          <IconButton
            size={'lg'}
            boxSize={{ base: 16, lg: 20 }}
            colorScheme={'primary'}
            rounded={'full'}
            aria-label="create"
            icon={<FaPlus />}
            shadow={'xl'}
          />
        </PopoverTrigger>
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
                buttonProps={{ variant: 'outline', leftIcon: <BsCollection /> }}
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
      </Popover>
    </Box>
  )
}
