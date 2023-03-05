export interface HashtagAnnouncementProps {
  hashtag: {
    name: string
    value: string
  }
  title: string
  description: {
    name: string
    value: string
  }
  date: {
    name: string
    value: string
  }
  defaultCaps: { url: string }
  content: string
  join?: string
  link: string
}
