import { useEffect, useMemo } from 'react'

import axios from 'axios'
import Router from 'next/router'
import { useQuery } from 'react-query'

export const useAuth = (redirectTo = '', redirectIfFound = false) => {
  const { data, isLoading } = useQuery('me', () => axios('/api/auth/user'))

  const user = useMemo(() => data?.data || {}, [data])

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user?.isLoggedIn) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { ...user, isLoading }
}
