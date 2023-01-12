import { FC } from 'react'

import { OgImageProps } from './types'
import { getOgImage } from './utils'

export const OgImage: FC<OgImageProps> = props => {
  return <img src={getOgImage(props)} alt={props.title} />
}
