import { FormEvent } from 'react'

import { Button } from '@chakra-ui/react'

export const MutationFn = () => {
  // TODO: Create states for the input fields `name_en`, `name_tr` and `name_nl`

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Call the mutation function (createCategoryWithMutation) with the input values from the state
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: Add input fields for `name_en`, `name_tr` and `name_nl` */}
      <Button type="submit">S</Button>
    </form>
  )
}
