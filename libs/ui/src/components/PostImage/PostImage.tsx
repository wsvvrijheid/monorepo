import React, { FC } from 'react'

import { ImageProps } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { Post } from '@wsvvrijheid/types'

import { OgImage } from '../OgImage'

type PostImageProps = ImageProps & {
  post: Post
}

export const PostImage: FC<PostImageProps> = ({ post, ...rest }) => {
  return (
    <OgImage
      imageParams={{
        title: post.title,
        text: post.description as string,
        image: `${API_URL}${post.image?.url}`,
        ...post.imageParams,
      }}
      {...rest}
    />
  )
}
