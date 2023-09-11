import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { StrapiTranslatableModel } from '@wsvvrijheid/types'

export const FormLocaleSwitcher = <T extends StrapiTranslatableModel>({
  model,
}: {
  model: T
}) => {
  const router = useRouter()
  const slug = router.query.slug as string

  const models = [model, ...(model.localizations || [])].sort((a, b) =>
    a.locale.localeCompare(b.locale),
  )

  return (
    <ButtonGroup>
      {models?.map(m => {
        const href =
          slug && router.pathname !== '/translates'
            ? `/${slug}/${m.id}`
            : {
                pathname: router.pathname,
                query: { ...router.query, id: m.id },
              }

        return (
          <Button
            as={Link}
            key={m.id}
            textTransform={'uppercase'}
            href={href}
            isDisabled={m.locale === model.locale}
            variant={m.locale === model.locale ? 'solid' : 'outline'}
          >
            {m.locale}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}
