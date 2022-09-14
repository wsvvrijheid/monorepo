import { Expand } from './common'
import { StrapiBase } from './strapi'

export type Donate = Expand<
  StrapiBase & {
    adddress: string
    amount: number
    createdAt: string
    email: string
    mollieId: string
    name: string
    phone: string
    status: string
    updatedAt: string
  }
>
