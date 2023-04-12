import { FC, memo } from 'react'

import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { BiLandscape } from 'react-icons/bi'
import {
  BsCashCoin,
  BsCollection,
  BsCommand,
  BsTranslate,
} from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { FiActivity } from 'react-icons/fi'
import { GiHumanPyramid } from 'react-icons/gi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import {
  MdOutlineSpaceDashboard,
  MdOutlineSupervisorAccount,
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

import { SessionUser } from '@wsvvrijheid/types'

import { AdminNavItem } from './AdminNavItem'
import { AdminNavItemCollapsed } from './AdminNavItemCollapsed'
import { AdminNavItemProps } from './types'

const useAdminNav = (user: SessionUser): AdminNavItemProps[] => {
  const { roles } = user

  const { t: tAdmin } = useTranslation('admin')

  return [
    {
      label: tAdmin('dashboard'),
      link: '/',
      icon: <MdOutlineSpaceDashboard />,
      visible: true,
    },
    {
      label: tAdmin('translates'),
      icon: <BsTranslate />,
      link: '#',
      visible:
        roles.includes('admin') ||
        roles.includes('editor') ||
        roles.includes('translator'),
      submenu: [
        {
          label: tAdmin('activities'),
          link: '/translates/activities',
          icon: <TbActivity />,
        },
        {
          label: tAdmin('announcements'),
          link: '/translates/announcements',
          icon: <TbVolume />,
        },
        {
          label: tAdmin('arts'),
          link: '/translates/arts',
          icon: <TbBrush />,
        },
        {
          label: tAdmin('collections'),
          link: '/translates/collections',
          icon: <BsCollection />,
        },
        {
          label: tAdmin('hashtags'),
          link: '/translates/hashtags',
          icon: <CgHashtag />,
        },
        {
          label: tAdmin('posts'),
          link: '/translates/posts',
          icon: <TbBrandTwitter />,
        },
      ],
    },
    {
      label: tAdmin('activities'),
      icon: <FiActivity />,
      link: '/activities',
      visible: roles.includes('admin') || roles.includes('editor'),
    },
    {
      label: tAdmin('arts'),
      icon: <TbBrush />,
      link: '#',
      visible:
        roles.includes('admin') ||
        roles.includes('editor') ||
        roles.includes('arteditor'),
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
      visible:
        roles.includes('admin') ||
        roles.includes('editor') ||
        roles.includes('arteditor'),
    },
    {
      label: tAdmin('hashtags'),
      icon: <CgHashtag />,
      link: '/hashtags',
      visible: roles.includes('admin') || roles.includes('editor'),
    },
    {
      label: tAdmin('hashtagPosts'),
      icon: <TbBrandTwitter />,
      link: '/posts',
    },
    {
      label: tAdmin('news'),
      icon: <HiOutlineNewspaper />,
      link: '#',
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
      link: '#',
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
      label: tAdmin('capsMaker'),
      link: '/caps-maker',
      icon: <BiLandscape />,
      visible: roles.includes('admin') || roles.includes('editor'),
    },

    {
      label: tAdmin('blogs'),
      icon: <TbWriting />,
      link: '/blogs',
      visible: roles.includes('admin') || roles.includes('editor'),
    },
    {
      label: tAdmin('accounts'),
      link: '/accounts',
      icon: <MdOutlineSupervisorAccount />,
      visible: roles.includes('admin'),
    },
    {
      label: tAdmin('competitions'),
      link: '/competitions',
      icon: <BsCommand />,
      visible: roles.includes('admin') || roles.includes('editor'),
    },
    {
      label: 'Donation',
      link: '/donation',
      icon: <BsCashCoin />,
    },
  ]
}

type AdminNAvProps = {
  user: SessionUser
  expanded?: boolean
}

export const AdminNav: FC<AdminNAvProps> = memo(({ user, expanded }) => {
  const navItems = useAdminNav(user)

  return (
    <Stack spacing={0}>
      {navItems
        // .filter(item => item.visible) // TODO enable this when we are ready to release
        .map((item, index) => {
          const NavItem = expanded ? AdminNavItem : AdminNavItemCollapsed

          return (
            <NavItem
              icon={item.icon}
              key={index}
              label={item.label}
              link={item.link || '#'}
              submenu={item.submenu}
              expanded={expanded}
            />
          )
        })}
    </Stack>
  )
})
