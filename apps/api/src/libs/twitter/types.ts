export interface Tweet {
  id: string
  user: {
    name: string
    username: string
    profile: string
  }
  image?: string
  video?: string
  text: string
  createdAt: string
  likes: number
  retweets: number
}
