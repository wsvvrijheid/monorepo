import 'iron-session'
import { Auth } from '.'

declare module 'iron-session' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IronSessionData extends Auth {}
}
