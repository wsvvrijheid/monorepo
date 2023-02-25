import { FC, useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'
import { Options, Splide, SplideSlide } from '@splidejs/react-splide'
import { Post, UploadFile } from '@wsvvrijheid/types'

import { PostImage, WImage } from '../../components'

export type PostSlideProps = {
  posts?: Post[]
  startIndex?: number
}

export const PostSlide: FC<PostSlideProps> = ({ posts, startIndex = 0 }) => {
  const mainOptions: Options = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    start: startIndex,
    gap: '1rem',
    pagination: false,
    height: '10rem',
  }

  const thumbsOptions: Options = {
    type: 'slide',
    rewind: true,
    gap: '1rem',
    perPage: 6,
    start: startIndex,
    pagination: false,
    arrows: false,
    fixedHeight: 70,
    cover: true,
    focus: 'center',
    isNavigation: true,
  }

  const mainSplide = useRef<Splide>(null)
  const thumbSplide = useRef<Splide>(null)

  useEffect(() => {
    if (mainSplide.current && thumbSplide.current?.splide) {
      mainSplide.current.sync(thumbSplide.current.splide)
    }
  }, [mainSplide, thumbSplide])

  return (
    <>
      <Splide options={mainOptions} ref={mainSplide}>
        {posts?.map((post, i) => {
          return (
            <Box as={SplideSlide} h="full !important" key={i}>
              {post.image && <PostImage size="md" post={post} />}
            </Box>
          )
        })}
      </Splide>
      <Splide ref={thumbSplide} options={thumbsOptions}>
        {posts?.map((post, i) => {
          return (
            <Box
              as={SplideSlide}
              opacity="0.3"
              sx={{ '&.is-active': { opacity: 1 } }}
              key={i}
            >
              {post.image && (
                <WImage
                  src={post.image as UploadFile}
                  ratio="twitter"
                  alt={`post ${i}`}
                />
              )}
            </Box>
          )
        })}
      </Splide>
    </>
  )
}
