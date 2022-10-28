import { Request } from '@wsvvrijheid/lib'
import { Activity, StrapiLocale } from '@wsvvrijheid/types'

export const getActivityPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await Request.collection<Activity[]>({
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
