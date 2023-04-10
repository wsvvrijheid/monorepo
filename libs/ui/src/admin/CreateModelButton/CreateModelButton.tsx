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
import { useTranslation } from 'next-i18next'
import { BsCollection } from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { FaPlus } from 'react-icons/fa'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { MdOutlineCastForEducation } from 'react-icons/md'
import { TbActivity, TbBrandTwitter, TbWriting } from 'react-icons/tb'

import {
  Activity,
  Blog,
  Collection,
  Course,
  Hashtag,
  Post,
  RecommendedTopic,
  RecommendedTweet,
} from '@wsvvrijheid/types'

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
import { courseFields, courseSchema } from '../../data/schemas/course'
import { ModelCreateModal } from '../ModelForm'

export const CreateModelButton = () => {
  const { t } = useTranslation()

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          colorScheme={'primary'}
          rounded={'full'}
          aria-label="create"
          leftIcon={<FaPlus />}
          iconSpacing={{ base: 0, lg: 2 }}
          px={{ base: 2, lg: 4 }}
        >
          <Text display={{ base: 'none', lg: 'block' }}>{t('create')}</Text>
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
                  {t('create-activity')}
                </ModelCreateModal>
                <ModelCreateModal<Blog>
                  title="Create Blog"
                  url="api/blogs"
                  schema={blogSchema}
                  fields={blogFields}
                  buttonProps={{ variant: 'outline', leftIcon: <TbWriting /> }}
                >
                  {t('create-blog')}
                </ModelCreateModal>
                <ModelCreateModal<Course>
                  title="Create Course"
                  url="api/courses"
                  schema={courseSchema}
                  fields={courseFields}
                  hideLanguageSwitcher
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <MdOutlineCastForEducation />,
                  }}
                >
                  {t('create-course')}
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
                  {t('create-collection')}
                </ModelCreateModal>
                <ModelCreateModal<Hashtag>
                  title="Create Hashtag"
                  url="api/hashtags"
                  schema={mainHashtagSchema}
                  fields={mainHashtagFields}
                  buttonProps={{ variant: 'outline', leftIcon: <CgHashtag /> }}
                >
                  {t('create-hashtag')}
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
                  {t('create-post')}
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
                  {t('create-news')}
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
                  {t('create-recommended-tweet')}
                </ModelCreateModal>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Box>
      </Portal>
    </Popover>
  )
}
