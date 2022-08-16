import {
  Button,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { FaArrowUp, FaPlus } from 'react-icons/fa'

import { PageHeader } from './index'

export default {
  component: PageHeader,
  title: 'Admin/PageHeader',
} as ComponentMeta<typeof PageHeader>

const Template: ComponentStory<typeof PageHeader> = args => {
  const { locale } = useRouter()
  return <PageHeader {...args} defaultLocale={locale as StrapiLocale} />
}

export const Default = Template.bind({})
Default.args = {
  title: 'News',
  onSearch: (item: string) => {
    alert(item)
  },
  onLanguageSwitch: (locale: StrapiLocale) => {
    alert('Laguage changed to ' + locale)
  },
  filterMenu: (
    <MenuOptionGroup
      title="Artists"
      type="checkbox"
      onChange={value => alert(`Filter applied: ${value}`)}
    >
      <MenuItemOption closeOnSelect={false} value="1">
        Ali
      </MenuItemOption>
      <MenuItemOption closeOnSelect={false} value="2">
        Mehmet
      </MenuItemOption>
      <MenuItemOption closeOnSelect={false} value="3">
        Merve
      </MenuItemOption>
    </MenuOptionGroup>
  ),
  sortMenu: (
    <>
      <MenuOptionGroup
        defaultValue="title:asc"
        title="Order"
        type="radio"
        onChange={value => alert(`Sorted by ${value}`)}
      >
        <MenuItemOption value="title:asc">Ascending</MenuItemOption>
        <MenuItemOption value="title:desc">Descending</MenuItemOption>
      </MenuOptionGroup>

      <MenuDivider />
      <MenuItem
        icon={<FaArrowUp />}
        onClick={() => alert('Sort user ascending')}
      >
        User name ascending
      </MenuItem>
    </>
  ),
  buttons: (
    <Button
      colorScheme="primary"
      rightIcon={<FaPlus />}
      onClick={() => alert('Clicked Create')}
    >
      Create
    </Button>
  ),
}
