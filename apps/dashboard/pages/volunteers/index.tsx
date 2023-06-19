import { FC, useEffect, useMemo, useState } from 'react'

import {
  MenuItemOption,
  MenuOptionGroup,
  Stack,
  useUpdateEffect,
} from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useSearchModel } from '@wsvvrijheid/services'
import {
  Hashtag,
  Job,
  Sort,
  StrapiLocale,
  User,
  Volunteer,
} from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  PageHeader,
  postColumns,
  volunteerColumns,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const VolunteersPage: FC<PageProps> = ({ seo }) => {
  const [currentPage, setCurrentPage] = useState<number>()

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const [jobsFilter, setJobsFilter] = useState<number[]>([])

  const volunteersQuery = useSearchModel<Volunteer>({
    url: 'api/volunteers',
    page: currentPage || 1,
    searchTerm,
    sort,
  })
  const usersQuery = useSearchModel<User>({
    url: 'api/users',
    page: currentPage || 1,
    searchTerm,
    sort,
  })
  const jobsQuery = useSearchModel<Job>({
    url: 'api/jobs',
    // publicationState: 'preview',
    searchTerm,
    sort,
    fields: ['id', `name_${locale as StrapiLocale}`],
  })
  console.log('volunteers\n', volunteersQuery?.data?.data)
  console.log('users', usersQuery?.data?.data)
  // const jobsFilter = jobsQuery?.data?.data.filter(name_${locale} =>(name_`${locale}`))
  console.log('jobs', jobsQuery?.data?.data)

  // const hashtagsQuery = useSearchModel<Hashtag>({
  //   url: 'api/hashtags',
  //   locale: locale as StrapiLocale,
  //   publicationState: 'preview',
  //   fields: ['id', 'title'],
  // })

  useEffect(() => setCurrentPage(1), [jobsFilter])

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const volunteersData = volunteersQuery?.data?.data
  const totalCount = volunteersQuery?.data?.meta?.pagination?.pageCount

  useUpdateEffect(() => {
    volunteersQuery.refetch()
  }, [locale, searchTerm, sort, jobsFilter])

  const filterMenu = (
    <MenuOptionGroup
      title="Jobs"
      type="checkbox"
      onChange={(value: string[]) => setJobsFilter(value.map(v => +v))}
    >
      {jobsQuery.data?.data?.map(job => (
        <MenuItemOption key={job.id} value={`${job.id}`}>
          {job?.name_tr}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  )

  const handleClick = (index: number, id: number) => {
    push(`/volunteers/${id}`)
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        filterMenu={filterMenu}
        filterMenuCloseOnSelect={false}
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
      />
      <DataTable<Volunteer>
        columns={volunteerColumns(locale as StrapiLocale)}
        data={volunteersData}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Volunteers',
    tr: 'Gönüllüler',
    nl: 'Vrijwilligers',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default VolunteersPage
