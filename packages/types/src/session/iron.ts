import 'iron-session'
import { Auth } from '.'

declare module 'iron-session' {
  interface IronSessionData extends Auth {}
}
