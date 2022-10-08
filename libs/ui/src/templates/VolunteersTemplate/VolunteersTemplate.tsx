import { useMemo, useState, FC } from 'react'

import {
  Box,
  Button,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Job, StrapiLocale, Volunteer } from '@wsvvrijheid/types'
import { useVolunteers } from '@wsvvrijheid/utils'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoPeopleCircle } from 'react-icons/io5'

import { Container, Hero, MasonryGrid, VolunteerCard } from '../../components'

export type VolunteersTemplateProps = {
  seo: NextSeoProps
  volunteers: Array<Volunteer>
  jobs: Array<Job>
}

export const VolunteersTemplate: FC<VolunteersTemplateProps> = ({
  seo,
  volunteers,
  jobs,
}) => {
  const [state, setState] = useState<string>()
  const { t } = useTranslation()
  const { locale } = useRouter()

  const volunteersQuery = useVolunteers(volunteers)

  const data = useMemo(
    () =>
      volunteersQuery.data?.filter(user =>
        state ? user.jobs?.some(j => j.slug === state) : true,
      ),
    [state, volunteersQuery.data],
  )

  return (
    <>
      <Hero title={seo.title || ''} />
      <Container minH="inherit" maxW="container.xl">
        <Grid
          w="full"
          gap={{ base: 4, lg: 8 }}
          py={8}
          gridTemplateColumns={{ base: '1fr', lg: 'max-content 1fr' }}
        >
          <Box
            m={-2}
            p={2}
            gap={{ base: 4, lg: 8 }}
            w="calc(100% + 16px)"
            overflow="hidden"
            position="sticky"
            top={2}
            zIndex="docked"
          >
            <Link href="/join" passHref>
              <Button
                position={{ base: 'fixed', lg: 'static' }}
                bottom={0}
                rounded={{ base: 0, lg: 'md' }}
                left={0}
                w="full"
                size="lg"
                shadow="base"
                py={8}
                mb={{ base: 0, lg: 8 }}
                leftIcon={
                  <Box fontSize="3xl">
                    <IoPeopleCircle />
                  </Box>
                }
                colorScheme="blue"
              >
                {t('join-the-team')}
              </Button>
            </Link>

            <Box
              rounded="md"
              bg="white"
              shadow="base"
              p={{ base: 4, lg: 8 }}
              overflowX="hidden"
            >
              <RadioGroup w="full" onChange={setState} overflow="hidden">
                <Stack
                  spacing={4}
                  direction={{ base: 'row', lg: 'column' }}
                  justify="stretch"
                  w="full"
                  overflowX={{ base: 'auto', lg: 'hidden' }}
                >
                  <Radio value="">{t('all')}</Radio>
                  {jobs.map(job => (
                    <Radio
                      p={{ base: 4, lg: 'initial' }}
                      key={job.slug}
                      value={job.slug}
                    >
                      <Text noOfLines={1}>
                        {job[`name_${locale as StrapiLocale}`]}
                      </Text>
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
          </Box>
          <MasonryGrid cols={[1, 2, 3, 4]}>
            {data?.map((volunteer, i) => (
              <VolunteerCard key={i} volunteer={volunteer} />
            ))}
          </MasonryGrid>
        </Grid>
      </Container>
    </>
  )
}
