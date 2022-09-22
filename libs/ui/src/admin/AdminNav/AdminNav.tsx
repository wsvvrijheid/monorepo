import { FC } from 'react'

import { Stack } from '@chakra-ui/react'
import { SessionUser } from '@wsvvrijheid/types'
import { BiLandscape } from 'react-icons/bi'
import { BsCommand, BsNewspaper, BsTranslate } from 'react-icons/bs'
import { FaHashtag, FaPaintBrush } from 'react-icons/fa'
import { GoChevronRight } from 'react-icons/go'
import {
  MdOutlineSpaceDashboard,
  MdOutlineSupervisorAccount,
} from 'react-icons/md'
import { VscFeedback } from 'react-icons/vsc'

import { AdminNavItem } from './AdminNavItem'
import { AdminNavItemCollapsed } from './AdminNavItemCollapsed'

export const getAdminNav = (user: SessionUser) => {
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
      visible: isAdmin,
      submenu: [
        {
          label: 'Arts',
          link: '/translates/arts',
          icon: <GoChevronRight />,
        },
        {
          label: 'Posts',
          link: '/translates/posts',
          icon: <GoChevronRight />,
        },
        {
          label: 'Blogs',
          link: '/translates/blogs',
          icon: <GoChevronRight />,
        },
        {
          label: 'Announcements',
          link: '/translates/announcements',
          icon: <GoChevronRight />,
        },
        {
          label: 'Activities',
          link: '/translates/activities',
          icon: <GoChevronRight />,
        },
      ],
    },
    {
      label: 'Arts',
      icon: <FaPaintBrush />,
      visible: isEditor || isAdmin,
      submenu: [
        {
          label: 'Pending Arts',
          link: '/arts?status=pending',
          icon: <GoChevronRight />,
        },
        {
          label: 'Approved Arts',
          link: '/arts?status=approved',
          icon: <GoChevronRight />,
        },
        {
          label: 'Rejected Arts',
          link: '/arts?status=rejected',
          icon: <GoChevronRight />,
        },
      ],
    },
    {
      label: 'Hashtags',
      icon: <FaHashtag />,
      visible: isEditor || isAdmin,
      submenu: [
        {
          label: 'Main Hashtag',
          link: '/hashtags/main',
          icon: <GoChevronRight />,
        },
        {
          label: 'Hashtag Posts',
          link: '/hashtags/posts',
          icon: <GoChevronRight />,
        },
      ],
    },
    {
      label: 'Content Maker',
      icon: <BsNewspaper />,
      visible: isEditor || isAdmin,
      submenu: [
        {
          label: 'News',
          link: '/content-maker/news',
          icon: <GoChevronRight />,
        },
        {
          label: 'HumanRights',
          link: '/content-maker/human-rights',
          icon: <GoChevronRight />,
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
              link={item.link}
              submenu={item.submenu}
              expanded={expanded}
            />
          )
        })}
    </Stack>
  )
}
