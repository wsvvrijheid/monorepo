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
import { StrapiTranslatableModel } from '@wsvvrijheid/types'
import { BsTranslate } from 'react-icons/bs'

import { Flags } from '../../components'
import { TranslateAccordionItemProps } from './types'

const localeColorSchemes = {
  en: 'purple',
  nl: 'orange',
  tr: 'cyan',
}

export const TranslateAccordionItem = <T extends StrapiTranslatableModel>({
  content,
  description,
  locale,
  missingTranslations,
  publishedAt,
  status,
  text,
  title,
  handleTranslate,
}: TranslateAccordionItemProps<T>) => {
  return (
    <AccordionItem>
      <AccordionButton as={HStack} cursor="pointer">
        <HStack flex={'1'}>
          <HStack spacing={2} flex={'1'}>
            <Box as={Flags[locale]} />
            <HStack>
              <Text fontWeight="bold" maxW={300} noOfLines={1}>
                {title || text}
              </Text>

              {status && (
                <Badge
                  variant="outline"
                  colorScheme={status === 'approved' ? 'green' : 'yellow'}
                >
                  {status}
                </Badge>
              )}

              <Badge
                variant="outline"
                colorScheme={publishedAt ? 'purple' : 'gray'}
              >
                {publishedAt ? 'Published' : 'Draft'}
              </Badge>
            </HStack>
          </HStack>

          {missingTranslations && (
            <ButtonGroup>
              {missingTranslations.map(missingTranslation => (
                <Tooltip
                  key={missingTranslation}
                  label={`Translate to ${missingTranslation}`}
                >
                  <Button
                    size="xs"
                    textTransform={'uppercase'}
                    leftIcon={<BsTranslate />}
                    colorScheme={localeColorSchemes[missingTranslation]}
                    variant="ghost"
                    onClick={e => {
                      e.stopPropagation()
                      handleTranslate([locale, missingTranslation])
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
          {text && (
            <Stack>
              <Text size="lg" fontWeight={'bold'}>
                Text
              </Text>
              {/* TODO: Display in markdown format */}
              <Box>{text}</Box>
            </Stack>
          )}
          {description && (
            <Stack>
              <Text size="lg" fontWeight={'bold'}>
                Description
              </Text>
              <Text>{description}</Text>
            </Stack>
          )}
          {content && (
            <Stack>
              <Text size="lg" fontWeight={'bold'}>
                Content
              </Text>
              {/* TODO: Display in markdown format */}
              <Box>{content}</Box>
            </Stack>
          )}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}
