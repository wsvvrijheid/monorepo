import { useEffect, useState } from 'react'

import { StoryFn, Meta, StoryObj } from '@storybook/react'
import { useRouter } from 'next/router'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { SITE_URL } from '@fc/config'
import { BLOG_MOCKS } from '@fc/mocks'

import { BlogDetail, BlogDetailProps } from './BlogDetail'
import { Container } from '../Container'

export default {
  component: BlogDetail,
  title: 'Shared/BlogDetail',
  args: {
    post: BLOG_MOCKS.tr.data[1],
    authorBlogs: BLOG_MOCKS.tr.data,
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<BlogDetailProps>

type Story = StoryObj<BlogDetailProps>

const StoryWithHook: StoryFn<BlogDetailProps> = args => {
  const { locale } = useRouter()
  const [source, setSource] = useState<MDXRemoteSerializeResult>()

  const getSource = async (content: string) => {
    const s = await serialize(content || '')
    setSource(s)
  }

  useEffect(() => {
    getSource(args.post?.content || '')
  }, [args.post.content])

  const link = `${SITE_URL}/${locale}/blog/${args.post.slug}`

  return <BlogDetail {...args} source={source!} link={link} />
}

export const Default: Story = {
  render: StoryWithHook,
}
