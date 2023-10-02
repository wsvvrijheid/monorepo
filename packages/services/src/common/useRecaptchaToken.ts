import { useEffect, useState } from 'react'

import { useReCaptcha } from 'next-recaptcha-v3'

export const useRecaptchaToken = (key: string) => {
  const [token, setToken] = useState<string>()

  const { executeRecaptcha, loaded } = useReCaptcha()

  useEffect(() => {
    if (!loaded || !executeRecaptcha) {
      return
    }

    executeRecaptcha(key).then(setToken)
  }, [key, loaded])

  return token
}
