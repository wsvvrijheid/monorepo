import { Expand } from './common'
import { StrapiCore } from './strapi'

export type Donate = Expand<
  StrapiCore & {
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
