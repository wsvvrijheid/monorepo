import { RoleActionType, actionRolesEndpoints } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'
import { StrapiEndpoint } from '@wsvvrijheid/types'

export const usePermission = () => {
  const { user, roles } = useAuthContext()

  const allowEndpointAction = (
    endpoint: StrapiEndpoint,
    action: RoleActionType,
  ) => {
    if (!user || roles.includes('public')) return false

    if (roles?.includes('admin')) return true

    const actionRoles = actionRolesEndpoints[endpoint]?.[action]

    if (!actionRoles) return false

    return actionRoles.some(role => roles?.includes(role))
  }

  return { allowEndpointAction }
}
