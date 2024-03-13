import { RoleActionType, actionRolesEndpoints } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { StrapiEndpoint } from '@fc/types'

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

    if (actionRoles.includes('all')) return true

    return actionRoles.some(role => roles?.includes(role))
  }

  return { allowEndpointAction }
}
