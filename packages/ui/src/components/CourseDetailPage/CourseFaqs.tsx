import { FC } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { CourseFaqItemProps, CourseFaqsProps } from './types'

const CourseFaqItem: FC<CourseFaqItemProps> = ({ item, isExpanded }) => {
  const { locale } = useRouter()

  const question = item[`question_${locale || 'nl'}`]
  const answer = item[`answer_${locale || 'nl'}`]

  return (
    <>
      <AccordionButton>
        <Box as="h4" fontSize={'lg'} flex="1" textAlign="left">
          {question}
        </Box>
        {isExpanded ? <FaMinus fontSize="12px" /> : <FaPlus fontSize="12px" />}
      </AccordionButton>
      <AccordionPanel pb={4}>{answer}</AccordionPanel>
    </>
  )
}

export const CourseFaqs: FC<CourseFaqsProps> = ({ faqs }) => {
  return (
    <Accordion allowMultiple>
      {faqs.map(item => (
        <AccordionItem key={item.id}>
          {({ isExpanded }) => (
            <CourseFaqItem item={item} isExpanded={isExpanded} />
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
