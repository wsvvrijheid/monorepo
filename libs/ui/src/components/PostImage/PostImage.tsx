import { FC } from 'react'

import { ImageProps } from '@chakra-ui/react'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { Post, UploadFile } from '@wsvvrijheid/types'

import { Caps } from '../Caps'
import { usePostContext } from '../PostProvider'

type PostImageProps = Omit<ImageProps, 'id'> & {
  post?: Post
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const PostImage: FC<PostImageProps> = ({
  post: defaultPost,
  size = 'lg',
  ...rest
}) => {
  const postState = usePostContext()

  const post = defaultPost || (postState?.post as Post)

  let src: string | undefined

  const image = post?.image ?? ({} as UploadFile)
  const formats = image?.formats ?? {}

  if (formats.small) {
    src = `${ASSETS_URL}${formats.small.url}`
  } else if (formats.medium) {
    src = `${ASSETS_URL}${formats.medium.url}`
  } else if (formats.large) {
    src = `${ASSETS_URL}${formats.large.url}`
  } else {
    src = image.url && `${ASSETS_URL}${image.url}`
  }

  const scales = {
    xs: 300 / 1200,
    sm: 500 / 1200,
    md: 900 / 1200,
    lg: 1200 / 1200,
  }

  if (!post) return null

  return (
    <Caps
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
