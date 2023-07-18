import { useAuthContext } from '@wsvvrijheid/context'
import { RoleType } from '@wsvvrijheid/types'

export const useHasPermission = () => {
  const { user, roles } = useAuthContext()

  const getPermission = (requestRoles: RoleType[]) => {
    if (!user) return false

    if (
      roles?.includes('admin') ||
      (!roles.includes('public') && requestRoles.includes('all'))
    )
      return true

    return requestRoles.some(role => roles?.includes(role))
  }

  return { getPermission }
}
