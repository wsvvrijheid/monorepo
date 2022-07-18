import { Application } from './application';
import { Category } from './category';
import { UploadFile } from './file';
import { StrapiCollection, StrapiEntity } from './strapi';

export type Competition = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: StrapiEntity<UploadFile>;
  date: string;
  dateEnd: string;
  locale: string;
  applications: StrapiCollection<Application>;
  categories: StrapiCollection<Category>;
  localizations: StrapiCollection<Competition>;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
};
