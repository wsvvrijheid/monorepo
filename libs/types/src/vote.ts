import { Application } from './application';
import { User } from './user';
import { StrapiEntity } from './strapi';

export type Vote = {
  id: number;
  value: number;
  voter: StrapiEntity<User>;
  application: StrapiEntity<Application>;
};
