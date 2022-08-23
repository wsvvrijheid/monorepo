import {
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { PLATFORMS } from '@wsvvrijheid/config'
import { AnimatedBox, Container, Navigate, WImage } from '@wsvvrijheid/ui'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export const HomePlatform = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <Box>
      {PLATFORMS.map((platform, index) => (
        <Center
          key={index}
          py={{ base: 16, lg: 32 }}
          minH={{ base: '100vh', lg: '50vh' }}
          bg={platform.colors.bg}
        >
          <Container>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              justifyItems="center"
              gap={8}
            >
              <AnimatedBox
                order={{ base: 1, lg: index % 2 ? 2 : 1 }}
                w="max-content"
                directing={index % 2 ? 'to-left' : 'to-right'}
              >
                <WImage
                  src={platform.image}
                  boxSize={200}
                  alt={platform.title[locale]}
                />
              </AnimatedBox>
              <AnimatedBox
                directing={index % 2 ? 'to-right' : 'to-left'}
                order={{ base: 2, lg: index % 2 ? 1 : 2 }}
              >
                <Stack
                  spacing={4}
                  textAlign={{
                    base: 'center',
                    lg: index % 2 ? 'right' : 'left',
                  }}
                >
                  <Heading
                    size="lg"
                    fontWeight={900}
                    color={platform.colors.header}
                  >
                    {platform.title[locale]}
                  </Heading>
                  <Text color={platform.colors.text}>
                    {platform.description[locale]}
                  </Text>
                  <Navigate
                    w="max-content"
                    size="lg"
                    alignSelf={{
                      base: 'center',
                      lg: index % 2 ? 'end' : 'start',
                    }}
                    color={platform.colors.header}
                    variant="link"
                    as={Button}
                    href={platform.link}
                  >
                    {t('read-more')}
                  </Navigate>
                </Stack>
              </AnimatedBox>
            </SimpleGrid>
          </Container>
        </Center>
      ))}
    </Box>
  )
}
