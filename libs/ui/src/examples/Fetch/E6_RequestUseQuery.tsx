// TODO: Remove the following eslint line
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Code,
  FormControl,
  HStack,
  Input,
  Select,
  Spinner,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { StrapiLocale, StrapiModel, StrapiUrl } from '@wsvvrijheid/types'
import { request } from '@wsvvrijheid/utils'

import { LanguageSwitcher } from '../../admin'
import { URL_OPTIONS } from './RequestPopulate'

export const RequestUseQuery = () => {
  // TODO: Specify the type of all the states
  const [url, setUrl] = useState<StrapiUrl>('api/blogs')
  const [filterValue, setFilterValue] = useState<string>('')
  const [filterProperty, setFilterProperty] = useState<string>('title')
  const [locale, setLocale] = useState<StrapiLocale>('tr')

  // Example filter: { [filterProperty]: filterValue }
  // eg { title: 'test' } for blogs
  // eg { name_${locale}: 'test' } for categories

  const fetchData = async () => {
    // TODO: Add request to fetch data
    const data = await request<StrapiModel[]>({
      url,
      [filterProperty]: filterValue,
      locale,
    })
    return data.data
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['fetch', url, filterProperty, filterValue, locale],
    queryFn: fetchData,
    // This is important, otherwise it will fetch each time queryKey changes
    // We only want to fetch when the user clicks the button
    enabled: false,
  })
  console.log(filterProperty)

  return (
    <Box>
      <HStack>
        {/* TODO: LanguageSwitcher */}
        <LanguageSwitcher defaultLocale="en" onLanguageSwitch={setLocale} />
        {/* TODO: Select with URL_OPTIONS */}
        <Select value={url} onChange={e => setUrl(e.target.value as StrapiUrl)}>
          {URL_OPTIONS.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
        {/* TODO: Input for filterProperty */}
        <Input
          placeholder="Add field"
          value={filterProperty}
          onChange={e => setFilterProperty(e.target.value)}
        />
        {/* TODO: Input for filterValue */}
        <Input
          placeholder="Add field"
          value={filterValue}
          onChange={e => setFilterValue(e.target.value)}
        />
        {/* TODO: Fetch button to trigger refetch */}
        <Button onClick={() => refetch()}>search</Button>
        {/* TODO: Show data */}
      </HStack>
      <div>
        {isLoading ? (
          <Spinner size="lg" />
        ) : isError ? (
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        ) : (
          <Code>{JSON.stringify(data)}</Code>
        )}
      </div>
    </Box>
  )
}
