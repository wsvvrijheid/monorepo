import { Story, Meta } from '@storybook/react'
import { BLOG_MOCKS } from '@wsvvrijheid/mocks'
import { StrapiLocale } from '@wsvvrijheid/types'

import { BlogTemplate, BlogTemplateProps } from './BlogTemplate'

export default {
  component: BlogTemplate,
  title: 'Templates/BlogTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<BlogTemplateProps>

const Template: Story<BlogTemplateProps> = args => {
  const blogSeo = {
    en: {
      title: 'Blog',
      description: 'Posts',
    },
    nl: {
      title: 'Blog',
      description: 'Posts',
    },
    tr: {
      title: 'Blog',
      description: 'Yazılar',
    },
  }

  const blogs = BLOG_MOCKS[args.locale]?.data
  const seo = blogSeo[args.locale as StrapiLocale]
  return <BlogTemplate seo={seo} blogs={blogs} {...args} />
}

export const Default = Template.bind({})

Default.args = {}
