import { FC, useState } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

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

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const ActivitiesTranslatePage: FC<PageProps> = ({ seo }) => {
  const [searchTerm, setSearchTerm] = useState<string>()

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
    <AdminLayout seo={seo}>
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

  const title = {
    en: 'Translates',
    tr: 'Ceviriler',
    nl: 'Vertalingen',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default ActivitiesTranslatePage
