import { Poppins, MuseoModerno } from '@next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
})

const museo = MuseoModerno({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
})

export const fonts = {
  body: poppins.style.fontFamily,
  heading: poppins.style.fontFamily,
  club: museo.style.fontFamily,
}
