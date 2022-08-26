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
import { useTranslation } from 'next-i18next'
import { useMutation, useQuery } from 'react-query'
import { v4 as uuidV4 } from 'uuid'

import { Container, JoinForm, PageTitle } from '../../components'
import { mutation, request } from '../../../../utils/src/lib'
import { Platform } from 'libs/types/src/platform'
import { Job } from 'libs/types/src/job'
import { PlatformList } from '../../components/PlatformList'
import { JoinTemplateProps } from './types'
import { useRouter } from 'next/router'
import { StrapiLocale, Volunteer } from '@wsvvrijheid/types'
import { JoinFormFieldValues } from '../../components/JoinForm/types'

import { toastMessage } from '../../../../utils/src/util/toast'
import { usePlatforms } from '@wsvvrijheid/utils'

type VolunteerRequest = {
  username: Volunteer['username']
  heardFrom: Volunteer['heardFrom']
} & Omit<JoinFormFieldValues, 'heardFrom'>


export const JoinTemplate: FC<JoinTemplateProps> = ({ title }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const platformsResult = usePlatforms();

  const platforms: Platform[] = platformsResult.data || []
  const jobs: Job[] = platforms?.flatMap(p => p.jobs) as Job[] || []

  const { mutate, isLoading, isSuccess } = useMutation(
    'create-volunteer',
    (data: VolunteerRequest) => mutation().post('api/volunteers', { data }),
  )

  const onSubmit = (data: JoinFormFieldValues) => {
    try {
      const { availableHours = 0 } = data

      const heardFrom = data.heardFrom.join(', ');
      const jobs = data.jobs;

      mutate(
        {
          ...data,
          username: uuidV4(),
          availableHours,
          heardFrom,
          jobs
        },
        {
          onError: () =>
            toastMessage(
              t`apply-form.error.title`,
              t`apply-form.error.description`,
              'error',
            ),
        },
      )
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
            colorScheme="blue"
            variant="solid"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            py={16}
            w="container.sm"
            shadow="lg"
            rounded="lg"
          >
            <VStack spacing={4}>
              <AlertIcon boxSize="60px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="2xl">
                {t`apply-form.thanks.title`}
              </AlertTitle>
              <AlertDescription maxWidth="sm">{t`apply-form.thanks.description`}</AlertDescription>
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
                jobs={jobs}
                projects={platforms}
                locale={locale as StrapiLocale || 'en'}
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
