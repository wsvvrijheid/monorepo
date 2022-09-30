import { FC } from 'react'

import { Stack } from '@chakra-ui/react'
import { SessionUser } from '@wsvvrijheid/types'
import { BiLandscape } from 'react-icons/bi'
import { BsCommand, BsTranslate } from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { GiHumanPyramid } from 'react-icons/gi'
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
      visible: isEditor || isAdmin,
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
      label: 'Collections',
      link: '/arts/collections',
      icon: <TbBrush />,
    },
    {
      label: 'Hashtags',
      icon: <CgHashtag />,
      visible: isEditor || isAdmin,
      submenu: [
        {
          label: 'Main Hashtag',
          link: '/hashtags/main',
          icon: <CgHashtag />,
        },
        {
          label: 'Hashtag Posts',
          link: '/hashtags/posts',
          icon: <TbBrandTwitter />,
        },
      ],
    },
    {
      label: 'Content Maker',
      icon: <HiOutlineNewspaper />,
      visible: isEditor || isAdmin,
      submenu: [
        {
          label: 'News',
          link: '/content-maker/news',
          icon: <HiOutlineNewspaper />,
        },
        {
          label: 'HumanRights',
          link: '/content-maker/human-rights',
          icon: <GiHumanPyramid />,
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
