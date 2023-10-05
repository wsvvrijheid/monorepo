/* eslint-disable @typescript-eslint/no-unused-vars */

import { FormEventHandler, useEffect, useState } from 'react'

import { Button, Code, Input, Stack } from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'
import { useMutation } from '@tanstack/react-query'

import { CategoryCreateInput } from '@wsvvrijheid/types'

import { createCategoryWithMutation } from './utils'

export const CreateCategoryWithUseMutation = () => {
  const [name_en, setNameEn] = useState<string>('')
  const [name_tr, setNameTr] = useState<string>('')
  const [name_nl, setNameNl] = useState<string>('')
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    // TODO: Update slug with slugify on name_en change
    setSlug(slugify(name_en ?? ''))
  }, [name_en])

  const {
    mutate: setCategory,
    data,
    isLoading,
  } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (data: CategoryCreateInput) => createCategoryWithMutation(data),
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    // TODO: Call mutate with category body

    const categoryBody = {
      slug,
      name_en,
      name_nl,
      name_tr,
    }
    return setCategory(categoryBody)
  }

  return (
    <Stack>
      <Code as={'pre'}>{JSON.stringify(data, null, 2)}</Code>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input
            placeholder="Category name (en)"
            value={name_en}
            onChange={(e: any) => setNameEn(e.target.value)}
          />
          {/* TODO: Add all inputs */}

          <Input
            placeholder="Category name (tr)"
            value={name_tr}
            onChange={(e: any) => setNameTr(e.target.value)}
          />
          <Input
            placeholder="Category name (nl)"
            value={name_nl}
            onChange={(e: any) => setNameNl(e.target.value)}
          />
          <Button
            isLoading={isLoading}
            loadingText={'Creating...'}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
