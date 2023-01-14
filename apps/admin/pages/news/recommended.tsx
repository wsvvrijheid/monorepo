// import { useEffect, useState } from 'react'

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
import { useSearchModel } from '@wsvvrijheid/services'
import { Post, RecommendedTopic, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelCreateForm,
  ModelCreateModal,
  postFields,
  postSchema,
  TopicCard,
  topicFields,
  topicSchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const NewsBookmarkedPage = () => {
  const { locale } = useRouter()
  const [topic, setTopic] = useState<RecommendedTopic>()
  const [isNews, setOnNews] = useState<boolean>(false)

  const { data, refetch } = useSearchModel<RecommendedTopic>({
    url: 'api/recommended-topics',
    locale: locale as StrapiLocale,
  })
  const formDisclosure = useDisclosure()

  const handleCreatePost = async (data: RecommendedTopic) => {
    setTopic(data)
    setOnNews(true)
    formDisclosure.onOpen()
  }

  const postContent = {
    title: topic?.title,
    description: topic?.description,
    reference: topic?.url,
    image: {
      url: topic?.image,
    },
  } as Post
  const handleSuccess = () => {
    formDisclosure.onClose()
    setOnNews(false)
  }
  console.log('postContent content', postContent)
  return (
    <AdminLayout
      title=" Recomended News"
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
                isField={true}
                onSuccess={handleSuccess}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <ModelCreateModal<RecommendedTopic>
        title="Create News"
        url="api/recommended-topics"
        schema={topicSchema}
        fields={topicFields}
        onSuccess={refetch}
      >
        Create News
      </ModelCreateModal>
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {data?.data?.map((topic, i) => (
          <TopicCard
            key={topic.url}
            topic={{ ...topic, isRecommended: true }}
            onCreatePost={handleCreatePost}
          />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export default NewsBookmarkedPage
