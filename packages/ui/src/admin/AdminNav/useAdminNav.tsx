import { useTranslation } from 'next-i18next'
import {
  BsCashCoin,
  BsCashStack,
  BsCollection,
  BsCommand,
  BsTranslate,
} from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { FiActivity, FiUsers } from 'react-icons/fi'
import { GiHumanPyramid } from 'react-icons/gi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import {
  MdOutlineSpaceDashboard,
  MdOutlineSupervisorAccount,
  MdOutlineVolunteerActivism,
} from 'react-icons/md'
import {
  TbActivity,
  TbBookmarks,
  TbBrandTwitter,
  TbBrush,
  TbChecks,
  TbClock,
  TbThumbUp,
  TbTimeline,
  TbVolume,
  TbWriting,
  TbX,
} from 'react-icons/tb'

import { AdminNavItemProps } from './types'

export const useAdminNav = (): AdminNavItemProps[] => {
  const { t: tAdmin } = useTranslation('admin')

  return [
    {
      label: tAdmin('dashboard'),
      link: '/',
      icon: <MdOutlineSpaceDashboard />,
    },
    {
      label: tAdmin('translates'),
      icon: <BsTranslate />,
      submenu: [
        {
          label: tAdmin('activities'),
          link: '/translates?slug=activities',
          icon: <TbActivity />,
        },
        {
          label: tAdmin('announcements'),
          link: '/translates?slug=announcements',
          icon: <TbVolume />,
        },
        {
          label: tAdmin('arts'),
          link: '/translates?slug=arts',
          icon: <TbBrush />,
        },
        {
          label: tAdmin('collections'),
          link: '/translates?slug=collections',
          icon: <BsCollection />,
        },
        {
          label: tAdmin('hashtags'),
          link: '/translates?slug=hashtags',
          icon: <CgHashtag />,
        },
        {
          label: tAdmin('posts'),
          link: '/translates?slug=posts',
          icon: <TbBrandTwitter />,
        },
      ],
    },
    {
      label: tAdmin('activities'),
      icon: <FiActivity />,
      link: '/activities',
    },
    {
      label: tAdmin('arts'),
      icon: <TbBrush />,

      submenu: [
        {
          label: tAdmin('pendingArts'),
          link: '/arts?status=pending',
          icon: <TbClock />,
        },
        {
          label: tAdmin('approvedArts'),
          link: '/arts?status=approved',
          icon: <TbChecks />,
        },
        {
          label: tAdmin('rejectedArts'),
          link: '/arts?status=rejected',
          icon: <TbX />,
        },
      ],
    },
    {
      label: tAdmin('artCollections'),
      link: '/collections',
      icon: <BsCollection />,
    },
    {
      label: tAdmin('hashtags'),
      icon: <CgHashtag />,
      link: '/hashtags',
    },
    {
      label: tAdmin('hashtagPosts'),
      icon: <TbBrandTwitter />,
      link: '/posts',
    },
    {
      label: tAdmin('news'),
      icon: <HiOutlineNewspaper />,
      submenu: [
        {
          label: tAdmin('news'),
          link: '/news',
          icon: <HiOutlineNewspaper />,
        },
        {
          label: tAdmin('bookmarkedNews'),
          link: '/news/bookmarks',
          icon: <TbBookmarks />,
        },
        {
          label: tAdmin('recommendedNews'),
          link: '/news/recommended',
          icon: <TbThumbUp />,
        },
      ],
    },
    {
      label: tAdmin('timelines'),
      icon: <TbTimeline />,
      submenu: [
        {
          label: tAdmin('timelines'),
          link: '/timelines',
          icon: <GiHumanPyramid />,
        },
        {
          label: tAdmin('bookmarkedTweets'),
          link: '/timelines/bookmarks',
          icon: <TbBookmarks />,
        },
        {
          label: tAdmin('recommendedTweets'),
          link: '/timelines/recommended',
          icon: <TbThumbUp />,
        },
      ],
    },
    {
      label: tAdmin('courses'),
      link: '/courses',
      icon: <GiHumanPyramid />,
    },
    {
      label: tAdmin('volunteers'),
      link: '/volunteers',
      icon: <MdOutlineVolunteerActivism />,
    },
    {
      label: tAdmin('users'),
      link: '/users',
      icon: <FiUsers />,
    },
    {
      label: tAdmin('blogs'),
      icon: <TbWriting />,
      link: '/blogs',
    },
    {
      label: tAdmin('accounts'),
      link: '/accounts',
      icon: <MdOutlineSupervisorAccount />,
    },
    {
      label: tAdmin('competitions'),
      link: '/competitions',
      icon: <BsCommand />,
    },
    {
      label: 'Donation',
      link: '/donation',
      icon: <BsCashCoin />,
    },
    {
      label: 'Donations',
      link: '/donations',
      icon: <BsCashStack />,
    },
  ]
}
