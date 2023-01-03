import { FC } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
import { Collection } from '@wsvvrijheid/types'

import { collectionFields, collectionSchema } from '../../data'
import { ModelEditForm } from '../ModelForm'
import { CollectionEditProps } from './types'

export const CollectionEdit: FC<CollectionEditProps> = ({
  collection,
  onSuccess,
}) => {
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
          <ModelEditForm<Collection>
            url="api/collections"
            model={collection}
            translatedFields={['title', 'description', 'content']}
            fields={collectionFields}
            onSuccess={onSuccess}
            schema={collectionSchema}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
