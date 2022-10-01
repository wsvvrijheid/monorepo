import { FC, useState } from 'react'

import {
  AccordionItem,
  AccordionButton,
  HStack,
  AccordionIcon,
  AccordionPanel,
  Text,
  Box,
} from '@chakra-ui/react'

import { CollectionEditForm } from './CollectionEditForm'
import { CollectionAccordionItemProps } from './types'

export const CollectionAccordionItem: FC<CollectionAccordionItemProps> = ({
  collection,
  mode,
}) => {
  const [isEdit, toogleEdit] = useState(mode === 'editing')

  return (
    <AccordionItem>
      <AccordionButton as={HStack} cursor="pointer">
        <Box flex="1" textAlign="left">
          <Text fontWeight="bold" noOfLines={1}>
            {collection.title}
          </Text>
        </Box>

        <AccordionIcon ml={'auto'} />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <CollectionEditForm
          collection={collection}
          isEdit={isEdit}
          toogleEdit={toogleEdit}
        />
      </AccordionPanel>
    </AccordionItem>
  )
}
