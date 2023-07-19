import { FC } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { v4 as uuidV4 } from 'uuid'

import { Mutation } from '@wsvvrijheid/lib'
import { VOLUNTEER_TOKEN } from '@wsvvrijheid/secrets'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { Platform, Volunteer, VolunteerCreateInput } from '@wsvvrijheid/types'
import { toastMessage } from '@wsvvrijheid/utils'

import { JoinTemplateProps } from './types'
import {
  Container,
  JoinForm,
  JoinFormFieldValues,
  PageTitle,
  PlatformList,
} from '../../components'

export const JoinTemplate: FC<JoinTemplateProps> = ({ title }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const platformsResult = useStrapiRequest<Platform>({
    url: 'api/platforms',
    locale,
  })

  const platforms = platformsResult.data?.data || []

  const { mutate, isLoading, isSuccess } = useMutation(
    ['create-volunteer'],
    (body: VolunteerCreateInput) =>
      Mutation.post<Volunteer, VolunteerCreateInput>(
        'api/volunteers',
        body,
        VOLUNTEER_TOKEN as string,
      ),
  )

  const onSubmit = (data: JoinFormFieldValues) => {
    try {
      const { availableHours = 0 } = data

      const heardFrom = data.heardFrom.join(', ')
      const jobs = data.jobs

      const body: VolunteerCreateInput = {
        ...data,
        username: uuidV4(),
        availableHours,
        heardFrom,
        jobs,
      }

      mutate(body, {
        onError: () =>
          toastMessage(
            t`apply-form.error.title`,
            t`apply-form.error.description`,
            'error',
          ),
      })
    } catch (error) {
      console.error('Submit volunteer form error', error)
    }
  }

  return (
    <Container>
      {isSuccess ? (
        <Center h="calc(70vh)">
          <Alert
            status="success"
            colorScheme="primary"
            variant="solid"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            py={16}
            w="container.sm"
            shadow="base"
            rounded="lg"
          >
            <VStack spacing={4}>
              <AlertIcon boxSize="60px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="2xl">
                {t('apply-form.thanks.title')}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {t('apply-form.thanks.description')}
              </AlertDescription>
            </VStack>
          </Alert>
        </Center>
      ) : (
        <>
          <PageTitle>{title}</PageTitle>
          <SimpleGrid
            mb={8}
            gap={8}
            columns={{ base: 1, lg: 2 }}
            alignItems="start"
          >
            <Box>
              <JoinForm
                onSubmitHandler={onSubmit}
                isLoading={isLoading}
                platforms={platforms}
                locale={locale || 'en'}
              />
            </Box>

            <Box pos="sticky" top={8}>
              {platforms && <PlatformList platforms={platforms} />}
            </Box>
          </SimpleGrid>
        </>
      )}
    </Container>
  )
}
