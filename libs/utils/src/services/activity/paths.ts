import { Activity, StrapiLocale } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getActivityPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await request()<Activity[]>({
          url: 'api/activities',
          locale,
        })

        const activities = responses?.data

        return activities?.map(({ slug }) => ({
          params: { slug },
          locale,
        }))
      }),
    )
  ).flat()
