import { FC } from 'react'

import { Spinner, Container, Stack, Heading, Box } from '@chakra-ui/react'
import { Activity, UploadFile } from '@wsvvrijheid/types'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Markdown } from '../Markdown'
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
}) => {
  if (!source) return <Spinner />

  return (
    <Container maxW="container.md">
      <Stack py={8} spacing={8}>
        <WImage ratio="twitter" src={image} rounded="lg" />
        <Heading textAlign="center">{title}</Heading>
        <Box textAlign={{ base: 'left', lg: 'justify' }}>
          <Markdown source={source} />
        </Box>
      </Stack>
    </Container>
  )
}
