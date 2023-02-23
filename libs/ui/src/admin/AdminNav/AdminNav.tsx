import { FC, memo } from 'react'

import { Stack } from '@chakra-ui/react'
import { SessionUser } from '@wsvvrijheid/types'
import { BiLandscape } from 'react-icons/bi'
import { BsCollection, BsCommand, BsTranslate } from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { FiActivity } from 'react-icons/fi'
import { GiHumanPyramid } from 'react-icons/gi'
import { GoChevronRight } from 'react-icons/go'
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
import { VscFeedback } from 'react-icons/vsc'

import { AdminNavItem } from './AdminNavItem'
import { AdminNavItemCollapsed } from './AdminNavItemCollapsed'
import { AdminNavItemProps } from './types'

export const getAdminNav = (user: SessionUser): AdminNavItemProps[] => {
  const { isEditor, isAdmin } = user

  return [
    {
      label: 'Dashboard',
      link: '/',
      icon: <MdOutlineSpaceDashboard />,
      visible: true,
    },
    {
      label: 'Translates',
      icon: <BsTranslate />,
      link: '#',
      visible: isAdmin,
      submenu: [
        {
          label: 'Activities',
          link: '/translates/activities',
          icon: <TbActivity />,
        },
        {
          label: 'Announcements',
          link: '/translates/announcements',
          icon: <TbVolume />,
        },
        {
          label: 'Arts',
          link: '/translates/arts',
          icon: <TbBrush />,
        },
        {
          label: 'Collections',
          link: '/translates/collections',
          icon: <BsCollection />,
        },
        {
          label: 'Hashtags',
          link: '/translates/hashtags',
          icon: <CgHashtag />,
        },
        {
          label: 'Posts',
          link: '/translates/posts',
          icon: <TbBrandTwitter />,
        },
      ],
    },
    {
      label: 'Activities',
      icon: <FiActivity />,
      link: '/activities',
      visible: !!isEditor || !!isAdmin,
    },
    {
      label: 'Arts',
      icon: <TbBrush />,
      link: '#',
      visible: !!isEditor || !!isAdmin,
      submenu: [
        {
          label: 'Pending Arts',
          link: '/arts?status=pending',
          icon: <TbClock />,
        },
        {
          label: 'Approved Arts',
          link: '/arts?status=approved',
          icon: <TbChecks />,
        },
        {
          label: 'Rejected Arts',
          link: '/arts?status=rejected',
          icon: <TbX />,
        },
      ],
    },
    {
      label: 'Art Collections',
      link: '/collections',
      icon: <BsCollection />,
    },
    {
      label: 'Hashtags',
      icon: <CgHashtag />,
      link: '/hashtags',
      visible: isEditor || isAdmin,
    },
    {
      label: 'Hashtag Posts',
      icon: <TbBrandTwitter />,
      link: '/posts',
      visible: !!Boolean || !!isAdmin,
    },
    {
      label: 'News',
      icon: <HiOutlineNewspaper />,
      link: '#',
      visible: isEditor || isAdmin,
      submenu: [
        {
          label: 'News',
          link: '/news',
          icon: <HiOutlineNewspaper />,
        },
        {
          label: 'Bookmarked News',
          link: '/news/bookmarks',
          icon: <TbBookmarks />,
        },
        {
          label: 'Recommended News',
          link: '/news/recommended',
          icon: <TbThumbUp />,
        },
      ],
    },
    {
      label: 'Timelines',
      icon: <TbTimeline />,
      link: '#',
      submenu: [
        {
          label: 'Timelines',
          link: '/timelines',
          icon: <GiHumanPyramid />,
        },
        {
          label: 'Bookmarked Tweets',
          link: '/timelines/bookmarks',
          icon: <TbBookmarks />,
        },
        {
          label: 'Recommended Tweets',
          link: '/timelines/recommended',
          icon: <TbThumbUp />,
        },
      ],
    },
    {
      label: 'Caps Maker',
      link: '/caps-maker',
      icon: <BiLandscape />,
      visible: isEditor || isAdmin,
    },

    {
      label: 'Blogs',
      icon: <TbWriting />,
      link: '/blogs',
      visible: !!Boolean || !!isAdmin,
    },
    {
      label: 'Accounts',
      link: '/accounts',
      icon: <MdOutlineSupervisorAccount />,
      visible: isAdmin,
    },
    {
      label: 'Competitions',
      link: '/competitions',
      icon: <BsCommand />,
      visible: isEditor || isAdmin,
    },
    {
      label: 'Feedbacks',
      icon: <VscFeedback />,
      link: '#',
      visible: isEditor || isAdmin,
      submenu: [
        {
          label: 'Foundation',
          link: '/feedbacks/foundation',
          icon: <GoChevronRight />,
        },
        {
          label: 'Kunsthalte',
          link: '/feedbacks/kunsthalte',
          icon: <GoChevronRight />,
        },
        {
          label: 'Samenvvv',
          link: '/feedbacks/samenvvv',
          icon: <GoChevronRight />,
        },
        {
          label: 'Admin',
          link: '/feedbacks/admin',
          icon: <GoChevronRight />,
        },
      ],
    },
  ]
}

type AdminNAvProps = {
  user: SessionUser
  expanded?: boolean
}

export const AdminNav: FC<AdminNAvProps> = memo(({ user, expanded }) => {
  const navItems = getAdminNav(user)

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
