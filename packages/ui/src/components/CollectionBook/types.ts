import { ComponentProps, PropsWithChildren } from 'react'

import { CenterProps } from '@chakra-ui/react'
import HTMLFlipBook from 'react-pageflip'

import { Collection } from '@wsvvrijheid/types'

export interface CollectionBookProps {
  collection: Collection
  title?: string
  coverBg?: string
  logo?: string
  bg?: string
  flipboxProps?: Partial<ComponentProps<typeof HTMLFlipBook>>
}

export type PageProps = PropsWithChildren<CenterProps>

export interface CollectionPagesPops {
  collection: Collection
  pageBgGdarient: string
}
