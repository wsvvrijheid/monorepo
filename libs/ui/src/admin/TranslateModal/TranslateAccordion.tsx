import { FC } from 'react'

import { Accordion } from '@chakra-ui/react'

import { TranslateAccordionItem } from './TranslateAccordionItem'
import { TranslateAccordionProps } from './types'

export const TranslateAccordion: FC<TranslateAccordionProps> = ({
  models,
  handleTranslate,
}) => {
  return (
    <Accordion size={'lg'} allowToggle allowMultiple>
      {models.map(model => (
        <TranslateAccordionItem {...model} handleTranslate={handleTranslate} />
      ))}
    </Accordion>
  )
}
