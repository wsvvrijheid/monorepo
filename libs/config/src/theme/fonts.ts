import { Poppins, Lemonada } from '@next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
})
const lemonada = Lemonada({ subsets: ['latin'] })

export const fonts = {
  body: poppins.style.fontFamily,
  heading: poppins.style.fontFamily,
  club: lemonada.style.fontFamily,
}
