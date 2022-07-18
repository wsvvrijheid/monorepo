import { Activity } from './activity';
import { Announcement } from './announcement';
import { Art } from './art';
import { Blog } from './blog';
import { Competition } from './competition';
import { Hashtag } from './hashtag';
import { Mention } from './mention';
import { StrapiCollection } from './strapi';

export type Category = {
  id: number;
  code: string;
  name_en: string;
  name_nl: string;
  name_tr: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  activities?: StrapiCollection<Activity>;
  announcements?: StrapiCollection<Announcement>;
  arts?: StrapiCollection<Art>;
  blogs?: StrapiCollection<Blog>;
  competitions?: StrapiCollection<Competition>;
  hashtags?: StrapiCollection<Hashtag>;
  mentions?: StrapiCollection<Mention>;
};
