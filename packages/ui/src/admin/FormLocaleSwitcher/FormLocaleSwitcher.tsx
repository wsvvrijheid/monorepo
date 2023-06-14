import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { StrapiTranslatableModel } from '@wsvvrijheid/types'

export const FormLocaleSwitcher = <T extends StrapiTranslatableModel>({
  models,
}: {
  models: T[]
}) => {
  const router = useRouter()
  const slug = router.query.slug as string

  return (
    <ButtonGroup>
      {models?.map(model => (
        <Button
          as={Link}
          key={model.id}
          textTransform={'uppercase'}
          href={{
            pathname: router.pathname,
            query: { ...router.query, id: model.id, slug },
          }}
        >
          {model.locale}
        </Button>
      ))}
    </ButtonGroup>
  )
}
