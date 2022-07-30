/* eslint-disable react/display-name */
import { FC, PropsWithChildren } from 'react'

import { chakra, ChakraProps } from '@chakra-ui/react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Navigate } from '../Navigate'

const MarkdownComponents = {
  h1: (props: PropsWithChildren<ChakraProps>) => (
    <chakra.h1
      fontWeight={600}
      textAlign="center"
      fontSize="3xl"
      my={8}
      {...props}
    />
  ),
  h2: (props: PropsWithChildren<ChakraProps>) => (
    <chakra.h2
      fontWeight={600}
      fontSize="2xl"
      my={6}
      apply="mdx.h2"
      {...props}
    />
  ),
  h3: (props: PropsWithChildren<ChakraProps>) => (
    <chakra.h3
      fontWeight={600}
      fontSize="xl"
      my={4}
      as="h3"
      apply="mdx.h3"
      {...props}
    />
  ),
  h4: (props: PropsWithChildren<ChakraProps>) => (
    <chakra.h4
      fontWeight={600}
      fontSize="lg"
      my={4}
      as="h4"
      apply="mdx.h4"
      {...props}
    />
  ),
  hr: (props: PropsWithChildren<ChakraProps>) => (
    <chakra.hr apply="mdx.hr" {...props} />
  ),
  strong: (props: PropsWithChildren<ChakraProps>) => (
    <chakra.span fontWeight={600} {...props} />
  ),
  a: (props: PropsWithChildren<ChakraProps>) => (
    <Navigate
      {...props}
      fontWeight={600}
      color="blue.500"
      _hover={{ color: 'blue.300' }}
    >
      {props.children}
    </Navigate>
  ),
  p: (props: PropsWithChildren<ChakraProps>) => <chakra.p mb={4} {...props} />,
  ul: (props: PropsWithChildren<ChakraProps>) => (
    <chakra.ul mt={6} ml={4} {...props} />
  ),
  ol: (props: PropsWithChildren<ChakraProps>) => (
    <chakra.ol apply="mdx.ul" {...props} />
  ),
  li: (props: PropsWithChildren<ChakraProps>) => <chakra.li {...props} />,
  blockquote: (props: PropsWithChildren<ChakraProps>) => (
    <chakra.blockquote
      bg="blackAlpha.50"
      borderWidth={1}
      borderColor="blue.500"
      rounded="lg"
      px={6}
      py={4}
      my={6}
      {...props}
    />
  ),
}

export interface MarkdownProps {
  source?: MDXRemoteSerializeResult
}

export const Markdown: FC<MarkdownProps> = ({ source }) => {
  if (!source) {
    console.warn('No source provided to Markdown component')

    return null
  }
  return (
    // TODO Might be extended with custom components
    <MDXRemote {...source} components={{ ...MarkdownComponents }} />
  )
}
