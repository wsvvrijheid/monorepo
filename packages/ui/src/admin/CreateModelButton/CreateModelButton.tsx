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
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { BsCollection } from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { FaPlus } from 'react-icons/fa'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { MdOutlineCastForEducation } from 'react-icons/md'
import { TbActivity, TbBrandTwitter, TbWriting } from 'react-icons/tb'

import { useAuthContext } from '@wsvvrijheid/context'
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
import { useHasPermission } from '../../hooks'
import { CreatePostFromCapsModal } from '../CreatePostFromCapsModal'
import { ModelCreateModal } from '../ModelForm'

export const CreateModelButton = () => {
  const { t } = useTranslation()
  const {
    isOpen: isOpenPost,
    onOpen: onOpenPost,
    onClose: onClosePost,
  } = useDisclosure()

  const { user } = useAuthContext()

  const { getPermission } = useHasPermission()

  if (!user) return null

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
                  title={t('create-activity')}
                  url="api/activities"
                  schema={activitySchema}
                  fields={activityFields}
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <TbActivity />,
                  }}
                  allowedRoles={['contentmanager']}
                >
                  {t('create-activity')}
                </ModelCreateModal>

                <ModelCreateModal<Blog>
                  title={t('create-blog')}
                  url="api/blogs"
                  schema={blogSchema}
                  fields={blogFields}
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <TbWriting />,
                  }}
                  allowedRoles={['author', 'contentmanager']}
                >
                  {t('create-blog')}
                </ModelCreateModal>

                <ModelCreateModal<Course>
                  title={t('create-course')}
                  url="api/courses"
                  schema={courseSchema}
                  fields={courseFields}
                  hideLanguageSwitcher
                  shouldPublish
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <MdOutlineCastForEducation />,
                  }}
                  allowedRoles={['academyeditor']}
                >
                  {t('create-course')}
                </ModelCreateModal>

                <ModelCreateModal<Collection>
                  title={t('create-collection')}
                  url="api/collections"
                  schema={collectionSchema}
                  fields={collectionFields}
                  shouldPublish
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <BsCollection />,
                  }}
                  allowedRoles={['arteditor']}
                >
                  {t('create-collection')}
                </ModelCreateModal>

                <ModelCreateModal<Hashtag>
                  title={t('create-hashtag')}
                  url="api/hashtags"
                  schema={mainHashtagSchema}
                  fields={mainHashtagFields}
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <CgHashtag />,
                  }}
                  allowedRoles={['accountmanager']}
                >
                  {t('create-hashtag')}
                </ModelCreateModal>

                <ModelCreateModal<Post>
                  title={t('create-post')}
                  url="api/posts"
                  schema={postSchema}
                  fields={postFields}
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <TbBrandTwitter />,
                  }}
                  allowedRoles={['all']}
                >
                  {t('create-post')}
                </ModelCreateModal>

                {getPermission(['all']) && (
                  <>
                    <CreatePostFromCapsModal
                      isOpen={isOpenPost}
                      onClose={onClosePost}
                    />
                    <Button
                      colorScheme="green"
                      variant="outline"
                      onClick={onOpenPost}
                    >
                      {t('create-multiple-post')}
                    </Button>
                  </>
                )}
                <ModelCreateModal<RecommendedTopic>
                  title={t('create-news')}
                  url="api/recommended-topics"
                  schema={topicSchema}
                  fields={topicFields}
                  shouldPublish
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <HiOutlineNewspaper />,
                  }}
                >
                  {t('create-news')}
                </ModelCreateModal>
                <ModelCreateModal<RecommendedTweet>
                  title={t('create-recommended-tweet')}
                  url="api/recommended-tweets"
                  schema={recommendedTweetSchema}
                  fields={recommendedTweetFields}
                  shouldPublish
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
