import { RecommendedTopic } from './recommended-topic'

export type Topic = Pick<
  RecommendedTopic,
  'id' | 'title' | 'description' | 'imageUrl' | 'date' | 'publisher' | 'link'
>
