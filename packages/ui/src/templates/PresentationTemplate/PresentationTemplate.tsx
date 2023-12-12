import { FC } from 'react'

import { Heading, Stack, Text } from '@chakra-ui/react'
// import { useRouter } from 'next/router'
// import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Presentation } from '@wsvvrijheid/types'

import { Container } from '../../components'

export type PresentationTemplateProps = {
  // seo: NextSeoProps
  presentations: Presentation[]
}

export const PresentationTemplate: FC<PresentationTemplateProps> = ({
  // seo,
  presentations,
}) => {
  // const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Container maxW="container.md">
      <Stack py={8} spacing={8} align="center">
        {presentations?.map(pr => {
          return (
            <>
              <Heading as="h1" textAlign="center">
                {pr[`title_${locale}`]}
              </Heading>
              <Text key={pr.id}>{pr[`content_${locale}`]}</Text>
            </>
          )
        })}
      </Stack>
    </Container>
  )
}
