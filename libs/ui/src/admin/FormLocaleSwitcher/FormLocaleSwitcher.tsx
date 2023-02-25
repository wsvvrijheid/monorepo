import React from 'react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { StrapiLocale, StrapiTranslatableModel } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const FormLocaleSwitcher = <T extends StrapiTranslatableModel>({
  models,
  slug,
}: {
  models: T[]
  slug: string
}) => {
  const router = useRouter()

  const navigate = (id: number, locale: StrapiLocale) => {
    router.push(`/${slug}/${id}`, undefined, { locale })
  }

  return (
    <ButtonGroup>
      {models?.map(model => (
        <Button
          key={model.id}
          textTransform={'uppercase'}
          onClick={() => navigate(model.id, model.locale)}
        >
          {model.locale}
        </Button>
      ))}
    </ButtonGroup>
  )
}
