import { UploadFile } from './file';
import { StrapiCollection, StrapiEntity } from './strapi';

export type Term = {
  id: number;
  title: string;
  slug: string;
  content: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiEntity<UploadFile>;
  localizations: StrapiCollection<Term>;
};
