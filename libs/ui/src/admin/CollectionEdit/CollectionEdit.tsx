import React, { FC } from 'react'

import { Accordion } from '@chakra-ui/react'

import { CollectionAccordionItem } from './CollectionAccordionItem'
import { CollectionEditProps } from './types'

export const CollectionEdit: FC<CollectionEditProps> = ({ collection }) => {
  return (
    <Accordion size={'lg'} allowToggle allowMultiple defaultIndex={0}>
      <CollectionAccordionItem collection={collection} />
    </Accordion>
  )
}
