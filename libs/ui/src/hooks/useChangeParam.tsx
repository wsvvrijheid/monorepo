import { useRouter } from 'next/router'
import qs from 'qs'

export type ChangeParamArgs = Record<string, string | string[]>

export const useChangeParams = () => {
  const { query, push } = useRouter()

  const changeParams = (args: ChangeParamArgs) => {
    // In the case of query has empty string param which we want to remove,
    // it should be removed from both the query and args
    for (const key in args) {
      const param = args[key]
      if (param === '' || param === null) {
        delete query[key]
      }
    }

    // When we provide null value for a param, remove it from the query
    for (const key in args) {
      const param = args[key]

      if (param === null) {
        delete args[key]
      }

      if (Array.isArray(param)) {
        args[key] = qs.stringify(param, {
          encodeValuesOnly: true,
        })
      }
    }

    // If page is not specified, remove it from query
    // so that data is always fetched by the first page
    if (!args['page']) {
      delete query['page']
    }

    push({
      query: { ...query, ...args },
    })
  }

  return changeParams
}
