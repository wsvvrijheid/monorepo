import { useState } from 'react'

import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiCollectionEndpoint, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  PageHeader,
  TranslateDataTable,
  useFields,
  useSchema,
} from '@wsvvrijheid/ui'

const ActivitiesTranslatePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>()
  const { t } = useTranslation()

  const { query } = useRouter()
  const id = Number(query.id as string)
  const slug = query.slug as StrapiCollectionEndpoint

  const modelFields = useFields()
  const modelSchemas = useSchema()

  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const fields =
    slug === 'posts'
      ? modelFields['translate-post-model']
      : modelFields['translate-model']
  const schema =
    slug === 'posts'
      ? modelSchemas['translate-post-model']
      : modelSchemas['translate-model']

  return (
    <AdminLayout seo={{ title: t('translates') }}>
      {id ? (
        <ModelEditTranslate
          id={id}
          endpoint={slug}
          translatedFields={fields?.map(f => f.name) || []}
          fields={fields as any}
          schema={schema!}
        />
      ) : (
        <>
          <PageHeader
            onSearch={handleSearch}
            searchPlaceHolder={'Search by title or description'}
          />

          <TranslateDataTable searchTerm={searchTerm} />
        </>
      )}
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default ActivitiesTranslatePage
