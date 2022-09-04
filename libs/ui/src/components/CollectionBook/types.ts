import { ComponentProps, PropsWithChildren } from 'react'

import { CenterProps } from '@chakra-ui/react'
import { Collection } from '@wsvvrijheid/types'
import HTMLFlipBook from 'react-pageflip'

export interface CollectionBookProps {
  collection: Collection
  title?: string
  coverBg?: string
  logo?: string
  bg?: string
  flipboxProps?: Partial<ComponentProps<typeof HTMLFlipBook>>
}

export interface PageProps extends PropsWithChildren, CenterProps {}

export interface CollectionPagesPops {
  collection: Collection
  pageBgGdarient: string
}
