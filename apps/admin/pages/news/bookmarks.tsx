import { useState } from 'react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'
import { Post, RecommendedTopic, TopicBase } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelCreateForm,
  postFields,
  postSchema,
  TopicCard,
} from '@wsvvrijheid/ui'
import { useLocalStorage } from 'usehooks-ts'

const NewsBookmarkedPage = () => {
  const [bookmarksStorage] = useLocalStorage<TopicBase[]>('bookmarks', [])

  const [topic, setTopic] = useState<RecommendedTopic>()
  const [isNews, setOnNews] = useState<boolean>(false)

  const formDisclosure = useDisclosure()

  const handleCreatePost = async (data: RecommendedTopic) => {
    setTopic(data)
    setOnNews(true)
    formDisclosure.onOpen()
  }

  const postContent = {
    title: topic?.title,
    description: topic?.description,
    content: topic?.description,
    reference: topic?.url,
    image: {
      url: topic?.image,
    },
  } as Post
  const handleSuccess = () => {
    formDisclosure.onClose()
    setOnNews(false)
  }
  return (
    <AdminLayout
      title="News"
      headerProps={{
        onSearch: () => null,
        filterMenuCloseOnSelect: false,
        searchPlaceHolder: 'Search bookmarks',
      }}
    >
      {isNews && (
        <Modal
          isCentered
          closeOnOverlayClick={true}
          isOpen={formDisclosure.isOpen}
          onClose={formDisclosure.onClose}
          size="6xl"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={'primary.500'}>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pos="relative" py={6}>
              <ModelCreateForm<Post>
                url="api/posts"
                schema={postSchema}
                fields={postFields}
                model={postContent}
                onSuccess={handleSuccess}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {bookmarksStorage?.map((topic, i) => (
          <TopicCard
            key={topic.url}
            topic={topic}
            onCreatePost={handleCreatePost}
          />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export default NewsBookmarkedPage
