import { Meta, Story } from '@storybook/react'

import { CourseDetailPage } from './CourseDetailPage'
import { CourseDetailPageProps } from './types'
export default {
  title: 'Forms/CourseDetailPage',
  component: CourseDetailPage,
} as Meta<CourseDetailPageProps>

const Template: Story<CourseDetailPageProps> = args => (
  <CourseDetailPage {...args} />
)

export const Default = Template.bind({})

Default.args = {
  image:
    'https://s3-alpha-sig.figma.com/img/e21a/dd66/89d785033a454bf0fe3f16796abb65f1?Expires=1681689600&Signature=TRMbXKaTh9f2y8rhYV-547M1bLrrVP0MFxy4zRNzbX2uyWxYWLcEcV9AGqFNAqLcAoMBOA0m-Q8ssfK18fXdWL46X84GZcbOtwUoOETfqMg66F57xRni~zu4v~9dYBvLag8zRgfRY3uvRmVeo3G9UEE1TIhit~JHRqtwOPH8La0Mhdukf42VRmxlNfMQ9waY6RCsOCrcx0M0flA8ZqDBoF2k4l0JLpHpcjTVM4~Ss3cPyh0YZxSiEcdVZtVaOddONqpMOb-khJBE5Ht0MydgO73wxSqr3wIUyfmiP7cPX2vCQLwkFE9gczYR-9ZytmthvIx5ZsFdDnemm4zZDk2osQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  title: 'Senaryo Yazarlığı',
  description:
    'Wees Akademi bünyesinde verilen kurslarımız gönüllülerimizin katkı verdiği alanlarda kendilerini geliştirme imkanı sağlamak amacıyla yapılmaktadır. Kurslardan kar amacı güdülmediği gibi ........amet libero aliquet. Sit sit pellentesque venenatis eu sollicitudin integer netus. Ultrices scelerisque convallis massa amet libero aliquet. amet libero aliquet. Sit sit pellentesque venenatis eu sollicitudin integer netus. Ultrices scelerisque convallis massa amet libero aliquet. amet libero aliquet. Sit sit pellentesque venenatis eu sollicitudin integer netus. Ultrices scelerisque convallis.',
  price: 100,
  startDate: '30 mayis 2023',
  endDate: '30 haziran 2023',
  faqs: [
    {
      question: 'soru 1',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus enim quasi magni, dolorum illum recusandae animi fugit nisi quae aliquid exercitationem aut provident modi suscipit ipsam ullam nemo, ex quia?',
    },
  ],
}
