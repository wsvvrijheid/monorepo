import { Category } from './category';
import { Hashtag } from './hashtag';
import { StrapiCollection } from './strapi';

export type Mention = {
  id: number;
  username: string;
  data: any;
  locale: string;
  categories: StrapiCollection<Category>;
  hashtags: StrapiCollection<Hashtag>;
  localizations: StrapiCollection<Mention>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
