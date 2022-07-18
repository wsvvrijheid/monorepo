import { Art } from './art';
import { User } from './user';
import { StrapiCollection, StrapiEntity } from './strapi';

export type Artist = {
  id: number;
  name: string;
  arts: StrapiCollection<Art>;
  user: StrapiEntity<User>;
};
