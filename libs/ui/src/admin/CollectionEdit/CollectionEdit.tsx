import { FC } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
import { Collection, CollectionUpdateInput } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { ModelEditForm } from '../ModelForm'
import { CollectionEditProps } from './types'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  date: yup.date().required('Date is required'),
  image: yup.mixed(),
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
          <ModelEditForm<Collection, CollectionUpdateInput>
            url="api/collections"
            model={collection}
            translatedFields={['title', 'description', 'content']}
            fields={[
              {
                name: 'title',
                isRequired: true,
              },
              {
                name: 'description',
                type: 'textarea',
                isRequired: true,
              },
              {
                name: 'content',
                type: 'textarea',
                isRequired: true,
              },
              {
                name: 'date',
                type: 'datetime-local',
                isRequired: true,
              },
              {
                name: 'image',
                type: 'file',
                isRequired: true,
              },
            ]}
            onSuccess={() => null}
            schema={schema}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
