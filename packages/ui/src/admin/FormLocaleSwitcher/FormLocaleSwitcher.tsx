import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { StrapiLocale, StrapiTranslatableModel } from '@wsvvrijheid/types'

export const FormLocaleSwitcher = <T extends StrapiTranslatableModel>({
  models,
  currentLocale,
}: {
  models: T[]
  currentLocale: StrapiLocale
}) => {
  const router = useRouter()
  const slug = router.query.slug as string

  return (
    <ButtonGroup>
      {router.locales?.map(locale => {
        const model = models.find(model => model.locale === locale) as T

        const href =
          slug && router.pathname !== '/translates'
            ? `/${slug}/${model.id}`
            : {
                pathname: router.pathname,
                query: { ...router.query, id: model.id },
              }

        return (
          <Button
            as={Link}
            key={model.id}
            textTransform={'uppercase'}
            href={href}
            variant={model.locale === currentLocale ? 'solid' : 'outline'}
          >
            {model.locale}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}
