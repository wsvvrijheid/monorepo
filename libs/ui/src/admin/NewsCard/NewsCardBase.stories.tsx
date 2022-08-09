import React from 'react'

import { Story, Meta } from '@storybook/react'

import { NewsCardBase } from './NewsCardBase'
import { NewsCardProps } from './types'
import { Container } from '@chakra-ui/react'
import { News } from '@wsvvrijheid/types'

const news: News = {
  id: '1',
  title:
    'Sürgün Profesör Mehmet Ateş’in hikayesi: Tekniği tıp literatürüne girdi',
  description: `
             Bir süre önce çok sevdiği ülkesinden ayrılmak zorunda kalan KHK'lı kalp cerrahı Prof. Dr. Mehmet Ateş, tüm dünyada başarıları ve tıp bilimine yaptığı katkılarla tanınan bir doktor olarak Türkiye'den neden ayrıldığını, uğradığı haksızlığı ve maruz kaldığı iftiraları Bold'a anlattı. ABD'nin bir yıl önce akademik Greencard verdiği Ateş, yakında Avrupa'da kalp cerrahı olarak göreve başlayacak.
  `,
  date: '15 Mins Ago',
  owner: 'Bold Medya',
  image:
    'https://images.unsplash.com/photo-1660038819755-a51be3f886d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
  url: 'https://boldmedya.com/2022/07/29/surgun-profesor-mehmet-atesin-hikayesi-teknigi-tip-literaturune-girdi-avrupada-kalp-cerrahligina-baslayacak/',
}

export default {
  title: 'Admin/NewsCardBase',
  component: NewsCardBase,
  args: {
    news: news,
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<NewsCardProps>

const Template: Story<NewsCardProps> = args => {
  return (
    <NewsCardBase
      {...args}
      isFeatured={args.isFeatured}
      isVertical={args.isVertical}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  isFeatured: false,
}

export const Featured = Template.bind({})
Featured.args = {
  isFeatured: true,
}

export const Vertical = Template.bind({})
Vertical.args = {
  isFeatured: true,
  isVertical: true,
}
