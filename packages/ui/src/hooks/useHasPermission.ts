import { useAuthContext } from '@wsvvrijheid/context'
import { RoleType } from '@wsvvrijheid/types'

export const useHasPermission = () => {
  const { user } = useAuthContext()

  const getPermission = (roles: RoleType[]) => {
    if (!user) return false

    if (user.roles?.includes('admin')) return true

    return roles.some(role => user.roles?.includes(role))
  }

  return { getPermission }
}
