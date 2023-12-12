import { FC } from 'react'


// import { useRouter } from 'next/router'
// import { useTranslation } from 'next-i18next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import { Presentation, UploadFile } from '@wsvvrijheid/types'

import { Container } from '../../components'

export type PresentationTemplateProps = {
  seo: NextSeoProps
  presentations:Presentation[]
  source: MDXRemoteSerializeResult
  image: UploadFile | string
  link: string
}

export const PresentationTemplate: FC<PresentationTemplateProps> = ({
 // seo,
  source,
  
}) => {
  // const { t } = useTranslation()
  // const router = useRouter()
 // const { slug } = router.query

  if (!source) return null

  return (
    <Container maxW="container.md">
presentations x
    </Container>
  )
}
