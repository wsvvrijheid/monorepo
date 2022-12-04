import { FC } from 'react'

import {
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Platform } from '@wsvvrijheid/types'
import { AnimatedBox, Container, Navigate, WImage } from '@wsvvrijheid/ui'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

type HomePlatformProps = {
  platforms: Platform[]
}

const colors = {
  lotus: { bg: 'black', text: 'white' },
  samenvvv: { bg: 'samen.100', text: 'samen.500' },
  kunsthalte: { bg: 'green.100', text: 'green.500' },
  academy: { bg: 'blue.100', text: 'blue.500' },
}

export const HomePlatform: FC<HomePlatformProps> = ({ platforms }) => {
  console.log('platforms', platforms)
  const { locale } = useRouter()
  const { t } = useTranslation()

  return (
    <Box>
      {platforms.map((platform, index) => {
        const color = colors[platform.slug]

        return (
          <Center
            key={index}
            py={{ base: 16, lg: 32 }}
            minH={{ base: '100vh', lg: '50vh' }}
            bg={color.bg}
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
                    alt={platform[`name_${locale}`]}
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
                    <Heading size="lg" fontWeight="black" color={color.text}>
                      {platform[`name_${locale}`]}
                    </Heading>
                    <Text color={color.text}>
                      {platform[`description_${locale}`]}
                    </Text>
                    <Button
                      as={Navigate}
                      href={platform.link || `/platforms/${platform.slug}`}
                      w="max-content"
                      size="lg"
                      color={color.text}
                      variant="link"
                    >
                      {t('read-more')}
                    </Button>
                  </Stack>
                </AnimatedBox>
              </SimpleGrid>
            </Container>
          </Center>
        )
      })}
    </Box>
  )
}
