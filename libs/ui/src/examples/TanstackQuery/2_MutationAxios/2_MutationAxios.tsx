/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent } from 'react'

import { Button } from '@chakra-ui/react'

import { createCategoryWithAxios } from '../createCategoryWithAxios'

// We will create a new category
// Category has `name_en`, `name_nl`, `name_tr` and `slug` fields

export const MutationAxios = () => {
  // TODO: Create states for the input fields `name_en`, `name_tr` and `name_nl`

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Call the mutation function (createCategoryWithAxios) with the input values from the state
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: Add input fields for `name_en`, `name_tr` and `name_nl` */}
      <Button type="submit">S</Button>
    </form>
  )
}
