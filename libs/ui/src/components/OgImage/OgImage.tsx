import { FC } from 'react'

import { Image } from '@chakra-ui/react'

import { OgImageProps } from './types'
import { getOgImage } from './utils'

export const OgImage: FC<OgImageProps> = props => {
  return <Image w="full" src={getOgImage(props)} alt={props.title} />
}
