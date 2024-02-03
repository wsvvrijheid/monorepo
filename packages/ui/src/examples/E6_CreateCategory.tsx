/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC, useEffect, useState } from 'react'

import { Button, Code, Heading, Input, Stack } from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'

import { createCategoryWithAxios, createCategoryWithMutation } from './utils'

type CreateCategoryWithAxiosProps = {
  fetcher: 'axios' | 'mutation'
}

export const CreateCategory: FC<CreateCategoryWithAxiosProps> = ({
  fetcher = 'axios',
}) => {
  const [name_en, setNameEn] = useState<string>('')
  const [name_tr, setNameTr] = useState<string>('')
  const [name_nl, setNameNl] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [createdCategory, setCreatedCategory] = useState<any>()

  useEffect(() => {
    setSlug(slugify(name_en ?? ''))
  }, [name_en])

  const handleSubmit = async () => {
    const categoryBody = {
      name_en,
      name_tr,
      name_nl,
      slug,
    }

    let blogs

    if (fetcher === 'axios') {
      const response = await createCategoryWithAxios(categoryBody)
      blogs = response.data
    } else if (fetcher === 'mutation') {
      blogs = await createCategoryWithMutation(categoryBody)
    }

    setCreatedCategory(blogs)
  }

  return (
    <Stack>
      <Heading as={'h2'}>Create category with {fetcher}</Heading>
      <Code as={'pre'}>{JSON.stringify(createdCategory, null, 2)}</Code>
      <Stack as={'form'}>
        <Input
          placeholder="Category name (en)"
          value={name_en}
          onChange={(e) => setNameEn(e.target.value)}
        />
        <Input
          placeholder="Category name (tr)"
          value={name_tr}
          onChange={(e) => setNameTr(e.target.value)}
        />
        <Input
          placeholder="Category name (nl)"
          value={name_nl}
          onChange={(e) => setNameNl(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Stack>
    </Stack>
  )
}
