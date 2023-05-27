import { StrapiBase } from './strapi'

type DonationBase = {
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

export type DonationCreateInput = Pick<
  DonationBase,
  'name' | 'email' | 'amount'
>

export type DonationUpdateInput = Pick<DonationBase, 'status' | 'mollieId'>

export type Donation = DonationBase & StrapiBase
