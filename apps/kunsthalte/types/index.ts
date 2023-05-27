import { Auth } from '@wsvvrijheid/types'
import 'iron-session'

declare module 'iron-session' {
  interface IronSessionData extends Auth {}
}
