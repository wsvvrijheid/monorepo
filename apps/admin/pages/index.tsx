import { Button } from '@chakra-ui/react'
import {
  Container,
  AdminLoginForm,
  LoginFormFieldValues,
  useAuth,
} from '@wsvvrijheid/ui'
import axios from 'axios'
import { useRouter } from 'next/router'

const Index = () => {
  const { isLoggedIn, isLoading } = useAuth()

  const router = useRouter()

  const onLogout = async () => {
    axios.post('/api/auth/logout').then(() => {
      router.push('/login')
    })
  }
  const handleLogin = async (data: LoginFormFieldValues) => {
    alert(JSON.stringify(data))
  }
  return (
    <Container>
      {isLoggedIn ? (
        <Button isLoading={isLoading} colorScheme="primary" onClick={onLogout}>
          Logout
        </Button>
      ) : (
        <AdminLoginForm onSubmitHandler={handleLogin} />
      )}
    </Container>
  )
}

export default Index
