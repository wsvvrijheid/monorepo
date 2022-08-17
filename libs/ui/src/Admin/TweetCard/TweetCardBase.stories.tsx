import { ComponentMeta, ComponentStory } from '@storybook/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { TweetCardBase } from './index'

export default {
  component: TweetCardBase,
  title: 'Admin/TweetCard',
} as ComponentMeta<typeof TweetCardBase>

const Template: ComponentStory<typeof TweetCardBase> = args => {
  const { locale } = useRouter()
  return <TweetCardBase {...args} defaultLocale={locale as StrapiLocale} />
}

export const Default = Template.bind({})
Default.args = {
  tweet: {
    id: '123456789',
    user: {
      name: 'John Doe',
      username: 'john@doe.com',
      profile:
        'https://img.freepik.com/vrije-vector/zakenman-karakter-avatar-geisoleerd_24877-60111.jpg?w=2000',
    },
    image:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    text: 'Ben düştüm aşkin narina Meyletmem dünya malina Ölürsemde mezarima Gelme gayri, gelme leyli, leyli Gelme leyli, leyli, gelme leyli, leyli Gelme leyli, leyli yar',
    likes: 45,
    retweets: 56,
  },
}

export const Video = Template.bind({})
Video.args = {
  tweet: {
    id: '123456789',
    user: {
      name: 'Ahmet Kaya',
      username: 'AhmetKaya',
      profile:
        'https://i.scdn.co/image/ab67616d0000b273ae914d1ac15028f672cee7bd',
    },
    videos: [
      {
        bitrate: 360,
        content_type: 'Kum Gibi (Ahmet Kaya)',
        url: 'https://www.youtube.com/embed/1miwaIZwJbk?list=RD1miwaIZwJbk',
      },
    ],
    text: 'Acimasiz olma şimdi bu kadar Dün gibi dün gibi çekip gitme Birakta sarilayim/dolanayim ayaklarina Kum gibi kum gibi ezip geçme',
    likes: 45,
    retweets: 56,
  },
}
