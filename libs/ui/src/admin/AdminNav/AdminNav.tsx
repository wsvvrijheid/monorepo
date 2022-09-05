import { Stack } from '@chakra-ui/react'
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

export const navItems = [
  {
    label: 'Dashboard',
    link: '/',
    icon: <MdOutlineSpaceDashboard />,
  },
  {
    label: 'Translate',
    link: '/translate',
    icon: <BsTranslate />,
  },
  {
    label: 'Arts',
    icon: <FaPaintBrush />,
    submenu: [
      {
        label: 'Pending Arts',
        link: '/arts/pending',
        icon: <GoChevronRight />,
      },
      {
        label: 'Approved Arts',
        link: '/arts/approved',
        icon: <GoChevronRight />,
      },
      {
        label: 'Rejected Arts',
        link: '/arts/rejected',
        icon: <GoChevronRight />,
      },
    ],
  },
  {
    label: 'Hashtag',
    icon: <FaHashtag />,
    submenu: [
      {
        label: 'Main Hashtag',
        link: '/hashtag/main',
        icon: <GoChevronRight />,
      },
      {
        label: 'Hashtag Posts',
        link: '/hashtag/posts',
        icon: <GoChevronRight />,
      },
    ],
  },
  {
    label: 'Content Maker',
    icon: <BsNewspaper />,
    submenu: [
      {
        label: 'News',
        link: '/content-maker/news',
        icon: <GoChevronRight />,
      },
      {
        label: 'HumanRight',
        link: '/content-maker/human-right',
        icon: <GoChevronRight />,
      },
    ],
  },
  {
    label: 'Caps Maker',
    link: '/caps-maker',
    icon: <BiLandscape />,
  },
  {
    label: 'Accounts',
    link: '/accounts',
    icon: <MdOutlineSupervisorAccount />,
  },
  {
    label: 'Competition',
    link: '/competition',
    icon: <BsCommand />,
  },
  {
    label: 'Feedbacks',
    icon: <VscFeedback />,
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

export const AdminNav = () => {
  return (
    <Stack>
      {navItems.map(item => {
        return (
          <AdminNavItem
            key={item.label}
            label={item.label}
            link={item.link}
            icon={item.icon}
            submenu={item.submenu}
          />
        )
      })}
    </Stack>
  )
}
