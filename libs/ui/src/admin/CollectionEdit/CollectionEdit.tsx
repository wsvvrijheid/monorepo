import React, { FC } from 'react'

import { Accordion } from '@chakra-ui/react'

import { CollectionAccordionItem } from './CollectionAccordionItem'
import { CollectionEditProps } from './types'

export const CollectionEdit: FC<CollectionEditProps> = ({ collections }) => {
  return (
    <Accordion size={'lg'} allowToggle allowMultiple defaultIndex={0}>
      {collections?.map(c => (
        <CollectionAccordionItem key={c.id} collection={c} />
      ))}
    </Accordion>
  )
}
