import { Art } from './art';
import { UploadFile } from './file';
import { StrapiCollection, StrapiEntity } from './strapi';

export type Collection = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: StrapiEntity<UploadFile>;
  arts: StrapiCollection<Art>;
};
