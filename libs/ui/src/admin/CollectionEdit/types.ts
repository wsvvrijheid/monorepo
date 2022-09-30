import { Dispatch, SetStateAction } from 'react'

import { QueryKey } from '@tanstack/react-query'
import { Collection } from '@wsvvrijheid/types'

export type CollectionEditFormProps = {
  collection: Collection
  isEdit: boolean
  toogleEdit: Dispatch<SetStateAction<boolean>>
  queryKey?: QueryKey
}

export type CollectionEditFormFieldValues = {
  title: string
  description: string
}

export type CollectionEditProps = {
  collections: Collection[]
}

export type CollectionAccordionItemProps = {
  collection: Collection
  mode?: 'preview' | 'editting'
}
