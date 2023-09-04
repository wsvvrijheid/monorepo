import { Poppins } from 'next/font/google'

export const poppins = Poppins({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const fonts = {
  body: poppins.style.fontFamily,
  heading: poppins.style.fontFamily,
}
