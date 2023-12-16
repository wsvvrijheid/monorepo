import { FC } from 'react'

import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { FaChevronRight, FaDonate } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { SITE_URL } from '@wsvvrijheid/config'
import { Flow } from '@wsvvrijheid/types'

import { Container, Markdown, ShareButtons } from '../../components'

type PresentationTemplateProps = {
  title: string
  description: string
  flow: Flow[]
  source: MDXRemoteSerializeResult
}

export const PresentationTemplate: FC<PresentationTemplateProps> = ({
  title,
  description,
  flow,
  source,
}) => {
  const { t } = useTranslation()
  const { locale, asPath } = useRouter()

  if (!source) return <Spinner />

  const URL = `${SITE_URL}/${locale}${asPath}`

  return (
    <Container maxW="container.md">
      <Stack py={8} spacing={8}>
        <HStack justifyContent={'end'}>
          <ShareButtons url={URL} title={title} quote={description || ''} />
        </HStack>
        <Box textAlign={{ base: 'left', lg: 'justify' }}>
          <Markdown source={source} />
        </Box>
        <SimpleGrid gap={8} columns={{ base: 1, md: 2 }} alignItems={'center'}>
          {flow.length > 0 && (
            <Stack spacing={4} order={{ base: 2, md: 1 }}>
              <Heading as="h2" size="md">
                {t('program-flow')}
              </Heading>
              <List spacing={4}>
                {flow.map((f, i) => (
                  <ListItem key={i}>
                    <HStack align={'start'}>
                      <ListIcon mt={2}>
                        <FaChevronRight />
                      </ListIcon>
                      <Box>
                        <Box fontWeight={600}>{f.title}</Box>
                        <Box fontSize={'sm'} color={'gray.500'}>
                          {f.duration} - {f.presenter}
                        </Box>
                      </Box>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}
          <Stack spacing={4} order={{ base: 1, md: 2 }}>
            <Center aspectRatio={{ base: 3, md: 2 }}>
              <Button
                boxSize={'full'}
                colorScheme={'samen'}
                variant={'outline'}
                fontSize={'2xl'}
                flexDir={'column'}
                borderWidth={3}
                leftIcon={
                  <Box
                    as={FaXTwitter}
                    mb={4}
                    fontSize={{ base: '1.5em', lg: '2em' }}
                  />
                }
              >
                <Link isExternal href={'https://samenvvv.nl'}>
                  PostMaker
                </Link>
              </Button>
            </Center>
            <Center aspectRatio={{ base: 3, md: 2 }}>
              <Button
                boxSize={'full'}
                variant={'outline'}
                fontSize={'2xl'}
                flexDir={'column'}
                borderWidth={3}
                leftIcon={
                  <Box
                    as={FaDonate}
                    mb={4}
                    fontSize={{ base: '1.5em', lg: '2em' }}
                  />
                }
              >
                <Link isExternal href="/donation">
                  {t('donation.title')}
                </Link>
              </Button>
            </Center>
          </Stack>
        </SimpleGrid>
        {/* TODO: Add images gallery */}
      </Stack>
    </Container>
  )
}
