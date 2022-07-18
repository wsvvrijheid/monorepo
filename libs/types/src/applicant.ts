import { Application } from './application';
import { User } from './user';
import { StrapiEntity } from './strapi';

export type Applicant = {
  id: number;
  name: string;
  application: StrapiEntity<Application>;
  user: StrapiEntity<User>;
};
