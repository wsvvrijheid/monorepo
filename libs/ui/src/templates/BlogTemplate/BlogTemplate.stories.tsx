import { Story, Meta } from '@storybook/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { BlogTemplate, BlogTemplateProps } from './BlogTemplate'

export default {
  component: BlogTemplate,
  title: 'Templates/BlogTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<BlogTemplateProps>

const Template: Story<BlogTemplateProps> = args => {
  const { locale } = useRouter()

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
  const seo = blogSeo[args.locale || (locale as StrapiLocale)]
  return <BlogTemplate locale={locale} seo={seo} {...args} />
}

export const Default = Template.bind({})

Default.args = {}
