/* eslint-disable @typescript-eslint/no-unused-vars */

import { FormEventHandler, useEffect, useState } from 'react'

import { Alert, AlertIcon, AlertTitle, Button, Code, Input, Stack } from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'
import { useMutation } from '@tanstack/react-query'

import { CategoryCreateInput } from '@wsvvrijheid/types'

import { createCategoryWithMutation } from './utils'

export const CreateCategoryWithUseMutation = () => {
  const [name_en, setNameEn] = useState<string>('')
  const [name_tr, setNameTr] = useState<string>('')
  const [name_nl, setNameNl] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [showAlert, setShowAlert] = useState<boolean>(false)

  useEffect(() => {
    // TODO: Update slug with slugify on name_en change
    setSlug(slugify(name_en ?? ''))
  }, [name_en])

  const { mutate, data, isLoading } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (data: CategoryCreateInput) => createCategoryWithMutation(data),
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    // ? validation (assuming each field would be required)
    const isFormValid = name_en.trim() !== '' && name_tr.trim() !== '' && name_nl.trim() !== ''
    if (!isFormValid) {
      setShowAlert(true)

      return
    }
    setShowAlert(false)

    // TODO: Call mutate with category body
    const categoryBody = {
      name_en,
      name_tr,
      name_nl,
      slug
    }

    try {
      mutate(categoryBody)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack>
      <Code as={'pre'}>{JSON.stringify(data, null, 2)}</Code>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input
            placeholder="Category name (en)"
            value={name_en}
            onChange={e => setNameEn(e.target.value)}
          />
          {/* TODO: Add all inputs */}
          <Input
            placeholder="Category name (tr)"
            value={name_tr}
            onChange={e => setNameTr(e.target.value)}
          />
          <Input
            placeholder="Category name (nl)"
            value={name_nl}
            onChange={e => setNameNl(e.target.value)}
          />

          <Button
            isLoading={isLoading}
            loadingText={'Creating...'}
            type="submit"
          >
            Submit
          </Button>
          {showAlert &&
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>Please provide a category name in all three languages!</AlertTitle>
            </Alert>
          }
        </Stack>
      </form>
    </Stack>
  )
}
