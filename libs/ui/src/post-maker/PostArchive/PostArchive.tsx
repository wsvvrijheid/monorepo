import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Box,
  chakra,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'
import { Options, Splide, SplideSlide } from '@splidejs/react-splide'
import { Post, StrapiLocale } from '@wsvvrijheid/types'
import { getItemLink, useHashtag } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi'
// eslint-disable-next-line import/no-unresolved

import { AnimatedBox, ShareButtons, WImage } from '../../components'

export const PostArchive = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const mainSplide = useRef<Splide>(null)
  const thumbSplide = useRef<Splide>(null)

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [absoluteUrl, setAbsoluteUrl] = useState('')

  const hashtagQuery = useHashtag()

  console.log('hashtagQuery', hashtagQuery)

  const { locale } = useRouter()

  useEffect(() => {
    const _title = hashtagQuery.data?.posts?.[activeIndex].hashtag?.title || ''
    const _content = hashtagQuery.data?.posts?.[activeIndex].text || ''
    const _absoluteUrl =
      getItemLink(
        hashtagQuery.data?.posts?.[activeIndex] as Post,
        locale as StrapiLocale,
        'post',
        true,
      ) || ''

    setTitle(_title)
    setContent(_content)
    setAbsoluteUrl(_absoluteUrl)
  }, [activeIndex, locale, hashtagQuery.data?.posts])

  const mainOptions: Options = {
    type: 'loop',
    perPage: 2,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    height: '10rem',
  }

  const thumbsOptions: Options = {
    type: 'slide',
    rewind: true,
    gap: '1rem',
    pagination: false,
    fixedWidth: 110,
    fixedHeight: 70,
    cover: true,
    focus: 'center',
    isNavigation: true,
  }

  useEffect(() => {
    if (
      mainSplide.current &&
      thumbSplide.current &&
      thumbSplide.current.splide
    ) {
      mainSplide.current.sync(thumbSplide.current.splide)
    }
  }, [mainSplide, thumbSplide])

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="6xl"
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="transparent">
          <ModalBody>
            <Splide options={mainOptions}>
              {hashtagQuery.data?.posts?.map((post, i) => {
                return (
                  <SplideSlide key={i}>
                    {post.image && (
                      <WImage
                        src={post.image?.url as string}
                        ratio="twitter"
                        alt={`post ${i}`}
                      />
                    )}
                  </SplideSlide>
                )
              })}
            </Splide>
            <Box
              as={Splide}
              options={thumbsOptions}
              sx={{
                '.swiper-slide': {
                  opacity: 0.3,
                  '&-thumb-active': {
                    opacity: 1,
                  },
                },
              }}
            >
              {hashtagQuery.data?.posts?.map((post, i) => {
                return (
                  <SplideSlide key={i}>
                    {post.image && (
                      <WImage
                        src={post.image?.url as string}
                        ratio="twitter"
                        alt={`post ${i}`}
                      />
                    )}
                  </SplideSlide>
                )
              })}
            </Box>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <IconButton
              rounded="full"
              colorScheme="primary"
              aria-label="close modal"
              icon={<BiExitFullscreen />}
              onClick={onClose}
              size="lg"
            />

            <ShareButtons
              title={title}
              quote={content}
              url={absoluteUrl as string}
              size="lg"
              spacing={4}
              colorScheme="primary"
              variant="solid"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {hashtagQuery.data?.posts?.map((post, i) => {
          return (
            <AnimatedBox key={i} delay={i} directing="to-down" hasHover>
              <Box bg="white" shadow="primary" rounded="lg" overflow="hidden">
                {post.image && (
                  <WImage
                    ratio="twitter"
                    src={post.image?.url as string}
                    alt={`post ${i}`}
                  />
                )}
                {post.text && (
                  <HStack
                    spacing={2}
                    px={6}
                    py={2}
                    justifyContent="space-evenly"
                    w="full"
                  >
                    <ShareButtons
                      title={post.hashtag?.title as string}
                      quote={post.text}
                      url={
                        getItemLink(
                          post as Post,
                          locale as StrapiLocale,
                          'post',
                          true,
                        ) as string
                      }
                      size="lg"
                      justifyContent="space-between"
                      w="full"
                    >
                      <IconButton
                        aria-label="full screen"
                        icon={<BiFullscreen />}
                        onClick={onOpen}
                        variant="outline"
                        rounded="full"
                        size="lg"
                      />
                    </ShareButtons>
                  </HStack>
                )}
              </Box>
            </AnimatedBox>
          )
        })}
      </SimpleGrid>
    </>
  )
}
