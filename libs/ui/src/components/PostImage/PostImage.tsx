import React, { FC } from 'react'

import { ImageProps } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { Post } from '@wsvvrijheid/types'

import { OgImage } from '../OgImage'

type PostImageProps = ImageProps & {
  post: Post
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const PostImage: FC<PostImageProps> = ({
  post,
  size = 'lg',
  ...rest
}) => {
  let src: string | undefined

  if (post?.image?.formats?.small) {
    src = `${API_URL}${post.image.formats.small.url}`
  } else if (post?.image?.formats?.medium) {
    src = `${API_URL}${post.image.formats.medium.url}`
  } else if (post?.image?.formats?.large) {
    src = `${API_URL}${post.image.formats.large.url}`
  } else {
    src = post.image?.url && `${API_URL}${post.image?.url}`
  }

  const scales = {
    xs: 300 / 1200,
    sm: 500 / 1200,
    md: 900 / 1200,
    lg: 1200 / 1200,
  }

  return (
    <OgImage
      imageParams={{
        title: post.title,
        text: post.description as string,
        image: src,
        scale: scales[size],
        ...post.imageParams,
      }}
      {...rest}
    />
  )
}
