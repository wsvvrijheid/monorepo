import { useEffect } from 'react'

import { Auth } from '@wsvvrijheid/types'
import { useAuthSelector } from '@wsvvrijheid/utils'
import Router from 'next/router'

export const useAuth = (
  redirectTo?: string,
  redirectIfFound = false,
): Auth & { isAuthLoading: boolean } => {
  const { user, isAuthLoading, token, isLoggedIn } = useAuthSelector()

  useEffect(() => {
    if (user) return
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet

    if (token && redirectTo) {
      if (
        // If redirectTo is set, redirect if the user was not found.
        (!redirectIfFound && !isAuthLoading) ||
        // If redirectIfFound is also set, redirect if the user was found
        (redirectIfFound && isAuthLoading)
      ) {
        Router.push(redirectTo)
      }
    }
  }, [isLoggedIn, isAuthLoading, token])

  return { user, token, isLoggedIn, isAuthLoading }
}
