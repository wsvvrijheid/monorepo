import React, { FC } from 'react'

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { BsTranslate } from 'react-icons/bs'

import { Flags } from '../../components'
import { TranslatePreviewItemProps } from './types'

export const TranslateAccordionItem: FC<TranslatePreviewItemProps> = ({
  content,
  description,
  handleTranslate,
  locale,
  missingTranslations,
  title,
  publishedAt,
  status,
}) => {
  return (
    <AccordionItem>
      <AccordionButton as={HStack} cursor="pointer">
        <HStack flex={'1'}>
          <HStack spacing={2} flex={'1'}>
            <Box as={Flags[locale]} />
            <Text size={'lg'} fontWeight="bold">
              {title}
              {status && (
                <Badge
                  variant="outline"
                  ml="2"
                  colorScheme={status === 'approved' ? 'green' : 'yellow'}
                >
                  {status}
                </Badge>
              )}
              {!status && (
                <Badge ml="2" colorScheme={publishedAt ? 'green' : 'gray'}>
                  {publishedAt ? 'Published' : 'Draft'}
                </Badge>
              )}
            </Text>
          </HStack>

          {missingTranslations && (
            <ButtonGroup gap="3">
              {missingTranslations.map(missingTranslation => (
                <Tooltip
                  key={missingTranslation}
                  label={`Translate to ${missingTranslation}`}
                >
                  <Button
                    textTransform={'uppercase'}
                    leftIcon={<BsTranslate />}
                    colorScheme={
                      missingTranslation === 'nl' ? 'orange' : 'purple'
                    }
                    variant="outline"
                    onClick={e => {
                      e.stopPropagation()
                      handleTranslate(`${locale}-${missingTranslation}`)
                    }}
                  >
                    {missingTranslation}
                  </Button>
                </Tooltip>
              ))}
            </ButtonGroup>
          )}
        </HStack>

        <AccordionIcon ml={4} />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Stack spacing={2}>
          <Stack>
            <Text size="lg" fontWeight={'bold'}>
              Description
            </Text>
            <Text>{description}</Text>
          </Stack>
          {content && (
            <Stack>
              <Text size="lg" fontWeight={'bold'}>
                Content
              </Text>
              <Box>{content}</Box>
            </Stack>
          )}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}
