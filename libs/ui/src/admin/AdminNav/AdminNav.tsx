import { Stack } from '@chakra-ui/react'
import { BiChevronRight, BiLandscape } from 'react-icons/bi'
import { BsCommand, BsNewspaper, BsTranslate } from 'react-icons/bs'
import { FaHashtag, FaPaintBrush } from 'react-icons/fa'
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
    link: '/',
    icon: <BsTranslate />,
  },
  {
    label: 'Arts',
    link: '/',
    icon: <FaPaintBrush />,
    submenu: [
      {
        label: 'Pending Arts',
        link: '/',
        icon: <BiChevronRight />,
      },
      {
        label: 'Approved Arts',
        link: '/',
        icon: <BiChevronRight />,
      },
      {
        label: 'Rejected Arts',
        link: '/',
        icon: <BiChevronRight />,
      },
    ],
  },
  {
    label: 'Hashtag',
    link: '/',
    icon: <FaHashtag />,
    submenu: [
      {
        label: 'Main Hashtag',
        link: '/',
        icon: <BiChevronRight />,
      },
      {
        label: 'Hashtag Posts',
        link: '/',
        icon: <BiChevronRight />,
      },
    ],
  },
  {
    label: 'Content Maker',
    link: '/',
    icon: <BsNewspaper />,
    submenu: [
      {
        label: 'News',
        link: '/',
        icon: <BiChevronRight />,
      },
      {
        label: 'HumanRight',
        link: '/',
        icon: <BiChevronRight />,
      },
    ],
  },
  {
    label: 'Caps Maker',
    link: '/',
    icon: <BiLandscape />,
  },
  {
    label: 'Accounts',
    link: '/',
    icon: <MdOutlineSupervisorAccount />,
  },
  {
    label: 'Competition',
    link: '/',
    icon: <BsCommand />,
  },
  {
    label: 'Feedbacks',
    link: '/',
    icon: <VscFeedback />,
    submenu: [
      {
        label: 'Foundation',
        link: '/',
        icon: <BiChevronRight />,
      },
      {
        label: 'Kunsthalte',
        link: '/',
        icon: <BiChevronRight />,
      },
      {
        label: 'Samenvvv',
        link: '/',
        icon: <BiChevronRight />,
      },
      {
        label: 'Admin',
        link: '/',
        icon: <BiChevronRight />,
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
