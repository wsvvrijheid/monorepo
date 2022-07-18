import { Application } from './application';
import { Juri } from './juri';
import { StrapiEntity } from './strapi';

export type JuriVote = {
  id: number;
  value: number;
  juri: StrapiEntity<Juri>;
  application: StrapiEntity<Application>;
};
