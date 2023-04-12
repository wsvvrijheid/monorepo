import { useAuthSelector } from '@wsvvrijheid/store'
import { Role } from '@wsvvrijheid/types'

export const useHasPermission = () => {
  const { user } = useAuthSelector()

  const getPermission = (roles: Role['type'][]) => {
    if (!user) return false

    if (user.roles.includes('admin')) return true

    return roles.some(role => user.roles.includes(role))
  }

  return { getPermission }
}
