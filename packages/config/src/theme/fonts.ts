import { Poppins, MuseoModerno, Tulpen_One } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

const museo = MuseoModerno({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

const tulpen = Tulpen_One({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const fonts = {
  body: poppins.style.fontFamily,
  heading: poppins.style.fontFamily,
  club: museo.style.fontFamily,
  lotus: tulpen.style.fontFamily,
}
