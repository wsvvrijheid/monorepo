import { useEffect, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Auth } from '@wsvvrijheid/types'
import axios from 'axios'
import Router from 'next/router'

export const useAuth = (
  redirectTo?: string,
  redirectIfFound = false,
): Auth & { isLoading: boolean } => {
  const { data, isLoading, isSuccess } = useQuery(['me'], () =>
    axios('/api/auth/user'),
  )

  const auth = useMemo(
    () => data?.data || { user: null, isLoggedIn: false, token: null },
    [data],
  ) as Auth

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet

    if (!isLoading && isSuccess && redirectTo) {
      if (
        // If redirectTo is set, redirect if the user was not found.
        (!redirectIfFound && !auth?.isLoggedIn) ||
        // If redirectIfFound is also set, redirect if the user was found
        (redirectIfFound && auth.isLoggedIn)
      ) {
        Router.push(redirectTo)
      }
    }
  }, [auth, redirectIfFound, redirectTo, isLoading, isSuccess])

  return { ...auth, isLoading }
}
