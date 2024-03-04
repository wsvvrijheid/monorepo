import { FC } from 'react'

import {
  Spinner,
  Container,
  Stack,
  Heading,
  Box,
  HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { SITE_URL } from '@fc/config'
import { Activity, UploadFile } from '@fc/types'

import { Markdown } from '../Markdown'
import { ShareButtons } from '../ShareButtons'
import { WImage } from '../WImage'

export type ActivityDetailProps = {
  source: MDXRemoteSerializeResult
  image: UploadFile | string
  title: string
  activity?: Activity
}

export const ActivityDetail: FC<ActivityDetailProps> = ({
  source,
  title,
  image,
  activity,
}) => {
  const { locale, asPath } = useRouter()

  const URL = `${SITE_URL}/${locale}${asPath}`

  if (!source) return <Spinner />

  return (
    <Container maxW="container.md">
      <Stack py={8} spacing={8}>
        <WImage ratio="twitter" src={image} rounded="lg" />
        <Heading textAlign="center">{title}</Heading>
        <HStack justifyContent={'end'}>
          <ShareButtons
            url={URL}
            title={title}
            quote={activity?.description || ''}
          />
        </HStack>
        <Box textAlign={{ base: 'left', lg: 'justify' }}>
          <Markdown source={source} />
        </Box>
      </Stack>
    </Container>
  )
}
