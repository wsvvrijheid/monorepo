import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { StrapiTranslatableModel } from '@wsvvrijheid/types'

export const FormLocaleSwitcher = <T extends StrapiTranslatableModel>({
  models,
}: {
  models: T[]
  slug?: string
}) => {
  const router = useRouter()
  const slug = router.query.slug as string

  return (
    <ButtonGroup>
      {models?.map(model => {
        const href = slug
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
          >
            {model.locale}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}
