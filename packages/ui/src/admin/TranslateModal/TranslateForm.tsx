import {
  Box,
  Divider,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'

import { StrapiTranslatableModel } from '@fc/types'

import { TranslateFormProps } from './types'
import { Flags } from '../../components'

export const TranslateForm = <T extends StrapiTranslatableModel>({
  translationKey,
  localizedModels,
}: TranslateFormProps<T>) => {
  const [currentLocale, targetLocale] = translationKey

  const currentModel = localizedModels[currentLocale]

  return (
    <Stack justify="stretch">
      {currentModel.title && (
        <Stack>
          <FormLabel htmlFor={`${currentModel.id} title`}>Title</FormLabel>
          <Stack direction={{ base: 'column', lg: 'row' }}>
            <HStack w={{ base: 'full', lg: 400 }} align="baseline">
              <Box as={Flags[currentLocale]} />
              <Text>{currentModel.title}</Text>
            </HStack>
            <HStack flex={1} align="baseline">
              <Box as={Flags[targetLocale]} />
              <Input id={`${currentModel.id} title`} placeholder="Title" />
            </HStack>
          </Stack>
        </Stack>
      )}

      {currentModel.description && (
        <>
          <Divider orientation="horizontal" />

          <Stack>
            <FormLabel htmlFor={`${currentModel.id} description`}>
              Description
            </FormLabel>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <HStack w={{ base: 'full', lg: 400 }} align="baseline">
                <Box as={Flags[currentLocale]} />
                <Text>{currentModel.description}</Text>
              </HStack>
              <HStack flex={1} align="baseline">
                <Box as={Flags[targetLocale]} />
                <Textarea
                  id={`${currentModel.id} description`}
                  h="auto"
                  minH={{ base: 300, lg: 'auto' }}
                  placeholder="Description"
                />
              </HStack>
            </Stack>
          </Stack>
        </>
      )}

      {currentModel.content && (
        <>
          <Divider orientation="horizontal" />
          <Stack>
            <FormLabel htmlFor={`${currentModel.id} content`}>
              Content
            </FormLabel>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <HStack w={{ base: 'full', lg: 400 }} align="baseline">
                <Box as={Flags[currentLocale]} />
                <Text maxH={300} overflowY="auto">
                  {currentModel.content}
                </Text>
              </HStack>
              <HStack flex={1} align="baseline">
                <Box as={Flags[targetLocale]} />
                <Textarea
                  id={`${currentModel.id} content`}
                  h="auto"
                  minH={{ base: 300, lg: 'auto' }}
                  placeholder="Content"
                />
              </HStack>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  )
}
