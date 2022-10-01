import { FC, useState } from 'react'

import {
  AccordionItem,
  AccordionButton,
  HStack,
  AccordionIcon,
  AccordionPanel,
  Stack,
  Text,
  Box,
} from '@chakra-ui/react'

import { CollectionEditForm } from './CollectionEditForm'
import { CollectionAccordionItemProps } from './types'

export const CollectionAccordionItem: FC<CollectionAccordionItemProps> = ({
  collection,
  mode,
}) => {
  const [isEdit, toogleEdit] = useState(mode === 'editting')
  const queryKey = ['collections']
  return (
    <AccordionItem>
      <AccordionButton as={HStack} cursor="pointer">
        <Box flex="1" textAlign="left">
          <Text fontWeight="bold" maxW={{ base: 150, lg: 300 }} noOfLines={1}>
            {collection.title}
          </Text>
        </Box>

        <AccordionIcon ml={'auto'} />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Stack spacing={2}>
          <Stack>
            <CollectionEditForm
              collection={collection}
              isEdit={isEdit}
              toogleEdit={toogleEdit}
              queryKey={queryKey}
            />
          </Stack>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}
