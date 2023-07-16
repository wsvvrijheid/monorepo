import { useTranslation } from 'next-i18next'
import { BiLandscape } from 'react-icons/bi'
import {
  BsCashCoin,
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

import { AdminRoutes } from '@wsvvrijheid/config'
import { SessionUser } from '@wsvvrijheid/types'
import { getRoutePermission } from '@wsvvrijheid/utils'

import { AdminNavItemProps } from './types'

export const useAdminNav = (user: SessionUser): AdminNavItemProps[] => {
  const { roles } = user

  const { t: tAdmin } = useTranslation('admin')

  return [
    {
      label: tAdmin('dashboard'),
      link: '/',
      icon: <MdOutlineSpaceDashboard />,
      visible: getRoutePermission(roles, '/'),
    },
    {
      label: tAdmin('translates'),
      icon: <BsTranslate />,
      visible: getRoutePermission(roles, '/translates'),
      submenu: [
        {
          label: tAdmin('activities'),
          link: '/translates?slug=activities' as AdminRoutes,
          icon: <TbActivity />,
          visible: getRoutePermission(roles, '/translates'),
        },
        {
          label: tAdmin('announcements'),
          link: '/translates?slug=announcements' as AdminRoutes,
          icon: <TbVolume />,
          visible: getRoutePermission(roles, '/translates'),
        },
        {
          label: tAdmin('arts'),
          link: '/translates?slug=arts' as AdminRoutes,
          icon: <TbBrush />,
          visible: getRoutePermission(roles, '/translates'),
        },
        {
          label: tAdmin('collections'),
          link: '/translates?slug=collections' as AdminRoutes,
          icon: <BsCollection />,
          visible: getRoutePermission(roles, '/translates'),
        },
        {
          label: tAdmin('hashtags'),
          link: '/translates?slug=hashtags' as AdminRoutes,
          icon: <CgHashtag />,
          visible: getRoutePermission(roles, '/translates'),
        },
        {
          label: tAdmin('posts'),
          link: '/translates?slug=posts' as AdminRoutes,
          icon: <TbBrandTwitter />,
          visible: getRoutePermission(roles, '/translates'),
        },
      ],
    },
    {
      label: tAdmin('activities'),
      icon: <FiActivity />,
      link: '/activities',
      visible: getRoutePermission(roles, '/activities'),
    },
    {
      label: tAdmin('arts'),
      icon: <TbBrush />,
      visible: getRoutePermission(roles, '/arts'),
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
      visible: getRoutePermission(roles, '/collections'),
    },
    {
      label: tAdmin('hashtags'),
      icon: <CgHashtag />,
      link: '/hashtags',
      visible: getRoutePermission(roles, '/hashtags'),
    },
    {
      label: tAdmin('hashtagPosts'),
      icon: <TbBrandTwitter />,
      link: '/posts',
      visible: getRoutePermission(roles, '/posts'),
    },
    {
      label: tAdmin('news'),
      icon: <HiOutlineNewspaper />,
      visible: getRoutePermission(roles, '/news'),
      submenu: [
        {
          label: tAdmin('news'),
          link: '/news',
          icon: <HiOutlineNewspaper />,
          visible: getRoutePermission(roles, '/news'),
        },
        {
          label: tAdmin('bookmarkedNews'),
          link: '/news/bookmarks',
          icon: <TbBookmarks />,
          visible: getRoutePermission(roles, '/news/bookmarks'),
        },
        {
          label: tAdmin('recommendedNews'),
          link: '/news/recommended',
          icon: <TbThumbUp />,
          visible: getRoutePermission(roles, '/news/recommended'),
        },
      ],
    },
    {
      label: tAdmin('timelines'),
      icon: <TbTimeline />,
      visible: getRoutePermission(roles, '/timelines'),
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
      visible: getRoutePermission(roles, '/courses'),
    },
    {
      label: tAdmin('volunteers'),
      link: '/volunteers',
      icon: <MdOutlineVolunteerActivism />,
      visible: getRoutePermission(roles, '/volunteers'),
    },
    {
      label: tAdmin('users'),
      link: '/users',
      icon: <FiUsers />,
      visible: getRoutePermission(roles, '/users'),
    },
    {
      label: tAdmin('capsMaker'),
      link: '/caps-maker',
      icon: <BiLandscape />,
      visible: getRoutePermission(roles, '/caps-maker'),
    },

    {
      label: tAdmin('blogs'),
      icon: <TbWriting />,
      link: '/blogs',
      visible: getRoutePermission(roles, '/blogs'),
    },
    {
      label: tAdmin('accounts'),
      link: '/accounts',
      icon: <MdOutlineSupervisorAccount />,
      visible: getRoutePermission(roles, '/accounts'),
    },
    {
      label: tAdmin('competitions'),
      link: '/competitions',
      icon: <BsCommand />,
      visible: getRoutePermission(roles, '/competitions'),
    },
    {
      label: 'Donation',
      link: '/donation',
      icon: <BsCashCoin />,
      visible: getRoutePermission(roles, '/donation'),
    },
  ]
}
