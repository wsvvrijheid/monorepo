export type Me = {
  id: number
  blocked: boolean
  confirmed: boolean
  email: string
  role: MeRole
  username: string
}

export type MeRole = {
  id: number
  description: string
  name: string
  type: string
}
