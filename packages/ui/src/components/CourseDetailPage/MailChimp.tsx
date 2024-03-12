import { IconButton } from '@chakra-ui/react'
import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context/src/auth/AuthProvider'
import { useRouter } from 'next/router'
import { AiOutlineMail, AiOutlineWarning } from 'react-icons/ai'

export type MailChimpProps = {
  id?: string
  webId?: string
  server?: string
  error?: string
  courseId?: string
}

export const MailChimp: React.FC<MailChimpProps> = ({
  id,
  webId,
  server,
  error,
  courseId,
}) => {
  const router = useRouter()
  const { token } = useAuthContext()

  const createMailList = async () => {
    const url = API_URL + '/api/course-mailchimp/' + courseId
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error(response.statusText)

      // is it possible to just refetch datatable from here ?
      router.reload()
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      alert('Error: ' + msg)
    }
  }

  if (!id) {
    return (
      <IconButton
        variant="outline"
        colorScheme="red"
        isRound={true}
        aria-label="Create new list"
        size={'sm'}
        onClick={e => {
          e.stopPropagation()
          createMailList()
        }}
        icon={<AiOutlineWarning width={16} height={16} />}
      />
    )
  }
  return (
    <IconButton
      variant="outline"
      colorScheme="green"
      isRound={true}
      aria-label="Go to mailchimp"
      size={'sm'}
      onClick={e => {
        e.stopPropagation()
        window.open(
          `https://${server}.admin.mailchimp.com/lists/members/?id=${webId}.`,
          '_blank',
        )
      }}
      icon={<AiOutlineMail width={16} height={16} />}
    />
  )
}
