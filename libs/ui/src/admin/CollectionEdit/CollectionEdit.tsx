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
import * as yup from 'yup'

import { ModelEdit } from '../ModelEdit'
import { CollectionEditProps } from './types'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  date: yup.date().required('Date is required'),
  image: yup.object().shape({
    file: yup.mixed(),
  }),
})

export const CollectionEdit: FC<CollectionEditProps> = ({ collection }) => {
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
          <ModelEdit<Collection>
            url="api/collections"
            model={collection}
            translatedFields={['title', 'description', 'content']}
            fields={['title', 'description', 'content', 'date', 'image']}
            queryKey={['collection', collection.id]}
            schema={schema}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
