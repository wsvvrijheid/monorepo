import { FC, useEffect, useState } from 'react'

import { MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Job, Sort, StrapiLocale, Volunteer } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  PageHeader,
  volunteerColumns,
} from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const VolunteersPage: FC<PageProps> = ({ seo }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [q, setQ] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const [jobsFilter, setJobsFilter] = useState<number[]>([])

  const volunteersQuery = useStrapiRequest<Volunteer>({
    url: 'api/volunteers',
    page: currentPage || 1,
    filters: { name: { $containsi: q } },
    sort,
  })

  const jobsQuery = useStrapiRequest<Job>({
    url: 'api/jobs',
    // publicationState: 'preview',
    filters: { [`name_${locale}`]: { $containsi: q } },
    sort,
    fields: ['id', `name_${locale as StrapiLocale}`],
  })

  useEffect(() => setCurrentPage(1), [jobsFilter])

  const volunteersData = volunteersQuery?.data?.data
  const totalCount = volunteersQuery?.data?.meta?.pagination?.pageCount || 0

  const filterMenu = (
    <MenuOptionGroup
      title="Jobs"
      type="checkbox"
      onChange={value => setJobsFilter((value as string[]).map(v => +v))}
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
        onSearch={setQ}
        searchPlaceHolder={'Search by title or description'}
      />

      <DataTable<Volunteer>
        columns={volunteerColumns}
        data={volunteersData || []}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const locale = context.locale as StrapiLocale

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
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default VolunteersPage
