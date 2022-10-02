import { FC, useState } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'

import { CollectionEditForm } from './CollectionEditForm'
import { CollectionEditProps } from './types'

export const CollectionEdit: FC<CollectionEditProps> = ({ collection }) => {
  const [isEdit, setEdit] = useState(false)

  return (
    <Accordion
      size={'lg'}
      allowToggle
      defaultIndex={0}
      borderColor="transparent"
    >
      <AccordionItem>
        <AccordionButton
          justifyContent="space-between"
          cursor="pointer"
          fontSize="xl"
        >
          <Text fontWeight="bold" noOfLines={1}>
            {collection.title}
          </Text>

          <AccordionIcon ml={'auto'} />
        </AccordionButton>
        <AccordionPanel p={0} mt={4}>
          <CollectionEditForm
            collection={collection}
            isEdit={isEdit}
            setEdit={setEdit}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
