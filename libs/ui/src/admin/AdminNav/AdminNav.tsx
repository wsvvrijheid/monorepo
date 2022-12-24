import { FC } from 'react'

import { Stack } from '@chakra-ui/react'
import { SessionUser } from '@wsvvrijheid/types'
import { BiLandscape } from 'react-icons/bi'
import { BsCollection, BsCommand, BsTranslate } from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { FiActivity } from 'react-icons/fi'
import { GiAbstract020, GiDozen, GiHumanPyramid } from 'react-icons/gi'
import { GoChevronRight } from 'react-icons/go'
import { HiOutlineNewspaper } from 'react-icons/hi'
import {
  MdOutlineSpaceDashboard,
  MdOutlineSupervisorAccount,
} from 'react-icons/md'
import {
  TbActivity,
  TbBrandTwitter,
  TbBrush,
  TbChecks,
  TbClock,
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
          label: 'Arts',
          link: '/translates/arts',
          icon: <TbBrush />,
        },
        {
          label: 'Posts',
          link: '/translates/posts',
          icon: <TbBrandTwitter />,
        },
        {
          label: 'Blogs',
          link: '/translates/blogs',
          icon: <TbWriting />,
        },
        {
          label: 'Announcements',
          link: '/translates/announcements',
          icon: <TbVolume />,
        },
        {
          label: 'Activities',
          link: '/translates/activities',
          icon: <TbActivity />,
        },
      ],
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
      label: 'Activities',
      icon: <FiActivity />,
      link: '#',
      visible: !!isEditor || !!isAdmin,
      submenu: [
        {
          label: 'Pending Activities',
          link: '/activity?status=pending',
          icon: <TbClock />,
        },
        {
          label: 'Approved Activities',
          link: '/activity?status=approved',
          icon: <TbChecks />,
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
      link: '#',
      visible: isEditor || isAdmin,
      submenu: [
        {
          label: 'Main Hashtag',
          link: '/hashtags',
          icon: <CgHashtag />,
        },
        {
          label: 'Hashtag Posts',
          icon: <TbBrandTwitter />,
          link: '#',
          visible: !!Boolean || !!isAdmin,
          submenu: [
            {
              label: 'Pending  Posts',
              link: '/hashtags/posts?status=pending',
              icon: <TbClock />,
            },
            {
              label: 'Approved  Posts',
              link: '/hashtags/posts?status=approved',
              icon: <TbChecks />,
            },
          ],
        },
        {
          label: 'Hashtag Caps',
          icon: <TbBrandTwitter />,
          link: '#',
          visible: isEditor || isAdmin,
          submenu: [
            {
              label: 'Pending  Caps',
              link: '/hashtags/caps?status=pending',
              icon: <TbClock />,
            },
            {
              label: 'Approved  Caps',
              link: '/hashtags/caps?status=approved',
              icon: <TbChecks />,
            },
          ],
        },
      ],
    },
    {
      label: 'Content Maker',
      icon: <HiOutlineNewspaper />,
      link: '#',
      visible: isEditor || isAdmin,
      submenu: [
        {
          label: 'News',
          link: '/content-maker/news',
          icon: <HiOutlineNewspaper />,
        },
        {
          label: 'Bookmarked News',
          link: '/content-maker/news-bookmarks',
          icon: <HiOutlineNewspaper />,
        },
        {
          label: 'Timelines',
          link: '/content-maker/timelines',
          icon: <GiHumanPyramid />,
        },
        {
          label: 'Bookmarked Tweets',
          link: '/content-maker/tweets-bookmarks',
          icon: <GiAbstract020 />,
        },
        {
          label: 'Recommended Topics',
          link: '/content-maker/recommended-topics',
          icon: <GiDozen />,
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

export const AdminNav: FC<AdminNAvProps> = ({ user, expanded }) => {
  const navItems = getAdminNav(user)

  return (
    <Stack spacing={0}>
      {navItems
        // .filter(item => item.visible) // TODO enable this when we are ready to release
        .map(item => {
          const NavItem = expanded ? AdminNavItem : AdminNavItemCollapsed

          return (
            <NavItem
              icon={item.icon}
              key={item.label}
              label={item.label}
              link={item.link || '#'}
              submenu={item.submenu}
              expanded={expanded}
            />
          )
        })}
    </Stack>
  )
}
