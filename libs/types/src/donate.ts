import { StrapiBase } from './strapi'

type DonateBase = {
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

export type DonateCreateInput = Pick<DonateBase, 'name' | 'email' | 'amount'>

export type DonateUpdateInput = Pick<DonateBase, 'status' | 'mollieId'>

export type Donate = DonateBase & StrapiBase
