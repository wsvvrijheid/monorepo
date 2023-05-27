import { useEffect, useState } from 'react'

import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useSearchModel } from '@wsvvrijheid/services'
import { Activity, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  activityColumns,
  activityFields,
  activitySchema,
  AdminLayout,
  DataTable,
  ModelEditModal,
  PageHeader,
} from '@wsvvrijheid/ui'

import i18nConfig from '../next-i18next.config'

const ActivitiesPage = ({ seo }) => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState<number>()
  const [selectedId, setSelectedId] = useState<number>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const activitiesQuery = useSearchModel<Activity>({
    url: 'api/activities',
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: ['approved'],
    publicationState: 'preview',
  })

  useEffect(() => setCurrentPage(1), [])
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    activitiesQuery.refetch()
  }, [locale, searchTerm, sort])

  const activities = activitiesQuery?.data?.data
  const totalCount = activitiesQuery?.data?.meta?.pagination?.pageCount

  const mappedActivities = activities?.map(activity => ({
    ...activity,
    translates: activity.localizations?.map(l => l.locale),
  }))

  const handleClick = (index: number, id: number) => {
    setSelectedId(id)
  }

  const handleClose = () => {
    setSelectedId(undefined)
    onClose()
  }

  useEffect(() => {
    if (selectedId) {
      onOpen()
    }
  }, [selectedId])

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={t('search-placeholder')}
      />
      <ModelEditModal<Activity>
        url={'api/activities'}
        id={selectedId}
        isOpen={isOpen}
        onClose={handleClose}
        fields={activityFields}
        schema={activitySchema}
        title={'Edit Activity'}
      />
      <DataTable
        columns={activityColumns}
        data={mappedActivities}
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
    en: 'Activities',
    tr: 'Aktiviteler',
    nl: 'Activiteiten',
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

export default ActivitiesPage
