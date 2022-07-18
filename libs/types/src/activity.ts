import { Category } from './category';
import { UploadFile } from './file';
import { Tag } from './tag';
import { StrapiCollection, StrapiEntity } from './strapi';

export type Activity = {
  id: number;
  content: string;
  createdAt: string;
  date: string;
  description: string;
  locale: string;
  publishedAt: string;
  slug: string;
  title: string;
  updatedAt: string;
  image: StrapiEntity<UploadFile>;
  categories: StrapiCollection<Category>;
  tags: StrapiCollection<Tag>;
  localizations: StrapiCollection<Activity>;
};
