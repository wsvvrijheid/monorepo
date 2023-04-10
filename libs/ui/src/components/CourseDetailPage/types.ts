export type CourseDetailPageProps = {
  title: string
  description: string
  content?: string
  location: string
  instructor?: string
  price: number
  quota?: number
  image: string
  startDate: string
  endDate: string
  faqs: { question: string; answer: string }[]
}
