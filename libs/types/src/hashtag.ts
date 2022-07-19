import { Category } from './category';
import { UploadFile } from './file';
import { Mention } from './mention';
import { Post } from './post';
import { Tweet } from './tweet';
import { StrapiCollection, StrapiEntity } from './strapi';

export type Hashtag = {
  id: number;
  content: string;
  date: string;
  description: string;
  hashtag: string;
  hashtag_extra: string;
  locale: string;
  slug: string;
  title: string;
  tweets: Tweet[];
  image: StrapiEntity<UploadFile>;
  mentions: StrapiCollection<Mention>;
  posts: StrapiCollection<Post>;
  categories: StrapiCollection<Category>;
  localizations: StrapiCollection<Hashtag>;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
};
